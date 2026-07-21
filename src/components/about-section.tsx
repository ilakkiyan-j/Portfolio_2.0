"use client";

import { useRef } from "react";
import { AnimatedCounter } from "./animated-counter";
import { Code2, Brain, Server } from "lucide-react";

const TECH_STACK = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Prisma", "Docker", "Git", "Tailwind", "Three.js",
  "Ollama", "RASA", "ChromaDB", "Express",
];

function TechRibbon() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative overflow-hidden py-4 -mx-6 md:-mx-12">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-secondary to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3 animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-sm font-medium text-muted-foreground cursor-default shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { label: "DSA Problems Solved", value: 700, suffix: "+" },
    { label: "LeetCode Rating", value: 1641, suffix: "" },
    { label: "API Endpoints Built", value: 50, suffix: "+" },
    { label: "AI Tools Built", value: 20, suffix: "+" },
  ];

  const focusAreas = [
    { icon: Brain, label: "AI Systems", desc: "LLMs, RAG, NLU" },
    { icon: Server, label: "Backend", desc: "APIs, Databases, Auth" },
    { icon: Code2, label: "Full-Stack", desc: "UI to Infrastructure" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ backgroundColor: "var(--surface-secondary)" }}
      className="py-16 md:py-24 relative w-full overflow-x-hidden"
    >
      {/* Subtle nebula glow */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(30, 64, 175, 0.05)" }}
      />

      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span
            className="text-xs font-bold tracking-widest mb-3 block uppercase"
            style={{ color: "var(--primary)" }}
          >
            Behind the Code
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Building at the intersection of{" "}
            <span style={{ color: "var(--primary)" }}>software and intelligence.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Identity Card */}
          <div className="lg:col-span-4 w-full">
            <div
              className="p-6 md:p-7 relative overflow-hidden w-full rounded-2xl"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ border: "1px solid rgba(37,99,235,0.1)" }} />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full pointer-events-none" style={{ border: "1px solid rgba(124,58,237,0.1)" }} />

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-0.5" style={{ color: "var(--foreground)" }}>Ilakkiyan J</h3>
                <p className="font-semibold text-sm mb-5" style={{ color: "var(--primary)" }}>
                  Full-Stack × AI Engineer
                </p>

                <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
                  Based in India
                </div>

                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3.5" style={{ color: "var(--muted-foreground)" }}>
                    Focus Areas
                  </h4>
                  <div className="space-y-2.5">
                    {focusAreas.map((area) => (
                      <div
                        key={area.label}
                        className="flex items-center gap-3 p-2.5 rounded-xl cursor-default transition-all"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "rgba(37,99,235,0.1)", color: "var(--primary)" }}
                        >
                          <area.icon size={16} />
                        </div>
                        <div>
                          <span className="font-semibold text-sm block leading-tight" style={{ color: "var(--foreground)" }}>
                            {area.label}
                          </span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                            {area.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Bio + Metrics + Ribbon */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 w-full min-w-0">
            {/* Bio quote */}
            <div
              className="text-base md:text-lg leading-relaxed font-light w-full"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span className="font-semibold text-2xl leading-none" style={{ color: "var(--foreground)" }}>&ldquo;</span>
              I&apos;m a Computer Science and Design graduate who enjoys building
              complete products — from intuitive interfaces and scalable backends
              to AI-powered applications that solve real problems.
              <span className="font-semibold text-2xl leading-none" style={{ color: "var(--foreground)" }}>&rdquo;</span>
            </div>

            {/* Metrics cards — Using inline styles for guaranteed visibility */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-4 md:p-5 text-center rounded-2xl flex flex-col items-center justify-center min-h-[90px] md:min-h-[110px] transition-all"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    className="text-2xl md:text-3xl lg:text-4xl font-bold block mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  </span>
                  <span
                    className="text-[9px] md:text-[10px] font-bold tracking-wide uppercase leading-snug text-center px-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech stack ribbon */}
            <div className="w-full">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
                Tech Stack
              </h4>
              <TechRibbon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
