import { useEffect, useRef, useState } from "react";
import { Truck, Warehouse, MoveRight, Plane, Globe2, ArrowLeft, ArrowRight, Package } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { useInView } from "@/hooks/use-in-view";

const icons = [Truck, Warehouse, MoveRight, Plane, Globe2];

const codesAr = ["٠١", "٠٢", "٠٣", "٠٤", "٠٥"];
const codesEn = ["01", "02", "03", "04", "05"];

const stickyTops = [
  "top-[120px]",
  "top-[140px]",
  "top-[160px]",
  "top-[180px]",
  "top-[200px]",
];
const cardHeights = [
  "min-h-[420px]",
  "min-h-[440px]",
  "min-h-[460px]",
  "min-h-[480px]",
  "min-h-[500px]",
];

export const Services = () => {
  const { t, dir } = useLang();
  const { ref, inView } = useInView<HTMLElement>();
  const items = t.services.items.slice(0, 5);
  const codes = dir === "rtl" ? codesAr : codesEn;

  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const idx = Math.max(
          ...visible.map((e) => Number((e.target as HTMLElement).dataset.index)),
        );
        setActiveIndex(idx);
      },
      { rootMargin: "-220px 0px -40% 0px", threshold: 0 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            <Package size={14} aria-hidden="true" />
            {t.services.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            {t.services.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.services.subtitle}</p>
        </div>

        {/* Mobile / tablet: flat vertical list */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:hidden">
          {items.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="relative rounded-md border border-border bg-card p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-soft">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <span className="serial text-xs font-bold text-primary tracking-widest">
                      {codes[i]}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: sticky stack */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[160px_1fr] lg:gap-10">
          {/* Pill column */}
          <div>
            <div className="sticky top-[120px] flex flex-col gap-4">
              {items.map((_, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`serial inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm tracking-widest transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary/10 font-bold text-primary"
                          : "border-border"
                      }`}
                    >
                      {codes[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card stack */}
          <div className="flex flex-col gap-4">
            {items.map((s, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-index={i}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-10 lg:p-[44px] shadow-card-elevated sticky ${stickyTops[i]} ${cardHeights[i]}`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"
                  />
                  <Icon
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -end-10 h-56 w-56 text-primary/10"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute top-0 start-0 w-4 h-4 border-t border-s border-primary/40"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute top-0 end-0 w-4 h-4 border-t border-e border-primary/40"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 start-0 w-4 h-4 border-b border-s border-primary/40"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 end-0 w-4 h-4 border-b border-e border-primary/40"
                  ></span>

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start gap-6">
                      <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-soft">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <span className="serial text-sm font-bold text-primary tracking-widest">
                          {codes[i]}
                        </span>
                        <h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {s.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.stats.map((stat) => (
                        <span
                          key={stat}
                          className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-8 flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-[0.14em]">
                      <span>{t.hero.ctaSecondary}</span>
                      {dir === "rtl" ? (
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
