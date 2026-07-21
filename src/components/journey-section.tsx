"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, BookOpen, Briefcase, Award, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  icon: React.ReactNode;
  side: "left" | "right";
}

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "Nexaid",
    description: "Built emergency assistance application.",
    icon: <Briefcase size={14} />,
    side: "left",
  },
  {
    year: "2024",
    title: "Avantaa Project Expo",
    description: "3rd Place among competing teams.",
    highlight: true,
    icon: <Trophy size={14} />,
    side: "right",
  },
  {
    year: "2024",
    title: "Smart India Hackathon",
    description: "2nd Place among 30+ teams in internal SIH selections.",
    highlight: true,
    icon: <Trophy size={14} />,
    side: "left",
  },
  {
    year: "2025",
    title: "Software Engineer Cert",
    description: "HackerRank certification.",
    icon: <Award size={14} />,
    side: "right",
  },
  {
    year: "2025",
    title: "Agile Project Management",
    description: "HP LIFE certification.",
    icon: <GraduationCap size={14} />,
    side: "left",
  },
  {
    year: "2026",
    title: "Sofi AI Desktop Assistant",
    description: "Offline AI assistant combining local LLM and desktop automation.",
    icon: <Briefcase size={14} />,
    side: "right",
  },
  {
    year: "2026",
    title: "ICIRCA 2026",
    description: "Co-authored and presented research on Digital-Twin-Driven Health Data Orchestration.",
    icon: <BookOpen size={14} />,
    side: "left",
  },
  {
    year: "2026",
    title: "Medorc Healthcare",
    description: "Scalable backend architecture and RASA-powered healthcare assistant.",
    icon: <Briefcase size={14} />,
    side: "right",
  },
  {
    year: "2026",
    title: "Datacom Software Dev",
    description: "Job Simulation completed.",
    icon: <Briefcase size={14} />,
    side: "left",
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const rows = sectionRef.current.querySelectorAll(".tl-row");
      const lineFill = sectionRef.current.querySelector(".tl-line-fill");
      const glowDot = sectionRef.current.querySelector(".tl-glow-dot");

      // Color gradient filling down the line
      if (lineFill) {
        gsap.fromTo(
          lineFill,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.3,
            },
          }
        );
      }

      // Glow dot follows the tip of the fill
      if (glowDot) {
        gsap.fromTo(
          glowDot,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.3,
            },
          }
        );
      }

      // Each row slides in from its side
      rows.forEach((row) => {
        const isLeft = row.classList.contains("tl-left");

        gsap.from(row, {
          opacity: 0,
          x: isLeft ? -40 : 40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="journey" ref={sectionRef} className="relative">
      {/* Header */}
      <div className="pt-24 pb-12 bg-background text-center">
        <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
          My Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          The path so far
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm">
          Scroll to walk through my milestones.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto px-6 pb-16">
        {/* Vertical line — base (gray) */}
        <div
          className="absolute top-0 bottom-0 w-px bg-border"
          style={{
            left: "50%",
            transform: "translateX(-0.5px)",
          }}
        />

        {/* Vertical line — color fill (grows on scroll) */}
        <div
          className="tl-line-fill absolute top-0 w-px origin-top"
          style={{
            left: "50%",
            transform: "translateX(-0.5px)",
            height: "0%",
            background: "linear-gradient(to bottom, var(--nebula-blue), var(--nebula-purple), var(--nebula-pink))",
          }}
        />

        {/* Glow dot at the tip of the fill */}
        <div
          className="tl-glow-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none rounded-full"
          style={{
            top: "0%",
            width: "10px",
            height: "10px",
            background: "var(--primary)",
            boxShadow: "0 0 14px 5px rgba(59, 130, 246, 0.5)",
          }}
        />

        {/* Milestone rows */}
        {MILESTONES.map((m, i) => {
          const isLeft = m.side === "left";

          return (
            <div
              key={i}
              className={`tl-row relative flex items-center mb-10 last:mb-0 ${
                isLeft ? "tl-left" : ""
              }`}
            >
              {/* Left card */}
              <div className={`w-[calc(50%-1.5rem)] ${isLeft ? "text-right" : "order-3 text-left"}`}>
                <div
                  className={`inline-block text-left p-4 rounded-xl border transition-all duration-300 ${
                    isLeft ? "ml-auto" : ""
                  } ${
                    m.highlight
                      ? "border-primary/40 bg-surface/80 shadow-lg shadow-primary/5"
                      : "border-border/50 bg-surface/60 hover:border-border"
                  }`}
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider mb-2 ${
                      m.highlight
                        ? "bg-primary/15 text-primary"
                        : "bg-surface-secondary text-muted-foreground"
                    }`}
                  >
                    {m.year}
                  </span>
                  <h4 className="text-sm md:text-base font-bold text-foreground mb-1 leading-tight">
                    {m.title}
                    {m.highlight && (
                      <span className="ml-2 inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/10 text-primary align-middle">
                        Featured
                      </span>
                    )}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>

              {/* Center node */}
              <div className="w-12 flex justify-center order-2 relative z-10 shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    m.highlight
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-surface border-border text-muted-foreground"
                  }`}
                >
                  {m.icon}
                </div>
              </div>

              {/* Empty side */}
              <div className={`w-[calc(50%-1.5rem)] ${isLeft ? "order-3" : ""}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
