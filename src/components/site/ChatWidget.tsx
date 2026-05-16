import { useEffect, useRef, useState, FormEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

const WEBHOOK_URL =
  "https://n8n.srv1572689.hstgr.cloud/webhook-test/ffc07852-85c2-43ef-863f-4ea205b852ec";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const extractReply = (raw: string): string | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    const node = Array.isArray(parsed) ? parsed[0] : parsed;
    if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>;
      const candidate = obj.reply ?? obj.output ?? obj.text ?? obj.message;
      if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    }
    if (typeof parsed === "string" && parsed.trim()) return parsed.trim();
  } catch {
    // Not JSON — fall through to plain-text handling.
  }
  const trimmed = raw.trim();
  return trimmed || null;
};

export const ChatWidget = () => {
  const { t, dir, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId] = useState<string>(() => {
    const KEY = "kangaroo_chat_id";
    const existing = sessionStorage.getItem(KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
    return id;
  });
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sideClass = dir === "rtl" ? "right-5" : "left-5";

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId.current++, role: "bot", text: t.chat.greeting }]);
    }
  }, [open, messages.length, t.chat.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { id: nextId.current++, role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang, session_id: sessionId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.text();
      const reply = extractReply(raw) ?? t.chat.error;
      setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", text: reply }]);
    } catch (err) {
      console.error("Webhook error:", err);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "bot", text: t.chat.error },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`fixed bottom-5 ${sideClass} z-50`}>
      {open && (
        <div className="mb-3 flex h-[400px] w-[300px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-float-up">
          <div className="gradient-cta text-primary-foreground flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold leading-tight">{t.chat.title}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-2.5 overflow-y-auto bg-surface p-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-3.5 py-3 shadow-soft">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={send}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              disabled={sending}
              className="bg-secondary text-foreground placeholder:text-muted-foreground h-10 flex-1 rounded-full border border-border px-4 text-sm outline-none focus:border-primary disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="bg-primary text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-full transition-base hover:opacity-90 disabled:opacity-50"
              aria-label={t.chat.send}
            >
              <Send className={`h-4 w-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="gradient-cta text-primary-foreground shadow-glow transition-base relative inline-flex h-14 w-14 items-center justify-center rounded-full hover:scale-105"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {!open && (
          <span className="bg-primary animate-pulse-ring absolute inset-0 rounded-full" />
        )}
        {open ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircle className="relative h-6 w-6" />
        )}
      </button>
    </div>
  );
};
