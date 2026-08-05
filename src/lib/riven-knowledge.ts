export const PORTFOLIO_KNOWLEDGE = {
  name: "Ilakkiyan J",
  title: "Full-Stack × AI Engineer · IBM SkillsBuild Intern",
  location: "India",
  email: "ilakkiyanj03@gmail.com",
  github: "https://github.com/ilakkiyan-j",
  linkedin: "https://www.linkedin.com/in/ilakkiyan-j",
  resumeUrl: "https://drive.google.com/file/d/1NCUfrOI0J7Ymv0dxNaBgu_C73cklmRvU/view?usp=drive_link",
  
  status: "Open to Full-Time Roles",
  currentRole: "AI Intern @ AICTE — IBM SkillsBuild — 1M1B (Jul 2026 – Aug 2026)",
  internshipFocus: [
    "Large Language Models (LLMs) & IBM Granite",
    "Retrieval-Augmented Generation (RAG) architectures",
    "Agentic AI solutions for sustainability challenges"
  ],
  
  bio: "Computer Science and Design graduate who enjoys building complete products — from intuitive interfaces and scalable backends to AI-powered applications that solve real problems. Recently worked as an AI Intern at IBM SkillsBuild/1M1B.",
  
  metrics: {
    dsaSolved: "700+",
    leetcodeRating: 1641,
    apiEndpoints: "50+",
    aiToolsBuilt: "20+",
  },

  focusAreas: [
    { label: "AI Systems", desc: "LLMs, RAG, NLU, Local Models, Autonomous Agents" },
    { label: "Backend Engineering", desc: "Scalable APIs, Databases, Authentication, Microservices" },
    { label: "Full-Stack Development", desc: "UI to Infrastructure, Next.js, React, Tailwind, Three.js" },
  ],

  projects: [
    {
      name: "SOFI",
      tagline: "Offline AI Desktop Assistant",
      status: "Featured Project",
      description: "A fully offline AI desktop assistant combining local LLM inference, semantic memory, voice interaction, and 20+ desktop automation tools.",
      techStack: ["React", "Electron", "FastAPI", "Python", "Ollama", "ChromaDB", "Vosk", "Coqui-TTS"],
      highlights: [
        "20+ Desktop Automation Tools",
        "100% Local AI (Privacy-focused)",
        "Voice Interaction with Vosk & Coqui-TTS",
        "Semantic Memory using ChromaDB vector database",
        "Ollama (llama3) LLM integration"
      ],
      github: "https://github.com/ilakkiyan-j/sofi",
    },
    {
      name: "MEDORC",
      tagline: "AI-Powered Healthcare Platform",
      status: "Healthcare Platform",
      description: "A secure healthcare platform combining scalable backend architecture, role-based access control, and an intelligent RASA-powered healthcare assistant.",
      techStack: ["TypeScript", "Express", "Prisma", "PostgreSQL", "JWT", "RASA"],
      highlights: [
        "50+ Scalable REST Endpoints",
        "20+ NLU AI Intents & 10+ Custom Entities",
        "Role-Based Access Control (RBAC) & JWT auth",
        "Co-authored research paper presented at ICIRCA 2026 on Digital-Twin-Driven Health Data Orchestration"
      ],
      github: "https://github.com/Medorc/medorc-backend",
    },
    {
      name: "Nexaid",
      tagline: "Emergency Assistance Application",
      description: "Mobile/web application built for emergency response coordination and real-time assistance.",
      year: "2024",
    }
  ],

  achievements: [
    { title: "Smart India Hackathon", detail: "2nd Place among 30+ competing teams in internal SIH selections (2024)" },
    { title: "Avantaa Project Expo", detail: "3rd Place among competing teams for technical project innovation (2024)" },
    { title: "ICIRCA 2026 Research", detail: "Co-authored and presented research on Digital-Twin-Driven Health Data Orchestration (2026)" },
    { title: "Agentic AI Certified Foundations Associate", detail: "Oracle Certified Foundations Associate credential in Agentic AI (Jul 2026)" },
    { title: "HackerRank Software Engineer", detail: "Certified Software Engineer (Jul 2025)" },
    { title: "The Complete 2024 Web Development Bootcamp", detail: "Udemy Full-Stack Web Development certification (Nov 2024)" },
    { title: "Datacom Job Simulation", detail: "Completed Software Engineering Job Simulation" },
  ],

  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js / React Three Fiber", "GSAP"],
    backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Prisma ORM", "RESTful APIs", "JWT"],
    aiAndMl: ["Ollama", "Local LLMs", "RASA NLU", "ChromaDB (Vector DB)", "LangChain / RAG", "Vosk", "Coqui-TTS"],
    devopsAndTools: ["Docker", "Git / GitHub", "Electron", "Postman", "Linux"],
  }
};

export const RIVEN_SYSTEM_PROMPT = `
You are RIVEN, an AI assistant built into Ilakkiyan J's portfolio website.
Your mission is to represent Ilakkiyan to recruiters, engineering managers, clients, and visitors.
You speak directly, confidently, professionally, and warmly. You maintain a sleek, intelligent, tech-forward persona.

Key Guidelines:
  - State clearly that Ilakkiyan recently completed an AI Internship @ AICTE — IBM SkillsBuild — 1M1B (Jul 2026 – Aug 2026) and is actively seeking full-time Full-Stack & AI Software Engineering roles.
  - Detail his internship focus on Large Language Models (LLMs), IBM Granite, RAG, and Agentic AI solutions.
  - Highlight Ilakkiyan's technical strengths: Full-Stack engineering, AI integration, 700+ DSA problems solved, 1641 LeetCode rating, building production-ready projects (SOFI, MEDORC).
  - Keep responses concise (2-4 paragraphs max or clean bullet points). Avoid fluff or overly robotic pleasantries.
  - Always provide helpful direct links (emailing him at ilakkiyanj03@gmail.com, GitHub at https://github.com/ilakkiyan-j, LinkedIn at https://www.linkedin.com/in/ilakkiyan-j).

Here is the exact data about Ilakkiyan J:
${JSON.stringify(PORTFOLIO_KNOWLEDGE, null, 2)}
`;
