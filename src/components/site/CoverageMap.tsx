import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Plane, Ship } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

const mapCenter: [number, number] = [31.5, 35.5];
const palestinePolygon: [number, number][] = [
  [32.55, 35.57],
  [32.35, 35.52],
  [31.95, 35.53],
  [31.5, 35.42],
  [31.22, 34.98],
  [31.22, 34.24],
  [31.58, 34.22],
  [32.12, 34.92],
  [32.55, 35.1],
];
const jordanPolygon: [number, number][] = [
  [32.67, 35.57],
  [32.82, 36.7],
  [32.55, 38.9],
  [31.6, 39.2],
  [29.2, 38.6],
  [29.2, 34.95],
  [30.6, 35.12],
  [31.47, 35.42],
  [31.95, 35.55],
  [32.4, 35.56],
];
const palestineCities = [
  { name: "رام الله", position: [31.9038, 35.2034] as [number, number] },
  { name: "نابلس", position: [32.2211, 35.2544] as [number, number] },
  { name: "الخليل", position: [31.5326, 35.0998] as [number, number] },
  { name: "غزة", position: [31.5017, 34.4668] as [number, number] },
];
const amman = { name: "عمّان", position: [31.9539, 35.9106] as [number, number] };
const turkey = { name: "تركيا 🇹🇷", position: [39.9334, 32.8597] as [number, number] };
const worldwide = { name: "Worldwide 🌍", position: [48.8566, 2.3522] as [number, number] };

const popupHtml = (label: string) => `
  <div dir="rtl" style="
    color: hsl(var(--primary-deep));
    font-weight: 700;
    font-family: inherit;
    text-align: right;
    min-width: 80px;
  ">${label}</div>
`;

const cityIcon = L.divIcon({
  className: "coverage-city-icon",
  html: `
    <div style="
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: hsl(var(--primary));
      border: 3px solid hsl(var(--background));
      box-shadow: 0 6px 18px hsl(var(--foreground) / 0.18);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const labelIcon = (label: string) =>
  L.divIcon({
    className: "coverage-label-icon",
    html: `
      <div dir="rtl" style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        background: hsl(var(--background));
        color: hsl(var(--primary-deep));
        border: 1px solid hsl(var(--border));
        box-shadow: 0 8px 22px hsl(var(--foreground) / 0.12);
        font-weight: 700;
        font-size: 13px;
        white-space: nowrap;
      ">${label}</div>
    `,
    iconSize: [96, 32],
    iconAnchor: [48, 16],
  });

export const CoverageMap = () => {
  const { t } = useLang();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || leafletMapRef.current) return;

    const map = L.map(mapElementRef.current, {
      center: mapCenter,
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    const polygonStyle: L.PathOptions = {
      color: "hsl(var(--primary-deep))",
      weight: 2,
      fillColor: "hsl(var(--primary))",
      fillOpacity: 0.28,
    };

    L.polygon(palestinePolygon, polygonStyle).addTo(map);
    L.polygon(jordanPolygon, polygonStyle).addTo(map);

    palestineCities.forEach((city) => {
      L.marker(city.position, { icon: cityIcon })
        .addTo(map)
        .bindPopup(popupHtml(city.name), { className: "coverage-popup" });
    });

    L.marker(amman.position, { icon: cityIcon })
      .addTo(map)
      .bindPopup(popupHtml(amman.name), { className: "coverage-popup" });

    L.marker(turkey.position, { icon: labelIcon(turkey.name) })
      .addTo(map)
      .bindPopup(popupHtml("تركيا"), { className: "coverage-popup" });

    L.marker(worldwide.position, { icon: labelIcon(worldwide.name) })
      .addTo(map)
      .bindPopup(popupHtml("Worldwide"), { className: "coverage-popup" });

    const routeStyle: L.PolylineOptions = {
      color: "hsl(var(--primary))",
      weight: 2,
      dashArray: "8 8",
      opacity: 0.9,
    };

    L.polyline([amman.position, turkey.position], routeStyle).addTo(map);
    L.polyline([amman.position, worldwide.position], routeStyle).addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  return (
    <section id="coverage" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase">{t.coverage.eyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">{t.coverage.title}</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{t.coverage.subtitle}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-border shadow-soft bg-card">
            <div ref={mapElementRef} className="h-[500px] w-full" />
          </div>

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
