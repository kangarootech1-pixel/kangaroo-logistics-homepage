import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/i18n/LangProvider";
import { translations } from "@/i18n/translations";

const WHATSAPP_NUMBER = "972593150120";

// Maps a service slug (from ?service=) to its index in form.serviceOptions.
// Anything unknown falls back to the last option ("Not Specified").
const SERVICE_SLUG_TO_INDEX: Record<string, number> = {
  "local-delivery": 0,
  "fulfillment-storage": 1,
  "jordan-palestine": 2,
  "freight-clearance": 3,
  consulting: 4,
};
const NOT_SPECIFIED_INDEX = 5;

const Support = () => {
  const { t, dir } = useLang();
  const [searchParams] = useSearchParams();
  const ArrowBack = dir === "rtl" ? ArrowRight : ArrowLeft;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<number | "">("");
  const [service, setService] = useState<number>(NOT_SPECIFIED_INDEX);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pre-fill the related service from ?service=<slug> on mount / param change.
  useEffect(() => {
    const slug = searchParams.get("service");
    if (slug && slug in SERVICE_SLUG_TO_INDEX) {
      setService(SERVICE_SLUG_TO_INDEX[slug]);
    }
  }, [searchParams]);

  const selectClass =
    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = {
      name: !name.trim(),
      phone: !phone.trim(),
      requestType: requestType === "",
      message: !message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    // WhatsApp message is always sent in Arabic regardless of UI language —
    // it lands in the team's inbox, which operates in Arabic.
    const wa = translations.ar.support.wa;
    const arForm = translations.ar.support.form;
    const lines = [
      wa.header,
      "------------------------",
      `${wa.name} ${name.trim()}`,
      `${wa.phone} ${phone.trim()}`,
      `${wa.email} ${email.trim() || wa.notSpecified}`,
      `${wa.requestType} ${arForm.requestTypeOptions[requestType as number]}`,
      `${wa.service} ${arForm.serviceOptions[service]}`,
      "------------------------",
      wa.details,
      message.trim(),
      "------------------------",
      wa.source,
      wa.website,
    ];
    const encoded = encodeURIComponent(lines.join("\n"));

    // Brief delay so the button's loading state is visible before the
    // WhatsApp tab opens.
    window.setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
      setSuccess(true);
      setSubmitting(false);
      setName("");
      setPhone("");
      setEmail("");
      setRequestType("");
      setService(NOT_SPECIFIED_INDEX);
      setMessage("");
      setErrors({});
    }, 600);
  };

  const ErrorText = () => (
    <p className="mt-1 text-xs text-destructive">{t.support.form.required}</p>
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
                <Headphones size={14} aria-hidden="true" />
                {t.support.hero.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                {t.support.hero.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 leading-relaxed">
                {t.support.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container py-16 md:py-20">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Contact info */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                    {t.support.info.title}
                  </h2>
                  <ul className="mt-6 space-y-5 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-bold text-foreground">
                          {t.support.info.whatsappLabel}
                        </div>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-base"
                          dir="ltr"
                        >
                          {t.support.info.whatsapp}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-bold text-foreground">
                          {t.support.info.emailLabel}
                        </div>
                        <a
                          href={`mailto:${t.support.info.email}`}
                          className="text-muted-foreground hover:text-primary transition-base"
                          dir="ltr"
                        >
                          {t.support.info.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-bold text-foreground">
                          {t.support.info.addressLabel}
                        </div>
                        <span className="text-muted-foreground">
                          {t.support.info.address}
                        </span>
                      </div>
                    </li>
                  </ul>
                  <p className="mt-6 rounded-xl bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                    {t.support.info.note}
                  </p>
                </div>
              </div>

              {/* Request form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                    {t.support.form.title}
                  </h2>

                  {success && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                      <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span>{t.support.form.success}</span>
                    </div>
                  )}

                  <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                    <div>
                      <Label htmlFor="name">
                        {t.support.form.name} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5"
                      />
                      {errors.name && <ErrorText />}
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        {t.support.form.phone} <span className="text-destructive">*</span>
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
                      <Label htmlFor="email">
                        {t.support.form.email}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({t.support.form.optional})
                        </span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <Label htmlFor="requestType">
                        {t.support.form.requestType}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <select
                        id="requestType"
                        value={requestType}
                        onChange={(e) =>
                          setRequestType(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                        className={`${selectClass} mt-1.5`}
                      >
                        <option value="" disabled>
                          {t.support.form.selectPlaceholder}
                        </option>
                        {t.support.form.requestTypeOptions.map((opt, i) => (
                          <option key={opt} value={i}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.requestType && <ErrorText />}
                    </div>

                    <div>
                      <Label htmlFor="service">
                        {t.support.form.service}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({t.support.form.optional})
                        </span>
                      </Label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(Number(e.target.value))}
                        className={`${selectClass} mt-1.5`}
                      >
                        {t.support.form.serviceOptions.map((opt, i) => (
                          <option key={opt} value={i}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">
                        {t.support.form.message}{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1.5"
                      />
                      {errors.message && <ErrorText />}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full font-bold h-12"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t.support.form.submitting}
                        </>
                      ) : (
                        t.support.form.submit
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
