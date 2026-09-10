import React from "react";

type SectionTheme = "transparent" | "light" | "cream" | "dark" | "green" | "warm";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgClass?: string;
  theme?: SectionTheme;
  contained?: boolean;
}

const themes = {
  transparent: "bg-transparent",
  light: "bg-theme-light-bg text-theme-light-text",
  cream: "bg-brand-cream text-brand-coffee",
  dark: "bg-theme-dark-bg text-theme-dark-text",
  green: "bg-theme-green-bg text-theme-green-text",
  warm: "bg-theme-warm-bg text-theme-warm-text",
};

export default function SectionContainer({
  children,
  className = "",
  id,
  bgClass,
  theme = "transparent",
  contained = true,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`w-full py-24 md:py-32 ${bgClass ?? themes[theme]} ${className}`}
    >
      {contained ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
