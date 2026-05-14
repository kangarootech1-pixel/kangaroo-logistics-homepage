import { useLang } from "@/i18n/LangProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const { t, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-cta p-10 md:p-16 text-center text-primary-foreground shadow-card-elevated">
          <h2 className="text-3xl md:text-5xl font-extrabold">{t.ctaBand.title}</h2>
          <p className="mt-4 text-primary-foreground/85 text-base md:text-lg max-w-2xl mx-auto">
            {t.ctaBand.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-glow"
            >
              <a
                href="https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.ctaBand.buttonRegister}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white font-bold"
            >
              <a
                href="https://kangaroo-pal.olivery.io/ar_SY/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.ctaBand.buttonLogin}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
