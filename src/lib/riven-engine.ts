import { PORTFOLIO_KNOWLEDGE } from "./riven-knowledge";

export function generateKnowledgeEngineResponse(prompt: string): string {
  const query = prompt.toLowerCase().trim();

  // Helper for fuzzy matching typos
  const isFrontend =
    query.includes("frontend") ||
    query.includes("frotend") ||
    query.includes("front") ||
    query.includes("ui") ||
    query.includes("ux") ||
    query.includes("client");

  const isBackend =
    query.includes("backend") ||
    query.includes("bakend") ||
    query.includes("back") ||
    query.includes("api") ||
    query.includes("database") ||
    query.includes("server");

  const isAI =
    query.includes("ai") ||
    query.includes("llm") ||
    query.includes("rag") ||
    query.includes("nlu") ||
    query.includes("machine learning") ||
    query.includes("ml");

  const isFullstack =
    query.includes("fullstack") ||
    query.includes("full-stack") ||
    query.includes("full stack");

  const isHiringQuery =
    query.includes("hire") ||
    query.includes("interview") ||
    query.includes("why should") ||
    query.includes("join") ||
    query.includes("role") ||
    query.includes("position");

  // Freelance / Current Work Query
  if (
    query.includes("freelance") ||
    query.includes("freelancing") ||
    query.includes("landing page") ||
    query.includes("logo") ||
    query.includes("business card") ||
    query.includes("currently doing") ||
    query.includes("current work") ||
    query.includes("now")
  ) {
    return `Ilakkiyan is currently working as an **Independent Freelancer** (Jul 2026 – Present) while actively seeking full-time **Software Engineering & AI Engineer** roles.

As a freelancer, he specializes in:
• **High-Converting Landing Pages & Custom Portfolios** (React, Next.js, Tailwind)
• **Brand Logo Design & Identity**
• **Business Card & Print Collateral Design**

If you'd like to hire him for freelance work or discuss full-time engineering roles, reach out at **[ilakkiyanj03@gmail.com](mailto:ilakkiyanj03@gmail.com)**!`;
  }

  // 1. Frontend Role Query (handles "Why should I hire him for a frotend role", etc.)
  if (isFrontend && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan is an exceptional fit for a **Frontend / UI Engineering** role:

1. **Modern Frontend Stack**: Expert in React, Next.js (App Router), TypeScript, and Tailwind CSS for building modern, high-performance web applications.
2. **Advanced Interactive UI & 3D**: Skilled in GSAP scroll animations, Framer Motion micro-interactions, and Three.js / React Three Fiber for immersive 3D experiences.
3. **Computer Science & Design Degree**: Formal background combining software engineering with clean visual design principles, glassmorphism UI, and component-driven architecture.
4. **Desktop & Application UIs**: Built rich client interfaces for Electron applications (SOFI AI Assistant) and complex web dashboards.`;
  }

  // 2. Backend Role Query
  if (isBackend && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan is a strong candidate for a **Backend / Systems Engineering** role:

1. **Scalable Backend Architecture**: Built 50+ RESTful API endpoints using Node.js, Express, and FastAPI with robust error handling and structured middleware.
2. **Databases & Data Modeling**: Skilled in PostgreSQL, Prisma ORM, and optimized relational database schema design.
3. **Security & Authentication**: Implemented Role-Based Access Control (RBAC), JWT authentication, and secure healthcare data pipelines (MEDORC).
4. **Strong DSA Foundation**: Solved 700+ DSA problems (1641 LeetCode rating) ensuring low-latency data structures and optimized algorithms.`;
  }

  // 3. AI / Machine Learning Role Query
  if (isAI && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan stands out for an **AI / Systems Engineering** role:

1. **Local LLM Systems**: Built SOFI, a 100% offline AI desktop assistant using Ollama (llama3), Vosk speech recognition, and Coqui-TTS.
2. **Vector DB & RAG**: Deep experience integrating ChromaDB vector database for semantic search and Retrieval-Augmented Generation.
3. **Conversational NLU**: Created MEDORC featuring 20+ NLU intents and custom entity recognition using RASA.
4. **Published Research**: Co-authored and presented research on Digital-Twin-Driven Health Data Orchestration at ICIRCA 2026.`;
  }

  // 4. Fullstack Role Query
  if (isFullstack && isHiringQuery) {
    return `Here is why Ilakkiyan excels as a **Full-Stack Engineer**:

1. **End-to-End Delivery**: Bridges frontend React/Next.js interfaces seamlessly with Node.js/FastAPI backends and PostgreSQL databases.
2. **AI & Cloud Integration**: Combines traditional web development with modern AI integrations (LLMs, vector stores, NLU).
3. **Computer Science & Design Degree**: Solves both product design (UI/UX) and core systems engineering challenges.
4. **Proven Track Record**: 700+ DSA problems solved, hackathon winner (SIH, Avantaa Expo), and published ICIRCA 2026 researcher.`;
  }

  // 5. Resume Summary / 30s Summary
  if (query.includes("resume") || query.includes("summarize") || query.includes("summary") || query.includes("overview") || query.includes("30s")) {
    return `Ilakkiyan J is a Full-Stack × AI Engineer based in India with a strong background in Computer Science & Design.

Key Highlights:
• **AI & Systems**: Built SOFI (100% offline AI desktop assistant with 20+ automation tools, Ollama & ChromaDB) and MEDORC (Healthcare backend + RASA assistant).
• **Core Metrics**: Solved 700+ DSA problems (LeetCode 1641), built 50+ REST endpoints and 20+ AI tools.
• **Research & Awards**: 2nd Place in SIH internal selections, 3rd Place in Avantaa Expo, and co-authored ICIRCA 2026 research on Health Data Orchestration.
• **Stack**: React, Next.js, Node.js, Express, Python, FastAPI, TypeScript, PostgreSQL, Prisma, Docker.`;
  }

  // 6. Project: SOFI
  if (query.includes("sofi") || query.includes("offline ai") || query.includes("desktop assistant")) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find((item) => item.name === "SOFI")!;
    return `**SOFI — Offline AI Desktop Assistant**

${p.description}

• **Tech Stack**: ${p.techStack?.join(", ") ?? "React, Electron, FastAPI, Python, Ollama, ChromaDB"}
• **Key Capabilities**: 20+ desktop automation tools, 100% local AI privacy, Vosk & Coqui-TTS voice interaction, ChromaDB semantic memory.
• **GitHub**: [github.com/ilakkiyan-j/sofi](${p.github})`;
  }

  // 7. Project: MEDORC
  if (query.includes("medorc") || query.includes("healthcare")) {
    const p = PORTFOLIO_KNOWLEDGE.projects.find((item) => item.name === "MEDORC")!;
    return `**MEDORC — AI-Powered Healthcare Platform**

${p.description}

• **Tech Stack**: ${p.techStack?.join(", ") ?? "TypeScript, Express, Prisma, PostgreSQL, RASA"}
• **Key Capabilities**: 50+ REST endpoints, 20+ NLU AI intents with RASA, Role-Based Access Control (RBAC), JWT authentication.
• **Research**: ICIRCA 2026 paper co-authored on Digital-Twin-Driven Health Data Orchestration.
• **GitHub**: [github.com/Medorc/medorc-backend](${p.github})`;
  }

  // 8. DSA / LeetCode / Coding Stats
  if (query.includes("dsa") || query.includes("leetcode") || query.includes("rating") || query.includes("problem")) {
    return `Ilakkiyan has a strong algorithmic foundation:
• **DSA Problems Solved**: 700+
• **LeetCode Rating**: 1641
• Focuses on efficient data structures, graph algorithms, dynamic programming, and backend performance optimization.`;
  }

  // 9. Generic "Why Hire" / Interview Query
  if (isHiringQuery) {
    return `Here is why Ilakkiyan would be a strong asset to your engineering team:

1. **Production AI & LLM Expertise**: He doesn't just call APIs; he builds local LLM systems (Ollama, ChromaDB), NLU bots (RASA), and desktop automation agents.
2. **Solid Algorithmic Foundation**: 700+ DSA problems solved and a 1641 LeetCode rating demonstrate strong problem-solving and optimization skills.
3. **Full-Stack End-to-End Capability**: Experience extending from modern Next.js/React UIs to complex Node.js/FastAPI backends, PostgreSQL databases, and Docker containerization.
4. **Proven Impact**: Co-authored ICIRCA 2026 research paper and earned top awards in hackathons (SIH 2nd place, Avantaa Expo 3rd place).`;
  }

  // 10. Skills / Tech Stack
  if (query.includes("skill") || query.includes("stack") || query.includes("technology") || query.includes("languages") || query.includes("python") || query.includes("react") || query.includes("typescript")) {
    return `Ilakkiyan's Technical Stack:

• **Languages**: ${PORTFOLIO_KNOWLEDGE.skills.languages.join(", ")}
• **Frontend**: ${PORTFOLIO_KNOWLEDGE.skills.frontend.join(", ")}
• **Backend**: ${PORTFOLIO_KNOWLEDGE.skills.backend.join(", ")}
• **AI & ML**: ${PORTFOLIO_KNOWLEDGE.skills.aiAndMl.join(", ")}
• **DevOps & Tools**: ${PORTFOLIO_KNOWLEDGE.skills.devopsAndTools.join(", ")}`;
  }

  // 11. Contact / Email / Reach out
  if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("linkedin") || query.includes("github")) {
    return `You can get in touch with Ilakkiyan directly:
• **Email**: ${PORTFOLIO_KNOWLEDGE.email}
• **GitHub**: [${PORTFOLIO_KNOWLEDGE.github}](${PORTFOLIO_KNOWLEDGE.github})
• **LinkedIn**: [${PORTFOLIO_KNOWLEDGE.linkedin}](${PORTFOLIO_KNOWLEDGE.linkedin})
• **Resume**: [Download Resume](${PORTFOLIO_KNOWLEDGE.resumeUrl})`;
  }

  // 12. Default response
  return `Ilakkiyan J is a Full-Stack & AI Engineer specializing in building intelligent software, scalable backends, and AI integrations.

He has built key projects like **SOFI** (Offline AI Assistant) and **MEDORC** (Healthcare platform), solved 700+ DSA problems (1641 LeetCode), and co-authored ICIRCA 2026 AI research.

You can ask me about:
• "Why should I hire him for a frontend role?"
• "Why should I hire him for a backend role?"
• "Summarize his resume"
• "Explain Sofi or Medorc"
• "What are his technical skills?"`;
}
