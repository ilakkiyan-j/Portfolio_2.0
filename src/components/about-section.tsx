"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Brain, Server } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Prisma", "Docker", "Git", "Tailwind", "Three.js",
  "Ollama", "RASA", "ChromaDB", "Express",
];

function TechRibbon() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative overflow-hidden py-6 -mx-6 md:-mx-12">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-secondary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-secondary to-transparent z-10" />

      <div className="flex gap-4 animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default shrink-0"
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
  const cardRef = useRef<HTMLDivElement>(null);

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

  // GSAP scroll-triggered reveals for identity card
  useGSAP(() => {
    if (!sectionRef.current || !cardRef.current) return;

    gsap.from(cardRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-surface-secondary relative overflow-hidden">
      {/* Subtle nebula glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-nebula-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
            Behind the Code
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
            Building at the intersection of{" "}
            <span className="text-primary">software and intelligence.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Identity Card — Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div
              ref={cardRef}
              className="glass-card p-7 relative overflow-hidden"
            >
              {/* Decorative wireframe corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 border border-primary/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-accent-secondary/10 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-0.5">Ilakkiyan J</h3>
                <p className="text-primary font-semibold text-sm mb-5">
                  Full-Stack × AI Engineer
                </p>

                <div className="flex items-center gap-2 text-muted-foreground mb-7 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Based in India
                </div>

                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase mb-4">
                    Focus Areas
                  </h4>
                  <div className="space-y-3">
                    {focusAreas.map((area) => (
                      <div
                        key={area.label}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all group cursor-default"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                          <area.icon size={16} />
                        </div>
                        <div>
                          <span className="font-semibold text-sm block leading-tight">
                            {area.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {area.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Bio + Metrics + Ribbon */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-8">
            {/* Bio quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light max-w-2xl"
            >
              <span className="text-foreground font-semibold text-2xl leading-none">&ldquo;</span>
              I&apos;m a Computer Science and Design graduate who enjoys building
              complete products — from intuitive interfaces and scalable backends
              to AI-powered applications that solve real problems.
              <span className="text-foreground font-semibold text-2xl leading-none">&rdquo;</span>
            </motion.div>

            {/* Metrics cards — Resilient layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="metric-card glass-card p-5 text-center hover:border-primary/30 transition-colors flex flex-col items-center justify-center min-h-[110px]"
                >
                  <span className="text-3xl md:text-4xl font-bold text-foreground block mb-1">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase leading-tight">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Tech stack ribbon */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase mb-3">
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
