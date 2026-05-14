import { MapPinned, Zap, BadgePercent, ShoppingBag } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

const icons = [MapPinned, Zap, BadgePercent, ShoppingBag];

export const WhyUs = () => {
  const { t } = useLang();
  return (
    <section id="why" className="py-20 md:py-28 bg-surface">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">{t.why.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.why.title}</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.why.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="route-accent relative rounded-md bg-card border border-border p-6 text-center shadow-soft transition-base hover:shadow-card-elevated hover:-translate-y-1 hover:border-primary/30 overflow-hidden"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-md gradient-cta text-primary-foreground shadow-soft" aria-hidden="true">
                  <Icon className="h-6 w-6" />
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
