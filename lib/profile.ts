// ─────────────────────────────────────────────────────────────
//  Everything the twin knows about you lives in this file.
//  Edit it and the site, the built-in answers and the AI prompt all update.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Tooba Mehboob",
  firstName: "Tooba",
  title: "AI engineer & frontend developer",
  location: "Bangkok, Thailand",
  from: "Peshawar, Pakistan",
  email: "st125404@ait.asia", // swap for a personal address if your AIT inbox expires
  // Put a square photo at /public/avatar.jpg and set avatar: "/avatar.jpg". Empty shows your initials.
  avatar: "",
  // Leave a link empty ("") to hide it.
  links: {
    github: "",
    linkedin: "",
    scholar: "",
    cv: "", // e.g. "/Tooba_Mehboob_CV.pdf" after adding the PDF to /public
  },
  availability: {
    open: true,
    headline: "Open to AI engineering and frontend roles",
    detail:
      "I'm looking for roles where machine learning meets product: AI engineering, LLM applications, or frontend work on AI-heavy products. Remote or on-site in Thailand, and open to relocating for the right team.",
  },
  bio: "I build AI that works where resources are thin: tutors for classrooms without enough teachers, models for languages with almost no data, and vision systems for crops that never make it into benchmark datasets. Then I build the interface people actually use to reach it.",
  languages: ["English (fluent)", "Urdu (native)", "Arabic (intermediate)", "Thai (beginner)"],
  interests: ["AI for education", "Low-resource NLP", "AI for agriculture", "Interface design", "Climate action"],
};

export type Domain = "edtech" | "vision" | "language" | "product";

export const domainMeta: Record<Domain, { label: string; color: string }> = {
  edtech: { label: "EdTech", color: "var(--c-rose)" },
  vision: { label: "Computer vision", color: "var(--c-saffron)" },
  language: { label: "Language & NLP", color: "var(--c-jade)" },
  product: { label: "Product engineering", color: "var(--c-indigo)" },
};

export type Project = {
  slug: string;
  title: string;
  domain: Domain;
  year: string;
  oneLiner: string;
  description: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  status?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-tutor",
    title: "AI Tutor Platform",
    domain: "edtech",
    year: "2025 – now",
    oneLiner: "LLM tutoring for students in low-resource areas",
    description:
      "A multi-role learning platform built at AI Brain Lab, AIT. It personalises lessons with LLMs and gives students, guardians and course creators their own views on a shared component system.",
    highlights: [
      "Adaptive learning flows and dynamic, route-based course delivery",
      "Separate experiences for students, guardians and course creators",
      "Led the full UI/UX redesign with the research team",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Zustand", "RTK Query", "FastAPI", "LLMs"],
    metric: { value: "3", label: "user roles" },
  },
  {
    slug: "course-creation",
    title: "AI-powered course creation",
    domain: "edtech",
    year: "2025 – now",
    oneLiner: "Turns a topic into a reviewable course outline",
    description:
      "Course creators describe a topic and audience; an LLM pipeline drafts modules, lessons and checks for understanding, and a creator-facing editor keeps a human in the loop.",
    highlights: ["Topic-to-outline LLM pipeline", "Human-in-the-loop editor", "Paper in preparation"],
    stack: ["React", "Next.js", "FastAPI", "LLMs"],
    status: "Paper in preparation",
  },
  {
    slug: "maize-classifier",
    title: "Maize seed classification",
    domain: "vision",
    year: "2023",
    oneLiner: "Telling maize varieties apart from a photo",
    description:
      "My undergraduate thesis at UET Peshawar. I compared CNN, MobileNet and Random Forest approaches for classifying maize seed species, then shipped the model inside an Android app.",
    highlights: ["92% classification accuracy", "OpenCV preprocessing and augmentation", "Deployed to Android, with a Streamlit demo"],
    stack: ["Python", "TensorFlow", "Keras", "OpenCV", "MobileNet", "Android Studio"],
    metric: { value: "92%", label: "accuracy" },
  },
  {
    slug: "maize-dataset",
    title: "Maize seed dataset & pipeline",
    domain: "vision",
    year: "2026",
    oneLiner: "A reusable dataset and processing pipeline",
    description:
      "Documenting how the maize seed images were collected, labelled and processed so other researchers can reuse the data and reproduce the results.",
    highlights: ["Collection and labelling protocol", "Reproducible preprocessing", "Paper in preparation"],
    stack: ["Python", "OpenCV", "Data curation"],
    status: "Paper in preparation",
  },
  {
    slug: "khowar-mt",
    title: "Khowar → English translation",
    domain: "language",
    year: "2025",
    oneLiner: "Translation for a language with almost no digital text",
    description:
      "Neural machine translation for Khowar, spoken in Chitral in northern Pakistan, using parameter-efficient fine-tuning to work with very little data and compute.",
    highlights: ["Severely low-resource language pair", "Parameter-efficient fine-tuning with LoRA"],
    stack: ["PyTorch", "Hugging Face", "LoRA", "Transformers"],
  },
  {
    slug: "rlhf",
    title: "Human preference optimisation",
    domain: "language",
    year: "2025",
    oneLiner: "Teaching a model the answers people prefer",
    description:
      "An RLHF project that learns from pairwise human preferences to steer model outputs, built with lightweight models to keep experiments affordable.",
    highlights: ["Learning from pairwise preferences", "DistilBERT and LoRA"],
    stack: ["PyTorch", "DistilBERT", "LoRA"],
  },
  {
    slug: "empleado",
    title: "Empleado HR software",
    domain: "product",
    year: "2023 – 24",
    oneLiner: "Attendance, payroll and shifts for real teams",
    description:
      "Production frontend at Veevo Tech for an HR platform: admin and client dashboards for attendance, payroll, performance and shift scheduling.",
    highlights: ["Reusable dashboard modules", "State with Zustand, data over REST"],
    stack: ["React", "Tailwind", "Zustand", "Axios", "Node.js"],
  },
  {
    slug: "data-pulse",
    title: "Data Pulse dashboard",
    domain: "product",
    year: "2024",
    oneLiner: "Real-time analytics for internal teams",
    description: "Interactive real-time dashboards with live charts that improved operational visibility for internal teams.",
    highlights: ["Live Chart.js visualisations fed by REST APIs"],
    stack: ["JavaScript", "jQuery", "Chart.js", "REST"],
  },
];

