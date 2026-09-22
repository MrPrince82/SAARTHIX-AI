
import { useCallback, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  getAllJobRoles,
  getRoleCategories,
  getRolesByCategory,
  getJobRoleByName,
  getJobRoleById,
  createCustomRoleConfig,
} from "./data/jobRoles";

GlobalWorkerOptions.workerSrc = pdfWorker;

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const emptyProfile = {
  education: "",
  skills: "",
  targetRole: "",
  experience: "",
  projects: "",
};

function readStoredJson(key, fallback = null) {
  const value = localStorage.getItem(key);

  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function getStoredUser() {
  const user = readStoredJson("user");
  return user && typeof user.id === "string" ? user : null;
}

function getRoadmapProgress(userId) {
  if (!userId) return {};

  const progress = readStoredJson(`roadmapProgress_${userId}`, {});
  return progress && typeof progress === "object" && !Array.isArray(progress)
    ? progress
    : {};
}

function toProfileFormData(user) {
  return {
    education: user.education || "",
    skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
    targetRole: user.targetRole || "",
    experience: user.experience || "",
    projects: Array.isArray(user.projects) ? user.projects.join(", ") : "",
  };
}

function renderInlineMarkdown(str) {
  if (!str) return null;
  const tokens = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return tokens.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} style={{ fontWeight: "700", color: "#0f172a" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: "#4338ca",
            fontFamily: "monospace",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderFormattedMentorText(text) {
  if (typeof text !== "string") return text;

  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const trimmed = line.trim();

    // Headers: ####, ###, ##, #
    if (/^#{1,4}\s+/.test(trimmed)) {
      const headerLevel = trimmed.match(/^#+/)[0].length;
      const content = trimmed.replace(/^#+\s*/, "");
      const fontSize = headerLevel === 1 ? "18px" : headerLevel === 2 ? "16px" : "15px";
      return (
        <div
          key={idx}
          style={{
            fontWeight: "700",
            fontSize,
            color: "#1e1b4b",
            marginTop: idx === 0 ? "4px" : "14px",
            marginBottom: "6px",
          }}
        >
          {renderInlineMarkdown(content)}
        </div>
      );
    }

    // Bullet points: * or -
    if (/^[*\-•]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[*\-•]\s+/, "");
      return (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            margin: "4px 0",
            paddingLeft: "6px",
          }}
        >
          <span style={{ color: "#6366f1", fontWeight: "bold", lineHeight: "1.6" }}>•</span>
          <span style={{ flex: 1, lineHeight: "1.6" }}>
            {renderInlineMarkdown(content)}
          </span>
        </div>
      );
    }

    // Numbered points: 1. 2. etc.
    if (/^\d+\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      const num = match[1];
      const content = match[2];
      return (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            margin: "4px 0",
            paddingLeft: "6px",
          }}
        >
          <span style={{ color: "#7c3aed", fontWeight: "700", minWidth: "18px", lineHeight: "1.6" }}>
            {num}.
          </span>
          <span style={{ flex: 1, lineHeight: "1.6" }}>
            {renderInlineMarkdown(content)}
          </span>
        </div>
      );
    }

    // Empty line / paragraph break
    if (!trimmed) {
      return <div key={idx} style={{ height: "8px" }} />;
    }

    // Regular line
    return (
      <div key={idx} style={{ lineHeight: "1.65", margin: "3px 0" }}>
        {renderInlineMarkdown(line)}
      </div>
    );
  });
}

function App() {
  // =========================
  // PAGE
  // =========================

  const [page, setPage] = useState(() => {
    const token = localStorage.getItem("token");
    const user = getStoredUser();

    if (token && user) {
      return localStorage.getItem("currentPage") || "dashboard";
    }

    return "home";
  });

  const [mentorInput, setMentorInput] = useState("");
  const chatEndRef = useRef(null);

  const [mentorMessages, setMentorMessages] = useState([
    {
      sender: "ai",
      text:
        "Hi! 👋 I'm your SAARTHIX AI Career Mentor. How can I help you with your career today?",
    },
  ]);

  useEffect(() => {
    if (page === "career-mentor") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [mentorMessages, page]);

  const sendMentorMessage = async (optionalText = null) => {
    const question = (typeof optionalText === "string" ? optionalText : mentorInput).trim();

    if (!question) {
      return;
    }

    // Show user's message
    setMentorMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: question,
      },
    ]);

    // Clear input
    setMentorInput("");

    // Show loading message
    setMentorMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "ai",
        text: "🤔 Thinking...",
      },
    ]);

  // Get saved resume analysis
  const savedAnalysis = readStoredJson("resumeAnalysis", {}) || {};

  const targetRole = savedAnalysis.targetRole || profile?.targetRole || profileData?.targetRole || "";
  const roleConfig = getJobRoleByName(targetRole);
  const detectedSkills = Array.isArray(savedAnalysis.detectedSkills) && savedAnalysis.detectedSkills.length > 0
    ? savedAnalysis.detectedSkills
    : (Array.isArray(profile?.skills) ? profile.skills : []);
  const requiredSkills = Array.isArray(savedAnalysis.requiredRoleSkills) && savedAnalysis.requiredRoleSkills.length > 0
    ? savedAnalysis.requiredRoleSkills
    : (Array.isArray(roleConfig?.skills) ? roleConfig.skills : []);
  const matchedSkills = Array.isArray(savedAnalysis.matchedRoleSkills)
    ? savedAnalysis.matchedRoleSkills
    : [];
  const missingSkills = Array.isArray(savedAnalysis.missingRoleSkills)
    ? savedAnalysis.missingRoleSkills
    : [];
  const missingEssentialSkills = Array.isArray(savedAnalysis.missingEssentialSkills)
    ? savedAnalysis.missingEssentialSkills
    : [];
  const missingImportantSkills = Array.isArray(savedAnalysis.missingImportantSkills)
    ? savedAnalysis.missingImportantSkills
    : [];
  const projects = Array.isArray(profile?.projects) && profile.projects.length > 0
    ? profile.projects
    : (profileData?.projects ? profileData.projects.split(",").map((p) => p.trim()).filter(Boolean) : []);
  const experience = profile?.experience || profileData?.experience || "";
  const education = profile?.education || profileData?.education || "";
  const certifications = savedAnalysis.detectedSections?.includes("certifications")
    ? ["Certifications section present"]
    : [];
  const atsScore = typeof savedAnalysis.atsScore === "number" ? savedAnalysis.atsScore : 0;

  console.log("===== MENTOR DATA =====");
  console.log("Target Role:", targetRole);
  console.log("Detected Skills:", detectedSkills);
  console.log("Missing Skills:", missingSkills);
  console.log("ATS Score:", atsScore);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/mentor/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      }
    );

    const data = await response.json();

    // Remove Thinking message
    setMentorMessages((previousMessages) =>
      previousMessages.slice(0, -1)
    );

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to generate AI response."
      );
    }

    // Add AI response
    setMentorMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "ai",
        text:
          data.answer ||
          "Sorry, I could not generate a response.",
      },
    ]);

  } catch (error) {
    console.error(
      "AI Mentor Error:",
      error
    );

    // Remove Thinking message
    setMentorMessages((previousMessages) =>
      previousMessages.slice(0, -1)
    );

    // Show error
    setMentorMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "ai",
        text:
          "❌ Sorry, I couldn't connect to the AI Mentor. Please try again.",
      },
    ]);
  }
};
// const generateMentorResponse = (question) => {
//   const q = question.toLowerCase();

//   // Full Stack Developer
//   if (
//     q.includes("full stack") ||
//     q.includes("fullstack")
//   ) {
//     return `To become a Full Stack Developer, follow this roadmap:

// 1. HTML & CSS
//    Learn semantic HTML, forms, Flexbox, Grid and responsive design.

// 2. JavaScript
//    Learn ES6+, DOM, events, promises, async/await and APIs.

// 3. Git & GitHub
//    Learn repositories, branches, commits, pull requests and collaboration.

// 4. React
//    Learn components, props, state, hooks, routing and API integration.

// 5. Node.js
//    Learn modules, npm, HTTP and backend development.

// 6. Express.js
//    Learn routing, middleware and REST APIs.

// 7. MongoDB
//    Learn databases, CRUD operations, queries and Mongoose.

// 8. Authentication
//    Learn JWT, login/register systems and protected routes.

// 9. Build Projects
//    Build at least 2–3 full-stack projects.

// 10. Deployment
//    Learn how to deploy your frontend, backend and database.

// For your profile, I recommend focusing next on React, Node.js, Express.js and MongoDB because these are important Full Stack skills.`;
//   }

//   // React
//   if (q.includes("react")) {
//     return `For React, follow this order:

// 1. Components
// 2. JSX
// 3. Props
// 4. State
// 5. Events
// 6. useState
// 7. useEffect
// 8. React Router
// 9. API integration
// 10. Authentication

// After learning these, build a project such as a job portal, task manager or e-commerce application.`;
//   }

//   // DSA
//   if (
//     q.includes("dsa") ||
//     q.includes("data structure") ||
//     q.includes("algorithm")
//   ) {
//     return `For DSA, follow this progression:

// 1. Arrays
// 2. Strings
// 3. Searching
// 4. Sorting
// 5. HashMap / HashSet
// 6. Two Pointers
// 7. Sliding Window
// 8. Linked List
// 9. Stack & Queue
// 10. Trees
// 11. Graphs
// 12. Dynamic Programming

// Start with easy problems and gradually move toward medium-level problems. Practice consistently rather than trying to solve many problems in one day.`;
//   }

//   // Interview
//   if (
//     q.includes("interview") ||
//     q.includes("placement")
//   ) {
//     return `For placement preparation, focus on four areas:

// 1. DSA
//    Arrays, strings, searching, sorting, linked lists, trees and basic DP.

// 2. Core CS
//    OOP, DBMS, SQL, Operating Systems and Computer Networks.

// 3. Development
//    Be able to explain your projects, technologies and implementation decisions.

// 4. Communication
//    Prepare your introduction, strengths, weaknesses and common HR questions.

// Also practice company-specific coding questions and mock interviews.`;
//   }

//   // Resume
//   if (
//     q.includes("resume") ||
//     q.includes("cv")
//   ) {
//     return `For a stronger resume:

// • Keep it concise and job-focused.
// • Add 2–3 relevant projects.
// • Mention technologies used in each project.
// • Add measurable achievements where possible.
// • Highlight relevant technical skills.
// • Keep education and certifications clearly organized.
// • Tailor the resume to your target role.

// For a Full Stack Developer role, projects using React, Node.js, Express.js and MongoDB can strengthen your profile.`;
//   }

//   // Default response
//   return `I can help you with:

// • Career roadmap
// • Full Stack Development
// • React
// • Node.js
// • MongoDB
// • DSA
// • Interview preparation
// • Placement preparation
// • Resume improvement
// • Skill development

// Try asking something specific, such as:

// "How can I become a Full Stack Developer?"
// "What should I learn in React?"
// "Give me a DSA roadmap"
// "How should I prepare for placements?"`;
// };
  // =========================
  // PROFILE
  // =========================

  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [profileData, setProfileData] = useState(emptyProfile);

  // =========================
  // REGISTER
  // =========================

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =========================
  // LOGIN
  // =========================

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // =========================
  // MESSAGE
  // =========================

  const [message, setMessage] = useState("");

  // =========================
// RESUME ANALYSIS & EXTENSIONS
// =========================

const [resumeFile, setResumeFile] = useState(null);
const [resumeText, setResumeText] = useState(() => localStorage.getItem("saarthix_resume_text") || "");
const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
const [resumeAnalysis, setResumeAnalysis] = useState(() =>
  readStoredJson("resumeAnalysis", null)
);

// RESUME SUB-TABS: "breakdown" | "jd-match" | "bullet-rewriter"
const [resumeSubTab, setResumeSubTab] = useState("breakdown");

// JOB DESCRIPTION MATCHER
const [jdInput, setJdInput] = useState("");
const [jdMatching, setJdMatching] = useState(false);
const [jdResult, setJdResult] = useState(null);

// BULLET-POINT REWRITER
const [bulletInput, setBulletInput] = useState("");
const [bulletRewriting, setBulletRewriting] = useState(false);
const [bulletResult, setBulletResult] = useState(null);
const [copiedIndex, setCopiedIndex] = useState(null);

// =========================
// MOCK INTERVIEW SIMULATOR
// =========================
const [interviewType, setInterviewType] = useState("Technical"); // "Technical" | "System Design" | "Behavioral"
const [interviewLevel, setInterviewLevel] = useState("Entry / Graduate"); // "Entry / Graduate" | "Mid-Level" | "Senior"
const [interviewStatus, setInterviewStatus] = useState("idle"); // "idle" | "in-progress" | "reviewed" | "completed"
const [interviewCurrentQ, setInterviewCurrentQ] = useState(null);
const [interviewUserAnswer, setInterviewUserAnswer] = useState("");
const [interviewEvaluating, setInterviewEvaluating] = useState(false);
const [interviewLastEval, setInterviewLastEval] = useState(null);
const [interviewHistory, setInterviewHistory] = useState([]);
const [interviewScorecard, setInterviewScorecard] = useState(null);
const [interviewStarting, setInterviewStarting] = useState(false);
const [interviewFinishing, setInterviewFinishing] = useState(false);
const [showInterviewHint, setShowInterviewHint] = useState(false);
const [showModelAnswer, setShowModelAnswer] = useState(false);
 // =========================
// ROADMAP PROGRESS
// =========================

const [roadmapProgress, setRoadmapProgress] = useState(() =>
  getRoadmapProgress(getStoredUser()?.id)
);

useEffect(() => {
  if (currentUser?.id) {
    localStorage.setItem(
      `roadmapProgress_${currentUser.id}`,
      JSON.stringify(roadmapProgress)
    );
  }
}, [currentUser?.id, roadmapProgress]);


useEffect(() => {
  if (currentUser) {
    localStorage.setItem("currentPage", page);
  } else {
    localStorage.removeItem("currentPage");
  }
}, [currentUser, page]);

  // =========================
  // LOAD PROFILE
  // =========================

  const loadProfile = useCallback(async () => {
    if (!currentUser?.id) return;

    try {
      setProfileLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/profile/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        setProfileData(toProfileFormData(data.user));
      } else {
        setMessage(data.message || "Unable to load your profile.");
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setCurrentUser(null);
          setProfile(null);
          setProfileData(emptyProfile);
          setPage("login");
        }
      }
    } catch {
      setMessage("Unable to connect to server.");
    } finally {
      setProfileLoading(false);
    }
  }, [currentUser]);

  const extractResumeText = async (file) => {
  if (!file) {
    alert("Please select a resume first.");
    return;
  }

  try {
    setResumeAnalyzing(true);

    console.log("===== RESUME ANALYSIS STARTED =====");
    console.log("File:", file.name);
    console.log("Type:", file.type);

    // Currently support PDF only
    if (file.type !== "application/pdf") {
      alert(
        "Please upload a PDF resume. DOC/DOCX support will be added later."
      );

      setResumeAnalyzing(false);
      return;
    }

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await getDocument({
      data: arrayBuffer,
    }).promise;

    console.log(
      "PDF pages:",
      pdf.numPages
    );

    let extractedText = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const pdfPage =
        await pdf.getPage(pageNumber);

      const content =
        await pdfPage.getTextContent();

      const pageText =
        content.items
          .map((item) => item.str)
          .join(" ");

      extractedText +=
        pageText + "\n";
    }

    const finalText =
      extractedText.trim();

    console.log(
      "Extracted text length:",
      finalText.length
    );

    if (!finalText) {
      alert(
        "Could not extract text from this PDF. Please use a text-based PDF resume."
      );

      setResumeAnalyzing(false);
      return;
    }

    // Save extracted text
    setResumeText(finalText);
    localStorage.setItem("saarthix_resume_text", finalText);

    console.log(
      "===== CALLING ANALYZE RESUME ====="
    );

    // Analyze extracted resume
    analyzeResume(finalText);

    console.log(
      "===== RESUME ANALYSIS COMPLETED ====="
    );

  } catch (error) {
    console.error(
      "Resume extraction error:",
      error
    );

    alert(
      "Unable to read the resume. Please try another PDF."
    );
  } finally {
    setResumeAnalyzing(false);
  }
};

// Helper to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Synonym and variation mapping for intelligent skill detection
const skillSynonymMap = {
  "microsoft excel": ["microsoft excel", "ms excel", "excel", "spreadsheets", "pivot tables", "pivot table", "vlookup", "xlookup", "power query"],
  "excel": ["microsoft excel", "ms excel", "excel", "spreadsheets", "pivot tables", "pivot table", "vlookup", "xlookup"],
  "power bi": ["power bi", "powerbi", "power-bi", "dax"],
  "tableau": ["tableau", "tableau desktop", "tableau public"],
  "python": ["python", "python3", "py"],
  "sql": ["sql", "structured query language", "tsql", "pl/sql", "ansi sql"],
  "mysql": ["mysql"],
  "postgresql": ["postgresql", "postgres", "psql"],
  "pandas": ["pandas", "pd"],
  "numpy": ["numpy", "np"],
  "data cleaning": ["data cleaning", "data wrangling", "data cleansing", "cleaned data", "data scrubbing", "cleaning data"],
  "data analysis": ["data analysis", "analyzing data", "data analytics", "quantitative analysis"],
  "exploratory data analysis": ["exploratory data analysis", "eda"],
  "statistics": ["statistics", "statistical analysis", "descriptive statistics", "inferential statistics", "statistical modeling", "statistical"],
  "data visualization": ["data visualization", "data viz", "visualizing data", "visualizations", "charts & dashboards", "visualization"],
  "dashboard development": ["dashboard development", "dashboard creation", "dashboards", "dashboarding", "executive dashboard", "sales dashboard", "bi dashboard", "built dashboards", "built dashboard"],
  "data interpretation": ["data interpretation", "interpreting data", "business insights", "actionable insights", "data-driven decisions"],
  "problem solving": ["problem solving", "analytical problem solving", "troubleshooting", "critical thinking"],
  "matplotlib": ["matplotlib", "plt"],
  "seaborn": ["seaborn", "sns"],
  "jupyter notebook": ["jupyter notebook", "jupyter", "jupyterlab", "ipynb"],
  "microsoft power query": ["microsoft power query", "power query", "powerquery"],
  "power query": ["microsoft power query", "power query", "powerquery"],
  "dax": ["dax", "data analysis expressions"],
  "etl": ["etl", "extract transform load", "data pipeline", "data pipelines", "extract, transform"],
  "data transformation": ["data transformation", "transforming data", "data transformation pipeline"],
  "business intelligence": ["business intelligence", "bi analyst", "bi reporting", "bi dashboard", "power bi"],
  "kpi analysis": ["kpi analysis", "kpi tracking", "kpis", "key performance indicators", "metric analysis"],
  "reporting": ["reporting", "executive reporting", "business reporting", "reports", "status reporting"],
  "a/b testing": ["a/b testing", "a/b test", "ab testing", "split testing"],
  "hypothesis testing": ["hypothesis testing", "hypothesis test", "p-value", "t-test", "chi-square", "anova"]
};

