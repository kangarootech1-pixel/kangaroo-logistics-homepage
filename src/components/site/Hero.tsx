import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { Button } from "@/components/ui/button";
import warehouseImg from "@/assets/warehouse-hero.jpg";

export const Hero = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 min-h-[90vh] flex items-center">
      {/* Background image */}
      <img
        src={warehouseImg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      {/* Layered overlay — keeps the warehouse readable as the actual backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/55 to-background/95" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-background/60 via-transparent to-transparent" />

      <div className="container relative z-10">
        <div dir="rtl" className="max-w-2xl ms-auto text-right animate-float-up">
          <span className="inline-flex items-center gap-2 rounded-sm bg-primary/10 text-primary px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase ring-1 ring-primary/25">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t.hero.tagline}
          </span>

          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-[1.2] text-foreground text-balance">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground text-right">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row-reverse items-center sm:justify-start justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-glow h-12 px-7">
              <a href="#contact">
                {t.hero.ctaPrimary}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-card hover:bg-muted font-bold h-12 px-7">
              <a href="#services">{t.hero.ctaSecondary}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-card hover:bg-muted font-bold h-12 px-7">
              <a href="https://kangaroo-pal.olivery.io/ar_SY/order_tracking" target="_blank" rel="noopener noreferrer">{t.hero.ctaTrack}</a>
            </Button>
          </div>
        </div>

        {/* Stat chips — manifest-style, mono numerals */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {t.hero.stats.map((s, i) => (
            <div
              key={i}
              className="relative rounded-md bg-card/90 backdrop-blur border border-border px-6 py-5 text-center shadow-soft overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />
              <div className="serial text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground font-semibold tracking-[0.14em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};
