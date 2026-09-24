"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Terminal,
  Trophy,
  Cloud,
  Cpu,
  FileCheck2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
} from "lucide-react";
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
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
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

function AlxoMockup() {
  const [activeTab, setActiveTab] = useState<"stream" | "analysis" | "changeorder">("analysis");

  return (
    <TiltCard className="relative aspect-[4/3] rounded-2xl border border-border bg-surface-secondary overflow-hidden group shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-nebula-purple/5 to-transparent opacity-50 group-hover:opacity-90 transition-opacity" />

      <div className="relative w-full h-full flex flex-col p-3 sm:p-5">
        {/* Window Chrome */}
        <div className="bg-background border border-border rounded-xl shadow-2xl flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="h-9 border-b border-border bg-surface-secondary flex items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 text-[10px] font-mono text-muted-foreground font-semibold flex items-center gap-1">
                <Cloud size={10} className="text-primary" /> alxo.engine / scope-radar
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Bedrock Claude 3.5 Active
              </span>
            </div>
          </div>

          {/* Interactive Navigation */}
          <div className="flex border-b border-border/60 bg-surface text-[10px] font-mono">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`flex-1 py-1.5 px-3 text-center border-b-2 transition-colors ${
                activeTab === "analysis"
                  ? "border-primary text-primary font-semibold bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Real-Time Audit
            </button>
            <button
              onClick={() => setActiveTab("stream")}
              className={`flex-1 py-1.5 px-3 text-center border-b-2 transition-colors ${
                activeTab === "stream"
                  ? "border-primary text-primary font-semibold bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Conversation Feed
            </button>
            <button
              onClick={() => setActiveTab("changeorder")}
              className={`flex-1 py-1.5 px-3 text-center border-b-2 transition-colors ${
                activeTab === "changeorder"
                  ? "border-primary text-primary font-semibold bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Change Order
            </button>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between text-xs font-mono overflow-hidden">
            {activeTab === "analysis" && (
              <div className="space-y-2.5">
                {/* Detected message */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-surface-secondary border border-border/80">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span className="text-primary font-semibold flex items-center gap-1">
                      <Sparkles size={10} /> Client Inbound [Slack #project-roadmap]
                    </span>
                    <span>14:02 PM</span>
                  </div>
                  <p className="text-[11px] text-foreground font-sans italic leading-snug">
                    &quot;Can we also add automated multi-tenant PDF invoice parsing with OCR before next Friday&apos;s demo?&quot;
                  </p>
                </div>

                {/* Scope Creep Alert */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                        Scope Creep Detected (94.8% Confidence)
                      </span>
                      <span className="text-[9px] text-amber-600 dark:text-amber-400">AWS Bedrock Sonnet</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-sans mt-0.5">
                      Requested OCR capabilities exceed original Sprint Scope S-03.
                    </p>
                  </div>
                </div>

                {/* Impact Calculations */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-md bg-surface border border-border">
                    <div className="text-[9px] text-muted-foreground">Effort Impact</div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">+18 Dev Hours</div>
                  </div>
                  <div className="p-2 rounded-md bg-surface border border-border">
                    <div className="text-[9px] text-muted-foreground">Budget Variance</div>
                    <div className="text-xs sm:text-sm font-bold text-primary">+$1,350 USD</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stream" && (
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded bg-surface border border-border">
                  <span className="text-primary font-bold">[14:02:11]</span> Ingestion from Slack Webhook
                </div>
                <div className="p-2 rounded bg-surface border border-border">
                  <span className="text-nebula-purple font-bold">[14:02:12]</span> Amazon Bedrock Claude classification executed
                </div>
                <div className="p-2 rounded bg-surface border border-border">
                  <span className="text-emerald-500 font-bold">[14:02:13]</span> DynamoDB event logged (ID: #evt_90f23a)
                </div>
                <div className="p-2 rounded bg-surface border border-border">
                  <span className="text-amber-500 font-bold">[14:02:14]</span> S3 Evidence payload archived
                </div>
              </div>
            )}

            {activeTab === "changeorder" && (
              <div className="p-3 rounded-lg bg-surface border border-border space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-border pb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <FileCheck2 size={13} className="text-emerald-500" /> Change Order #CO-2026-08
                  </span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">
                    READY FOR SIGNATURE
                  </span>
                </div>
                <div className="text-muted-foreground text-[10px] space-y-1 font-sans">
                  <div><strong>Feature:</strong> Multi-Tenant OCR Invoice Parsing Engine</div>
                  <div><strong>Timeline Extension:</strong> +4 Business Days</div>
                  <div><strong>Contract Amendment:</strong> S3-Backed Evidence Attached</div>
                </div>
              </div>
            )}

            {/* Bottom Footer Status */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-500" /> DynamoDB + S3 Synced
              </span>
              <span>AWS Amplify Pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function MedorcMockup() {
  return (
    <TiltCard className="relative aspect-[4/3] rounded-2xl border border-border bg-surface-secondary overflow-hidden group shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-accent-secondary/5 opacity-40 group-hover:opacity-80 transition-opacity" />
      <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-sm">
          {/* Node network visualization */}
          <div className="relative h-40 sm:h-48 flex items-center justify-center">
            {/* Center node */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary/40 bg-primary/10 flex flex-col items-center justify-center z-10 animate-pulse shadow-lg shadow-primary/20">
              <span className="text-[10px] sm:text-xs font-bold text-primary">CORE</span>
              <span className="text-[8px] font-mono text-muted-foreground">50+ APIs</span>
            </div>
            {/* Orbital nodes */}
            {[
              { label: "JWT Auth", sub: "Role-Based" },
              { label: "RASA AI", sub: "20+ Intents" },
              { label: "Neon DB", sub: "PostgreSQL" },
              { label: "Digital Twin", sub: "Streams" },
            ].map((node, i) => {
              const angle = (i * Math.PI * 2) / 4 - Math.PI / 4;
              const radius = 68;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={node.label}
                  className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border bg-surface flex flex-col items-center justify-center text-center shadow-md"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                  }}
                >
                  <span className="text-[8px] sm:text-[9px] font-bold text-foreground leading-tight">
                    {node.label}
                  </span>
                  <span className="text-[7px] text-muted-foreground">{node.sub}</span>
                </div>
              );
            })}
            {/* Connection lines via SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 192">
              {[0, 1, 2, 3].map((i) => {
                const angle = (i * Math.PI * 2) / 4 - Math.PI / 4;
                const x2 = 150 + Math.cos(angle) * 68;
                const y2 = 96 + Math.sin(angle) * 68;
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="96"
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-border/80"
                    strokeDasharray="3 3"
                  />
                );
              })}
            </svg>
          </div>
          {/* Pipeline label */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-5 font-mono text-[9px] sm:text-[10px] text-muted-foreground bg-surface/80 py-1.5 px-3 rounded-full border border-border max-w-fit mx-auto">
            <span>HEALTH PLATFORM</span>
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

  useGSAP(
    () => {
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
    },
    { scope: sectionRef }
  );

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
            Systems &amp; Products I&apos;ve Built.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
            From cloud-native Agentic AI infrastructure to distributed health platforms and offline intelligence.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20">
          {/* ======================================================== */}
          {/* PROJECT 01 — ALXO (FLAGSHIP)                             */}
          {/* ======================================================== */}
          <div className="project-block grid lg:grid-cols-2 gap-10 items-center">
            {/* Info */}
            <div className="project-info order-2 lg:order-1 flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4 uppercase">
                  <Trophy size={12} />
                  Flagship Platform · Sep 2026
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">ALXO</h3>
                <p className="text-lg text-muted-foreground font-medium">AI Scope Management &amp; Change Order Platform</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                Led backend architecture and AWS infrastructure for an enterprise AI platform that monitors
                conversations to detect scope creep, classifies client requests with Amazon Bedrock Claude,
                and generates evidence-backed change orders with deterministic cost-impact math.
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Next.js",
                  "TypeScript",
                  "Amazon Bedrock",
                  "Claude 3.5",
                  "DynamoDB",
                  "AWS S3",
                  "AWS Amplify",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Feature Matrix */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Bedrock Claude-based Classification",
                  "Deterministic Cost Math",
                  "Evidence-Backed Change Orders",
                  "AWS Amplify & S3 Pipeline",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a
                  href="https://main.dhbgp6utbowvg.amplifyapp.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  Live Demo <ExternalLink size={14} />
                </a>
                <a
                  href="https://github.com/ilakkiyan-j/Alxo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  <GithubIcon width="14" height="14" /> Architecture &amp; Code
                </a>
                <button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("openRivenChat", {
                        detail: { prompt: "Tell me about ALXO and its Amazon Bedrock architecture" },
                      })
                    );
                  }}
                  className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:text-primary active:scale-95 cursor-pointer"
                >
                  <MessageSquare size={14} /> Ask Riven
                </button>
              </div>
            </div>

            {/* Mockup */}
            <div className="project-mockup order-1 lg:order-2">
              <AlxoMockup />
            </div>
          </div>

          {/* ======================================================== */}
          {/* PROJECT 02 — MEDORC (RESEARCH & HEALTHCARE)              */}
          {/* ======================================================== */}
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
                  Published Research · Jan 2026
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">MEDORC</h3>
                <p className="text-lg text-muted-foreground font-medium">AI-Powered Healthcare &amp; Digital-Twin Platform</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                Architected 50+ type-safe REST APIs with role-based JWT authentication and built a RASA-powered
                clinical conversational assistant with 20+ intents and 10+ custom entities. Co-authored the underlying
                research paper presented at ICIRCA 2026.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "TypeScript",
                  "Express.js",
                  "Prisma",
                  "PostgreSQL",
                  "JWT",
                  "RASA",
                  "Vercel",
                  "Render",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "50+ Type-Safe Endpoints",
                  "20+ Intents & 10+ Entities",
                  "ICIRCA 2026 Paper Presented",
                  "Role-Based JWT Security",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a
                  href="https://medorc-frontend.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  Live Demo <ArrowRight size={14} />
                </a>
                <a
                  href="https://github.com/Medorc"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  <GithubIcon width="14" height="14" /> GitHub
                </a>
                <a
                  href="#research"
                  className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  <Layers size={14} /> Paper
                </a>
                <button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("openRivenChat", {
                        detail: { prompt: "Tell me about Medorc's 50+ APIs and ICIRCA 2026 paper" },
                      })
                    );
                  }}
                  className="flex items-center gap-1.5 glass-card px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:text-primary active:scale-95 cursor-pointer"
                >
                  <MessageSquare size={14} /> Ask Riven
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECONDARY SHOWCASE: RESERVE AI & SOFI                     */}
          {/* ======================================================== */}
          <div className="project-block grid md:grid-cols-2 gap-6">
            {/* ReServe AI */}
            <div className="p-6 md:p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between hover:border-primary/40 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    AICTE — IBM SkillsBuild — 1M1B
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Jul–Sep 2026</span>
                </div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">ReServe AI</h4>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Food Surplus Forecasting &amp; Redistribution Platform
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Built during an applied AI sustainability internship. Leveraged prompt engineering, NLP, RAG,
                  and responsible AI techniques to forecast food surplus and assist food safety redistributions.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Prompt Engineering", "NLP", "RAG", "Python", "IBM Granite", "Responsible AI"].map((t) => (
                    <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary border border-border/60 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <a
                    href="https://re-serve-ai.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-foreground text-background px-3.5 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all"
                  >
                    Live Demo <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://github.com/ilakkiyan-j/ReServe-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold glass-card px-3.5 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all"
                  >
                    <GithubIcon width="12" height="12" /> GitHub
                  </a>
                </div>
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Completed
                </span>
              </div>
            </div>

            {/* SOFI */}
            <div className="p-6 md:p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between hover:border-primary/40 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-nebula-purple uppercase tracking-wider bg-nebula-purple/10 px-2.5 py-1 rounded-full">
                    Offline AI Desktop Engine
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Open Source</span>
                </div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">SOFI</h4>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  100% Offline AI Desktop Assistant
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Combines local LLM inference (Ollama), ChromaDB semantic memory, Vosk voice interaction,
                  and 20+ automated desktop tools for distraction-free edge computing.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Electron", "FastAPI", "Ollama", "ChromaDB", "Vosk", "Coqui-TTS"].map((t) => (
                    <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-secondary border border-border/60 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <a
                  href="https://github.com/ilakkiyan-j/sofi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors"
                >
                  <GithubIcon width="14" height="14" /> View Source Code
                </a>
                <span className="text-xs text-muted-foreground font-mono">20+ Tools</span>
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
                Open-source contributions, distributed systems experiments, and AI tools — all on my GitHub profile.
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
