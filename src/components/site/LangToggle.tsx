import { useLang } from "@/i18n/LangProvider";
import { Languages } from "lucide-react";

export const LangToggle = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const { lang, toggle } = useLang();
  const base =
    variant === "light"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-border text-foreground hover:bg-secondary";
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-base ${base}`}
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span>{lang === "ar" ? "EN" : "ع"}</span>
    </button>
  );
};
