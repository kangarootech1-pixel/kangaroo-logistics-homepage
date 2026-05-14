import { useLang } from "@/i18n/LangProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-hero hero-pattern p-10 md:p-16 text-center text-white shadow-card-elevated">
          <h2 className="text-3xl md:text-5xl font-extrabold">{t.ctaBand.title}</h2>
          <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl mx-auto">{t.ctaBand.subtitle}</p>
          <Button asChild size="lg" className="mt-8 h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-glow">
            <a href="https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form" target="_blank" rel="noopener noreferrer">
              {t.ctaBand.button}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
