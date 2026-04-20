import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const t = translations[lang];
  const dir = t.dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LangContext.Provider value={{ lang, dir, t, setLang, toggle: () => setLang(lang === "ar" ? "en" : "ar") }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
