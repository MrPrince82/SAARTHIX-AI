# SAARTHIX AI — Next-Gen AI Career & Placement Intelligence Platform

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/AI%20Inference-Groq%20Qwen%203.8--27B-f55036)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**SAARTHIX AI** is an intelligent, multi-role career preparation and placement-readiness platform built for Computer Science students, IT students, developers, and technology professionals.

The platform combines AI-powered interview preparation, resume analysis, job matching, career roadmaps, and an intelligent AI mentor into one unified career development platform.

SAARTHIX AI dynamically adapts its intelligence engine across **30+ specialized technology roles**, including Full Stack Development, Cloud Engineering, Data Science, Data Analytics, Cybersecurity, DevOps, and more.

---

## 🌟 Flagship Features

### 1. 🎙️ AI Mock Interview Simulator

Practice realistic AI-powered interviews tailored to your target role and experience level.

* **Dynamic Role Adaptation**: Choose from 30+ technology roles and multiple experience levels including Entry, Mid, and Senior.
* **Technical & Architecture**: Explore programming concepts, framework internals, databases, memory management, and software architecture.
* **System Design & Scalability**: Practice distributed systems, caching, microservices, database indexing, and scalability concepts.
* **Behavioral & STAR**: Prepare for real-world engineering scenarios involving teamwork, deadlines, ownership, and technical conflicts.
* **AI Evaluation**: Receive a 1–10 performance score with strengths, weaknesses, missing concepts, and improvement suggestions.
* **Model Answers**: Compare your responses with detailed senior-level example answers.
* **Interview Scorecard**: Review your overall performance, key strengths, improvement areas, and interview-readiness insights.

---

### 2. 🎯 Real-Time Job Description (JD) Matcher

Understand how well your resume matches a specific job description.

* Paste a job description from LinkedIn, Indeed, company career pages, or other job portals.
* **ATS Fit Percentage**: Analyze resume-job compatibility using semantic and keyword matching.
* **Matching Keywords**: Identify skills and keywords already present in your resume.
* **Missing Requirements**: Discover important skills or requirements that are missing or underrepresented.
* **Optimization Suggestions**: Get targeted recommendations for improving your resume for the selected job.

---

### 3. ✍️ Google XYZ-Formula Resume Bullet Rewriter

Transform ordinary resume bullet points into stronger, measurable, and impact-focused statements.

The tool follows the Google XYZ approach:

> *"Accomplished [X] as measured by [Y], by doing [Z]."*

It generates multiple improvement styles:

* ⚡ **Metric & Performance Impact**: Focuses on measurable results and performance improvements.
* 🏗️ **Technical Architecture & Depth**: Highlights technical implementation, architecture, scalability, and engineering depth.
* 🤝 **Ownership & Delivery**: Emphasizes responsibility, execution, collaboration, and project impact.
* **1-Click Copy**: Quickly copy improved bullet points directly to your resume.

---

### 4. 📄 Multi-Role Resume Analyzer & ATS Scorer

Analyze your resume against requirements for different technology roles.

* Client-side PDF text extraction powered by `pdfjs-dist`.
* Domain-specific ATS analysis across 30+ technology roles.
* Skill and keyword comparison.
* Resume section analysis.
* Identification of missing or underrepresented skills.

### Resume Sections

* Education
* Experience
* Skills
* Projects
* Certifications

---

### 5. 🗺️ Role-Adaptive Career Roadmap

Build a structured learning path based on your selected career role.

* Personalized learning pathways divided into prioritized phases.
* Recommended technologies, frameworks, databases, and tools.
* Direct links to official documentation and learning resources.
* Interactive progress tracking.
* Role-specific technical skill development.

---

### 6. 🤖 24/7 SAARTHIX AI Mentor

Get AI-powered technical and career guidance whenever you need it.

* Powered by Groq's high-speed AI inference.
* Uses a Qwen-based language model for contextual responses.
* Provides technical explanations and learning guidance.
* Helps with interview preparation.
* Suggests portfolio and project ideas.
* Supports career and technology-related questions.

---

## 🛠️ Architecture & Tech Stack

```mermaid
flowchart TD
    User([User Browser]) -->|Vite / React SPA| Client[Frontend: React + Vite]
    Client -->|REST API / JWT| Server[Backend: Node.js + Express]
    Server -->|Mongoose ODM| DB[(MongoDB Atlas)]
    Server -->|High-Speed AI Inference| Groq[Groq AI Cloud: Qwen]
