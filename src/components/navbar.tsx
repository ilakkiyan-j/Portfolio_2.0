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
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Active section scroll spy observer
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="#" className="text-lg sm:text-xl font-bold tracking-tighter hover:text-primary transition-colors">
            ILAKKIYAN.
          </a>
          <div className="hidden xl:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-surface-secondary border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for opportunities
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <ul className="flex items-center gap-4 lg:gap-6 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative py-1 transition-colors hover:text-foreground",
                      isActive && "text-primary font-semibold"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 lg:gap-4 border-l border-border pl-4 lg:pl-6">
            {/* THEME SWITCHER */}
            {mounted && (
              <div className="flex bg-surface-secondary rounded-full p-1 border border-border">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors cursor-pointer",
                    theme === "light" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Light Mode"
                >
                  <Sun size={14} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors cursor-pointer",
                    theme === "system" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="System Mode"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "p-1.5 rounded-full transition-colors cursor-pointer",
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
              className="bg-primary hover:bg-accent text-primary-foreground text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl p-6 md:hidden flex flex-col gap-6 max-h-[calc(100dvh-4.5rem)] overflow-y-auto pb-safe"
          >
            <ul className="flex flex-col gap-4 text-base font-semibold">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-2 border-b border-border/40 text-muted-foreground hover:text-foreground transition-colors",
                        isActive && "text-primary font-bold"
                      )}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-border pt-5">
              {mounted && (
                <div className="flex bg-surface-secondary rounded-full p-1 border border-border">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "p-2 rounded-full transition-colors cursor-pointer",
                      theme === "light" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Light Mode"
                  >
                    <Sun size={16} />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "p-2 rounded-full transition-colors cursor-pointer",
                      theme === "system" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="System Mode"
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "p-2 rounded-full transition-colors cursor-pointer",
                      theme === "dark" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Dark Mode"
                  >
                    <Moon size={16} />
                  </button>
                </div>
              )}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary hover:bg-accent text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
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

