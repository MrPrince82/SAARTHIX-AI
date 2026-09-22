const express = require("express");
const Groq = require("groq-sdk");
const { getJobRoleByName } = require("../data/jobRoles");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const {
      question,
      targetRole,
      detectedSkills,
      requiredSkills,
      matchedSkills,
      missingSkills,
      missingEssentialSkills,
      missingImportantSkills,
      projects,
      experience,
      education,
      certifications,
      atsScore,
    } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const roleConfig = getJobRoleByName(targetRole);
    const safeTargetRole = roleConfig.name || "Data Analyst";
    const roleCategory = roleConfig.category || "Data & AI";
    const roleTech = Array.isArray(roleConfig.technologies) ? roleConfig.technologies.join(", ") : "Standard analytical stack";
    const roleTools = Array.isArray(roleConfig.tools) ? roleConfig.tools.join(", ") : "Standard tools";
    const roleProjects = Array.isArray(roleConfig.recommendedProjects)
      ? roleConfig.recommendedProjects.map((p) => `* ${p.title} (${(p.tech || []).join(", ")}): ${p.desc}`).join("\n")
      : "";
    const roleInterviewTopics = Array.isArray(roleConfig.interviewTopics)
      ? roleConfig.interviewTopics.map((t) => `* ${t}`).join("\n")
      : "";

    const safeDetectedSkills = Array.isArray(detectedSkills) && detectedSkills.length > 0 ? detectedSkills.join(", ") : "None detected yet";
    const safeRequiredSkills = Array.isArray(requiredSkills) && requiredSkills.length > 0
      ? requiredSkills.join(", ")
      : (Array.isArray(roleConfig.skills) ? roleConfig.skills.join(", ") : "None");
    const safeMatchedSkills = Array.isArray(matchedSkills) && matchedSkills.length > 0 ? matchedSkills.join(", ") : "None yet";
    const safeMissingSkills = Array.isArray(missingSkills) && missingSkills.length > 0 ? missingSkills.join(", ") : "None";
    const safeMissingEssential = Array.isArray(missingEssentialSkills) && missingEssentialSkills.length > 0 ? missingEssentialSkills.join(", ") : "";
    const safeMissingImportant = Array.isArray(missingImportantSkills) && missingImportantSkills.length > 0 ? missingImportantSkills.join(", ") : "";
    const safeProjects = Array.isArray(projects) && projects.length > 0
      ? projects.map((p) => (typeof p === "string" ? p : p.title || JSON.stringify(p))).join("; ")
      : (typeof projects === "string" && projects.trim() ? projects : "No projects recorded yet");
    const safeExperience = experience && String(experience).trim() ? String(experience).trim() : "Fresher / Entry level";
    const safeEducation = education && String(education).trim() ? String(education).trim() : "Not specified";
    const safeCertifications = Array.isArray(certifications) && certifications.length > 0
      ? certifications.join(", ")
      : (typeof certifications === "string" && certifications.trim() ? certifications : "None recorded");
    const safeAtsScore = typeof atsScore === "number" ? `${atsScore}/100` : (atsScore || "Not available");

    const systemPrompt = `You are SAARTHIX AI Mentor, an elite career mentor and technical advisor for Computer Science, IT, and Data careers.
You are currently mentoring a student targeting the role: "${safeTargetRole}" (Category: ${roleCategory}).

DOMAIN KNOWLEDGE FOR TARGET ROLE (${safeTargetRole}):
- Core Technologies: ${roleTech}
- Industry Tools: ${roleTools}
- Benchmark Portfolio Projects:
${roleProjects}
- Key Interview Topics & Screenings:
${roleInterviewTopics}

SPECIFIC GUIDANCE FOR DATA ANALYST / ANALYTICS ROLES:
- If asked "What Data Analyst skills am I missing?": Explicitly cite their actual missing skills from their profile (${safeMissingSkills}). Prioritize essential skills (e.g. SQL, Excel, Python, Power BI, Tableau, Statistics) over bonus skills.
- If asked "How can I improve my ATS score?": Recommend adding their missing required skills, quantifying project bullet points with metrics (e.g., "$ revenue analyzed, 30% reporting time saved"), and organizing standard sections.
- If asked "What SQL topics should I learn?": Detail multi-table JOINs (INNER, LEFT, FULL), GROUP BY & HAVING, CTEs (WITH clause), Window Functions (ROW_NUMBER, DENSE_RANK, LEAD, LAG), and data aggregations.
- If asked "What Python topics should I learn?": Detail Pandas (DataFrames, missing value imputation, groupby, merge/concat), NumPy array math, Matplotlib & Seaborn for visualization, and exploratory data analysis (EDA).
- If asked "What Power BI / Tableau projects should I build?": Recommend interactive executive dashboards with KPIs, drill-downs, DAX measures (Power BI), or LOD expressions (Tableau) solving realistic business problems (Sales, E-commerce, Churn).
- If asked "How should I prepare for a Data Analyst interview?": Recommend practicing live SQL queries (LeetCode SQL 50), statistical questions (A/B testing, hypothesis testing, p-values), and presenting data storytelling case studies.
- If asked "Is my resume suitable for Data Analyst?": Give an honest, constructive assessment based on their ATS score (${safeAtsScore}), matched skills (${safeMatchedSkills}), and missing skills (${safeMissingSkills}).
- ALWAYS base your answers on their actual profile and resume analysis data provided below. Do NOT fabricate or assume skills or experience they do not have.

CRITICAL CONVERSATIONAL RULES:
1. GREETINGS & CASUAL OPENERS:
   If the user's message is a greeting or casual opener (e.g. "hi", "hello", "hey", "good morning"):
   - Give a warm, concise greeting (2-3 sentences max).
   - Acknowledge their target role (${safeTargetRole}) and current ATS score (${safeAtsScore}).
   - Ask how you can guide them today (e.g. missing skills analysis, SQL/Python prep, Power BI project ideas, or interview questions).

2. DIRECT QUESTION ANSWERING:
   - Answer the user's question directly, practically, and tailored specifically to ${safeTargetRole}.
   - Keep answers structured with clear markdown headings and bullet points.

3. ACTIONABLE ROADMAPS & LEARNING:
   - When asked for roadmap or study plans, outline logical progressions (Foundations -> Core Analytics -> Visualization -> Advanced Analytics -> Job Ready).`;

    const userPrompt = `Student Resume & Career Profile:
Target Role: ${safeTargetRole}
ATS Compatibility Score: ${safeAtsScore}
Detected Skills in Resume: ${safeDetectedSkills}
Required Role Skills: ${safeRequiredSkills}
Matched Skills: ${safeMatchedSkills}
Missing Skills: ${safeMissingSkills}${safeMissingEssential ? `\n- Missing Essential Skills: ${safeMissingEssential}` : ""}${safeMissingImportant ? `\n- Missing Important Skills: ${safeMissingImportant}` : ""}
Experience Level: ${safeExperience}
Education: ${safeEducation}
Certifications: ${safeCertifications}
Projects Recorded: ${safeProjects}

Candidate's Question / Message:
${question.trim()}`;

    const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

    const completion = await groq.chat.completions.create({
      model: modelToUse,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.65,
      max_tokens: 1000,
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response. Please try again.";

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Mentor Error:", error.message || error);

    return res.status(500).json({
      success: false,
      message: "AI Mentor is temporarily unavailable.",
    });
  }
});

