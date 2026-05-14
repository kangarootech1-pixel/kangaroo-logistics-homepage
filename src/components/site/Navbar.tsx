import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { KangarooLogo } from "./KangarooLogo";
import { LangToggle } from "./LangToggle";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#why", label: t.nav.about },
    { href: "#coverage", label: t.nav.coverage },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-base ${
        scrolled ? "bg-background/90 backdrop-blur shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <KangarooLogo variant={scrolled ? "dark" : "light"} />

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-base hover:text-primary ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LangToggle variant={scrolled ? "dark" : "light"} />
          <Button
            asChild
            className="rounded-full font-bold shadow-lg gradient-cta text-primary-foreground shadow-soft"
          >
            <a href="#contact">
              <Phone className="h-4 w-4" />
              {t.nav.cta}
            </a>
          </Button>
        </div>

        <button
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border shadow-card-elevated">
          <div className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg font-semibold hover:bg-secondary text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-3 pt-3 mt-2 border-t border-border">
              <LangToggle variant="default" />
              <Button
                asChild
                className="flex-1 rounded-full gradient-cta text-primary-foreground"
              >
                <a href="#contact" onClick={() => setOpen(false)}>{t.nav.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
