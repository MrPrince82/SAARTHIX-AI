# 🚀 SAARTHIX AI

### AI-Powered Career & Placement Intelligence Platform

SAARTHIX AI is a multi-role career preparation and placement-readiness platform designed for Computer Science, IT students, and technology professionals.

It combines **AI-powered interview practice, resume analysis, job-description matching, career roadmaps, and an AI mentor** in one platform. The system adapts its guidance across **30+ specialized technology roles** and different experience levels.

---

## ✨ Highlights

- 🎙️ AI Mock Interview Simulator
- 🎯 Job Description (JD) Matcher
- 📄 Resume Analyzer & ATS Scorer
- ✍️ Resume Bullet Rewriter using the Google XYZ formula
- 🗺️ Role-Adaptive Career Roadmaps
- 🤖 24/7 SAARTHIX AI Mentor
- 🔐 JWT-based authentication
- 👤 Multi-role user experience
- ☁️ Render-ready full-stack deployment

---

## 🌟 Core Features

### 1. 🎙️ AI Mock Interview Simulator

Practice interviews based on your target role and experience level.

**Includes:**
- 30+ technology roles
- Entry, Mid, and Senior experience levels
- Technical & Architecture interviews
- System Design & Scalability interviews
- Behavioral interviews using STAR-style scenarios
- AI evaluation with a 1–10 score
- Strengths and missing-concept analysis
- Senior-level model answers
- Final interview-readiness scorecard

---

### 2. 🎯 Job Description Matcher

Compare your resume with a real job description.

**Features:**
- Paste job descriptions from LinkedIn, Indeed, or other career portals
- ATS fit percentage
- Matching keyword detection
- Missing and underrepresented requirement detection
- Actionable resume optimization suggestions

---

### 3. ✍️ Resume Bullet Rewriter

Transform ordinary resume bullets into stronger, impact-focused statements.

The feature follows the Google XYZ approach:

> Accomplished **X**, as measured by **Y**, by doing **Z**.

It provides variations focused on:

- ⚡ Metrics & Performance
- 🏗️ Technical Architecture
- 🤝 Ownership & Delivery

---

### 4. 📄 Resume Analyzer & ATS Scorer

Analyze a resume against technology-role benchmarks.

**Includes:**
- Client-side PDF text extraction using `pdfjs-dist`
- ATS-oriented scoring
- Role-specific skill comparison
- Section-level analysis for:
  - Education
  - Experience
  - Skills
  - Projects
  - Certifications

---

### 5. 🗺️ Role-Adaptive Career Roadmap

Build a structured learning path for your target technology role.

**Includes:**
- Prioritized learning phases
- Recommended technologies and skills
- Links to official documentation
- Progress tracking linked to the user profile

---

### 6. 🤖 SAARTHIX AI Mentor

An AI mentor designed to provide career and technical guidance.

**Powered by:**
- Groq API
- Qwen-based language model
- Context-aware career and interview guidance

The mentor can assist with technical preparation, project ideas, interview guidance, and career-focused learning.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       SAARTHIX AI       │
                    │  Career & Placement AI  │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
        ┌───────▼────────┐                ┌──────▼─────────┐
        │    Frontend    │                │     Backend    │
        │ React + Vite   │◄──────────────►│ Node + Express │
        └────────────────┘                └───────┬────────┘
                                                  │
                              ┌───────────────────┼───────────────────┐
                              │                   │                   │
                       ┌──────▼──────┐     ┌──────▼──────┐    ┌──────▼──────┐
                       │  MongoDB    │     │   Groq AI   │    │ JWT / Auth  │
                       │    Atlas    │     │    Engine    │    │             │
                       └─────────────┘     └─────────────┘    └─────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- React 19
- Vite
- JavaScript
- PDF.js (`pdfjs-dist`)
- Modern CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- CORS
- bcryptjs

### Database
- MongoDB Atlas
- Mongoose

### AI
- Groq SDK
- Qwen-based LLM

### Deployment
- Render
- GitHub

