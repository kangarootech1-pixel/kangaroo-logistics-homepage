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
        <div className="mb-3 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl border overflow-hidden animate-float-up bg-card border-border shadow-card-elevated">
          <div className="p-4 flex items-center justify-between gradient-cta text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full inline-flex items-center justify-center bg-white/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{t.chat.title}</div>
                <div className="text-[11px] opacity-90 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full inline-block bg-green-300" />
                  {t.chat.online}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/15 rounded-lg p-1.5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 min-h-[140px] bg-surface">
            <div className="inline-block max-w-[85%] rounded-2xl rounded-bl-sm border px-3.5 py-2.5 text-sm shadow-soft bg-card border-border text-foreground">
              {t.chat.greeting}
            </div>
          </div>
          <div className="p-3 border-t flex items-center gap-2 bg-card border-border">
            <input
              disabled
              placeholder={t.chat.placeholder}
              className="flex-1 h-10 px-3 rounded-full text-sm outline-none bg-secondary text-foreground placeholder:text-muted-foreground"
            />
            <button
              disabled
              className="h-10 w-10 rounded-full inline-flex items-center justify-center opacity-60 cursor-not-allowed gradient-cta text-primary-foreground"
              aria-label={t.chat.send}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full shadow-glow hover:scale-105 transition-base gradient-cta text-primary-foreground"
        aria-label="Open chat"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full animate-pulse-ring bg-primary" />
        )}
        {open ? <X className="h-6 w-6 relative" /> : <MessageCircle className="h-6 w-6 relative" />}
      </button>
    </div>
  );
};
