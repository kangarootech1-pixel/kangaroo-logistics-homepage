import { ArrowLeft, Package, Warehouse, Truck, Wallet, Building2, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

type ZoneTone = "green" | "blue" | "orange" | "gray";

const toneStyles: Record<ZoneTone, { badge: string; ring: string; iconBg: string }> = {
  green: {
    badge: "bg-primary/10 text-primary ring-1 ring-primary/20",
    ring: "hover:ring-primary/40",
    iconBg: "bg-primary/10 text-primary",
  },
  blue: {
    badge: "bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-400/30",
    ring: "hover:ring-sky-400/40",
    iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:ring-orange-400/30",
    ring: "hover:ring-orange-400/40",
    iconBg: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  },
  gray: {
    badge: "bg-muted text-muted-foreground ring-1 ring-border",
    ring: "hover:ring-foreground/30",
    iconBg: "bg-muted text-foreground",
  },
};

export const CoverageMap = () => {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  const zones: {
    flag: string;
    title: string;
    cities: string;
    badge: string;
    tone: ZoneTone;
  }[] = [
    {
      flag: "🇵🇸",
      title: isAr ? "فلسطين" : "Palestine",
      cities: isAr ? "رام الله، نابلس، الخليل، غزة" : "Ramallah, Nablus, Hebron, Gaza",
      badge: isAr ? "تغطية شاملة" : "Full coverage",
      tone: "green",
    },
    {
      flag: "🇯🇴",
      title: isAr ? "الأردن" : "Jordan",
      cities: isAr ? "عمّان – جبل الحسين" : "Amman – Jabal Al-Hussein",
      badge: isAr ? "فرع نشط" : "Active branch",
      tone: "blue",
    },
    {
      flag: "🇹🇷",
      title: isAr ? "تركيا" : "Turkey",
      cities: isAr ? "ربط تجاري مباشر" : "Direct trade link",
      badge: isAr ? "استيراد وتصدير" : "Import & Export",
      tone: "orange",
    },
    {
      flag: "🌍",
      title: isAr ? "دولي" : "International",
      cities: isAr ? "شحن من أي مكان" : "Shipping from anywhere",
      badge: isAr ? "تخليص جمركي" : "Customs clearance",
      tone: "gray",
    },
  ];

  const steps = [
    { Icon: Package, label: isAr ? "استلام الشحنة" : "Pickup" },
    { Icon: Warehouse, label: isAr ? "تخزين وتجهيز" : "Storage & Prep" },
    { Icon: Truck, label: isAr ? "شحن وتوصيل" : "Ship & Deliver" },
    { Icon: Wallet, label: isAr ? "تحصيل المبالغ" : "Cash Collection" },
  ];

  const stats = [
    { Icon: Building2, value: "4", label: isAr ? "فروع" : "Branches" },
    { Icon: MapPin, value: "+15", label: isAr ? "مدينة" : "Cities" },
    { Icon: Clock, value: "24/7", label: isAr ? "دعم" : "Support" },
    { Icon: CheckCircle2, value: "98%", label: isAr ? "توصيل" : "Delivery" },
  ];

  return (
    <section id="coverage" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">{t.coverage.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.coverage.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.coverage.subtitle}</p>
        </div>

        {/* Zone cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {zones.map((z) => {
            const s = toneStyles[z.tone];
            return (
              <div
                key={z.title}
                className={`group rounded-2xl bg-card border border-border ring-1 ring-transparent ${s.ring} p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-start`}
                dir={isAr ? "rtl" : "ltr"}
              >
                <div className="flex items-center gap-3">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${s.iconBg}`}>
                    <span aria-hidden>{z.flag}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">{z.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed min-h-[3rem]">{z.cities}</p>
                <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${s.badge}`}>
                  {z.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Flow steps */}
        <div
          className="mt-12 rounded-3xl bg-accent/40 border border-border p-6 md:p-8"
          dir={isAr ? "rtl" : "ltr"}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-2">
            {steps.map(({ Icon, label }, i) => (
              <div key={label} className="flex items-center gap-3 md:gap-2">
                <div className="flex items-center gap-3 rounded-2xl bg-card border border-border px-4 py-3 shadow-soft transition-transform hover:-translate-y-0.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-foreground text-sm md:text-base whitespace-nowrap">{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowLeft className="h-5 w-5 text-primary shrink-0" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stat boxes */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl bg-card border border-border p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