---

## 📁 Project Structure

```text
SAARTHIX-AI/
│
├── client/                 # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.*
│
├── server/                 # Node.js + Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── LICENSE
├── README.md
└── render.yaml
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB Atlas account
- Groq API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/MrPrince82/SAARTHIX-AI.git
cd SAARTHIX-AI
```

---

## 2. Backend Setup

Open a terminal:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=qwen/qwen3.8-27b
```

> **Never commit your `.env` file or expose API keys in GitHub.**

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# ☁️ Deploying on Render

The project is structured as a monorepo with separate frontend and backend services.

## Backend — Render Web Service

Create a **Web Service** using the GitHub repository.

Use:

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Branch | `main` |

Add these environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=qwen/qwen3.8-27b
CLIENT_URL=your_frontend_render_url
```

The currently deployed backend is:

**https://saarthix-ai-backend.onrender.com**

---

## Frontend — Render Static Site

Create a **Static Site** using the same GitHub repository.

Use:

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Branch | `main` |

Add:

```env
VITE_API_URL=https://saarthix-ai-backend.onrender.com
```

For a React/Vite single-page application, configure the Render rewrite:

```text
Source:      /*
Destination: /index.html
Type:        Rewrite
```

---

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used for JWT authentication |
| `GROQ_API_KEY` | Groq API authentication |
| `GROQ_MODEL` | AI model used by the application |
| `CLIENT_URL` | Allowed frontend origin for backend CORS |
| `VITE_API_URL` | Backend API URL used by the Vite frontend |

### Security Notes

- Never commit API keys.
- Keep `.env` files in `.gitignore`.
- Use a strong, unique `JWT_SECRET` in production.
- Restrict MongoDB Atlas network access appropriately for your deployment.
- Rotate credentials immediately if they are accidentally exposed.

---

# 🔄 Application Flow

```text
User
  │
  ▼
React + Vite Frontend
  │
  │ HTTP API Requests
  ▼
Node.js + Express Backend
  │
  ├──────────────► JWT Authentication
  │
  ├──────────────► MongoDB Atlas
  │
  └──────────────► Groq AI
                         │
                         ▼
                    AI Response
                         │
                         ▼
                    Frontend UI
```

---

# 🎯 Target Roles

SAARTHIX AI is designed to adapt preparation across a broad range of technology roles, including areas such as:

- Full Stack Development
- Software Development
- Cloud Engineering
- Data Science
- Data Analytics
- Cybersecurity
- DevOps
- Backend Development
- Frontend Development

The platform supports **30+ specialized technology roles** through its role-adaptive features.

---

# 📊 Current Deployment

| Component | Platform | Status |
|---|---|---|
| Frontend | Render Static Site | ✅ Live |
| Backend | Render Web Service | ✅ Live |
| Database | MongoDB Atlas | ☁️ Cloud |
| AI Engine | Groq | 🤖 API |
| Source Code | GitHub | ✅ Public |

**Repository:**  
https://github.com/MrPrince82/SAARTHIX-AI

**Backend:**  
https://saarthix-ai-backend.onrender.com

---

# 🧪 Build Verification

The production frontend is built with:

```bash
npm run build
```

The application currently builds successfully with Vite.

A Vite warning about large JavaScript chunks may appear during production builds. This does not prevent the application from building successfully.

---

# 🛡️ Security

SAARTHIX AI includes:

- JWT-based authentication
- Password hashing with `bcryptjs`
- Protected authenticated endpoints
- CORS configuration
- Environment-based secret management
- `.gitignore` protection for `.env` files

**Important:** Do not publish real values for `MONGO_URI`, `JWT_SECRET`, or `GROQ_API_KEY` in this README or in the repository.

---

# 🤝 Contributing

Contributions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Prince Kumar**

GitHub: [@MrPrince82](https://github.com/MrPrince82)

---

<p align="center">
  <strong>SAARTHIX AI</strong><br>
  AI-powered career preparation, interview practice & placement intelligence.
</p>
