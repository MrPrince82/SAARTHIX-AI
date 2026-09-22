// =====================================================
// SAARTHIX AI - CENTRALIZED JOB ROLES REGISTRY
// Supports 30+ Computer Science & IT Job Profiles
// Open architecture: easily add new roles here
// =====================================================

export const ROLE_CATEGORIES = [
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

export const JOB_ROLES = [
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
        title: "Kanban Project Management Board",
        desc: "Trello clone featuring smooth drag-and-drop, state management, and offline local storage persistence.",
        tech: ["React", "Redux Toolkit", "Framer Motion"]
      }
    ],
    interviewTopics: [
      "Core JS: Event Bubbling/Capturing, Debouncing/Throttling, Web APIs",
      "React: Virtual DOM, Reconciliation, Custom Hooks, Performance Optimization (React.memo)",
      "CSS: CSS Grid, Flexbox, Specificity, BEM, Media Queries, Container Queries",
      "Web Vitals: LCP, FID/INP, CLS, Lazy Loading, Code Splitting",
      "TypeScript: Generics, Utility Types, Type vs Interface"
    ],
    roadmap: [
      { step: 1, title: "Modern HTML5 & Semantic Web", duration: "1 Week", topics: ["Accessibility (a11y)", "Semantic Tags", "SEO Meta Tags", "Forms & Validation"] },
      { step: 2, title: "Advanced CSS & Modern Layouts", duration: "2 Weeks", topics: ["Flexbox & Grid", "Tailwind CSS", "CSS Variables", "Animations & Transitions", "Responsive Design"] },
      { step: 3, title: "Deep Dive JavaScript (ES6+)", duration: "3 Weeks", topics: ["Asynchronous JS", "DOM & Browser APIs", "Closures & Prototypes", "Fetch API & Error Handling"] },
      { step: 4, title: "React.js Framework", duration: "3-4 Weeks", topics: ["Component Architecture", "Hooks in Depth", "State Management", "Routing", "Formik / React Hook Form"] },
      { step: 5, title: "TypeScript for Frontend", duration: "2 Weeks", topics: ["Static Typing in React", "Generics", "Interfaces & Types", "Typed Event Handlers"] },
      { step: 6, title: "Next.js & SSR/SSG", duration: "2-3 Weeks", topics: ["Server Components", "App Router", "Static Site Generation", "API Routes"] },
      { step: 7, title: "Performance & Testing", duration: "2 Weeks", topics: ["Core Web Vitals", "Jest & React Testing Library", "Lighthouse Optimization"] },
      { step: 8, title: "Portfolio Polish & Placement Prep", duration: "2-3 Weeks", topics: ["Showcase Portfolio", "Coding Challenges", "System Design (Frontend Architecture)"] }
    ],
    learningResources: {
      "Docs": [{ name: "React Docs", url: "https://react.dev" }, { name: "TypeScript Docs", url: "https://www.typescriptlang.org" }],
      "CSS": [{ name: "Tailwind CSS", url: "https://tailwindcss.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Frontend Roadmap", query: "Give me a step-by-step roadmap to become a high-earning Frontend Developer" },
      { label: "📈 Boost ATS Score", query: "What key frontend skills will help my resume pass ATS filters?" },
      { label: "💼 React Interview Prep", query: "What are the toughest React and JavaScript interview questions?" },
      { label: "🚀 UI Project Ideas", query: "What are 3 modern frontend portfolio projects that impress hiring teams?" }
    ]
  },

  {
    id: "backend-developer",
    name: "Backend Developer",
    category: "Software Development",
    description: "Architects scalable server-side systems, REST/GraphQL APIs, background workers, and databases.",
    skills: [
      "node.js", "express", "python", "sql", "postgresql", "mongodb", "redis", "docker", "rest api", "git", "microservices", "system design"
    ],
    tools: ["Postman", "Docker", "Git", "GitHub", "Redis CLI", "pgAdmin", "DBeaver"],
    technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker", "REST", "GraphQL"],
    recommendedProjects: [
      {
        title: "Scalable Authentication & RBAC Service",
        desc: "Secure microservice supporting multi-tenant JWT auth, refresh token rotation, OAuth2, and role permissions.",
        tech: ["Node.js", "Express", "Redis", "PostgreSQL"]
      },
      {
        title: "High-Throughput URL Shortener with Caching",
        desc: "System handling thousands of requests/sec with Redis caching, analytics counters, and rate limiting.",
        tech: ["Node.js", "Redis", "MongoDB", "Docker"]
      },
      {
        title: "E-Commerce Microservices Engine",
        desc: "Decoupled services for products, orders, and payments with RabbitMQ message queue synchronization.",
        tech: ["Node.js", "RabbitMQ", "PostgreSQL", "Docker"]
      }
    ],
    interviewTopics: [
      "System Design: Load Balancing, Caching Strategies (Cache-Aside, Write-Through), Database Sharding",
      "Databases: ACID vs BASE, Indexing (B-Tree, Hash), Query Optimization, Normalization",
      "API Design: REST conventions, Idempotency, Status codes, GraphQL vs REST, WebSockets",
      "Security: SQL Injection, CSRF/XSS, Rate Limiting, Password Hashing (bcrypt/argon2)",
      "Concurrency & Event Loop: Threads vs Processes, Asynchronous I/O"
    ],
    roadmap: [
      { step: 1, title: "Core Programming & Linux Basics", duration: "2 Weeks", topics: ["Node.js / Python", "Linux Terminal & Shell Scripting", "Data Structures Basics", "Git"] },
      { step: 2, title: "Relational Databases (PostgreSQL/MySQL)", duration: "2-3 Weeks", topics: ["Complex Queries", "Indexes & Execution Plans", "Foreign Keys & Constraints", "Transactions"] },
      { step: 3, title: "RESTful API Development", duration: "3 Weeks", topics: ["Express / FastAPI", "Routing & Controllers", "Middleware", "Input Validation (Zod/Joi)", "Error Handling"] },
      { step: 4, title: "Authentication & Authorization", duration: "2 Weeks", topics: ["JWT & Session Auth", "OAuth2 Basics", "Role-Based Access Control (RBAC)", "Security Best Practices"] },
      { step: 5, title: "NoSQL & Caching (MongoDB & Redis)", duration: "2 Weeks", topics: ["Document Storage", "In-Memory Caching", "Session Store", "Pub/Sub Messaging"] },
      { step: 6, title: "Docker & Containerization", duration: "2 Weeks", topics: ["Dockerfiles", "Docker Compose", "Multi-Stage Builds", "Environment Isolation"] },
      { step: 7, title: "Message Queues & Background Workers", duration: "2 Weeks", topics: ["RabbitMQ / BullMQ", "Async Task Processing", "Email & Notification Services"] },
      { step: 8, title: "System Design & Placement Prep", duration: "3-4 Weeks", topics: ["Scalability Concepts", "API Rate Limiting", "Database Partitioning", "Mock System Design Interviews"] }
    ],
    learningResources: {
      "Backend": [{ name: "Node.js Docs", url: "https://nodejs.org" }],
      "System Design": [{ name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }],
      "Database": [{ name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Backend Roadmap", query: "Give me a step-by-step roadmap to become a high-performance Backend Developer" },
      { label: "📈 Boost ATS Score", query: "What backend technologies and keywords should I highlight on my resume?" },
      { label: "💼 System Design Questions", query: "What are the most common system design and API interview questions?" },
      { label: "🚀 Backend Project Ideas", query: "What backend projects show real scalability and architectural thinking?" }
    ]
  },

  {
    id: "java-developer",
    name: "Java Developer",
    category: "Software Development",
    description: "Develops enterprise-grade backends, microservices, and robust software architectures using Java and Spring Boot.",
    skills: [
      "java", "oop", "collections", "multithreading", "jdbc", "sql", "spring boot", "hibernate", "rest api", "maven", "dsa", "git"
    ],
    tools: ["IntelliJ IDEA", "Eclipse", "Maven/Gradle", "Postman", "Git", "Docker", "MySQL Workbench"],
    technologies: ["Java 17/21", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "PostgreSQL", "Docker"],
    recommendedProjects: [
      {
        title: "Banking & Financial Ledger System",
        desc: "Enterprise Spring Boot service with transactional safety, balance transfers, audit logging, and JWT auth.",
        tech: ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL"]
      },
      {
        title: "Hospital / Clinic Management API",
        desc: "Role-based appointment scheduling system with automated email confirmations and billing generation.",
        tech: ["Java", "Spring Boot", "Hibernate", "MySQL"]
      },
      {
        title: "Student Course Registration Microservice",
        desc: "Decoupled microservice architecture with Eureka service discovery, API Gateway, and Spring Cloud.",
        tech: ["Java", "Spring Cloud", "Docker", "Maven"]
      }
    ],
    interviewTopics: [
      "Java Core: OOP Principles (Inheritance, Polymorphism, Encapsulation, Abstraction)",
      "Collections Framework: ArrayList vs LinkedList, HashMap internal working, ConcurrentHashMap",
      "Multithreading: Thread lifecycle, Synchronized blocks, volatile, ExecutorService",
      "Spring Boot: Inversion of Control (IoC), Dependency Injection, Spring Bean Lifecycle, AOP",
      "JPA & Hibernate: Entity relationships (@OneToMany, @ManyToMany), N+1 Problem, Lazy vs Eager loading"
    ],
    roadmap: [
      { step: 1, title: "Java Fundamentals & Syntax", duration: "2 Weeks", topics: ["Data Types & Operators", "Control Flow", "Methods & Arrays", "Memory Model (Stack vs Heap)"] },
      { step: 2, title: "Object-Oriented Programming (OOP)", duration: "2 Weeks", topics: ["Classes & Objects", "Inheritance & Interfaces", "Polymorphism", "Abstract Classes", "SOLID Principles"] },
      { step: 3, title: "Java Collections & Generics", duration: "2-3 Weeks", topics: ["List, Set, Map", "HashMap internal implementation", "Comparable vs Comparator", "Generics"] },
      { step: 4, title: "Exception Handling & Streams API", duration: "2 Weeks", topics: ["Try-Catch-Finally", "Custom Exceptions", "Java 8 Streams", "Lambdas & Functional Interfaces"] },
      { step: 5, title: "SQL & JDBC Database Access", duration: "2 Weeks", topics: ["Relational Database Design", "SQL Queries", "JDBC Connections", "PreparedStatements & Transactions"] },
      { step: 6, title: "Spring Boot & REST APIs", duration: "3-4 Weeks", topics: ["IoC & Dependency Injection", "Building REST Controllers", "Spring Data JPA & Hibernate", "Validation & Exceptions"] },
      { step: 7, title: "Enterprise Security & Testing", duration: "2 Weeks", topics: ["Spring Security & JWT", "JUnit 5 & Mockito Unit Tests", "Maven Build Lifecycle"] },
      { step: 8, title: "DSA in Java & Placement Prep", duration: "3-4 Weeks", topics: ["LeetCode Problem Solving in Java", "Core CS Subjects (OS, DBMS, CN)", "Mock Interviews"] }
    ],
    learningResources: {
      "Java": [{ name: "Oracle Java Docs", url: "https://docs.oracle.com/en/java/" }],
      "Spring": [{ name: "Spring Boot Guides", url: "https://spring.io/guides" }],
      "Practice": [{ name: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" }]
    },
    quickPrompts: [
      { label: "🗺️ Java Roadmap", query: "Give me a step-by-step roadmap to become a job-ready Java Developer" },
      { label: "📈 Boost ATS Score", query: "What keywords and Java certifications should I highlight on my resume?" },
      { label: "💼 Spring Boot Interview Prep", query: "What are the most common Spring Boot and Core Java interview questions?" },
      { label: "🚀 Java Project Ideas", query: "What are 3 enterprise-grade Java and Spring Boot projects for freshers?" }
    ]
  },

  {
    id: "python-developer",
    name: "Python Developer",
    category: "Software Development",
    description: "Develops clean, efficient backend systems, automation scripts, and data workflows using Python.",
    skills: [
      "python", "django", "fastapi", "flask", "sql", "postgresql", "rest api", "docker", "git", "dsa", "pytest"
    ],
    tools: ["PyCharm", "VS Code", "Postman", "Git", "Docker", "PostgreSQL"],
    technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "Redis", "Docker"],
    recommendedProjects: [
      {
        title: "High-Performance REST API with FastAPI",
        desc: "Asynchronous API with Pydantic validation, OAuth2 JWT auth, and automatic OpenAPI Swagger documentation.",
        tech: ["Python", "FastAPI", "PostgreSQL", "Docker"]
      },
      {
        title: "Automated Web Scraping & Data Pipeline",
        desc: "Resilient web crawler extracting structured data with BeautifulSoup/Scrapy and exporting to SQL.",
        tech: ["Python", "BeautifulSoup", "Pandas", "SQLite"]
      },
      {
        title: "Django Full-Featured Community Platform",
        desc: "Discussion platform with user profiles, posts, voting, comments, and admin management dashboard.",
        tech: ["Python", "Django", "PostgreSQL", "Bootstrap"]
      }
    ],
    interviewTopics: [
      "Python Core: Mutable vs Immutable, Generators vs Iterators, Decorators, GIL (Global Interpreter Lock)",
      "Data Structures: Lists, Tuples, Dictionaries, Sets, List Comprehensions",
      "Frameworks: FastAPI vs Django vs Flask, ASGI vs WSGI, Dependency Injection",
      "Databases: SQLAlchemy ORM, Django ORM, Raw SQL vs ORM performance",
      "Testing: Unit testing with pytest, Fixtures, Mocking external APIs"
    ],
    roadmap: [
      { step: 1, title: "Python Core Fundamentals", duration: "2 Weeks", topics: ["Data types, operators, loops", "Functions & Scope", "List comprehensions", "Exception handling"] },
      { step: 2, title: "OOP in Python & Advanced Concepts", duration: "2 Weeks", topics: ["Classes & Dunder methods", "Inheritance & Polymorphism", "Decorators & Generators", "Context Managers"] },
      { step: 3, title: "Databases & SQL with Python", duration: "2 Weeks", topics: ["PostgreSQL/SQLite", "SQLAlchemy ORM", "CRUD operations", "Connection pooling"] },
      { step: 4, title: "Web APIs with FastAPI / Flask", duration: "3 Weeks", topics: ["Pydantic schemas", "Async endpoints", "JWT Auth", "RESTful design", "Swagger docs"] },
      { step: 5, title: "Django Enterprise Framework", duration: "3 Weeks", topics: ["MVT Architecture", "Django Models & Migrations", "Django Admin", "Authentication"] },
      { step: 6, title: "Testing & Code Quality", duration: "1-2 Weeks", topics: ["pytest", "Unit and integration tests", "Type hinting with mypy", "PEP8 standards"] },
      { step: 7, title: "Docker & Cloud Deployment", duration: "2 Weeks", topics: ["Dockerizing Python apps", "Gunicorn / Uvicorn", "Deployment to Render/AWS"] },
      { step: 8, title: "DSA in Python & Interview Prep", duration: "3-4 Weeks", topics: ["LeetCode with Python", "System Design Basics", "Mock technical interviews"] }
    ],
    learningResources: {
      "Python": [{ name: "Official Python Docs", url: "https://docs.python.org/3/" }],
      "FastAPI": [{ name: "FastAPI Documentation", url: "https://fastapi.tiangolo.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Python Roadmap", query: "Give me a step-by-step roadmap to become a professional Python Developer" },
      { label: "📈 Boost ATS Score", query: "What Python frameworks and libraries should I put on my resume?" },
      { label: "💼 Python Interview Prep", query: "What are the most common Python and FastAPI interview questions?" },
      { label: "🚀 Python Projects", query: "What are 3 practical Python projects that look impressive on a resume?" }
    ]
  },

  {
    id: "mern-stack-developer",
    name: "MERN Stack Developer",
    category: "Software Development",
    description: "Specializes in building modern web applications using MongoDB, Express.js, React.js, and Node.js.",
    skills: [
      "javascript", "react", "node.js", "express", "mongodb", "redux", "html", "css", "rest api", "git", "jwt"
    ],
    tools: ["VS Code", "Postman", "MongoDB Compass", "Git", "GitHub", "Vercel", "Render"],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "JWT", "Tailwind CSS"],
    recommendedProjects: [
      {
        title: "Social Networking Platform",
        desc: "Full MERN app with user auth, feeds, image uploads, post likes, comments, and friend requests.",
        tech: ["MongoDB", "Express", "React", "Node.js"]
      },
      {
        title: "Learning Management System (LMS)",
        desc: "Course creation, video streaming, student progress tracking, and quiz assessment engine.",
        tech: ["React", "Node.js", "MongoDB", "Express"]
      },
      {
        title: "Food Delivery & Restaurant App",
        desc: "Real-time order placement, restaurant menu management, cart calculations, and status tracking.",
        tech: ["MERN Stack", "Redux Toolkit", "Stripe"]
      }
    ],
    interviewTopics: [
      "MERN Architecture: Client-Server communication, CORS, Environment Variables",
      "React: State Management (Redux / Context), Hooks, Custom Hooks, Performance",
      "Node/Express: Middleware, Router, Async Error Handling, Security (Helmet, CORS)",
      "MongoDB: Mongoose Schemas, Relations (populate vs embedding), Aggregations"
    ],
    roadmap: [
      { step: 1, title: "Modern HTML, CSS & Responsive Design", duration: "1-2 Weeks", topics: ["HTML5", "CSS Flexbox & Grid", "Tailwind CSS"] },
      { step: 2, title: "JavaScript Mastery", duration: "2-3 Weeks", topics: ["ES6+", "Async/Await", "Array Methods", "DOM Events"] },
      { step: 3, title: "React.js Frontend", duration: "3 Weeks", topics: ["Components", "Hooks", "React Router", "Redux Toolkit", "Axios"] },
      { step: 4, title: "Node.js & Express.js Backend", duration: "2-3 Weeks", topics: ["REST APIs", "Middleware", "JWT Authentication", "Error Handlers"] },
      { step: 5, title: "MongoDB & Mongoose", duration: "2 Weeks", topics: ["CRUD", "Schema Design", "Referencing & Populating", "Indexes"] },
      { step: 6, title: "MERN Stack Integration", duration: "2-3 Weeks", topics: ["Connecting Frontend & Backend", "Cookie / Token Auth", "File Uploads"] },
      { step: 7, title: "Full Portfolio Project", duration: "3 Weeks", topics: ["Full MERN Build", "Production Optimization", "Deployment to Vercel & Render"] },
      { step: 8, title: "Interview Prep & DSA", duration: "3 Weeks", topics: ["JavaScript Tricky Output Questions", "React Machine Coding", "HR Prep"] }
    ],
    learningResources: {
      "React": [{ name: "React Docs", url: "https://react.dev" }],
      "MongoDB": [{ name: "MongoDB Manual", url: "https://www.mongodb.com/docs/manual/" }]
    },
    quickPrompts: [
      { label: "🗺️ MERN Roadmap", query: "Give me a complete MERN stack learning roadmap for freshers" },
      { label: "📈 Boost ATS Score", query: "How to make my MERN stack resume stand out for entry-level jobs?" },
      { label: "💼 MERN Interview Prep", query: "What are the most common MERN stack interview questions?" },
      { label: "🚀 MERN Project Ideas", query: "What are 3 unique MERN projects that are not generic to-do apps?" }
    ]
  },

  {
    id: "software-engineer",
    name: "Software Engineer",
    category: "Software Development",
    description: "Solves algorithmic challenges, writes modular maintainable code, and builds scalable software products.",
    skills: [
      "dsa", "c++", "java", "python", "oop", "system design", "sql", "git", "operating systems", "dbms", "computer networks"
    ],
    tools: ["Git", "GitHub", "Linux Terminal", "VS Code", "IntelliJ IDEA", "GDB"],
    technologies: ["C++", "Java", "Python", "SQL", "Linux", "Git", "Docker"],
    recommendedProjects: [
      {
        title: "Custom In-Memory Key-Value Store",
        desc: "Fast caching server implementing Hash Map indexing, TTL expiration, and TCP socket protocol in C++ or Java.",
        tech: ["C++", "Sockets", "Concurrency"]
      },
      {
        title: "Multi-Threaded Web Server",
        desc: "HTTP/1.1 compliant server from scratch with thread pool concurrency, request routing, and file serving.",
        tech: ["Java / C++", "Threading", "Network Protocols"]
      },
      {
        title: "Distributed Task Scheduler",
        desc: "Priority-based background job queue handling concurrent task scheduling, retries, and worker threads.",
        tech: ["Python / Java", "Multithreading", "Data Structures"]
      }
    ],
    interviewTopics: [
      "Data Structures: Hash Tables, Binary Search Trees, Heaps, Graphs, Tries",
      "Algorithms: Binary Search, Sliding Window, Two Pointers, BFS/DFS, Dynamic Programming",
      "Core CS: OS (Process vs Thread, Deadlocks, Paging), DBMS (Indexing, Transactions), CN (TCP vs UDP, OSI)",
      "Low Level Design: SOLID Principles, Factory, Singleton, Observer Design Patterns"
    ],
    roadmap: [
      { step: 1, title: "Core Language Mastery (C++ / Java)", duration: "3 Weeks", topics: ["Syntax, Pointers/References", "Memory Allocation", "STL / Collections Framework"] },
      { step: 2, title: "Object-Oriented Design & SOLID", duration: "2 Weeks", topics: ["Encapsulation, Polymorphism", "Design Patterns", "Clean Code Best Practices"] },
      { step: 3, title: "Essential Data Structures", duration: "4 Weeks", topics: ["Arrays, Strings, Linked Lists", "Stacks & Queues", "Trees & Binary Search Trees"] },
      { step: 4, title: "Advanced Algorithms", duration: "4 Weeks", topics: ["Recursion & Backtracking", "Sorting & Searching", "Graphs (BFS/DFS/Dijkstra)", "Dynamic Programming"] },
      { step: 5, title: "Core CS Fundamentals", duration: "3 Weeks", topics: ["Operating Systems Concepts", "Database Management Systems (DBMS)", "Computer Networks"] },
      { step: 6, title: "Systems Programming Project", duration: "3 Weeks", topics: ["Build a multi-threaded system or custom database engine from scratch"] },
      { step: 7, title: "Low Level & High Level Design", duration: "2 Weeks", topics: ["Object-Oriented Design Scenarios", "Basic Scalability Concepts", "API Design"] },
      { step: 8, title: "Coding Rounds & Placement Prep", duration: "4 Weeks", topics: ["LeetCode 150 Blind List", "Company Coding Round Simulations", "HR Preparation"] }
    ],
    learningResources: {
      "DSA": [{ name: "NeetCode", url: "https://neetcode.io" }, { name: "LeetCode", url: "https://leetcode.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Software Engineer Roadmap", query: "Give me a step-by-step roadmap to crack top Software Engineering roles" },
      { label: "📈 Boost ATS Score", query: "What technical keywords and metrics should a Software Engineer put on their resume?" },
      { label: "💼 DSA & Technical Rounds", query: "What are the most crucial DSA patterns to master for technical rounds?" },
      { label: "🚀 Systems Projects", query: "What projects prove strong engineering fundamentals and problem-solving?" }
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
    description: "Leverages statistical modeling, machine learning, and data analytics to solve complex predictive problems.",
    skills: [
      "python", "machine learning", "statistics", "sql", "pandas", "numpy", "scikit-learn", "data visualization", "deep learning", "nlp"
    ],
    tools: ["Jupyter Notebook", "Google Colab", "Git", "VS Code", "PostgreSQL", "Tableau"],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "TensorFlow/PyTorch", "SQL", "Statsmodels"],
    recommendedProjects: [
      {
        title: "Predictive Customer Lifetime Value (CLV)",
        desc: "Supervised ML regression model predicting revenue potential from historical customer transaction records.",
        tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"]
      },
      {
        title: "Sentiment & Topic Modeling on Product Reviews",
        desc: "NLP pipeline using TF-IDF and BERT embeddings to categorize customer feedback and sentiment scores.",
        tech: ["Python", "NLTK/Transformers", "Scikit-Learn"]
      },
      {
        title: "Credit Card Fraud Detection System",
        desc: "Classification model resolving imbalanced data using SMOTE, Random Forest, and XGBoost with high precision.",
        tech: ["Python", "XGBoost", "Imbalanced-learn", "Seaborn"]
      }
    ],
    interviewTopics: [
      "Machine Learning: Bias-Variance Tradeoff, Overfitting/Underfitting, Regularization (L1/L2)",
      "Algorithms: Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost, K-Means Clustering",
      "Evaluation Metrics: Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix, RMSE",
      "Math: Linear Algebra, Multivariable Calculus, Probability Distributions, Central Limit Theorem",
      "Feature Engineering: Handling Outliers, One-Hot Encoding, Scaling (StandardScaler vs MinMaxScaler)"
    ],
    roadmap: [
      { step: 1, title: "Math & Statistical Foundations", duration: "2-3 Weeks", topics: ["Linear Algebra", "Calculus Essentials", "Probability Distributions", "Hypothesis Testing"] },
      { step: 2, title: "Python & Data Wrangling", duration: "2-3 Weeks", topics: ["NumPy & Pandas Mastery", "Data Cleaning", "Feature Engineering", "Data Visualization"] },
      { step: 3, title: "SQL for Advanced Data Extraction", duration: "2 Weeks", topics: ["Complex Queries", "Window Functions", "Aggregations for ML Datasets"] },
      { step: 4, title: "Supervised Machine Learning", duration: "3-4 Weeks", topics: ["Regression & Classification", "Scikit-Learn", "Model Evaluation & Hyperparameter Tuning"] },
      { step: 5, title: "Unsupervised Learning & Ensemble Methods", duration: "2-3 Weeks", topics: ["K-Means & PCA", "Random Forests & Gradient Boosting (XGBoost)"] },
      { step: 6, title: "Introduction to Deep Learning & NLP", duration: "3 Weeks", topics: ["Neural Networks Basics", "PyTorch / TensorFlow", "NLP & Text Processing"] },
      { step: 7, title: "End-to-End ML Pipeline & Deployment", duration: "2-3 Weeks", topics: ["Model Serialization (Pickle/Joblib)", "FastAPI Model Serving", "Streamlit UI"] },
      { step: 8, title: "Case Studies & Technical Interviews", duration: "3 Weeks", topics: ["ML System Design Scenarios", "Coding Challenges", "Resume Walkthrough"] }
    ],
    learningResources: {
      "ML": [{ name: "Scikit-Learn Docs", url: "https://scikit-learn.org" }],
      "Courses": [{ name: "StatQuest Machine Learning", url: "https://statquest.org" }]
    },
    quickPrompts: [
      { label: "🗺️ Data Scientist Roadmap", query: "Give me a step-by-step roadmap to become a successful Data Scientist" },
      { label: "📈 Boost ATS Score", query: "What modeling and math skills should I include on my Data Science resume?" },
      { label: "💼 ML Interview Questions", query: "What are the most common statistical and ML questions in Data Science interviews?" },
      { label: "🚀 Real-World Projects", query: "What are 3 end-to-end predictive modeling projects that impress recruiters?" }
    ]
  },

  {
    id: "machine-learning-engineer",
    name: "Machine Learning Engineer",
    category: "Data & AI",
    description: "Builds, trains, optimizes, and deploys production machine learning models and scalable inference pipelines.",
    skills: [
      "python", "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "docker", "mlops", "fastapi", "dsa", "git"
    ],
    tools: ["PyTorch", "TensorFlow", "Docker", "MLflow", "Git", "Google Colab", "Weights & Biases"],
    technologies: ["Python", "PyTorch", "TensorFlow", "FastAPI", "Docker", "Scikit-Learn", "ONNX"],
    recommendedProjects: [
      {
        title: "Real-Time Object Detection & Tracking API",
        desc: "YOLO computer vision pipeline with FastAPI inference endpoint packaged inside Docker container.",
        tech: ["Python", "PyTorch", "OpenCV", "FastAPI", "Docker"]
      },
      {
        title: "Production RAG (Retrieval-Augmented Generation) System",
        desc: "Document question-answering system using LangChain, Vector Embeddings (ChromaDB), and an LLM.",
        tech: ["Python", "LangChain", "ChromaDB", "HuggingFace"]
      },
      {
        title: "End-to-End MLOps Pipeline with Model Monitoring",
        desc: "Automated training, model registry (MLflow), data drift detection, and CI/CD deployment pipeline.",
        tech: ["Python", "MLflow", "Docker", "GitHub Actions"]
      }
    ],
    interviewTopics: [
      "Deep Learning: Backpropagation, Gradient Descent Variants (Adam, SGD), Activation Functions, Attention Mechanism",
      "Model Deployment: Serving via FastAPI, Model Quantization, ONNX Runtime, Batch vs Real-Time Inference",
      "MLOps: Model Drift, Data Validation, Feature Stores, Experiment Tracking (MLflow/W&B)",
      "System Design: Designing a Recommendation System, Search Ranking, or Video Feed Engine"
    ],
    roadmap: [
      { step: 1, title: "Python, Math & Vectorized Computing", duration: "3 Weeks", topics: ["Linear Algebra & Matrix Operations", "Calculus & Optimization", "NumPy & SciPy"] },
      { step: 2, title: "Classical Machine Learning", duration: "3 Weeks", topics: ["Supervised & Unsupervised Algorithms", "Feature Engineering", "Scikit-Learn Mastery"] },
      { step: 3, title: "Deep Learning with PyTorch", duration: "4 Weeks", topics: ["Tensors & Autograd", "ANNs, CNNs, and RNNs", "Transfer Learning & Fine-Tuning"] },
      { step: 4, title: "Transformers & Modern NLP/Vision", duration: "3 Weeks", topics: ["Attention Mechanism", "HuggingFace Transformers", "Embeddings & Vector Databases"] },
      { step: 5, title: "Model Serving & API Development", duration: "2-3 Weeks", topics: ["FastAPI Model Wrapping", "Docker Containerization", "Asynchronous Inference"] },
      { step: 6, title: "MLOps & Pipeline Engineering", duration: "3 Weeks", topics: ["MLflow Experiment Tracking", "Model Registry", "CI/CD for ML Models", "Monitoring Drift"] },
      { step: 7, title: "Production Capstone Project", duration: "3 Weeks", topics: ["End-to-End Deployed Vision or LLM Application on Cloud"] },
      { step: 8, title: "ML System Design & Interview Prep", duration: "3-4 Weeks", topics: ["ML System Design Scenarios", "Coding Challenges", "Mock Interviews"] }
    ],
    learningResources: {
      "PyTorch": [{ name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" }],
      "HuggingFace": [{ name: "HuggingFace Learn", url: "https://huggingface.co/learn" }]
    },
    quickPrompts: [
      { label: "🗺️ ML Engineer Roadmap", query: "Give me a step-by-step roadmap to become a Machine Learning Engineer" },
      { label: "📈 Boost ATS Score", query: "What MLOps and deep learning skills make an ML resume stand out?" },
      { label: "💼 ML System Design", query: "How to prepare for Machine Learning System Design interview rounds?" },
      { label: "🚀 MLOps Project Ideas", query: "What production-grade ML projects should I build to show deployment skills?" }
    ]
  },

  {
    id: "ai-engineer",
    name: "AI Engineer",
    category: "Data & AI",
    description: "Builds intelligent software powered by Generative AI, Large Language Models (LLMs), RAG, and AI agents.",
    skills: [
      "python", "generative ai", "llms", "rag", "langchain", "prompt engineering", "vector databases", "fastapi", "docker", "git"
    ],
    tools: ["OpenAI API", "HuggingFace", "LangChain", "LlamaIndex", "ChromaDB/Pinecone", "Docker", "Git"],
    technologies: ["Python", "LangChain", "LlamaIndex", "ChromaDB", "FastAPI", "Docker", "OpenAI / Anthropic APIs"],
    recommendedProjects: [
      {
        title: "Enterprise Knowledge Base RAG Assistant",
        desc: "Chat with enterprise PDF/documents using semantic chunking, vector search, and hallucination guardrails.",
        tech: ["Python", "LangChain", "ChromaDB", "FastAPI"]
      },
      {
        title: "Autonomous Multi-Agent Task Orchestrator",
        desc: "AI agent system with tool-calling capabilities (web search, calculator, code execution) to fulfill complex workflows.",
        tech: ["Python", "LangGraph", "OpenAI API", "Streamlit"]
      },
      {
        title: "AI-Powered Code Review & Bug Analysis Bot",
        desc: "GitHub webhook bot that parses pull request diffs, checks code security, and suggests automated refactors.",
        tech: ["Python", "FastAPI", "GitHub API", "LLM APIs"]
      }
    ],
    interviewTopics: [
      "LLM Fundamentals: Context Window, Tokenization, Hallucinations, Temperature, Top-p",
      "RAG Architecture: Chunking strategies, Embedding models, Hybrid search (Keyword + Semantic), Re-ranking",
      "AI Agents: Tool calling, ReAct framework, Planning and Memory architectures",
      "Fine-Tuning: LoRA, QLoRA, PEFT vs RAG tradeoffs",
      "Safety & Evaluation: Guardrails, Prompt Injection mitigation, RAGAS evaluation metrics"
    ],
    roadmap: [
      { step: 1, title: "Python & Modern Software Engineering", duration: "2 Weeks", topics: ["Python Advanced", "FastAPI", "Async Programming", "Git & Docker"] },
      { step: 2, title: "LLM Fundamentals & Prompt Engineering", duration: "2 Weeks", topics: ["OpenAI / Open-Source LLMs", "Few-Shot Prompting", "Chain-of-Thought", "Structured Outputs"] },
      { step: 3, title: "Embeddings & Vector Databases", duration: "2 Weeks", topics: ["Embedding Models", "ChromaDB / Pinecone", "Similarity Metrics (Cosine, Dot Product)", "Indexing"] },
      { step: 4, title: "Building Robust RAG Systems", duration: "3 Weeks", topics: ["Chunking Techniques", "Document Loaders", "Re-ranking", "Evaluation with RAGAS"] },
      { step: 5, title: "AI Frameworks (LangChain & LlamaIndex)", duration: "3 Weeks", topics: ["Chains & Prompts", "Output Parsers", "Memory Management", "Document Retrieval"] },
      { step: 6, title: "AI Agents & Autonomous Workflows", duration: "3 Weeks", topics: ["Tool Use & Function Calling", "LangGraph / CrewAI", "Multi-Agent Collaboration"] },
      { step: 7, title: "Production AI Deployment & Guardrails", duration: "2-3 Weeks", topics: ["Latency Optimization & Streaming", "Rate Limiting", "NeMo Guardrails / Llama Guard"] },
      { step: 8, title: "Portfolio Showcase & Interview Prep", duration: "3 Weeks", topics: ["Live AI Agent Showcase", "System Architecture Questions", "Behavioral Rounds"] }
    ],
    learningResources: {
      "LangChain": [{ name: "LangChain Documentation", url: "https://python.langchain.com" }],
      "DeepLearning.AI": [{ name: "Short Courses", url: "https://www.deeplearning.ai/short-courses/" }]
    },
    quickPrompts: [
      { label: "🗺️ AI Engineer Roadmap", query: "Give me a step-by-step roadmap to become a Generative AI and LLM Engineer" },
      { label: "📈 Boost ATS Score", query: "What AI and LLM engineering terms should I highlight on my resume?" },
      { label: "💼 GenAI Interview Questions", query: "What are the most common technical questions asked in AI Engineer interviews?" },
      { label: "🚀 AI Agent Projects", query: "What are 3 cutting-edge AI Agent or RAG projects that show deep expertise?" }
    ]
  },

  // ===================================================
  // 3. CLOUD & DEVOPS
  // ===================================================
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    category: "Cloud & DevOps",
    description: "Automates deployment pipelines, manages cloud infrastructure, and ensures system reliability and scalability.",
    skills: [
      "linux", "docker", "kubernetes", "ci/cd", "jenkins", "github actions", "terraform", "aws", "git", "bash", "monitoring", "ansible"
    ],
    tools: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "AWS Console", "Prometheus", "Grafana", "Linux"],
    technologies: ["Docker", "Kubernetes", "Terraform", "AWS", "Bash", "Prometheus", "Grafana", "Helm"],
    recommendedProjects: [
      {
        title: "Automated Multi-Stage CI/CD Pipeline",
        desc: "GitHub Actions pipeline that builds, tests, scans (SonarQube), and deploys microservices to Kubernetes.",
        tech: ["GitHub Actions", "Docker", "Kubernetes", "Helm"]
      },
      {
        title: "Infrastructure as Code (IaC) with Terraform",
        desc: "Modular Terraform scripts provisioning complete AWS VPC, Subnets, Security Groups, and ECS clusters.",
        tech: ["Terraform", "AWS", "IaC"]
      },
      {
        title: "Observability Stack with Prometheus & Grafana",
        desc: "Production monitoring system tracking container metrics, cluster health, and alert notifications via Slack.",
        tech: ["Prometheus", "Grafana", "Docker", "Alertmanager"]
      }
    ],
    interviewTopics: [
      "Linux: Process management, Permissions, Networking commands (netstat, curl, iptables), Shell scripting",
      "Docker: Container vs VM, Multi-stage builds, Layer caching, Networking modes",
      "Kubernetes: Pods, Deployments, Services (ClusterIP, NodePort, LoadBalancer), Ingress, ConfigMaps, Secrets",
      "CI/CD: Blue/Green vs Canary deployments, Pipeline triggers, Artifact storage",
      "IaC: Terraform State management, Modules, Drift detection, Terraform plan vs apply"
    ],
    roadmap: [
      { step: 1, title: "Linux Administration & Bash Scripting", duration: "2-3 Weeks", topics: ["File Systems & Permissions", "Process Management", "Networking Basics", "Bash Scripting"] },
      { step: 2, title: "Git & Version Control Workflows", duration: "1 Week", topics: ["Git branching strategies", "Merge vs Rebase", "Pull request automation"] },
      { step: 3, title: "Docker Containerization", duration: "2-3 Weeks", topics: ["Docker Architecture", "Optimizing Dockerfiles", "Docker Compose", "Multi-Stage Builds"] },
      { step: 4, title: "CI/CD Pipeline Automation", duration: "3 Weeks", topics: ["GitHub Actions", "Jenkins Pipelines", "Automated Testing Integration", "Image Registry Push"] },
      { step: 5, title: "Cloud Fundamentals (AWS / Azure)", duration: "3 Weeks", topics: ["EC2, S3, IAM, VPC", "Serverless Basics", "Security Groups & CloudWatch"] },
      { step: 6, title: "Kubernetes Container Orchestration", duration: "4 Weeks", topics: ["Cluster Architecture", "Deployments & Services", "Ingress Controllers", "Helm Charts"] },
      { step: 7, title: "Infrastructure as Code (Terraform)", duration: "2-3 Weeks", topics: ["HCL Syntax", "Terraform Providers", "State Management", "Modular Architecture"] },
      { step: 8, title: "Monitoring & Incident Response", duration: "2-3 Weeks", topics: ["Prometheus Metrics", "Grafana Dashboards", "Log Aggregation (ELK/Loki)", "Interview Prep"] }
    ],
    learningResources: {
      "Docker": [{ name: "Docker Docs", url: "https://docs.docker.com" }],
      "Kubernetes": [{ name: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }],
      "Terraform": [{ name: "HashiCorp Learn", url: "https://developer.hashicorp.com/terraform/tutorials" }]
    },
    quickPrompts: [
      { label: "🗺️ DevOps Roadmap", query: "Give me a step-by-step roadmap to become a certified DevOps Engineer" },
      { label: "📈 Boost ATS Score", query: "What DevOps and Cloud tools will make my resume stand out to recruiters?" },
      { label: "💼 Docker & K8s Interview", query: "What are the most common Docker and Kubernetes interview questions?" },
      { label: "🚀 DevOps Projects", query: "What are 3 end-to-end CI/CD and cloud automation projects to build?" }
    ]
  },

  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    category: "Cloud & DevOps",
    description: "Designs, provisions, and maintains reliable, cost-effective cloud architectures on AWS, Azure, or GCP.",
    skills: [
      "aws", "azure", "cloud architecture", "linux", "networking", "terraform", "docker", "iam", "serverless", "python", "git"
    ],
    tools: ["AWS Management Console", "Azure Portal", "Terraform", "AWS CLI", "Docker", "Git"],
    technologies: ["AWS (EC2, S3, RDS, Lambda)", "Azure", "Terraform", "Docker", "Python", "Linux"],
    recommendedProjects: [
      {
        title: "Serverless Event-Driven Processing System",
        desc: "Cloud-native pipeline using AWS Lambda, S3 triggers, and DynamoDB for automated document processing.",
        tech: ["AWS Lambda", "S3", "DynamoDB", "Python"]
      },
      {
        title: "High-Availability Multi-Tier Cloud Architecture",
        desc: "Auto-scaling web architecture with Application Load Balancer, Multi-AZ RDS, and CloudFront CDN.",
        tech: ["AWS VPC", "EC2", "RDS", "CloudFront"]
      },
      {
        title: "Secure Hybrid Cloud Network with Terraform",
        desc: "Automated provisioning of interconnected VPC peering, NAT gateways, and least-privilege IAM policies.",
        tech: ["Terraform", "AWS VPC", "IAM"]
      }
    ],
    interviewTopics: [
      "Cloud Architecture: High Availability, Fault Tolerance, Disaster Recovery (RTO/RPO)",
      "Networking: VPC, Subnets (Public vs Private), Route Tables, Internet Gateways, NAT Gateways, CIDR",
      "Storage: Block (EBS) vs Object (S3) vs File (EFS), S3 Storage Tiers and Lifecycle Rules",
      "Security: IAM Policies, Roles vs Users, Security Groups vs NACLs, KMS Encryption",
      "Compute: EC2 instances, Containers (ECS/EKS), Serverless (Lambda)"
    ],
    roadmap: [
      { step: 1, title: "Networking & Linux Fundamentals", duration: "2 Weeks", topics: ["IP Addressing & Subnetting", "DNS, HTTP/HTTPS", "Linux Command Line", "SSH"] },
      { step: 2, title: "Cloud Concepts & Providers (AWS/Azure)", duration: "2 Weeks", topics: ["IaaS vs PaaS vs SaaS", "Regions & Availability Zones", "Cloud Economics"] },
      { step: 3, title: "Virtual Private Cloud (VPC) & Networking", duration: "3 Weeks", topics: ["VPC Design", "Subnets, Gateways, Route Tables", "Security Groups & NACLs"] },
      { step: 4, title: "Compute & Scalability (EC2, Auto-Scaling)", duration: "2-3 Weeks", topics: ["EC2 Instance Types", "Elastic Load Balancing (ELB)", "Auto Scaling Groups"] },
      { step: 5, title: "Storage & Databases (S3, RDS, DynamoDB)", duration: "2 Weeks", topics: ["S3 Buckets & Policies", "Relational RDS vs NoSQL", "Backup & Snapshots"] },
      { step: 6, title: "Identity & Access Management (IAM)", duration: "2 Weeks", topics: ["IAM Users, Groups, Roles", "JSON Policy Documents", "Multi-Factor Authentication"] },
      { step: 7, title: "Serverless & Infrastructure as Code", duration: "3 Weeks", topics: ["AWS Lambda & API Gateway", "Terraform Cloud Provisioning"] },
      { step: 8, title: "Certification & Placement Prep", duration: "3 Weeks", topics: ["AWS Solutions Architect Practice", "Cloud Architecture Interviews", "Resume Polish"] }
    ],
    learningResources: {
      "AWS": [{ name: "AWS Skill Builder", url: "https://explore.skillbuilder.aws" }],
      "Terraform": [{ name: "Terraform Docs", url: "https://www.terraform.io" }]
    },
    quickPrompts: [
      { label: "🗺️ Cloud Engineer Roadmap", query: "Give me a step-by-step roadmap to become an AWS/Azure Cloud Engineer" },
      { label: "📈 Boost ATS Score", query: "What cloud services and certifications will get my resume noticed?" },
      { label: "💼 Cloud Architecture Questions", query: "What are the most common VPC and cloud architecture interview questions?" },
      { label: "🚀 Cloud Projects", query: "What are 3 standout AWS/Azure projects to showcase on GitHub?" }
    ]
  },

  // ===================================================
  // 4. CYBERSECURITY
  // ===================================================
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    category: "Cybersecurity",
    description: "Monitors, detects, investigates, and responds to security incidents and vulnerabilities across enterprise networks.",
    skills: [
      "networking", "linux", "siem", "wireshark", "incident response", "vulnerability assessment", "cryptography", "python", "firewalls", "soc"
    ],
    tools: ["Wireshark", "Nmap", "Splunk", "Metasploit", "Burp Suite", "Kali Linux", "Snort"],
    technologies: ["Linux", "TCP/IP", "Splunk", "Wireshark", "Nmap", "Python", "Snort", "Suricata"],
    recommendedProjects: [
      {
        title: "Home Security Lab with SIEM & Log Monitoring",
        desc: "Configured Kali Linux, victim VM, and Splunk SIEM to detect live brute-force and port scanning attacks.",
        tech: ["Splunk", "Kali Linux", "Sysmon", "Networking"]
      },
      {
        title: "Network Packet Analysis & Intrusion Detection",
        desc: "Captured and analyzed network traffic with Wireshark and Snort IDS rules to detect malicious payloads.",
        tech: ["Wireshark", "Snort", "TCP/IP"]
      },
      {
        title: "Automated Vulnerability Scanner Script",
        desc: "Python security script scanning network endpoints, checking open ports, and querying CVE databases.",
        tech: ["Python", "Nmap", "CVE API"]
      }
    ],
    interviewTopics: [
      "Networking: OSI 7 Layers, TCP 3-Way Handshake, DNS, DHCP, ARP Poisoning, SYN Flood",
      "Security Concepts: CIA Triad, Defense-in-Depth, Zero Trust Architecture, Principle of Least Privilege",
      "Attacks: Phishing, Man-in-the-Middle (MitM), SQL Injection, Cross-Site Scripting (XSS), Ransomware",
      "Incident Response: NIST Incident Response Lifecycle (Preparation, Detection, Containment, Eradication, Recovery)",
      "Cryptography: Symmetric (AES) vs Asymmetric (RSA), Hashing (SHA-256), PKI, TLS Handshake"
    ],
    roadmap: [
      { step: 1, title: "Computer Networks & Protocols", duration: "3 Weeks", topics: ["OSI & TCP/IP Models", "IP, TCP, UDP, ICMP", "DNS, HTTP/S, SSH", "Packet Analysis with Wireshark"] },
      { step: 2, title: "Linux & Operating System Security", duration: "2-3 Weeks", topics: ["Linux Command Line", "User & Group Permissions", "Process Monitoring", "System Logs (/var/log)"] },
      { step: 3, title: "Core Cybersecurity Fundamentals", duration: "2 Weeks", topics: ["CIA Triad & Security Frameworks", "Threat Actors & Vectors", "Access Controls & Authentication"] },
      { step: 4, title: "Network Defense & Firewalls", duration: "2 Weeks", topics: ["Firewall Rules & DMZ", "Intrusion Detection/Prevention (IDS/IPS)", "VPNs & Secure Tunnels"] },
      { step: 5, title: "Security Operations & SIEM (Splunk)", duration: "3 Weeks", topics: ["Log Aggregation", "Writing Splunk Queries", "Creating Alerting Rules", "SOC Workflows"] },
      { step: 6, title: "Vulnerability Assessment & Scanning", duration: "2 Weeks", topics: ["Nmap Network Scanning", "Nessus / OpenVAS", "CVE Analysis", "Risk Remediation"] },
      { step: 7, title: "Incident Handling & Cryptography", duration: "2 Weeks", topics: ["NIST Incident Response Steps", "Symmetric & Asymmetric Encryption", "Hashing & Certificates"] },
      { step: 8, title: "Certifications & Placement Prep", duration: "3 Weeks", topics: ["CompTIA Security+ Prep", "Scenario-based Security Interviews", "Resume Polish"] }
    ],
    learningResources: {
      "Practice": [{ name: "TryHackMe", url: "https://tryhackme.com" }, { name: "Hack The Box", url: "https://www.hackthebox.com" }],
      "Learning": [{ name: "Professor Messer Security+", url: "https://www.professormesser.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Cybersecurity Roadmap", query: "Give me a step-by-step roadmap to become a Cybersecurity Analyst (SOC)" },
      { label: "📈 Boost ATS Score", query: "What security tools and certifications will boost my resume for entry-level SOC roles?" },
      { label: "💼 Security Interview Prep", query: "What are the most common networking and security incident interview questions?" },
      { label: "🚀 Security Lab Projects", query: "What home lab security projects should I build and document on my resume?" }
    ]
  },

  // ===================================================
  // 5. TESTING & QA
  // ===================================================
  {
    id: "qa-engineer",
    name: "QA Engineer",
    category: "Testing & QA",
    description: "Ensures software quality, creates comprehensive test strategies, and automates testing across applications.",
    skills: [
      "manual testing", "selenium", "java", "python", "test automation", "postman", "api testing", "sql", "jira", "git", "testng"
    ],
    tools: ["Selenium WebDriver", "Postman", "Jira", "TestNG", "Git", "Jenkins", "Cucumber"],
    technologies: ["Selenium", "Java / Python", "Postman", "TestNG", "JUnit", "SQL", "Cucumber (BDD)"],
    recommendedProjects: [
      {
        title: "Automated E-Commerce End-to-End Test Suite",
        desc: "Selenium Java/Python automation framework using Page Object Model (POM) with automated HTML reporting.",
        tech: ["Selenium", "TestNG", "Java", "ExtentReports"]
      },
      {
        title: "Comprehensive REST API Automation Framework",
        desc: "Automated Postman & RestAssured regression test suite verifying status codes, payloads, and response times.",
        tech: ["RestAssured", "Postman", "Java", "JSON"]
      },
      {
        title: "BDD Automation Framework with Cucumber",
        desc: "Behavior-Driven Development test suite with Gherkin feature files testing real user login and checkout flows.",
        tech: ["Cucumber", "Selenium", "Java", "Maven"]
      }
    ],
    interviewTopics: [
      "Testing Fundamentals: Black Box vs White Box, Regression vs Retesting, Smoke vs Sanity Testing",
      "Defect Lifecycle: Bug States (New, Assigned, Open, Fixed, Retest, Verified, Closed), Severity vs Priority",
      "Automation: Page Object Model (POM), Locators (XPath vs CSS Selector), Implicit vs Explicit Waits",
      "API Testing: HTTP Methods, Status Codes (200, 201, 400, 401, 403, 404, 500), Authentication Testing",
      "Database Testing: SQL queries to verify data integrity and backend record creation"
    ],
    roadmap: [
      { step: 1, title: "Software Testing Fundamentals (Manual)", duration: "2 Weeks", topics: ["SDLC & STLC Models", "Test Case Writing", "Defect Reporting in Jira", "Test Scenarios"] },
      { step: 2, title: "Programming for Automation (Java / Python)", duration: "3 Weeks", topics: ["Core Syntax & OOP", "Exception Handling", "Collections", "File I/O"] },
      { step: 3, title: "Selenium WebDriver Essentials", duration: "3 Weeks", topics: ["Locators & Selectors", "Handling WebElements, Dropdowns, Alerts", "Explicit & Fluent Waits"] },
      { step: 4, title: "Test Frameworks (TestNG / PyTest)", duration: "2 Weeks", topics: ["Annotations & Assertions", "Data Providers & Parallel Execution", "HTML Test Reporting"] },
      { step: 5, title: "Page Object Model (POM) Architecture", duration: "2 Weeks", topics: ["Framework Design", "Reusable Helper Functions", "Configuration Management"] },
      { step: 6, title: "API Testing & Automation (Postman / RestAssured)", duration: "2-3 Weeks", topics: ["API Basics & JSON", "Postman Collections & Tests", "RestAssured Automation"] },
      { step: 7, title: "CI/CD Integration & BD (Cucumber)", duration: "2 Weeks", topics: ["Cucumber Gherkin", "Running Tests in Jenkins/GitHub Actions"] },
      { step: 8, title: "Mock Testing & Placement Preparation", duration: "2-3 Weeks", topics: ["Live Automation Coding", "Manual Scenario Questions", "Resume Polish"] }
    ],
    learningResources: {
      "Selenium": [{ name: "Selenium Dev Docs", url: "https://www.selenium.dev/documentation/" }],
      "Testing": [{ name: "Guru99 QA Tutorial", url: "https://www.guru99.com/software-testing.html" }]
    },
    quickPrompts: [
      { label: "🗺️ QA Engineer Roadmap", query: "Give me a step-by-step roadmap to become an Automation QA Engineer" },
      { label: "📈 Boost ATS Score", query: "What automation tools and testing skills should I emphasize on my QA resume?" },
      { label: "💼 Selenium & QA Interviews", query: "What are the most common Selenium and manual testing interview questions?" },
      { label: "🚀 QA Framework Projects", query: "What kind of test automation frameworks impress QA hiring managers?" }
    ]
  },

  // ===================================================
  // 6. DATABASE
  // ===================================================
  {
    id: "sql-developer",
    name: "SQL Developer",
    category: "Database & Data Engineering",
    description: "Designs, optimizes, and writes complex database schemas, stored procedures, and ETL pipelines.",
    skills: [
      "sql", "postgresql", "mysql", "database design", "stored procedures", "indexing", "etl", "performance tuning", "git", "python"
    ],
    tools: ["PostgreSQL", "MySQL Workbench", "DBeaver", "pgAdmin", "Git", "SSMS"],
    technologies: ["SQL", "PL/SQL", "PostgreSQL", "MySQL", "T-SQL", "Python"],
    recommendedProjects: [
      {
        title: "Enterprise Inventory & Order Database Schema",
        desc: "Third normal form (3NF) relational database with triggers, stored procedures, and audit trail tables.",
        tech: ["PostgreSQL", "PL/pgSQL", "Triggers"]
      },
      {
        title: "Automated ETL Pipeline for Financial Reports",
        desc: "Python script extracting transactional data from APIs, transforming schemas, and loading into data warehouse.",
        tech: ["Python", "SQL", "Pandas", "PostgreSQL"]
      },
      {
        title: "Database Performance Tuning & Index Optimization",
        desc: "Benchmarked high-volume database queries, resolving slow joins with B-Tree indexes and execution plan refactoring.",
        tech: ["MySQL", "Query Optimization", "EXPLAIN ANALYZE"]
      }
    ],
    interviewTopics: [
      "SQL Mastery: Window Functions, CTEs, Recursive Queries, Subqueries vs Joins",
      "Database Design: 1NF, 2NF, 3NF, BCNF Normalization vs Denormalization tradeoffs",
      "Performance: Clustered vs Non-Clustered Indexes, Index Fragmentation, EXPLAIN Plans",
      "Transactions: ACID Properties, Transaction Isolation Levels, Deadlock Prevention",
      "Programmability: Stored Procedures, Functions, Triggers, Views vs Materialized Views"
    ],
    roadmap: [
      { step: 1, title: "Relational Database Concepts", duration: "2 Weeks", topics: ["Data Modeling", "Entities & Relationships (ERD)", "Keys & Constraints"] },
      { step: 2, title: "Core & Intermediate SQL", duration: "2 Weeks", topics: ["DML, DDL, DCL", "Multi-table Joins", "GROUP BY & Aggregations"] },
      { step: 3, title: "Advanced SQL Queries", duration: "3 Weeks", topics: ["Subqueries", "Common Table Expressions (CTEs)", "Window Functions", "Set Operators"] },
      { step: 4, title: "Database Normalization & Schema Design", duration: "2 Weeks", topics: ["1NF, 2NF, 3NF", "Denormalization Strategies", "Data Integrity"] },
      { step: 5, title: "Programmability (Stored Procedures & Triggers)", duration: "2 Weeks", topics: ["PL/SQL or PL/pgSQL", "Functions vs Procedures", "Triggers & Cursors"] },
      { step: 6, title: "Performance Tuning & Indexing", duration: "3 Weeks", topics: ["Execution Plans", "B-Tree vs Hash Indexes", "Query Refactoring"] },
      { step: 7, title: "ETL & Python Integration", duration: "2 Weeks", topics: ["Extract Transform Load (ETL)", "Connecting Python to SQL", "Data Pipelines"] },
      { step: 8, title: "Interview Practice & Placement Prep", duration: "2 Weeks", topics: ["Complex LeetCode / HackerRank SQL Problems", "Resume Polish"] }
    ],
    learningResources: {
      "SQL": [{ name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com" }, { name: "Mode SQL Guide", url: "https://mode.com/sql-tutorial/" }]
    },
    quickPrompts: [
      { label: "🗺️ SQL Developer Roadmap", query: "Give me a step-by-step roadmap to become a professional SQL Developer" },
      { label: "📈 Boost ATS Score", query: "What database technologies and query skills should I put on my resume?" },
      { label: "💼 Advanced SQL Interviews", query: "What are the toughest SQL queries asked in technical interviews?" },
      { label: "🚀 Database Projects", query: "What database and schema design projects impress engineering managers?" }
    ]
  },

  // ===================================================
  // 7. MOBILE DEVELOPMENT
  // ===================================================
  {
    id: "android-developer",
    name: "Android Developer",
    category: "Mobile Development",
    description: "Builds responsive, feature-rich native Android mobile applications using Kotlin and modern Android architecture.",
    skills: [
      "kotlin", "java", "android studio", "jetpack compose", "mvvm", "retrofit", "room", "coroutines", "rest api", "git"
    ],
    tools: ["Android Studio", "Git", "Postman", "Figma", "Firebase Console"],
    technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "Room Database", "Retrofit", "MVVM"],
    recommendedProjects: [
      {
        title: "News & Articles App with Offline Cache",
        desc: "Modern Jetpack Compose app fetching live news via Retrofit and caching articles in Room DB for offline reading.",
        tech: ["Kotlin", "Jetpack Compose", "Retrofit", "Room"]
      },
      {
        title: "Personal Expense Tracker & Budget Manager",
        desc: "Clean MVVM mobile app with custom charts, recurring transaction alarms, and biometric authentication.",
        tech: ["Kotlin", "MVVM", "Room", "Coroutines"]
      },
      {
        title: "Social Chat App with Firebase",
        desc: "Real-time mobile chat application featuring push notifications, media sharing, and Google Sign-In.",
        tech: ["Kotlin", "Firebase Realtime DB", "FCM"]
      }
    ],
    interviewTopics: [
      "Android Basics: Activity & Fragment Lifecycle, Intent types, Context",
      "Architecture: MVVM Pattern, ViewModel, LiveData / StateFlow, Repository Pattern",
      "Concurrency: Kotlin Coroutines, Dispatchers (IO, Main), Flow, Background Workers (WorkManager)",
      "UI: Jetpack Compose vs XML Layouts, State hoisting, Recomposition optimization",
      "Storage & Networking: Room DB, Retrofit with OkHttp interceptors, SQLite"
    ],
    roadmap: [
      { step: 1, title: "Kotlin Programming Language", duration: "2-3 Weeks", topics: ["Kotlin Syntax & Null Safety", "OOP in Kotlin", "Lambdas & Higher-Order Functions", "Coroutines Basics"] },
      { step: 2, title: "Android Studio & Core Components", duration: "2 Weeks", topics: ["Activities & LifeCycle", "Intents & Navigation", "Android Manifest & Permissions"] },
      { step: 3, title: "Modern UI with Jetpack Compose", duration: "3 Weeks", topics: ["Composables", "Modifiers & Layouts", "State Management in Compose", "Material 3 Design"] },
      { step: 4, title: "Architecture & MVVM", duration: "2-3 Weeks", topics: ["ViewModel & StateFlow", "Repository Pattern", "Clean Architecture Principles"] },
      { step: 5, title: "Networking & REST APIs (Retrofit)", duration: "2 Weeks", topics: ["Retrofit & GSON/Moshi", "Handling Asynchronous Calls with Coroutines", "Error Handling"] },
      { step: 6, title: "Local Storage & Caching (Room DB)", duration: "2 Weeks", topics: ["Room Entities, DAOs, Database", "Offline-First Data Flow", "SharedPreferences / DataStore"] },
      { step: 7, title: "Publishing & Play Store Best Practices", duration: "2 Weeks", topics: ["APK & App Bundles", "ProGuard / R8", "Firebase Push Notifications"] },
      { step: 8, title: "Interview Prep & Coding Challenges", duration: "2-3 Weeks", topics: ["Android Architecture Questions", "Kotlin Coding Challenges", "Portfolio Polish"] }
    ],
    learningResources: {
      "Android": [{ name: "Official Android Developers", url: "https://developer.android.com" }],
      "Kotlin": [{ name: "Kotlin Documentation", url: "https://kotlinlang.org/docs/home.html" }]
    },
    quickPrompts: [
      { label: "🗺️ Android Roadmap", query: "Give me a step-by-step roadmap to become an Android Developer using Kotlin" },
      { label: "📈 Boost ATS Score", query: "What Android and Kotlin keywords should I add to my resume?" },
      { label: "💼 Android Interview Prep", query: "What are the most common Android Activity lifecycle and MVVM interview questions?" },
      { label: "🚀 Android Project Ideas", query: "What are 3 standout native Android apps to publish on GitHub or Play Store?" }
    ]
  },

  // ===================================================
  // 8. DESIGN & PRODUCT
  // ===================================================
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    category: "Design & Product",
    description: "Researches user behaviors, crafts wireframes, interactive prototypes, and elegant user interfaces in Figma.",
    skills: [
      "figma", "ui design", "ux research", "wireframing", "prototyping", "design systems", "user personas", "usability testing", "html", "css"
    ],
    tools: ["Figma", "FigJam", "Adobe XD", "Miro", "Notion"],
    technologies: ["Figma", "Design Systems", "HTML/CSS Basics", "Wireframing", "Prototyping"],
    recommendedProjects: [
      {
        title: "FinTech Mobile App Redesign & Case Study",
        desc: "Complete end-to-end design case study detailing user research, pain points, wireframes, and high-fidelity prototype.",
        tech: ["Figma", "UX Research", "Prototyping"]
      },
      {
        title: "Multi-Brand Design System in Figma",
        desc: "Comprehensive component library featuring tokens, typography scales, auto-layout, and interactive states.",
        tech: ["Figma", "Design Systems", "Auto-Layout"]
      },
      {
        title: "EdTech Student Dashboard Web Application",
        desc: "Responsive web portal designed from user journey maps to polished desktop and mobile responsive mockups.",
        tech: ["Figma", "Responsive Design", "Usability Testing"]
      }
    ],
    interviewTopics: [
      "UX Process: Design Thinking Phases (Empathize, Define, Ideate, Prototype, Test)",
      "UI Principles: Visual Hierarchy, Typography Scale, Color Theory, Accessibility (Contrast Ratios)",
      "Design Systems: Atomic Design, Design Tokens, Component Variants, Reusability",
      "Research: Qualitative vs Quantitative Research, User Interviews, A/B Testing"
    ],
    roadmap: [
      { step: 1, title: "Design Fundamentals & Visual Principles", duration: "2 Weeks", topics: ["Color Theory", "Typography & Spacing", "Visual Hierarchy", "Layout Grids"] },
      { step: 2, title: "Figma Tool Mastery", duration: "2-3 Weeks", topics: ["Vector Tools", "Auto-Layout & Constraints", "Components & Variants", "Interactive Prototyping"] },
      { step: 3, title: "UX Research & User Journeys", duration: "2 Weeks", topics: ["User Personas", "Empathy Maps", "Information Architecture", "User Flow Diagrams"] },
      { step: 4, title: "Wireframing & Low-Fidelity Testing", duration: "2 Weeks", topics: ["Sketching Ideas", "Low-Fi Wireframes in FigJam", "Rapid User Feedback"] },
      { step: 5, title: "High-Fidelity UI & Design Systems", duration: "3 Weeks", topics: ["Building Style Guides", "Component Libraries", "Micro-Interactions & Animations"] },
      { step: 6, title: "Accessibility (a11y) & Handoff", duration: "1-2 Weeks", topics: ["WCAG Guidelines", "Color Contrast", "Developer Handoff Best Practices"] },
      { step: 7, title: "Writing UX Case Studies", duration: "2-3 Weeks", topics: ["Problem Statements", "Design Decisions", "Documenting Before & After"] },
      { step: 8, title: "Portfolio Presentation & Interview Prep", duration: "2 Weeks", topics: ["Behance / Notion Portfolio", "Whiteboard Design Challenges", "Mock Interviews"] }
    ],
    learningResources: {
      "Figma": [{ name: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design" }],
      "Nielsen Norman": [{ name: "NN/g UX Articles", url: "https://www.nngroup.com/articles/" }]
    },
    quickPrompts: [
      { label: "🗺️ UI/UX Roadmap", query: "Give me a step-by-step roadmap to become a UI/UX Designer with a strong portfolio" },
      { label: "📈 Boost ATS Score", query: "What design tools, methodologies, and terms should I highlight on my resume?" },
      { label: "💼 Design Interview Prep", query: "How should I present my design case studies in a product interview?" },
      { label: "🚀 Case Study Projects", query: "What are 3 impactful UX case study ideas that demonstrate real problem solving?" }
    ]
  },

  // ===================================================
  // 9. INFRASTRUCTURE & NETWORK
  // ===================================================
  {
    id: "network-engineer",
    name: "Network Engineer",
    category: "Infrastructure & Networking",
    description: "Configures, manages, and troubleshoots enterprise networks, routers, switches, and secure communications.",
    skills: [
      "networking", "cisco", "routing", "switching", "tcp/ip", "firewalls", "dns", "dhcp", "vpn", "linux", "wireshark", "python"
    ],
    tools: ["Cisco Packet Tracer", "Wireshark", "GNS3", "Putty", "Linux Terminal"],
    technologies: ["Cisco IOS", "TCP/IP", "BGP", "OSPF", "VLANs", "Wireshark", "VPNs"],
    recommendedProjects: [
      {
        title: "Enterprise Multi-VLAN Network Simulation",
        desc: "Designed and configured inter-VLAN routing, DHCP snooping, and access control lists (ACLs) in Packet Tracer.",
        tech: ["Cisco Packet Tracer", "VLANs", "Routing"]
      },
      {
        title: "Site-to-Site IPsec VPN Tunnel Configuration",
        desc: "Secure encrypted tunnel linking simulated branch offices with OSPF routing and NAT translation.",
        tech: ["IPsec", "OSPF", "VPN", "Cisco IOS"]
      },
      {
        title: "Automated Network Configuration with Python",
        desc: "Netmiko Python script automating backup of router configs and bulk provisioning of switch ports.",
        tech: ["Python", "Netmiko", "SSH", "Network Automation"]
      }
    ],
    interviewTopics: [
      "Protocols: TCP vs UDP, IP Addressing (IPv4 vs IPv6), Subnetting calculations (/24, /28, /30)",
      "Routing: Static vs Dynamic, Distance Vector vs Link State, OSPF vs BGP",
      "Switching: MAC Address Table, Spanning Tree Protocol (STP), VLANs, Trunking (802.1Q)",
      "Network Services: DNS resolution process, DHCP 4-way handshake (DORA), NAT/PAT",
      "Troubleshooting: ping, traceroute, arp, netstat, Wireshark packet capture analysis"
    ],
    roadmap: [
      { step: 1, title: "Networking Fundamentals", duration: "2-3 Weeks", topics: ["OSI 7 Layers", "Binary & Subnetting", "IP Addressing", "Cabling & Topologies"] },
      { step: 2, title: "Switching Technologies", duration: "2-3 Weeks", topics: ["Switch Operations", "VLANs & Trunks", "Spanning Tree Protocol (STP)", "EtherChannel"] },
      { step: 3, title: "IP Routing Technologies", duration: "3 Weeks", topics: ["Static Routing", "OSPF Routing Protocol", "Inter-VLAN Routing", "First Hop Redundancy (HSRP)"] },
      { step: 4, title: "IP Services & Network Security", duration: "2 Weeks", topics: ["DHCP & DNS", "NAT & PAT", "Standard & Extended ACLs", "Port Security"] },
      { step: 5, title: "WAN & VPN Technologies", duration: "2 Weeks", topics: ["WAN Concepts", "Site-to-Site IPsec VPNs", "BGP Overview", "Quality of Service (QoS)"] },
      { step: 6, title: "Network Troubleshooting & Packet Analysis", duration: "2 Weeks", topics: ["Wireshark In-Depth", "Troubleshooting Connectivity", "Log Analysis"] },
      { step: 7, title: "Network Automation (Python & Ansible)", duration: "2 Weeks", topics: ["Python Netmiko", "Automating Config Backups", "RESTCONF / NETCONF"] },
      { step: 8, title: "Cisco CCNA & Placement Prep", duration: "3 Weeks", topics: ["CCNA Exam Practice", "Hands-on Topology Questions", "Resume Polish"] }
    ],
    learningResources: {
      "Networking": [{ name: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" }],
      "Cisco": [{ name: "Cisco Learning Network", url: "https://learningnetwork.cisco.com" }]
    },
    quickPrompts: [
      { label: "🗺️ Network Engineer Roadmap", query: "Give me a step-by-step roadmap to become a Network Engineer and pass CCNA" },
      { label: "📈 Boost ATS Score", query: "What networking protocols and certifications should I put on my resume?" },
      { label: "💼 Subnetting & Routing Interviews", query: "What are the most common subnetting and routing questions in network interviews?" },
      { label: "🚀 Packet Tracer Projects", query: "What network simulation projects demonstrate strong hands-on skills?" }
    ]
  }
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function getAllJobRoles() {
  return JOB_ROLES;
}

export function getRoleCategories() {
  return ROLE_CATEGORIES;
}

export function getRolesByCategory(category) {
  return JOB_ROLES.filter((role) => role.category === category);
}

export function getJobRoleById(id) {
  if (!id) return null;
  return JOB_ROLES.find((role) => role.id === id) || null;
}

export function getJobRoleByName(roleName) {
  if (!roleName || typeof roleName !== "string") {
    return JOB_ROLES[0]; // default to first role
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

export function createCustomRoleConfig(customName) {
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
