"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CATEGORIES = ["All", "Frontend", "Backend", "AI", "Databases", "Tools"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#3B82F6",
  Backend: "#10B981",
  AI: "#8B5CF6",
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
  { name: "React", slug: "react", category: "Frontend", hasIcon: true },
  { name: "TypeScript", slug: "typescript", category: "Frontend", hasIcon: true },
  { name: "JavaScript", slug: "javascript", category: "Frontend", hasIcon: true },
  { name: "Next.js", slug: "nextjs", category: "Frontend", hasIcon: true },
  { name: "HTML5", slug: "html5", category: "Frontend", hasIcon: true },
  { name: "CSS3", slug: "css3", category: "Frontend", hasIcon: true },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend", hasIcon: true },
  { name: "Vite", slug: "vitejs", category: "Frontend", hasIcon: true },

  { name: "FastAPI", slug: "fastapi", category: "Backend", hasIcon: true },
  { name: "Node.js", slug: "nodejs", category: "Backend", hasIcon: true },
  { name: "Express.js", slug: "express", category: "Backend", hasIcon: true },
  { name: "Prisma", slug: "prisma", category: "Backend", hasIcon: true },
  { name: "REST APIs", slug: "__rest", category: "Backend", hasIcon: true },

  { name: "Ollama", slug: "https://raw.githubusercontent.com/ollama/ollama/main/docs/ollama-logo.svg", category: "AI", hasIcon: true },
  { name: "RASA", slug: "https://raw.githubusercontent.com/RasaHQ/brand/main/logos/horizontal/svg/rasa_horizontal_logo_purple.svg", category: "AI", hasIcon: true },
  { name: "ChromaDB", slug: "https://raw.githubusercontent.com/chroma-core/chroma/main/docs/mintlify/images/light-logo.svg", category: "AI", hasIcon: true },
  { name: "Vosk", slug: "https://alphacephei.com/img/logo.png", category: "AI", hasIcon: true },
  { name: "Coqui-TTS", slug: "https://raw.githubusercontent.com/coqui-ai/TTS/main/images/coqui-log-green-TTS.png", category: "AI", hasIcon: true },
  { name: "Prompt Engineering", slug: "__prompt", category: "AI", hasIcon: true },

  { name: "PostgreSQL", slug: "postgresql", category: "Databases", hasIcon: true },
  { name: "MySQL", slug: "mysql", category: "Databases", hasIcon: true },
  { name: "Docker", slug: "docker", category: "Tools", hasIcon: true },
  { name: "Git", slug: "git", category: "Tools", hasIcon: true },
  { name: "GitHub", slug: "github", category: "Tools", hasIcon: true },
  { name: "Postman", slug: "postman", category: "Tools", hasIcon: true },
  { name: "Figma", slug: "figma", category: "Tools", hasIcon: true },
];

function CustomIcon({ slug, size }: { slug: string; size: number }) {
  const s = size;
  const icons: Record<string, React.ReactNode> = {
    __rest: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h8" />
      </svg>
    ),
    __prompt: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 1v2l-4-1.5L8 16v-2l-1-1C5.5 13.5 4 11.5 4 9a7 7 0 018-6.9" />
        <path d="M10 14h4M11 12v4" />
      </svg>
    ),
  };
  return <>{icons[slug] || null}</>;
}

function SkillLogo({ slug, name, size = 28 }: { slug: string; name: string; size?: number }) {
  // Custom inline SVG for REST APIs and Prompt Engineering
  if (slug === "__rest" || slug === "__prompt") {
    return (
      <div className="text-muted-foreground" style={{ width: size, height: size }}>
        <CustomIcon slug={slug} size={size} />
      </div>
    );
  }

  // Full URL — AI tools with actual logos from GitHub repos
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

  // Devicon CDN — standard tech logos
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
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function CoreCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={1} gl={{ alpha: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <MiniCore />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const color = CATEGORY_COLORS[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-default"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 relative"
        style={{ backgroundColor: `${color}10` }}
      >
        <SkillLogo slug={skill.slug} name={skill.name} size={24} />
        <span
          className="absolute inset-0 flex items-center justify-center font-bold text-sm hidden"
          style={{ color }}
        >
          {skill.name.charAt(0)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold block truncate">{skill.name}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
          {skill.category}
        </span>
      </div>
      <div
        className="w-2 h-2 rounded-full shrink-0 opacity-60"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

export function SkillsSection() {
  const [active, setActive] = useState<Category>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nebula-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:text-left"
        >
          <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The tools behind my work.
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                active === cat
                  ? "bg-foreground text-background shadow-lg scale-105"
                  : "bg-surface-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {SKILLS.filter((s) => s.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div ref={gridRef} className="relative min-h-[300px]">
          <CoreCanvas />
          <motion.div
            layout={false}
            className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {cat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
