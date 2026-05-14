import { Building2 } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

const SLOT_COUNT = 8;

export const Partners = () => {
  const { t } = useLang();
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">{t.partners.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground">{t.partners.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.partners.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: SLOT_COUNT }).map((_, i) => (
            <div
              key={i}
              className="aspect-[5/2] rounded-md bg-card/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-muted-foreground opacity-60 hover:opacity-100 hover:border-primary hover:text-primary transition-base"
            >
              <Building2 className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Coming Soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
