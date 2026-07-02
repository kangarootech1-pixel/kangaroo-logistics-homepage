import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/i18n/LangProvider";
import { translations } from "@/i18n/translations";

const WEBHOOK_URL: string = import.meta.env.VITE_FORMS_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 10_000;
const MIN_AGE = 18;
const MAX_AGE = 60;

// Shape returned by the /api/jobs serverless proxy (see api/jobs.ts).
interface Job {
  title: string;
  city: string | null;
  type: string | null;
  description: string;
  formUrl: string | null;
  publishedDate: string | null;
}

const Careers = () => {
  const { t, dir } = useLang();
  const ArrowBack = dir === "rtl" ? ArrowRight : ArrowLeft;

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<number | "">("");
  const [residence, setResidence] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState<number | "">("");
  const [experience, setExperience] = useState("");
  const [position, setPosition] = useState<number | "">("");
  // Honeypot — hidden from real users; only bots fill it.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Close the modal automatically once a submission succeeds; the success
  // banner then shows on the page beneath the trigger button.
  useEffect(() => {
    if (success) setDialogOpen(false);
  }, [success]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    (async () => {
      try {
        const res = await fetch("/api/jobs", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`jobs responded ${res.status}`);
        const data = (await res.json()) as Job[];
        if (active) setJobs(Array.isArray(data) ? data : []);
      } catch {
        // Network/CORS/404 (e.g. plain `vite dev` without the serverless
        // function) — fall back to the empty state rather than crashing.
      } finally {
        if (active) setJobsLoading(false);
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const selectClass =
    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const resetForm = () => {
    setFullName("");
    setAge("");
    setMaritalStatus("");
    setResidence("");
    setPhone("");
    setEducation("");
    setExperience("");
    setPosition("");
    setWebsite("");
    setErrors({});
  };

  const validate = () => {
    const ageNum = Number.parseInt(age, 10);
    return {
      fullName: !fullName.trim(),
      age:
        !age.trim() ||
        Number.isNaN(ageNum) ||
        ageNum < MIN_AGE ||
        ageNum > MAX_AGE,
      maritalStatus: maritalStatus === "",
      residence: !residence.trim(),
      phone: !phone.trim(),
      education: education === "",
      position: position === "",
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    // Bot filled the honeypot: pretend it worked and send nothing.
    if (website.trim()) {
      setSuccess(true);
      resetForm();
      return;
    }

    setSubmitting(true);
    setSuccess(false);
    setSubmitError(false);

    // Payload labels are always Arabic — the receiving inbox operates in
    // Arabic and the spec hardcodes the Arabic "لا يوجد" experience fallback,
    // implying an Arabic-only payload (no `lang` field is requested either).
    const arForm = translations.ar.careers.form;
    const payload = {
      formType: "career_application",
      fullName: fullName.trim(),
      age: age.trim(),
      maritalStatus: arForm.maritalStatusOptions[maritalStatus as number],
      residence: residence.trim(),
      phone: phone.trim(),
      education: arForm.educationOptions[education as number],
      experience: experience.trim() || arForm.experienceNone,
      position: arForm.positionOptions[position as number],
      source: "kangaroo-website",
      timestamp: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      WEBHOOK_TIMEOUT_MS,
    );

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
      setSuccess(true);
      resetForm();
    } catch {
      // Form data is intentionally preserved so the user can retry.
      setSubmitError(true);
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  const ErrorText = () => (
    <p className="mt-1 text-xs text-destructive">{t.careers.form.required}</p>
  );

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
                <Briefcase size={14} aria-hidden="true" />
                {t.careers.hero.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                {t.careers.hero.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {t.careers.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="container py-14 md:py-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight text-center">
              {t.careers.jobs.title}
            </h2>

            <div className="mt-10 max-w-4xl mx-auto">
              {jobsLoading ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                    >
                      <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
                      <div className="mt-4 flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
                        <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
                      </div>
                      <div className="mt-4 h-3 w-full rounded bg-muted animate-pulse" />
                      <div className="mt-2 h-3 w-5/6 rounded bg-muted animate-pulse" />
                      <div className="mt-6 h-10 w-32 rounded-full bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  {t.careers.jobs.empty}
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {jobs.map((job, i) => (
                    <article
                      key={`${job.title}-${i}`}
                      className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
                    >
                      <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                        {job.title}
                      </h3>

                      {(job.city || job.type) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.city && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                              <MapPin size={12} aria-hidden="true" />
                              {job.city}
                            </span>
                          )}
                          {job.type && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                              <Clock size={12} aria-hidden="true" />
                              {job.type}
                            </span>
                          )}
                        </div>
                      )}

                      {job.description && (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                      )}

                      {job.formUrl && (
                        <div className="mt-auto pt-5">
                          <Button
                            asChild
                            className="rounded-full font-bold"
                          >
                            <a
                              href={job.formUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t.careers.jobs.apply}
                            </a>
                          </Button>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-16 md:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed">
                {t.careers.general.prompt}
              </p>

              <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                  setDialogOpen(open);
                  // Start from a clean slate each time the modal is opened.
                  if (open) {
                    setSuccess(false);
                    setSubmitError(false);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-6 h-12 rounded-full px-8 font-bold"
                  >
                    {t.careers.general.button}
                  </Button>
                </DialogTrigger>
                <DialogContent
                  dir={dir}
                  className="max-h-[90vh] overflow-y-auto text-start sm:max-w-lg"
                >
                  <DialogHeader>
                    <DialogTitle className="text-xl font-extrabold tracking-tight">
                      {t.careers.form.title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      {t.careers.general.prompt}
                    </DialogDescription>
                  </DialogHeader>

                  {submitError && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
                      <AlertCircle
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{t.careers.form.error}</span>
                    </div>
                  )}

                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div>
                  <Label htmlFor="fullName">
                    {t.careers.form.fullName}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5"
                  />
                  {errors.fullName && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="age">
                    {t.careers.form.age}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min={MIN_AGE}
                    max={MAX_AGE}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1.5"
                    dir="ltr"
                  />
                  {errors.age && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="maritalStatus">
                    {t.careers.form.maritalStatus}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="maritalStatus"
                    value={maritalStatus}
                    onChange={(e) =>
                      setMaritalStatus(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className={`${selectClass} mt-1.5`}
                  >
                    <option value="" disabled>
                      {t.careers.form.selectPlaceholder}
                    </option>
                    {t.careers.form.maritalStatusOptions.map((opt, i) => (
                      <option key={opt} value={i}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.maritalStatus && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="residence">
                    {t.careers.form.residence}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="residence"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="mt-1.5"
                  />
                  {errors.residence && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="phone">
                    {t.careers.form.phone}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5"
                    dir="ltr"
                  />
                  {errors.phone && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="education">
                    {t.careers.form.education}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="education"
                    value={education}
                    onChange={(e) =>
                      setEducation(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className={`${selectClass} mt-1.5`}
                  >
                    <option value="" disabled>
                      {t.careers.form.selectPlaceholder}
                    </option>
                    {t.careers.form.educationOptions.map((opt, i) => (
                      <option key={opt} value={i}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.education && <ErrorText />}
                </div>

                <div>
                  <Label htmlFor="experience">
                    {t.careers.form.experience}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({t.careers.form.optional})
                    </span>
                  </Label>
                  <Textarea
                    id="experience"
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder={t.careers.form.experiencePlaceholder}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="position">
                    {t.careers.form.position}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="position"
                    value={position}
                    onChange={(e) =>
                      setPosition(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className={`${selectClass} mt-1.5`}
                  >
                    <option value="" disabled>
                      {t.careers.form.selectPlaceholder}
                    </option>
                    {t.careers.form.positionOptions.map((opt, i) => (
                      <option key={opt} value={i}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.position && <ErrorText />}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full font-bold h-12"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      {t.careers.form.submitting}
                    </>
                  ) : (
                    t.careers.form.submit
                  )}
                </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {success && !dialogOpen && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-start text-sm font-semibold text-primary">
                  <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{t.careers.form.success}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
