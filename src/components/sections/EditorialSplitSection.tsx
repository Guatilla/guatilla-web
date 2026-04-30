import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EditorialSplitSectionProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string | React.ReactNode;
  cta?: { label: string; href: string };
  reverse?: boolean;
  bgClass?: string;
  checklist?: string[];
}

export default function EditorialSplitSection({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  cta,
  reverse = false,
  bgClass = "bg-transparent",
  checklist,
}: EditorialSplitSectionProps) {
  return (
    <section className={`w-full py-24 md:py-32 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
          }`}
        >
          {/* Image */}
          <div className="group rounded-2xl border border-brand-coffee/10 overflow-hidden bg-brand-cream shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] transition-all duration-500 ease-out hover:scale-[1.02] relative h-[400px] lg:h-[500px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            {eyebrow && (
              <span className="text-brand-terracotta font-bold uppercase tracking-[0.2em] text-xs">
                {eyebrow}
              </span>
            )}
            <h2 className="text-4xl font-heading font-bold text-brand-coffee leading-tight">
              {title}
            </h2>
            {typeof description === "string" ? (
              <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
                {description}
              </p>
            ) : (
              description
            )}
            {checklist && (
              <ul className="space-y-4 pt-4">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-brand-coffee/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <div className="pt-4">
                <Link
                  href={cta.href}
                  className="inline-flex items-center space-x-2 text-brand-terracotta font-bold uppercase tracking-widest text-sm group"
                >
                  <span>{cta.label}</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
