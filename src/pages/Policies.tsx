import { AlertTriangle, ArrowLeft, ArrowRight, Check, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { useLang } from "@/i18n/LangProvider";

const Policies = () => {
  const { t, dir } = useLang();
  const ArrowBack = dir === "rtl" ? ArrowRight : ArrowLeft;

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
            <div className="mt-8 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-semibold text-white">
                <Shield size={14} aria-hidden="true" />
                {t.policies.hero.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                {t.policies.hero.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {t.policies.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-16 md:py-20">
            <div className="max-w-3xl mx-auto">
              {t.policies.sections.map((policy) => (
                <div
                  key={policy.title}
                  className="rounded-2xl border border-border bg-card p-6 mb-4 shadow-soft"
                >
                  <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                    {policy.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {policy.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 mb-4">
                <h2 className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-amber-800 tracking-tight">
                  <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {t.policies.notice.title}
                </h2>
                <p className="mt-3 text-sm md:text-base text-amber-800 leading-relaxed">
                  {t.policies.notice.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Policies;
