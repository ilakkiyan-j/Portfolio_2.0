"use client";

import { useState, useEffect } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setLoading(false), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-background transition-colors ${
        exiting ? "loader-exit" : ""
      }`}
    >
      {/* Riven Core Animation */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 loader-ring" />
        {/* Middle ring */}
        <div
          className="absolute inset-2 rounded-full border border-accent-secondary/40"
          style={{
            animation: "loaderRing 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite reverse",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute inset-4 rounded-full border border-primary/50"
          style={{
            animation: "loaderRing 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
          }}
        />
        {/* Core dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary loader-pulse shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
        </div>
      </div>

      {/* Loading text */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
          Initializing
        </span>
        <span className="flex gap-0.5">
          <span
            className="w-1 h-1 rounded-full bg-primary"
            style={{ animation: "loaderPulse 1.2s ease-in-out infinite" }}
          />
          <span
            className="w-1 h-1 rounded-full bg-primary"
            style={{ animation: "loaderPulse 1.2s ease-in-out 0.2s infinite" }}
          />
          <span
            className="w-1 h-1 rounded-full bg-primary"
            style={{ animation: "loaderPulse 1.2s ease-in-out 0.4s infinite" }}
          />
        </span>
      </div>
    </div>
  );
}
