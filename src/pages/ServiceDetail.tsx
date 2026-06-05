import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { SERVICE_ICONS } from "@/components/site/serviceIcons";
import { useLang } from "@/i18n/LangProvider";

const REGISTER_URL =
  "https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, dir } = useLang();
  const service = t.services.items.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = SERVICE_ICONS[service.slug];
  const ArrowBack = dir === "rtl" ? ArrowRight : ArrowLeft;
  const paragraphs = service.fullDesc
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground">
          <div className="container py-16 md:py-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-base text-sm font-bold"
            >
              <ArrowBack className="h-4 w-4" aria-hidden="true" />
              <span>{t.serviceDetail.back}</span>
            </Link>
            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-8">
              <div className="inline-flex h-24 w-24 md:h-28 md:w-28 shrink-0 items-center justify-center rounded-3xl bg-white/10">
                {Icon && (
                  <Icon
                    className="h-12 w-12 md:h-14 md:w-14 text-primary-foreground"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="flex-1">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-foreground/70">
                  {t.services.eyebrow}
                </span>
                <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
                  {service.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-primary-foreground/90 leading-relaxed max-w-3xl">
                  {service.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-14 md:py-20 max-w-4xl">
            <div className="space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border-y border-border">
          <div className="container py-14 md:py-20 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-center tracking-tight">
              {t.serviceDetail.highlightsTitle}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
              {service.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-soft"
                >
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm md:text-base lg:text-lg font-bold text-foreground leading-snug">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-14 md:py-20">
            <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-10 md:p-14 text-center text-primary-foreground shadow-card-elevated">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-foreground/80">
                {t.ctaBand.eyebrow}
              </span>
              <h2 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">
                {t.ctaBand.title}
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                {t.ctaBand.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90 font-bold h-12 px-7"
                >
                  <Link to={`/support?service=${service.slug}`}>
                    {t.serviceDetail.getQuote}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white font-bold h-12 px-7"
                >
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.serviceDetail.register}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