export const publications = [
  {
    title: "A maize seed image dataset and processing pipeline for species classification",
    kind: "Dataset paper",
    domain: "vision" as Domain,
    stage: 2,
  },
  {
    title: "AI-powered course creation for adaptive learning",
    kind: "Systems paper",
    domain: "edtech" as Domain,
    stage: 2,
  },
];
export const publicationStages = ["Research", "Experiments", "Writing", "Submitted", "Published"];

export const experience = [
  {
    role: "Mobile app & web developer / researcher",
    org: "AI Brain Lab, Asian Institute of Technology",
    period: "Jun 2025 – present",
    place: "Thailand",
    points: [
      "Architected the React/Next.js AI tutoring platform",
      "Built adaptive learning and course generation interfaces",
      "Led the full UI/UX redesign",
    ],
  },
  {
    role: "Web engineer",
    org: "Veevo Tech",
    period: "Jun 2023 – Aug 2024",
    place: "Peshawar, Pakistan",
    points: ["Built Empleado's HR dashboards", "Shipped the Data Pulse analytics dashboard", "Marketing pages and email templates"],
  },
];

export const education = [
  { degree: "MSc Data Science & AI", school: "Asian Institute of Technology", period: "2024 – 2026", note: "Research on AI tutoring for low-resource areas" },
  { degree: "BSc Computer Science", school: "UET Peshawar", period: "2019 – 2023", note: "Thesis on maize seed classification" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "AI & ML", items: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face", "LoRA", "LLMs", "NLP", "OpenCV"] },
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Material UI", "Zustand", "Redux Toolkit"] },
  { group: "Backend & data", items: ["FastAPI", "Node.js", "Express", "Django", "Flask", "PostgreSQL", "MongoDB", "MySQL", "Neo4j"] },
  { group: "Tools", items: ["Git", "Docker", "Postman", "Android Studio", "Streamlit"] },
];

export const certifications = [
  "Women Leadership in Climate Action — UNITAR (2025)",
  "Cypher Fundamentals & Graph Data Modeling — Neo4j (2025)",
  "Front-End & Back-End Development — Coursera (2023)",
  "Exploratory Data Analysis for ML — Coursera (2023)",
];

// ─── What the twin can show ──────────────────────────────────
export type CardKind = "about" | "projects" | "skills" | "experience" | "research" | "contact" | "availability";

export const suggestions: { q: string; icon: string; cards: CardKind[] }[] = [
  { q: "Who are you?", icon: "user", cards: ["about"] },
  { q: "What projects are you most proud of?", icon: "layers", cards: ["projects"] },
  { q: "What are you researching right now?", icon: "flask", cards: ["research"] },
  { q: "What are your skills?", icon: "sparkles", cards: ["skills"] },
  { q: "Where have you worked?", icon: "briefcase", cards: ["experience"] },
  { q: "How can I reach you?", icon: "mail", cards: ["contact"] },
];

// Built-in replies used when no AI key is set, or as an instant answer.
export const builtInReplies: Record<CardKind, string> = {
  about: `I'm ${profile.firstName}, an AI engineer and frontend developer, originally from Peshawar and now in Bangkok. I finished an MSc in Data Science & AI at AIT, where I research AI tutoring for low-resource areas. I like building the model and the interface around it.`,
  projects: "Here's what I've built, from LLM tutoring and course generation to maize seed classification and Khowar translation. Tap any card for the details.",
  research: "I have two papers in preparation. One describes the maize seed dataset and processing pipeline behind my 92% classifier; the other covers the AI-powered course creation system from my tutoring research.",
  skills: "My toolkit spans both sides: PyTorch, TensorFlow and Hugging Face for the models, React, Next.js and TypeScript for the products people use.",
  experience: "I'm a developer and researcher at AI Brain Lab, AIT, and before that I spent over a year as a web engineer at Veevo Tech shipping HR software and analytics dashboards.",
  contact: "Email is the fastest way to reach me. I usually reply within a day or two.",
  availability: `${profile.availability.headline}. ${profile.availability.detail}`,
};

// Keyword routing for built-in mode. Order matters: first match wins.
export const intents: { kind: CardKind; words: string[] }[] = [
  { kind: "contact", words: ["contact", "reach", "email", "mail", "linkedin", "github", "touch", "hire you", "talk"] },
  { kind: "availability", words: ["available", "availability", "hire", "hiring", "open to", "opportunit", "job", "role", "intern", "relocat"] },
  { kind: "research", words: ["research", "paper", "publication", "publish", "dataset", "thesis", "study", "phd"] },
  { kind: "projects", words: ["project", "built", "build", "proud", "portfolio", "work on", "maize", "khowar", "tutor", "rlhf", "empleado", "course"] },
  { kind: "skills", words: ["skill", "stack", "tech", "language", "tool", "framework", "python", "react", "know"] },
  { kind: "experience", words: ["experience", "worked", "work", "job history", "career", "company", "resume", "cv", "education", "degree", "study", "university"] },
  { kind: "about", words: ["who are you", "about you", "yourself", "background", "introduce", "hello", "hi", "hey", "where are you from"] },
];
