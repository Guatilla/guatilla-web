import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "./Badge";
import Heading from "./Heading";
import Text from "./Text";

interface ProductCardProps {
  name: string;
  slug: string;
  origin: string;
  price: number;
  currency?: string;
  imageSrc: string;
  imageAlt: string;
  badge?: "featured" | "limited" | "new";
  badgeLabel?: string;
  description?: string;
  variant?: "grid" | "carousel";
}

export default function ProductCard({
  name,
  slug,
  origin,
  price,
  currency = "NOK",
  imageSrc,
  imageAlt,
  badge,
  badgeLabel,
  description,
  variant = "grid",
}: ProductCardProps) {
  const isCarousel = variant === "carousel";

  return (
    <Link
      href={`/shop/${slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-brand-coffee/10 bg-brand-cream shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-editorial ${
        isCarousel ? "flex-none snap-center p-4 md:p-6 lg:p-8" : "p-6 lg:p-8"
      }`}
    >
      <div className="relative mb-6 w-full overflow-hidden rounded-2xl bg-brand-linen">
        {badge && (
          <div className="absolute left-4 top-4 z-20">
            <Badge variant={badge}>{badgeLabel || badge}</Badge>
          </div>
        )}

        <div
          className={`relative ${
            isCarousel ? (badge ? "aspect-[4/5]" : "aspect-[3/4]") : "aspect-[4/5]"
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <Heading
          variant="h3"
          className="text-brand-coffee transition-colors group-hover:text-brand-terracotta"
        >
          {name}
        </Heading>

        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-coffee/55">
          {origin}
        </p>

        {description && (
          <Text
            variant="small"
            className="mt-3 line-clamp-2 leading-relaxed text-brand-coffee/70"
          >
            {description}
          </Text>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-brand-coffee/10 pt-5">
          <div className="flex items-end">
            <span className="text-2xl font-bold text-brand-coffee">
              {price}
            </span>
            <span className="mb-1 ml-1 text-sm font-bold text-brand-coffee/60">
              {currency}
            </span>
          </div>

          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-terracotta">
            Se produkt
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
