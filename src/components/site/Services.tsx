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
                className="group relative rounded-md border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-elevated hover:border-primary/40"
              >
                <span aria-hidden="true" className="absolute top-0 start-0 w-4 h-4 border-t border-s border-primary/40 group-hover:border-primary transition-base"></span>
                <span aria-hidden="true" className="absolute top-0 end-0 w-4 h-4 border-t border-e border-primary/40 group-hover:border-primary transition-base"></span>
                <span aria-hidden="true" className="absolute bottom-0 start-0 w-4 h-4 border-b border-s border-primary/40 group-hover:border-primary transition-base"></span>
                <span aria-hidden="true" className="absolute bottom-0 end-0 w-4 h-4 border-b border-e border-primary/40 group-hover:border-primary transition-base"></span>

                <span
                  aria-hidden="true"
                  className="serial absolute -top-3 end-4 w-8 h-8 rounded-full bg-background border border-primary/40 flex items-center justify-center text-[11px] font-bold text-primary tracking-widest"
                >
                  {code}
                </span>

                <div className="flex items-start gap-4">
                  <div className="relative shrink-0" aria-hidden="true">
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary-deep/10 blur-md opacity-0 group-hover:opacity-100 transition-base"></div>
                    <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-soft">
                      <Icon className="h-5 w-5" />
                    </div>
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
