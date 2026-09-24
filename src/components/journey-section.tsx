"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, BookOpen, Briefcase, Award, GraduationCap, Sparkles, Users, Network } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string | React.ReactNode;
  highlight?: boolean;
  logoUrl?: string;
  icon: React.ReactNode;
  side: "left" | "right";
}

const MILESTONES: Milestone[] = [
  {
    year: "Upcoming · 2026",
    title: "McKinsey.org Forward Program | Digital Leadership & Strategy",
    description: (
      <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground text-xs md:text-sm">
        <li>Selected for the prestigious <strong>McKinsey &amp; Company Forward Program</strong>.</li>
        <li>Focusing on future-ready digital leadership, critical thinking, business problem solving, and agile adaptability.</li>
      </ul>
    ),
    highlight: true,
    icon: <Sparkles size={14} />,
    side: "left",
  },
  {
    year: "Sep 2026",
    title: "ALXO — AI Scope Management Platform",
    description: (
      <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground text-xs md:text-sm">
        <li>Led backend architecture &amp; AWS infrastructure for an enterprise AI platform that detects scope creep from conversations.</li>
        <li>Engineered Amazon Bedrock Claude-based classification, prompt workflows, APIs, and deterministic cost-impact math.</li>
        <li>Designed and deployed the end-to-end platform using AWS Amplify, Bedrock, DynamoDB, and S3.</li>
      </ul>
    ),
    highlight: true,
    icon: <Briefcase size={14} />,
    side: "right",
  },
  {
    year: "Jul 2026 – Sep 2026",
    title: "AI Intern | AICTE — IBM SkillsBuild — 1M1B",
    description: (
      <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground text-xs md:text-sm">
        <li>Completed an Applied AI internship focused on AI for sustainability.</li>
        <li>Built <strong>ReServe AI</strong>, an AI platform for food surplus forecasting, redistribution, and food safety assistance.</li>
        <li>Applied prompt engineering, NLP, RAG, and responsible AI techniques.</li>
      </ul>
    ),
    highlight: true,
    icon: <Sparkles size={14} />,
    side: "left",
  },
  {
    year: "Jul 2026",
    title: "Agentic AI Certified Foundations Associate – Oracle",
    description: "Oracle Certified Foundations Associate credential in Agentic AI, foundation models, and multi-agent architectures.",
    highlight: true,
    icon: <Award size={14} />,
    side: "right",
  },
  {
    year: "Jan 2026",
    title: "Medorc Healthcare & ICIRCA 2026 Publication",
    description: (
      <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground text-xs md:text-sm">
        <li>Co-authored <em>&quot;Medorc: A Digital-Twin-Driven Framework for Real-Time Health Data Orchestration&quot;</em>, presented at ICIRCA 2026.</li>
        <li>Architected 50+ type-safe REST APIs and built a RASA assistant with 20+ intents and 10+ custom entities.</li>
        <li>Deployed the full-stack platform using Vercel, Render, and Neon PostgreSQL.</li>
      </ul>
    ),
    highlight: true,
    icon: <BookOpen size={14} />,
    side: "left",
  },
  {
    year: "2026",
    title: "Problem Solving: LeetCode Contest Rating 1641",
    description: "Solved 700+ Data Structures and Algorithms problems across LeetCode and GeeksforGeeks with a 1641 contest rating.",
    highlight: true,
    icon: <Trophy size={14} />,
    side: "right",
  },
  {
    year: "2024 – 2025",
    title: "Hackathon Victories & Avantaa Project Expo",
    description: (
      <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground text-xs md:text-sm">
        <li>Secured <strong>2nd Place</strong> at Smart India Hackathon (SIH) internal college round among 30+ teams.</li>
        <li>Led team to <strong>3rd Place</strong> at Avantaa&apos;24 Project Expo for <em>Nexaid</em>.</li>
      </ul>
    ),
    highlight: true,
    icon: <Trophy size={14} />,
    side: "left",
  },
  {
    year: "Jul 2025",
    title: "Software Engineer – HackerRank",
    description: "Validated expertise in software engineering principles, algorithms, and backend problem solving.",
    icon: <Award size={14} />,
    side: "right",
  },
  {
    year: "Nov 2024",
    title: "The Complete 2024 Web Development Bootcamp – Udemy",
    description: "Full-stack web development certification covering modern frontend, backend, databases, and deployment.",
    icon: <GraduationCap size={14} />,
    side: "left",
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Ensure ScrollTrigger refreshes after initial layout settles
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!timelineRef.current) return;

      const lineFill = timelineRef.current.querySelector(".tl-line-fill");
      const glowDot = timelineRef.current.querySelector(".tl-glow-dot");

      const scrubValue = 0.3;

      // Color gradient line fills exactly as the user scrolls through the timeline
      if (lineFill) {
        gsap.fromTo(
          lineFill,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              end: "bottom 65%",
              scrub: scrubValue,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Glow dot tracks down the timeline and ends exactly at the bottom of the last milestone
      if (glowDot) {
        gsap.fromTo(
          glowDot,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              end: "bottom 65%",
              scrub: scrubValue,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    },
    { scope: timelineRef }
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
      <div ref={timelineRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        {/* Vertical line — base (gray) */}
        <div
          className="absolute top-0 bottom-0 w-px bg-border left-4 sm:left-5 md:left-1/2 -translate-x-1/2"
        />

        {/* Vertical line — color fill (grows on scroll with neon glow) */}
        <div
          className="tl-line-fill absolute top-0 w-[2px] origin-top left-4 sm:left-5 md:left-1/2 -translate-x-1/2 rounded-full"
          style={{
            height: "0%",
            background: "linear-gradient(to bottom, var(--nebula-blue), var(--nebula-purple), var(--nebula-pink))",
            filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
          }}
        />

        {/* Vibrant Glow dot at the tip of the fill */}
        <div
          className="tl-glow-dot absolute left-4 sm:left-5 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none rounded-full"
          style={{
            top: "0%",
            width: "10px",
            height: "10px",
            background: "var(--primary)",
            boxShadow: "0 0 14px 4px rgba(59, 130, 246, 0.8), 0 0 24px 8px rgba(124, 58, 237, 0.5)",
          }}
        />

        {/* Milestone rows */}
        {MILESTONES.map((m, i) => {
          const isLeft = m.side === "left";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`tl-row relative flex flex-col md:flex-row items-start md:items-center mb-8 sm:mb-10 last:mb-0 ${
                isLeft ? "tl-left" : ""
              }`}
            >
              {/* Card Container */}
              <div className={`w-[calc(100%-2.25rem)] sm:w-[calc(100%-3rem)] ml-auto md:ml-0 md:w-[calc(50%-1.5rem)] ${isLeft ? "md:text-right" : "md:order-3 md:text-left"}`}>
                <div
                  className={`inline-block text-left p-3.5 sm:p-4.5 rounded-xl border transition-all duration-300 w-full ${
                    isLeft ? "md:ml-auto" : ""
                  } ${
                    m.highlight
                      ? "border-primary/40 bg-surface/80 shadow-lg shadow-primary/5"
                      : "border-border/50 bg-surface/60 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        m.highlight
                          ? "bg-primary/15 text-primary"
                          : "bg-surface-secondary text-muted-foreground"
                      }`}
                    >
                      {m.year}
                    </span>
                    {m.logoUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={m.logoUrl} alt="Logo" className="h-4 w-auto object-contain rounded-sm" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm md:text-base font-bold text-foreground mb-1 leading-tight flex items-center gap-1.5 flex-wrap">
                    {m.title}
                    {m.highlight && (
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/10 text-primary align-middle">
                        Active / Featured
                      </span>
                    )}
                  </h4>
                  <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </div>
                </div>
              </div>

              {/* Center node */}
              <div className="absolute left-0 top-3 md:relative md:top-auto md:left-auto w-8 sm:w-10 md:w-12 flex justify-center md:order-2 z-10 shrink-0 -translate-x-1/2 sm:translate-x-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
                    m.highlight
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-surface border-border text-muted-foreground"
                  }`}
                >
                  {m.logoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.logoUrl} alt="Logo" className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-full" />
                  ) : (
                    m.icon
                  )}
                </div>
              </div>

              {/* Empty side filler on desktop */}
              <div className={`hidden md:block w-[calc(50%-1.5rem)] ${isLeft ? "order-3" : ""}`} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
