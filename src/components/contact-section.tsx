"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageSquare, Download, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger);

function GridDot({ x, y }: { x: number; y: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r="0.5"
      className="fill-border opacity-40"
    />
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector(".contact-headline");
      const subtitle = sectionRef.current.querySelector(".contact-subtitle");
      const actions = sectionRef.current.querySelector(".contact-actions");
      const socials = sectionRef.current.querySelector(".contact-socials");
      const rivenCard = sectionRef.current.querySelector(".riven-card");
      const orbs = sectionRef.current.querySelectorAll(".floating-orb");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(headline, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          subtitle,
          { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          actions,
          { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          socials,
          { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          rivenCard,
          {
            x: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Floating orbs entrance
      orbs.forEach((orb, i) => {
        gsap.from(orb, {
          scale: 0,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="py-24 md:py-32 bg-background relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient mesh */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nebula-blue/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nebula-purple/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

          {/* Floating orbs */}
          <div className="floating-orb w-3 h-3 bg-nebula-blue/30 top-[15%] left-[10%]" style={{ animationDuration: "6s" }} />
          <div className="floating-orb w-2 h-2 bg-nebula-purple/40 top-[25%] right-[15%]" style={{ animationDuration: "7s", animationDelay: "1s" }} />
          <div className="floating-orb w-4 h-4 bg-nebula-pink/20 bottom-[20%] left-[20%]" style={{ animationDuration: "8s", animationDelay: "2s" }} />
          <div className="floating-orb w-2 h-2 bg-nebula-blue/25 bottom-[30%] right-[25%]" style={{ animationDuration: "9s", animationDelay: "3s" }} />
          <div className="floating-orb w-3 h-3 bg-nebula-purple/20 top-[60%] left-[5%]" style={{ animationDuration: "7.5s", animationDelay: "1.5s" }} />

          {/* Grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            {Array.from({ length: 12 }, (_, row) =>
              Array.from({ length: 20 }, (_, col) => (
                <GridDot
                  key={`${row}-${col}`}
                  x={col * (100 / 20) + 2.5}
                  y={row * (100 / 12) + 4}
                />
              ))
            )}
          </svg>
        </div>

        <div className="w-full px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-6">
              <div className="contact-headline">
                <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">
                  Get In Touch
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
                  Let&apos;s build{" "}
                  <span className="text-primary relative inline-block">
                    something
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-nebula-purple to-nebula-pink rounded-full opacity-60" />
                  </span>
                  <br />
                  <span className="text-primary">intelligent.</span>
                </h2>
              </div>

              <p className="contact-subtitle text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                I&apos;m interested in opportunities where I can build impactful software,
                AI-powered products, and scalable systems.
              </p>

              <div className="contact-actions flex flex-wrap gap-3 pt-2">
                <a
                  href="mailto:ilakkiyanj03@gmail.com"
                  className="group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                >
                  <Mail size={16} />
                  Start a Conversation
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </a>
                <a
                  href="https://drive.google.com/file/d/1NCUfrOI0J7Ymv0dxNaBgu_C73cklmRvU/view?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 glass-card px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10 active:scale-95 hover:border-primary/30"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>

              <div className="contact-socials flex items-center gap-5 pt-2">
                <a
                  href="mailto:ilakkiyanj03@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium">Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ilakkiyan-j"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    <LinkedinIcon width="16" height="16" />
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/ilakkiyan-j"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    <GithubIcon width="16" height="16" />
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>

            {/* Right: Riven Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="riven-card glass-card rounded-2xl p-8 max-w-md w-full relative overflow-hidden group">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />

                {/* Wireframe decoration */}
                <svg
                  className="absolute top-4 right-4 w-20 h-20 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
                  <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" />
                  <line x1="50" y1="5" x2="50" y2="20" />
                  <line x1="95" y1="27.5" x2="80" y2="35" />
                  <line x1="95" y1="72.5" x2="80" y2="65" />
                  <line x1="50" y1="95" x2="50" y2="80" />
                  <line x1="5" y1="72.5" x2="20" y2="65" />
                  <line x1="5" y1="27.5" x2="20" y2="35" />
                </svg>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-surface-secondary border border-border">
                    <div className="w-5 h-5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground leading-tight text-lg">
                      RIVEN
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-8 relative z-10">
                  &quot;You&apos;ve reached the end. If you&apos;re considering Ilakkiyan
                  for an opportunity, I can summarize everything you need to
                  know.&quot;
                </p>

                <button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("openRivenChat", {
                        detail: { prompt: "Summarize his resume" },
                      })
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-surface-secondary border border-border text-foreground hover:bg-surface hover:border-primary/50 hover:text-primary px-6 py-3.5 rounded-xl font-medium transition-all relative z-10 group/btn"
                >
                  <MessageSquare
                    size={18}
                    className="text-primary group-hover/btn:scale-110 transition-transform"
                  />
                  Ask Riven for a Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-10 border-t border-border relative z-10">
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <span className="text-lg font-bold tracking-tighter">
                ILAKKIYAN J
              </span>
              <span className="text-xs text-muted-foreground">
                Full-Stack × AI Engineer
              </span>
            </div>

            {/* Nav links */}
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#research" className="hover:text-foreground transition-colors">Research</a></li>
              <li><a href="#skills" className="hover:text-foreground transition-colors">Skills</a></li>
              <li><a href="#journey" className="hover:text-foreground transition-colors">Journey</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>

            {/* Right */}
            <div className="flex flex-col items-center md:items-end gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                Riven <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
              </div>
              <span>Built by Ilakkiyan J</span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-muted-foreground/60">
            <span>&copy; {new Date().getFullYear()} Ilakkiyan J. All rights reserved.</span>
            <span>Designed with intent. Built with Next.js.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
