import type { Project, SkillCategory, Milestone, Principle, PhilosophyItem } from '../types';

export const PERSONAL_INFO = {
  name: "Arjunan V",
  shortName: "Arjunan",
  roleTitle: "SOFTWARE ENGINEER / AI & PRODUCT DEVELOPMENT",
  positioning: [
    "Software Engineer",
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "Product Builder"
  ],
  location: "Coimbatore, India",
  statusLine: "Final-year B.Tech IT, 2022-2026",
  education: {
    degree: "B.Tech Information Technology",
    institution: "KPR Institute of Engineering and Technology",
    year: "Final-year B.Tech IT, 2022-2026",
    cgpa: "8.42",
    school: "Senthil Matriculation Higher Secondary School (2022 — 2024)"
  },
  brandStatement: "I build intelligent digital experiences by combining software engineering, artificial intelligence, and thoughtful product design.",
  heroHeadline: {
    line1: "Building ideas",
    line2: "into intelligent",
    line3: "digital experiences."
  },
  heroIntro: "I'm Arjunan, an aspiring software engineer passionate about building intelligent applications, scalable digital products, and meaningful technology.",
  contact: {
    email: "arjunan.velmurugan27@gmail.com",
    phone: "+91 7845080379",
    linkedin: "https://www.linkedin.com/in/arjunan-velmurugan-1a446b35a",
    github: "https://github.com/Arjunan-lab",
    resumeUrl: "/assets/Arjunan_V_Resume.pdf"
  },
  availability: "Available for high-impact engineering roles & ambitious product collaborations"
};

