"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ChevronDown } from "lucide-react";
import { HeroNebulaContainer } from "./3d/hero-nebula-container";
import { WordCycle } from "./word-cycle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 2.0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-nebula-blue/8 rounded-full blur-3xl hero-blob-1" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-[30rem] h-64 md:h-[30rem] bg-nebula-purple/8 rounded-full blur-3xl hero-blob-2" />
        <div className="absolute inset-0 grid-overlay [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-4 items-center h-full">
          {/* LEFT: Typography */}
          <motion.div
            className="flex flex-col justify-center max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.08]"
            >
              I build{" "}
              <span className="text-primary relative inline-block after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-primary after:via-nebula-purple after:to-nebula-pink after:rounded-full after:opacity-60">
                <WordCycle
                  words={["intelligent", "scalable", "innovative", "powerful"]}
                  interval={3000}
                />
              </span>
              <br />
              software that works
              <br />
              beyond the browser.
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                Explore My Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("openRivenChat", {
                      detail: { prompt: "Tell me about Ilakkiyan" },
                    })
                  );
                }}
                className="group flex items-center gap-2 glass-card px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10 active:scale-95 hover:border-primary/30"
              >
                <MessageSquare size={16} className="text-primary" />
                Ask Riven
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 text-sm font-medium text-muted-foreground"
            >
              <a
                href="https://github.com/ilakkiyan-j"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ilakkiyan-j"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://drive.google.com/file/d/1NCUfrOI0J7Ymv0dxNaBgu_C73cklmRvU/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D Galaxy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
            className="relative h-[300px] md:h-[400px] lg:h-full w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 z-0">
              <HeroNebulaContainer />
            </div>

            {/* Core label overlay */}
            <div className="absolute bottom-4 right-4 z-10 glass-card px-4 py-3 shadow-lg group cursor-default">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-foreground">
                  RIVEN CORE
                </span>
              </div>
              <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                &quot;Ask me anything about Ilakkiyan.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — at very bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