// Intelligent check whether a skill is evidenced in the text
const checkSkillMatch = (text, skill) => {
  if (!text || !skill) return false;
  const sLower = skill.trim().toLowerCase();
  const synonyms = skillSynonymMap[sLower] || [sLower];

  return synonyms.some((term) => {
    // For short identifiers (<= 4 chars, like sql, dax, etl, eda, bi), use strict word boundary
    if (term.length <= 4) {
      const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escapeRegExp(term)}([^a-zA-Z0-9_]|$)`, "i");
      return regex.test(text);
    }
    return text.includes(term.toLowerCase());
  });
};

const analyzeResume = (text) => {
  if (!text || !text.trim()) {
    alert("Please upload and extract a resume first.");
    return;
  }

  const resume = text.toLowerCase();

  const targetRole =
    profile?.targetRole ||
    profileData?.targetRole ||
    "Full Stack Developer";

  const roleConfig = getJobRoleByName(targetRole);

  const generalTechnicalSkills = [
    "java", "c", "c++", "python", "javascript", "typescript", "html", "css", "sql",
    "mysql", "postgresql", "mongodb", "git", "github", "docker", "kubernetes", "aws",
    "spring boot", "data structures", "algorithms", "dbms", "operating systems",
    "computer networks", "oop", "system design", "rest api", "excel", "microsoft excel",
    "power bi", "tableau", "pandas", "numpy", "data cleaning", "data analysis",
    "exploratory data analysis", "statistics", "data visualization", "dashboard development",
    "data interpretation", "problem solving", "matplotlib", "seaborn", "jupyter notebook",
    "power query", "microsoft power query", "dax", "etl", "data transformation",
    "business intelligence", "kpi analysis", "reporting", "a/b testing", "hypothesis testing",
    "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "linux",
    "bash", "wireshark", "splunk", "selenium", "postman", "jira", "figma", "kotlin",
    "android", "flutter", "dart", "react", "node.js", "express", "redis", "jenkins",
    "terraform", "ci/cd"
  ];

  // Combine general CS skills with target role skills
  const roleSkillSet = Array.isArray(roleConfig.skills) ? roleConfig.skills : [];
  const allSkillsToScan = Array.from(
    new Set([...generalTechnicalSkills, ...roleSkillSet.map((s) => s.toLowerCase())])
  );

  const detectedSkills = allSkillsToScan.filter((skill) =>
    checkSkillMatch(resume, skill)
  );

  const importantSections = [
    "education",
    "experience",
    "technical skills",
    "projects",
    "achievements",
    "certifications",
  ];

  const detectedSections = importantSections.filter((section) =>
    resume.includes(section)
  );

  const requiredRoleSkills = roleSkillSet;

  const matchedRoleSkills = requiredRoleSkills.filter((skill) =>
    checkSkillMatch(resume, skill)
  );

  const missingRoleSkills = requiredRoleSkills.filter(
    (skill) => !checkSkillMatch(resume, skill)
  );

  // Categorized Skills detection (for structured display)
  const categorizedSkills = {};
  const categoriesToScan = roleConfig.skillCategories || {
    "Programming": ["Python"],
    "Database": ["SQL", "MySQL", "PostgreSQL"],
    "Data Analysis": ["Pandas", "NumPy", "Data Cleaning", "Exploratory Data Analysis", "Data Transformation", "ETL"],
    "Visualization": ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Dashboard Development"],
    "Statistics": ["Descriptive Statistics", "Hypothesis Testing", "A/B Testing", "Statistics"],
    "Excel": ["Microsoft Excel", "Pivot Tables", "Power Query", "DAX"],
    "Business Intelligence & Reporting": ["Business Intelligence", "KPI Analysis", "Reporting", "Data Interpretation", "Problem Solving"]
  };

  for (const [catName, catSkills] of Object.entries(categoriesToScan)) {
    const matchedInCat = catSkills.filter((s) =>
      checkSkillMatch(resume, s.toLowerCase())
    );
    if (matchedInCat.length > 0) {
      categorizedSkills[catName] = matchedInCat;
    }
  }

  // Tiered Skill Analysis (Essential vs Important vs Bonus)
  const essentialSkills = Array.isArray(roleConfig.essentialSkills) ? roleConfig.essentialSkills : [];
  const importantSkills = Array.isArray(roleConfig.importantSkills) ? roleConfig.importantSkills : [];
  const bonusSkills = Array.isArray(roleConfig.bonusSkills) ? roleConfig.bonusSkills : [];

  const matchedEssential = essentialSkills.filter((skill) => checkSkillMatch(resume, skill));
  const missingEssential = essentialSkills.filter((skill) => !checkSkillMatch(resume, skill));

  const matchedImportant = importantSkills.filter((skill) => checkSkillMatch(resume, skill));
  const missingImportant = importantSkills.filter((skill) => !checkSkillMatch(resume, skill));

  const matchedBonus = bonusSkills.filter((skill) => checkSkillMatch(resume, skill));
  const missingBonus = bonusSkills.filter((skill) => !checkSkillMatch(resume, skill));

  let roleMatchScore = 0;
  let essentialMatchScore = 0;
  let importantMatchScore = 0;
  let bonusMatchScore = 0;

  if (essentialSkills.length > 0 || importantSkills.length > 0) {
    essentialMatchScore = essentialSkills.length > 0
      ? Math.round((matchedEssential.length / essentialSkills.length) * 100)
      : 100;
    importantMatchScore = importantSkills.length > 0
      ? Math.round((matchedImportant.length / importantSkills.length) * 100)
      : 100;
    bonusMatchScore = bonusSkills.length > 0
      ? Math.round((matchedBonus.length / bonusSkills.length) * 100)
      : 0;

    // ATS system gives higher importance to essential skills (65% Essential, 25% Important, 10% Bonus)
    roleMatchScore = Math.round(
      essentialMatchScore * 0.65 +
      importantMatchScore * 0.25 +
      bonusMatchScore * 0.10
    );
  } else {
    roleMatchScore =
      requiredRoleSkills.length > 0
        ? Math.round((matchedRoleSkills.length / requiredRoleSkills.length) * 100)
        : 0;
  }

  const sectionScore = Math.round(
    (detectedSections.length / importantSections.length) * 100
  );

  const wordCount = resume.split(/\s+/).filter(Boolean).length;

  const lengthScore =
    wordCount >= 300 && wordCount <= 900
      ? 100
      : wordCount >= 150
      ? 70
      : 40;

  // Calibrated ATS score: 50% Role Match, 30% Sections, 20% Length/Format
  const atsScore = Math.round(
    roleMatchScore * 0.5 + sectionScore * 0.3 + lengthScore * 0.2
  );

  console.log("========== DYNAMIC ROLE ANALYSIS ==========");
  console.log("Target Role:", targetRole);
  console.log("Role Category:", roleConfig.category);
  console.log("Required Role Skills:", requiredRoleSkills);
  console.log("Matched Role Skills:", matchedRoleSkills);
  console.log("Missing Role Skills:", missingRoleSkills);
  console.log("Role Match Score:", roleMatchScore);
  console.log("Calibrated ATS Score:", atsScore);
  console.log("===========================================");

  // Project Relevance Scanner (Specifically identifies Data Analyst project domains)
  const projectDomains = [
    { domain: "Sales Performance Dashboard", keywords: ["sales analysis", "sales performance", "sales dashboard", "revenue analysis", "retail sales"], tech: ["SQL", "Excel", "Power BI", "DAX"] },
    { domain: "Customer Churn & Retention Analysis", keywords: ["customer analysis", "customer segmentation", "churn", "retention", "user retention"], tech: ["Python", "Pandas", "Statistics", "SQL"] },
    { domain: "Financial Data Modeling", keywords: ["financial analysis", "financial data", "p&l", "budget variance", "expense tracking"], tech: ["Excel", "Python", "Power BI"] },
    { domain: "Marketing Campaign Analytics", keywords: ["marketing analytics", "marketing campaign", "ad spend", "conversion rate", "roas", "cac"], tech: ["SQL", "Power BI", "KPI Analysis"] },
    { domain: "E-Commerce Customer Behavior", keywords: ["e-commerce", "ecommerce", "superstore", "online retail", "cart abandonment"], tech: ["Python", "Pandas", "SQL", "Tableau"] },
    { domain: "Business Intelligence & Reporting", keywords: ["business intelligence", "bi dashboard", "executive reporting", "kpi report"], tech: ["Power BI", "Tableau", "SQL", "DAX"] },
    { domain: "Dashboard Creation & Storytelling", keywords: ["dashboard creation", "dashboard development", "interactive dashboard", "built dashboards", "built dashboard"], tech: ["Power BI", "Tableau", "Excel"] },
    { domain: "Data Cleaning & Preprocessing", keywords: ["data cleaning", "data wrangling", "data preprocessing", "cleaned data"], tech: ["Python", "Pandas", "Power Query", "SQL"] },
    { domain: "Data Visualization & EDA", keywords: ["data visualization", "visualized data", "visualizations", "charts"], tech: ["Power BI", "Tableau", "Matplotlib", "Seaborn"] },
    { domain: "SQL Analytics Pipeline", keywords: ["sql analysis", "sql queries", "sql pipeline", "window functions", "complex joins"], tech: ["SQL", "PostgreSQL", "MySQL"] },
    { domain: "Python Analytics & DataFrames", keywords: ["python data analysis", "pandas dataframe", "numpy", "jupyter notebook"], tech: ["Python", "Pandas", "NumPy"] },
    { domain: "Predictive Analytics & Forecasting", keywords: ["predictive analytics", "predictive model", "forecasting", "trend analysis"], tech: ["Python", "Machine Learning", "Statistics"] },
    { domain: "Statistical & A/B Testing", keywords: ["statistical analysis", "hypothesis testing", "a/b testing", "descriptive statistics"], tech: ["Statistics", "Python", "Excel"] },
  ];

  const detectedProjects = [];
  projectDomains.forEach(({ domain, keywords, tech }) => {
    const hasKeyword = keywords.some((kw) => resume.includes(kw.toLowerCase()));
    if (hasKeyword) {
      const matchedTech = tech.filter((t) => checkSkillMatch(resume, t.toLowerCase()));
      detectedProjects.push({
        domain,
        technologies: matchedTech.length > 0 ? matchedTech : [tech[0]],
      });
    }
  });

  const skillRecommendations = {
    html: ["HTML5 semantic tags", "Responsive forms & tables", "Web accessibility (WCAG)"],
    css: ["Flexbox & CSS Grid", "Responsive mobile-first layout", "Tailwind CSS & animations"],
    javascript: ["ES6+ syntax & modules", "Async/Await & Promises", "DOM & Event handling"],
    react: ["Component architecture & JSX", "Hooks (useState, useEffect, useMemo)", "React Router & state management"],
    "node.js": ["Node runtime & event loop", "Express.js REST APIs", "Middleware & authentication"],
    express: ["Express routing & controllers", "Error handling middleware", "JWT auth & route protection"],
    mongodb: ["Document schema design & Mongoose", "CRUD & indexing", "Aggregation pipelines"],
    sql: ["Complex multi-table JOINs (INNER, LEFT, FULL)", "Window functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG)", "Query indexing, CTEs & performance optimization"],
    mysql: ["Relational schema normalization (3NF)", "Stored procedures, views & triggers", "Analytical joins & subqueries"],
    postgresql: ["Analytical window functions & CTEs", "JSONB indexing & semi-structured queries", "Query explain plans & execution tuning"],
    git: ["Git branching & merge workflows", "Pull requests & code reviews", "GitHub Actions CI/CD"],
    python: ["Pandas & NumPy data manipulation", "Data wrangling, cleaning & missing value imputation", "Jupyter Notebook reproducible exploratory workflows"],
    java: ["Core Java OOP & Collections", "Spring Boot REST APIs", "Hibernate & JPA relationships"],
    "spring boot": ["IoC container & annotations", "Spring Data JPA & Repositories", "Spring Security & JWT"],
    dsa: ["Arrays, Strings & HashMaps", "Trees & Graph traversals", "Dynamic Programming patterns"],
    "power bi": ["Star schema modeling & relationship cardinality", "DAX calculated measures vs columns (CALCULATE, FILTER)", "Interactive dashboard visuals, drill-throughs & slicers"],
    tableau: ["Calculated fields & parameters", "Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE)", "Interactive dashboard actions & storytelling"],
    excel: ["Advanced VLOOKUP & XLOOKUP formulas", "Dynamic Pivot Tables & Slicers", "Power Query ETL data transformation"],
    "microsoft excel": ["Advanced VLOOKUP & XLOOKUP formulas", "Dynamic Pivot Tables & Slicers", "Power Query ETL data transformation"],
    pandas: ["DataFrame filtering, grouping & aggregations", "Merging, concatenating & reshaping data", "Handling null values & feature engineering"],
    numpy: ["Multi-dimensional arrays & vectorized math", "Statistical broadcasting operations", "Matrix manipulations"],
    "data cleaning": ["Handling missing data & duplicates", "Type casting & regex string sanitization", "Outlier detection & removal pipelines"],
    "data analysis": ["Exploratory data analysis (EDA)", "Cohort analysis & trend identification", "Translating raw metrics into business decisions"],
    "exploratory data analysis": ["Summary statistics & distributions", "Correlation heatmaps & bivariate analysis", "Data profiling & actionable insights"],
    statistics: ["Descriptive statistics (Mean, Median, Std Dev)", "Probability distributions & confidence intervals", "Hypothesis testing & p-value interpretation"],
    "data visualization": ["Chart selection principles (Bar, Line, Scatter, Heatmap)", "Visual hierarchy & dashboard color theory", "Executive storytelling with data"],
    "dashboard development": ["Defining North Star metrics & KPI cards", "Visual hierarchy & user experience design", "Performance optimization for real-time dashboards"],
    "data interpretation": ["Translating complex analytics into stakeholder recommendations", "Root-cause diagnostics & variance analysis", "Scenario analysis & business impact"],
    "problem solving": ["Deconstructing ambiguous business problems", "Hypothesis-driven structured problem solving", "Analytical frameworks (MECE, 5 Whys)"],
    matplotlib: ["Custom subplots & multi-axis layouts", "Publication-ready formatting & themes", "Visualizing analytical distributions"],
    seaborn: ["Pairplots, jointplots & distribution plots", "Correlation heatmaps with statistical annotations", "Categorical plotting (box, violin, swarm)"],
    "jupyter notebook": ["Modular exploratory coding & markdown notes", "Exporting reproducible reports", "Interactive widgets with ipywidgets"],
    "microsoft power query": ["Automated ETL refresh pipelines", "Merging, unpivoting & splitting columns", "M code custom transformations"],
    "power query": ["Automated ETL refresh pipelines", "Merging, unpivoting & splitting columns", "M code custom transformations"],
    dax: ["Dynamic time-intelligence (YTD, QTD, MoM growth)", "CALCULATE modifier functions (USERELATIONSHIP, ALL)", "Performance tuning of DAX measures"],
    etl: ["Data extraction from diverse source systems", "Data transformation, deduplication & validation", "Loading into analytical warehouses (Star schema)"],
    "data transformation": ["Pivoting, unpivoting & reshaping tables", "Feature extraction & standardized scaling", "Data pipeline automation"],
    "business intelligence": ["Enterprise data warehouse schema design", "Executive reporting & KPI monitoring", "Bridging business stakeholder needs with data solutions"],
    "kpi analysis": ["Formulating business metrics (CAC, LTV, Churn, ARR, ROAS)", "Cohort retention curves & conversion funnel tracking", "Variance analysis against quarterly targets"],
    reporting: ["Automated executive summary dashboards", "Scheduled stakeholder reporting cadences", "Data governance & presentation standards"],
    "a/b testing": ["Sample size estimation & power analysis", "Formulating null vs alternative hypotheses", "Confidence intervals & p-value business decisions"],
    "hypothesis testing": ["One-sample, two-sample t-tests & z-tests", "Chi-square tests for categorical distributions", "ANOVA & controlling Type I/II errors"],
    "machine learning": ["Supervised & Unsupervised algorithms", "Scikit-Learn pipelines", "Model evaluation metrics (ROC/AUC, F1)"],
    "deep learning": ["Neural network fundamentals", "PyTorch / TensorFlow models", "Transfer learning & fine-tuning"],
    pytorch: ["Tensors & autograd gradients", "Building custom nn.Modules", "Training loops & optimizers"],
    docker: ["Writing efficient Dockerfiles", "Multi-stage builds", "Docker Compose multi-service stacks"],
    kubernetes: ["Pods, Deployments & Services", "Ingress & ConfigMaps", "Horizontal Pod Autoscaling"],
    aws: ["VPC & Cloud Networking", "EC2 Compute & Auto Scaling", "S3 Storage & IAM security"],
    linux: ["Command line navigation", "File permissions & systemd", "Bash scripting for automation"],
    wireshark: ["Packet capture analysis", "TCP stream reassembly", "Identifying malicious network signatures"],
    splunk: ["Log ingestion & parsing", "Writing SPL queries", "Configuring security alert dashboards"],
    selenium: ["WebDriver element locators", "Page Object Model (POM)", "TestNG data-driven assertions"],
    playwright: ["Async end-to-end testing", "Network interception & mocking", "Cross-browser test execution"],
    kotlin: ["Kotlin null safety & lambdas", "Coroutines & Flow", "Jetpack Compose declarative UI"],
    flutter: ["Widget lifecycle & layout", "BLoC / Riverpod state management", "Cross-platform iOS/Android deployment"],
    figma: ["Auto Layout & component variants", "Interactive prototyping", "Design systems & typography scales"]
  };

  const roleRecommendations = missingRoleSkills.map((skill) => ({
    skill,
    topics:
      skillRecommendations[skill.toLowerCase()] || [
        `Core concepts and industry best practices for ${skill}`,
        `Practical hands-on project implementation with ${skill}`,
        `Top technical interview questions and patterns for ${skill}`,
      ],
  }));

  const strengths = [];

  if (detectedSkills.length >= 8) {
    strengths.push("Good technical skill coverage");
  }
  if (matchedEssential.length >= 6) {
    strengths.push("Strong essential core competency alignment");
  }
  if (detectedSections.includes("education")) {
    strengths.push("Education section is present");
  }
  if (detectedSections.includes("experience")) {
    strengths.push("Experience section is present");
  }
  if (detectedSections.includes("technical skills")) {
    strengths.push("Technical Skills section is clearly defined");
  }
  if (detectedSections.includes("certifications")) {
    strengths.push("Certifications are included");
  }
  if (detectedProjects.length > 0) {
    strengths.push(`Identified ${detectedProjects.length} domain-relevant project(s)`);
  }

  const weaknesses = [];

  if (!detectedSections.includes("projects")) {
    weaknesses.push("Projects section is missing");
  }
  if (!detectedSections.includes("achievements")) {
    weaknesses.push("Achievements section could be improved");
  }
  if (detectedSkills.length < 8) {
    weaknesses.push("Add more relevant technical skills");
  }
  if (missingEssential.length > 0) {
    weaknesses.push(`Missing ${missingEssential.length} essential skill(s) for ${targetRole}`);
  }
  if (wordCount < 300) {
    weaknesses.push("Resume content may be too short");
  }
  if (wordCount > 900) {
    weaknesses.push("Resume may contain unnecessary content");
  }

  // Personalized Recommendations based on actual missing skills
  const recommendations = [];

  if (missingEssential.includes("sql") || missingRoleSkills.includes("sql")) {
    recommendations.push("Master and highlight SQL multi-table JOINs, window functions (ROW_NUMBER, RANK), and CTEs as SQL is essential for Data Analysts.");
  }
  if (missingEssential.includes("microsoft excel") || missingEssential.includes("excel") || missingRoleSkills.includes("excel")) {
    recommendations.push("Showcase advanced Excel proficiency with XLOOKUP, dynamic Pivot Tables, and Power Query data transformation.");
  }
  if (missingEssential.includes("power bi") || missingEssential.includes("tableau") || missingRoleSkills.includes("power bi") || missingRoleSkills.includes("tableau")) {
    recommendations.push("Build and link interactive dashboards using Power BI or Tableau to demonstrate executive storytelling and KPI tracking.");
  }
  if (missingEssential.includes("python") || missingEssential.includes("pandas") || missingRoleSkills.includes("python") || missingRoleSkills.includes("pandas")) {
    recommendations.push("Learn Python, Pandas, and NumPy for automated data wrangling, cleaning, and exploratory data analysis (EDA).");
  }
  if (missingEssential.includes("statistics") || missingRoleSkills.includes("statistics")) {
    recommendations.push("Strengthen your statistical foundations in hypothesis testing, p-values, and A/B testing to support analytical conclusions.");
  }
  if (missingEssential.includes("dashboard development") || missingRoleSkills.includes("dashboard development")) {
    recommendations.push("Develop a dedicated business dashboard project showcasing clean visual hierarchy and executive KPI summaries.");
  }
  if (!detectedSections.includes("projects")) {
    recommendations.push("Add a Projects section with 2–3 relevant projects and briefly mention the technologies used.");
  }
  if (detectedSkills.length < 8) {
    recommendations.push("Add more relevant technical skills that match your target job role.");
  }
  if (!detectedSections.includes("certifications")) {
    recommendations.push("Add relevant certifications or courses (e.g. Microsoft Power BI, Google Data Analytics) to strengthen your resume.");
  }
  if (!detectedSections.includes("achievements")) {
    recommendations.push("Include important achievements, competitions, awards, or academic accomplishments.");
  }
  if (wordCount < 300) {
    recommendations.push("Add more relevant details to your resume while keeping the content concise.");
  }
  if (wordCount > 900) {
    recommendations.push("Reduce unnecessary information and keep your resume focused on job-relevant content.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Your resume has a good overall structure. Continue tailoring it to each job description.");
  }

  // Job Readiness Assessment
  const jobReadiness = {
    strongAreas: strengths.length > 0 ? strengths : ["Basic formatting complete"],
    skillsToImprove: [
      ...missingEssential.map((s) => `Essential: ${s}`),
      ...missingImportant.slice(0, 4).map((s) => `Important: ${s}`),
    ],
    missingSkills: missingRoleSkills,
    recommendedProjects: (Array.isArray(roleConfig.recommendedProjects) ? roleConfig.recommendedProjects : []).filter((p) => {
      if (!p.skillsAddressed) return true;
      return p.skillsAddressed.some(
        (s) => missingRoleSkills.includes(s.toLowerCase()) || missingEssential.includes(s.toLowerCase())
      );
    }).slice(0, 4),
    recommendedLearning: missingEssential.slice(0, 3).map((skill) => ({
      skill,
      topics: skillRecommendations[skill.toLowerCase()] || [
        `Core concepts for ${skill}`,
        `Hands-on practical implementation with ${skill}`,
      ],
    })),
    interviewPreparation: Array.isArray(roleConfig.interviewTopics)
      ? roleConfig.interviewTopics
      : [
          "Live SQL query screenings (Joins, Window Functions)",
          "Business case studies & metric formulation (CAC, LTV, Retention)",
          "Data storytelling & dashboard walkthroughs",
        ],
  };

  const analysisData = {
    atsScore,
    detectedSkills,
    categorizedSkills,
    detectedSections,
    wordCount,
    strengths,
    weaknesses,
    recommendations,
    targetRole,
    roleMatchScore,
    matchedRoleSkills,
    missingRoleSkills,
    essentialMatchScore,
    importantMatchScore,
    bonusMatchScore,
    matchedEssentialSkills: matchedEssential,
    missingEssentialSkills: missingEssential,
    matchedImportantSkills: matchedImportant,
    missingImportantSkills: missingImportant,
    matchedBonusSkills: matchedBonus,
    missingBonusSkills: missingBonus,
    roleRecommendations,
    detectedProjects,
    jobReadiness,
  };

  console.log("===== SAVING RESUME ANALYSIS =====");
  console.log("Analysis Data:", analysisData);
  setResumeAnalysis(analysisData);

  localStorage.setItem(
    "resumeAnalysis",
    JSON.stringify(analysisData)
  );

  alert("Resume analysis completed!");
};

  // =========================
  // JD MATCHER & BULLET REWRITER HANDLERS
  // =========================
  const handleMatchJd = async () => {
    if (!jdInput || !jdInput.trim()) {
      alert("Please paste a job description first.");
      return;
    }

    if (!resumeText || !resumeText.trim()) {
      alert("Please upload your PDF resume or paste your resume text first so SAARTHIX can compare it against the job description.");
      return;
    }

    const targetRole = profile?.targetRole || profileData?.targetRole || "Software Developer";

    try {
      setJdMatching(true);
      const response = await fetch(`${API_BASE_URL}/api/mentor/match-jd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription: jdInput.trim(),
          targetRole,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to analyze Job Description.");
      }

      setJdResult(data);
    } catch (err) {
      console.error("JD Match Error:", err);
      alert(err.message || "Failed to analyze Job Description. Please try again.");
    } finally {
      setJdMatching(false);
    }
  };

  const handleRewriteBullet = async () => {
    if (!bulletInput || !bulletInput.trim()) {
      alert("Please enter a bullet point to rewrite.");
      return;
    }

    const targetRole = profile?.targetRole || profileData?.targetRole || "Software Developer";

    try {
      setBulletRewriting(true);
      const response = await fetch(`${API_BASE_URL}/api/mentor/rewrite-bullet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bulletText: bulletInput.trim(),
          targetRole,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to rewrite bullet point.");
      }

      setBulletResult(data);
    } catch (err) {
      console.error("Bullet Rewriter Error:", err);
      alert(err.message || "Failed to rewrite bullet point. Please try again.");
    } finally {
      setBulletRewriting(false);
    }
  };

  const handleCopyBullet = (text, idx) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(() => {
      alert("Unable to copy to clipboard.");
    });
  };

  // =========================
  // MOCK INTERVIEW SIMULATOR HANDLERS
  // =========================
  const handleStartInterview = async () => {
    const targetRole = profile?.targetRole || profileData?.targetRole || "Software Developer";
    try {
      setInterviewStarting(true);
      setInterviewHistory([]);
      setInterviewLastEval(null);
      setInterviewScorecard(null);
      setInterviewUserAnswer("");
      setShowInterviewHint(false);
      setShowModelAnswer(false);

      const response = await fetch(`${API_BASE_URL}/api/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          interviewType,
          experienceLevel: interviewLevel,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to start interview simulator.");
      }

      setInterviewCurrentQ(data);
      setInterviewStatus("in-progress");
    } catch (err) {
      console.error("Interview Start Error:", err);
      alert(err.message || "Failed to start interview simulator. Please try again.");
    } finally {
      setInterviewStarting(false);
    }
  };

  const handleSubmitInterviewAnswer = async () => {
    if (!interviewUserAnswer || !interviewUserAnswer.trim()) {
      alert("Please enter your answer before submitting.");
      return;
    }

    const targetRole = profile?.targetRole || profileData?.targetRole || "Software Developer";

    try {
      setInterviewEvaluating(true);
      const response = await fetch(`${API_BASE_URL}/api/interview/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          interviewType,
          questionNumber: interviewCurrentQ?.questionNumber || 1,
          totalQuestions: interviewCurrentQ?.totalQuestions || 5,
          question: interviewCurrentQ?.question || "",
          userAnswer: interviewUserAnswer.trim(),
          history: interviewHistory,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to evaluate answer.");
      }

      const turnRecord = {
        questionNumber: interviewCurrentQ?.questionNumber || 1,
        question: interviewCurrentQ?.question || "",
        topic: interviewCurrentQ?.topic || "Technical Area",
        userAnswer: interviewUserAnswer.trim(),
        score: data.score,
        feedback: data.feedback,
        strengths: data.strengths || [],
        missingConcepts: data.missingConcepts || [],
        idealAnswer: data.idealAnswer || "",
      };

      setInterviewHistory((prev) => [...prev, turnRecord]);
      setInterviewLastEval(data);
      setInterviewStatus("reviewed");
    } catch (err) {
      console.error("Interview Evaluate Error:", err);
      alert(err.message || "Failed to evaluate your answer. Please try again.");
    } finally {
      setInterviewEvaluating(false);
    }
  };

  const handleNextInterviewQuestion = () => {
    if (!interviewLastEval) return;

    if (interviewLastEval.isFinished || (interviewCurrentQ?.questionNumber || 1) >= 5) {
      handleCompleteInterview();
      return;
    }

    const nextQNum = (interviewCurrentQ?.questionNumber || 1) + 1;
    setInterviewCurrentQ({
      questionNumber: nextQNum,
      totalQuestions: 5,
      question: interviewLastEval.nextQuestion || "Discuss your approach to software architecture and testing.",
      topic: interviewLastEval.nextTopic || "System Architecture",
      tip: "",
    });
    setInterviewUserAnswer("");
    setInterviewLastEval(null);
    setShowInterviewHint(false);
    setShowModelAnswer(false);
    setInterviewStatus("in-progress");
  };

  const handleCompleteInterview = async (customHistory = null) => {
    const historyToUse = customHistory || interviewHistory;
    const targetRole = profile?.targetRole || profileData?.targetRole || "Software Developer";

    try {
      setInterviewFinishing(true);
      const response = await fetch(`${API_BASE_URL}/api/interview/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          interviewType,
          history: historyToUse,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to finalize scorecard.");
      }

      setInterviewScorecard(data);
      setInterviewStatus("completed");
    } catch (err) {
      console.error("Interview Finalize Error:", err);
      alert(err.message || "Failed to finalize scorecard.");
    } finally {
      setInterviewFinishing(false);
    }
  };

  const handleResetInterview = () => {
    setInterviewStatus("idle");
    setInterviewCurrentQ(null);
    setInterviewUserAnswer("");
    setInterviewLastEval(null);
    setInterviewHistory([]);
    setInterviewScorecard(null);
    setShowInterviewHint(false);
    setShowModelAnswer(false);
  };



  // =========================
  // LOAD PROFILE WHEN PAGE CHANGES
  // =========================

  useEffect(() => {
    if (
      page === "profile" ||
      page === "dashboard" ||
      page === "skill-gap" ||
      page === "mock-interview" ||
      page === "resume-analysis"
    ) {
      void Promise.resolve().then(loadProfile);
    }
  }, [loadProfile, page]);


 // =========================
