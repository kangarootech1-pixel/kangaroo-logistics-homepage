import { Truck, Warehouse, MoveRight, Plane, Globe2, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { useInView } from "@/hooks/use-in-view";

const icons = [Truck, Warehouse, MoveRight, Plane, Globe2, MapPin];

export const Services = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="services"
      className={`py-20 md:py-28 bg-background transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">
            {t.services.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.services.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            const code = `0${i + 1}`;
            return (
              <div
                key={i}
                className="group relative rounded-md border border-border border-t-2 border-t-transparent bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/40 hover:border-t-primary"
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
                  <div className="relative shrink-0 p-2 rounded-lg bg-primary/10" aria-hidden="true">
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary-deep/10 blur-md opacity-0 group-hover:opacity-100 transition-base"></div>
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-soft">
                      <Icon className="h-6 w-6" />
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
