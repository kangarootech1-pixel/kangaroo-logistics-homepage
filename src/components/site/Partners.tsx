import { useLang } from "@/i18n/LangProvider";

const placeholders = ["AURA", "NOVA", "ORBIT", "PEAK", "ZENITH", "PULSE", "ATLAS", "ECHO"];

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

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className="aspect-[5/2] rounded-xl bg-card border border-border shadow-soft flex items-center justify-center text-muted-foreground font-extrabold tracking-[0.25em] grayscale opacity-70 hover:opacity-100 hover:grayscale-0 hover:text-primary transition-base"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
