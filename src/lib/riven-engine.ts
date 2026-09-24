import { PORTFOLIO_KNOWLEDGE } from "./riven-knowledge";

export function generateKnowledgeEngineResponse(prompt: string): string {
  const query = prompt.toLowerCase().trim();

  // Helper for fuzzy matching
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
    query.includes("server") ||
    query.includes("aws") ||
    query.includes("cloud");

  const isAI =
    query.includes("ai") ||
    query.includes("agentic") ||
    query.includes("llm") ||
    query.includes("rag") ||
    query.includes("bedrock") ||
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

  // 1. ALXO Platform
  if (
    query.includes("alxo") ||
    query.includes("scope creep") ||
    query.includes("change order") ||
    query.includes("scope management")
  ) {
    return `**ALXO — AI Scope Management Platform (Sep 2026)**

Ilakkiyan led backend architecture and AWS infrastructure for ALXO, an enterprise AI platform that monitors client conversations to detect scope creep and automatically draft evidence-backed change orders:

• **Bedrock Claude Integration**: Uses Amazon Bedrock Claude-based classification to detect out-of-scope requests in real-time.
• **Deterministic Math**: Calculates exact cost and timeline impacts mathematically rather than guessing.
• **AWS Infrastructure**: Built with Next.js, TypeScript, Amazon Bedrock, DynamoDB, S3, and AWS Amplify.
• **Deliverables**: Evidence-backed change orders with full audit trails.`;
  }

  // 2. ReServe AI & IBM Internship
  if (
    query.includes("reserve") ||
    query.includes("food surplus") ||
    query.includes("internship") ||
    query.includes("intern") ||
    query.includes("ibm") ||
    query.includes("skillsbuild")
  ) {
    return `Ilakkiyan completed an **AI Internship** at **AICTE — IBM SkillsBuild — 1M1B** (Jul 2026 – Sep 2026) focused on Applied AI for sustainability:

• **ReServe AI**: Architected an AI platform for food surplus forecasting, redistribution, and food safety assistance.
• **AI Engineering**: Applied prompt engineering, Natural Language Processing (NLP), and Retrieval-Augmented Generation (RAG).
• **Responsible AI**: Ensured robust data ethics and safety guidelines throughout the model pipelines.

He is currently actively interviewing for full-time Software Engineering & AI roles. Reach out at **[ilakkiyanj03@gmail.com](mailto:ilakkiyanj03@gmail.com)**!`;
  }

  // 3. MEDORC & Research
  if (query.includes("medorc") || query.includes("healthcare") || query.includes("icirca") || query.includes("digital twin") || query.includes("research") || query.includes("paper")) {
    return `**MEDORC — AI-Powered Healthcare Platform & Research**

• **Architecture**: Architected 50+ type-safe RESTful APIs with role-based JWT authentication using TypeScript, Express.js, Prisma ORM, and PostgreSQL on Neon.
• **Clinical NLU**: Built a RASA healthcare assistant with 20+ intents and 10+ custom entities for natural-language clinical queries.
• **Publication**: Co-authored *"Medorc: A Digital-Twin-Driven Framework for Real-Time Health Data Orchestration"*, presented at **ICIRCA 2026**.
• **Deployment**: Deployed full-stack using Vercel, Render, and Neon.`;
  }

  // 4. SOFI
  if (query.includes("sofi") || query.includes("offline") || query.includes("desktop assistant")) {
    return `**SOFI — 100% Offline AI Desktop Assistant**

A local desktop assistant built with React, Electron, FastAPI, and Python:
• **Offline Inference**: Powered by local LLMs via Ollama (llama3) with zero cloud dependency.
• **Semantic Memory**: ChromaDB vector store for conversational memory and recall.
• **Voice Engine**: Offline speech recognition with Vosk and speech synthesis with Coqui-TTS.
• **Automation**: 20+ desktop automation tools.
• **Code**: Available on [GitHub](https://github.com/ilakkiyan-j/sofi).`;
  }

  // 5. Certifications & Hackathons
  if (query.includes("certification") || query.includes("certificate") || query.includes("oracle") || query.includes("hackerrank") || query.includes("hackathon") || query.includes("sih")) {
    return `**Certifications & Competitive Achievements:**

• **Oracle Certified**: *Agentic AI Certified Foundations Associate* (Jul 2026) — expertise in foundation models, agentic workflows, and autonomous systems.
• **HackerRank**: *Software Engineer Certified* (Jul 2025).
• **Udemy**: *The Complete 2024 Web Development Bootcamp* (Nov 2024).
• **Smart India Hackathon (SIH)**: Secured **2nd Place** in internal college round among 30+ teams.
• **Avantaa'24 Project Expo**: Led team to **3rd Place** for *Nexaid*.
• **Problem Solving**: LeetCode Contest Rating: **1641**, with **700+ DSA problems solved** across LeetCode & GeeksforGeeks.`;
  }

  // 6. Frontend Role Query
  if (isFrontend && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan is an exceptional candidate for **Frontend / UI Engineering**:

1. **Modern Stack**: Production expertise in React.js, Next.js (App Router), TypeScript, and Tailwind CSS.
2. **Interactive UI & 3D**: Skilled in Framer Motion, GSAP scroll triggers, and Three.js for responsive, immersive user experiences.
3. **Computer Science & Design Degree**: Formal education combining UI/UX principles, component architecture, and engineering rigor.
4. **Complex Dashboards**: Engineered high-density interfaces for ALXO (AWS Bedrock audit dashboard) and SOFI (Electron desktop client).`;
  }

  // 7. Backend & Cloud Role Query
  if (isBackend && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan stands out for **Backend & Cloud Infrastructure** roles:

1. **AWS & Cloud Architecture**: Built and deployed production backends using AWS Amplify, Amazon Bedrock, DynamoDB, and S3 (ALXO).
2. **High-Volume APIs**: Architected 50+ type-safe REST APIs in Express.js/FastAPI with JWT authentication, role-based access control, and PostgreSQL/Prisma.
3. **Deterministic Math & Data Modeling**: Engineered deterministic cost calculations and structured audit trails.
4. **Strong DSA Foundations**: 700+ solved algorithmic problems with a 1641 LeetCode contest rating ensure performant, scalable design.`;
  }

  // 8. AI & Agentic Role Query
  if (isAI && (isHiringQuery || query.includes("work") || query.includes("experience"))) {
    return `Here is why Ilakkiyan is ideally suited for **Agentic AI & LLM Systems** roles:

1. **Agentic Workflows**: Oracle Certified Foundations Associate in Agentic AI; built Bedrock Claude classification pipelines for ALXO.
2. **Applied RAG & NLP**: Developed ReServe AI at IBM SkillsBuild/1M1B with RAG architectures and prompt engineering.
3. **Local & Cloud LLMs**: Deployed both local air-gapped LLMs (Ollama, ChromaDB) and cloud foundation models (Amazon Bedrock).
4. **Academic Research**: Co-authored ICIRCA 2026 research on digital twin health data orchestration.`;
  }

  // 9. Fullstack Role Query
  if (isFullstack && isHiringQuery) {
    return `Here is why Ilakkiyan excels as a **Full-Stack Engineer**:

1. **End-to-End Ownership**: Delivers complete products from Next.js frontends to AWS backends, DynamoDB/Postgres databases, and cloud deployment.
2. **AI-Native Engineering**: Integrates LLMs, Bedrock, and vector databases directly into full-stack product experiences.
3. **Proven Problem Solving**: 700+ DSA problems solved (1641 LeetCode rating) and top hackathon placements (SIH 2nd place, Avantaa 3rd place).`;
  }

  // 10. Resume Summary
  if (query.includes("resume") || query.includes("summarize") || query.includes("summary") || query.includes("overview") || query.includes("30s")) {
    return `**Ilakkiyan J — Full-Stack & Agentic AI Engineer**

• **Education**: B.E. Computer Science and Design, Karpagam College of Engineering (CGPA: 8.5/10, Apr 2026).
• **Core Experience**: AI Intern at AICTE — IBM SkillsBuild — 1M1B (Built ReServe AI for sustainability).
• **Key Projects**:
  - **ALXO**: AI Scope Management with Amazon Bedrock Claude, DynamoDB, S3, Amplify.
  - **MEDORC**: 50+ REST APIs, RASA healthcare bot, ICIRCA 2026 paper presented.
  - **SOFI**: 100% offline desktop AI assistant with Ollama and 20+ automation tools.
• **Metrics**: 700+ DSA problems solved (1641 LeetCode), Oracle Agentic AI Certified, 2nd Place at SIH Hackathon.
• **Contact**: [ilakkiyanj03@gmail.com](mailto:ilakkiyanj03@gmail.com) | [LinkedIn](https://www.linkedin.com/in/ilakkiyan-j) | [GitHub](https://github.com/ilakkiyan-j)`;
  }

  // 11. DSA / LeetCode
  if (query.includes("dsa") || query.includes("leetcode") || query.includes("rating") || query.includes("problem")) {
    return `Ilakkiyan has a strong algorithmic and problem-solving foundation:
• **DSA Problems Solved**: 700+ across LeetCode & GeeksforGeeks
• **LeetCode Contest Rating**: 1641
• Focuses on graphs, trees, dynamic programming, and writing optimized, memory-efficient code.`;
  }

  // 12. Skills / Tech Stack
  if (query.includes("skill") || query.includes("stack") || query.includes("technology") || query.includes("languages") || query.includes("python") || query.includes("react") || query.includes("typescript")) {
    return `**Ilakkiyan's Core Tech Stack:**

• **Languages**: Python, TypeScript, JavaScript, C++
• **Frontend**: React.js, Next.js, Tailwind CSS, HTML5, CSS3, Vite
• **Backend**: FastAPI, Node.js, Express.js, Prisma ORM, RESTful APIs, JWT
• **AI & ML**: Agentic AI, Amazon Bedrock, LLMs, RAG, Ollama, RASA, Prompt Engineering
• **Cloud & DevOps**: AWS Amplify, Amazon S3, AWS Cognito, Vercel, Render, Docker
• **Databases**: PostgreSQL, DynamoDB, MySQL`;
  }

  // 13. Contact
  if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("linkedin") || query.includes("github")) {
    return `You can connect with Ilakkiyan directly:
• **Email**: [ilakkiyanj03@gmail.com](mailto:ilakkiyanj03@gmail.com)
• **Phone**: +91 9003723837
• **LinkedIn**: [linkedin.com/in/ilakkiyan-j](https://www.linkedin.com/in/ilakkiyan-j)
• **GitHub**: [github.com/ilakkiyan-j](https://github.com/ilakkiyan-j)
• **Portfolio**: [ilakkiyan.tech](https://ilakkiyan.tech)`;
  }

  // Default response
  return `Ilakkiyan J is a Full-Stack & Agentic AI Engineer specializing in cloud infrastructure, scalable backends, and foundation model applications.

Key Projects & Highlights:
• **ALXO**: Enterprise AI Scope Management on AWS Bedrock (Claude 3.5), DynamoDB, and Amplify.
• **MEDORC**: 50+ type-safe APIs, RASA assistant, and ICIRCA 2026 published research.
• **ReServe AI**: AI platform for food surplus forecasting & redistribution (IBM SkillsBuild internship).
• **Problem Solving**: 700+ DSA problems solved (1641 LeetCode rating) and Oracle Agentic AI certification.

Ask me anything about his projects, architecture, certifications, or why he's a great hire for your team!`;
}
