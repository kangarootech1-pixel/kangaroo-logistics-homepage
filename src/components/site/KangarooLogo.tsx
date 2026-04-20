import logoSrc from "@/assets/kangaroo-logo.png";

export const KangarooLogo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  return (
    <a href="#home" className="flex items-center group" aria-label="Kangaroo">
      <img
        src={logoSrc}
        alt="Kangaroo - خدمات لوجستية متكاملة"
        className={`h-12 md:h-14 w-auto transition-base group-hover:scale-105 ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
};
