import { useLang } from "@/i18n/LangProvider";

export const StatsMarquee = () => {
  const { t } = useLang();
  const items = t.statsMarquee.items;
  const loop = [...items, ...items];

  return (
    <section
      aria-label={t.statsMarquee.items.join(" • ")}
      className="relative overflow-hidden border-y border-primary-deep bg-gradient-to-r from-primary-deep via-primary to-primary-deep py-6 text-primary-foreground"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-5">
            <span className="text-xl md:text-2xl font-extrabold tracking-wide">{item}</span>
            <span className="text-amber text-2xl leading-none" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
