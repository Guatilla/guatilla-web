import React from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

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
      className={`group flex flex-col cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] rounded-2xl overflow-hidden border border-brand-coffee/15 bg-brand-cream shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] ${
        isCarousel ? "flex-none snap-center" : ""
      } ${isCarousel ? "p-4 md:p-6 lg:p-8" : "p-6 lg:p-8"}`}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-brand-cream/50 mb-6">
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <Badge variant={badge}>{badgeLabel || badge}</Badge>
          </div>
        )}
        <div className={`${isCarousel ? (badge ? "aspect-[4/5]" : "aspect-[3/4]") : "aspect-[4/5]"} relative`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover grayscale opacity-90 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <h3 className="text-2xl font-heading font-bold text-brand-coffee transition-colors group-hover:text-brand-terracotta">
          {name}
        </h3>
        <p className="text-sm font-medium text-brand-coffee/60 uppercase tracking-widest">
          {origin}
        </p>
        {description && (
          <p className="text-brand-coffee/70 font-light text-sm mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-end justify-between pt-4 mt-4 border-t border-brand-coffee/5">
          <div className="flex items-end">
            <span className="text-2xl font-bold text-brand-coffee">{price}</span>
            <span className="text-sm font-bold text-brand-coffee/60 ml-1 mb-1">{currency}</span>
          </div>
          <span className="text-sm font-bold text-brand-terracotta uppercase tracking-wider group-hover:underline">
            Se produkt →
          </span>
        </div>
      </div>
    </Link>
  );
}
