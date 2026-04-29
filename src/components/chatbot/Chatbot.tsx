"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "w",
  role: "assistant",
  content: cv.chatbotScripts.welcome,
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = (role: "user" | "assistant", content: string) =>
    ({ id: Date.now().toString() + Math.random(), role, content });

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowQuick(false);
    const userMsg = addMessage("user", text);
    setMessages((p) => [...p, userMsg]);
    setInput("");

    // Check for pre-scripted response first (saves API tokens)
    const scripted = cv.chatbotScripts.scripted[text as keyof typeof cv.chatbotScripts.scripted];
    if (scripted) {
      await new Promise((r) => setTimeout(r, 400)); // brief delay feels natural
      setMessages((p) => [...p, addMessage("assistant", scripted)]);
      return;
    }

    // Real API call for custom questions
    const asstId = "a" + Date.now();
    setMessages((p) => [...p, { id: asstId, role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const chunk = JSON.parse(line.slice(2));
              if (typeof chunk === "string")
                setMessages((p) => p.map((m) => m.id === asstId ? { ...m, content: m.content + chunk } : m));
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setMessages((p) =>
        p.map((m) => m.id === asstId ? { ...m, content: "Something went wrong. Email Ali directly at alihassan.at.the.work@gmail.com" } : m)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="mb-3 flex h-[480px] w-[320px] flex-col overflow-hidden rounded-2xl border border-white/8 shadow-2xl shadow-black/70"
            style={{ background: "#0b0d18" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-white/2">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-black text-[#07080f]"
                  style={{ background: "linear-gradient(135deg,#00e5bf,#4d7cff)" }}
                >
                  AI
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#eae9fc]">Ali&apos;s AI assistant</div>
                  <div className="flex items-center gap-1.5 text-[9px] text-[#00e5bf]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00e5bf] animate-pulse" />
                    Online · Powered by Claude
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/25 hover:text-white/60 transition">
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm text-white/65 border border-[rgba(77,124,255,.12)]"
                        : "rounded-bl-sm text-white/55 border border-white/5 bg-white/3"
                    )}
                    style={m.role === "user" ? { background: "rgba(77,124,255,.1)" } : {}}
                  >
                    {m.content
                      ? m.content.split("\n").map((line, j) => (
                          <span key={j}>
                            {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                              part.startsWith("**") ? (
                                <strong key={k} className="text-white/80">{part.slice(2, -2)}</strong>
                              ) : part
                            )}
                            {j < m.content.split("\n").length - 1 && <br />}
                          </span>
                        ))
                      : loading && i === messages.length - 1 ? (
                          <div className="flex gap-1 py-0.5">
                            {[0, 1, 2].map((j) => (
                              <div key={j} className="h-1 w-1 animate-bounce rounded-full bg-white/35" style={{ animationDelay: `${j * 0.12}s` }} />
                            ))}
                          </div>
                        ) : null}

                    {/* Quick replies on first message */}
                    {i === 0 && showQuick && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cv.chatbotScripts.quickReplies.map((q) => (
                          <button
                            key={q}
                            onClick={() => send(q)}
                            className="rounded-lg border border-[#00e5bf]/15 bg-[#00e5bf]/8 px-2.5 py-1.5 text-[10px] text-[#00e5bf] hover:bg-[#00e5bf]/15 transition"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e: FormEvent) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-white/5 p-3 bg-white/2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg bg-white/4 border border-white/5 px-3 py-2 text-xs text-[#eae9fc] placeholder-white/20 outline-none focus:border-[#00e5bf]/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-[#07080f] disabled:opacity-35 transition hover:brightness-110"
                style={{ background: "linear-gradient(135deg,#00e5bf,#4d7cff)" }}
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="flex h-13 w-13 h-[52px] w-[52px] items-center justify-center rounded-full text-[#07080f] font-black text-sm"
        style={{
          background: "linear-gradient(135deg,#00e5bf,#4d7cff)",
          boxShadow: "0 4px 24px rgba(0,229,191,0.3), 0 0 0 1px rgba(0,229,191,0.1)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="ai" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              AI
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
