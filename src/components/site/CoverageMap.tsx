import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Plane, Ship } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

// Fix default marker icons (use a green-tinted divIcon instead)
const greenIcon = L.divIcon({
  className: "",
  html: `<div style="
    background: hsl(122 39% 33%);
    width: 18px; height: 18px; border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const flagIcon = (emoji: string) =>
  L.divIcon({
    className: "",
    html: `<div style="
      background: white;
      padding: 4px 8px;
      border-radius: 999px;
      border: 2px solid hsl(122 39% 33%);
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,.2);
      white-space: nowrap;
    ">${emoji}</div>`,
    iconSize: [40, 28],
    iconAnchor: [20, 14],
  });

const palestineCities: { name: string; pos: [number, number] }[] = [
  { name: "رام الله", pos: [31.9038, 35.2034] },
  { name: "نابلس", pos: [32.2211, 35.2544] },
  { name: "الخليل", pos: [31.5326, 35.0998] },
  { name: "غزة", pos: [31.5017, 34.4668] },
];

const jordanCity: { name: string; pos: [number, number] } = {
  name: "عمّان",
  pos: [31.9539, 35.9106],
};

const turkey: [number, number] = [39.9334, 32.8597];
const worldwide: [number, number] = [48.8566, 2.3522];

// Approximate polygon outlines (simplified for visual fill)
const palestinePolygon: [number, number][] = [
  [33.1, 35.55], [32.55, 35.57], [32.4, 35.55], [31.9, 35.55],
  [31.48, 35.4], [31.35, 34.95], [31.22, 34.45], [31.59, 34.21],
  [32.55, 34.95], [33.1, 35.1],
];

const jordanPolygon: [number, number][] = [
  [32.55, 35.57], [32.7, 36.4], [32.5, 38.5], [31.5, 39.0],
  [29.2, 37.5], [29.18, 35.0], [30.5, 35.1], [31.48, 35.4],
  [31.9, 35.55], [32.4, 35.55],
];

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

        <div className="mt-12 grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-3 overflow-hidden rounded-2xl shadow-soft border border-border">
            <MapContainer
              center={[31.5, 35.5]}
              zoom={6}
              scrollWheelZoom={false}
              style={{ height: 500, width: "100%", borderRadius: 16 }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Palestine fill */}
              <CircleMarker center={[31.9, 35.2]} radius={0} />
              <Polyline
                positions={[...palestinePolygon, palestinePolygon[0]]}
                pathOptions={{ color: "hsl(122 60% 20%)", weight: 2, fillColor: "hsl(122 39% 33%)", fillOpacity: 0.35, fill: true } as L.PolylineOptions}
              />
              {/* Jordan fill */}
              <Polyline
                positions={[...jordanPolygon, jordanPolygon[0]]}
                pathOptions={{ color: "hsl(122 60% 20%)", weight: 2, fillColor: "hsl(122 39% 33%)", fillOpacity: 0.35, fill: true } as L.PolylineOptions}
              />

              {/* Palestine cities */}
              {palestineCities.map((c) => (
                <Marker key={c.name} position={c.pos} icon={greenIcon}>
                  <Popup>
                    <div style={{ textAlign: "center", fontWeight: 700, color: "hsl(122 60% 20%)" }}>{c.name}</div>
                  </Popup>
                </Marker>
              ))}

              {/* Jordan city */}
              <Marker position={jordanCity.pos} icon={greenIcon}>
                <Popup>
                  <div style={{ textAlign: "center", fontWeight: 700, color: "hsl(122 60% 20%)" }}>{jordanCity.name}</div>
                </Popup>
              </Marker>

              {/* Turkey */}
              <Marker position={turkey} icon={flagIcon("تركيا 🇹🇷")}>
                <Popup>
                  <div style={{ textAlign: "center", fontWeight: 700, color: "hsl(122 60% 20%)" }}>تركيا</div>
                </Popup>
              </Marker>

              {/* Worldwide */}
              <Marker position={worldwide} icon={flagIcon("Worldwide 🌍")}>
                <Popup>
                  <div style={{ textAlign: "center", fontWeight: 700, color: "hsl(122 60% 20%)" }}>Worldwide</div>
                </Popup>
              </Marker>

              {/* Dashed connectors */}
              <Polyline
                positions={[jordanCity.pos, turkey]}
                pathOptions={{ color: "hsl(122 39% 33%)", weight: 2, dashArray: "6 8" }}
              />
              <Polyline
                positions={[jordanCity.pos, worldwide]}
                pathOptions={{ color: "hsl(122 39% 33%)", weight: 2, dashArray: "6 8" }}
              />
            </MapContainer>
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
