import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

type EditorialImageCardVariant = "default" | "large";
type EditorialImageCardTheme = "cream" | "light" | "dark" | "green" | "warm";

interface EditorialImageCardProps {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  variant?: EditorialImageCardVariant;
  theme?: EditorialImageCardTheme;
  grayscale?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const themes = {
  cream: {
    card: "bg-brand-cream text-brand-coffee border-brand-coffee/10",
    text: "text-brand-coffee/65",
    divider: "border-brand-coffee/10",
  },
  light: {
    card: "bg-theme-light-surface text-theme-light-text border-brand-coffee/10",
    text: "text-theme-light-muted",
    divider: "border-brand-coffee/10",
  },
  dark: {
    card: "bg-theme-dark-bg text-theme-dark-text border-white/10",
    text: "text-theme-dark-muted",
    divider: "border-white/10",
  },
  green: {
    card: "bg-theme-green-bg text-theme-green-text border-white/10",
    text: "text-theme-green-muted",
    divider: "border-white/10",
  },
  warm: {
    card: "bg-theme-warm-bg text-theme-warm-text border-white/10",
    text: "text-theme-warm-muted",
    divider: "border-white/10",
  },
};

export default function EditorialImageCard({
  image,
  alt,
  title,
  description,
  variant = "default",
  theme = "cream",
  grayscale = true,
  className,
  children,
}: EditorialImageCardProps) {
  const styles = themes[theme];

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-editorial",
        styles.card,
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-brand-linen",
          variant === "large" ? "aspect-[3/4]" : "aspect-[4/5]"
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className={cn(
            "object-cover contrast-[1.08] sepia-[0.08] transition-all duration-700 ease-out group-hover:scale-[1.03]",
            grayscale &&
              "grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
          )}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
      </div>

      {(title || description || children) && (
        <div className="flex flex-grow flex-col p-8">
          {title && (
            <Heading variant="h3" className="mb-4">
              {title}
            </Heading>
          )}

          {description && (
            <Text variant="small" className={cn("leading-relaxed", styles.text)}>
              {description}
            </Text>
          )}

          {children && (
            <div className={cn("mt-6 border-t pt-5", styles.divider)}>
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
