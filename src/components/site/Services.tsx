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

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-base hover:-translate-y-1 hover:shadow-card-elevated hover:border-primary/40"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-base">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-base">
                  <span>{t.hero.ctaSecondary}</span>
                  <Arrow className="h-4 w-4" />
                </div>
                <div className="absolute inset-x-6 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-base" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
