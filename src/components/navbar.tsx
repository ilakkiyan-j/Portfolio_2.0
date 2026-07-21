"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Research", href: "#research" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-xl font-bold tracking-tighter">
            ILAKKIYAN.
          </a>
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-surface-secondary border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for opportunities
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-border pl-6">
            {/* THEME SWITCHER */}
            {mounted && (
              <div className="flex bg-surface-secondary rounded-full p-1 border border-border">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    theme === "light" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Light Mode"
                >
                  <Sun size={14} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    theme === "system" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="System Mode"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    theme === "dark" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Dark Mode"
                >
                  <Moon size={14} />
                </button>
              </div>
            )}

            <a
              href="#contact"
              className="bg-primary hover:bg-accent text-primary-foreground text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg p-6 md:hidden flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4 text-lg font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border pt-6">
              {mounted && (
                <div className="flex bg-surface-secondary rounded-full p-1 border border-border">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "light" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sun size={16} />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "system" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "dark" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Moon size={16} />
                  </button>
                </div>
              )}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary hover:bg-accent text-primary-foreground text-sm font-medium px-6 py-2 rounded-full transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
