import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "warm" | "cream";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  withArrow?: boolean;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  onClick?: () => void;
  type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
  ariaLabel,
  type = "button",
  withArrow = false,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold uppercase tracking-wider transition-all duration-500 ease-out disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-brand-terracotta text-white shadow-soft hover:bg-brand-terracotta-dark hover:shadow-editorial",
    secondary:
      "border border-brand-coffee/30 bg-transparent text-brand-coffee hover:bg-brand-coffee hover:text-brand-cream",
    ghost:
      "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
    dark:
      "bg-brand-coffee text-brand-cream hover:bg-brand-terracotta",
    warm:
      "bg-brand-terracotta-dark text-brand-cream hover:bg-brand-terracotta",
    cream:
      "bg-brand-cream text-brand-coffee border border-brand-coffee/10 hover:bg-brand-linen",
  };

  const sizes = {
    sm: "px-6 py-3 text-[11px]",
    md: "px-8 py-4 text-xs",
    lg: "px-10 py-5 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          size={16}
          className="ml-3 transition-transform group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
