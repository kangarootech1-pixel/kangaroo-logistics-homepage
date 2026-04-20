import { useLang } from "@/i18n/LangProvider";

export const KangarooLogo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const { lang } = useLang();
  const color = variant === "light" ? "text-white" : "text-foreground";
  const accent = variant === "light" ? "text-white/80" : "text-primary";

  return (
    <a href="#home" className="flex items-center gap-2.5 group" aria-label="Kangaroo">
      <span className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl ${variant === "light" ? "bg-white/15 backdrop-blur" : "bg-primary"} shadow-soft transition-base group-hover:scale-105`}>
        {/* Stylized kangaroo silhouette */}
        <svg viewBox="0 0 32 32" className={variant === "light" ? "h-6 w-6 text-white" : "h-6 w-6 text-primary-foreground"} fill="currentColor" aria-hidden="true">
          <path d="M21 4c-1.1 0-2 .9-2 2 0 .5.2 1 .5 1.4-2 .8-3.5 2.6-3.9 4.8L13 14c-1.1.3-2 1.3-2 2.5v1c0 .8.4 1.5 1 2l-1.5 4c-.2.6.1 1.2.6 1.5l1 .5c.5.3 1.2.1 1.5-.4l2-3 1 4c.1.6.7 1 1.3.9l1-.2c.6-.1 1-.7.9-1.3l-1.2-5.5 2.4-1.2c1.5-.7 2.5-2.3 2.5-4V8c0-2.2-1.8-4-4-4h-.5zm0 2.5c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z"/>
        </svg>
      </span>
      <div className="leading-tight">
        <div className={`font-extrabold text-lg ${color}`}>{lang === "ar" ? "كنغارو" : "Kangaroo"}</div>
        <div className={`text-[10px] font-semibold tracking-widest ${accent} uppercase`}>Logistics</div>
      </div>
    </a>
  );
};
