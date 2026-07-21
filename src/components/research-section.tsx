"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="research" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-xs font-bold tracking-widest text-nebula-pink mb-4 block uppercase">
            Research
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Academic Work.
          </h2>
        </motion.div>

        <div ref={cardRef} className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-nebula-pink/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-nebula-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-nebula-pink/10 text-nebula-pink text-xs font-bold tracking-wider mb-3 uppercase">
                ICIRCA 2026 — Published
              </span>
              <h3 className="text-xl md:text-2xl font-bold leading-snug">
                Medorc: A Digital-Twin-Driven Framework for Real-Time Health Data
                Orchestration and Decision Support
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Co-authored and presented at ICIRCA 2026
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm max-w-3xl">
              Proposes an open-source framework for real-time health data orchestration
              and decision support using digital-twin-based reasoning over heterogeneous
              clinical and wearable data. The system builds adaptive digital twins that
              continuously align with physiological, contextual, and environmental data
              streams, enabling low-latency reasoning and preemptive action through
              event-based pipelines and distributed intelligence.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {["Digital Twins", "Event-Driven Architecture", "Edge Intelligence", "Healthcare AI", "Open Source"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-muted-foreground cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href="https://ieeexplore.ieee.org/document/11570546"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95 w-fit"
          >
            Read Publication
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
