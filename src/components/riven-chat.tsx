"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, FileText, Briefcase, Code, Mail, Loader2 } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Tell me about Ilakkiyan",
  "What is his strongest project?",
  "Explain Sofi",
  "Tell me about Medorc",
  "Why should I interview him?",
  "Summarize his resume",
];

interface Message {
  role: "user" | "riven";
  content: string;
}

function FormatMessageContent({ content }: { content: string }) {
  // Simple markdown renderer for bolding, bullet points, and links
  const paragraphs = content.split("\n");

  return (
    <div className="space-y-2 whitespace-pre-line">
      {paragraphs.map((paragraph, pIdx) => {
        if (!paragraph.trim()) return null;

        // Parse markdown links [text](url) and bold **text**
        const parts = [];
        let lastIndex = 0;

        // Combined regex for links [label](url) and bold **text**
        const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
        let match;

        while ((match = regex.exec(paragraph)) !== null) {
          if (match.index > lastIndex) {
            parts.push(paragraph.substring(lastIndex, match.index));
          }

          if (match[1] && match[2]) {
            // Link
            parts.push(
              <a
                key={match.index}
                href={match[2]}
                target="_blank"
                rel="noreferrer"
                className="text-primary font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {match[1]}
              </a>
            );
          } else if (match[3]) {
            // Bold
            parts.push(
              <strong key={match.index} className="font-semibold text-foreground">
                {match[3]}
              </strong>
            );
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < paragraph.length) {
          parts.push(paragraph.substring(lastIndex));
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {parts}
          </p>
        );
      })}
    </div>
  );
}

export function RivenChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "riven",
      content: "Hey, I'm Riven. I know Ilakkiyan's work, projects, technical skills, and experience. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpenChat = (e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        setTimeout(() => {
          handleSend(e.detail.prompt);
        }, 300);
      }
    };
    window.addEventListener("openRivenChat" as any, handleOpenChat);
    return () => window.removeEventListener("openRivenChat" as any, handleOpenChat);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "riven", content: data.reply || "No response received." },
      ]);
    } catch (error) {
      console.error("Failed to query Riven API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "riven",
          content: "I encountered an error connecting to my AI core. Feel free to contact Ilakkiyan directly at ilakkiyanj03@gmail.com!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center justify-center gap-2.5 bg-surface/80 backdrop-blur-md border border-border px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
        </div>
        <span className="font-semibold text-sm text-foreground">Ask Riven</span>
      </button>

      {/* Slide Panel / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[460px] bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="h-20 border-b border-border flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-secondary border border-border">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-tight tracking-wide">RIVEN AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface-secondary rounded-full transition-colors"
                aria-label="Close Riven Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Recruiter Mode Actions */}
            <div className="px-6 py-3.5 border-b border-border bg-surface-secondary/50 shrink-0">
              <div className="text-[11px] font-bold tracking-widest text-primary mb-2.5 uppercase flex items-center gap-1.5">
                <Sparkles size={13} />
                Recruiter Quick Mode
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleSend("Summarize his resume")}
                  disabled={isTyping}
                  className="text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 text-foreground disabled:opacity-50"
                >
                  <FileText size={12} className="text-primary" /> 30s Summary
                </button>
                <button 
                  onClick={() => handleSend("Why should I interview him?")}
                  disabled={isTyping}
                  className="text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 text-foreground disabled:opacity-50"
                >
                  <Briefcase size={12} className="text-primary" /> Why Hire?
                </button>
                <button 
                  onClick={() => handleSend("What are his technical skills?")}
                  disabled={isTyping}
                  className="text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 text-foreground disabled:opacity-50"
                >
                  <Code size={12} className="text-primary" /> Tech Stack
                </button>
                <button 
                  onClick={() => handleSend("How to contact him?")}
                  disabled={isTyping}
                  className="text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center gap-1.5 text-foreground disabled:opacity-50"
                >
                  <Mail size={12} className="text-primary" /> Contact
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 px-1">
                    {msg.role === "user" ? "You" : "Riven"}
                  </span>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[88%] text-sm ${
                      msg.role === "user"
                        ? "bg-foreground text-background font-medium rounded-tr-sm"
                        : "bg-surface-secondary border border-border text-foreground rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <FormatMessageContent content={msg.content} />
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1 px-1">
                    Riven
                  </span>
                  <div className="px-4 py-3 rounded-2xl bg-surface-secondary border border-border text-muted-foreground rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-xs font-medium">Generating response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && !isTyping && (
              <div className="px-6 py-2 shrink-0">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 pt-4 shrink-0 border-t border-border bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Riven anything about Ilakkiyan..."
                  disabled={isTyping}
                  className="w-full bg-surface-secondary border border-border rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                  aria-label="Send Message"
                >
                  {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
