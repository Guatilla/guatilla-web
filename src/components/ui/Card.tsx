import React from "react";
import { LucideIcon } from "lucide-react";

type CardVariant = "light" | "dark" | "green" | "warm" | "cream";

interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  tag?: string;
  variant?: CardVariant;
  className?: string;
}

const variants = {
  light: {
    card: "bg-theme-light-surface text-theme-light-text border-brand-coffee/10",
    muted: "text-theme-light-muted",
    tag: "bg-brand-coffee/10 text-brand-coffee",
    icon: "text-brand-terracotta",
  },
  cream: {
    card: "bg-brand-cream text-brand-coffee border-brand-coffee/10",
    muted: "text-brand-coffee/70",
    tag: "bg-brand-linen text-brand-coffee",
    icon: "text-brand-terracotta",
  },
  dark: {
    card: "bg-theme-dark-bg text-theme-dark-text border-white/10",
    muted: "text-theme-dark-muted",
    tag: "bg-white/10 text-brand-cream",
    icon: "text-brand-gold",
  },
  green: {
    card: "bg-theme-green-bg text-theme-green-text border-white/10",
    muted: "text-theme-green-muted",
    tag: "bg-white/10 text-brand-cream",
    icon: "text-brand-gold",
  },
  warm: {
    card: "bg-theme-warm-bg text-theme-warm-text border-white/10",
    muted: "text-theme-warm-muted",
    tag: "bg-white/10 text-brand-cream",
    icon: "text-brand-gold",
  },
};

export default function Card({
  title,
  description,
  icon: Icon,
  tag,
  variant = "light",
  className = "",
}: CardProps) {
  const theme = variants[variant];

  return (
    <div
      className={`rounded-2xl border p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-editorial ${theme.card} ${className}`}
    >
      {Icon && (
        <div className={`mb-6 ${theme.icon}`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}

      {tag && (
        <span
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${theme.tag}`}
        >
          {tag}
        </span>
      )}

      <h3 className="mb-4 font-heading text-xl font-bold md:text-2xl">
        {title}
      </h3>

      {description && (
        <p className={`font-light leading-relaxed ${theme.muted}`}>
          {description}
        </p>
      )}
    </div>
  );
}
