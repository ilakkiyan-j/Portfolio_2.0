"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CATEGORIES = [
  "All",
  "AI & ML",
  "Cloud & DevOps",
  "Backend",
  "Frontend",
  "Databases",
  "Tools",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  "AI & ML": "#8B5CF6",
  "Cloud & DevOps": "#F97316",
  Backend: "#10B981",
  Frontend: "#3B82F6",
  Databases: "#F59E0B",
  Tools: "#EC4899",
};

interface Skill {
  name: string;
  slug: string;
  category: Category;
  hasIcon: boolean;
}

const SKILLS: Skill[] = [
  // AI & ML
  { name: "Agentic AI", slug: "__agentic", category: "AI & ML", hasIcon: true },
  { name: "Amazon Bedrock", slug: "__bedrock", category: "AI & ML", hasIcon: true },
  { name: "RAG", slug: "__rag", category: "AI & ML", hasIcon: true },
  { name: "LLMs", slug: "__llm", category: "AI & ML", hasIcon: true },
  { name: "Ollama", slug: "https://raw.githubusercontent.com/ollama/ollama/main/docs/ollama-logo.svg", category: "AI & ML", hasIcon: true },
  { name: "RASA", slug: "https://raw.githubusercontent.com/RasaHQ/brand/main/logos/horizontal/svg/rasa_horizontal_logo_purple.svg", category: "AI & ML", hasIcon: true },
  { name: "Prompt Engineering", slug: "__prompt", category: "AI & ML", hasIcon: true },
  { name: "ChromaDB", slug: "https://raw.githubusercontent.com/chroma-core/chroma/main/docs/mintlify/images/light-logo.svg", category: "AI & ML", hasIcon: true },

  // Cloud & DevOps
  { name: "AWS Amplify", slug: "__amplify", category: "Cloud & DevOps", hasIcon: true },
  { name: "Amazon S3", slug: "__s3", category: "Cloud & DevOps", hasIcon: true },
  { name: "AWS Cognito", slug: "__cognito", category: "Cloud & DevOps", hasIcon: true },
  { name: "Vercel", slug: "vercel", category: "Cloud & DevOps", hasIcon: true },
  { name: "Render", slug: "__render", category: "Cloud & DevOps", hasIcon: true },
  { name: "Docker", slug: "docker", category: "Cloud & DevOps", hasIcon: true },

  // Backend & Languages
  { name: "Python", slug: "python", category: "Backend", hasIcon: true },
  { name: "TypeScript", slug: "typescript", category: "Backend", hasIcon: true },
  { name: "C++", slug: "cplusplus", category: "Backend", hasIcon: true },
  { name: "FastAPI", slug: "fastapi", category: "Backend", hasIcon: true },
  { name: "Node.js", slug: "nodejs", category: "Backend", hasIcon: true },
  { name: "Express.js", slug: "express", category: "Backend", hasIcon: true },
  { name: "Prisma ORM", slug: "prisma", category: "Backend", hasIcon: true },
  { name: "REST APIs", slug: "__rest", category: "Backend", hasIcon: true },

  // Frontend
  { name: "React.js", slug: "react", category: "Frontend", hasIcon: true },
  { name: "Next.js", slug: "nextjs", category: "Frontend", hasIcon: true },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend", hasIcon: true },
  { name: "JavaScript", slug: "javascript", category: "Frontend", hasIcon: true },
  { name: "HTML5", slug: "html5", category: "Frontend", hasIcon: true },
  { name: "CSS3", slug: "css3", category: "Frontend", hasIcon: true },

  // Databases
  { name: "PostgreSQL", slug: "postgresql", category: "Databases", hasIcon: true },
  { name: "DynamoDB", slug: "__dynamodb", category: "Databases", hasIcon: true },
  { name: "MySQL", slug: "mysql", category: "Databases", hasIcon: true },

  // Tools
  { name: "Git", slug: "git", category: "Tools", hasIcon: true },
  { name: "GitHub", slug: "github", category: "Tools", hasIcon: true },
  { name: "Postman", slug: "postman", category: "Tools", hasIcon: true },
  { name: "Figma", slug: "figma", category: "Tools", hasIcon: true },
];

function CustomIcon({ slug, size }: { slug: string; size: number }) {
  const s = size;
  const icons: Record<string, React.ReactNode> = {
    __rest: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h8" />
      </svg>
    ),
    __prompt: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 1v2l-4-1.5L8 16v-2l-1-1C5.5 13.5 4 11.5 4 9a7 7 0 018-6.9" />
        <path d="M10 14h4M11 12v4" />
      </svg>
    ),
    __agentic: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    __bedrock: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
        <path d="M12 22V12M21 7l-9 5-9-5" />
      </svg>
    ),
    __rag: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
        <path d="M6 6h10M6 10h10M14 18l3-3m0 0l3 3m-3-3v6" />
      </svg>
    ),
    __llm: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-.96A8.93 8.93 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
        <path d="M9 10h.01M12 12h.01M15 14h.01" />
      </svg>
    ),
    __amplify: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20L12 4l8 16H4z" />
        <path d="M8 20l4-8 4 8" />
      </svg>
    ),
    __s3: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    __cognito: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    __render: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" />
      </svg>
    ),
    __dynamodb: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M13 10l-2 4h4l-2 4" />
      </svg>
    ),
  };
  return <>{icons[slug] || null}</>;
}

function SkillLogo({ slug, name, size = 28 }: { slug: string; name: string; size?: number }) {
  if (slug.startsWith("__")) {
    return (
      <div className="text-muted-foreground group-hover:text-primary transition-colors" style={{ width: size, height: size }}>
        <CustomIcon slug={slug} size={size} />
      </div>
    );
  }

  if (slug.startsWith("http")) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={slug}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.classList.remove("hidden");
        }}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!target.src.includes("-plain")) {
          target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-plain.svg`;
        } else {
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.classList.remove("hidden");
        }
      }}
    />
  );
}

function MiniCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#8B5CF6"
        wireframe
        emissive="#8B5CF6"
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = SKILLS.filter((s) => {
    const matchesCat = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 bg-surface-secondary relative overflow-hidden">
      {/* 3D background canvas */}
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-40">
        {mounted && (
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[2, 2, 2]} />
              <MiniCore />
            </Canvas>
          </Suspense>
        )}
      </div>

      <div className="w-full px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
            Technical Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Tools of the Trade.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
            A comprehensive overview of my core engineering, cloud infrastructure, and Agentic AI toolkit.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-sm scale-105"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 px-4 py-1.5 rounded-full bg-surface border border-border text-xs focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-colors"
          />
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <AnimatePresence>
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group relative p-4 rounded-xl border border-border bg-surface hover:border-primary/40 hover:bg-surface/80 transition-all flex flex-col items-center justify-center gap-3 cursor-default shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 flex items-center justify-center relative">
                  <SkillLogo slug={skill.slug} name={skill.name} size={30} />
                  <div className="hidden text-xs font-bold text-muted-foreground">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </div>
                  <div
                    className="text-[9px] font-mono mt-0.5"
                    style={{ color: CATEGORY_COLORS[skill.category] || "var(--muted-foreground)" }}
                  >
                    {skill.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            No technologies found matching &quot;{search}&quot;.
          </div>
        )}
      </div>
    </section>
  );
}