// Helper to safely extract JSON from LLM output
function parseJsonResponse(rawText, fallbackObj) {
  if (!rawText) return fallbackObj;
  try {
    const cleaned = rawText.trim();
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonStr = codeBlockMatch ? codeBlockMatch[1] : cleaned;
    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      return JSON.parse(jsonStr.substring(firstBrace, lastBrace + 1));
    }
    return JSON.parse(jsonStr);
  } catch (err) {
    console.warn("Could not parse LLM response as JSON:", err.message, "Raw text:", rawText);
    return fallbackObj;
  }
}

// ---------------------------------------------------------------------------
// 2. RESUME BULLET-POINT POLISHER (Action Verb + Quantifiable Metric)
// ---------------------------------------------------------------------------
router.post("/rewrite-bullet", async (req, res) => {
  try {
    const { bulletText, targetRole = "Software Developer", style = "all" } = req.body;

    if (!bulletText || !bulletText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bullet point text is required.",
      });
    }

    const roleConfig = getJobRoleByName(targetRole);
    const safeRole = roleConfig.name || "Software Developer";
    const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

    const systemPrompt = `You are an elite Silicon Valley Tech Resume Coach & ATS Optimization Specialist.
Your task is to take a draft bullet point from a candidate targeting the role: "${safeRole}", and rewrite it into 3 distinct high-impact, ATS-optimized bullet points following the Google "Accomplished [X] as measured by [Y], by doing [Z]" and XYZ impact formula.

Rules:
1. Every variation MUST start with a powerful, distinct past-tense action verb (e.g., Engineered, Architected, Spearheaded, Optimized, Streamlined, Automated).
2. Incorporate realistic, plausible quantifiable metrics, scale, or percentage improvements appropriate for a ${safeRole}.
3. Highlight technologies relevant to ${safeRole}.
4. Provide 3 specific variations:
   - "Metric & Performance Impact": Focus on latency, efficiency, throughput, or user adoption.
   - "Technical Architecture & Depth": Focus on system design, database indexing, concurrency, or clean code.
   - "Ownership & Delivery": Focus on end-to-end delivery, agile execution, or cross-functional impact.

IMPORTANT: Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "original": "${bulletText.replace(/"/g, '\\"')}",
  "variations": [
    {
      "style": "Metric & Performance Impact",
      "actionVerb": "Optimized",
      "metricHighlight": "35% reduction in API response latency",
      "text": "Rewritten bullet point string here..."
    },
    {
      "style": "Technical Architecture & Depth",
      "actionVerb": "Architected",
      "metricHighlight": "10,000+ concurrent requests handled",
      "text": "Rewritten bullet point string here..."
    },
    {
      "style": "Ownership & Delivery",
      "actionVerb": "Spearheaded",
      "metricHighlight": "shipped 2 weeks ahead of scheduled release",
      "text": "Rewritten bullet point string here..."
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: modelToUse,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Transform this bullet point: "${bulletText.trim()}"` }
      ],
      temperature: 0.55,
      max_tokens: 650,
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "{}";
    const parsed = parseJsonResponse(rawResponse, {
      original: bulletText,
      variations: [
        {
          style: "Metric & Performance Impact",
          actionVerb: "Optimized",
          metricHighlight: "30% performance boost",
          text: `Optimized core modules for ${safeRole}, reducing processing overhead by 30% through streamlined algorithmic operations.`
        },
        {
          style: "Technical Architecture & Depth",
          actionVerb: "Architected",
          metricHighlight: "fault-tolerant modular design",
          text: `Architected robust domain logic for ${safeRole}, integrating industry standard libraries and automated test coverage.`
        },
        {
          style: "Ownership & Delivery",
          actionVerb: "Spearheaded",
          metricHighlight: "delivered production-ready feature",
          text: `Spearheaded end-to-end development of critical components, ensuring high maintainability and zero regression bugs.`
        }
      ]
    });

    return res.json({
      success: true,
      original: bulletText,
      variations: parsed.variations || [],
    });
  } catch (error) {
    console.error("Bullet Rewriter Error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to rewrite bullet point. Please try again.",
    });
  }
});