export const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Engineering with purpose.",
    description: "Code is a medium to solve tangible bottlenecks. I architect systems that balance algorithmic rigor, maintainable software design patterns, and operational efficiency."
  },
  {
    number: "02",
    title: "Building intelligent systems.",
    description: "Integrating modern machine learning and computational inference pipelines directly into production systems, making applications adaptively smarter over time."
  },
  {
    number: "03",
    title: "Thinking beyond implementation.",
    description: "True engineering lives at the convergence of backend architecture and product usability. I design end-to-end user journeys that make complex workflows feel effortless."
  },
  {
    number: "04",
    title: "Continuously exploring emerging technology.",
    description: "Relentlessly expanding technical frontiers—from low-latency embedded IoT wireless protocols to local LLM inference engines and cross-platform native frameworks."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "PROGRAMMING",
    label: "Core Languages",
    description: "Foundational and systems languages for scalable backend algorithms and performant execution.",
    skills: ["Python", "Java", "C", "JavaScript", "SQL"]
  },
  {
    title: "FRONTEND",
    label: "User Interface & Experience",
    description: "Modern component-driven web architectures and responsive responsive interface engineering.",
    skills: ["HTML5", "CSS3 / Modern CSS", "React.js", "TypeScript", "Tailwind CSS", "Responsive Design"]
  },
  {
    title: "BACKEND",
    label: "Server Architecture & APIs",
    description: "High-throughput asynchronous servers, RESTful microservices, and background task pipelines.",
    skills: ["Node.js", "FastAPI", "REST APIs", "Async Architecture", "Celery", "SQLAlchemy"]
  },
  {
    title: "AI / MACHINE LEARNING",
    label: "Intelligent Systems & Inference",
    description: "Data preparation, gradient boosting, deep neural networks, and contextual retrieval pipelines.",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow / Keras",
      "CatBoost",
      "EfficientNetB2",
      "ML Model Integration",
      "RAG Fundamentals",
      "ChromaDB"
    ]
  },
  {
    title: "DATABASES",
    label: "Persistence & Data Modeling",
    description: "Relational integrity, ACID compliance, and flexible unstructured document stores.",
    skills: ["MySQL", "MongoDB", "SQLite", "Data Schema Design"]
  },
  {
    title: "TOOLS & ENVIRONMENT",
    label: "DevOps & Toolchain",
    description: "Version control workflows, containerization, API testing, and prototyping environments.",
    skills: ["Git", "GitHub", "Docker", "Postman", "Streamlit", "Linux / VS Code"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "soil-health-ai",
    tags: ['ai', 'systems'],
    number: "01",
    title: "AI-Based Soil Health Assessment & Crop Recommendation",
    category: "Artificial Intelligence / Deep Learning / Agriculture (Infosys Springboard)",
    shortDescription: "An intelligent agriculture platform combining deep learning soil classification (EfficientNetB2), gradient-boosted crop recommendation (CatBoost), and weather-aware advisory.",
    fullDescription: "An enterprise-grade agricultural intelligence platform engineered during the Infosys Springboard AI internship. Empowers farmers with immediate agronomic guidance by integrating computer vision for soil nutrient deficiency classification (N, P, K, pH), multi-target gradient boosted decision trees for crop yield recommendation, and asynchronous Celery workers backed by Redis for heavy model inference.",
    problemStatement: "Smallholder farmers frequently suffer from delayed, expensive laboratory soil tests. Without immediate scientific soil health metrics and climate-aware recommendations, crop yields decline and soil degradation compounds season after season.",
    technicalApproach: "Engineered an asynchronous FastAPI backend paired with deep learning and ensemble ML models. Deployed an EfficientNetB2 convolutional backbone for soil classification alongside a high-accuracy CatBoost multi-target regressor. Integrated Celery workers backed by Redis for heavy model inference, with Sarvam AI language APIs providing vernacular conversational support.",
    coverImage: "/assets/projects/agriculture-ai/seedling-preview.webp",
    keyFeatures: [
      "Deep Learning Soil Classification (EfficientNetB2)",
      "Multi-Parameter Crop Recommendation (CatBoost & Scikit-learn)",
      "Real-Time Weather-Aware Advisory (OpenWeather API)",
      "Asynchronous Background Job Queues (Celery & Redis)",
      "Vernacular Multilingual Agricultural AI Assistant (Sarvam API)",
      "Relational Data Persistence (PostgreSQL & SQLAlchemy ORM)",
      "High-Performance RESTful API Architecture"
    ],
    techStack: [
      "Python",
      "FastAPI",
      "TensorFlow / Keras",
      "EfficientNetB2",
      "CatBoost",
      "Scikit-learn",
      "PostgreSQL",
      "SQLAlchemy",
      "Celery",
      "Redis"
    ],
    implementationDetails: [
      "Trained and evaluated CatBoost models achieving robust precision across multi-label soil fertility indices and nutrient deficiencies (N-P-K).",
      "Integrated interactive prediction endpoints validating real-time sensor parameters alongside visual classification outputs.",
      "Implemented structured evaluation reporting capturing confusion matrices, ROC curves, and cross-validation metrics.",
      "Engineered decoupled background pipelines to prevent API thread starvation during deep neural network inferences."
    ],
    githubUrl: "https://github.com/Arjunan-lab/AgriSense-AI-Soil-Health-Crop-Recommendation",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/agriculture-ai/seedling-preview.webp",
        caption: "AI Soil Health analysis console and crop recommendation telemetry.",
        label: "Live Interface"
      },
      {
        type: "image",
        src: "/assets/projects/agriculture-ai/soil-prediction-1.webp",
        caption: "Live interactive prediction console assessing nitrogen, phosphorus, and moisture factors.",
        label: "Interactive Telemetry"
      },
      {
        type: "image",
        src: "/assets/projects/agriculture-ai/soil-prediction-2.webp",
        caption: "Multi-parameter agronomic classification output with targeted crop yield recommendations.",
        label: "Output Inference"
      },
      {
        type: "image",
        src: "/assets/projects/agriculture-ai/soil-model-eval.webp",
        caption: "Statistical evaluation matrix and performance metrics generated across validation folds.",
        label: "Model Evaluation"
      }
    ]
  },
  {
    id: "road-safety-ai",
    tags: ['ai', 'systems'],
    number: "02",
    title: "RoadSoS — AI Emergency Road Safety & Instant Triage Platform",
    category: "Emergency AI Systems / Computer Vision / Real-Time Geolocation",
    shortDescription: "A high-urgency road safety intelligence system engineered for the AI Road Safety Hackathon with real-time accident triage via Google Gemini AI streaming and live hospital georouting.",
    fullDescription: "A high-urgency road safety intelligence system engineered during the national AI Road Safety Hackathon. Features instant accident triage with Google Gemini AI via Server-Sent Events (SSE) streaming, automated injury severity scoring, live geospatial nearest hospital routing via OpenStreetMap Overpass API, and multi-channel emergency SOS dispatch.",
    problemStatement: "During vehicular accidents, the golden hour is lost to delayed bystander reporting, inaccurate injury assessments, and emergency response teams navigating blindly without hospital trauma capability telemetry.",
    technicalApproach: "Built an ultra-fast FastAPI v3.1 backend utilizing Gemini Multimodal AI for sub-second visual triage with SSE streaming. Integrated Overpass API for real-time bounding-box hospital searches within 10-25km, coupled with a responsive offline/online failover PWA frontend built with React, Vite, and Tailwind CSS.",
    coverImage: "/assets/projects/road-safety/road-safety-cover.webp",
    keyFeatures: [
      "Sub-Second Multimodal Accident Triage (Google Gemini AI)",
      "Server-Sent Events (SSE) Lightning Streaming Response Loop",
      "Real-Time Hospital Discovery via OpenStreetMap Overpass API",
      "Dynamic Trauma Level & Facility Capability Classification",
      "Offline & Online Failover Modes with PWA Offline Cache",
      "Emergency SMS & Ambulance Dispatch Integration (Twilio API)",
      "Interactive Incident Geospatial Map Tracking"
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Google Gemini AI",
      "SSE Streaming",
      "Overpass API",
      "OpenStreetMap",
      "React",
      "Vite",
      "Tailwind CSS",
      "PWA"
    ],
    implementationDetails: [
      "Engineered streaming triage endpoint /triage/stream returning real-time markdown assessment blocks to first responders.",
      "Implemented bounding box geofencing queries against OpenStreetMap Overpass API to filter active emergency wards within 15km.",
      "Captured full operational screen telemetry demo with 1080p recording across online and offline failover states."
    ],
    githubUrl: "https://github.com/Arjunan-lab/RoadSoS-AI-Emergency-Road-Safety",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/road-safety/road-safety-preview.webp",
        caption: "Live emergency accident triage console with hospital routing.",
        label: "Triage Dashboard"
      },
      {
        type: "image",
        src: "/assets/projects/road-safety/ui_frame_25.webp",
        caption: "Overpass API hospital capability telemetry and trauma center proximity map.",
        label: "Geospatial Routing"
      },
      {
        type: "image",
        src: "/assets/projects/road-safety/ui_frame_75.webp",
        caption: "Automated emergency dispatch confirmation and triage summary report.",
        label: "Emergency Dispatch"
      }
    ]
  },
  {
    id: "blood-connect",
    tags: ['ai', 'fullstack'],
    number: "03",
    title: "BloodConnect Live — SmartDonor AI Emergency Blood Banking",
    category: "Healthcare Technology / Predictive Machine Learning / Real-Time Geospatial",
    shortDescription: "A secure, role-based, admin-authorized emergency blood donation coordination network powered by SmartDonor-AI predictive eligibility matching and live OpenStreetMap routing.",
    fullDescription: "An enterprise healthcare coordination network designed to eliminate critical blood shortages during clinical emergencies. Powered by SmartDonor-AI machine learning models (Random Forest and Gradient Boosting) to score donor eligibility, dynamic geospatial radius resolution on interactive Leaflet maps, and an audited multi-role governance workflow connecting donors, hospital wardens, and regional blood banks.",
    problemStatement: "Traditional blood banking relies on fragmented phone trees and unverified donor lists. In critical surgeries and trauma cases, mismatched blood groups or unavailable donors lead to fatal operational delays.",
    technicalApproach: "Architectured a 4-tier system with React 18, Vite, and Tailwind CSS on the frontend, Node.js and Express with JWT authentication on the backend, PostgreSQL managed through Prisma ORM, and Python scikit-learn models for predictive donor eligibility scoring. Dynamic geographic dispatch uses Leaflet OpenStreetMap telemetry.",
    coverImage: "/assets/projects/blood-connect/blood-connect-cover.webp",
    keyFeatures: [
      "SmartDonor-AI Predictive Eligibility Machine Learning Funnel",
      "Live Geospatial Proximity Matching on Leaflet OpenStreetMap",
      "Multi-Tier Role Governance (Donor, Hospital Warden, Regional Blood Bank)",
      "Automated SMS & Email Broadcast Engine (Nodemailer)",
      "Clinical Blood Inventory Audit & Real-Time Stock Telemetry",
      "Strict Admin-Authorized Verification Lifecycle",
      "Comprehensive Forensic Audit Trails & Compliance Reporting"
    ],
    techStack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Leaflet",
      "PostgreSQL",
      "Prisma ORM",
      "Node.js",
      "Express.js",
      "Scikit-Learn",
      "Random Forest"
    ],
    implementationDetails: [
      "Implemented Random Forest and Gradient Boosting classifiers trained on clinical donor frequency and health parameters.",
      "Engineered dynamic geographical radius expansion algorithm matching rare blood types (AB-, O-) across expanding kilometers.",
      "Delivered complete official technical architecture documentation and 8-slide presentation suite."
    ],
    githubUrl: "https://github.com/Arjunan-lab/BloodConnect-Live-SmartDonor-AI",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/blood-connect/blood-connect-preview.webp",
        caption: "Live emergency donor discovery map with geospatial radius tracking.",
        label: "Geospatial Matching"
      },
      {
        type: "image",
        src: "/assets/projects/blood-connect/blood-connect-banner.webp",
        caption: "4-tier system architecture connecting donors, hospitals, and clinical blood banks.",
        label: "System Architecture"
      }
    ]
  },
  {
    id: "ecommerce-mern",
    tags: ['fullstack'],
    number: "04",
    title: "ApexStore — Full-Stack MERN E-Commerce Architecture",
    category: "Full-Stack Web Engineering / Cloud Storage / Payment Infrastructure",
    shortDescription: "A high-performance modern e-commerce web platform engineered with MongoDB, Express, React, and Node.js with Cloudinary media CDN, JWT security, and administrative product control.",
    fullDescription: "A production-grade online marketplace architectured with the complete MERN stack. Designed with responsive category discovery (cameras, audio, smartwatches, televisions), real-time cart state synchronization, cloud asset management via Cloudinary, secure JWT authentication with HTTP-only cookies, and a comprehensive warden/admin management suite.",
    problemStatement: "Modern digital retail platforms must handle high concurrency, dynamic product catalog mutations, seamless image optimization, and low-latency cart operations across mobile and desktop devices without performance degradation.",
    technicalApproach: "Engineered a decoupled client-server architecture with React and Tailwind CSS delivering responsive shopping interfaces. Backed by Node.js and Express RESTful controllers with MongoDB Atlas persistence via Mongoose schemas. Product image uploads stream directly to Cloudinary CDN with automatic thumbnail generation.",
    coverImage: "/assets/projects/ecommerce/ecommerce-cover.webp",
    keyFeatures: [
      "Complete End-to-End MERN Stack Architecture",
      "Dynamic Multi-Category Product Catalog (Cameras, Audio, Watches, TVs)",
      "Real-Time Cart & Persistent Checkout State Management",
      "Secure Authentication & Authorization via JWT and Bcrypt",
      "Cloud Media Asset Optimization (Cloudinary API CDN)",
      "Comprehensive Admin Product CRUD & Inventory Control Portal",
      "Mobile-First Responsive Layout with Banner Carousel Sliders"
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "Cloudinary API",
      "JWT Auth",
      "Tailwind CSS",
      "Context API"
    ],
    implementationDetails: [
      "Structured normalized MongoDB collections for Users, Products, CartItems, and Category hierarchies.",
      "Built custom Express middleware verifying token signatures and enforcing role-based admin endpoints.",
      "Integrated Cloudinary image upload SDK converting raw photo buffers to web-optimized WebP assets."
    ],
    githubUrl: "https://github.com/Arjunan-lab/ApexStore-MERN-Ecommerce-Platform",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/ecommerce/ecommerce-preview.webp",
        caption: "Live e-commerce storefront showcasing electronic categories and product grids.",
        label: "Storefront Interface"
      }
    ]
  },
  {
    id: "amazon-rag-chatbot",
    tags: ['ai', 'fullstack'],
    number: "05",
    title: "Amazon Customer Intelligence RAG Chatbot & Analytics",
    category: "Natural Language Processing / Retrieval-Augmented Generation",
    shortDescription: "A conversational intelligence engine vector-indexing 10,000+ real Amazon reviews with SentenceTransformers and LLM synthesis.",
    fullDescription: "An advanced conversational AI system completely replacing conventional keyword searches with high-dimensional dense vector embeddings, retrieving the top 5 most contextually relevant Amazon product reviews and synthesizing factual customer satisfaction summaries with zero hallucination.",
    problemStatement: "Customers and product managers cannot feasibly read thousands of conflicting product reviews. Generative LLMs without RAG frequently hallucinate specs and fail to capture real customer sentiment trends.",
    technicalApproach: "Vectorized over 10,000 authentic Amazon product reviews using SentenceTransformers. Built an Express.js middleware triggering a Python retrieval-augmented generation pipeline that matches queries via cosine similarity (threshold > 0.82) and synthesizes actionable bulleted answers. Styled in a glassmorphism dark React interface alongside Plotly Dash analytics.",
    coverImage: "/assets/projects/amazon-rag/amazon-rag-cover.webp",
    keyFeatures: [
      "Dense Semantic Vector Search (SentenceTransformers Embeddings)",
      "Retrieval-Augmented Generation (RAG) over 10,000+ Verified Reviews",
      "Cosine Similarity Thresholding with Interactive Vector Node Telemetry",
      "Zero-Hallucination Factual Product Sentiment Distillation",
      "Interactive Automotive Price Regression Model (Plotly Dash & CatBoost)",
      "High-Performance Python-to-Node Child Process IPC Protocol",
      "Dark Glassmorphism Interface with Live Vector Loading Animations"
    ],
    techStack: [
      "Python 3.12",
      "LangChain",
      "SentenceTransformers",
      "Vector Embeddings",
      "React.js",
      "Vite",
      "Node.js",
      "Express.js",
      "Plotly Dash",
      "CatBoost"
    ],
    implementationDetails: [
      "Preprocessed and embedded 10,000 customer reviews into high-dimensional semantic vector spaces.",
      "Engineered Python RAG pipeline returning top-k nodes formatted with similarity coefficients and review IDs.",
      "Trained CatBoost regression model on 10,750 BMW vehicle records achieving R² score of 0.914."
    ],
    githubUrl: "https://github.com/Arjunan-lab/Amazon-Customer-Intelligence-RAG",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/amazon-rag/amazon-rag-preview.webp",
        caption: "RAG vector retrieval chat console with live node inspection and regression metrics.",
        label: "RAG Assistant Console"
      }
    ]
  },
  {
    id: "smart-attendance-system",
    tags: ['systems', 'fullstack'],
    number: "06",
    title: "SmartAttend — Smart Campus WiFi & Timetable Attendance System",
    category: "Enterprise Campus Systems / Network Security / MERN Architecture",
    shortDescription: "A collegiate attendance management platform enforcing college WiFi BSSID/IP restrictions, 10-minute automated class windows, and real-time student/teacher telemetry.",
    fullDescription: "A multi-role collegiate attendance platform built with the MERN stack. Combines network-level college WiFi IP/BSSID validation with a dynamic 10-minute automated attendance window post-bell, automatically marking unrecorded students absent while providing teachers with On-Duty (OD) authorization and 7-period daily automated timetable management.",
    problemStatement: "Manual roll-call and paper registers waste 15-20% of instructional classroom time, suffer from proxy attendance, and delay compliance reporting required by academic accreditation boards.",
    technicalApproach: "Implemented Express.js middleware validating client subnet IP and college WiFi BSSID headers. Designed an automated cron service tracking the 7 daily periods, auto-marking absentees after the 10-minute window. Delivered a glassmorphism React interface with 3D cursor-reactive gradient orbs, 24-hr live clock, and circular attendance percentage telemetry.",
    coverImage: "/assets/projects/smart-attendance/smart-attendance-cover.webp",
    keyFeatures: [
      "Network-Level College WiFi BSSID & Subnet IP Geofencing Validation",
      "Dynamic 10-Minute Automated Attendance Window with Auto-Absent Cron",
      "7-Period Daily Timetable Matrix with Real-Time Class Status Indicators",
      "Teacher On-Duty (OD) Official Authorization & Reason Verification",
      "Interactive Circular Attendance Percentage Telemetry (85% Compliance)",
      "Multi-Role Portals for Students, Faculty Mentors, and College Admins",
      "Glassmorphism UI with 3D Spring Physics Parallax Gradient Orbs"
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Framer Motion",
      "Network IP Validation",
      "Recharts"
    ],
    implementationDetails: [
      "Engineered automated Node.js scheduler tracking institutional bell schedules across all engineering years.",
      "Implemented subnet IP comparison algorithms preventing off-campus and cellular proxy attendance.",
      "Built interactive student dashboards tracking subject-wise attendance thresholds and exam eligibility."
    ],
    githubUrl: "https://github.com/Arjunan-lab/SmartAttend-Campus-Attendance-System",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/smart-attendance/smart-attendance-preview.webp",
        caption: "Student portal with live 24-hour clock, WiFi status beacon, and 7-period class matrix.",
        label: "Student Portal"
      }
    ]
  },
  {
    id: "hostel-booking",
    tags: ['fullstack'],
    number: "07",
    title: "HostelHub — Automated Hostel Room Allocation & Payment System",
    category: "Web Application Engineering / Database Management / Relational Architecture",
    shortDescription: "A PHP & MySQL web application automating hostel room discovery, bed allocation, and multi-tier booking approvals with QR-based digital payment verification.",
    fullDescription: "A comprehensive institutional hostel management platform developed with PHP and MySQL. Replaces manual paper hostel allotment with an interactive student room discovery matrix, real-time vacant bed telemetry across 4 building floors, QR-based UPI payment receipt uploads, and an authorized warden administrative verification queue.",
    problemStatement: "University hostel admissions involve long physical queues, double-booking errors, and untraceable bank transfer receipts, creating immense friction for wardens and students during semester onboarding.",
    technicalApproach: "Architectured normalized relational database schemas with strict foreign key constraints and transactional room state locks. Implemented multi-role session auth separating student and warden portals, with dynamic room occupancy color coding and receipt image upload verification.",
    coverImage: "/assets/projects/hostel-hub/hostel-booking-cover.webp",
    keyFeatures: [
      "Interactive 4-Floor Hostel Room Occupancy & Vacancy Visual Matrix",
      "AC Premium and Non-AC Deluxe Bed Allocation Workflow",
      "QR-Based UPI Payment Submission with Transaction Screenshot Uploads",
      "Warden Verification Dashboard with One-Click Allotment Approval",
      "Transactional Row Locks Preventing Concurrent Bed Double-Booking",
      "Comprehensive Student Profile and Roommate Preference Management",
      "Automated Fee Receipt Generation and Database Migration Scripts"
    ],
    techStack: [
      "PHP 8.x",
      "MySQL",
      "JavaScript",
      "HTML5 / CSS3",
      "Session Auth",
      "UPI QR Integration",
      "Relational Database Modeling"
    ],
    implementationDetails: [
      "Designed normalized schema across rooms, seats, students, bookings, and payments with foreign key cascades.",
      "Engineered transactional room state mutators locking beds during active checkout flows.",
      "Created automated migration scripts expanding approval statuses and transaction reference tracking."
    ],
    githubUrl: "https://github.com/Arjunan-lab/HostelHub-Automated-Hostel-Management",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/hostel-hub/hostel-booking-preview.webp",
        caption: "Warden admin portal displaying floor occupancy matrix and UPI receipt verification queue.",
        label: "Warden Dashboard"
      }
    ]
  },
  {
    id: "banking-system",
    tags: ['systems'],
    number: "08",
    title: "SecureBank Core — Enterprise Java JDBC Banking & Transaction Engine",
    category: "Enterprise Systems / Core Java / Database ACID Concurrency",
    shortDescription: "A high-reliability core banking transaction system built in Java with JDBC and MySQL, featuring thread-safe inter-account balance transfers and SHA-256 security.",
    fullDescription: "A robust financial transaction and account management engine developed in Core Java using JDBC and MySQL. Demonstrates deep object-oriented architectural patterns, thread-synchronized concurrent balance transfers with zero deadlock risk, SHA-256 cryptographic password hashing, PreparedStatement SQL injection defense, and transaction ledger audit logging.",
    problemStatement: "Financial core systems require absolute zero-tolerance for race conditions, data inconsistencies, and security loopholes during simultaneous fund withdrawals and deposits.",
    technicalApproach: "Implemented custom Java concurrency models with synchronized transaction blocks and database row-level locking (SELECT FOR UPDATE). Structured custom exception hierarchies (InvalidInputException, InsufficientFundsException), persistent ArrayList ledger caches, and connection pooling to MySQL.",
    coverImage: "/assets/projects/banking/banking-cover.webp",
    keyFeatures: [
      "ACID-Compliant Multi-Threaded Financial Transaction Execution",
      "Thread-Safe Concurrent Account Transfer Engine with Zero Deadlock Risk",
      "Database Row-Level Locking (SELECT FOR UPDATE) via JDBC",
      "Cryptographic Security with Salted SHA-256 Password Hashing",
      "Robust Custom Exception Hierarchy (InsufficientFundsException)",
      "Complete Transaction Audit Ledger with Timestamped Commit Logs",
      "PreparedStatement Sanitization Defending Against SQL Injection"
    ],
    techStack: [
      "Core Java",
      "OOP Architecture",
      "Multi-Threading",
      "JDBC",
      "MySQL",
      "SHA-256 Cryptography",
      "ACID Transactions",
      "PreparedStatements"
    ],
    implementationDetails: [
      "Designed multithreaded transaction simulator verifying concurrent transfers without balance corruption.",
      "Implemented DBConnectionPool managing reusable JDBC connections to MySQL database.",
      "Documented complete 1,200+ line project technical manual with schema diagrams and sample runs."
    ],
    githubUrl: "https://github.com/Arjunan-lab/SecureBank-Core-Java-Banking-Engine",
    visuals: [
      {
        type: "image",
        src: "/assets/projects/banking/banking-preview.webp",
        caption: "Real-time JDBC transaction logs, ACID execution telemetry, and account balance ledger.",
        label: "Transaction Engine"
      }
    ]
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: "hostel-hackathon",
    period: "May 2025",
    year: "2025",
    title: "H² Hostel Hackathon Participant",
    organization: "Hostels Aura Club, KPR Institute of Engineering and Technology",
    type: "Award",
    description: "Awarded certificate of participation for outstanding performance as the participant of H² - Hostel Hackathon organized by Hostels Aura Club at KPR Institute of Engineering and Technology on 03.05.2025. Conceptualized and developed the 'Hostel Room Booking App' streamlining student bed allocation.",
    highlights: [
      "Designed and developed the full-stack hostel room booking web application.",
      "Recognized by KPRIET Principal Dr. D. Saravanan and Deputy Warden Dr. A. Balaji."
    ]
  },
  {
    id: "infosys-internship",
    period: "June 2026 — Aug 2026",
    year: "2026",
    title: "Infosys Springboard AI Internship (7.0)",
    organization: "Infosys Springboard",
    type: "Internship",
    description: "Completed intensive technical internship focused on Artificial Intelligence and Machine Learning in agriculture. Engineered end-to-end data pipelines, EfficientNetB2 computer vision models, CatBoost multi-target crop recommendation regressors, and FastAPI integration.",
    highlights: [
      "Engineered machine learning pipelines achieving high accuracy across soil fertility and crop classification.",
      "Integrated Celery background task queues, Sarvam vernacular AI API, and OpenWeather APIs.",
      "Documented comprehensive EDA reports, confusion matrices, and model convergence telemetry."
    ]
  },
  {
    id: "judahcode-internship",
    period: "Dec 2025 — Jan 2026",
    year: "2025/2026",
    title: "Java Software Development Intern",
    organization: "JudahCode Technologies",
    type: "Internship",
    description: "Executed 30-day Agile software development internship building production backend and web application systems. Developed robust OOP architectures in Java, integrated relational data persistence, and engineered responsive web frontends.",
    highlights: [
      "Developed backend logic using Core Java and Object-Oriented Programming (OOP) principles.",
      "Engineered responsive user interfaces using HTML5, CSS3, and JavaScript.",
      "Delivered two full-stack capstone applications adhering to sprint deliverables."
    ]
  },
  {
    id: "stem-innovators-expo",
    period: "27th February 2025",
    year: "2025",
    title: "STEM Innovators Expo 2025 Winner",
    organization: "KPR Institute of Engineering and Technology",
    type: "Award",
    description: "Secured award for winning in the STEM Innovators Expo 2025, conducted by the Department of Science and Humanities, STEM Lab, CIIED and Science Club at KPRIET, Coimbatore.",
    highlights: [
      "Jury recognition by HoD Chemistry Dr. M.S. Karthikeyan and HoD Mathematics Dr. K. Karthikeyan.",
      "Recognized for engineering innovation and technical feasibility."
    ]
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    title: "AI-Powered Product Development",
    subtitle: "From Raw Inference to Human Experience",
    content: "Machine learning models in isolation solve mathematical problems; great products turn those models into seamless everyday clarity. I care deeply about how inference latency, confidence scores, and contextual memory translate into interfaces people genuinely trust.",
    tags: ["Inference UX", "Context Engines", "Human-in-the-Loop"]
  },
  {
    title: "Software Architecture & Scalability",
    subtitle: "Clean Abstractions Under Pressure",
    content: "Good code is written for the machines of today and the engineers of tomorrow. I prioritize modular boundaries, deterministic state management, predictable asynchronous queues, and clean separation between data ingestion and business logic.",
    tags: ["System Design", "Microservices", "Decoupled Pipelines"]
  },
  {
    title: "Emerging Technologies & Edge Computing",
    subtitle: "Bridging Silicon and Cloud",
    content: "The physical world is analog and decentralized. Experimenting with low-power microcontrollers (ESP32), peer-to-peer RF protocols (ESP-NOW), and local edge inference (Ollama on device) reinforces my conviction that computing is rapidly moving closer to the user.",
    tags: ["ESP-NOW", "Local LLMs", "Edge Compute"]
  },
  {
    title: "Technology Entrepreneurship & Product Craft",
    subtitle: "Building What Matters",
    content: "Code is an investment in human value. As a future technology entrepreneur, every line I write is filtered through genuine utility: Does this solve an actual pain point? Is it reliable? Does it scale ethically and sustainably?",
    tags: ["Product Thinking", "Value Creation", "First Principles"]
  }
];
