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
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      {/* Light overlay for text legibility */}
      <div className="absolute inset-0 bg-background/75 backdrop-blur-[1px] -z-10" />

      <div className="container relative z-10">
        <div className="max-w-3xl ms-auto text-end animate-float-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold tracking-wide ring-1 ring-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.tagline}
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.15] text-foreground">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl ms-auto">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-end justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-glow h-12 px-7">
              <a href="#contact">
                {t.hero.ctaPrimary}
                <Arrow className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-card hover:bg-muted font-bold h-12 px-7">
              <a href="#services">{t.hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>

        {/* Stat chips */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {t.hero.stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card/90 backdrop-blur ring-1 ring-border px-6 py-5 text-center shadow-soft"
            >
              <div className="text-3xl font-extrabold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};
