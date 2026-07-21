"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageSquare, Terminal, Trophy } from "lucide-react";
import { GithubIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function SofiMockup() {
  return (
    <TiltCard className="relative aspect-[4/3] rounded-2xl border border-border bg-surface-secondary overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-secondary/5 opacity-40 group-hover:opacity-80 transition-opacity" />
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="h-9 border-b border-border bg-surface-secondary flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-3 text-[10px] font-mono text-muted-foreground">sofi-assistant</span>
          </div>
          {/* Terminal body */}
          <div className="p-4 font-mono text-xs leading-relaxed space-y-2 min-h-[200px]">
            <div className="flex items-center gap-1.5 text-primary">
              <Terminal size={12} />
              <span>[System] Initializing local LLM engine...</span>
            </div>
            <div className="text-muted-foreground">&gt; Ollama (llama3) loaded</div>
            <div className="text-muted-foreground">&gt; ChromaDB connected</div>
            <div className="text-muted-foreground">&gt; Vosk voice engine ready</div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="text-foreground">&gt; &quot;Sofi, summarize my emails and draft a reply&quot;</div>
              <div className="text-primary mt-1 animate-pulse">
                &gt; Sofi: &quot;Found 3 new emails. Drafted response to urgent one.&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function MedorcMockup() {
  return (
    <TiltCard className="relative aspect-[4/3] rounded-2xl border border-border bg-surface-secondary overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-accent-secondary/5 opacity-40 group-hover:opacity-80 transition-opacity" />
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="relative w-full max-w-sm">
          {/* Node network visualization */}
          <div className="relative h-48 flex items-center justify-center">
            {/* Center node */}
            <div className="w-16 h-16 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center z-10 animate-pulse">
              <span className="text-xs font-bold text-primary">API</span>
            </div>
            {/* Orbital nodes */}
            {["Auth", "DB", "AI", "UI"].map((label, i) => {
              const angle = (i * Math.PI * 2) / 4 - Math.PI / 4;
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={label}
                  className="absolute w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-[10px] font-semibold text-muted-foreground"
                  style={{
                    left: `calc(50% + ${x}px - 20px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                  }}
                >
                  {label}
                </div>
              );
            })}
            {/* Connection lines via SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 192">
              {["Auth", "DB", "AI", "UI"].map((_, i) => {
                const angle = (i * Math.PI * 2) / 4 - Math.PI / 4;
                const x2 = 150 + Math.cos(angle) * 80;
                const y2 = 96 + Math.sin(angle) * 80;
                return (
                  <line
                    key={i}
                    x1="150" y1="96" x2={x2} y2={y2}
                    stroke="currentColor" strokeWidth="1" className="text-border"
                  />
                );
              })}
            </svg>
          </div>
          {/* Pipeline label */}
          <div className="flex items-center justify-center gap-3 mt-4 font-mono text-[10px] text-muted-foreground">
            <span>PROJECT</span>
            <span className="w-px h-3 bg-border" />
            <span>RESEARCH</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-primary font-bold">ICIRCA 2026</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function ProjectLab() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".project-block");
    cards.forEach((block) => {
      const info = block.querySelector(".project-info");
      const mockup = block.querySelector(".project-mockup");
      if (info) {
        gsap.from(info, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 75%" },
        });
      }
      if (mockup) {
        gsap.from(mockup, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 75%" },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-background relative overflow-hidden">
      <div className="w-full px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
            Project Lab
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Things I&apos;ve built.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20">
          {/* PROJECT 01 — SOFI */}
          <div className="project-block grid lg:grid-cols-2 gap-10 items-center">
            {/* Info */}
            <div className="project-info order-2 lg:order-1 flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4 uppercase">
                  <Trophy size={12} />
                  Featured Project
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">SOFI</h3>
                <p className="text-lg text-muted-foreground font-medium">Offline AI Desktop Assistant</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                A fully offline AI desktop assistant combining local LLM inference,
                semantic memory, voice interaction, and 20+ desktop automation tools.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["React", "Electron", "FastAPI", "Python", "Ollama", "ChromaDB", "Vosk", "Coqui-TTS"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["20+ Automation Tools", "100% Local AI", "Voice Interaction", "Semantic Memory"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a href="https://github.com/ilakkiyan-j/sofi" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
                  View Project <ArrowRight size={14} />
                </a>
                <a href="https://github.com/ilakkiyan-j/sofi" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
                  <GithubIcon width="14" height="14" /> GitHub
                </a>
                <button className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:text-primary active:scale-95">
                  <MessageSquare size={14} /> Ask Riven
                </button>
              </div>
            </div>

            {/* Mockup */}
            <div className="project-mockup order-1 lg:order-2">
              <SofiMockup />
            </div>
          </div>

          {/* PROJECT 02 — MEDORC */}
          <div className="project-block grid lg:grid-cols-2 gap-10 items-center">
            {/* Mockup */}
            <div className="project-mockup">
              <MedorcMockup />
            </div>

            {/* Info */}
            <div className="project-info flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-nebula-purple/10 text-nebula-purple text-xs font-bold tracking-wider mb-4 uppercase">
                  <Trophy size={12} />
                  Healthcare Platform
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">MEDORC</h3>
                <p className="text-lg text-muted-foreground font-medium">AI-Powered Healthcare Platform</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                A secure healthcare platform combining scalable backend architecture,
                role-based access control, and an intelligent RASA-powered healthcare assistant.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "Express", "Prisma", "PostgreSQL", "JWT", "RASA"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["50+ REST Endpoints", "20+ AI Intents", "10+ Custom Entities", "Role-Based Security"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a href="https://github.com/Medorc/medorc-backend" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
                  View Project <ArrowRight size={14} />
                </a>
                <a href="https://github.com/Medorc/medorc-backend" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
                  <GithubIcon width="14" height="14" /> GitHub
                </a>
                <button className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:text-primary active:scale-95">
                  <MessageSquare size={14} /> Ask Riven
                </button>
              </div>
            </div>
          </div>

          {/* GitHub CTA */}
          <div className="project-block">
            <div className="project-info text-center py-12 rounded-2xl border border-dashed border-border hover:border-primary/30 transition-colors">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-secondary border border-border mb-5">
                <GithubIcon width="24" height="24" />
              </div>
              <h3 className="text-xl font-bold mb-2">Explore more on GitHub</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Open-source contributions, side projects, and experiments — all on my GitHub profile.
              </p>
              <a
                href="https://github.com/ilakkiyan-j"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <GithubIcon width="16" height="16" />
                github.com/ilakkiyan-j
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
