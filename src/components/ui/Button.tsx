import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
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
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-brand-terracotta text-white hover:bg-[#B8573C] shadow-md hover:shadow-lg",
    secondary: "border-2 border-brand-coffee text-brand-coffee bg-transparent hover:bg-brand-coffee hover:text-white",
    ghost: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  const sizes = {
    sm: "text-xs tracking-widest py-3 px-6",
    md: "text-sm tracking-wider py-4 px-10",
    lg: "text-base tracking-wider py-5 px-12",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
