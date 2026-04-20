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
                className="rounded-2xl bg-card border border-border p-6 text-center shadow-soft transition-base hover:shadow-card-elevated hover:-translate-y-1"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-cta text-primary-foreground shadow-soft">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-3xl md:text-4xl font-extrabold text-primary">
                  {it.value}
                  {"suffix" in it && it.suffix ? <span className="text-base text-muted-foreground font-bold">{it.suffix}</span> : null}
                </div>
                <div className="mt-2 text-sm text-muted-foreground font-medium leading-snug">{it.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
