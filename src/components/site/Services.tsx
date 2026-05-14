import { Truck, Warehouse, MoveRight, Plane, Globe2, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

const icons = [Truck, Warehouse, MoveRight, Plane, Globe2, MapPin];

export const Services = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">
            {t.services.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.services.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            const code = `0${i + 1}`;
            return (
              <div
                key={i}
                className="route-accent group relative rounded-md border border-border bg-card p-6 shadow-soft transition-base hover:-translate-y-1 hover:shadow-card-elevated hover:border-primary/40 overflow-hidden"
              >
                <span className="serial absolute top-4 end-5 text-[11px] text-muted-foreground/70 tracking-widest" aria-hidden="true">{code}</span>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-base" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-base">
                  <span>{t.hero.ctaSecondary}</span>
                  <Arrow className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
