import { ArrowLeft, ArrowRight, Eye, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "@/components/site/CTASection";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { useLang } from "@/i18n/LangProvider";
import ceoPhoto from "@/assets/ceo-mahmoud-nasser.jpg";

const About = () => {
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
                <Users size={14} aria-hidden="true" />
                {t.about.hero.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                {t.about.hero.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {t.about.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                  {t.about.story.title}
                </h2>
                <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.about.story.body}
                </p>
              </div>
              <div className="rounded-3xl border border-primary/15 bg-primary/5 p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[260px]">
                <span className="text-7xl md:text-8xl font-extrabold text-primary leading-none tracking-tight">
                  2018
                </span>
                <span className="mt-3 text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-primary/80">
                  {t.about.story.foundedLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border-y border-border">
          <div className="container py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl border border-border bg-card shadow-soft p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-foreground tracking-tight">
                  {t.about.mission.title}
                </h3>
                <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.about.mission.body}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card shadow-soft p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-foreground tracking-tight">
                  {t.about.vision.title}
                </h3>
                <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.about.vision.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5">
          <div className="container py-16 md:py-20">
            <div className="grid gap-10 md:gap-12 md:grid-cols-[auto_1fr] items-start">
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={ceoPhoto}
                  alt={
                    dir === "rtl"
                      ? "محمود ناصر - الرئيس التنفيذي"
                      : "Mahmoud Nasser - CEO"
                  }
                  className="w-48 h-48 rounded-full object-cover object-top shadow-lg"
                />
              </div>

              <div className="border-s-4 border-primary ps-6 md:ps-8">
                <span
                  className="block font-serif text-6xl md:text-7xl text-primary leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <div className="mt-2 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.about.ceo.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="text-xl font-bold text-foreground">
                    {t.about.ceo.name}
                  </div>
                  <div className="mt-1 text-sm text-primary">
                    {t.about.ceo.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TODO: Replace with real management team data */}
        <section className="bg-primary/5 border-y border-border">
          <div className="container py-16 md:py-20">
            <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-card p-12 flex flex-col items-center justify-center text-center min-h-[280px]">
              <Users size={48} className="text-primary/40" aria-hidden="true" />
              <p className="mt-4 text-base md:text-lg font-bold text-muted-foreground">
                {t.about.team.placeholder}
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