// SAVE USER ROADMAP PROGRESS
// =========================







  // =========================
  // PLACEMENT SCORE
  // =========================

  const calculatePlacementScore = () => {
    if (!profile) {
      return 0;
    }

    let score = 0;

    // Education = 20
    if (profile.education) {
      score += 20;
    }

    // Skills = 30
    if (Array.isArray(profile.skills)) {
      if (profile.skills.length >= 5) {
        score += 30;
      } else {
        score += profile.skills.length * 6;
      }
    }

    // Target Role = 20
    if (profile.targetRole) {
      score += 20;
    }

    // Experience = 10
    if (profile.experience) {
      score += 10;
    }

    // Projects = 20
    if (Array.isArray(profile.projects)) {
      if (profile.projects.length >= 2) {
        score += 20;
      } else {
        score += profile.projects.length * 10;
      }
    }

    return score;
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("Creating account...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: registerData.name.trim(),
            email: registerData.email.trim(),
            password: registerData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Account created successfully! 🎉"
        );

        setRegisterData({
          name: "",
          email: "",
          password: "",
        });

        setPage("login");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage(
        "Unable to connect to server."
      );
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("Logging in...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: loginData.email.trim(),
            password: loginData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
        setCurrentUser(data.user);
        setRoadmapProgress(getRoadmapProgress(data.user.id));
        setLoginData({ email: "", password: "" });

        setMessage(
          "Login successful! 🎉"
        );

        // Clear old profile
        setProfile(null);

        // Go to profile first
        setPage("profile");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage(
        "Unable to connect to server."
      );
    }
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleProfileSave = async (e) => {
    e.preventDefault();

    setMessage(
      "Saving your profile..."
    );

    try {
      if (!currentUser?.id) {
        setMessage(
          "User information not found."
        );

        setPage("login");

        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/profile/${currentUser.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            education:
              profileData.education,

            skills: profileData.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              )
              .filter(Boolean),

            targetRole:
              profileData.targetRole,

            experience:
              profileData.experience,

            projects: profileData.projects
              .split(",")
              .map((project) =>
                project.trim()
              )
              .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        setProfileData(toProfileFormData(data.user));

        setMessage(
          "Profile saved successfully! 🎉"
        );

        // Go dashboard
        setPage("dashboard");
      } else {
        setMessage(data.message);
        if (response.status === 401) {
          handleLogout();
        }
      }
    } catch {
      setMessage(
        "Unable to connect to server."
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
      localStorage.removeItem("currentPage");


    setCurrentUser(null);
    setProfile(null);
    setProfileData(emptyProfile);
    setRoadmapProgress({});

    setPage("home");
  };

  // =========================
  // HOME
  // =========================

  if (page === "home") {
    return (
      <div className="app">

        {/* NAVBAR */}

        <nav className="navbar">

          <div className="logo">
            SAARTHIX <span>AI</span>
          </div>

          <div className="nav-links">

            <button
              onClick={() =>
                setPage("home")
              }
            >
              Home
            </button>

            <button
              onClick={() =>
                setPage("features")
              }
            >
              Features
            </button>

            <button
              onClick={() =>
                setPage("login")
              }
            >
              Login
            </button>

            <button
              className="nav-cta"
              onClick={() =>
                setPage("register")
              }
            >
              Get Started
            </button>

          </div>

        </nav>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              ✨ AI-POWERED CAREER PLATFORM
            </div>

            <h1>
              Build Your Career.
              <br />

              <span className="gradient-text">
                Become Job Ready.
              </span>
            </h1>

            <p className="hero-description">
              SAARTHIX AI analyzes your
              skills, identifies your gaps,
              and creates a personalized
              roadmap to help you achieve
              your career goals.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() =>
                  setPage("register")
                }
              >
                Get Started →
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  setPage("features")
                }
              >
                Explore Features
              </button>

            </div>

          </div>

        </section>

        {/* FEATURES */}

        <section className="section">

          <div className="section-heading">

            <div className="badge">
              SAARTHIX AI
            </div>

            <h2>
              Everything you need to become
              <br />

              <span className="gradient-text">
                placement ready.
              </span>
            </h2>

            <p>
              One platform to plan,
              prepare and accelerate
              your career.
            </p>

          </div>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Placement Readiness
              </h3>

              <p>
                Analyze your current
                skills and get a
                personalized placement
                readiness score.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🧠
              </div>

              <h3>
                AI Career Mentor
              </h3>

              <p>
                Get AI-powered guidance
                for career decisions,
                interviews and learning.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Skill Gap Analysis
              </h3>

              <p>
                Discover the skills you
                need to improve for your
                target job role.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🗺️
              </div>

              <h3>
                Personalized Roadmap
              </h3>

              <p>
                Follow a learning roadmap
                based on your career goals.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📄
              </div>

              <h3>
                Resume Analysis
              </h3>

              <p>
                Analyze your resume and
                discover areas that can
                improve your opportunities.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                💼
              </div>

              <h3>
                Job Matching
              </h3>

              <p>
                Find job opportunities
                that match your skills
                and interests.
              </p>

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="section">

          <div className="section-heading">

            <div className="badge">
              SIMPLE PROCESS
            </div>

            <h2>
              Your journey to becoming
              <br />

              <span className="gradient-text">
                job ready.
              </span>
            </h2>

          </div>

          <div className="steps">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>
                Create Your Profile
              </h3>

              <p>
                Add your education,
                skills, projects,
                experience and
                target career.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <h3>
                Analyze Your Skills
              </h3>

              <p>
                SAARTHIX AI analyzes
                your profile and
                identifies your strengths
                and gaps.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>
                Get Your Roadmap
              </h3>

              <p>
                Receive a personalized
                learning and placement
                preparation roadmap.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                04
              </div>

              <h3>
                Become Job Ready
              </h3>

              <p>
                Improve your skills,
                prepare for interviews
                and track your progress.
              </p>

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="section">

          <div className="section-heading">

            <div className="badge">
              START YOUR JOURNEY
            </div>

            <h2>
              Ready to become
              <br />

              <span className="gradient-text">
                job ready?
              </span>
            </h2>

            <p>
              Create your SAARTHIX AI
              profile and start building
              your career today.
            </p>

            <br />

            <button
              className="primary-btn"
              onClick={() =>
                setPage("register")
              }
            >
              Create Free Account →
            </button>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="footer">

          <h3>
            SAARTHIX AI
          </h3>

          <p>
            Your AI-powered companion
            for career growth and
            placement preparation.
          </p>

          <br />

          <p>
            © 2026 SAARTHIX AI.
            All rights reserved.
          </p>

        </footer>

      </div>
    );
  }

  // =========================
  // FEATURES
  // =========================

  if (page === "features") {
    return (
      <div className="app">

        <nav className="navbar">

          <div className="logo">
            SAARTHIX <span>AI</span>
          </div>

          <div className="nav-links">

            <button
              onClick={() =>
                setPage("home")
              }
            >
              Home
            </button>

            <button
              onClick={() =>
                setPage("login")
              }
            >
              Login
            </button>

            <button
              className="nav-cta"
              onClick={() =>
                setPage("register")
              }
            >
              Get Started
            </button>

          </div>

        </nav>

        <section className="section">

          <div className="section-heading">

            <div className="badge">
              PLATFORM FEATURES
            </div>

            <h1>
              Everything you need for
              <br />

              <span className="gradient-text">
                your career.
              </span>
            </h1>

          </div>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Placement Readiness
              </h3>

              <p>
                Measure your preparation
                level and discover what
                you need to improve.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🧠
              </div>

              <h3>
                AI Career Mentor
              </h3>

              <p>
                Get personalized career
                guidance and interview
                preparation.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Skill Gap Analysis
              </h3>

              <p>
                Compare your current
                skills with the
                requirements of your
                target role.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🗺️
              </div>

              <h3>
                Career Roadmap
              </h3>

              <p>
                Follow a structured
                roadmap designed around
                your career goals.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📄
              </div>

              <h3>
                Resume Analysis
              </h3>

              <p>
                Identify improvements
                that can make your
                resume stronger.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                💼
              </div>

              <h3>
                Job Matching
              </h3>

              <p>
                Discover opportunities
                that match your skills
                and interests.
              </p>

            </div>

          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >

            <button
              className="primary-btn"
              onClick={() =>
                setPage("register")
              }
            >
              Start Your Career Journey →
            </button>

          </div>

        </section>

      </div>
    );
  }

  // =========================
  // REGISTER
  // =========================

  if (page === "register") {
    return (
      <div className="app">

        <div className="auth-container">

          <div className="auth-card">

            <button
              className="back-button"
              onClick={() =>
                setPage("home")
              }
            >
              ← Back to Home
            </button>

            <h1>
              Create your account
            </h1>

            <p className="auth-subtitle">
              Start your journey to
              becoming job ready.
            </p>

            <form
              onSubmit={handleRegister}
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Prince Kumar"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Password
                </label>

                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Create a password"
                    required
                    style={{ width: "100%", paddingRight: "42px" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#94a3b8",
                      padding: "4px",
                    }}
                    title={showRegisterPassword ? "Hide password" : "Show password"}
                  >
                    {showRegisterPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

              </div>


              <button
                className="auth-button"
                type="submit"
              >
                Create Account →
              </button>

            </form>

            <p className="auth-message">
              {message}
            </p>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Already have an account?
              </p>

              <button
                className="secondary-btn"
                onClick={() => {
                  setMessage("");
                  setPage("login");
                }}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================
  // LOGIN
  // =========================

  if (page === "login") {
    return (
      <div className="app">

        <div className="auth-container">

          <div className="auth-card">

            <button
              className="back-button"
              onClick={() =>
                setPage("home")
              }
            >
              ← Back to Home
            </button>

            <h1>
              Welcome back
            </h1>

            <p className="auth-subtitle">
              Continue your SAARTHIX AI
              journey.
            </p>

            <form
              onSubmit={handleLogin}
            >

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Password
                </label>

                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    required
                    style={{ width: "100%", paddingRight: "42px" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#94a3b8",
                      padding: "4px",
                    }}
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

              </div>


              <button
                className="auth-button"
                type="submit"
              >
                Login →
              </button>

            </form>

            <p className="auth-message">
              {message}
            </p>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Don't have an account?
              </p>

              <button
                className="secondary-btn"
                onClick={() => {
                  setMessage("");
                  setPage("register");
                }}
              >
                Create Account
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================
  // PROFILE
  // =========================

  if (page === "profile") {
    return (
      <div className="app">

        <nav className="navbar">

          <div className="logo">
            SAARTHIX <span>AI</span>
          </div>

          <div className="nav-links">

            <button
              onClick={() =>
                setPage("dashboard")
              }
            >
              Dashboard
            </button>

            <button
              className="nav-cta"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </nav>


        <div className="auth-container">

          <div
            className="auth-card"
            style={{
              maxWidth: "650px",
            }}
          >

            <div className="badge">
              CAREER PROFILE
            </div>

            <h1>
              Build your career profile
            </h1>

            <p className="auth-subtitle">
              Tell SAARTHIX AI about
              yourself so we can create
              a personalized career roadmap.
            </p>


            {profileLoading && (
              <p
                style={{
                  color: "#94a3b8",
                  textAlign: "center",
                }}
              >
                Loading your profile...
              </p>
            )}


            <form
              onSubmit={handleProfileSave}
            >

              {/* EDUCATION */}

              <div className="form-group">

                <label>
                  Education
                </label>

                <input
                  type="text"
                  value={
                    profileData.education
                  }
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      education:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. MCA, BCA, B.Tech"
                  required
                />

              </div>


              {/* SKILLS */}

              <div className="form-group">

                <label>
                  Skills
                </label>

                <input
                  type="text"
                  value={
                    profileData.skills
                  }
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      skills:
                        e.target.value,
                    })
                  }
                  placeholder="Java, JavaScript, React, SQL"
                  required
                />

                <small
                  style={{
                    display: "block",
                    marginTop: "7px",
                    color: "#64748b",
                  }}
                >
                  Separate skills with commas.
                </small>

              </div>


              {/* TARGET ROLE */}

              <div className="form-group">

                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Target Job Role <strong style={{ color: "#ef4444" }}>*</strong></span>
                  <span style={{ fontSize: "12px", color: "#6366f1", fontWeight: "600" }}>
                    30+ Roles Supported
                  </span>
                </label>

                <select
                  value={
                    getAllJobRoles().some(
                      (r) => r.name.toLowerCase() === (profileData.targetRole || "").trim().toLowerCase()
                    )
                      ? getAllJobRoles().find(
                          (r) => r.name.toLowerCase() === (profileData.targetRole || "").trim().toLowerCase()
                        ).name
                      : profileData.targetRole
                      ? "Other"
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "Other") {
                      const isPredef = getAllJobRoles().some(
                        (r) => r.name.toLowerCase() === (profileData.targetRole || "").trim().toLowerCase()
                      );
                      setProfileData({
                        ...profileData,
                        targetRole: isPredef ? "" : profileData.targetRole,
                      });
                    } else {
                      setProfileData({
                        ...profileData,
                        targetRole: val,
                      });
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    background: "#ffffff",
                    cursor: "pointer",
                  }}
                  required={!profileData.targetRole}
                >
                  <option value="" disabled>-- Select Your Target Role --</option>
                  {getRoleCategories().map((category) => (
                    <optgroup key={category} label={category}>
                      {getRolesByCategory(category).map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <optgroup label="Custom / Other">
                    <option value="Other">Other / Custom Job Role</option>
                  </optgroup>
                </select>

                {/* If Other or custom input */}
                {(!getAllJobRoles().some(
                  (r) => r.name.toLowerCase() === (profileData.targetRole || "").trim().toLowerCase()
                ) || profileData.targetRole === "Other") && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      value={profileData.targetRole === "Other" ? "" : profileData.targetRole}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          targetRole: e.target.value,
                        })
                      }
                      placeholder="Type your target role (e.g. Embedded Systems Engineer, Blockchain Developer)"
                      required
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #6366f1",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                )}

                {/* Active Role Quick Insights */}
                {profileData.targetRole && profileData.targetRole !== "Other" && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "rgba(99, 102, 241, 0.07)",
                      border: "1px solid rgba(99, 102, 241, 0.15)",
                      fontSize: "12px",
                      color: "#3730a3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    <span>
                      🎯 <strong>{getJobRoleByName(profileData.targetRole).name}</strong> ({getJobRoleByName(profileData.targetRole).category})
                    </span>
                    <span>
                      ⚡ {getJobRoleByName(profileData.targetRole).skills.length} core skills • {getJobRoleByName(profileData.targetRole).tools.length} industry tools
                    </span>
                  </div>
                )}

              </div>


              {/* EXPERIENCE */}

              <div className="form-group">

                <label>
                  Experience
                </label>

                <input
                  type="text"
                  value={
                    profileData.experience
                  }
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      experience:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Fresher / 1 year"
                />

              </div>


              {/* PROJECTS */}

              <div className="form-group">

                <label>
                  Projects
                </label>

                <input
                  type="text"
                  value={
                    profileData.projects
                  }
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      projects:
                        e.target.value,
                    })
                  }
                  placeholder="SAARTHIX AI, E-Commerce Website"
                />

                <small
                  style={{
                    display: "block",
                    marginTop: "7px",
                    color: "#64748b",
                  }}
                >
                  Separate projects with commas.
                </small>

              </div>


              <button
                className="auth-button"
                type="submit"
              >
                Save Profile →
              </button>

            </form>


            <p className="auth-message">
              {message}
            </p>

          </div>

        </div>

      </div>
    );
  }

    // =========================
  // DASHBOARD
  // =========================

  if (page === "dashboard") {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const skills = profileData.skills
      ? profileData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];

    const projects = profileData.projects
      ? profileData.projects
          .split(",")
          .map((project) => project.trim())
          .filter(Boolean)
      : [];

    const placementScore = calculatePlacementScore();

    return (
      <div className="dashboard-page">

        {/* NAVBAR */}
        <nav className="dashboard-navbar">

          <div className="logo">
            SAARTHIX <span>AI</span>
          </div>

          <div className="dashboard-nav-right">

            {/* NAVIGATION ACTIONS */}

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  {/* DASHBOARD */}

  <button
    type="button"
    onClick={() => setPage("dashboard")}
    style={{
      border: "none",
      background:
        page === "dashboard"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "dashboard"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition:
        "all 0.25s ease",
      transform: "translateY(0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "rgba(99,102,241,0.10)";
      e.currentTarget.style.color = "#4f46e5";
      e.currentTarget.style.transform =
        "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background =
        page === "dashboard"
          ? "rgba(99,102,241,0.10)"
          : "transparent";
      e.currentTarget.style.color =
        page === "dashboard"
          ? "#4f46e5"
          : "#475569";
      e.currentTarget.style.transform =
        "translateY(0)";
    }}
  >
    Dashboard
  </button>

  {/* RESUME ANALYSIS */}
  <button
    type="button"
    onClick={() => setPage("resume-analysis")}
    style={{
      border: "none",
      background:
        page === "resume-analysis"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "resume-analysis"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: "translateY(0)",
    }}
  >
    Resume Analysis
  </button>

  {/* ROADMAP */}
  <button
    type="button"
    onClick={() => setPage("career-roadmap")}
    style={{
      border: "none",
      background:
        page === "career-roadmap"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "career-roadmap"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: "translateY(0)",
    }}
  >
    Roadmap
  </button>

  {/* AI MENTOR */}
  <button
    type="button"
    onClick={() => setPage("career-mentor")}
    style={{
      border: "none",
      background:
        page === "career-mentor"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "career-mentor"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: "translateY(0)",
    }}
  >
    AI Mentor
  </button>

  {/* MOCK INTERVIEW */}
  <button
    type="button"
    onClick={() => setPage("mock-interview")}
    style={{
      border: "none",
      background:
        page === "mock-interview"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "mock-interview"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: "translateY(0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "rgba(99,102,241,0.10)";
      e.currentTarget.style.color = "#4f46e5";
      e.currentTarget.style.transform =
        "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background =
        page === "mock-interview"
          ? "rgba(99,102,241,0.10)"
          : "transparent";
      e.currentTarget.style.color =
        page === "mock-interview"
          ? "#4f46e5"
          : "#475569";
      e.currentTarget.style.transform =
        "translateY(0)";
    }}
  >
    Mock Interview
  </button>

  {/* PROFILE */}

  <button
    type="button"
    onClick={() => setPage("profile")}
    style={{
      border: "none",
      background:
        page === "profile"
          ? "rgba(99,102,241,0.10)"
          : "transparent",
      padding: "10px 15px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color:
        page === "profile"
          ? "#4f46e5"
          : "#475569",
      cursor: "pointer",
      transition:
        "all 0.25s ease",
      transform: "translateY(0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "rgba(99,102,241,0.10)";
      e.currentTarget.style.color = "#4f46e5";
      e.currentTarget.style.transform =
        "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background =
        page === "profile"
          ? "rgba(99,102,241,0.10)"
          : "transparent";
      e.currentTarget.style.color =
        page === "profile"
          ? "#4f46e5"
          : "#475569";
      e.currentTarget.style.transform =
        "translateY(0)";
    }}
  >
    Profile
  </button>

  {/* USER NAME */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "7px 13px",
      marginLeft: "4px",
      borderRadius: "12px",
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(139,92,246,0.08))",
      border:
        "1px solid rgba(99,102,241,0.15)",
      transition:
        "all 0.25s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-2px)";
      e.currentTarget.style.boxShadow =
        "0 6px 18px rgba(99,102,241,0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
  >
    {/* AVATAR */}

    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "700",
        boxShadow:
          "0 3px 10px rgba(99,102,241,0.25)",
      }}
    >
      {(profile?.name || "U")
        .charAt(0)
        .toUpperCase()}
    </div>

    <span
      style={{
        color: "#334155",
        fontSize: "14px",
        fontWeight: "700",
        whiteSpace: "nowrap",
      }}
    >
      {profile?.name || "User"}
    </span>
  </div>

  {/* LOGOUT */}

  <button
    type="button"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("currentPage");

      setPage("home");
    }}
    style={{
      border:
        "1px solid rgba(239,68,68,0.20)",
      background: "rgba(239,68,68,0.04)",
      padding: "10px 15px",
      marginLeft: "3px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#dc2626",
      cursor: "pointer",
      transition:
        "all 0.25s ease",
      transform: "translateY(0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "#ef4444";
      e.currentTarget.style.color =
        "#ffffff";
      e.currentTarget.style.transform =
        "translateY(-2px)";
      e.currentTarget.style.boxShadow =
        "0 6px 16px rgba(239,68,68,0.20)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background =
        "rgba(239,68,68,0.04)";
      e.currentTarget.style.color =
        "#dc2626";
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
  >
    Logout
  </button>
</div>

          </div>

        </nav>

        {/* MAIN DASHBOARD */}
        <main className="dashboard-container">

          {/* WELCOME */}
          <section className="dashboard-welcome">

            <div>

              <div className="dashboard-badge">
                ✨ STUDENT DASHBOARD
              </div>

              <h1>
                Welcome back,{" "}
                <span>
                  {user?.name}
                </span>
              </h1>

              <p>
                Track your career progress,
                identify skill gaps and become
                placement ready.
              </p>

            </div>

            <div className="target-role-box">

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <span>TARGET ROLE</span>
                <button
                  type="button"
                  onClick={() => setPage("profile")}
                  style={{
                    border: "none",
                    background: "rgba(99,102,241,0.12)",
                    color: "#4f46e5",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  ✏️ Change
                </button>
              </div>

              <strong>
                {profileData.targetRole ||
                  "Not specified"}
              </strong>

            </div>

          </section>

          {/* STATS */}
          <section className="dashboard-stats">

            <div className="stat-card">

              <div className="stat-icon">
                🎯
              </div>

              <div>
                <span>
                  Placement Readiness
                </span>

                <strong>
                  {placementScore}%
                </strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                💻
              </div>

              <div>
                <span>
                  Skills Added
                </span>

                <strong>
                  {skills.length}
                </strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                🚀
              </div>

              <div>
                <span>
                  Projects
                </span>

                <strong>
                  {projects.length}
                </strong>
              </div>

            </div>

            <div className="stat-card">

              <div className="stat-icon">
                📈
              </div>

              <div>
                <span>
                  Profile Status
                </span>

                <strong>
                  {profileData.targetRole
                    ? "Ready"
                    : "Incomplete"}
                </strong>
              </div>

            </div>

          </section>

          {/* DASHBOARD GRID */}
          <section className="dashboard-grid">

            {/* PROFILE */}
            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <span className="card-label">
                    YOUR PROFILE
                  </span>

                  <h2>
                    Career Profile
                  </h2>
                </div>

                <div className="card-icon">
                  👤
                </div>

              </div>

              <div className="profile-info">

                <div>
                  <span>
                    Education
                  </span>

                  <strong>
                    {profileData.education ||
                      "Not added"}
                  </strong>
                </div>

                <div>
                  <span>
                    Target Role
                  </span>

                  <strong>
                    {profileData.targetRole ||
                      "Not added"}
                  </strong>
                </div>

                <div>
                  <span>
                    Experience
                  </span>

                  <strong>
                    {profileData.experience ||
                      "Fresher"}
                  </strong>
                </div>

              </div>

              <div className="skills-section">

                <span>
                  Skills
                </span>

                <div className="skill-tags">

                  {skills.length > 0 ? (
                    skills.map(
                      (skill, index) => (
                        <span key={index}>
                          {skill}
                        </span>
                      )
                    )
                  ) : (
                    <small>
                      No skills added yet.
                    </small>
                  )}

                </div>

              </div>

            </div>

            {/* PLACEMENT */}
            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <span className="card-label">
                    PLACEMENT
                  </span>

                  <h2>
                    Readiness Score
                  </h2>
                </div>

                <div className="card-icon">
                  🎯
                </div>

              </div>

              <div className="score-container">

                <div className="score-circle">

                  <strong>
                    {placementScore}%
                  </strong>

                  <span>
                    Ready
                  </span>

                </div>

              </div>

              <p className="score-description">
                Complete your profile and
                improve your skills to increase
                your placement readiness.
              </p>

            </div>

            {/* SKILL GAP */}
            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <span className="card-label">
                    ANALYSIS
                  </span>

                  <h2>
                    Skill Gap Analysis
                  </h2>
                </div>

                <div className="card-icon">
                  📊
                </div>

              </div>

              <p className="card-description">
                Discover which skills you need
                to improve for your target job
                role.
              </p>

              <button
                className="dashboard-action"
                onClick={() => setPage("skill-gap")}
              >
                Analyze Skills →
              </button>
            </div>

            {/* ROADMAP */}
            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <span className="card-label">
                    LEARNING
                  </span>

                  <h2>
                    Career Roadmap
                  </h2>
                </div>

                <div className="card-icon">
                  🗺️
                </div>

              </div>

              <div
                style={{
                  marginTop: "15px",
                }}
              >
                <p className="card-description">
                  Follow a personalized roadmap
                  based on your target career.
                </p>

                <div
                  style={{
                    marginTop: "15px",
                    height: "10px",
                    background: "#1e293b",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        Object.values(roadmapProgress).length > 0
                          ? Math.round(
                              (Object.values(roadmapProgress).filter(
                                Boolean
                              ).length /
                                Object.values(roadmapProgress).length) *
                                100
                            )
                          : 0
                      }%`,
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      borderRadius: "20px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>

                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#94a3b8",
                  }}
                >
                  Roadmap Progress:{" "}
                  {Object.values(roadmapProgress).length > 0
                    ? Math.round(
                        (Object.values(roadmapProgress).filter(
                          Boolean
                        ).length /
                          Object.values(roadmapProgress).length) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>

             <button
              className="dashboard-action"
              onClick={() => setPage("career-roadmap")}
              >
                View Roadmap →
              </button>

            </div>

            {/* RESUME ANALYSIS */}

<div
  className="dashboard-card"
  style={{
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-5px)";
    e.currentTarget.style.boxShadow =
      "0 12px 30px rgba(99,102,241,0.12)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "";
  }}
>
  <div className="card-header">

    <div>
      <span className="card-label">
        RESUME
      </span>

      <h2>
        Resume Analysis
      </h2>
    </div>

    <div
      className="card-icon"
      style={{
        transition:
          "transform 0.3s ease",
      }}
    >
      📄
    </div>

  </div>

  <p className="card-description">
    Upload your resume and discover
    improvements that can make your
    resume stronger and more
    job-ready.
  </p>

  <button
    className="dashboard-action"
    onClick={() =>
      setPage("resume-analysis")
    }
  >
    📊 Analyze Resume →
  </button>

</div>
            {/* AI MENTOR */}
            <div className="dashboard-card ai-card">

              <div className="card-header">

                <div>
                  <span className="card-label">
                    AI ASSISTANT
                  </span>

                  <h2>
                    AI Career Mentor
                  </h2>
                </div>

                <div className="card-icon">
                  🧠
                </div>

              </div>

              <p className="card-description">
                Get personalized guidance for
                career decisions, interviews,
                skills and placements.
              </p>

              <button
                className="dashboard-action"
                onClick={() =>
                  setPage("career-mentor")
                }
              >
                Ask AI Mentor →
              </button>

            </div>

            {/* MOCK INTERVIEW SIMULATOR */}
            <div
              className="dashboard-card"
              style={{
                transition: "all 0.3s ease",
                border: "1px solid rgba(139,92,246,0.25)",
                background: "linear-gradient(180deg, #ffffff 0%, rgba(245,243,255,0.7) 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(124,58,237,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="card-header">
                <div>
                  <span className="card-label" style={{ color: "#7c3aed" }}>
                    SIMULATOR
                  </span>
                  <h2>
                    Mock Interview
                  </h2>
                </div>
                <div className="card-icon" style={{ background: "rgba(124,58,237,0.10)", color: "#7c3aed" }}>
                  🎙️
                </div>
              </div>
              <p className="card-description">
                Dynamic 5-question AI interview session tailored to your target role with live 1-10 scoring, model answers & hiring scorecard.
              </p>
              <button
                className="dashboard-action"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  color: "#ffffff",
                  border: "none",
                }}
                onClick={() => setPage("mock-interview")}
              >
                🎙️ Practice Interview →
              </button>
            </div>

          </section>

          {/* PROJECTS */}
          <section className="dashboard-card projects-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  PROJECTS
                </span>

                <h2>
                  Your Projects
                </h2>
              </div>

              <div className="card-icon">
                🚀
              </div>

            </div>

            {projects.length > 0 ? (

              <div className="project-list">

                {projects.map(
                  (project, index) => (

                    <div
                      className="project-item"
                      key={index}
                    >

                      <span>
                        {index + 1}
                      </span>

                      <strong>
                        {project}
                      </strong>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="empty-projects">

                <p>
                  No projects added yet.
                </p>

                <small>
                  Add projects to strengthen
                  your career profile.
                </small>

              </div>

            )}

          </section>

          {/* NEXT STEPS */}
          <section className="next-steps">

            <div className="dashboard-badge">
              🚀 NEXT STEPS
            </div>

            <h2>
              Your journey starts here.
            </h2>

            <p>
              Complete your profile and start
              analyzing your career readiness.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setPage("profile")
              }
            >
              Update Profile →
            </button>

          </section>

        </main>

      </div>
    );
  }


  // =========================
// SKILL GAP ANALYSIS
// =========================

if (page === "skill-gap") {

  const targetRole =
    profile?.targetRole ||
    profileData?.targetRole ||
    "Full Stack Developer";

  const roleConfig = getJobRoleByName(targetRole);

  const userSkills = Array.isArray(profile?.skills)
    ? profile.skills.map((skill) =>
        skill.trim().toLowerCase()
      )
    : profileData.skills
        ? profileData.skills
            .split(",")
            .map((skill) =>
              skill.trim().toLowerCase()
            )
            .filter(Boolean)
        : [];

  const requiredSkills = Array.isArray(roleConfig.skills) ? roleConfig.skills : [];

  const matchedSkills = requiredSkills.filter((skill) =>
    userSkills.some(
      (us) =>
        us === skill.toLowerCase() ||
        us.includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(us)
    )
  );

  const missingSkills = requiredSkills.filter(
    (skill) =>
      !userSkills.some(
        (us) =>
          us === skill.toLowerCase() ||
          us.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(us)
      )
  );

  const learningRecommendations = {
    html: ["HTML5 semantic tags", "Responsive forms & tables", "Web accessibility (WCAG)"],
    css: ["Flexbox & CSS Grid", "Responsive mobile-first layout", "Tailwind CSS & animations"],
    javascript: ["ES6+ syntax & modules", "Async/Await & Promises", "DOM & Event handling"],
    react: ["Component architecture & JSX", "Hooks (useState, useEffect, useMemo)", "React Router & state management"],
    "node.js": ["Node runtime & event loop", "Express.js REST APIs", "Middleware & authentication"],
    express: ["Express routing & controllers", "Error handling middleware", "JWT auth & route protection"],
    mongodb: ["Document schema design & Mongoose", "CRUD & indexing", "Aggregation pipelines"],
    sql: ["Complex multi-table JOINs", "Window functions (ROW_NUMBER, RANK)", "Query indexing & optimization"],
    mysql: ["Schema design & foreign keys", "Stored procedures & triggers", "Transactions & ACID"],
    postgresql: ["Relational modeling & JSONB", "Performance tuning & EXPLAIN", "Connection pooling"],
    git: ["Git fundamentals", "Branching & pull requests", "GitHub collaboration"],
    github: ["Repositories & workflows", "Pull requests & reviews", "GitHub Actions CI/CD"],
    python: ["OOP & data structures", "FastAPI / Django frameworks", "Virtual environments"],
    java: ["Core Java OOP & Collections", "Spring Boot REST APIs", "Hibernate & JPA"],
    "spring boot": ["IoC container & annotations", "Spring Data JPA & Repositories", "Spring Security"],
    dsa: ["Arrays, Strings & HashMaps", "Trees & Graph traversals", "Dynamic Programming"],
    "power bi": ["Data modeling & relationships", "DAX calculated measures", "Interactive dashboard visuals"],
    tableau: ["Calculated fields & parameters", "LOD expressions", "Executive dashboard storytelling"],
    excel: ["Advanced VLOOKUP / XLOOKUP", "Pivot tables & charts", "Power Query"],
    pandas: ["Data cleaning & transformation", "Grouping & aggregations", "Merging DataFrames"],
    numpy: ["Multi-dimensional arrays", "Vectorized math operations", "Broadcasting"],
    "machine learning": ["Supervised & Unsupervised algorithms", "Scikit-Learn pipelines", "Model evaluation"],
    "deep learning": ["Neural network fundamentals", "PyTorch / TensorFlow models", "Transfer learning"],
    pytorch: ["Tensors & autograd gradients", "Building custom nn.Modules", "Training loops"],
    docker: ["Writing efficient Dockerfiles", "Multi-stage builds", "Docker Compose stacks"],
    kubernetes: ["Pods, Deployments & Services", "Ingress & ConfigMaps", "Autoscaling"],
    aws: ["VPC & Cloud Networking", "EC2 & Auto Scaling", "S3 Storage & IAM security"],
    linux: ["Command line navigation", "Permissions & systemd", "Bash scripting"],
    wireshark: ["Packet capture analysis", "TCP stream reassembly", "Protocol decoding"],
    splunk: ["Log ingestion & parsing", "SPL query language", "Security alert dashboards"],
    selenium: ["WebDriver locators", "Page Object Model (POM)", "TestNG assertions"],
    playwright: ["Async end-to-end testing", "Network mocking", "Cross-browser testing"],
    kotlin: ["Kotlin null safety & lambdas", "Coroutines & Flow", "Jetpack Compose"],
    flutter: ["Widget lifecycle & layout", "BLoC state management", "Cross-platform deployment"],
    figma: ["Auto Layout & components", "Interactive prototyping", "Design systems"]
  };

  const renderRecommendations = (skills) => {
    return skills.map((skill, index) => {
      const topics =
        learningRecommendations[skill.toLowerCase()] || [
          `Master core principles & syntax for ${skill}`,
          `Build a portfolio project using ${skill}`,
          `Practice technical interview questions on ${skill}`,
        ];

      return (
        <div
          key={index}
          style={{
            marginTop: "20px",
            padding: "18px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <h3
            style={{
              textTransform: "capitalize",
            }}
          >
            {skill}
          </h3>

          <ul
            style={{
              marginTop: "10px",
              paddingLeft: "20px",
            }}
          >
            {topics.map((topic, topicIndex) => (
              <li key={topicIndex}>{topic}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  const skillScore =
    requiredSkills.length > 0
      ? Math.round(
          (matchedSkills.length /
            requiredSkills.length) *
            100
        )
      : 0;

  const highPriority = requiredSkills.slice(0, Math.ceil(requiredSkills.length * 0.4)).map(s => s.toLowerCase());
  const mediumPriority = requiredSkills.slice(Math.ceil(requiredSkills.length * 0.4), Math.ceil(requiredSkills.length * 0.75)).map(s => s.toLowerCase());

  const highMissingSkills = missingSkills.filter((skill) =>
    highPriority.includes(skill.toLowerCase())
  );

  const mediumMissingSkills = missingSkills.filter((skill) =>
    mediumPriority.includes(skill.toLowerCase())
  );

  const lowMissingSkills = missingSkills.filter(
    (skill) =>
      !highMissingSkills.includes(skill) &&
      !mediumMissingSkills.includes(skill)
  );

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="logo">
          SAARTHIX <span>AI</span>
        </div>

        <div className="dashboard-nav-right">

          <button
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("mock-interview")}
          >
            Mock Interview
          </button>

          <button
            onClick={() => setPage("profile")}
          >
            Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* MAIN */}

      <main className="dashboard-container">

        <section className="dashboard-welcome">

          <div>

            <div className="dashboard-badge">
              📊 SKILL ANALYSIS
            </div>

            <h1>
              Skill Gap Analysis
            </h1>

            <p>
              Compare your current skills with
              the skills required for your target
              job role.
            </p>

          </div>

          <div className="target-role-box">

            <span>
              TARGET ROLE
            </span>

            <strong>
              {targetRole || "Not specified"}
            </strong>

          </div>

        </section>

        {/* SKILL SCORE */}

<section className="dashboard-card">

  <div className="card-header">

    <div>
      <span className="card-label">
        OVERALL SCORE
      </span>

      <h2>
        Skill Readiness
      </h2>
    </div>

    <div className="card-icon">
      📈
    </div>

  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "20px",
    }}
  >

    <h1
      style={{
        fontSize: "48px",
        marginBottom: "15px",
      }}
    >
      {skillScore}%
    </h1>

    <p className="card-description">
      {matchedSkills.length} of{" "}
      {requiredSkills.length} required
      skills matched.
    </p>

    {/* PROGRESS BAR */}

    <div
      style={{
        width: "100%",
        height: "12px",
        background: "#1e293b",
        borderRadius: "20px",
        overflow: "hidden",
        marginTop: "20px",
      }}
    >

      <div
        style={{
          width: `${skillScore}%`,
          height: "100%",
          background:
            "linear-gradient(90deg, #6366f1, #8b5cf6)",
          borderRadius: "20px",
          transition: "width 0.5s ease",
        }}
      />

    </div>

  </div>

</section>


        {/* MATCHED SKILLS */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <span className="card-label">
                YOUR STRENGTHS
              </span>

              <h2>
                Skills You Already Have
              </h2>
            </div>

            <div className="card-icon">
              ✅
            </div>

          </div>

          {matchedSkills.length > 0 ? (

            <div className="skill-tags">

              {matchedSkills.map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}

            </div>

          ) : (

            <p className="card-description">
              No matching skills found yet.
            </p>

          )}

        </section>


        {/* MISSING SKILLS */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <span className="card-label">
                SKILL GAPS
              </span>

              <h2>
                Skills You Need to Learn
              </h2>
            </div>

            <div className="card-icon">
              ⚠️
            </div>

          </div>

          {missingSkills.length > 0 ? (

            <div className="skill-tags">

              {missingSkills.map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}

            </div>

          ) : (

            <p className="card-description">
              🎉 Great! You have all the
              required skills.
            </p>

          )}

        </section>

        {/* SKILL PRIORITY */}

<section className="dashboard-card">

  <div className="card-header">

    <div>
      <span className="card-label">
        LEARNING PRIORITY
      </span>

      <h2>
        What You Should Learn First
      </h2>
    </div>

    <div className="card-icon">
      🚀
    </div>

  </div>


  {/* HIGH PRIORITY */}

  {highMissingSkills.length > 0 && (

    <div style={{ marginTop: "20px" }}>

      <h3>
        🔴 High Priority
      </h3>

      <div className="skill-tags">

        {highMissingSkills.map(
          (skill, index) => (

            <span key={index}>
              {skill}
            </span>

          )
        )}

      </div>

      <p className="card-description">
        These skills are important for
        building your core development
        foundation.
      </p>

    </div>

  )}


  {/* MEDIUM PRIORITY */}

  {mediumMissingSkills.length > 0 && (

    <div style={{ marginTop: "25px" }}>

      <h3>
        🟡 Medium Priority
      </h3>

      <div className="skill-tags">

        {mediumMissingSkills.map(
          (skill, index) => (

            <span key={index}>
              {skill}
            </span>

          )
        )}

      </div>

      <p className="card-description">
        Learn these after completing
        the basic development skills.
      </p>

    </div>

  )}


  {/* LOW PRIORITY */}

  {lowMissingSkills.length > 0 && (

    <div style={{ marginTop: "25px" }}>

      <h3>
        🟢 Low Priority
      </h3>

      <div className="skill-tags">

        {lowMissingSkills.map(
          (skill, index) => (

            <span key={index}>
              {skill}
            </span>

          )
        )}

      </div>

      <p className="card-description">
        These skills are useful for
        improving your overall development
        workflow.
      </p>

    </div>

  )}

</section>

{/* LEARNING RECOMMENDATIONS */}

<section className="dashboard-card">

  <div className="card-header">

    <div>

      <span className="card-label">
        LEARNING
      </span>

      <h2>
        Recommended Topics
      </h2>

    </div>

    <div className="card-icon">
      📚
    </div>

  </div>


  {missingSkills.length > 0 ? (

    <div>

      {renderRecommendations(
        missingSkills
      )}

    </div>

  ) : (

    <p className="card-description">
      🎉 You have no major skill gaps.
      Keep improving your existing skills!
    </p>

  )}

</section>


        {/* SUMMARY */}

        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <span className="card-label">
                SUMMARY
              </span>

              <h2>
                Your Skill Progress
              </h2>
            </div>

            <div className="card-icon">
              📈
            </div>

          </div>

          <div className="profile-info">

            <div>
              <span>
                Required Skills
              </span>

              <strong>
                {requiredSkills.length}
              </strong>
            </div>

            <div>
              <span>
                Skills Matched
              </span>

              <strong>
                {matchedSkills.length}
              </strong>
            </div>

            <div>
              <span>
                Skills Missing
              </span>

              <strong>
                {missingSkills.length}
              </strong>
            </div>

          </div>

        </section>


        {/* BACK BUTTON */}

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >

          <button
            className="primary-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

// =========================
// RESUME ANALYSIS
// =========================

if (page === "resume-analysis") {

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}
      <nav className="dashboard-navbar">

        <div className="logo" style={{ cursor: "pointer" }} onClick={() => setPage("dashboard")}>
          SAARTHIX <span>AI</span>
        </div>

        <div className="dashboard-nav-right">

          <button type="button" onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button type="button" className="active" onClick={() => setPage("resume-analysis")}>
            Resume Analysis
          </button>

          <button type="button" onClick={() => setPage("career-roadmap")}>
            Roadmap
          </button>

          <button type="button" onClick={() => setPage("career-mentor")}>
            AI Mentor
          </button>

          <button type="button" onClick={() => setPage("mock-interview")}>
            Mock Interview
          </button>

          <button type="button" onClick={() => setPage("profile")}>
            Profile
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>

      <main className="dashboard-container">

        <section className="dashboard-card">

          <div className="card-header">

            <div>
              <span className="card-label">
                RESUME
              </span>

              <h2>
                Resume Analysis
              </h2>
            </div>

            <div className="card-icon">
              📄
            </div>

          </div>

          <p className="card-description">
            Upload your resume to analyze
            your skills, strengths, weaknesses,
            ATS score, and improvement areas.
          </p>

          {/* TARGET ROLE BANNER */}
          <div
            style={{
              marginTop: "16px",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Target Evaluation Role
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "2px" }}>
                🎯 {profile?.targetRole || profileData?.targetRole || "Full Stack Developer"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPage("profile")}
              style={{
                border: "1px solid #6366f1",
                background: "#ffffff",
                color: "#6366f1",
                fontSize: "12px",
                fontWeight: "600",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ✏️ Change Role
            </button>
          </div>

          {/* RESUME TOOL SUB-TABS */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              background: "#f1f5f9",
              padding: "6px",
              borderRadius: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => setResumeSubTab("breakdown")}
              style={{
                flex: 1,
                minWidth: "160px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: resumeSubTab === "breakdown" ? "#ffffff" : "transparent",
                color: resumeSubTab === "breakdown" ? "#4f46e5" : "#64748b",
                boxShadow: resumeSubTab === "breakdown" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              📊 ATS & Resume Breakdown
            </button>

            <button
              type="button"
              onClick={() => setResumeSubTab("jd-match")}
              style={{
                flex: 1,
                minWidth: "160px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: resumeSubTab === "jd-match" ? "#ffffff" : "transparent",
                color: resumeSubTab === "jd-match" ? "#4f46e5" : "#64748b",
                boxShadow: resumeSubTab === "jd-match" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              🎯 Job Description (JD) Matcher
            </button>

            <button
              type="button"
              onClick={() => setResumeSubTab("bullet-rewriter")}
              style={{
                flex: 1,
                minWidth: "160px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: resumeSubTab === "bullet-rewriter" ? "#ffffff" : "transparent",
                color: resumeSubTab === "bullet-rewriter" ? "#4f46e5" : "#64748b",
                boxShadow: resumeSubTab === "bullet-rewriter" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              ✍️ AI Bullet-Point Rewriter
            </button>
          </div>

          {/* TAB 1: BREAKDOWN */}
          {resumeSubTab === "breakdown" && (
            <>
          {/* RESUME UPLOAD */}

          <div
            style={{
              marginTop: "25px",
              padding: "30px",
              borderRadius: "14px",
              border: "2px dashed rgba(99,102,241,0.4)",
              textAlign: "center",
            }}
          >

            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              📄
            </div>

            <h3>
              Upload Your Resume
            </h3>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Upload your PDF or DOCX resume
              for analysis.
            </p>

            <input
  type="file"
  accept=".pdf,.doc,.docx"
  style={{
    marginTop: "15px",
  }}
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload a PDF or DOC/DOCX file."
      );

      e.target.value = "";
      return;
    }

    setResumeFile(file);
  }}
/>

{resumeFile && (
  <div
    style={{
      marginTop: "20px",
      padding: "12px 16px",
      borderRadius: "10px",
      background: "rgba(99,102,241,0.1)",
      color: "#cbd5e1",
    }}
  >
    📄 {resumeFile.name}
  </div>
)}

{resumeFile && (
  <button
    className="primary-btn"
    style={{
      marginTop: "20px",
    }}
    onClick={() => {
  extractResumeText(resumeFile);
}}
    disabled={resumeAnalyzing}
  >
    {resumeAnalyzing
      ? "⏳ Analyzing..."
      : "📊 Analyze Resume"}
  </button>
)}

{resumeText && (
  <div
    style={{
      marginTop: "25px",
      padding: "25px",
      borderRadius: "16px",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      boxShadow:
        "0 8px 25px rgba(15,23,42,0.06)",
    }}
  >
    {/* EXTRACTED RESUME TEXT HEADER */}

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "18px",
      }}
    >
      <span
        style={{
          fontSize: "22px",
        }}
      >
        📄
      </span>

      <h3
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        Extracted Resume Text
      </h3>
    </div>


    {/* EXTRACTED TEXT */}

    <div
      style={{
        marginTop: "15px",
        padding: "20px",
        maxHeight: "500px",
        overflowY: "auto",
        borderRadius: "12px",

        /* LIGHT BACKGROUND */
        background: "#f8fafc",

        border: "1px solid #e2e8f0",

        /* DARK TEXT */
        color: "#334155",

        lineHeight: "1.8",
        fontSize: "14px",

        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",

        /* IMPORTANT */
        textAlign: "left",

        boxSizing: "border-box",
      }}
    >
      {resumeText
        .replace(/[ \t]+/g, " ")
        .replace(/\n\s*\n+/g, "\n\n")
        .trim()}
    </div>
  </div>
)}


{resumeAnalysis && (
  <div
    style={{
      marginTop: "25px",
      padding: "25px",
      borderRadius: "16px",
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      boxShadow:
        "0 8px 25px rgba(15,23,42,0.06)",
    }}
  >

    {/* RESUME ANALYSIS HEADER */}

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "25px",
      }}
    >
      <span
        style={{
          fontSize: "24px",
        }}
      >
        📊
      </span>

      <h2
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        Resume Analysis
      </h2>
    </div>


    {/* ATS SCORE */}

    <div
      style={{
        padding: "22px",
        borderRadius: "14px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        <div>
          <h3
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "19px",
            }}
          >
            🎯 ATS Score
          </h3>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Resume compatibility score
          </p>
        </div>

        <strong
          style={{
            fontSize: "32px",
            color: "#4f46e5",
          }}
        >
          {resumeAnalysis.atsScore}/100
        </strong>

      </div>


      {/* ATS PROGRESS BAR */}

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#e2e8f0",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${resumeAnalysis.atsScore}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: "20px",
            transition:
              "width 0.5s ease",
          }}
        />
      </div>


      <p
        style={{
          marginTop: "10px",
          marginBottom: 0,
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        Based on skills, resume sections,
        and content length.
      </p>

    </div>

    {/* TARGET ROLE ANALYSIS */}

<div
  style={{
    marginTop: "25px",
    padding: "22px",
    borderRadius: "14px",
    background: "#f5f3ff",
    border: "1px solid #ddd6fe",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    }}
  >
    <div>
      <h3
        style={{
          margin: 0,
          color: "#5b21b6",
          fontSize: "19px",
        }}
      >
        🎯 Target Role
      </h3>

      <p
        style={{
          marginTop: "8px",
          marginBottom: 0,
          color: "#475569",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        {resumeAnalysis.targetRole ||
          "Target role not specified"}
      </p>
    </div>

    <div
      style={{
        textAlign: "center",
      }}
    >
      <strong
        style={{
          display: "block",
          fontSize: "30px",
          color: "#7c3aed",
        }}
      >
        {resumeAnalysis.roleMatchScore}%
      </strong>

      <span
        style={{
          color: "#64748b",
          fontSize: "12px",
        }}
      >
        Role Match
      </span>
    </div>
  </div>

  {/* TIERED SKILL MATCH BREAKDOWN */}
  {resumeAnalysis?.essentialMatchScore !== undefined && (
    <div
      style={{
        marginTop: "18px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "10px",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          background: "rgba(99, 102, 241, 0.08)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#4338ca", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Essential Skills
        </div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#3730a3", marginTop: "2px" }}>
          {resumeAnalysis.essentialMatchScore}%
        </div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>
          {resumeAnalysis.matchedEssentialSkills?.length || 0} / {(resumeAnalysis.matchedEssentialSkills?.length || 0) + (resumeAnalysis.missingEssentialSkills?.length || 0)} matched
        </div>
      </div>

      <div
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#065f46", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Important Skills
        </div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#047857", marginTop: "2px" }}>
          {resumeAnalysis.importantMatchScore}%
        </div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>
          {resumeAnalysis.matchedImportantSkills?.length || 0} / {(resumeAnalysis.matchedImportantSkills?.length || 0) + (resumeAnalysis.missingImportantSkills?.length || 0)} matched
        </div>
      </div>

      <div
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.2)",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#92400e", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Bonus Skills
        </div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#b45309", marginTop: "2px" }}>
          {resumeAnalysis.bonusMatchScore}%
        </div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>
          {resumeAnalysis.matchedBonusSkills?.length || 0} / {(resumeAnalysis.matchedBonusSkills?.length || 0) + (resumeAnalysis.missingBonusSkills?.length || 0)} matched
        </div>
      </div>
    </div>
  )}


  {/* MATCHED SKILLS */}

  {resumeAnalysis.matchedRoleSkills.length > 0 && (
    <div
  style={{
    marginTop: "25px",
  }}
>
  <h3
    style={{
      margin: 0,
      fontSize: "20px",
      fontWeight: "700",
      color: "#166534",
    }}
  >
    ✅ Matched Skills
  </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "15px",
        }}
      >
        {(resumeAnalysis?.matchedRoleSkills ?? []).map(
          (skill, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                padding: "8px 14px",
                margin: "4px",
                borderRadius: "20px",
                background: "#dcfce7",
                border: "1px solid #86efac",
                color: "#166534",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {skill}
            </span>
          )
        )}
      </div>
    </div>
  )}


  {/* MISSING SKILLS */}

  {(resumeAnalysis?.missingRoleSkills ?? []).length > 0 && (
    <div
  style={{
    marginTop: "30px",
  }}
>
  <h3
    style={{
      margin: 0,
      fontSize: "20px",
      fontWeight: "700",
      color: "#b91c1c",
    }}
  >
    ⚠️ Missing Skills
  </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "15px",
        }}
      >
        {(() => {
          const rawSkills = resumeAnalysis?.missingRoleSkills ?? [];
          const sortedSkills = [...rawSkills].sort((a, b) => {
            const aEss = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === a.toLowerCase());
            const bEss = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === b.toLowerCase());
            if (aEss && !bEss) return -1;
            if (!aEss && bEss) return 1;
            const aImp = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === a.toLowerCase());
            const bImp = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === b.toLowerCase());
            if (aImp && !bImp) return -1;
            if (!aImp && bImp) return 1;
            return 0;
          });

          return sortedSkills.map((skill, index) => {
            const isEssential = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === skill.toLowerCase());
            const isImportant = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === skill.toLowerCase());
            const pillBg = isEssential ? "#fee2e2" : isImportant ? "#fef3c7" : "#fee2e2";
            const pillBorder = isEssential ? "#fca5a5" : isImportant ? "#fcd34d" : "#fca5a5";
            const pillColor = isEssential ? "#b91c1c" : isImportant ? "#b45309" : "#b91c1c";
            const tierBadge = isEssential ? "🔴 Essential" : isImportant ? "🟡 Important" : null;

            return (
              <span
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  margin: "4px",
                  borderRadius: "20px",
                  background: pillBg,
                  border: `1px solid ${pillBorder}`,
                  color: pillColor,
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                <span>{skill}</span>
                {tierBadge && (
                  <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.85, textTransform: "uppercase" }}>
                    • {tierBadge}
                  </span>
                )}
              </span>
            );
          });
        })()}
      </div>
      <div
  style={{
    marginTop: "25px",
    padding: "22px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.05))",
    border: "1px solid rgba(239,68,68,0.22)",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.12)",
  }}
>
  {/* HEADER */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "15px",
      marginBottom: "18px",
    }}
  >
    <div>
      {/* <h3
        style={{
          margin: 0,
          color: "#f8fafc",
          fontSize: "18px",
        }}
      >
        ⚠️ Missing Skills
      </h3> */}

      <p
        style={{
          margin: "6px 0 0",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        Skills required for your target role
      </p>
    </div>

    <div
      style={{
        minWidth: "42px",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "rgba(239,68,68,0.12)",
        border:
          "1px solid rgba(239,68,68,0.25)",
        color: "#f87171",
        fontWeight: "700",
      }}
    >
      {resumeAnalysis.missingRoleSkills.length}
    </div>
  </div>

  {/* SKILLS */}
  {resumeAnalysis.missingRoleSkills.length > 0 ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "12px",
      }}
    >
        {(() => {
          const rawSkills = resumeAnalysis?.missingRoleSkills ?? [];
          const sortedSkills = [...rawSkills].sort((a, b) => {
            const aEss = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === a.toLowerCase());
            const bEss = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === b.toLowerCase());
            if (aEss && !bEss) return -1;
            if (!aEss && bEss) return 1;
            const aImp = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === a.toLowerCase());
            const bImp = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === b.toLowerCase());
            if (aImp && !bImp) return -1;
            if (!aImp && bImp) return 1;
            return 0;
          });

          return sortedSkills.map((skill, index) => {
            const isEssential = (resumeAnalysis?.missingEssentialSkills ?? []).some((s) => s.toLowerCase() === skill.toLowerCase());
            const isImportant = (resumeAnalysis?.missingImportantSkills ?? []).some((s) => s.toLowerCase() === skill.toLowerCase());
            const isBonus = (resumeAnalysis?.missingBonusSkills ?? []).some((s) => s.toLowerCase() === skill.toLowerCase());

            const tierLabel = isEssential ? "Essential" : isImportant ? "Important" : isBonus ? "Bonus" : "Missing";
            const badgeBg = isEssential ? "#fee2e2" : isImportant ? "#fef3c7" : "#f1f5f9";
            const badgeColor = isEssential ? "#b91c1c" : isImportant ? "#b45309" : "#475569";
            const badgeBorder = isEssential ? "#fca5a5" : isImportant ? "#fcd34d" : "#cbd5e1";
            const dotColor = isEssential ? "#ef4444" : isImportant ? "#f59e0b" : "#94a3b8";

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 15px",
                  borderRadius: "12px",
                  background: isEssential ? "rgba(239,68,68,0.08)" : isImportant ? "rgba(245,158,11,0.08)" : "rgba(100,116,139,0.06)",
                  border: `1px solid ${isEssential ? "rgba(239,68,68,0.25)" : isImportant ? "rgba(245,158,11,0.25)" : "rgba(100,116,139,0.2)"}`,
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: dotColor,
                    boxShadow: `0 0 8px ${dotColor}`,
                  }}
                />

                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "15px",
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  {skill}
                </span>

                <span
                  style={{
                    marginLeft: "auto",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: badgeBg,
                    border: `1px solid ${badgeBorder}`,
                    color: badgeColor,
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {tierLabel}
                </span>
              </div>
            );
          });
        })()}
      </div>
    ) : (
      <div
        style={{
          padding: "15px",
          borderRadius: "10px",
          background:
            "rgba(34,197,94,0.08)",
          border:
            "1px solid rgba(34,197,94,0.18)",
          color: "#86efac",
        }}
      >
        🎉 You have all the required skills
        for this role!
      </div>
    )}
  </div>
      </div>
    )}

  </div>

  {/* WHAT TO LEARN NEXT */}
  <div
    style={{
      marginTop: "30px",
      padding: "22px",
      borderRadius: "16px",
      background: "rgba(99,102,241,0.06)",
      border: "1px solid rgba(99,102,241,0.18)",
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: "20px",
        fontWeight: "700",
        color: "#4338ca",
      }}
    >
      📚 What to Learn Next
    </h3>

    <p
      style={{
        marginTop: "7px",
        color: "#64748b",
        fontSize: "14px",
      }}
    >
      Recommended topics based on your missing skills
    </p>

    {(resumeAnalysis?.missingRoleSkills ?? []).length > 0 ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {(resumeAnalysis?.missingRoleSkills ?? []).map(
        (skill, index) => {

          const matchedRec = (resumeAnalysis?.roleRecommendations ?? []).find(
            (r) => r.skill.toLowerCase() === skill.toLowerCase()
          );

          const recommendations = {
            react: [
              "React Components",
              "Props and State",
              "React Hooks",
              "React Router",
            ],
            "node.js": [
              "Node.js Fundamentals",
              "Modules and npm",
              "HTTP Server",
              "File System",
            ],
            express: [
              "Express.js Basics",
              "Routing",
              "Middleware",
              "REST APIs",
            ],
            mongodb: [
              "MongoDB Fundamentals",
              "CRUD Operations",
              "MongoDB Queries",
              "Mongoose",
            ],
            html: [
              "HTML5 Fundamentals",
              "Semantic HTML",
              "Forms",
              "Tables",
            ],
            css: [
              "CSS Fundamentals",
              "Flexbox",
              "CSS Grid",
              "Responsive Design",
            ],
            javascript: [
              "JavaScript Fundamentals",
              "ES6+",
              "DOM Manipulation",
              "Async JavaScript",
            ],
            git: [
              "Git Fundamentals",
              "Branches",
              "GitHub",
              "Pull Requests",
            ],
            sql: [
              "Complex multi-table JOINs",
              "Window functions (ROW_NUMBER, RANK, DENSE_RANK)",
              "Query indexing, CTEs & performance tuning",
            ],
            python: [
              "Pandas & NumPy data manipulation",
              "Data wrangling, cleaning & missing value imputation",
              "Jupyter Notebook reproducible exploratory workflows",
            ],
            "power bi": [
              "Star schema modeling & relationship cardinality",
              "DAX calculated measures vs columns (CALCULATE, FILTER)",
              "Interactive dashboard visuals, drill-throughs & slicers",
            ],
            tableau: [
              "Calculated fields & parameters",
              "Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE)",
              "Interactive dashboard actions & storytelling",
            ],
            excel: [
              "Advanced VLOOKUP & XLOOKUP formulas",
              "Dynamic Pivot Tables & Slicers",
              "Power Query ETL data transformation",
            ],
            "microsoft excel": [
              "Advanced VLOOKUP & XLOOKUP formulas",
              "Dynamic Pivot Tables & Slicers",
              "Power Query ETL data transformation",
            ],
            pandas: [
              "DataFrame filtering, grouping & aggregations",
              "Merging, concatenating & reshaping data",
              "Handling null values & feature engineering",
            ],
            numpy: [
              "Multi-dimensional arrays & vectorized math",
              "Statistical broadcasting operations",
              "Matrix manipulations",
            ],
            "data cleaning": [
              "Handling missing data & duplicates",
              "Type casting & regex string sanitization",
              "Outlier detection & removal pipelines",
            ],
            "data analysis": [
              "Exploratory data analysis (EDA)",
              "Cohort analysis & trend identification",
              "Translating raw metrics into business decisions",
            ],
            "exploratory data analysis": [
              "Summary statistics & distributions",
              "Correlation heatmaps & bivariate analysis",
              "Data profiling & actionable insights",
            ],
            statistics: [
              "Descriptive statistics (Mean, Median, Std Dev)",
              "Probability distributions & confidence intervals",
              "Hypothesis testing & p-value interpretation",
            ],
            "data visualization": [
              "Chart selection principles (Bar, Line, Scatter, Heatmap)",
              "Visual hierarchy & dashboard color theory",
              "Executive storytelling with data",
            ],
            "dashboard development": [
              "Defining North Star metrics & KPI cards",
              "Visual hierarchy & user experience design",
              "Performance optimization for real-time dashboards",
            ],
            "data interpretation": [
              "Translating complex analytics into stakeholder recommendations",
              "Root-cause diagnostics & variance analysis",
              "Scenario analysis & business impact",
            ],
            "problem solving": [
              "Deconstructing ambiguous business problems",
              "Hypothesis-driven structured problem solving",
              "Analytical frameworks (MECE, 5 Whys)",
            ],
            matplotlib: [
              "Custom subplots & multi-axis layouts",
              "Publication-ready formatting & themes",
              "Visualizing analytical distributions",
            ],
            seaborn: [
              "Pairplots, jointplots & distribution plots",
              "Correlation heatmaps with statistical annotations",
              "Categorical plotting (box, violin, swarm)",
            ],
            "jupyter notebook": [
              "Modular exploratory coding & markdown notes",
              "Exporting reproducible reports",
              "Interactive widgets with ipywidgets",
            ],
            "microsoft power query": [
              "Automated ETL refresh pipelines",
              "Merging, unpivoting & splitting columns",
              "M code custom transformations",
            ],
            "power query": [
              "Automated ETL refresh pipelines",
              "Merging, unpivoting & splitting columns",
              "M code custom transformations",
            ],
            dax: [
              "Dynamic time-intelligence (YTD, QTD, MoM growth)",
              "CALCULATE modifier functions (USERELATIONSHIP, ALL)",
              "Performance tuning of DAX measures",
            ],
            etl: [
              "Data extraction from diverse source systems",
              "Data transformation, deduplication & validation",
              "Loading into analytical warehouses (Star schema)",
            ],
            "data transformation": [
              "Pivoting, unpivoting & reshaping tables",
              "Feature extraction & standardized scaling",
              "Data pipeline automation",
            ],
            "business intelligence": [
              "Enterprise data warehouse schema design",
              "Executive reporting & KPI monitoring",
              "Bridging business stakeholder needs with data solutions",
            ],
            "kpi analysis": [
              "Formulating business metrics (CAC, LTV, Churn, ARR, ROAS)",
              "Cohort retention curves & conversion funnel tracking",
              "Variance analysis against quarterly targets",
            ],
            reporting: [
              "Automated executive summary dashboards",
              "Scheduled stakeholder reporting cadences",
              "Data governance & presentation standards",
            ],
            "a/b testing": [
              "Sample size estimation & power analysis",
              "Formulating null vs alternative hypotheses",
              "Confidence intervals & p-value business decisions",
            ],
            "hypothesis testing": [
              "One-sample, two-sample t-tests & z-tests",
              "Chi-square tests for categorical distributions",
              "ANOVA & controlling Type I/II errors",
            ],
          };

          const topics =
            matchedRec?.topics ||
            recommendations[
              skill.toLowerCase()
            ] || [
              `Core concepts and industry best practices for ${skill}`,
              `Practical hands-on project implementation with ${skill}`,
              `Top technical interview questions and patterns for ${skill}`,
            ];

          return (
            <div
              key={index}
              style={{
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.65)",
                border:
                  "1px solid rgba(99,102,241,0.18)",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "#312e81",
                  textTransform:
                    "capitalize",
                }}
              >
                {skill}
              </h4>

              {topics.length > 0 ? (
                <ul
                  style={{
                    marginTop: "12px",
                    paddingLeft: "20px",
                  }}
                >
                  {topics.map(
                    (topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        style={{
                          marginBottom:
                            "7px",
                          color: "#475569",
                          fontSize:
                            "14px",
                        }}
                      >
                        {topic}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  No recommendations
                  available yet.
                </p>
              )}
            </div>
          );
        }
      )}
    </div>
  ) : (
    <div
      style={{
        marginTop: "18px",
        padding: "15px",
        borderRadius: "12px",
        background:
          "rgba(34,197,94,0.08)",
        border:
          "1px solid rgba(34,197,94,0.2)",
        color: "#166534",
      }}
    >
      🎉 No missing skills. Keep improving
      your existing skills!
    </div>
  )}
</div>


    {/* RESUME STRENGTHS */}

    <div
      style={{
        marginTop: "25px",
        padding: "22px",
        borderRadius: "14px",
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
      }}
    >

      <h3
        style={{
          margin: 0,
          color: "#166534",
          fontSize: "19px",
        }}
      >
        💪 Resume Strengths
      </h3>


      {(resumeAnalysis?.strengths ?? []).length > 0 ? (

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >

          {(resumeAnalysis?.strengths ?? []).map(
            (strength, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",

                  color: "#334155",

                  fontSize: "14px",
                  lineHeight: "1.6",

                  textAlign: "left",
                }}
              >

                <span
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>

                <span>
                  {strength}
                </span>

              </div>

            )
          )}

        </div>

      ) : (

        <p
          style={{
            color: "#64748b",
            marginBottom: 0,
          }}
        >
          No major strengths detected yet.
        </p>

      )}

    </div>


    {/* AREAS TO IMPROVE */}

    <div
      style={{
        marginTop: "25px",
        padding: "22px",
        borderRadius: "14px",

        background: "#fffbeb",

        border: "1px solid #fde68a",
      }}
    >

      <h3
        style={{
          margin: 0,
          color: "#92400e",
          fontSize: "19px",
        }}
      >
        ⚠️ Areas to Improve
      </h3>


      {(resumeAnalysis?.weaknesses ?? []).length > 0 ? (

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >

          {(resumeAnalysis?.weaknesses ?? []).map(
            (weakness, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",

                  color: "#334155",

                  fontSize: "14px",
                  lineHeight: "1.6",

                  textAlign: "left",
                }}
              >

                <span
                  style={{
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </span>

                <span>
                  {weakness}
                </span>

              </div>

            )
          )}

        </div>

      ) : (

        <p
          style={{
            color: "#64748b",
            marginBottom: 0,
          }}
        >
          No major issues detected.
        </p>

      )}

    </div>

    {/* IMPROVEMENT RECOMMENDATIONS */}

<div
  style={{
    marginTop: "25px",
    padding: "22px",
    borderRadius: "14px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
  }}
>
  <h3
    style={{
      margin: 0,
      color: "#1e40af",
      fontSize: "19px",
    }}
  >
    💡 Improvement Recommendations
  </h3>

  <div
    style={{
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {(resumeAnalysis?.recommendations ?? []).map(
      (recommendation, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            color: "#334155",
            fontSize: "14px",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <span
            style={{
              color: "#2563eb",
              fontWeight: "700",
              flexShrink: 0,
            }}
          >
            →
          </span>

          <span>
            {recommendation}
          </span>
        </div>
      )
    )}
  </div>
</div>


    {/* DETECTED SKILLS */}

    <div
      style={{
        marginTop: "25px",
        padding: "22px",
        borderRadius: "14px",

        background: "#f8fafc",

        border: "1px solid #e2e8f0",
      }}
    >

      <h3
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: "19px",
        }}
      >
        💻 Detected Skills
      </h3>


      {resumeAnalysis?.categorizedSkills && Object.keys(resumeAnalysis.categorizedSkills).length > 0 ? (
        <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
          {Object.entries(resumeAnalysis.categorizedSkills).map(([catName, skillsList]) => (
            <div
              key={catName}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#4f46e5",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>🏷️ {catName}</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    background: "#eef2ff",
                    color: "#4338ca",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                >
                  {skillsList.length} detected
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skillsList.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 12px",
                      borderRadius: "16px",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      color: "#1e293b",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (resumeAnalysis?.detectedSkills ?? []).length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "9px",
            marginTop: "17px",
          }}
        >
          {(resumeAnalysis?.detectedSkills ?? []).map(
            (skill, index) => (
              <span
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 13px",
                  borderRadius: "20px",
                  background: "#eef2ff",
                  border: "1px solid #c7d2fe",
                  color: "#3730a3",
                  fontSize: "13px",
                  fontWeight: "600",
                  lineHeight: "1",
                }}
              >
                {skill}
              </span>
            )
          )}
        </div>
      ) : (
        <p
          style={{
            marginTop: "15px",
            color: "#64748b",
          }}
        >
          No skills detected.
        </p>
      )}

    </div>

    {/* RESUME IMPROVEMENT RECOMMENDATIONS */}
    <div
      style={{
        marginTop: "30px",
        padding: "22px",
        borderRadius: "16px",
        background: "rgba(245,158,11,0.06)",
        border: "1px solid rgba(245,158,11,0.20)",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "700",
          color: "#b45309",
        }}
      >
        ✨ Resume Improvement Recommendations
      </h3>

      <p
        style={{
          marginTop: "7px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        Practical suggestions to make your resume stronger and more ATS-friendly.
      </p>

      {(resumeAnalysis?.recommendations ?? []).length > 0 ? (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gap: "12px",
          }}
        >
          {(resumeAnalysis?.recommendations ?? []).map(
            (recommendation, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "15px 16px",
                  borderRadius: "12px",
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.16)",
                }}
              >
                <span
                  style={{
                    minWidth: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.15)",
                    color: "#b45309",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  {index + 1}
                </span>

                <p
                  style={{
                    margin: 0,
                    color: "#334155",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  {recommendation}
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p
          style={{
            marginTop: "18px",
            color: "#64748b",
          }}
        >
          🎉 No major resume improvements detected.
        </p>
      )}
    </div>

    {/* DATA ANALYTICS PROJECT RELEVANCE */}
    {Array.isArray(resumeAnalysis?.detectedProjects) && resumeAnalysis.detectedProjects.length > 0 && (
      <div
        style={{
          marginTop: "30px",
          padding: "22px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(14, 165, 233, 0.06), rgba(99, 102, 241, 0.06))",
          border: "1px solid rgba(14, 165, 233, 0.25)",
          boxShadow: "0 4px 16px rgba(14, 165, 233, 0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                color: "#0369a1",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📁</span> Domain-Relevant Project Experience
            </h3>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "13px" }}>
              Industry-specific analytics projects and workflows detected in your resume
            </p>
          </div>

          <span
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              background: "rgba(14, 165, 233, 0.12)",
              color: "#0284c7",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            {resumeAnalysis.detectedProjects.length} Domain Area(s) Detected
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
          }}
        >
          {resumeAnalysis.detectedProjects.map((proj, pIdx) => (
            <div
              key={pIdx}
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#0284c7" }}>📊</span>
                {proj.domain}
              </div>

              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
                Relevant Technologies:
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {(proj.technologies || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "#f0f9ff",
                      border: "1px solid #bae6fd",
                      color: "#0369a1",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* JOB READINESS ANALYSIS */}
    {resumeAnalysis?.jobReadiness && (
      <div
        style={{
          marginTop: "30px",
          padding: "24px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              color: "#ffffff",
            }}
          >
            💼
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "21px",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              {resumeAnalysis.targetRole || "Job"} Readiness Assessment
            </h3>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
              Targeted evaluation, curated projects to bridge gaps, and interview readiness
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px", marginBottom: "20px" }}>
          {/* STRONG AREAS */}
          <div
            style={{
              padding: "18px",
              borderRadius: "12px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}
          >
            <h4 style={{ margin: "0 0 12px 0", color: "#166534", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span> Strong Areas
            </h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "#334155", fontSize: "13px", lineHeight: "1.7" }}>
              {(resumeAnalysis.jobReadiness.strongAreas || []).map((area, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>{area}</li>
              ))}
            </ul>
          </div>

          {/* SKILLS TO IMPROVE */}
          <div
            style={{
              padding: "18px",
              borderRadius: "12px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
            }}
          >
            <h4 style={{ margin: "0 0 12px 0", color: "#92400e", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span> Skills to Prioritize
            </h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "#334155", fontSize: "13px", lineHeight: "1.7" }}>
              {(resumeAnalysis.jobReadiness.skillsToImprove || []).slice(0, 6).map((skill, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RECOMMENDED PORTFOLIO PROJECTS */}
        {Array.isArray(resumeAnalysis.jobReadiness.recommendedProjects) && resumeAnalysis.jobReadiness.recommendedProjects.length > 0 && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h4 style={{ margin: "0 0 6px 0", color: "#1e1b4b", fontSize: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🚀</span> Recommended Portfolio Projects to Bridge Skill Gaps
            </h4>
            <p style={{ margin: "0 0 14px 0", color: "#64748b", fontSize: "13px" }}>
              Hands-on projects tailored specifically to address your missing competencies
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {resumeAnalysis.jobReadiness.recommendedProjects.map((project, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#faf5ff",
                    border: "1px solid #e9d5ff",
                  }}
                >
                  <div style={{ fontWeight: "700", color: "#6b21a8", fontSize: "14px", marginBottom: "6px" }}>
                    {project.title}
                  </div>
                  <p style={{ margin: "0 0 10px 0", color: "#475569", fontSize: "12px", lineHeight: "1.5" }}>
                    {project.description || project.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {(project.tech || []).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          padding: "2px 7px",
                          borderRadius: "6px",
                          background: "#f3e8ff",
                          color: "#7e22ce",
                          border: "1px solid #d8b4fe",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERVIEW PREPARATION TOPICS */}
        {Array.isArray(resumeAnalysis.jobReadiness.interviewPreparation) && resumeAnalysis.jobReadiness.interviewPreparation.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              borderRadius: "12px",
              background: "rgba(99, 102, 241, 0.05)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#3730a3", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🎯</span> High-Yield Interview Preparation Focus
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
              {resumeAnalysis.jobReadiness.interviewPreparation.map((topic, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    fontSize: "13px",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  <span style={{ color: "#6366f1" }}>•</span>
                  {topic}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

  </div>
)}

{!resumeAnalysis && (
  <div
    style={{
      marginTop: "25px",
      padding: "30px 20px",
      borderRadius: "14px",
      background: "rgba(99,102,241,0.04)",
      border: "1px dashed rgba(99,102,241,0.25)",
      textAlign: "center",
      color: "#64748b",
    }}
  >
    <p style={{ margin: 0, fontSize: "15px", fontWeight: "500" }}>
      📄 Upload your resume above to see your ATS score, detected skills, role analysis, and recommendations.
    </p>
  </div>
)}
          </div>
            </>
          )}

          {/* TAB 2: JOB DESCRIPTION MATCHER */}
          {resumeSubTab === "jd-match" && (
            <div style={{ marginTop: "24px" }}>
              {/* JD MATCHER BANNER */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))",
                  border: "1px solid rgba(99,102,241,0.2)",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ margin: "0 0 6px 0", color: "#1e1b4b", fontSize: "17px", fontWeight: "700" }}>
                  🎯 Real-Time Job Description (JD) Matcher
                </h3>
                <p style={{ margin: 0, color: "#475569", fontSize: "13px", lineHeight: "1.6" }}>
                  Paste any job description from LinkedIn, Indeed, or career portals. SAARTHIX AI compares it against your resume, calculates your match percentage, reveals matching & missing keywords, and gives you actionable bullet points to optimize your resume.
                </p>
              </div>

              {/* RESUME SOURCE STATUS */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: resumeText ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)",
                  border: `1px solid ${resumeText ? "rgba(16, 185, 129, 0.25)" : "rgba(245, 158, 11, 0.25)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{resumeText ? "✅" : "⚠️"}</span>
                  <div>
                    <div style={{ fontWeight: "700", color: resumeText ? "#065f46" : "#92400e", fontSize: "14px" }}>
                      {resumeText ? "Resume Detected & Loaded" : "No Resume Uploaded Yet"}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {resumeText
                        ? `${resumeText.split(/\s+/).filter(Boolean).length} words ready for keyword & semantic matching.`
                        : "Upload a PDF in the 'ATS & Resume Breakdown' tab or paste your resume text below."}
                    </div>
                  </div>
                </div>

                {!resumeText && (
                  <button
                    type="button"
                    onClick={() => setResumeSubTab("breakdown")}
                    style={{
                      border: "1px solid #6366f1",
                      background: "#ffffff",
                      color: "#6366f1",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    📄 Upload PDF First
                  </button>
                )}
              </div>

              {/* JD INPUT FORM */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  <label style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
                    📋 Paste Job Description (JD)
                  </label>
                  {/* QUICK SAMPLES */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", alignSelf: "center" }}>Sample:</span>
                    <button
                      type="button"
                      onClick={() => setJdInput("We are looking for a Full Stack Developer proficient in React, Node.js, Express, MongoDB, and TypeScript. Experience with Docker, CI/CD pipelines, AWS, REST APIs, and automated testing (Jest) is required. Candidate must possess strong problem-solving skills and CS fundamentals.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      Full Stack
                    </button>
                    <button
                      type="button"
                      onClick={() => setJdInput("Seeking a Backend Engineer with strong Core Java, Spring Boot, Microservices, and SQL/PostgreSQL skills. Must have experience with Redis caching, Kafka message broker, Docker containerization, Kubernetes, and high-concurrency systems design.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      Backend
                    </button>
                    <button
                      type="button"
                      onClick={() => setJdInput("Hiring a Data Analyst / AI Engineer skilled in Python, SQL, Pandas, NumPy, and Scikit-Learn. Proficiency in Tableau or Power BI for business dashboards. Experience with machine learning pipelines, statistical modeling, and database querying is preferred.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      Data / AI
                    </button>
                  </div>
                </div>

                <textarea
                  rows={6}
                  value={jdInput}
                  onChange={(e) => setJdInput(e.target.value)}
                  placeholder="Paste the job description, required qualifications, and technology stack here..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    resize: "vertical",
                    lineHeight: "1.5",
                  }}
                />

                <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  {jdInput && (
                    <button
                      type="button"
                      onClick={() => { setJdInput(""); setJdResult(null); }}
                      style={{ border: "none", background: "transparent", color: "#94a3b8", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleMatchJd}
                    disabled={jdMatching || !jdInput.trim()}
                    style={{
                      background: jdMatching || !jdInput.trim() ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 22px",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: jdMatching || !jdInput.trim() ? "not-allowed" : "pointer",
                      boxShadow: jdMatching || !jdInput.trim() ? "none" : "0 4px 14px rgba(99,102,241,0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {jdMatching ? "⏳ Analyzing Match with AI..." : "⚡ Calculate JD Match & Fit"}
                  </button>
                </div>
              </div>

              {/* JD RESULT DISPLAY */}
              {jdResult && (
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 8px 25px rgba(15,23,42,0.06)",
                    marginBottom: "20px",
                  }}
                >
                  {/* SCORE HEADER */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "16px",
                      paddingBottom: "18px",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          background: jdResult.matchScore >= 80 ? "rgba(16, 185, 129, 0.12)" : jdResult.matchScore >= 65 ? "rgba(99, 102, 241, 0.12)" : "rgba(245, 158, 11, 0.12)",
                          border: `3px solid ${jdResult.matchScore >= 80 ? "#10b981" : jdResult.matchScore >= 65 ? "#6366f1" : "#f59e0b"}`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "800",
                          fontSize: "20px",
                          color: jdResult.matchScore >= 80 ? "#059669" : jdResult.matchScore >= 65 ? "#4f46e5" : "#d97706",
                        }}
                      >
                        {jdResult.matchScore}%
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          JD Fit Score
                        </div>
                        <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                          {jdResult.verdict}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "700",
                        background: jdResult.matchScore >= 80 ? "rgba(16, 185, 129, 0.12)" : "rgba(99, 102, 241, 0.1)",
                        color: jdResult.matchScore >= 80 ? "#065f46" : "#4338ca",
                      }}
                    >
                      🎯 Target: {profile?.targetRole || profileData?.targetRole || "Software Developer"}
                    </span>
                  </div>

                  {/* SUMMARY */}
                  <div style={{ marginTop: "16px", padding: "14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Recruiter Assessment:
                    </div>
                    <div style={{ color: "#1e293b", fontSize: "14px", lineHeight: "1.6" }}>
                      {jdResult.roleFitSummary}
                    </div>
                  </div>

                  {/* KEYWORDS COMPARISON */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
                    {/* MATCHING KEYWORDS */}
                    <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                      <div style={{ fontWeight: "700", color: "#065f46", fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>✅</span> Matched Keywords ({jdResult.matchingKeywords?.length || 0})
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {jdResult.matchingKeywords?.map((kw, idx) => (
                          <span key={idx} style={{ background: "#d1fae5", color: "#065f46", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* MISSING KEYWORDS */}
                    <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(239, 68, 68, 0.04)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                      <div style={{ fontWeight: "700", color: "#991b1b", fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>⚠️</span> Missing / Underrepresented ({jdResult.missingKeywords?.length || 0})
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {jdResult.missingKeywords?.map((kw, idx) => (
                          <span key={idx} style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* TAILORED TIPS */}
                  {Array.isArray(jdResult.tailoredTips) && jdResult.tailoredTips.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      <h4 style={{ margin: "0 0 10px 0", color: "#0f172a", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>💡</span> Tailored Optimization Recommendations:
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {jdResult.tailoredTips.map((tip, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "10px 14px",
                              borderRadius: "8px",
                              background: "#f8fafc",
                              borderLeft: "4px solid #6366f1",
                              fontSize: "13px",
                              color: "#334155",
                              lineHeight: "1.5",
                            }}
                          >
                            <strong style={{ color: "#4f46e5" }}>Tip {idx + 1}:</strong> {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI BULLET-POINT REWRITER */}
          {resumeSubTab === "bullet-rewriter" && (
            <div style={{ marginTop: "24px" }}>
              {/* BANNER */}
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))",
                  border: "1px solid rgba(99,102,241,0.2)",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ margin: "0 0 6px 0", color: "#1e1b4b", fontSize: "17px", fontWeight: "700" }}>
                  ✍️ Google XYZ-Formula Resume Bullet Rewriter
                </h3>
                <p style={{ margin: 0, color: "#475569", fontSize: "13px", lineHeight: "1.6" }}>
                  Transform weak, duty-focused statements into punchy, high-impact achievements. Follows the formula: <em>&quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;</em> tailored for <strong>{profile?.targetRole || profileData?.targetRole || "Software Developer"}</strong>.
                </p>
              </div>

              {/* INPUT CARD */}
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  <label style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
                    📝 Enter Draft Bullet Point
                  </label>
                  {/* QUICK SAMPLES */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", alignSelf: "center" }}>Quick try:</span>
                    <button
                      type="button"
                      onClick={() => setBulletInput("Worked on backend APIs using Node.js and improved database queries to make it faster.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      Backend API
                    </button>
                    <button
                      type="button"
                      onClick={() => setBulletInput("Built responsive website with React, CSS, and added payment gateway integration.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      React Frontend
                    </button>
                    <button
                      type="button"
                      onClick={() => setBulletInput("Analyzed customer sales data using Python and SQL and created charts for the team.")}
                      style={{ border: "1px solid #cbd5e1", background: "#f8fafc", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                    >
                      Data Analysis
                    </button>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={bulletInput}
                  onChange={(e) => setBulletInput(e.target.value)}
                  placeholder="e.g. Responsible for writing unit tests and fixing bugs in the payment service..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    resize: "vertical",
                    lineHeight: "1.5",
                  }}
                />

                <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  {bulletInput && (
                    <button
                      type="button"
                      onClick={() => { setBulletInput(""); setBulletResult(null); }}
                      style={{ border: "none", background: "transparent", color: "#94a3b8", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRewriteBullet}
                    disabled={bulletRewriting || !bulletInput.trim()}
                    style={{
                      background: bulletRewriting || !bulletInput.trim() ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 22px",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: bulletRewriting || !bulletInput.trim() ? "not-allowed" : "pointer",
                      boxShadow: bulletRewriting || !bulletInput.trim() ? "none" : "0 4px 14px rgba(99,102,241,0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {bulletRewriting ? "⏳ Polishing with AI..." : "✨ Rewrite Bullet Point"}
                  </button>
                </div>
              </div>

              {/* BULLET RESULTS */}
              {bulletResult && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0, color: "#0f172a", fontSize: "16px", fontWeight: "700" }}>
                      🚀 3 High-Impact ATS Variations
                    </h4>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>Click &quot;Copy&quot; to paste directly into your resume</span>
                  </div>

                  {bulletResult.variations?.map((v, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "14px",
                        padding: "18px 20px",
                        boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span
                            style={{
                              background: idx === 0 ? "rgba(99, 102, 241, 0.1)" : idx === 1 ? "rgba(139, 92, 246, 0.1)" : "rgba(16, 185, 129, 0.1)",
                              color: idx === 0 ? "#4338ca" : idx === 1 ? "#6d28d9" : "#065f46",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            {v.style}
                          </span>
                          {v.actionVerb && (
                            <span style={{ background: "#f1f5f9", color: "#334155", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" }}>
                              Verb: <strong>{v.actionVerb}</strong>
                            </span>
                          )}
                          {v.metricHighlight && (
                            <span style={{ background: "#fef3c7", color: "#92400e", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" }}>
                              📈 {v.metricHighlight}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyBullet(v.text, idx)}
                          style={{
                            background: copiedIndex === idx ? "#10b981" : "#ffffff",
                            color: copiedIndex === idx ? "#ffffff" : "#4f46e5",
                            border: `1px solid ${copiedIndex === idx ? "#10b981" : "#6366f1"}`,
                            padding: "6px 14px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {copiedIndex === idx ? "✅ Copied!" : "📋 Copy"}
                        </button>
                      </div>

                      <div style={{ color: "#0f172a", fontSize: "14px", lineHeight: "1.7", fontWeight: "500" }}>
                        • {v.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BACK TO DASHBOARD */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              paddingBottom: "10px",
            }}
          >
            <button
              onClick={() => setPage("dashboard")}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                border: "1px solid #6366f1",
                background: "#6366f1",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow:
                  "0 6px 18px rgba(99,102,241,0.25)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#4f46e5";
                e.currentTarget.style.transform =
                  "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 22px rgba(99,102,241,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#6366f1";
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(99,102,241,0.25)";
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </section>

      </main>

    </div>
  );
}

  // =========================
// CAREER ROADMAP
// =========================

if (page === "career-roadmap") {
  
  const targetRole =
    profileData.targetRole || profile?.targetRole || "Full Stack Developer";

  const roleConfig = getJobRoleByName(targetRole);
  const roadmap = Array.isArray(roleConfig.roadmap) ? roleConfig.roadmap : [];
  const learningResources = roleConfig.learningResources || {};


  const completedSteps = roadmap.filter(
  (item) => roadmapProgress[item.step]
).length;

const roadmapPercentage =
  roadmap.length > 0
    ? Math.round(
        (completedSteps / roadmap.length) * 100
      )
    : 0;

return (
  <div className="dashboard-page">

    {/* NAVBAR */}

    <nav className="dashboard-navbar">

      <div className="logo">
        SAARTHIX <span>AI</span>
      </div>

      <div className="dashboard-nav-right">

        <button
          type="button"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          onClick={() => setPage("resume-analysis")}
        >
          Resume Analysis
        </button>

        <button
          type="button"
          className="active"
          onClick={() => setPage("career-roadmap")}
        >
          Roadmap
        </button>

        <button
          type="button"
          onClick={() => setPage("career-mentor")}
        >
          AI Mentor
        </button>

        <button
          type="button"
          onClick={() => setPage("mock-interview")}
        >
          Mock Interview
        </button>

        <button
          type="button"
          onClick={() => setPage("profile")}
        >
          Profile
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>


    {/* MAIN */}

    <main className="dashboard-container">

      {/* HEADER */}

      <section className="dashboard-welcome">

        <div>

          <div className="dashboard-badge">
            🗺️ CAREER ROADMAP
          </div>

          <h1>
            Your Career Roadmap
          </h1>

          <p>
            Follow this personalized roadmap
            to become job ready for your
            target role.
          </p>

        </div>

        <div className="target-role-box">

          <span>
            TARGET ROLE
          </span>

          <strong>
            {targetRole}
          </strong>

        </div>

      </section>

      {/* OVERALL ROADMAP PROGRESS */}

<section className="dashboard-card">

  <div className="card-header">

    <div>
      <span className="card-label">
        OVERALL PROGRESS
      </span>

      <h2>
        Your Roadmap Progress
      </h2>
    </div>

    <div className="card-icon">
      📈
    </div>

  </div>

  {(() => {
  const completedSteps =
    roadmap.filter(
      (item) => roadmapProgress[item.step]
    ).length;

  const totalSteps = roadmap.length;

  const progress =
    totalSteps > 0
      ? Math.round(
          (completedSteps / totalSteps) * 100
        )
      : 0;

  const isRoadmapComplete =
    totalSteps > 0 &&
    completedSteps === totalSteps;

  return (
    <div style={{ marginTop: "20px" }}>

      {/* COMPLETION MESSAGE */}

      {isRoadmapComplete && (
        <div
          style={{
            marginBottom: "20px",
            padding: "18px",
            borderRadius: "12px",
            background:
              "rgba(34,197,94,0.1)",
            border:
              "1px solid rgba(34,197,94,0.3)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#15803d",
            }}
          >
            🎉 Congratulations!
          </h3>

          <p
            style={{
              marginTop: "10px",
              marginBottom : 0,
              color: "#166534",
              fontSize : "16px",
              fontWeight : "500",
              lineHeight : "1.5",
            }}
          >
            You have completed your entire
            career roadmap!
          </p>
        </div>
      )}

      {/* PROGRESS TEXT */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span>
          {completedSteps} of {totalSteps} steps completed
        </span>

        <strong>
          {progress}%
        </strong>
      </div>

      {/* PROGRESS BAR */}

      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#1e293b",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: "20px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

    </div>
  );
})()}

</section>


      {/* ROADMAP */}

      <section className="dashboard-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              LEARNING PATH
            </span>

            <h2>
              Step-by-Step Roadmap
            </h2>

          </div>

          <div className="card-icon">
            🚀
          </div>

        </div>

        {/* OVERALL PROGRESS */}

        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>
              Overall Roadmap Progress
            </strong>

            <strong>
              {roadmapPercentage}%
            </strong>
          </div>

          <div
            style={{
              marginTop: "12px",
              width: "100%",
              height: "10px",
              background: "#1e293b",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${roadmapPercentage}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #6366f1, #8b5cf6)",
                borderRadius: "10px",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          <p
            className="card-description"
            style={{ marginTop: "10px" }}
          >
            {completedSteps} of {roadmap.length} steps completed
          </p>
        </div>


        <div style={{ marginTop: "25px" }}>

          <div style={{ marginTop: "20px" }}>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    }}
  >
    <span>
      Roadmap Progress
    </span>

    <strong>
      {completedSteps} / {roadmap.length}
    </strong>
  </div>

  <div
    style={{
      width: "100%",
      height: "10px",
      background: "#1e293b",
      borderRadius: "20px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${roadmapPercentage}%`,
        height: "100%",
        background:
          "linear-gradient(90deg, #6366f1, #8b5cf6)",
        borderRadius: "20px",
        transition: "width 0.5s ease",
      }}
    />
  </div>

  <p
    className="card-description"
    style={{ marginTop: "8px" }}
  >
    {roadmapPercentage}% completed
  </p>

  <button
  type="button"
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your roadmap progress?"
    );

    if (confirmed) {
      setRoadmapProgress({});
    }
  }}
  style={{
    marginTop: "15px",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #ef4444",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  }}
>
  🔄 Reset Progress
</button>

</div>
          

          {roadmap.map((item) => (

            

            <div
              key={item.step}
              style={{
                marginBottom: "25px",
                padding: "22px",
                borderRadius: "14px",
                background: roadmapProgress[item.step]
                  ? "rgba(34,197,94,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: roadmapProgress[item.step]
                  ? "1px solid rgba(34,197,94,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: roadmapProgress[item.step]
                   ? "0 8px 25px rgba(34,197,94,0.08)"
                  : "none",
                  transition: "all 0.3s ease",
              }}
            >
              

              {/* STEP */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: roadmapProgress[item.step]
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(99,102,241,0.15)",
                    color: roadmapProgress[item.step]
                    ? "#22c55e"
                    : "#ffffff",
                    fontWeight: "700",
                  }}
                >
                  {roadmapProgress[item.step] ? "✓" : item.step}
                </div>


                <div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0 }}>
                      {item.title}
                    </h3>
                    {item.level && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: "rgba(99, 102, 241, 0.2)",
                          color: "#a5b4fc",
                          border: "1px solid rgba(99, 102, 241, 0.35)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item.level}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      color: roadmapProgress[item.step]
                        ? "#22c55e"
                        : "#94a3b8",
                      fontWeight: "600",
                    }}
                  >
                    {roadmapProgress[item.step]
                      ? "100% Complete"
                      : "0% Complete"}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      width: "180px",
                      height: "6px",
                      background: "#1e293b",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: roadmapProgress[item.step]
                          ? "100%"
                          : "0%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #6366f1, #8b5cf6)",
                        borderRadius: "10px",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>

                  <small
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    ⏱ {item.duration}
                  </small>

                  <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input
  type="checkbox"
  checked={!!roadmapProgress[item.step]}
  onChange={() => {
    setRoadmapProgress((prev) => ({
      ...prev,
      [item.step]: !prev[item.step],
    }));
  }}

                   />

                    <span>
                     {roadmapProgress[item.step]
                       ? "Completed ✓"
                        : "Mark as completed"}
                    </span>
                  </label>
                </div>

                </div>

              </div>


              {/* TOPICS */}

              <ul
                style={{
                  marginTop: "15px",
                  paddingLeft: "25px",
                }}
              >

                {item.topics.map((topic, index) => {
                  const isAcquired = (resumeAnalysis?.detectedSkills ?? []).some((s) => {
                    if (!s || typeof s !== "string") return false;
                    const sLow = s.toLowerCase().trim();
                    if (sLow.length < 2) return false;
                    return topic.toLowerCase().includes(sLow);
                  });

                  return (
                    <li
                      key={index}
                      style={{
                        marginBottom: "8px",
                        color: "#cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      <span>{topic}</span>
                      {isAcquired && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            background: "rgba(34, 197, 94, 0.15)",
                            border: "1px solid rgba(34, 197, 94, 0.35)",
                            color: "#4ade80",
                          }}
                        >
                          ✓ Acquired in Resume
                        </span>
                      )}
                    </li>
                  );
                })}

              </ul>

              {/* STEP STATUS */}

<div
  style={{
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
  }}
>

  <div>

    <strong>
      {roadmapProgress[item.step]
        ? "✅ Completed"
        : "🔄 Not Completed"}
    </strong>

  </div>

  <button
    type="button"
    className="primary-btn"
    onClick={() => {
  setRoadmapProgress((prev) => {
    const updatedProgress = {
      ...prev,
      [item.step]: !prev[item.step],
    };

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user && user.id) {
      localStorage.setItem(
        `roadmapProgress_${user.id}`,
        JSON.stringify(updatedProgress)
      );
    }

    return updatedProgress;
  });
}}
  >
    {roadmapProgress[item.step]
      ? "↩ Mark Incomplete"
      : "✓ Mark Completed"}
  </button>

</div>
              {/* LEARNING RESOURCES */}
              {(() => {
                const matchedKey = Object.keys(learningResources).find(
                  (key) =>
                    item.title.toLowerCase().includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(item.title.toLowerCase())
                );
                const resources = learningResources[item.title] || (matchedKey ? learningResources[matchedKey] : []);

                return (
                  <div style={{ marginTop: "20px" }}>
                    {resources && resources.length > 0 && (
                      <>
                        <h4 style={{ marginBottom: "12px" }}>📚 Learning Resources</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {resources.map((resource, index) => (
                            <button
                              key={index}
                              className="dashboard-action"
                              type="button"
                              onClick={() => window.open(resource.url, "_blank", "noopener,noreferrer")}
                            >
                              🔗 {resource.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <div style={{ marginTop: "18px" }}>
                      <button
                        className="primary-btn"
                        type="button"
                        onClick={() => {
                          if (resources && resources.length > 0) {
                            window.open(resources[0].url, "_blank", "noopener,noreferrer");
                          } else {
                            window.open(
                              `https://www.google.com/search?q=${encodeURIComponent(item.title + " tutorial roadmap")}`,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                      >
                        📚 Start Learning {item.title} →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

          ))}

        </div>

      </section>


      {/* BACK BUTTON */}

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >

        <button
          className="secondary-btn"
          onClick={() => {
            const confirmReset =
              window.confirm(
                "Are you sure you want to reset your roadmap progress?"
              );

            if (confirmReset) {
              setRoadmapProgress({});
              localStorage.removeItem("roadmapProgress");
            }
          }}
         
        >
          🔄 Reset Progress
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </div>

    </main>

  </div>
);

}  
if (page === "career-mentor") {
  const savedAnalysis = readStoredJson("resumeAnalysis", {}) || {};
  const currentTargetRole = savedAnalysis.targetRole || profile?.targetRole || profileData?.targetRole || "Full Stack Developer";
  const roleConfig = getJobRoleByName(currentTargetRole);

  return (
    <div className="dashboard-page">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => setPage("dashboard")}
        >
          SAARTHIX <span>AI</span>
        </div>

        <div className="dashboard-nav-right">
          <button
            type="button"
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setPage("resume-analysis")}
          >
            Resume Analysis
          </button>

          <button
            type="button"
            onClick={() => setPage("career-roadmap")}
          >
            Roadmap
          </button>

          <button
            type="button"
            className="active"
            onClick={() => setPage("career-mentor")}
          >
            AI Mentor
          </button>

          <button
            type="button"
            onClick={() => setPage("mock-interview")}
          >
            Mock Interview
          </button>

          <button
            type="button"
            onClick={() => setPage("profile")}
          >
            Profile
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="dashboard-container">
        {/* HEADER */}
        <section className="dashboard-welcome">
          <div>
            <div className="dashboard-badge">🤖 AI CAREER MENTOR</div>
            <h1>
              SAARTHIX <span>AI Mentor</span>
            </h1>
            <p>
              Your personalized AI assistant for career planning, skills, interview preparation and placements.
            </p>
          </div>

          <div className="target-role-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
              <span>TARGET ROLE</span>
              <button
                type="button"
                onClick={() => setPage("profile")}
                style={{
                  border: "none",
                  background: "rgba(99,102,241,0.12)",
                  color: "#4f46e5",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                ✏️ Change
              </button>
            </div>
            <strong>{currentTargetRole}</strong>
          </div>
        </section>

        {/* CHAT CONTAINER */}
        <section
          className="dashboard-card"
          style={{
            padding: 0,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            background: "#ffffff",
          }}
        >
          {/* CHAT HEADER */}
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #e2e8f0",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(99,102,241,0.12)",
                  fontSize: "22px",
                  flexShrink: 0,
                }}
              >
                🤖
              </div>

              <div>
                <h3 style={{ margin: 0, color: "#111827", fontSize: "16px", fontWeight: "700" }}>
                  SAARTHIX AI Mentor
                </h3>
                <span
                  style={{
                    color: "#16a34a",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#16a34a",
                      display: "inline-block",
                    }}
                  />
                  Online &bull; Powered by Qwen &amp; Groq
                </span>
              </div>
            </div>

            {/* QUICK PROMPT CHIPS */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {(roleConfig?.quickPrompts || [
                { label: `🗺️ ${roleConfig?.name || "Career"} Roadmap`, query: `Give me a step-by-step roadmap to become a job-ready ${roleConfig?.name || "developer"}` },
                { label: "📈 Boost ATS Score", query: `What technical keywords should I add to my resume for ${roleConfig?.name || "this"} role?` },
                { label: "💼 Technical Interview Prep", query: `What technical interview questions are commonly asked for ${roleConfig?.name || "this"} role?` },
                { label: "🚀 Project Ideas", query: `What are 3 standout portfolio projects that hiring managers love for ${roleConfig?.name || "this"} role?` },
              ]).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMentorMessage(item.query)}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: "1px solid #e0e7ff",
                    background: "#f5f7ff",
                    color: "#4338ca",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4f46e5";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f5f7ff";
                    e.currentTarget.style.color = "#4338ca";
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CHAT MESSAGES */}
          <div
            style={{
              minHeight: "440px",
              maxHeight: "560px",
              overflowY: "auto",
              padding: "24px",
              background: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {mentorMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: message.sender === "user" ? "75%" : "85%",
                    padding: message.sender === "user" ? "12px 18px" : "18px 22px",
                    borderRadius:
                      message.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      message.sender === "user"
                        ? "linear-gradient(135deg, #6366f1, #7c3aed)"
                        : "#ffffff",
                    border:
                      message.sender === "user"
                        ? "none"
                        : "1px solid #e2e8f0",
                    color:
                      message.sender === "user"
                        ? "#ffffff"
                        : "#1e293b",
                    boxShadow:
                      message.sender === "user"
                        ? "0 4px 14px rgba(99, 102, 241, 0.25)"
                        : "0 2px 10px rgba(0, 0, 0, 0.03)",
                    wordBreak: "break-word",
                  }}
                >
                  {message.sender === "ai" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#6366f1",
                        marginBottom: "8px",
                      }}
                    >
                      <span>🤖</span>
                      <span>SAARTHIX AI</span>
                    </div>
                  )}

                  {message.sender === "ai" ? (
                    <div>{renderFormattedMentorText(message.text)}</div>
                  ) : (
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                      {message.text}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* CHAT INPUT */}
          <div
            style={{
              padding: "18px 24px",
              borderTop: "1px solid #e2e8f0",
              background: "#ffffff",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={mentorInput}
              onChange={(e) => setMentorInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMentorMessage();
                }
              }}
              placeholder={`Ask a question for ${currentTargetRole} (e.g. 'How to crack technical rounds?', 'Suggest standout projects')...`}
              style={{
                flex: 1,
                padding: "13px 18px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#0f172a",
                outline: "none",
                fontSize: "14px",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />

            <button
              className="primary-btn"
              onClick={() => sendMentorMessage()}
              disabled={!mentorInput.trim()}
              style={{
                padding: "13px 22px",
                borderRadius: "12px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: mentorInput.trim() ? 1 : 0.5,
                cursor: mentorInput.trim() ? "pointer" : "not-allowed",
              }}
            >
              <span>Send</span>
              <span>➤</span>
            </button>
          </div>
        </section>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
            style={{
              background: "#ffffff",
              color: "#1e293b",
              border: "1.5px solid #cbd5e1",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.color = "#4f46e5";
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(99,102,241,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            }}
          >
            ← Back to Dashboard
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setPage("resume-analysis")}
            style={{
              background: "#ffffff",
              color: "#1e293b",
              border: "1.5px solid #cbd5e1",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.color = "#4f46e5";
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(99,102,241,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            }}
          >
            📄 Analyze Resume
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setPage("career-roadmap")}
            style={{
              background: "#ffffff",
              color: "#1e293b",
              border: "1.5px solid #cbd5e1",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.color = "#4f46e5";
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(99,102,241,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            }}
          >
            🗺️ View Roadmap
          </button>
        </div>
      </main>
    </div>
  );
}

// =========================
// MOCK INTERVIEW SIMULATOR PAGE
// =========================

if (page === "mock-interview") {
  const currentTargetRole = profileData?.targetRole || profile?.targetRole || "Software Developer";
  const roleConfig = getJobRoleByName(currentTargetRole);

  return (
    <div className="dashboard-page">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => setPage("dashboard")}
        >
          SAARTHIX <span>AI</span>
        </div>

        <div className="dashboard-nav-right">
          <button type="button" onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button type="button" onClick={() => setPage("resume-analysis")}>
            Resume Analysis
          </button>

          <button type="button" onClick={() => setPage("career-roadmap")}>
            Roadmap
          </button>

          <button type="button" onClick={() => setPage("career-mentor")}>
            AI Mentor
          </button>

          <button type="button" className="active" onClick={() => setPage("mock-interview")}>
            Mock Interview
          </button>

          <button type="button" onClick={() => setPage("profile")}>
            Profile
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="dashboard-container">
        {/* HEADER */}
        <section className="dashboard-welcome">
          <div>
            <div className="dashboard-badge" style={{ background: "rgba(124, 58, 237, 0.12)", color: "#7c3aed" }}>
              🎙️ AI MOCK INTERVIEW SIMULATOR
            </div>
            <h1>
              Practice Interviews for <span>{currentTargetRole}</span>
            </h1>
            <p>
              Simulate high-stakes technical, system design, and behavioral interviews. Get real-time AI scoring, master-class model answers, and a comprehensive hiring scorecard.
            </p>
          </div>

          <div className="target-role-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
              <span>TARGET ROLE</span>
              <button
                type="button"
                onClick={() => setPage("profile")}
                style={{
                  border: "none",
                  background: "rgba(99,102,241,0.12)",
                  color: "#4f46e5",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                ✏️ Change
              </button>
            </div>
            <strong>{currentTargetRole}</strong>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: LOBBY & SETUP (IDLE) */}
        {/* ------------------------------------------------------------- */}
        {interviewStatus === "idle" && (
          <section className="dashboard-card" style={{ padding: "30px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {/* STEP 1: INTERVIEW MODE */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontWeight: "700", fontSize: "15px", color: "#1e293b", marginBottom: "12px" }}>
                  1. Choose Interview Format
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
                  {[
                    {
                      id: "Technical",
                      icon: "⚡",
                      title: "Technical & Architecture",
                      desc: `Core ${currentTargetRole} internals, problem-solving, algorithms, and domain knowledge.`,
                    },
                    {
                      id: "System Design",
                      icon: "🏗️",
                      title: "System Design & Scale",
                      desc: "Scalability, microservices, APIs, database modeling, caching, and resiliency.",
                    },
                    {
                      id: "Behavioral",
                      icon: "🤝",
                      title: "Behavioral & STAR",
                      desc: "Engineering teamwork, deadline crises, ownership, and conflict resolution.",
                    },
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setInterviewType(mode.id)}
                      style={{
                        padding: "18px",
                        borderRadius: "12px",
                        border: `2px solid ${interviewType === mode.id ? "#6366f1" : "#e2e8f0"}`,
                        background: interviewType === mode.id ? "rgba(99, 102, 241, 0.05)" : "#ffffff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: interviewType === mode.id ? "0 4px 14px rgba(99, 102, 241, 0.12)" : "none",
                      }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>{mode.icon}</div>
                      <div style={{ fontWeight: "700", fontSize: "15px", color: interviewType === mode.id ? "#4f46e5" : "#0f172a", marginBottom: "6px" }}>
                        {mode.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5" }}>
                        {mode.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 2: EXPERIENCE LEVEL */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontWeight: "700", fontSize: "15px", color: "#1e293b", marginBottom: "12px" }}>
                  2. Select Target Seniority Level
                </label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {[
                    { id: "Entry / Graduate", label: "🎓 Entry / College Graduate (0–1 yrs)" },
                    { id: "Mid-Level", label: "💼 Mid-Level Software Engineer (1–3 yrs)" },
                    { id: "Senior", label: "🚀 Senior / Lead Engineer (3+ yrs)" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setInterviewLevel(lvl.id)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        border: `1px solid ${interviewLevel === lvl.id ? "#6366f1" : "#cbd5e1"}`,
                        background: interviewLevel === lvl.id ? "rgba(99, 102, 241, 0.1)" : "#ffffff",
                        color: interviewLevel === lvl.id ? "#4f46e5" : "#334155",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* HIGHLIGHTS / RULES */}
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  marginBottom: "28px",
                }}
              >
                <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "14px", marginBottom: "8px" }}>
                  💡 What happens during your interview:
                </div>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#475569", fontSize: "13px", lineHeight: "1.7" }}>
                  <li>You will face <strong>5 realistic questions</strong> designed specifically for a <strong>{currentTargetRole}</strong>.</li>
                  <li>After each response, you receive instant <strong>1–10 scoring</strong>, strengths, and missing concepts.</li>
                  <li>You can inspect a <strong>Senior-Level Model Answer</strong> before continuing to the next challenge.</li>
                  <li>At the end, you receive a full <strong>Performance Scorecard & Hiring Verdict</strong>.</li>
                </ul>
              </div>

              {/* START BUTTON */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={handleStartInterview}
                  disabled={interviewStarting}
                  style={{
                    padding: "14px 38px",
                    borderRadius: "12px",
                    border: "none",
                    background: interviewStarting ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: interviewStarting ? "not-allowed" : "pointer",
                    boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                    transition: "all 0.25s ease",
                  }}
                >
                  {interviewStarting ? `⏳ Starting ${interviewType} Interview...` : "🚀 Launch Mock Interview Now"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: ACTIVE QUESTION (IN-PROGRESS) */}
        {/* ------------------------------------------------------------- */}
        {interviewStatus === "in-progress" && interviewCurrentQ && (
          <section className="dashboard-card" style={{ padding: "28px" }}>
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              {/* TOP PROGRESS BAR */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      background: "rgba(99, 102, 241, 0.12)",
                      color: "#4f46e5",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    Question {interviewCurrentQ.questionNumber || 1} of {interviewCurrentQ.totalQuestions || 5}
                  </span>
                  <span style={{ fontSize: "13px", color: "#10b981", fontWeight: "700", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                    Live Session
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                    {interviewType} • {currentTargetRole}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Are you sure you want to end this interview session? Your progress will be lost.")) {
                        handleResetInterview();
                      }
                    }}
                    style={{ border: "1px solid #cbd5e1", background: "#ffffff", color: "#64748b", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
                  >
                    Exit
                  </button>
                </div>
              </div>

              {/* PROGRESS BAR STRIP */}
              <div style={{ width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden", marginBottom: "24px" }}>
                <div
                  style={{
                    width: `${((interviewCurrentQ.questionNumber || 1) / (interviewCurrentQ.totalQuestions || 5)) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              {/* QUESTION CARD */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04))",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                  borderRadius: "14px",
                  padding: "24px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ background: "#ede9fe", color: "#6d28d9", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
                    Topic: {interviewCurrentQ.topic || "Core Technical Domain"}
                  </span>
                </div>

                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", lineHeight: "1.5", margin: "0 0 12px 0" }}>
                  {interviewCurrentQ.question}
                </h2>

                {interviewCurrentQ.tip && (
                  <div style={{ marginTop: "12px" }}>
                    <button
                      type="button"
                      onClick={() => setShowInterviewHint(!showInterviewHint)}
                      style={{ border: "none", background: "transparent", color: "#6366f1", fontSize: "12px", fontWeight: "700", cursor: "pointer", padding: 0 }}
                    >
                      {showInterviewHint ? "🙈 Hide Interview Hint" : "💡 Need a hint on what to touch upon?"}
                    </button>
                    {showInterviewHint && (
                      <div style={{ marginTop: "8px", padding: "10px 14px", borderRadius: "8px", background: "#ffffff", border: "1px solid #c7d2fe", fontSize: "13px", color: "#3730a3", lineHeight: "1.5" }}>
                        <strong>Interviewer Tip:</strong> {interviewCurrentQ.tip}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CANDIDATE ANSWER INPUT */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
                    ✍️ Your Response
                  </label>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    {interviewUserAnswer.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={interviewUserAnswer}
                  onChange={(e) => setInterviewUserAnswer(e.target.value)}
                  placeholder="Structure your answer clearly. Discuss trade-offs, architecture decisions, edge cases, and real-world considerations..."
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#0f172a",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    lineHeight: "1.6",
                    resize: "vertical",
                  }}
                />

                <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={handleSubmitInterviewAnswer}
                    disabled={interviewEvaluating || !interviewUserAnswer.trim()}
                    style={{
                      background: interviewEvaluating || !interviewUserAnswer.trim() ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px 28px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: interviewEvaluating || !interviewUserAnswer.trim() ? "not-allowed" : "pointer",
                      boxShadow: interviewEvaluating || !interviewUserAnswer.trim() ? "none" : "0 4px 14px rgba(99,102,241,0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {interviewEvaluating ? "🤔 Senior Interviewer is Evaluating..." : "Submit Answer for Evaluation →"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: QUESTION REVIEW & FEEDBACK (REVIEWED) */}
        {/* ------------------------------------------------------------- */}
        {interviewStatus === "reviewed" && interviewLastEval && (
          <section className="dashboard-card" style={{ padding: "28px" }}>
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              {/* SCORE HEADER */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: interviewLastEval.score >= 8 ? "rgba(16, 185, 129, 0.12)" : interviewLastEval.score >= 6 ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)",
                      border: `3px solid ${interviewLastEval.score >= 8 ? "#10b981" : interviewLastEval.score >= 6 ? "#f59e0b" : "#ef4444"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "20px",
                      color: interviewLastEval.score >= 8 ? "#059669" : interviewLastEval.score >= 6 ? "#d97706" : "#dc2626",
                    }}
                  >
                    {interviewLastEval.score}/10
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                      Interviewer Assessment
                    </span>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                      {interviewLastEval.score >= 8 ? "Strong Performance" : interviewLastEval.score >= 6 ? "Satisfactory Response" : "Needs Revision"}
                    </div>
                  </div>
                </div>

                <span style={{ background: "rgba(99, 102, 241, 0.1)", color: "#4338ca", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "700" }}>
                  Question {interviewCurrentQ?.questionNumber || 1} of 5
                </span>
              </div>

              {/* QUESTION RECAP */}
              <div style={{ marginBottom: "16px", padding: "14px 18px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Question Prompt:
                </div>
                <div style={{ fontWeight: "700", color: "#1e293b", fontSize: "14px" }}>
                  {interviewCurrentQ?.question}
                </div>
              </div>

              {/* OVERALL FEEDBACK */}
              <div style={{ marginBottom: "20px", padding: "14px 18px", borderRadius: "10px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#4f46e5", textTransform: "uppercase", marginBottom: "4px" }}>
                  Interviewer Feedback:
                </div>
                <p style={{ margin: 0, color: "#334155", fontSize: "14px", lineHeight: "1.6" }}>
                  {interviewLastEval.feedback}
                </p>
              </div>

              {/* STRENGTHS & MISSING CONCEPTS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                {/* STRENGTHS */}
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <div style={{ fontWeight: "700", color: "#065f46", fontSize: "14px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✅</span> Strengths Highlighted
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "18px", color: "#065f46", fontSize: "13px", lineHeight: "1.6" }}>
                    {interviewLastEval.strengths?.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* MISSING CONCEPTS */}
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.04)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  <div style={{ fontWeight: "700", color: "#92400e", fontSize: "14px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>⚠️</span> Missing Concepts / Improvements
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "18px", color: "#92400e", fontSize: "13px", lineHeight: "1.6" }}>
                    {interviewLastEval.missingConcepts?.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* MODEL ANSWER ACCORDION */}
              <div style={{ marginBottom: "26px" }}>
                <button
                  type="button"
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  style={{
                    width: "100%",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    border: "1px solid #c7d2fe",
                    background: showModelAnswer ? "#e0e7ff" : "rgba(99, 102, 241, 0.06)",
                    color: "#3730a3",
                    fontWeight: "700",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span>🏆 Master-Class Senior Model Answer</span>
                  <span>{showModelAnswer ? "▲ Hide" : "▼ Reveal Model Answer"}</span>
                </button>

                {showModelAnswer && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "16px 20px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      color: "#1e293b",
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    {interviewLastEval.idealAnswer}
                  </div>
                )}
              </div>

              {/* ACTION BUTTON */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {(interviewCurrentQ?.questionNumber || 1) < 5 && !interviewLastEval.isFinished ? (
                  <button
                    type="button"
                    onClick={handleNextInterviewQuestion}
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px 28px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next Question (Question {(interviewCurrentQ?.questionNumber || 1) + 1} of 5) →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCompleteInterview()}
                    disabled={interviewFinishing}
                    style={{
                      background: interviewFinishing ? "#94a3b8" : "linear-gradient(135deg, #10b981, #059669)",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px 30px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: interviewFinishing ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {interviewFinishing ? "⏳ Finalizing Scorecard..." : "🏁 Generate Final Hiring Scorecard →"}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: FINAL HIRING SCORECARD (COMPLETED) */}
        {/* ------------------------------------------------------------- */}
        {interviewStatus === "completed" && interviewScorecard && (
          <section className="dashboard-card" style={{ padding: "30px" }}>
            <div style={{ maxWidth: "840px", margin: "0 auto" }}>
              {/* SCORECARD HERO */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                  borderRadius: "16px",
                  padding: "26px",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "800",
                    marginBottom: "14px",
                    background:
                      interviewScorecard.verdict === "Strong Hire"
                        ? "rgba(16, 185, 129, 0.15)"
                        : interviewScorecard.verdict === "Hire"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "rgba(245, 158, 11, 0.15)",
                    color:
                      interviewScorecard.verdict === "Strong Hire"
                        ? "#059669"
                        : interviewScorecard.verdict === "Hire"
                        ? "#4338ca"
                        : "#d97706",
                    border: `1px solid ${interviewScorecard.verdict === "Strong Hire" ? "#10b981" : "#6366f1"}`,
                  }}
                >
                  VERDICT: {interviewScorecard.verdict}
                </div>

                <div style={{ fontSize: "44px", fontWeight: "900", color: "#0f172a", marginBottom: "6px" }}>
                  {interviewScorecard.overallScore} <span style={{ fontSize: "22px", color: "#64748b", fontWeight: "600" }}>/ 10</span>
                </div>

                <div style={{ fontSize: "14px", color: "#64748b", fontWeight: "600", marginBottom: "16px" }}>
                  Overall Interview Score • {currentTargetRole} ({interviewType})
                </div>

                <p style={{ margin: "0 auto", maxWidth: "660px", color: "#334155", fontSize: "14px", lineHeight: "1.7" }}>
                  {interviewScorecard.summary}
                </p>
              </div>

              {/* TWO COLUMN ANALYSIS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginBottom: "24px" }}>
                {/* KEY STRENGTHS */}
                <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                  <div style={{ fontWeight: "800", color: "#065f46", fontSize: "15px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🌟</span> Standout Strengths Demonstrated
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#065f46", fontSize: "13px", lineHeight: "1.7" }}>
                    {interviewScorecard.keyStrengths?.map((st, idx) => (
                      <li key={idx}>{st}</li>
                    ))}
                  </ul>
                </div>

                {/* CRITICAL REVISIONS */}
                <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.25)" }}>
                  <div style={{ fontWeight: "800", color: "#991b1b", fontSize: "15px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🛠️</span> Critical Revisions Before Interviews
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#991b1b", fontSize: "13px", lineHeight: "1.7" }}>
                    {interviewScorecard.criticalRevisions?.map((cr, idx) => (
                      <li key={idx}>{cr}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NEXT STEPS */}
              {interviewScorecard.nextSteps && (
                <div style={{ padding: "16px 20px", borderRadius: "12px", background: "#f8fafc", borderLeft: "4px solid #6366f1", marginBottom: "26px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#4f46e5", textTransform: "uppercase", marginBottom: "4px" }}>
                    🎯 Recommended Next Steps & Preparation Strategy:
                  </div>
                  <div style={{ color: "#334155", fontSize: "14px", lineHeight: "1.6" }}>
                    {interviewScorecard.nextSteps}
                  </div>
                </div>
              )}

              {/* TURN BY TURN TRANSCRIPT */}
              {interviewHistory.length > 0 && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
                    📜 Turn-by-Turn Question Log
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {interviewHistory.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "16px 20px",
                          borderRadius: "12px",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontWeight: "700", color: "#4f46e5", fontSize: "13px" }}>
                            Question {idx + 1}: {item.topic}
                          </span>
                          <span
                            style={{
                              background: item.score >= 8 ? "#d1fae5" : item.score >= 6 ? "#fef3c7" : "#fee2e2",
                              color: item.score >= 8 ? "#065f46" : item.score >= 6 ? "#92400e" : "#991b1b",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            Score: {item.score}/10
                          </span>
                        </div>
                        <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "13px", marginBottom: "8px" }}>
                          &quot;{item.question}&quot;
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5" }}>
                          <strong>Your Answer:</strong> {item.userAnswer.slice(0, 160)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleResetInterview}
                  style={{
                    padding: "12px 26px",
                    borderRadius: "10px",
                    border: "1px solid #6366f1",
                    background: "#ffffff",
                    color: "#4f46e5",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  🔄 Practice Another Mock Interview
                </button>

                <button
                  type="button"
                  onClick={() => setPage("dashboard")}
                  style={{
                    padding: "12px 26px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

  // =========================
  // DEFAULT
  // =========================

  return null;
}

export default App;
