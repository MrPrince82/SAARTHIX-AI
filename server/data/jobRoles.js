// =====================================================
// SAARTHIX AI - CENTRALIZED JOB ROLES REGISTRY (SERVER)
// Supports 30+ Computer Science & IT Job Profiles
// Open architecture: easily add new roles here
// =====================================================

const ROLE_CATEGORIES = [
  "Software Development",
  "Data & AI",
  "Cloud & DevOps",
  "Cybersecurity",
  "Testing & QA",
  "Database & Data Engineering",
  "Infrastructure & Networking",
  "Mobile Development",
  "Design & Product",
];

const JOB_ROLES = [
  // ===================================================
  // 1. SOFTWARE DEVELOPMENT
  // ===================================================
  {
    id: "full-stack-developer",
    name: "Full Stack Developer",
    category: "Software Development",
    description: "Builds complete web applications covering frontend UI, backend APIs, and database persistence.",
    skills: [
      "html", "css", "javascript", "react", "node.js", "express", "mongodb", "sql", "git", "rest api", "dsa"
    ],
    tools: ["VS Code", "Postman", "Git", "GitHub", "MongoDB Compass", "Docker"],
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "SQL"],
    recommendedProjects: [
      {
        title: "Full Stack Career / Job Portal",
        desc: "End-to-end web application with role-based auth, resume upload, job filtering, and application status tracking.",
        tech: ["React", "Node.js", "Express", "MongoDB"]
      },
      {
        title: "E-Commerce Platform with Payment Gateway",
        desc: "Product catalog, shopping cart, order management, and secure payment checkout integration.",
        tech: ["React", "Node.js", "Stripe API", "MongoDB"]
      },
      {
        title: "Real-Time Collaboration Tool",
        desc: "Live document editing or team chat with WebSocket real-time updates.",
        tech: ["React", "Socket.io", "Express", "PostgreSQL"]
      }
    ],
    interviewTopics: [
      "JavaScript Core: Closures, Event Loop, Promises, Prototypal Inheritance",
      "React: State Management, Hooks (useState, useEffect, useMemo), Component Lifecycle",
      "Backend: RESTful API Design, Middleware, JWT Authentication, Rate Limiting",
      "Database: MongoDB Indexing vs SQL Normalization, ACID Properties",
      "Data Structures & Algorithms: Arrays, Linked Lists, Trees, Dynamic Programming"
    ],
    roadmap: [
      { step: 1, title: "HTML5 & Modern CSS", duration: "1-2 Weeks", topics: ["Semantic HTML", "Flexbox", "CSS Grid", "Responsive Design", "Tailwind CSS"] },
      { step: 2, title: "JavaScript Mastery (ES6+)", duration: "2-3 Weeks", topics: ["Variables & Scope", "Async/Await & Promises", "DOM Manipulation", "Fetch & APIs", "ES6 Modules"] },
      { step: 3, title: "React Frontend Development", duration: "3-4 Weeks", topics: ["JSX & Components", "State & Props", "Hooks Lifecycle", "React Router", "API Integration", "Context API"] },
      { step: 4, title: "Node.js & Express APIs", duration: "2-3 Weeks", topics: ["Node Architecture", "Express Routing", "Middleware", "JWT Auth", "Error Handling", "REST Best Practices"] },
      { step: 5, title: "Databases (MongoDB & SQL)", duration: "2 Weeks", topics: ["MongoDB CRUD & Mongoose", "SQL Basics (PostgreSQL/MySQL)", "Schema Design", "Aggregation Pipelines"] },
      { step: 6, title: "Git, Version Control & CI/CD", duration: "1-2 Weeks", topics: ["Branching & Pull Requests", "GitHub Actions", "Docker Basics", "Deployment to Render/Vercel"] },
      { step: 7, title: "Full Stack Capstone Project", duration: "3-4 Weeks", topics: ["Architecture Planning", "Full Integration", "Authentication & Security", "Live Cloud Deployment"] },
      { step: 8, title: "DSA & Interview Preparation", duration: "3-4 Weeks", topics: ["LeetCode Mediums (Arrays, Strings, Trees)", "System Design Basics", "Mock Technical Interviews", "HR & Behavioral Prep"] }
    ],
    learningResources: {
      "Frontend": [{ name: "MDN Web Docs", url: "https://developer.mozilla.org" }, { name: "React Documentation", url: "https://react.dev" }],
      "Backend": [{ name: "Node.js Docs", url: "https://nodejs.org" }, { name: "Express Guide", url: "https://expressjs.com" }],
      "Database": [{ name: "MongoDB University", url: "https://learn.mongodb.com" }],
      "Practice": [{ name: "LeetCode", url: "https://leetcode.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Full Stack Roadmap", query: "Give me a step-by-step roadmap to become a job-ready Full Stack Developer" },
      { label: "📈 Boost ATS Score", query: "What technical keywords should I add to my resume for Full Stack roles?" },
      { label: "💼 Technical Interview Prep", query: "What are the most frequently asked Full Stack technical interview questions?" },
      { label: "🚀 Project Ideas", query: "What are 3 standout Full Stack projects that hiring managers love?" }
    ]
  },

  {
    id: "frontend-developer",
    name: "Frontend Developer",
    category: "Software Development",
    description: "Specializes in building intuitive, responsive, and high-performance client-side web interfaces.",
    skills: [
      "html", "css", "javascript", "react", "typescript", "tailwind css", "next.js", "redux", "git", "responsive design", "web performance"
    ],
    tools: ["VS Code", "Chrome DevTools", "Figma", "Git", "Webpack/Vite", "Postman"],
    technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Next.js"],
    recommendedProjects: [
      {
        title: "Interactive SaaS Dashboard",
        desc: "Rich analytics dashboard with dark mode, charts, drag-and-drop widgets, and customizable filters.",
        tech: ["React", "TypeScript", "Tailwind CSS", "Recharts"]
      },
      {
        title: "E-Commerce Headless Storefront",
        desc: "Blazing fast shopping storefront using Next.js with server-side rendering, faceted search, and cart persistence.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"]
      },
      {
        title: "Accessible Component Design System",
        desc: "Production-ready UI component library adhering strictly to WAI-ARIA guidelines with Storybook documentation.",
        tech: ["React", "TypeScript", "Storybook", "Tailwind CSS"]
      }
    ],
    interviewTopics: [
      "Browser Rendering Pipeline: Critical Rendering Path, Reflow, Repaint",
      "JavaScript & ES6+: Closures, Event Bubbling, Currying, Debounce/Throttle",
      "React Architecture: Virtual DOM, Fiber Reconciliation, Custom Hooks, Performance Profiling",
      "CSS Mastery: Specificity, Stacking Context, Flexbox vs Grid, CSS Custom Properties",
      "Web Performance: Core Web Vitals (LCP, INP, CLS), Code Splitting, Lazy Loading"
    ],
    roadmap: [
      { step: 1, title: "Modern HTML5 & Semantic Web", duration: "1 Week", topics: ["Accessibility (a11y)", "SEO Basics", "Forms & Validation"] },
      { step: 2, title: "Advanced CSS & Tailwind CSS", duration: "2 Weeks", topics: ["Flexbox & Grid", "Transitions & Keyframe Animations", "Tailwind Utility Classes", "Responsive Mobile-First Design"] },
      { step: 3, title: "JavaScript Deep Dive", duration: "3 Weeks", topics: ["Scope & Closures", "DOM Events", "Fetch & Async/Await", "Modular Architecture"] },
      { step: 4, title: "TypeScript for Frontend", duration: "2 Weeks", topics: ["Types & Interfaces", "Generics", "React Typing (Props, State, Events)"] },
      { step: 5, title: "React Ecosystem Mastery", duration: "3-4 Weeks", topics: ["Custom Hooks", "Context & Zustand", "TanStack Query", "React Hook Form"] },
      { step: 6, title: "Next.js & SSR/SSG", duration: "2 Weeks", topics: ["App Router", "Server Components", "SEO & Metadata", "Optimized Image Loading"] },
      { step: 7, title: "Frontend Portfolio & Capstone", duration: "2-3 Weeks", topics: ["High Polish UI", "Lighthouse 95+ Audit", "Vercel Deployment"] },
      { step: 8, title: "Frontend Interview Prep", duration: "2 Weeks", topics: ["Machine Coding Rounds", "JS Output Questions", "System Design (Frontend)"] }
    ],
    learningResources: {
      "Frontend": [{ name: "MDN Web Docs", url: "https://developer.mozilla.org" }, { name: "Web.dev", url: "https://web.dev" }],
      "React": [{ name: "React Docs", url: "https://react.dev" }, { name: "Next.js Docs", url: "https://nextjs.org" }],
      "Practice": [{ name: "GreatFrontend", url: "https://www.greatfrontend.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Frontend Roadmap", query: "What is the fastest roadmap to master modern Frontend development with React and TypeScript?" },
      { label: "📈 Boost ATS Score", query: "What top frontend keywords should I highlight on my resume to pass ATS filters?" },
      { label: "💼 Machine Coding Rounds", query: "How do I prepare for React machine coding rounds for frontend interviews?" },
      { label: "🚀 Standout Projects", query: "What portfolio projects prove my skills as an exceptional frontend engineer?" }
    ]
  },

  {
    id: "backend-developer",
    name: "Backend Developer",
    category: "Software Development",
    description: "Architects scalable server-side systems, REST/GraphQL APIs, background workers, and database architectures.",
    skills: [
      "node.js", "express", "python", "sql", "postgresql", "mongodb", "redis", "rest api", "git", "docker", "system design", "dsa"
    ],
    tools: ["Postman", "Docker", "Git", "VS Code", "DBeaver", "Linux Terminal"],
    technologies: ["Node.js", "Express.js", "Python / FastAPI", "PostgreSQL", "MongoDB", "Redis"],
    recommendedProjects: [
      {
        title: "High-Throughput URL Shortener & Analytics",
        desc: "Scalable link shortener handling high reads/writes with Redis caching, click analytics, and rate limiting.",
        tech: ["Node.js", "Express", "Redis", "PostgreSQL"]
      },
      {
        title: "Distributed Task Queue System",
        desc: "Asynchronous job worker system processing background emails, PDF generation, and retry logic.",
        tech: ["Node.js", "BullMQ / Redis", "MongoDB"]
      },
      {
        title: "Financial Ledger & Wallet Microservice",
        desc: "ACID-compliant double-entry accounting ledger with idempotent transaction endpoints.",
        tech: ["PostgreSQL", "Node.js", "Docker"]
      }
    ],
    interviewTopics: [
      "REST vs GraphQL vs gRPC: Architecture Trade-offs and Best Practices",
      "Database Internals: Indexing (B-Trees), Transactions, ACID, Normalization vs Denormalization",
      "Concurrency & Caching: Cache-aside Pattern, Cache Invalidation, Redis Data Structures",
      "Authentication & Security: OAuth2, JWT Security, CSRF/CORS, SQL Injection Prevention",
      "System Design: Load Balancing, Horizontal Scaling, Rate Limiting, Message Queues (Kafka/RabbitMQ)"
    ],
    roadmap: [
      { step: 1, title: "Language Foundations (Node/Python/Go)", duration: "2 Weeks", topics: ["Asynchronous I/O", "Event Loop / Concurrency", "File System & Streams"] },
      { step: 2, title: "RESTful API Architecture", duration: "2 Weeks", topics: ["HTTP Verbs & Status Codes", "Input Validation (Zod/Joi)", "Middleware & Error Handling", "JWT Authentication"] },
      { step: 3, title: "Relational Databases & SQL Deep Dive", duration: "3 Weeks", topics: ["PostgreSQL Schema Design", "Complex Joins & Aggregations", "Indexing & Query Optimization", "Connection Pooling"] },
      { step: 4, title: "NoSQL & In-Memory Caching", duration: "2 Weeks", topics: ["MongoDB Document Modeling", "Redis Caching Strategies", "Session Storage & Pub/Sub"] },
      { step: 5, title: "Containers & Cloud Basics", duration: "2 Weeks", topics: ["Docker Containerization", "Docker Compose Multi-service", "Basic AWS / Cloud Deployment"] },
      { step: 6, title: "Scalability & Message Brokers", duration: "2 Weeks", topics: ["RabbitMQ or BullMQ", "Background Processing", "Idempotency & Rate Limiting"] },
      { step: 7, title: "Backend Capstone Service", duration: "3 Weeks", topics: ["Production-Ready API", "Swagger / OpenAPI Docs", "Unit & Integration Tests (Jest/Pytest)"] },
      { step: 8, title: "System Design & Technical Interviews", duration: "3 Weeks", topics: ["API Design Rounds", "Database Schema Design", "Low-Level System Design"] }
    ],
    learningResources: {
      "Backend": [{ name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" }],
      "Databases": [{ name: "Use The Index, Luke!", url: "https://use-the-index-luke.com" }],
      "System Design": [{ name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }]
    },
    quickPrompts: [
      { label: "🗺️ Backend Roadmap", query: "What is the structured path to becoming an elite Backend Developer?" },
      { label: "📈 Boost ATS Score", query: "What core backend skills and keywords give the highest ATS score?" },
      { label: "💼 System Design Questions", query: "What low-level and high-level system design topics are asked in backend interviews?" },
      { label: "🚀 High-Value Projects", query: "What backend architecture projects impress engineering managers most?" }
    ]
  },

  {
    id: "java-developer",
    name: "Java Developer",
    category: "Software Development",
    description: "Builds enterprise-grade backend applications, microservices, and distributed systems using Java and Spring Boot.",
    skills: [
      "java", "spring boot", "hibernate", "jpa", "sql", "mysql", "microservices", "rest api", "git", "maven", "dsa", "oop"
    ],
    tools: ["IntelliJ IDEA", "Postman", "Maven/Gradle", "Git", "MySQL Workbench", "Docker"],
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Docker"],
    recommendedProjects: [
      {
        title: "Enterprise Banking / Payment Microservice",
        desc: "Secure transaction processing microservice with account management, transfer authorization, and audit logs.",
        tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "JWT"]
      },
      {
        title: "E-Commerce Inventory & Order Management",
        desc: "Multi-module Spring Boot backend managing product catalogs, cart state, order placement, and stock alerts.",
        tech: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Kafka"]
      },
      {
        title: "Hospital Management System REST API",
        desc: "Role-based system for doctors, patients, appointment bookings, and medical history records.",
        tech: ["Java", "Spring Boot", "Hibernate", "MySQL"]
      }
    ],
    interviewTopics: [
      "Core Java: OOP Principles, Collections Framework (HashMap vs ConcurrentHashMap), Multithreading & Concurrency",
      "JVM Internals: Memory Model (Heap, Stack, Metaspace), Garbage Collection Algorithms, ClassLoaders",
      "Spring Framework: Dependency Injection, Inversion of Control (IoC), Spring Bean Scopes & Lifecycle",
      "Spring Boot & JPA: Spring Data JPA, Hibernate N+1 Problem, Lazy vs Eager Loading, Transactional Propagation",
      "Data Structures & Algorithms: Trees, Graphs, Sorting Algorithms, Dynamic Programming in Java"
    ],
    roadmap: [
      { step: 1, title: "Core Java & OOP Mastery", duration: "3 Weeks", topics: ["Inheritance, Polymorphism, Abstraction, Encapsulation", "Java Collections Framework", "Generics & Exception Handling", "Java 8+ Streams & Lambdas"] },
      { step: 2, title: "Java Concurrency & JVM", duration: "2 Weeks", topics: ["Threads & Runnables", "Synchronized & Locks", "ExecutorService", "JVM Memory Model & GC Basics"] },
      { step: 3, title: "Relational Databases & JDBC", duration: "2 Weeks", topics: ["SQL Queries & Joins", "JDBC & Connection Pools", "Database Normalization"] },
      { step: 4, title: "Spring Core & Spring Boot", duration: "3 Weeks", topics: ["IoC Container & Annotations", "Spring Boot Auto-configuration", "Building REST Controllers", "Exception Handling (@ControllerAdvice)"] },
      { step: 5, title: "Spring Data JPA & Hibernate", duration: "2 Weeks", topics: ["Entity Mapping (@OneToMany, @ManyToMany)", "Repositories & Custom Queries", "Pagination & Sorting", "Caching"] },
      { step: 6, title: "Security & Microservices", duration: "3 Weeks", topics: ["Spring Security & JWT", "Service-to-Service Communication (Feign)", "Eureka / Service Discovery", "API Gateway"] },
      { step: 7, title: "Enterprise Capstone Project", duration: "3 Weeks", topics: ["Multi-module Spring Boot Project", "Unit & Integration Tests with JUnit 5 & Mockito", "Docker Deployment"] },
      { step: 8, title: "DSA & Campus / Company Placements", duration: "3-4 Weeks", topics: ["Solve 150+ LeetCode DSA Questions in Java", "Design Patterns (Singleton, Factory, Builder, Strategy)", "Technical & HR Mock Interviews"] }
    ],
    learningResources: {
      "Core Java": [{ name: "Java Documentation", url: "https://docs.oracle.com/en/java/" }, { name: "Baeldung", url: "https://www.baeldung.com" }],
      "Spring Boot": [{ name: "Spring Guides", url: "https://spring.io/guides" }, { name: "Spring Boot Docs", url: "https://spring.io/projects/spring-boot" }],
      "DSA in Java": [{ name: "LeetCode", url: "https://leetcode.com" }, { name: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" }]
    },
    quickPrompts: [
      { label: "🗺️ Java Career Roadmap", query: "Give me a complete roadmap to crack product and service companies as a Java Spring Boot developer" },
      { label: "📈 Boost Java ATS Score", query: "What technical keywords and certifications should I put on my resume for Java Developer roles?" },
      { label: "💼 Spring Boot Interview QA", query: "What are the top 20 Spring Boot and Hibernate interview questions asked by hiring teams?" },
      { label: "🚀 Java Portfolio Projects", query: "What are 3 enterprise-grade Java Spring Boot projects that stand out on a fresher resume?" }
    ]
  },

  {
    id: "python-developer",
    name: "Python Developer",
    category: "Software Development",
    description: "Develops backend systems, automated workflows, and data pipelines using Python, Django, and FastAPI.",
    skills: [
      "python", "django", "fastapi", "flask", "sql", "postgresql", "rest api", "git", "docker", "dsa", "oop"
    ],
    tools: ["PyCharm / VS Code", "Postman", "Git", "Docker", "Poetry / Pipenv", "SQLite / PostgreSQL"],
    technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "Celery", "Redis"],
    recommendedProjects: [
      {
        title: "Async High-Speed API with FastAPI & Celery",
        desc: "Modern asynchronous API with background report generation, OpenAPI documentation, and token auth.",
        tech: ["Python", "FastAPI", "PostgreSQL", "Celery", "Redis"]
      },
      {
        title: "Full-Featured Django Web Portal",
        desc: "Production-ready web platform with Django ORM, authentication, user management, and admin dashboard.",
        tech: ["Django", "Python", "SQLite / PostgreSQL", "Bootstrap"]
      },
      {
        title: "Automated Web Scraping & Data Extraction Pipeline",
        desc: "Robust distributed scraper extracting price analytics from e-commerce sites with retry logic and proxy rotation.",
        tech: ["Python", "Playwright / BeautifulSoup", "Pandas", "PostgreSQL"]
      }
    ],
    interviewTopics: [
      "Python Internals: GIL (Global Interpreter Lock), Memory Management, Duck Typing, Generators & Iterators",
      "Decorators & Metaclasses: How decorators work under the hood, writing custom decorators",
      "FastAPI vs Django: When to choose ASGI vs WSGI, Asyncio event loops, Pydantic data validation",
      "Database & ORM: Django ORM vs SQLAlchemy, Migrations, Query Optimization (select_related, prefetch_related)",
      "Python DSA: Dict hashing, List slicing performance, Heaps, Trees in Python"
    ],
    roadmap: [
      { step: 1, title: "Python Advanced Language Concepts", duration: "2-3 Weeks", topics: ["OOP, Magic Methods, Generators, Decorators", "Type Hinting & Dataclasses", "Virtual Environments & Package Management"] },
      { step: 2, title: "FastAPI & Async Programming", duration: "2-3 Weeks", topics: ["Asynchronous Endpoints (async/await)", "Pydantic Schemas", "Dependency Injection in FastAPI", "JWT Authentication"] },
      { step: 3, title: "Django Framework & ORM", duration: "3 Weeks", topics: ["Django Architecture (MTV)", "Models, Migrations & Queries", "Django Rest Framework (DRF)", "Admin Customization"] },
      { step: 4, title: "Databases & Background Tasks", duration: "2 Weeks", topics: ["PostgreSQL Integration", "Celery Task Queue with Redis", "Caching Strategies"] },
      { step: 5, title: "Dockerization & Cloud Deployment", duration: "2 Weeks", topics: ["Dockerfile & Multi-stage builds", "Docker Compose", "Deploying to Render or AWS EC2"] },
      { step: 6, title: "Capstone Python Project", duration: "3 Weeks", topics: ["End-to-End API or Django App", "Pytest Suite with High Coverage", "GitHub Actions CI"] },
      { step: 7, title: "Technical Interviews & Placement Prep", duration: "3 Weeks", topics: ["Python Coding Challenges", "Architecture Discussions", "Mock Technical Interviews"] }
    ],
    learningResources: {
      "Python Docs": [{ name: "Official Python Tutorial", url: "https://docs.python.org/3/tutorial/" }],
      "FastAPI": [{ name: "FastAPI Documentation", url: "https://fastapi.tiangolo.com" }],
      "Django": [{ name: "Django Project Docs", url: "https://docs.djangoproject.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Python Dev Roadmap", query: "Give me a structured step-by-step roadmap to become a high-earning Python developer" },
      { label: "📈 Boost ATS Score", query: "What Python frameworks and libraries should I list on my resume for maximum ATS match?" },
      { label: "💼 Python Interview Questions", query: "What are the trickiest Python technical interview questions asked at top tech companies?" },
      { label: "🚀 Python Projects", query: "What are 3 modern Python/FastAPI projects that will make my resume stand out?" }
    ]
  },

  {
    id: "mern-stack-developer",
    name: "MERN Stack Developer",
    category: "Software Development",
    description: "Builds full-stack JavaScript applications utilizing MongoDB, Express.js, React, and Node.js.",
    skills: [
      "mongodb", "express", "react", "node.js", "javascript", "html", "css", "git", "rest api", "redux", "jwt"
    ],
    tools: ["VS Code", "MongoDB Compass", "Postman", "Git", "GitHub"],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript"],
    recommendedProjects: [
      {
        title: "SAAS Project Management Tool",
        desc: "Kanban boards, team invites, task assignments, activity history, and real-time status updates.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"]
      },
      {
        title: "Social Media Platform with Direct Messaging",
        desc: "User profiles, feeds, posts with image uploads, likes/comments, and live chat messaging.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"]
      }
    ],
    interviewTopics: [
      "MERN Architecture & Full Flow of Data from React to MongoDB",
      "React State Management, Hooks, Performance Optimization",
      "Express Middleware, Route Protection, JWT Authentication",
      "MongoDB Schema Design, Indexing, and Aggregations",
      "Deploying MERN Applications on Modern Cloud Platforms"
    ],
    roadmap: [
      { step: 1, title: "JavaScript ES6+ Deep Dive", duration: "2 Weeks", topics: ["Closures", "Promises & Async/Await", "Array Methods", "Modules"] },
      { step: 2, title: "React Component Architecture", duration: "3 Weeks", topics: ["Hooks (useState, useEffect, useMemo)", "Router", "State Management (Redux/Zustand)"] },
      { step: 3, title: "Node.js & Express Server", duration: "2-3 Weeks", topics: ["REST APIs", "Middleware", "Authentication with JWT & Bcrypt"] },
      { step: 4, title: "MongoDB & Mongoose ODM", duration: "2 Weeks", topics: ["Schema Design", "CRUD", "Mongoose Relationships & Population"] },
      { step: 5, title: "MERN Capstone Project", duration: "3 Weeks", topics: ["Full stack deployment", "CORS setup", "Production environment configuration"] }
    ],
    learningResources: {
      "React Docs": [{ name: "React Official Docs", url: "https://react.dev" }],
      "MERN Tutorials": [{ name: "MongoDB University", url: "https://learn.mongodb.com" }]
    },
    quickPrompts: [
      { label: "🗺️ MERN Roadmap", query: "Give me a step-by-step roadmap to master the MERN stack in 12 weeks" },
      { label: "📈 Boost ATS Score", query: "How should I structure my resume projects to get MERN developer calls?" },
      { label: "💼 MERN Interview QA", query: "What are the most common MERN stack interview questions?" }
    ]
  },

  {
    id: "software-engineer",
    name: "Software Engineer",
    category: "Software Development",
    description: "Designs, writes, tests, and maintains robust computer systems and software applications with strong computer science fundamentals.",
    skills: [
      "dsa", "c++", "java", "python", "system design", "git", "oop", "operating systems", "dbms", "computer networks", "sql"
    ],
    tools: ["VS Code", "Git", "GitHub", "Linux / Terminal", "Debugger / GDB", "Docker"],
    technologies: ["C++ / Java / Python", "SQL", "Linux", "Git", "Docker"],
    recommendedProjects: [
      {
        title: "Custom In-Memory Key-Value Store",
        desc: "High-performance key-value database supporting SET/GET, expiration (TTL), serialization, and concurrency safety.",
        tech: ["C++ or Java or Go", "Sockets", "Concurrency", "Data Structures"]
      },
      {
        title: "Multi-threaded HTTP Web Server from Scratch",
        desc: "Low-level socket programming implementing HTTP/1.1 protocol parsing, thread pools, and static file serving.",
        tech: ["C++ or C or Java", "POSIX Threads / Sockets", "Linux"]
      }
    ],
    interviewTopics: [
      "Data Structures & Algorithms: Graphs, Dynamic Programming, Heap, Trie, Sliding Window",
      "Object-Oriented Design & SOLID Principles",
      "Computer Science Fundamentals: OS (Process vs Thread, Deadlocks), DBMS (Transactions, B-Trees), Networks (TCP vs UDP, OSI)",
      "System Design & Scalability: Caching, Sharding, Load Balancers, Microservices"
    ],
    roadmap: [
      { step: 1, title: "Programming Language & OOP", duration: "3 Weeks", topics: ["Master C++ or Java", "Pointers / Memory Management", "OOP & Design Patterns"] },
      { step: 2, title: "Data Structures & Algorithms Mastery", duration: "6 Weeks", topics: ["Arrays & Strings", "Linked Lists & Trees", "Graphs & DP", "Solve 200+ LeetCode problems"] },
      { step: 3, title: "Core CS Subjects", duration: "3 Weeks", topics: ["Operating Systems", "Computer Networks", "Database Management Systems"] },
      { step: 4, title: "System Software / Systems Project", duration: "3 Weeks", topics: ["Socket programming or distributed cache project", "Git & CI/CD"] },
      { step: 5, title: "Coding Rounds & Mock Interviews", duration: "3 Weeks", topics: ["Timed coding challenges", "Behavioral & Leadership Principles"] }
    ],
    learningResources: {
      "LeetCode": [{ name: "LeetCode 75", url: "https://leetcode.com/studyplan/leetcode-75/" }],
      "CS Fundamentals": [{ name: "GeeksforGeeks CS Subjects", url: "https://www.geeksforgeeks.org/computer-science-projects/" }]
    },
    quickPrompts: [
      { label: "🗺️ SDE Roadmap", query: "Give me a roadmap to prepare for SDE-1 roles at tier-1 product companies" },
      { label: "📈 Boost ATS Score", query: "How to tailor a resume for Software Engineer roles to highlight problem-solving?" },
      { label: "💼 DSA & Coding Rounds", query: "What DSA patterns appear most frequently in software engineer coding assessments?" }
    ]
  },

  // ===================================================
  // 2. DATA & AI
  // ===================================================
  {
    id: "data-analyst",
    name: "Data Analyst",
    category: "Data & AI",
    aliases: [
      "data analyst",
      "data analytics",
      "data analytics specialist",
      "junior data analyst",
      "business data analyst",
      "bi analyst",
      "business intelligence analyst",
      "business data analytics",
      "data analyst intern"
    ],
    description: "Transforms raw data into actionable business insights using SQL, Excel, Python, statistics, and interactive BI dashboards.",
    essentialSkills: [
      "sql", "microsoft excel", "python", "pandas", "numpy", "data cleaning",
      "data analysis", "exploratory data analysis", "statistics", "data visualization",
      "power bi", "tableau", "dashboard development", "data interpretation", "problem solving"
    ],
    importantSkills: [
      "matplotlib", "seaborn", "jupyter notebook", "postgresql", "mysql",
      "microsoft power query", "dax", "etl", "data transformation",
      "business intelligence", "kpi analysis", "reporting"
    ],
    bonusSkills: [
      "a/b testing", "hypothesis testing"
    ],
    skills: [
      "sql", "microsoft excel", "excel", "python", "pandas", "numpy", "data cleaning",
      "data analysis", "exploratory data analysis", "statistics", "data visualization",
      "power bi", "tableau", "dashboard development", "data interpretation", "problem solving",
      "matplotlib", "seaborn", "jupyter notebook", "postgresql", "mysql",
      "microsoft power query", "power query", "dax", "etl", "data transformation",
      "business intelligence", "kpi analysis", "reporting", "a/b testing", "hypothesis testing"
    ],
    skillCategories: {
      "Programming": ["Python"],
      "Database": ["SQL", "MySQL", "PostgreSQL"],
      "Data Analysis": ["Pandas", "NumPy", "Data Cleaning", "Exploratory Data Analysis", "Data Transformation", "ETL"],
      "Visualization": ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Dashboard Development"],
      "Statistics": ["Descriptive Statistics", "Hypothesis Testing", "A/B Testing", "Statistics"],
      "Excel": ["Microsoft Excel", "Pivot Tables", "Power Query", "DAX"],
      "Business Intelligence & Reporting": ["Business Intelligence", "KPI Analysis", "Reporting", "Data Interpretation", "Problem Solving"]
    },
    tools: ["Power BI", "Tableau", "Microsoft Excel", "Jupyter Notebook", "PostgreSQL", "MySQL", "Git", "Power Query"],
    technologies: ["SQL", "Python (Pandas, NumPy, Matplotlib, Seaborn)", "Power BI / DAX", "Tableau", "Excel (Advanced Formulas, Pivot Tables, Power Query)", "Statistics"],
    recommendedProjects: [
      {
        title: "Sales Performance Dashboard",
        desc: "End-to-end interactive dashboard analyzing revenue trends, regional KPIs, and sales rep performance.",
        tech: ["SQL", "Excel", "Power BI"],
        skillsAddressed: ["sql", "excel", "power bi", "dashboard development", "data visualization", "kpi analysis"]
      },
      {
        title: "E-commerce Customer Analysis",
        desc: "Comprehensive exploratory analysis identifying customer segments, high-value cohorts, and purchasing frequency.",
        tech: ["Python", "Pandas", "SQL"],
        skillsAddressed: ["python", "pandas", "sql", "exploratory data analysis", "data cleaning"]
      },
      {
        title: "Customer Churn Analysis",
        desc: "Predictive & exploratory churn analysis diagnosing attrition drivers with statistical distributions and visual storyboards.",
        tech: ["Python", "Pandas", "Statistics", "Visualization"],
        skillsAddressed: ["python", "pandas", "statistics", "data visualization", "hypothesis testing"]
      },
      {
        title: "Financial Data Analysis",
        desc: "Quarterly expense, P&L, and cash-flow model tracking variance against budgets with automated visualizations.",
        tech: ["Excel", "Python", "Data Visualization"],
        skillsAddressed: ["excel", "python", "data visualization", "data analysis", "reporting"]
      },
      {
        title: "Marketing Campaign Analysis",
        desc: "Multi-channel marketing attribution report tracking conversion rates, CAC, ROAS, and lead progression.",
        tech: ["SQL", "Power BI", "KPI Analysis"],
        skillsAddressed: ["sql", "power bi", "kpi analysis", "business intelligence", "data interpretation"]
      },
      {
        title: "Superstore Sales Analysis",
        desc: "Deep-dive analysis of retail store profitability across product categories, shipping modes, and customer discount bands.",
        tech: ["SQL", "Excel", "Power BI"],
        skillsAddressed: ["sql", "excel", "power bi", "data cleaning", "dax"]
      },
      {
        title: "Employee Analytics Dashboard",
        desc: "Human resources workforce dashboard visualizing turnover rates, employee tenure, compensation distribution, and performance metrics.",
        tech: ["SQL", "Power BI", "DAX"],
        skillsAddressed: ["sql", "power bi", "dax", "dashboard development", "reporting"]
      }
    ],
    interviewTopics: [
      "SQL Core & Advanced: Multi-table JOINs, Subqueries, CTEs, Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG), Aggregations (GROUP BY, HAVING)",
      "Applied Statistics: Descriptive vs Inferential Statistics, Normal Distribution, P-values, Hypothesis Testing, A/B Testing, Correlation vs Causation",
      "Data Cleaning & Transformation: Handling Missing/Null Data, Deduplication, Type Casting, Outlier Detection in Pandas & SQL",
      "Business Intelligence & Dashboards: Star vs Snowflake Schema, DAX Calculated Measures vs Columns, KPI Definition, Data Storytelling",
      "Microsoft Excel: XLOOKUP / INDEX-MATCH, Pivot Tables & Slicers, Power Query ETL, Calculated Fields"
    ],
    roadmap: [
      {
        step: 1,
        level: "LEVEL 1 — FOUNDATIONS",
        title: "Foundations (Excel, Statistics, Data Cleaning, Basic SQL)",
        duration: "2-3 Weeks",
        topics: ["Excel (Formulas, Pivot Tables, XLOOKUP)", "Basic Statistics (Mean, Median, Mode, Variance)", "Data Cleaning Fundamentals", "Basic SQL (SELECT, WHERE, GROUP BY, ORDER BY)"],
        skills: ["excel", "statistics", "data cleaning", "sql"]
      },
      {
        step: 2,
        level: "LEVEL 2 — CORE ANALYTICS",
        title: "Core Analytics (Advanced SQL, Python, Pandas, NumPy, EDA)",
        duration: "3-4 Weeks",
        topics: ["Advanced SQL (JOINs, Window Functions, CTEs, Subqueries)", "Python Programming for Analytics", "Pandas DataFrames & Manipulation", "NumPy Vectorized Math", "Exploratory Data Analysis (EDA)"],
        skills: ["sql", "python", "pandas", "numpy", "exploratory data analysis"]
      },
      {
        step: 3,
        level: "LEVEL 3 — VISUALIZATION",
        title: "Visualization (Power BI, Tableau, Dashboards, Data Storytelling)",
        duration: "2-3 Weeks",
        topics: ["Power BI Data Modeling & Relationships", "Tableau Workbooks & Parameters", "Dashboard Development & Visual Hierarchy", "Data Storytelling & Executive Reporting"],
        skills: ["power bi", "tableau", "dashboard development", "data visualization"]
      },
      {
        step: 4,
        level: "LEVEL 4 — ADVANCED ANALYTICS",
        title: "Advanced Analytics (Inferential Statistics, A/B Testing, Advanced SQL, BI)",
        duration: "2-3 Weeks",
        topics: ["Advanced Statistics & Probability", "Hypothesis Testing & P-Value Interpretation", "A/B Testing Methodology", "Advanced SQL Query Optimization", "Business Analytics & KPI Formulation"],
        skills: ["statistics", "hypothesis testing", "a/b testing", "sql", "business intelligence"]
      },
      {
        step: 5,
        level: "LEVEL 5 — JOB READY",
        title: "Job Ready (Real-World Projects, Portfolio, SQL Interview Prep, Case Studies)",
        duration: "3-4 Weeks",
        topics: ["Real-World Portfolio Projects (GitHub & BI Public)", "Resume Optimization & ATS Keyword Tuning", "Interview Preparation & Live SQL Screenings", "Business Analytics Case Studies & Problem Solving"],
        skills: ["problem solving", "reporting", "data interpretation"]
      }
    ],
    learningResources: {
      "SQL Practice": [{ name: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/" }, { name: "Mode Analytics SQL", url: "https://mode.com/sql-tutorial/" }],
      "BI Tools": [{ name: "Microsoft Power BI Guided Learning", url: "https://learn.microsoft.com/en-us/power-bi/" }],
      "Python Data": [{ name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" }]
    },
    quickPrompts: [
      { label: "🗺️ Data Analyst Roadmap", query: "Give me a step-by-step roadmap to become a job-ready Data Analyst" },
      { label: "📈 Boost ATS Score", query: "What technical keywords and tools should a Data Analyst include on their resume for high ATS score?" },
      { label: "💼 SQL Interview Questions", query: "What are the most common SQL window function questions asked in data analyst interviews?" },
      { label: "🚀 Data Portfolio Projects", query: "What are 3 standout portfolio projects that will impress data hiring managers?" }
    ]
  },

  {
    id: "data-scientist",
    name: "Data Scientist",
    category: "Data & AI",
    description: "Applies statistical modeling, machine learning, and programming to analyze complex data sets and build predictive systems.",
    skills: [
      "python", "machine learning", "statistics", "pandas", "numpy", "scikit-learn", "sql", "data visualization", "math", "deep learning"
    ],
    tools: ["Jupyter Notebook", "Google Colab", "Git", "VS Code", "Anaconda", "MLflow"],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "SQL", "Matplotlib / Seaborn"],
    recommendedProjects: [
      {
        title: "Predictive House Price Modeling with Scikit-Learn",
        desc: "Feature engineering pipeline, regression algorithms comparison, hyperparameter tuning, and model evaluation metrics.",
        tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"]
      },
      {
        title: "Customer Sentiment Analysis on Product Reviews",
        desc: "NLP pipeline preprocessing textual reviews, TF-IDF feature extraction, and sentiment classification using Logistic Regression and Naive Bayes.",
        tech: ["Python", "NLTK / SpaCy", "Scikit-Learn", "Streamlit"]
      }
    ],
    interviewTopics: [
      "Machine Learning Algorithms: Linear/Logistic Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost)",
      "Bias-Variance Tradeoff, Overfitting vs Underfitting, Regularization (L1 Lasso, L2 Ridge)",
      "Model Evaluation: Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC curve",
      "Math Fundamentals: Linear Algebra (Eigenvectors), Probability Distributions, Calculus (Gradients)",
      "Feature Engineering: One-hot encoding, Scaling (StandardScaler vs MinMaxScaler), Handling Imbalanced Data (SMOTE)"
    ],
    roadmap: [
      { step: 1, title: "Mathematics & Statistics for Data Science", duration: "3 Weeks", topics: ["Linear Algebra & Matrix Ops", "Multivariate Calculus", "Probability & Hypothesis Testing"] },
      { step: 2, title: "Python Scientific Stack", duration: "2 Weeks", topics: ["NumPy, Pandas, Matplotlib, Seaborn", "Data Wrangling & Exploratory Data Analysis (EDA)"] },
      { step: 3, title: "Classical Machine Learning", duration: "4 Weeks", topics: ["Supervised Learning (Regression & Classification)", "Unsupervised Learning (K-Means, PCA)", "Scikit-Learn Pipelines & Model Selection"] },
      { step: 4, title: "Advanced ML & Feature Engineering", duration: "3 Weeks", topics: ["Ensemble Methods (Random Forest, XGBoost, LightGBM)", "Cross-Validation & Hyperparameter Tuning", "Handling Imbalanced Datasets"] },
      { step: 5, title: "End-to-End Data Science Project", duration: "3 Weeks", topics: ["Streamlit UI Web App", "Model Deployment (FastAPI or Flask)", "Documentation on GitHub"] },
      { step: 6, title: "Interview Prep & Coding", duration: "2 Weeks", topics: ["ML Theory Questions", "Python Coding & SQL Querying for Data Science"] }
    ],
    learningResources: {
      "ML Course": [{ name: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" }],
      "StatQuest": [{ name: "StatQuest with Josh Starmer", url: "https://statquest.org" }]
    },
    quickPrompts: [
      { label: "🗺️ Data Scientist Roadmap", query: "Give me a structured roadmap to become a Data Scientist from scratch" },
      { label: "📈 Boost ATS Score", query: "What technical skills and project descriptions boost a Data Scientist resume score?" },
      { label: "💼 ML Interview Questions", query: "What are the most tested machine learning interview concepts?" }
    ]
  },

  {
    id: "machine-learning-engineer",
    name: "Machine Learning Engineer",
    category: "Data & AI",
    description: "Builds, optimizes, and deploys production machine learning models and scalable inference pipelines.",
    skills: [
      "python", "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "docker", "mlops", "git", "rest api", "sql"
    ],
    tools: ["PyTorch", "Docker", "Hugging Face", "MLflow", "Git", "Weights & Biases", "AWS / GCP"],
    technologies: ["Python", "PyTorch", "FastAPI", "Docker", "Hugging Face", "Scikit-Learn"],
    recommendedProjects: [
      {
        title: "Real-Time Object Detection API with YOLO & FastAPI",
        desc: "Trained computer vision pipeline deployed inside a Docker container serving real-time predictions via WebSocket/REST.",
        tech: ["PyTorch", "YOLOv8", "FastAPI", "Docker", "OpenCV"]
      },
      {
        title: "LLM Fine-Tuning & RAG Question Answering System",
        desc: "Retrieval-Augmented Generation (RAG) system with vector embeddings, ChromaDB, and fine-tuned open-source LLM.",
        tech: ["Python", "LangChain / LlamaIndex", "ChromaDB", "Hugging Face Transformers"]
      }
    ],
    interviewTopics: [
      "Deep Learning Fundamentals: Backpropagation, Activation Functions, Loss Functions, Optimizers (Adam, SGD)",
      "Neural Architectures: CNNs for Vision, RNNs/LSTMs, Transformer Architecture & Attention Mechanism",
      "Model Optimization: Quantization (INT8), Pruning, ONNX Runtime, TensorRT",
      "MLOps & Deployment: Dockerizing PyTorch models, GPU vs CPU inference latency, Continuous Training pipelines",
      "Software Engineering for ML: Writing clean object-oriented Python, Unit testing data pipelines"
    ],
    roadmap: [
      { step: 1, title: "Python & Advanced Algorithms", duration: "2 Weeks", topics: ["Vectorized NumPy", "Object-Oriented Python", "Data Structures"] },
      { step: 2, title: "Machine Learning Foundations", duration: "3 Weeks", topics: ["Supervised & Unsupervised Learning", "Loss Functions & Gradient Descent", "Scikit-Learn"] },
      { step: 3, title: "Deep Learning with PyTorch", duration: "4 Weeks", topics: ["Tensors & Autograd", "Building Neural Networks", "Training Loops & Validation", "Transfer Learning"] },
      { step: 4, title: "Transformers & Modern NLP/Vision", duration: "3 Weeks", topics: ["Attention Mechanism", "Hugging Face Transformers", "Fine-Tuning Open Source Models", "Vector Databases & Embeddings"] },
      { step: 5, title: "MLOps & Model Serving", duration: "3 Weeks", topics: ["Serving models with FastAPI", "Dockerizing ML containers", "Model Monitoring & Drift Detection"] },
      { step: 6, title: "Production Capstone Project", duration: "3 Weeks", topics: ["End-to-end deployed AI application with live endpoint and CI/CD"] },
      { step: 7, title: "ML Engineering Interviews", duration: "2 Weeks", topics: ["ML System Design (e.g. Design a Recommendation System)", "PyTorch coding problems"] }
    ],
    learningResources: {
      "PyTorch": [{ name: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/" }],
      "Hugging Face": [{ name: "Hugging Face Course", url: "https://huggingface.co/course" }]
    },
    quickPrompts: [
      { label: "🗺️ MLE Roadmap", query: "What is the complete roadmap to become a production Machine Learning Engineer?" },
      { label: "📈 Boost ATS Score", query: "What ML keywords and frameworks are mandatory for an MLE resume?" },
      { label: "💼 ML System Design", query: "How do I crack ML System Design interview rounds?" }
    ]
  },

  {
    id: "ai-engineer",
    name: "AI Engineer",
    category: "Data & AI",
    description: "Builds intelligent applications integrating Generative AI, Large Language Models (LLMs), RAG pipelines, and AI agents.",
    skills: [
      "python", "langchain", "llamaindex", "llm", "rag", "vector databases", "openai api", "gemini api", "fastapi", "git", "docker"
    ],
    tools: ["LangChain", "LlamaIndex", "Chroma / Pinecone", "OpenAI / Anthropic / Groq APIs", "Docker", "Git"],
    technologies: ["Python", "FastAPI", "LangChain", "LlamaIndex", "Vector DBs (Chroma/Pinecone)", "React (UI)"],
    recommendedProjects: [
      {
        title: "Enterprise Multi-Document RAG Research Assistant",
        desc: "Interactive assistant allowing users to upload PDFs and chat with them using semantic search and cited sources.",
        tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "React"]
      },
      {
        title: "Autonomous Multi-Agent Task Orchestrator",
        desc: "AI agent team collaborating to scrape web data, summarize articles, and draft marketing emails autonomously.",
        tech: ["Python", "LangGraph / CrewAI", "Groq API"]
      }
    ],
    interviewTopics: [
      "LLM Architectures, Context Windows, Prompt Engineering & Prompt Chaining",
      "RAG Architecture: Chunking strategies, Embedding Models, Hybrid Search (Dense + Sparse/BM25), Re-ranking",
      "Vector Databases: Cosine Similarity vs Dot Product, Indexing (HNSW, IVF)",
      "Agent Frameworks: Tool Calling, ReAct pattern, LangGraph state machines",
      "AI Safety & Evaluation: Hallucination mitigation, Guardrails, RAG Triad evaluation"
    ],
    roadmap: [
      { step: 1, title: "Python & REST APIs", duration: "2 Weeks", topics: ["Async Python", "FastAPI endpoints", "Pydantic Schemas"] },
      { step: 2, title: "Prompt Engineering & LLM APIs", duration: "2 Weeks", topics: ["System Prompts & Few-Shot Learning", "Structured Outputs (JSON mode)", "Function Calling & Tools"] },
      { step: 3, title: "RAG Systems & Vector Databases", duration: "3 Weeks", topics: ["Document Ingestion & Chunking", "Embeddings & ChromaDB / Pinecone", "Semantic Search & Context Injection"] },
      { step: 4, title: "AI Agents & Autonomous Workflows", duration: "3 Weeks", topics: ["LangChain & LangGraph", "CrewAI multi-agent patterns", "Stateful agent memory"] },
      { step: 5, title: "AI Application Capstone", duration: "3 Weeks", topics: ["Full stack GenAI product", "Streaming responses with SSE", "Cloud Deployment"] },
      { step: 6, title: "AI Engineering Interviews", duration: "2 Weeks", topics: ["RAG Architecture questions", "Cost and latency optimization for LLMs"] }
    ],
    learningResources: {
      "LangChain": [{ name: "LangChain Documentation", url: "https://python.langchain.com" }],
      "DeepLearning.AI": [{ name: "Short Courses by Andrew Ng", url: "https://www.deeplearning.ai" }]
    },
    quickPrompts: [
      { label: "🗺️ AI Engineer Roadmap", query: "Give me the step-by-step roadmap to become a Generative AI Engineer" },
      { label: "📈 Boost ATS Score", query: "What are the most impactful GenAI keywords for an AI Engineer resume?" },
      { label: "🚀 GenAI Project Ideas", query: "What are 3 advanced AI/LLM projects that hiring managers love?" }
    ]
  },

  // ===================================================
  // 3. CLOUD & DEVOPS
  // ===================================================
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    category: "Cloud & DevOps",
    description: "Automates software delivery pipelines, containerization, infrastructure provisioning, and continuous monitoring.",
    skills: [
      "linux", "docker", "kubernetes", "ci/cd", "jenkins", "github actions", "terraform", "aws", "git", "bash", "python", "monitoring"
    ],
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "Terraform", "Ansible", "Prometheus", "Grafana"],
    technologies: ["Linux", "Docker", "Kubernetes", "AWS / GCP", "Terraform", "GitHub Actions", "Bash"],
    recommendedProjects: [
      {
        title: "Automated Multi-Stage CI/CD Pipeline for Microservices",
        desc: "GitHub Actions workflow running unit tests, building Docker images, scanning for CVE vulnerabilities, and deploying to Kubernetes.",
        tech: ["GitHub Actions", "Docker", "Kubernetes", "Trivy"]
      },
      {
        title: "Infrastructure as Code (IaC) AWS Multi-Tier Setup",
        desc: "Modular Terraform scripts provisioning a production VPC, public/private subnets, ECS cluster, and RDS PostgreSQL database.",
        tech: ["Terraform", "AWS (VPC, ECS, RDS)", "Git"]
      },
      {
        title: "Full Cluster Monitoring with Prometheus & Grafana",
        desc: "Monitoring stack with custom alerting rules for CPU spikes, memory leaks, and HTTP 5xx error rate thresholds.",
        tech: ["Prometheus", "Grafana", "Alertmanager", "Docker"]
      }
    ],
    interviewTopics: [
      "Linux Administration: Processes, Permissions, Cron, Systemd, Networking (iptables, netstat, DNS resolution)",
      "Containers: Docker Image Optimization, Multi-Stage Builds, Container Security, Namespaces & Cgroups",
      "Kubernetes: Pods, Deployments, Services (ClusterIP vs NodePort vs Ingress), ConfigMaps, Secrets, Horizontal Pod Autoscaler (HPA)",
      "CI/CD Best Practices: Blue/Green Deployment, Canary Releases, Rollback Strategies",
      "Infrastructure as Code: Terraform State Management, Modules, Drift Detection"
    ],
    roadmap: [
      { step: 1, title: "Linux Administration & Bash Scripting", duration: "3 Weeks", topics: ["Linux Command Line", "File Permissions & Process Management", "Writing Automation Bash Scripts", "SSH & Networking Basics"] },
      { step: 2, title: "Git & Source Control Workflows", duration: "1 Week", topics: ["Git Branching Strategies (GitFlow, Trunk-based)", "Merge Conflicts & Rebasing", "Git Hooks"] },
      { step: 3, title: "Docker Containerization", duration: "2 Weeks", topics: ["Writing Dockerfiles", "Multi-stage Builds", "Docker Compose Multi-Container Apps", "Container Networking & Volumes"] },
      { step: 4, title: "Continuous Integration & Deployment (CI/CD)", duration: "3 Weeks", topics: ["GitHub Actions Workflows", "Jenkins Pipelines (Declarative)", "Automated Testing & Artifact Management"] },
      { step: 5, title: "Cloud Fundamentals (AWS/Azure/GCP)", duration: "3 Weeks", topics: ["Compute (EC2/ECS)", "Networking (VPC, Subnets, Gateways)", "Storage (S3, EBS)", "IAM & Security"] },
      { step: 6, title: "Infrastructure as Code with Terraform", duration: "2 Weeks", topics: ["Terraform HCL Syntax", "Providers & Resources", "Managing State & Backends", "Creating Reusable Modules"] },
      { step: 7, title: "Kubernetes Orchestration", duration: "3-4 Weeks", topics: ["K8s Architecture", "Pods, ReplicaSets, Deployments", "Services & Ingress Controllers", "Helm Package Manager"] },
      { step: 8, title: "Monitoring, Logging & Placement Prep", duration: "2 Weeks", topics: ["Prometheus Metrics & Grafana Dashboards", "ELK / EFK Logging Stack", "DevOps Mock Technical Interviews"] }
    ],
    learningResources: {
      "DevOps Roadmap": [{ name: "Roadmap.sh DevOps", url: "https://roadmap.sh/devops" }],
      "Kubernetes": [{ name: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/tutorials/" }],
      "Docker": [{ name: "Docker Getting Started", url: "https://docs.docker.com/get-started/" }]
    },
    quickPrompts: [
      { label: "🗺️ DevOps Roadmap", query: "Give me a structured roadmap to crack DevOps engineer roles as a fresher/junior" },
      { label: "📈 Boost ATS Score", query: "What DevOps keywords and certifications (CKA, AWS) stand out on a resume?" },
      { label: "💼 Kubernetes Interview QA", query: "What are the top 15 Kubernetes and Docker interview questions?" },
      { label: "🚀 DevOps Projects", query: "What are 3 hands-on DevOps projects I can showcase on GitHub?" }
    ]
  },

  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    category: "Cloud & DevOps",
    description: "Designs, deploys, and manages scalable, secure cloud infrastructure across AWS, Azure, or Google Cloud.",
    skills: [
      "aws", "cloud computing", "linux", "networking", "terraform", "docker", "python", "iam", "git", "bash", "security"
    ],
    tools: ["AWS Console / CLI", "Terraform", "Docker", "Git", "Linux Terminal"],
    technologies: ["AWS (EC2, S3, RDS, Lambda, VPC)", "Azure / GCP", "Terraform", "Python", "Linux"],
    recommendedProjects: [
      {
        title: "Serverless Event-Driven Image Processing Pipeline",
        desc: "AWS Lambda function triggered by S3 image uploads, resizing images and storing metadata in DynamoDB.",
        tech: ["AWS Lambda", "S3", "DynamoDB", "Python", "API Gateway"]
      },
      {
        title: "High-Availability Multi-AZ Web Infrastructure",
        desc: "Auto-scaling web application running across 2 availability zones with Application Load Balancer and RDS Multi-AZ failover.",
        tech: ["AWS VPC", "EC2", "ALB", "Auto Scaling", "Terraform"]
      }
    ],
    interviewTopics: [
      "Cloud Architecture: High Availability, Fault Tolerance, Disaster Recovery (RTO/RPO)",
      "AWS Services: EC2, S3 Storage Classes, VPC (Subnets, NAT Gateway, Security Groups vs NACLs)",
      "IAM Best Practices: Principle of Least Privilege, Roles vs Policies, MFA",
      "Serverless: AWS Lambda Cold Starts, Concurrency Limits, Event-Driven Architecture",
      "Cloud Cost Optimization: Reserved Instances, Spot Instances, AWS Cost Explorer"
    ],
    roadmap: [
      { step: 1, title: "Networking & Linux Foundations", duration: "2 Weeks", topics: ["IP Addressing, Subnetting (CIDR)", "TCP/IP & DNS", "Linux CLI & Scripting"] },
      { step: 2, title: "Cloud Computing Basics", duration: "2 Weeks", topics: ["IaaS vs PaaS vs SaaS", "Regions & Availability Zones", "Cloud Security Model"] },
      { step: 3, title: "AWS Core Services Deep Dive", duration: "4 Weeks", topics: ["VPC & Cloud Networking", "EC2 Compute & Auto Scaling", "S3 Storage & Lifecycle Rules", "RDS & DynamoDB Databases"] },
      { step: 4, title: "Identity, Access & Security", duration: "2 Weeks", topics: ["AWS IAM Roles & Policies", "KMS Encryption", "Security Hub & GuardDuty"] },
      { step: 5, title: "Serverless & Cloud Automation", duration: "2 Weeks", topics: ["AWS Lambda & API Gateway", "CloudFormation & Terraform", "CloudWatch Logs & Alarms"] },
      { step: 6, title: "Cloud Capstone & Certification", duration: "3 Weeks", topics: ["AWS Certified Solutions Architect Associate prep", "Publish infrastructure project on GitHub"] }
    ],
    learningResources: {
      "AWS Docs": [{ name: "AWS Skill Builder", url: "https://explore.skillbuilder.aws" }],
      "Cloud Practice": [{ name: "FreeCodeCamp AWS Course", url: "https://www.freecodecamp.org" }]
    },
    quickPrompts: [
      { label: "🗺️ Cloud Engineer Roadmap", query: "What is the best roadmap to become an AWS Cloud Engineer?" },
      { label: "📈 Boost ATS Score", query: "What AWS services and keywords should be on a Cloud Engineer resume?" },
      { label: "💼 Cloud Architecture QA", query: "What scenarios are tested in cloud engineering interviews?" }
    ]
  },

  // ===================================================
  // 4. CYBERSECURITY
  // ===================================================
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    category: "Cybersecurity",
    description: "Protects organizational networks, investigates security alerts, monitors for intrusions, and ensures compliance.",
    skills: [
      "networking", "linux", "siem", "wireshark", "python", "incident response", "vulnerability assessment", "cryptography", "firewalls", "security"
    ],
    tools: ["Wireshark", "Splunk", "Nmap", "Burp Suite", "Kali Linux", "Metasploit", "Snort / Zeek"],
    technologies: ["Network Protocols (TCP/IP, DNS, HTTP/S)", "Linux Security", "SIEM (Splunk)", "Python / Bash Scripting"],
    recommendedProjects: [
      {
        title: "SOC Home Lab & Incident Investigation with Splunk",
        desc: "Configured Splunk SIEM ingesting Windows Event Logs and Sysmon data, detecting brute force and malware attacks.",
        tech: ["Splunk", "Sysmon", "Windows Server", "Linux"]
      },
      {
        title: "Automated Network Vulnerability Scanner",
        desc: "Python tool leveraging Nmap to scan open ports, identify running services, and flag known CVE vulnerabilities.",
        tech: ["Python", "Nmap", "Scapy", "CVE Database"]
      }
    ],
    interviewTopics: [
      "Security Fundamentals: CIA Triad, Defense in Depth, Zero Trust Architecture",
      "Network Defense: TCP 3-Way Handshake, Port Scanning Types, Firewalls (Stateful vs Stateless), VPNs",
      "Threat Analysis: MITRE ATT&CK Framework, Cyber Kill Chain, Incident Response Lifecycle (NIST)",
      "Common Attacks & Mitigation: Phishing, Ransomware, DDoS, SQL Injection, Cross-Site Scripting (XSS)",
      "SOC Operations: Analyzing PCAP packets in Wireshark, writing SIEM detection rules"
    ],
    roadmap: [
      { step: 1, title: "Computer Networks & Protocols", duration: "3 Weeks", topics: ["OSI & TCP/IP Models", "IP Subnetting & Routing", "DNS, DHCP, ARP, ICMP", "Packet Capture with Wireshark"] },
      { step: 2, title: "Linux & Windows Operating System Security", duration: "2 Weeks", topics: ["Linux CLI & Permissions", "User Account Control & Active Directory basics", "Hardening OS configurations"] },
      { step: 3, title: "Security Fundamentals & Frameworks", duration: "2 Weeks", topics: ["CIA Triad & Risk Assessment", "NIST CSF & ISO 27001", "MITRE ATT&CK Matrix"] },
      { step: 4, title: "Threat Detection & SIEM Operations", duration: "3 Weeks", topics: ["Log Analysis (Syslog, Windows Event Viewer)", "Splunk SIEM setup & SPL queries", "Alert Triage & Correlation"] },
      { step: 5, title: "Vulnerability Scanning & Hands-on Labs", duration: "2 Weeks", topics: ["Nmap scanning techniques", "TryHackMe / HackTheBox SOC paths", "Vulnerability management workflow"] },
      { step: 6, title: "Certifications & Placement Prep", duration: "3 Weeks", topics: ["CompTIA Security+ / CEH preparation", "SOC Analyst mock interview scenarios", "Resume building"] }
    ],
    learningResources: {
      "TryHackMe": [{ name: "TryHackMe SOC Level 1", url: "https://tryhackme.com/path/outline/soclevel1" }],
      "Wireshark": [{ name: "Wireshark University Tutorials", url: "https://www.wireshark.org" }]
    },
    quickPrompts: [
      { label: "🗺️ Cybersecurity Roadmap", query: "Give me a step-by-step roadmap to get my first job as a SOC / Cybersecurity Analyst" },
      { label: "📈 Boost ATS Score", query: "What technical tools and keywords make a Cybersecurity resume pass screening?" },
      { label: "💼 SOC Interview Questions", query: "What are the most common technical questions in a SOC Analyst interview?" },
      { label: "🚀 Hands-on Security Labs", query: "What home lab projects can I build to prove practical security skills?" }
    ]
  },

  {
    id: "cybersecurity-engineer",
    name: "Cybersecurity Engineer",
    category: "Cybersecurity",
    description: "Engineers security architectures, automates defense pipelines, audits code, and builds resilient security controls.",
    skills: [
      "penetration testing", "ethical hacking", "burp suite", "python", "linux", "owasp top 10", "cryptography", "cloud security", "networking"
    ],
    tools: ["Burp Suite", "Kali Linux", "Metasploit", "OWASP ZAP", "Ghidra", "Git", "Docker"],
    technologies: ["Kali Linux", "Python", "Bash", "OWASP Standards", "TLS/SSL Cryptography"],
    recommendedProjects: [
      {
        title: "Automated Web Application Security Scanner",
        desc: "CLI tool detecting OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF) with detailed severity reports.",
        tech: ["Python", "OWASP ZAP API", "BeautifulSoup"]
      },
      {
        title: "Secure Cloud Architecture with Automated Compliance",
        desc: "Hardened AWS infrastructure with automated security auditing and intrusion alerts using GuardDuty and Lambda.",
        tech: ["AWS", "Terraform", "Python", "CloudTrail"]
      }
    ],
    interviewTopics: [
      "OWASP Top 10 Deep Dive: Root causes, exploit demonstrations, and exact remediation code",
      "Cryptography: Symmetric (AES) vs Asymmetric (RSA/ECC), Hashing (SHA-256), PKI, Digital Signatures",
      "Authentication Security: OAuth 2.0 vulnerabilities, SAML, Session fixation, JWT flaws",
      "AppSec & Code Auditing: Static (SAST) vs Dynamic (DAST) analysis, Secure SDLC",
      "Network Exploitation: Man-in-the-Middle (MitM), DNS Spoofing, Buffer Overflows"
    ],
    roadmap: [
      { step: 1, title: "Deep Networking & Systems Architecture", duration: "3 Weeks", topics: ["Network Internals & Protocols", "Memory Management & Assembly Basics", "Linux Kernels"] },
      { step: 2, title: "Web Application Security & OWASP Top 10", duration: "4 Weeks", topics: ["SQL Injection & Broken Auth", "XSS & CSRF Exploitation", "PortSwigger Web Security Academy"] },
      { step: 3, title: "Python for Ethical Hackers", duration: "2 Weeks", topics: ["Building custom port scanners", "Exploitation scripts", "Packet crafting with Scapy"] },
      { step: 4, title: "Cloud & DevSecOps", duration: "3 Weeks", topics: ["Securing AWS/Azure configurations", "Integrating SAST/DAST into CI/CD", "Container security"] },
      { step: 5, title: "Practical Labs & Capstone", duration: "3 Weeks", topics: ["HackTheBox Medium machines", "Publish open source security tool", "Resume & Mock Technical Rounds"] }
    ],
    learningResources: {
      "PortSwigger": [{ name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }],
      "OWASP": [{ name: "OWASP Top 10 Guide", url: "https://owasp.org/www-project-top-ten/" }]
    },
    quickPrompts: [
      { label: "🗺️ Cyber Engineer Roadmap", query: "Give me a complete roadmap to become an Application Security / Cyber Engineer" },
      { label: "📈 Boost ATS Score", query: "What technical certifications and skills give the highest resume match in cybersecurity?" },
      { label: "💼 AppSec Interview Prep", query: "What OWASP questions are asked in security engineer interviews?" }
    ]
  },

  // ===================================================
  // 5. TESTING & QA
  // ===================================================
  {
    id: "qa-engineer",
    name: "QA Engineer",
    category: "Testing & QA",
    description: "Designs test plans, executes functional and regression tests, reports defects, and ensures overall software quality.",
    skills: [
      "manual testing", "selenium", "test cases", "jira", "sql", "api testing", "postman", "git", "sdlc", "stlc", "bug tracking"
    ],
    tools: ["Postman", "Jira", "Selenium", "Git", "Bugzilla", "TestRail"],
    technologies: ["Manual Testing", "Postman / REST APIs", "SQL", "Jira / Agile", "Test Automation Basics"],
    recommendedProjects: [
      {
        title: "Complete Test Plan & Test Suite for E-Commerce Web App",
        desc: "Comprehensive manual and automated test cases covering functional, boundary, integration, and UI acceptance scenarios.",
        tech: ["Jira", "TestRail", "Postman", "Chrome DevTools"]
      },
      {
        title: "RESTful API Automation Test Collection with Postman",
        desc: "Automated test assertions verifying HTTP status codes, JSON schema validation, response latency, and auth tokens.",
        tech: ["Postman", "Newman", "JavaScript", "REST APIs"]
      }
    ],
    interviewTopics: [
      "Testing Fundamentals: SDLC vs STLC, Verification vs Validation, Bug Life Cycle",
      "Test Design Techniques: Boundary Value Analysis (BVA), Equivalence Partitioning (EP), State Transition",
      "API Testing: Status Codes (200, 201, 400, 401, 403, 404, 500), Request Headers, Payload Validation",
      "Database Testing: Writing SQL queries to verify data integrity and backend transactions",
      "Agile Testing: Scrum rituals, Sprint planning, Defect severity vs priority"
    ],
    roadmap: [
      { step: 1, title: "Manual Testing & QA Fundamentals", duration: "2 Weeks", topics: ["SDLC & STLC Phases", "Test Strategy & Test Plan creation", "Writing Detailed Test Cases", "Defect Logging in Jira"] },
      { step: 2, title: "API Testing with Postman", duration: "2 Weeks", topics: ["REST API Basics", "Creating Requests & Collections", "Writing JavaScript Test Scripts in Postman", "Automating with Newman CLI"] },
      { step: 3, title: "SQL for Quality Assurance", duration: "2 Weeks", topics: ["Database Queries & Joins", "Data Verification Testing", "Stored Procedures Check"] },
      { step: 4, title: "Introduction to Test Automation", duration: "3 Weeks", topics: ["Selenium WebDriver Basics", "Locators (XPath, CSS Selectors)", "TestNG or Pytest Framework"] },
      { step: 5, title: "QA Portfolio & Mock Interviews", duration: "2 Weeks", topics: ["Documenting Test Artifacts on GitHub", "Resume Refinement for QA Roles", "Behavioral & Technical Q&A"] }
    ],
    learningResources: {
      "Guru99 QA": [{ name: "Guru99 Software Testing", url: "https://www.guru99.com/software-testing.html" }],
      "Postman Docs": [{ name: "Postman Learning Center", url: "https://learning.postman.com" }]
    },
    quickPrompts: [
      { label: "🗺️ QA Career Roadmap", query: "Give me a step-by-step roadmap to land a QA / Software Testing job" },
      { label: "📈 Boost QA ATS Score", query: "What testing methodologies and tools should I list on my QA resume?" },
      { label: "💼 QA Interview Questions", query: "What are the most asked manual and API testing interview questions?" }
    ]
  },

  {
    id: "automation-test-engineer",
    name: "Automation Test Engineer",
    category: "Testing & QA",
    description: "Develops automated test frameworks using Selenium, Playwright, or Cypress to accelerate continuous testing.",
    skills: [
      "selenium", "java", "python", "playwright", "cypress", "testng", "cucumber", "git", "ci/cd", "jenkins", "api testing", "sql"
    ],
    tools: ["Selenium WebDriver", "Playwright", "Cypress", "IntelliJ IDEA / VS Code", "Git", "Jenkins", "Postman"],
    technologies: ["Java or Python", "Selenium / Playwright", "TestNG / Pytest", "Cucumber (BDD)", "Maven", "CI/CD"],
    recommendedProjects: [
      {
        title: "Page Object Model (POM) Web Automation Framework",
        desc: "Enterprise test framework using Selenium and TestNG with data-driven testing, extent reports, and parallel test execution.",
        tech: ["Java", "Selenium WebDriver", "TestNG", "Maven", "ExtentReports"]
      },
      {
        title: "Modern End-to-End Automation with Playwright",
        desc: "High-speed cross-browser automated suite with network mocking, visual regression, and GitHub Actions integration.",
        tech: ["TypeScript / Python", "Playwright", "GitHub Actions"]
      }
    ],
    interviewTopics: [
      "Selenium Internals: WebDriver Architecture, Locators, Implicit vs Explicit vs Fluent Waits",
      "Automation Framework Design: Page Object Model (POM), Data-Driven Framework (Apache POI), Hybrid Framework",
      "BDD Testing: Cucumber feature files, Step Definitions, Scenario Outlines",
      "Modern Tools: Playwright vs Selenium vs Cypress (Execution speed, Flakiness, Auto-waiting)",
      "CI/CD Integration: Running headless tests in Docker and Jenkins/GitHub Actions pipelines"
    ],
    roadmap: [
      { step: 1, title: "Core Programming (Java or Python)", duration: "3 Weeks", topics: ["OOP Principles", "Collections & File I/O", "Exception Handling"] },
      { step: 2, title: "Selenium WebDriver Deep Dive", duration: "3 Weeks", topics: ["Browser Navigation & Element Locators", "Dynamic Waits & Alerts", "Actions Class & JavaScriptExecutor"] },
      { step: 3, title: "Framework Architecture (POM & TestNG)", duration: "3 Weeks", topics: ["Page Object Model Design", "TestNG Annotations & Assertions", "Data-Driven Testing with Excel", "Reporting"] },
      { step: 4, title: "BDD with Cucumber", duration: "2 Weeks", topics: ["Gherkin Syntax (Given-When-Then)", "Step Definition Mapping", "Tags & Test Runners"] },
      { step: 5, title: "API Automation & Modern Tools", duration: "2 Weeks", topics: ["RestAssured (Java) or Requests (Python)", "Playwright introduction"] },
      { step: 6, title: "CI/CD Pipeline Integration", duration: "2 Weeks", topics: ["Jenkins or GitHub Actions setup", "Dockerized Test Execution"] },
      { step: 7, title: "Interviews & Placement Prep", duration: "2 Weeks", topics: ["Live framework coding rounds", "Handling dynamic web elements"] }
    ],
    learningResources: {
      "Selenium Docs": [{ name: "Selenium Documentation", url: "https://www.selenium.dev/documentation/" }],
      "Playwright Docs": [{ name: "Playwright Official Docs", url: "https://playwright.dev" }]
    },
    quickPrompts: [
      { label: "🗺️ Automation Roadmap", query: "What is the complete roadmap to master Test Automation with Selenium and Playwright?" },
      { label: "📈 Boost ATS Score", query: "What keywords should an Automation Test Engineer include on their resume?" },
      { label: "💼 Automation Interview QA", query: "What framework design questions are asked in automation testing interviews?" }
    ]
  },

  // ===================================================
  // 6. DATABASE & DATA ENGINEERING
  // ===================================================
  {
    id: "sql-developer",
    name: "SQL Developer",
    category: "Database & Data Engineering",
    description: "Specializes in developing complex relational database queries, stored procedures, triggers, and performance tuning.",
    skills: [
      "sql", "mysql", "postgresql", "oracle", "stored procedures", "indexing", "database design", "query optimization", "etl", "dbms"
    ],
    tools: ["MySQL Workbench", "pgAdmin", "DBeaver", "SQL Server Management Studio (SSMS)", "Git"],
    technologies: ["SQL", "PostgreSQL", "MySQL", "PL/SQL / T-SQL", "Relational Database Design"],
    recommendedProjects: [
      {
        title: "Relational Banking System with ACID Stored Procedures",
        desc: "Complete database schema implementing money transfers, transaction rollback triggers, and audit logging.",
        tech: ["PostgreSQL", "PL/pgSQL", "Triggers", "Indexing"]
      },
      {
        title: "Database Performance Tuning & Query Optimization Audit",
        desc: "Analyzed slow queries using EXPLAIN ANALYZE, implemented B-Tree composite indexes, and reduced execution time by 85%.",
        tech: ["MySQL", "Query Optimization", "Benchmarking"]
      }
    ],
    interviewTopics: [
      "Advanced Querying: Window Functions, Recursive CTEs, PIVOT/UNPIVOT, Correlated Subqueries",
      "Database Internals: Indexing types (Clustered vs Non-Clustered, Composite), B-Tree mechanics, Execution Plans",
      "Transactions & Concurrency: ACID, Isolation Levels (Read Committed, Repeatable Read, Serializable), Deadlocks",
      "Schema Design: 1NF to BCNF Normalization, Surrogate vs Natural Keys, Partitioning Strategies",
      "Stored Procedures & Triggers: Cursors, Error Handling, Bulk Inserts, Performance caveats"
    ],
    roadmap: [
      { step: 1, title: "Relational Foundations & Core SQL", duration: "2 Weeks", topics: ["DDL, DML, DCL commands", "Primary & Foreign Keys", "Multi-table Joins & Grouping"] },
      { step: 2, title: "Advanced SQL Analytical Functions", duration: "2 Weeks", topics: ["Window Functions (RANK, ROW_NUMBER, LAG/LEAD)", "CTEs & Recursive Queries", "Case Statements & Pivoting"] },
      { step: 3, title: "Procedural Programming (PL/SQL / T-SQL)", duration: "3 Weeks", topics: ["Stored Procedures & Functions", "Triggers & Views", "Exception Handling & Transactions"] },
      { step: 4, title: "Database Indexing & Performance Tuning", duration: "3 Weeks", topics: ["Reading EXPLAIN Execution Plans", "Index Optimization Strategies", "Table Partitioning & Sharding Basics"] },
      { step: 5, title: "Database Capstone Project", duration: "2 Weeks", topics: ["Full enterprise database schema on GitHub with benchmark reports"] },
      { step: 6, title: "SQL Technical Interview Prep", duration: "2 Weeks", topics: ["Solve 100+ LeetCode & HackerRank Hard SQL problems"] }
    ],
    learningResources: {
      "SQL Practice": [{ name: "LeetCode SQL Study Plan", url: "https://leetcode.com/studyplan/top-sql-50/" }],
      "Database Tuning": [{ name: "Use The Index, Luke!", url: "https://use-the-index-luke.com" }]
    },
    quickPrompts: [
      { label: "🗺️ SQL Dev Roadmap", query: "Give me a step-by-step roadmap to master SQL and become an SQL Developer" },
      { label: "📈 Boost ATS Score", query: "What technical database keywords will boost an SQL developer resume?" },
      { label: "💼 Advanced SQL QA", query: "What advanced SQL questions are asked in database engineer interviews?" }
    ]
  },

  {
    id: "database-administrator",
    name: "Database Administrator (DBA)",
    category: "Database & Data Engineering",
    description: "Ensures the availability, integrity, security, backup, and performance of enterprise database systems.",
    skills: [
      "sql", "mysql", "postgresql", "oracle", "database administration", "backup and recovery", "replication", "high availability", "linux", "security"
    ],
    tools: ["pgAdmin", "SSMS", "Percona Monitoring", "DBeaver", "Linux CLI"],
    technologies: ["PostgreSQL / Oracle / MySQL", "Linux", "Bash Scripting", "Replication & Clustering"],
    recommendedProjects: [
      {
        title: "Automated PostgreSQL Backup & Point-in-Time Recovery (PITR)",
        desc: "WAL archiving and automated backup scripts with verified zero-data-loss recovery drill.",
        tech: ["PostgreSQL", "WAL-E / pgBackRest", "Linux", "Bash"]
      }
    ],
    interviewTopics: [
      "High Availability & Disaster Recovery: Master-Slave Replication, Clustering, RPO & RTO",
      "Backup Strategies: Full, Differential, Incremental, Point-in-Time Recovery",
      "Database Security: Role-based access control, Transparent Data Encryption (TDE), Auditing",
      "Performance Bottleneck Troubleshooting: Memory allocation (Buffer pools), Lock contention"
    ],
    roadmap: [
      { step: 1, title: "Linux Administration & SQL Basics", duration: "2 Weeks", topics: ["Linux CLI", "Storage & Memory", "SQL administration commands"] },
      { step: 2, title: "Database Engine Architecture", duration: "3 Weeks", topics: ["PostgreSQL/MySQL engine architecture", "Buffer management, Write-Ahead Logs (WAL)"] },
      { step: 3, title: "Backup, Restore & Disaster Recovery", duration: "3 Weeks", topics: ["pg_dump, physical backups, Point-In-Time Recovery"] },
      { step: 4, title: "Replication & High Availability", duration: "3 Weeks", topics: ["Streaming replication, Connection poolers (PgBouncer)"] }
    ],
    learningResources: {
      "PostgreSQL DBA": [{ name: "PostgreSQL Administration Guide", url: "https://www.postgresql.org/docs/current/admin.html" }]
    },
    quickPrompts: [
      { label: "🗺️ DBA Roadmap", query: "What is the career path to become an enterprise Database Administrator?" },
      { label: "💼 DBA Interview Questions", query: "What disaster recovery and replication scenarios are tested in DBA interviews?" }
    ]
  },

  // ===================================================
  // 7. INFRASTRUCTURE & NETWORKING
  // ===================================================
  {
    id: "network-engineer",
    name: "Network Engineer",
    category: "Infrastructure & Networking",
    description: "Plans, configures, and maintains computer networks, routers, switches, VPNs, and firewall infrastructures.",
    skills: [
      "networking", "ccna", "routing and switching", "tcp/ip", "firewalls", "cisco", "linux", "python", "wireshark", "dns", "vpn"
    ],
    tools: ["Cisco Packet Tracer", "Wireshark", "GNS3", "Putty", "Linux Terminal"],
    technologies: ["Cisco IOS", "TCP/IP, OSPF, BGP", "VLANs & Trunks", "Firewalls", "Python (Netmiko)"],
    recommendedProjects: [
      {
        title: "Enterprise Multi-Site Campus Network Architecture",
        desc: "Designed and simulated network with OSPF dynamic routing, inter-VLAN routing, and ACL security policies.",
        tech: ["Cisco Packet Tracer", "OSPF", "VLANs", "ACLs"]
      }
    ],
    interviewTopics: [
      "OSI & TCP/IP Model: Detailed function of each layer and protocols",
      "Routing Protocols: OSPF (Link-State) vs BGP (Path-Vector) vs RIP",
      "Switching: Spanning Tree Protocol (STP), VLANs, Trunking (802.1Q)",
      "Network Troubleshooting: ping, traceroute, tcpdump, Wireshark analysis"
    ],
    roadmap: [
      { step: 1, title: "Network Fundamentals & IP Addressing", duration: "3 Weeks", topics: ["IPv4 & IPv6, Subnetting, OSI model"] },
      { step: 2, title: "Routing & Switching with Cisco", duration: "4 Weeks", topics: ["VLANs, STP, OSPF, Access Control Lists"] },
      { step: 3, title: "Network Services & Security", duration: "3 Weeks", topics: ["DHCP, NAT, DNS, VPN tunnels, Firewalls"] },
      { step: 4, title: "Network Automation with Python", duration: "2 Weeks", topics: ["Netmiko, Paramiko, automating switch configs"] }
    ],
    learningResources: {
      "Cisco CCNA": [{ name: "Cisco Learning Network", url: "https://learningnetwork.cisco.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Network Engineer Roadmap", query: "Give me the preparation roadmap for CCNA and Network Engineering jobs" },
      { label: "💼 Network Interview Prep", query: "What subnetting and routing questions are asked in network interviews?" }
    ]
  },

  {
    id: "system-administrator",
    name: "System Administrator",
    category: "Infrastructure & Networking",
    description: "Configures, monitors, and maintains servers, operating systems, user directories, and enterprise infrastructure.",
    skills: [
      "linux", "windows server", "active directory", "bash", "powershell", "virtualization", "networking", "security", "git"
    ],
    tools: ["Linux CLI", "PowerShell", "VMware / VirtualBox", "Active Directory", "Ansible"],
    technologies: ["Linux (Ubuntu/RHEL)", "Windows Server", "Bash / PowerShell", "Active Directory", "DNS / DHCP"],
    recommendedProjects: [
      {
        title: "Automated Linux Server Provisioning & Hardening Script",
        desc: "Bash and Ansible automation configuring SSH keys, firewall rules, user groups, and automated security patches.",
        tech: ["Linux", "Bash", "Ansible", "UFW"]
      }
    ],
    interviewTopics: [
      "Linux Administration: Boot process, Systemd services, LVM storage management",
      "User & Directory Services: Active Directory, Group Policies (GPO), LDAP",
      "Server Troubleshooting: Checking load averages, I/O wait, memory swapping, and journalctl logs"
    ],
    roadmap: [
      { step: 1, title: "Linux Operating System Mastery", duration: "3 Weeks", topics: ["Command line, users, groups, systemd"] },
      { step: 2, title: "Bash & PowerShell Automation", duration: "2 Weeks", topics: ["Scripting administrative tasks and backups"] },
      { step: 3, title: "Windows Server & Active Directory", duration: "3 Weeks", topics: ["AD DS, GPO, DNS, DHCP configuration"] }
    ],
    learningResources: {
      "Linux Admin": [{ name: "Red Hat System Administration", url: "https://www.redhat.com" }]
    },
    quickPrompts: [
      { label: "🗺️ SysAdmin Roadmap", query: "What is the roadmap to become a Linux & Windows System Administrator?" },
      { label: "💼 SysAdmin Interview QA", query: "What server troubleshooting scenarios are tested in SysAdmin interviews?" }
    ]
  },

  // ===================================================
  // 8. MOBILE DEVELOPMENT
  // ===================================================
  {
    id: "android-developer",
    name: "Android Developer",
    category: "Mobile Development",
    description: "Builds modern, native Android mobile applications using Kotlin and Jetpack Compose.",
    skills: [
      "kotlin", "android", "jetpack compose", "java", "mvvm", "retrofit", "room database", "git", "rest api", "dsa"
    ],
    tools: ["Android Studio", "Git", "Postman", "Firebase Console"],
    technologies: ["Kotlin", "Jetpack Compose", "Coroutines & Flow", "Retrofit", "Room", "Hilt (DI)"],
    recommendedProjects: [
      {
        title: "News & Audio Reader App with Jetpack Compose & Clean Architecture",
        desc: "Native app displaying paginated news articles, offline caching with Room, and audio text-to-speech player.",
        tech: ["Kotlin", "Jetpack Compose", "Coroutines", "Retrofit", "Room"]
      }
    ],
    interviewTopics: [
      "Kotlin Core: Null Safety, Coroutines & Dispatchers, Flow, Data Classes, Higher-Order Functions",
      "Android Components: Activity & Fragment Lifecycle, ViewModel, Navigation Component",
      "Jetpack Compose: Recomposition, State Hoisting, Side Effects (LaunchedEffect, remember)",
      "Architecture: Clean Architecture with MVVM, Repository Pattern, Dependency Injection with Hilt"
    ],
    roadmap: [
      { step: 1, title: "Kotlin Language Essentials", duration: "2 Weeks", topics: ["Syntax, Null Safety, Lambdas, Coroutines"] },
      { step: 2, title: "Android Fundamentals & Jetpack Compose", duration: "3 Weeks", topics: ["Compose UI, Modifiers, Layouts, Navigation"] },
      { step: 3, title: "Networking & Persistence", duration: "3 Weeks", topics: ["Retrofit API calls, Room Database, DataStore"] },
      { step: 4, title: "Architecture & Best Practices", duration: "2 Weeks", topics: ["MVVM, Hilt Dependency Injection, Clean Architecture"] },
      { step: 5, title: "Android Capstone & Play Store Launch", duration: "3 Weeks", topics: ["Publishing APK/AAB, App performance optimization"] }
    ],
    learningResources: {
      "Android Developers": [{ name: "Android Official Compose Tutorial", url: "https://developer.android.com/courses/jetpack-compose/course" }]
    },
    quickPrompts: [
      { label: "🗺️ Android Dev Roadmap", query: "Give me the modern 2026 roadmap to master Kotlin and Jetpack Compose" },
      { label: "📈 Boost ATS Score", query: "What Android libraries and architectures give top ATS scores?" },
      { label: "💼 Android Interview Questions", query: "What are the most asked Kotlin coroutines and Compose interview questions?" }
    ]
  },

  {
    id: "flutter-developer",
    name: "Flutter Developer",
    category: "Mobile Development",
    description: "Develops cross-platform mobile apps for iOS and Android from a single codebase using Dart and Flutter.",
    skills: [
      "flutter", "dart", "mobile development", "state management", "bloc", "provider", "rest api", "git", "firebase"
    ],
    tools: ["VS Code / Android Studio", "Flutter DevTools", "Git", "Firebase"],
    technologies: ["Dart", "Flutter", "BLoC / Riverpod", "Firebase", "REST APIs"],
    recommendedProjects: [
      {
        title: "Cross-Platform E-Commerce Mobile App",
        desc: "Fluid UI with custom animations, product catalog, cart state using BLoC, and Stripe payment integration.",
        tech: ["Flutter", "Dart", "BLoC", "Firebase"]
      }
    ],
    interviewTopics: [
      "Dart Concepts: Future, Streams, Isolates, Mixins",
      "Flutter Internals: Widget Tree, Element Tree, RenderObject, BuildContext",
      "State Management: BLoC pattern vs Riverpod vs Provider"
    ],
    roadmap: [
      { step: 1, title: "Dart Programming", duration: "2 Weeks", topics: ["OOP, Async programming, Streams"] },
      { step: 2, title: "Flutter Widgets & UI", duration: "3 Weeks", topics: ["Stateless vs Stateful, Custom animations, Responsive UI"] },
      { step: 3, title: "State Management (BLoC/Riverpod)", duration: "3 Weeks", topics: ["Events, States, Dependency Injection"] },
      { step: 4, title: "API & Backend Integration", duration: "2 Weeks", topics: ["Http/Dio, Local storage (Hive), Firebase"] }
    ],
    learningResources: {
      "Flutter Docs": [{ name: "Flutter Official Docs", url: "https://docs.flutter.dev" }]
    },
    quickPrompts: [
      { label: "🗺️ Flutter Roadmap", query: "What is the best roadmap to master Flutter & Dart?" },
      { label: "💼 Flutter Interview QA", query: "What state management questions are asked in Flutter interviews?" }
    ]
  },

  // ===================================================
  // 9. DESIGN & PRODUCT
  // ===================================================
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    category: "Design & Product",
    description: "Researches user needs, designs wireframes and high-fidelity interactive prototypes, and creates design systems.",
    skills: [
      "figma", "ui design", "ux research", "wireframing", "prototyping", "design systems", "user testing", "information architecture", "responsive design"
    ],
    tools: ["Figma", "FigJam", "Adobe XD", "Miro", "Notion"],
    technologies: ["Figma (Auto Layout, Components, Variants)", "Design Systems", "User Research Methods"],
    recommendedProjects: [
      {
        title: "FinTech Mobile App End-to-End Case Study",
        desc: "Complete UX design process: user interviews, persona creation, wireframing, high-fidelity Figma prototype, and usability testing.",
        tech: ["Figma", "FigJam", "UX Research"]
      }
    ],
    interviewTopics: [
      "Design Process: Double Diamond framework, User Interviews, Usability Testing",
      "UI Principles: Visual Hierarchy, Typography Scales, Color Contrast (WCAG), Spacing Systems",
      "Figma Mastery: Auto Layout, Component Variants, Interactive Components, Tokenization"
    ],
    roadmap: [
      { step: 1, title: "Design Fundamentals & Typography", duration: "2 Weeks", topics: ["Color theory, typography, spacing, visual balance"] },
      { step: 2, title: "Figma Mastery", duration: "3 Weeks", topics: ["Auto Layout, Components, Variants, Micro-interactions"] },
      { step: 3, title: "UX Research & Wireframing", duration: "3 Weeks", topics: ["User personas, journey maps, information architecture"] },
      { step: 4, title: "Design Systems & Case Studies", duration: "3 Weeks", topics: ["Building scalable design systems, writing Behance case studies"] }
    ],
    learningResources: {
      "Figma": [{ name: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design" }]
    },
    quickPrompts: [
      { label: "🗺️ UI/UX Roadmap", query: "How do I break into UI/UX Design as a beginner with a strong portfolio?" },
      { label: "📈 Boost ATS Score", query: "What UX keywords should be on a product designer resume?" }
    ]
  }
];

function getAllJobRoles() {
  return JOB_ROLES;
}

function getRoleCategories() {
  return ROLE_CATEGORIES;
}

function getRolesByCategory(category) {
  return JOB_ROLES.filter((role) => role.category === category);
}

function getJobRoleById(id) {
  if (!id) return null;
  return JOB_ROLES.find((role) => role.id === id) || null;
}

function getJobRoleByName(roleName) {
  if (!roleName || typeof roleName !== "string") {
    return JOB_ROLES[0];
  }

  const normalized = roleName.trim().toLowerCase();

  // 1. Exact ID match
  const byId = JOB_ROLES.find((r) => r.id === normalized);
  if (byId) return byId;

  // 2. Exact Name match
  const byName = JOB_ROLES.find((r) => r.name.toLowerCase() === normalized);
  if (byName) return byName;

  // 3. Exact Alias match
  const byAlias = JOB_ROLES.find((r) =>
    Array.isArray(r.aliases) && r.aliases.some((alias) => alias.toLowerCase() === normalized)
  );
  if (byAlias) return byAlias;

  // 4. Fuzzy / Partial match (including aliases)
  const partial = JOB_ROLES.find((r) => {
    const rName = r.name.toLowerCase();
    const rId = r.id.toLowerCase();
    const matchesAlias = Array.isArray(r.aliases) && r.aliases.some((a) => {
      const aLower = a.toLowerCase();
      return normalized.includes(aLower) || aLower.includes(normalized);
    });
    return (
      matchesAlias ||
      normalized.includes(rName) ||
      rName.includes(normalized) ||
      normalized.includes(rId) ||
      rId.includes(normalized)
    );
  });
  if (partial) return partial;

  // Fallback: Dynamic Custom Role Generator
  return createCustomRoleConfig(roleName);
}

function createCustomRoleConfig(customName) {
  const cleanName = typeof customName === "string" && customName.trim() ? customName.trim() : "Custom IT Role";
  return {
    id: cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: cleanName,
    category: "Other",
    description: `Specialized career path tailored for ${cleanName}.`,
    skills: [
      "programming", "dsa", "sql", "git", "problem solving", "communication", "system design", "analytical thinking"
    ],
    tools: ["Git", "GitHub", "VS Code", "Terminal"],
    technologies: ["Core Programming", "SQL", "Git"],
    recommendedProjects: [
      {
        title: `${cleanName} Capstone Project`,
        desc: `A comprehensive project highlighting core technologies and practical problem solving relevant to ${cleanName}.`,
        tech: ["Core Tech", "Git"]
      },
      {
        title: "API & Data Integration Service",
        desc: "Demonstrates database communication, backend logic, and clean modular code.",
        tech: ["SQL", "APIs"]
      }
    ],
    interviewTopics: [
      `Core Fundamentals & Best Practices for ${cleanName}`,
      "Data Structures & Problem Solving",
      "Database Design & SQL Queries",
      "System Architecture & Behavioral Rounds"
    ],
    roadmap: [
      { step: 1, title: "Computer Science & Programming Basics", duration: "2-3 Weeks", topics: ["Core programming syntax", "Data structures", "Git & GitHub"] },
      { step: 2, title: "Database & SQL Essentials", duration: "2 Weeks", topics: ["Relational databases", "Writing queries", "Schema design"] },
      { step: 3, title: `Core Technologies for ${cleanName}`, duration: "3-4 Weeks", topics: ["Domain specific frameworks", "Industry tools", "Best practices"] },
      { step: 4, title: "Intermediate & Advanced Workflows", duration: "3 Weeks", topics: ["API integration", "Performance optimization", "Automated testing"] },
      { step: 5, title: "Real-World Capstone Project", duration: "3 Weeks", topics: ["Full project build", "Documentation", "GitHub publishing"] },
      { step: 6, title: "Placement & Interview Preparation", duration: "2-3 Weeks", topics: ["Technical questions", "Resume tailoring", "Mock interviews"] }
    ],
    learningResources: {
      "General": [{ name: "Roadmap.sh", url: "https://roadmap.sh" }]
    },
    quickPrompts: [
      { label: `🗺️ ${cleanName} Roadmap`, query: `Give me a step-by-step roadmap to become a job-ready ${cleanName}` },
      { label: "📈 Boost ATS Score", query: `What key skills should I put on my resume for ${cleanName} roles?` },
      { label: "💼 Interview Preparation", query: `What technical questions are commonly asked in ${cleanName} interviews?` },
      { label: "🚀 Project Ideas", query: `What are standout portfolio projects for ${cleanName}?` }
    ]
  };
}

module.exports = {
  ROLE_CATEGORIES,
  JOB_ROLES,
  getAllJobRoles,
  getRoleCategories,
  getRolesByCategory,
  getJobRoleById,
  getJobRoleByName,
  createCustomRoleConfig,
};
