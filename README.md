# 🚀 SAARTHIX AI

<div align="center">

### AI-Powered Career & Placement Intelligence Platform

**Prepare smarter. Practice better. Build your career with AI.**

SAARTHIX AI combines AI-powered interviews, resume analysis, job matching, career roadmaps, resume improvement, and an intelligent AI mentor into one modern career-preparation platform.

[![GitHub](https://img.shields.io/badge/GitHub-SAARTHIX--AI-181717?style=for-the-badge&logo=github)](https://github.com/MrPrince82/SAARTHIX-AI)
[![Backend](https://img.shields.io/badge/Backend-Live-success?style=for-the-badge&logo=render)](https://saarthix-ai-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Live-success?style=for-the-badge&logo=render)](https://saarthix-ai-frontend.onrender.com)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-f55036?style=flat-square)

</div>

---

## 🧠 About SAARTHIX AI

**SAARTHIX AI** is an AI-powered career preparation and placement-readiness platform designed for Computer Science and IT students, developers, and technology professionals.

It brings multiple career tools together into one platform:

> 🎙️ Practice Interviews → 📄 Analyze Resume → 🎯 Match Jobs → ✍️ Improve Resume → 🗺️ Follow Roadmaps → 🤖 Learn with AI

The platform adapts guidance according to the user's **target role, skills, and experience level** and supports **30+ technology-focused roles**, including Full Stack Development, Data Analytics, Data Science, Cloud Engineering, DevOps, Cybersecurity, and more.

---

# ✨ Core Features

| 🎙️ AI Interviews | 📄 Resume Analyzer | 🎯 JD Matcher |
|:---:|:---:|:---:|
| Practice AI-powered interviews | Analyze resume & ATS compatibility | Compare resume with job descriptions |

| ✍️ Resume Rewriter | 🗺️ Career Roadmap | 🤖 AI Mentor |
|:---:|:---:|:---:|
| Improve resume bullet points | Build role-specific learning paths | Get technical & career guidance |

---

# 🎙️ 1. AI Mock Interview Simulator

Practice interviews based on:

- 🎯 Target technology role
- 📈 Experience level
- 💻 Technical skills
- 🏗️ System design knowledge
- 🤝 Behavioral preparation

### Interview Modes

- ⚡ **Technical & Architecture**
- 🏗️ **System Design & Scalability**
- 🤝 **Behavioral & STAR**

### Interview Flow

```text
Select Target Role
        ↓
Select Experience Level
        ↓
Choose Interview Type
        ↓
AI Generates Questions
        ↓
Submit Answers
        ↓
AI Evaluation
        ↓
Strengths & Weaknesses
        ↓
Improvement Areas
        ↓
Interview Scorecard
```

### AI Evaluation

- Answer evaluation
- Numerical scoring
- Strengths
- Missing concepts
- Improvement suggestions
- Model-answer guidance
- Interview readiness feedback

---

# 📄 2. Resume Analyzer & ATS Scorer

SAARTHIX AI analyzes resumes for technology-oriented roles.

### Capabilities

- 📥 PDF resume upload
- 🔎 Client-side PDF text extraction
- 📊 ATS-oriented scoring
- 🧩 Skills analysis
- 🎓 Education analysis
- 💼 Experience analysis
- 🚀 Project analysis
- 🏆 Certification analysis
- 🎯 Role-specific evaluation

---

# 🎯 3. Job Description Matcher

Paste a job description and compare it with the resume.

### Analysis Flow

```text
Job Description
      ↓
Requirement Extraction
      ↓
Resume Skill Analysis
      ↓
Matching Keywords
      ↓
Missing / Underrepresented Skills
      ↓
ATS-Oriented Match Analysis
      ↓
Optimization Suggestions
```

### Output

- Matching keywords
- Missing keywords
- Relevant skills
- Underrepresented requirements
- Job-fit analysis
- Resume optimization suggestions

---

# ✍️ 4. Resume Bullet Rewriter

Transform ordinary resume bullets into stronger, impact-focused statements.

### XYZ Formula

> **Accomplished X, as measured by Y, by doing Z**

### Variations

| Variation | Focus |
|---|---|
| ⚡ Performance Impact | Metrics and measurable results |
| 🏗️ Technical Depth | Architecture and implementation |
| 🤝 Ownership & Delivery | Responsibility and execution |

Includes one-click copying for improved resume bullets.

---

# 🗺️ 5. Role-Adaptive Career Roadmap

Build a structured learning path based on the selected technology role.

```text
Target Role
    ↓
Required Skills
    ↓
Learning Phases
    ↓
Technologies & Tools
    ↓
Projects
    ↓
Interview Preparation
    ↓
Career Readiness
```

### Features

- Role-specific learning phases
- Prioritized skills
- Technology and tool guidance
- Official documentation references
- Progress tracking
- User-specific roadmap data

---

# 🤖 6. SAARTHIX AI Mentor

The AI Mentor provides conversational assistance for technical and career preparation.

### Mentor Capabilities

- 💻 Technical guidance
- 🎯 Interview preparation
- 📚 Learning guidance
- 🧩 Concept explanations
- 🚀 Project recommendations
- 📈 Career preparation
- 📝 Resume guidance

The AI layer is integrated through the backend using the configured **Groq API** and model setting.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     User Browser    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + Vite Client │
                    └──────────┬──────────┘
                               │ REST API
                               ▼
                 ┌───────────────────────────┐
                 │ Node.js + Express Backend │
                 └─────────┬─────────┬───────┘
                           │         │
                           ▼         ▼
                 ┌──────────────┐  ┌───────────┐
                 │ MongoDB Atlas│  │  Groq AI  │
                 └──────────────┘  └───────────┘
```

---

# 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Modern CSS
- PDF.js / `pdfjs-dist`

### Backend

- Node.js
- Express.js
- JWT Authentication
- CORS
- REST APIs
- Mongoose

### Database

- MongoDB Atlas
- MongoDB
- Mongoose ODM

### AI

- Groq API
- Configurable Groq model
- AI-generated interview and career guidance

### Deployment

- GitHub
- Render
- Vercel-compatible frontend deployment

---

# 📁 Project Structure

```text
SAARTHIX-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.*
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── render.yaml
```

---

# 🚀 Local Development

## 1. Clone Repository

```bash
git clone https://github.com/MrPrince82/SAARTHIX-AI.git
cd SAARTHIX-AI
```

## 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_configured_groq_model
```

Start backend:

```bash
npm start
```

If configured:

```bash
npm run dev
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local Vite URL, commonly:

```text
http://localhost:5173
```

---

# ☁️ Cloud Deployment

SAARTHIX AI uses a separate frontend and backend deployment architecture.

```text
GitHub Repository
       │
       ├──────────────► Render Web Service
       │                    └── Node.js + Express API
       │
       └──────────────► Frontend Hosting
                            └── React + Vite
```

## 🚀 Backend — Render

**Live Backend:**

https://saarthix-ai-backend.onrender.com

| Setting | Value |
|---|---|
| Service Type | Web Service |
| Repository | `MrPrince82/SAARTHIX-AI` |
| Branch | `main` |
| Root Directory | `server` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Plan | Free |

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_configured_groq_model
CLIENT_URL=your_frontend_url
```

> Never commit `.env` files or API keys to GitHub.

---

## 🌐 Frontend — Render

**Live Frontend:**

https://saarthix-ai-frontend.onrender.com

| Setting | Value |
|---|---|
| Service Type | Static Site |
| Repository | `MrPrince82/SAARTHIX-AI` |
| Branch | `main` |
| Root Directory | `client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

### Frontend Environment Variable

```env
VITE_API_URL=https://saarthix-ai-backend.onrender.com
```

> Do not add a trailing `/` to `VITE_API_URL`.

---

# ▲ Vercel Deployment

The frontend can also be deployed using Vercel.

| Setting | Value |
|---|---|
| Framework | Vite |
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Environment variable:

```env
VITE_API_URL=https://saarthix-ai-backend.onrender.com
```

If the frontend is moved to Vercel, update the backend `CLIENT_URL` / CORS configuration with the deployed frontend URL.

---

# 🗄️ MongoDB Atlas

The backend requires MongoDB Atlas for persistent application data.

### Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Copy the MongoDB connection string.
4. Add it as `MONGO_URI` in Render.
5. Configure MongoDB Atlas Network Access for the environment where the backend runs.

---

# 🔐 Security

SAARTHIX AI uses basic application security practices:

- 🔑 API keys stored as environment variables
- 🔒 JWT-based authentication
- 🔐 Password hashing with `bcryptjs`
- 🛡️ CORS configuration
- 🚫 `.env` excluded from Git
- 🚫 `node_modules` excluded from Git
- 🔒 Database credentials kept outside source code

Never commit:

```text
.env
.env.local
API keys
MongoDB passwords
JWT secrets
```

---

# 🔄 Development Workflow

```text
Make Changes
     ↓
Test Locally
     ↓
git add .
     ↓
git commit
     ↓
git push origin main
     ↓
GitHub
     ↓
Render Auto Deploy
     ↓
Live Application
```

---

# 🧪 Build Verification

### Frontend

```bash
cd client
npm install
npm run build
```

### Backend

```bash
cd server
npm install
npm start
```

---

# 🌍 Live Links

| Service | Link |
|---|---|
| 🌐 Frontend | https://saarthix-ai-frontend.onrender.com |
| ⚙️ Backend | https://saarthix-ai-backend.onrender.com |
| 💻 GitHub | https://github.com/MrPrince82/SAARTHIX-AI |

---

# 📊 Platform Overview

| Capability | Status |
|---|:---:|
| AI Interviews | ✅ |
| Resume Analysis | ✅ |
| ATS-Oriented Scoring | ✅ |
| JD Matching | ✅ |
| Resume Rewriting | ✅ |
| Career Roadmaps | ✅ |
| AI Mentor | ✅ |
| Role-Based Guidance | ✅ |
| JWT Authentication | ✅ |
| MongoDB Atlas | ✅ |
| Render Deployment | ✅ |
| Vercel-Compatible Frontend | ✅ |

---

# 🔮 Future Enhancements

Potential future improvements:

- 🎤 Voice-based mock interviews
- 📹 Video interview analysis
- 📈 Advanced progress analytics
- 🧠 More personalized AI recommendations
- 📊 Placement-readiness dashboards
- 🧩 Additional technology roles
- 📱 Mobile application
- 🔔 Personalized learning reminders

---

# 🤝 Contributing

Contributions and suggestions are welcome.

```bash
git clone https://github.com/MrPrince82/SAARTHIX-AI.git
cd SAARTHIX-AI

git checkout -b feature/your-feature

# Make your changes

git add .
git commit -m "Add: your feature"
git push origin feature/your-feature
```

Then create a Pull Request on GitHub.

---

# 🐛 Issues & Feedback

For bugs or feature suggestions:

1. Open the GitHub repository.
2. Go to **Issues**.
3. Create a new issue.
4. Clearly describe the problem or suggestion.

**Repository:**  
https://github.com/MrPrince82/SAARTHIX-AI

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---

# 👨‍💻 Author

<div align="center">

### Prince Kumar

**Creator & Developer — SAARTHIX AI**

[![GitHub](https://img.shields.io/badge/GitHub-MrPrince82-181717?style=for-the-badge&logo=github)](https://github.com/MrPrince82)

<br>

**SAARTHIX AI**

*AI-powered career preparation and placement intelligence.*

</div>

---

<div align="center">

## 🚀 SAARTHIX AI

**Prepare smarter. Practice better. Build your career with AI.**

⭐ If you find this project useful, consider giving the repository a star.

</div>
