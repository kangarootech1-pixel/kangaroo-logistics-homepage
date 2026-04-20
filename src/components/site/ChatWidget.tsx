import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

export const ChatWidget = () => {
  const { t, dir } = useLang();
  const [open, setOpen] = useState(false);

  // Bottom-left in RTL, bottom-right in LTR
  const sideClass = dir === "rtl" ? "left-5" : "right-5";

  return (
    <div className={`fixed bottom-5 ${sideClass} z-50`}>
      {open && (
        <div className="mb-3 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl bg-card border border-border shadow-card-elevated overflow-hidden animate-float-up">
          <div className="gradient-cta text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 inline-flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{t.chat.title}</div>
                <div className="text-[11px] opacity-90 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-300 inline-block" />
                  {t.chat.online}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/15 rounded-lg p-1.5" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 bg-surface min-h-[140px]">
            <div className="inline-block max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border px-3.5 py-2.5 text-sm text-foreground shadow-soft">
              {t.chat.greeting}
            </div>
          </div>
          <div className="p-3 border-t border-border bg-card flex items-center gap-2">
            <input
              disabled
              placeholder={t.chat.placeholder}
              className="flex-1 h-10 px-3 rounded-full bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              disabled
              className="h-10 w-10 rounded-full gradient-cta text-primary-foreground inline-flex items-center justify-center opacity-60 cursor-not-allowed"
              aria-label={t.chat.send}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full gradient-cta text-primary-foreground shadow-glow hover:scale-105 transition-base"
        aria-label="Open chat"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />}
        {open ? <X className="h-6 w-6 relative" /> : <MessageCircle className="h-6 w-6 relative" />}
      </button>
    </div>
  );
};
