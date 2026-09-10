import React from "react";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

type Variant = "light" | "cream" | "dark";

interface ImageTextBlockProps {
  title: React.ReactNode;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  children?: React.ReactNode;
  variant?: Variant;
}

const variants = {
  light: {
    bg: "bg-brand-linen",
    text: "text-brand-coffee",
    body: "text-brand-coffee/70",
  },
  cream: {
    bg: "bg-brand-cream",
    text: "text-brand-coffee",
    body: "text-brand-coffee/70",
  },
  dark: {
    bg: "bg-brand-coffee",
    text: "text-brand-cream",
    body: "text-brand-cream/75",
  },
};

export default function ImageTextBlock({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  children,
  variant = "light",
}: ImageTextBlockProps) {
  const theme = variants[variant];

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${theme.bg}`}
    >
      {/* IMAGE */}
      <div
        className={`group relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-2xl border border-brand-coffee/10 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="
            object-cover
            grayscale opacity-90
            transition-all duration-700 ease-out
            group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04]
          "
        />

        {/* overlay cálido */}
        <div className="pointer-events-none absolute inset-0 bg-brand-gold/10 mix-blend-multiply" />

        {/* gradiente suave */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* textura ligera */}
        <div className="pointer-events-none absolute inset-0 bg-paper-texture opacity-20 mix-blend-multiply" />
      </div>

      {/* TEXT */}
      <div
        className={`space-y-8 px-2 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="space-y-5 max-w-xl">
          <Heading variant="h1" className={theme.text}>
            {title}
          </Heading>

          <div className={`${theme.body} text-lg leading-relaxed`}>
            {description}
          </div>
        </div>

        {children && <div className="pt-4">{children}</div>}
      </div>
    </div>
  );
}
