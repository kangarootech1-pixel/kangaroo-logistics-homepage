import { MapPinned, Zap, BadgePercent, ShoppingBag, Star } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { useInView } from "@/hooks/use-in-view";

const icons = [MapPinned, Zap, BadgePercent, ShoppingBag];

export const WhyUs = () => {
  const { t } = useLang();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="why"
      className={`py-20 md:py-28 bg-surface transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            <Star size={14} aria-hidden="true" />
            {t.why.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.why.title}</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.why.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group relative rounded-md bg-card border border-border border-t-2 border-t-transparent p-6 text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/30 hover:border-t-primary"
              >
                <div className="mx-auto inline-flex p-2 rounded-lg bg-primary/10" aria-hidden="true">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md gradient-cta text-primary-foreground shadow-soft">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 serial text-3xl md:text-4xl font-bold text-primary">
                  {it.value}
                  {"suffix" in it && it.suffix ? <span className="font-sans text-base text-muted-foreground font-bold">{it.suffix}</span> : null}
                </div>
                <div className="mt-2 text-xs md:text-sm text-muted-foreground font-medium leading-snug tracking-wide">{it.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
