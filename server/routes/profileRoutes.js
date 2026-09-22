const express = require("express");
const User = require("../models/User");
const { requireAuth, requireMatchingUser } = require("../middleware/requireAuth");
const { getJobRoleByName, getAllJobRoles, getRoleCategories } = require("../data/jobRoles");

const router = express.Router();

// ========================================
// GET ALL AVAILABLE JOB ROLES & CATEGORIES
// GET /api/profile/roles/all
// ========================================

router.get("/roles/all", (req, res) => {
  return res.status(200).json({
    success: true,
    categories: getRoleCategories(),
    roles: getAllJobRoles(),
  });
});

// ========================================
// GET USER PROFILE
// GET /api/profile/:userId
// ========================================

router.get("/:userId", requireAuth, requireMatchingUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ========================================
// UPDATE USER PROFILE
// PUT /api/profile/:userId
// ========================================

router.put("/:userId", requireAuth, requireMatchingUser, async (req, res) => {
  try {
    const {
      education,
      skills,
      targetRole,
      experience,
      projects,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        education,
        skills,
        targetRole,
        experience,
        projects,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// PLACEMENT READINESS
// GET /api/profile/:userId/readiness
// =========================

router.get("/:userId/readiness", requireAuth, requireMatchingUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let score = 0;

    // Education - 15 marks
    if (user.education && user.education.trim() !== "") {
      score += 15;
    }

    // Skills - 35 marks
    const skills = Array.isArray(user.skills) ? user.skills : [];

    if (skills.length >= 5) {
      score += 35;
    } else {
      score += skills.length * 7;
    }

    // Target Role - 15 marks
    if (user.targetRole && user.targetRole.trim() !== "") {
      score += 15;
    }

    // Experience - 10 marks
    if (user.experience && user.experience.trim() !== "") {
      score += 10;
    }

    // Projects - 25 marks
    const projects = Array.isArray(user.projects) ? user.projects : [];

    if (projects.length >= 2) {
      score += 25;
    } else if (projects.length === 1) {
      score += 12;
    }

    // =========================
    // SKILL GAP ANALYSIS (DYNAMIC ROLE REGISTRY)
    // =========================

    const roleConfig = getJobRoleByName(user.targetRole);
    const requiredSkills = Array.isArray(roleConfig.skills) ? roleConfig.skills : [];

    const userSkills = skills.map((skill) =>
      typeof skill === "string" ? skill.trim().toLowerCase() : ""
    ).filter(Boolean);

    const missingSkills = requiredSkills.filter(
      (reqSkill) =>
        !userSkills.some(
          (uSkill) =>
            uSkill === reqSkill.toLowerCase() ||
            uSkill.includes(reqSkill.toLowerCase()) ||
            reqSkill.toLowerCase().includes(uSkill)
        )
    );

    const matchedSkills = requiredSkills.filter(
      (reqSkill) =>
        userSkills.some(
          (uSkill) =>
            uSkill === reqSkill.toLowerCase() ||
            uSkill.includes(reqSkill.toLowerCase()) ||
            reqSkill.toLowerCase().includes(uSkill)
        )
    );

    // =========================
    // READINESS LEVEL
    // =========================

    let level = "";

    if (score >= 80) {
      level = "Job Ready";
    } else if (score >= 60) {
      level = "Almost Ready";
    } else if (score >= 40) {
      level = "Getting Started";
    } else {
      level = "Needs Improvement";
    }

    res.status(200).json({
      score,
      level,
      targetRole: user.targetRole || roleConfig.name,
      roleName: roleConfig.name,
      roleCategory: roleConfig.category,
      matchedSkills,
      missingSkills,
      tools: roleConfig.tools,
      technologies: roleConfig.technologies,
    });
  } catch (error) {
    console.error("Placement readiness error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
