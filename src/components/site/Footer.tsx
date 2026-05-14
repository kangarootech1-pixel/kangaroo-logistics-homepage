import { MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { KangarooLogo } from "./KangarooLogo";

export const Footer = () => {
  const { t } = useLang();
  const socials = [
    { Icon: Facebook, url: t.footer.facebookUrl, label: "Facebook" },
    { Icon: Instagram, url: t.footer.instagramUrl, label: "Instagram" },
    { Icon: MessageCircle, url: t.footer.whatsappUrl, label: "WhatsApp" },
  ];
  return (
    <footer className="bg-foreground text-background/90">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="[&_*]:!text-white">
            <KangarooLogo variant="light" />
          </div>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">{t.footer.about}</p>
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

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.branchesTitle}</h4>
          <ul className="space-y-2 text-sm text-background/75">
            {t.footer.branches.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-glow" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.linksTitle}</h4>
          <ul className="space-y-2 text-sm text-background/75">
            <li><a className="hover:text-white transition-base" href="#home">{t.nav.home}</a></li>
            <li><a className="hover:text-white transition-base" href="#services">{t.nav.services}</a></li>
            <li><a className="hover:text-white transition-base" href="#why">{t.nav.about}</a></li>
            <li><a className="hover:text-white transition-base" href="#coverage">{t.nav.coverage}</a></li>
            <li><a className="hover:text-white transition-base" href="#contact">{t.nav.contact}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.contactTitle}</h4>
          <ul className="space-y-3 text-sm text-background/75">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-glow" /> {t.footer.addressValue}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-background/60 text-center">{t.footer.rights}</div>
      </div>
    </footer>
  );
};
