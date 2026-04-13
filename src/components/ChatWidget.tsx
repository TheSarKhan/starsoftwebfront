"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

const WELCOME_TEXT =
  "Salam, StarSoft-a xoş gəldiniz. Xidmətlər, qiymət, müddət və ya əlaqə haqqında suallarınıza cavab verə bilərəm.";

const QUICK_REPLIES = ["Xidmətlər", "Qiymət necədir", "Necə işləyirsiniz", "Əlaqə məlumatları"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const nextId = () => ++idRef.current;

  // Init welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "model", text: WELCOME_TEXT }]);
      setShowQuickReplies(true);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (pathname.startsWith("/admin")) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowQuickReplies(false);

    const userMsg: Message = { id: nextId(), role: "user", text: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.role === "user" || m.role === "model")
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "model", text: data.text },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "model", text: "Bağlantı xətası. Zəhmət olmasa yenidən cəhd edin." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="ChatBot"
        className="fixed bottom-6 left-6 z-50 w-[52px] h-[52px] rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform bg-[var(--color-ink)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={20} color="white" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={20} color="white" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[76px] left-6 z-50 w-[340px] sm:w-[380px] bg-white border border-[var(--color-hairline)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(520px, calc(100dvh - 100px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-hairline)] bg-[var(--color-ink)] flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
                <span className="font-[family-name:var(--font-display)] text-[13px] font-bold text-white leading-none">S</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white leading-none mb-0.5">StarSoft Köməkçi</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                  <p className="text-[11px] text-white/60">Onlayn</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-[var(--color-gold)] text-white rounded-br-sm"
                        : "bg-[var(--color-mist)] text-[var(--color-ink)] rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Quick replies after welcome */}
              {showQuickReplies && messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="px-3 py-1.5 text-[12px] font-medium text-[var(--color-gold)] border border-[var(--color-gold)]/40 rounded-full hover:bg-[var(--color-gold-soft)] transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-start">
                  <div className="bg-[var(--color-mist)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-slate)]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 px-4 py-3 border-t border-[var(--color-hairline)] flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Sualınızı yazın..."
                disabled={loading}
                className="flex-1 text-[14px] text-[var(--color-ink)] placeholder-[var(--color-mist-slate)] bg-[var(--color-mist)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-[var(--color-gold)] flex items-center justify-center flex-shrink-0 hover:bg-[var(--color-gold-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={15} strokeWidth={2} color="white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
