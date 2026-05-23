import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangProvider";
import { useInView } from "@/hooks/use-in-view";
import { SERVICE_ICONS } from "./serviceIcons";

const codesAr = ["٠١", "٠٢", "٠٣", "٠٤", "٠٥"];
const codesEn = ["01", "02", "03", "04", "05"];

export const Services = () => {
  const { t, dir } = useLang();
  const { ref, inView } = useInView<HTMLElement>();
  const items = t.services.items.slice(0, 5);
  const codes = dir === "rtl" ? codesAr : codesEn;
  const ArrowGo = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={ref}
      id="services"
      className={`scroll-mt-20 md:scroll-mt-24 bg-background transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container pt-20 md:pt-28 pb-8 md:pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            <Package size={14} aria-hidden="true" />
            {t.services.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            {t.services.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            {t.services.subtitle}
          </p>
        </div>
      </div>

      {items.map((service, i) => {
        const isOddRow = i % 2 === 0;
        const Icon = SERVICE_ICONS[service.slug];
        const bgClass = isOddRow ? "bg-background" : "bg-primary/5";
        const textOrderClass = isOddRow ? "md:order-1" : "md:order-2";
        const visualOrderClass = isOddRow ? "md:order-2" : "md:order-1";

        return (
          <div key={service.slug} className={bgClass}>
            <div className="container py-10 md:py-14 lg:py-16">
              <div className="grid gap-10 md:gap-16 md:grid-cols-2 items-center">
                <div className={textOrderClass}>
                  <span className="serial text-sm font-bold text-primary tracking-widest">
                    {codes[i]}
                  </span>
                  <h3 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary font-bold h-11 px-6"
                    >
                      <Link to={`/services/${service.slug}`}>
                        <span>{t.services.learnMore}</span>
                        <ArrowGo
                          className="h-4 w-4 ms-2"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className={visualOrderClass}>
                  <div className="w-full h-full min-h-[280px] rounded-3xl bg-primary/10 flex items-center justify-center p-8">
                    {Icon && (
                      <Icon
                        size={96}
                        className="text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
