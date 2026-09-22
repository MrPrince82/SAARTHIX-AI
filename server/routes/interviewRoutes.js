const express = require("express");
const Groq = require("groq-sdk");
const { getJobRoleByName } = require("../data/jobRoles");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL_TO_USE = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

// Helper to safely extract JSON from LLM output
function parseJsonResponse(rawText, fallbackObj) {
  if (!rawText) return fallbackObj;
  try {
    const cleaned = rawText.trim();
    // Check if wrapped in markdown code fence
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonStr = codeBlockMatch ? codeBlockMatch[1] : cleaned;
    
    // Find the outer braces
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
// 1. START INTERVIEW: Generate initial question
// ---------------------------------------------------------------------------
router.post("/start", async (req, res) => {
  try {
    const { targetRole, interviewType = "Technical", experienceLevel = "Entry/Graduate" } = req.body;

    const roleConfig = getJobRoleByName(targetRole);
    const safeRole = roleConfig.name || "Software Developer";
    const roleTech = Array.isArray(roleConfig.technologies) ? roleConfig.technologies.join(", ") : "CS Fundamentals";
    const roleTopics = Array.isArray(roleConfig.interviewTopics) ? roleConfig.interviewTopics.join("; ") : "Core Domain Concepts";

    const systemPrompt = `You are a Principal Engineer and Hiring Manager conducting a high-stakes ${interviewType} Mock Interview for the position of "${safeRole}".
Role Key Technologies: ${roleTech}
Role Key Interview Topics: ${roleTopics}
Candidate Experience Level: ${experienceLevel}

Generate Question 1 of 5.
For ${interviewType}:
- Technical: Focus on practical architecture, core data structures, language internals, or problem-solving for ${safeRole}.
- System Design: Focus on designing a scalable component, API, or data flow relevant to ${safeRole}.
- Behavioral / Cultural: Focus on real-world engineering teamwork, debugging crises, deadlines, or conflict resolution.

IMPORTANT: Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "question": "A clear, realistic, and challenging interview question",
  "topic": "Specific domain area (e.g. Memory Management, Concurrency, REST Architecture)",
  "tip": "A brief hint on what a strong candidate should touch upon"
}`;

    const completion = await groq.chat.completions.create({
      model: MODEL_TO_USE,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Start the ${interviewType} interview for ${safeRole}. Give Question 1.` }
      ],
      temperature: 0.6,
      max_tokens: 450,
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "{}";
    const parsed = parseJsonResponse(rawResponse, {
      question: `Could you explain the core architectural principles and technologies you use when building applications as a ${safeRole}?`,
      topic: "Core Architecture & Fundamentals",
      tip: "Mention real-world trade-offs, state management, or backend logic."
    });

    return res.json({
      success: true,
      questionNumber: 1,
      totalQuestions: 5,
      question: parsed.question,
      topic: parsed.topic || "Core Fundamentals",
      tip: parsed.tip || "",
      interviewType,
      targetRole: safeRole,
    });
  } catch (error) {
    console.error("Mock Interview Start Error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to initialize interview simulator. Please try again.",
    });
  }
});

// ---------------------------------------------------------------------------
// 2. EVALUATE ANSWER & PROVIDE NEXT QUESTION
// ---------------------------------------------------------------------------
router.post("/evaluate", async (req, res) => {
  try {
    const {
      targetRole,
      interviewType = "Technical",
      questionNumber = 1,
      totalQuestions = 5,
      question,
      userAnswer,
      history = [],
    } = req.body;

    if (!userAnswer || !userAnswer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer cannot be empty.",
      });
    }

    const roleConfig = getJobRoleByName(targetRole);
    const safeRole = roleConfig.name || "Software Developer";
    const isLastQuestion = Number(questionNumber) >= Number(totalQuestions);
    const nextQuestionNumber = Number(questionNumber) + 1;

    const systemPrompt = `You are an expert Lead Interviewer evaluating a candidate's answer for a "${safeRole}" position during a ${interviewType} interview.
Candidate target role: ${safeRole}
Current Question (${questionNumber} of ${totalQuestions}): "${question}"
Candidate Answer: "${userAnswer}"

Your task:
1. Objectively grade the answer on a scale of 1 to 10 (10 = exceptional FAANG-level response, 7-8 = solid hire, 4-6 = partial/needs work, 1-3 = weak or off-topic).
2. Highlight 2 concrete strengths of the candidate's answer.
3. Highlight 1-2 missing concepts, technical oversights, or areas to improve.
4. Provide an "idealAnswer": a concise, master-class model response demonstrating what an ideal candidate would say (max 4 sentences).
${isLastQuestion ? "This is the final question. Do NOT generate a next question." : `5. Generate Next Question #${nextQuestionNumber} of ${totalQuestions} for this ${interviewType} interview for ${safeRole}. Progress the difficulty or move to another critical interview topic.`}

IMPORTANT: Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "score": 8,
  "feedback": "Concise 1-2 sentence overall impression",
  "strengths": ["Strength 1", "Strength 2"],
  "missingConcepts": ["Missing concept 1", "Missing concept 2"],
  "idealAnswer": "Comprehensive, senior-level model answer",
  "nextQuestion": ${isLastQuestion ? "null" : "\"Next question text\""},
  "nextTopic": ${isLastQuestion ? "null" : "\"Next topic name\""},
  "isFinished": ${isLastQuestion ? "true" : "false"}
}`;

    const completion = await groq.chat.completions.create({
      model: MODEL_TO_USE,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please evaluate this answer and return the JSON evaluation.` }
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "{}";
    const parsed = parseJsonResponse(rawResponse, {
      score: 7,
      feedback: "Good grasp of the basics with room for deeper technical precision.",
      strengths: ["Clear logical thought process", "Directly addressed the prompt"],
      missingConcepts: ["Could include concrete performance metrics or trade-offs"],
      idealAnswer: "An optimal answer would clearly define the operational constraints, discuss architectural trade-offs, and cite production lessons.",
      nextQuestion: isLastQuestion ? null : `What strategies would you employ when scaling a database or service for ${safeRole}?`,
      nextTopic: isLastQuestion ? null : "Scalability & Performance",
      isFinished: isLastQuestion,
    });

    return res.json({
      success: true,
      score: typeof parsed.score === "number" ? Math.min(10, Math.max(1, parsed.score)) : 7,
      feedback: parsed.feedback || "Good response.",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ["Clear explanation"],
      missingConcepts: Array.isArray(parsed.missingConcepts) ? parsed.missingConcepts : ["More technical depth recommended"],
      idealAnswer: parsed.idealAnswer || "A complete response covers both foundational concepts and real-world trade-offs.",
      nextQuestion: isLastQuestion ? null : (parsed.nextQuestion || `Describe your approach to testing and code quality in ${safeRole}.`),
      nextTopic: isLastQuestion ? null : (parsed.nextTopic || "Quality & Delivery"),
      nextQuestionNumber,
      isFinished: isLastQuestion,
    });
  } catch (error) {
    console.error("Mock Interview Evaluation Error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to evaluate interview answer.",
    });
  }
});

// ---------------------------------------------------------------------------
// 3. COMPLETE INTERVIEW: Generate final scorecard & comprehensive feedback
// ---------------------------------------------------------------------------
router.post("/complete", async (req, res) => {
  try {
    const { targetRole, interviewType = "Technical", history = [] } = req.body;

    const roleConfig = getJobRoleByName(targetRole);
    const safeRole = roleConfig.name || "Software Developer";

    const questionsSummary = history.map((item, idx) => {
      return `Q${idx + 1}: ${item.question}\nScore: ${item.score}/10\nStrengths: ${(item.strengths || []).join(", ")}\nMissing: ${(item.missingConcepts || []).join(", ")}`;
    }).join("\n\n");

    const averageScore = history.length > 0
      ? (history.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / history.length).toFixed(1)
      : "7.0";

    const systemPrompt = `You are the Head of Technical Recruiting summarizing the overall performance of a candidate who just finished a 5-question ${interviewType} Mock Interview for the role: "${safeRole}".

Interview Performance History:
${questionsSummary}
Average Question Score: ${averageScore}/10

Deliver a definitive, insightful hiring evaluation.
Choose verdict strictly from: "Strong Hire", "Hire", "Leaning Hire", "Needs Practice".

IMPORTANT: Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "overallScore": ${averageScore},
  "verdict": "Hire",
  "summary": "2-3 sentence executive debrief on candidate readiness for ${safeRole}",
  "keyStrengths": ["Standout technical skill 1", "Standout soft skill or clarity 2", "Architecture grasp 3"],
  "criticalRevisions": ["Specific area 1 to practice", "Specific area 2 to master before real interviews"],
  "nextSteps": "1-2 actionable tips for upcoming interviews"
}`;

    const completion = await groq.chat.completions.create({
      model: MODEL_TO_USE,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate the final scorecard report.` }
      ],
      temperature: 0.5,
      max_tokens: 650,
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "{}";
    const parsed = parseJsonResponse(rawResponse, {
      overallScore: Number(averageScore),
      verdict: Number(averageScore) >= 8.5 ? "Strong Hire" : Number(averageScore) >= 7.0 ? "Hire" : Number(averageScore) >= 5.5 ? "Leaning Hire" : "Needs Practice",
      summary: `Candidate demonstrated solid foundational understanding for ${safeRole}. Focusing on production trade-offs and edge-case handling will further elevate interview performance.`,
      keyStrengths: ["Clear communication", "Good foundational logic", "Direct answers"],
      criticalRevisions: ["Incorporate specific quantitative metrics", "Deep-dive into production edge cases"],
      nextSteps: "Review high-frequency system design patterns and practice timed behavioral answers.",
    });

    return res.json({
      success: true,
      overallScore: parsed.overallScore || Number(averageScore),
      verdict: parsed.verdict || "Hire",
      summary: parsed.summary || `Solid interview performance for ${safeRole}.`,
      keyStrengths: Array.isArray(parsed.keyStrengths) ? parsed.keyStrengths : ["Strong fundamentals", "Clear explanations"],
      criticalRevisions: Array.isArray(parsed.criticalRevisions) ? parsed.criticalRevisions : ["Deepen domain system design knowledge"],
      nextSteps: parsed.nextSteps || "Practice explaining past projects using the STAR method.",
    });
  } catch (error) {
    console.error("Mock Interview Complete Error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate interview scorecard.",
    });
  }
});

module.exports = router;