// ---------------------------------------------------------------------------
// 3. JOB DESCRIPTION (JD) MATCHER & FIT SCORER
// ---------------------------------------------------------------------------
router.post("/match-jd", async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole = "Software Developer" } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required. Please upload or provide your resume first.",
      });
    }

    const roleConfig = getJobRoleByName(targetRole);
    const safeRole = roleConfig.name || "Software Developer";
    const modelToUse = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

    // Truncate if excessively long to avoid token limits
    const safeResume = resumeText.slice(0, 5000);
    const safeJD = jobDescription.slice(0, 4000);

    const systemPrompt = `You are a Senior ATS Evaluation Engine and Technical Recruiter for "${safeRole}" positions.
Compare the Candidate's Resume against the Target Job Description (JD).

Compute an accurate ATS match percentage (0 - 100) based on:
- Hard skills & technologies required vs found
- Core responsibilities & domain relevance
- Frameworks, libraries, tools, and methodologies

Provide:
1. "matchScore": integer from 0 to 100.
2. "verdict": "Excellent Match (85%+)" | "Good Match (70-84%)" | "Moderate Fit (50-69%)" | "Low Match (<50%)"
3. "matchingKeywords": array of 4-8 important technical skills / concepts present in BOTH the JD and Resume.
4. "missingKeywords": array of 4-8 prominent technical skills / requirements in the JD that are MISSING or weak in the Resume.
5. "roleFitSummary": 2-3 sentences assessing overall candidate alignment.
6. "tailoredTips": 3-4 specific, actionable recommendations for how the candidate can modify their resume to pass this specific job's screening.

IMPORTANT: Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "matchScore": 75,
  "verdict": "Good Match (70-84%)",
  "matchingKeywords": ["Java", "Spring Boot", "REST APIs", "Git"],
  "missingKeywords": ["Docker", "Kubernetes", "AWS", "Kafka"],
  "roleFitSummary": "The candidate has strong foundational alignment with backend technologies, but lacks containerization and cloud experience specified in the JD.",
  "tailoredTips": [
    "Add concrete containerization experience with Docker under project section.",
    "Mention AWS cloud deployment or serverless services in your technical skills.",
    "Quantify your backend performance achievements using measurable throughput metrics."
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: modelToUse,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `CANDIDATE RESUME:\n${safeResume}\n\nTARGET JOB DESCRIPTION:\n${safeJD}`
        }
      ],
      temperature: 0.4,
      max_tokens: 750,
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "{}";
    const parsed = parseJsonResponse(rawResponse, {
      matchScore: 70,
      verdict: "Good Match (70-84%)",
      matchingKeywords: ["Core Programming", "Data Structures", "Web Basics", "Databases"],
      missingKeywords: ["Target Stack Frameworks", "Production Deployment", "Automated Testing"],
      roleFitSummary: `The resume demonstrates fundamental CS competence for ${safeRole}, but needs specific keyword alignment with the job description.`,
      tailoredTips: [
        "Include the primary frameworks listed in the job description in your skills section.",
        "Add 1-2 bullet points explaining how you deployed and tested your projects.",
        "Align project titles and descriptions with key terminology used in the job post."
      ]
    });

    return res.json({
      success: true,
      matchScore: typeof parsed.matchScore === "number" ? Math.min(100, Math.max(0, parsed.matchScore)) : 70,
      verdict: parsed.verdict || "Good Match",
      matchingKeywords: Array.isArray(parsed.matchingKeywords) ? parsed.matchingKeywords : [],
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
      roleFitSummary: parsed.roleFitSummary || "Resume shows partial alignment with job requirements.",
      tailoredTips: Array.isArray(parsed.tailoredTips) ? parsed.tailoredTips : [],
    });
  } catch (error) {
    console.error("JD Matcher Error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze Job Description match.",
    });
  }
});

module.exports = router;