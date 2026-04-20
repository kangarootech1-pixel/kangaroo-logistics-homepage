import { MapPin, Plane, Ship } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

export const CoverageMap = () => {
  const { t } = useLang();
  return (
    <section id="coverage" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">{t.coverage.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.coverage.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.coverage.subtitle}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-8 items-center">
          {/* Map illustration */}
          <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-accent to-surface p-6 md:p-10 shadow-soft border border-border">
            <svg viewBox="0 0 600 400" className="w-full h-auto" role="img" aria-label="Coverage map">
              <defs>
                <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="hsl(var(--primary-deep))" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Turkey blob */}
              <path d="M60 70 Q140 40 240 60 Q310 75 290 120 Q230 140 150 130 Q80 125 60 100 Z" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5"/>
              <text x="160" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="14" fontWeight="700">Turkey</text>

              {/* Jordan */}
              <path d="M340 200 L470 180 L500 240 L470 320 L380 310 L350 260 Z" fill="url(#land)" stroke="hsl(var(--primary-deep))" strokeWidth="2"/>
              <text x="420" y="255" textAnchor="middle" className="fill-white" fontSize="15" fontWeight="800">Jordan</text>

              {/* Palestine */}
              <path d="M295 195 L340 200 L350 260 L340 305 L310 320 L295 280 L290 230 Z" fill="url(#land)" stroke="hsl(var(--primary-deep))" strokeWidth="2"/>
              <text x="318" y="260" textAnchor="middle" className="fill-white" fontSize="11" fontWeight="800">Palestine</text>

              {/* Dotted lines */}
              <path d="M160 110 Q240 160 315 200" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 6" fill="none" />
              <path d="M460 220 Q540 200 580 150" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 6" fill="none" />
              <path d="M310 320 Q260 360 180 360" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 6" fill="none" />

              {/* International labels */}
              <g>
                <circle cx="580" cy="150" r="6" fill="hsl(var(--primary))" />
                <text x="565" y="140" textAnchor="end" className="fill-foreground" fontSize="11" fontWeight="700">International</text>
              </g>
              <g>
                <circle cx="180" cy="360" r="6" fill="hsl(var(--primary))" />
                <text x="195" y="365" className="fill-foreground" fontSize="11" fontWeight="700">Worldwide</text>
              </g>

              {/* City pins */}
              {[
                { x: 305, y: 215, label: t.coverage.cities[0] },
                { x: 312, y: 235, label: t.coverage.cities[1] },
                { x: 320, y: 280, label: t.coverage.cities[2] },
                { x: 410, y: 245, label: t.coverage.cities[5] },
              ].map((c, i) => (
                <g key={i}>
                  <circle cx={c.x} cy={c.y} r="5" fill="white" stroke="hsl(var(--primary-deep))" strokeWidth="2" />
                  <circle cx={c.x} cy={c.y} r="10" fill="hsl(var(--primary))" fillOpacity="0.25" />
                </g>
              ))}
            </svg>
          </div>

          {/* Coverage stats */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { Icon: MapPin, label: t.coverage.regions.local, value: t.coverage.cities.slice(0, 5).join(" • ") },
              { Icon: Ship, label: t.coverage.regions.regional, value: t.coverage.cities.slice(5).join(" • ") + " • Turkey" },
              { Icon: Plane, label: t.coverage.regions.intl, value: "Worldwide air & sea freight" },
            ].map(({ Icon, label, value }, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft flex items-start gap-4">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary uppercase tracking-wider">{label}</div>
                  <div className="mt-1 text-foreground font-semibold leading-snug">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
