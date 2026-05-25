import { MapPin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LangProvider";
import { KangarooLogo } from "./KangarooLogo";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.42a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.85z" />
  </svg>
);

export const Footer = () => {
  const { t } = useLang();
  const socials = [
    { Icon: Instagram, url: t.footer.instagramUrl, label: "Instagram" },
    { Icon: Facebook, url: t.footer.facebookUrl, label: "Facebook" },
    { Icon: TikTokIcon, url: t.footer.tiktokUrl, label: "TikTok" },
  ];
  return (
    <footer className="bg-foreground text-background/90">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="[&_*]:!text-white">
            <KangarooLogo variant="light" />
          </div>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">{t.footer.about}</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.branchesTitle}</h4>
          <ul className="space-y-4 text-sm text-background/75">
            {t.footer.branches.map((b) => (
              <li key={b.city}>
                <div className="flex items-center gap-2 font-bold text-background/90">
                  <MapPin className="h-4 w-4 text-primary-glow shrink-0" />
                  {b.city}
                </div>
                <p className="mt-1 ms-6 text-xs text-background/55 font-normal leading-relaxed">
                  {b.address}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.linksTitle}</h4>
          <ul className="space-y-2 text-sm text-background/75">
            <li><Link className="hover:text-white transition-base" to="/">{t.nav.home}</Link></li>
            <li><Link className="hover:text-white transition-base" to="/#services">{t.nav.services}</Link></li>
            <li><Link className="hover:text-white transition-base" to="/about">{t.nav.about}</Link></li>
            <li><Link className="hover:text-white transition-base" to="/#coverage">{t.nav.coverage}</Link></li>
            <li><Link className="hover:text-white transition-base" to="/#contact">{t.nav.contact}</Link></li>
            <li><Link className="hover:text-white transition-base" to="/policies">{t.policies.navLabel}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.contactTitle}</h4>
          <ul className="space-y-3 text-sm text-background/75">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-glow shrink-0" />
              <span>{t.footer.addressValue}</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary-glow shrink-0" />
              <a
                href={t.footer.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-base"
                dir="ltr"
              >
                {t.footer.whatsappDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-base"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-background/60 text-center">{t.footer.rights}</div>
      </div>
    </footer>
  );
};
