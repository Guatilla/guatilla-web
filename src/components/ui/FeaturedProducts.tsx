"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

const products = [
  {
    id: "product_origin",
    slug: "origen",
    name: "Origen",
    origin: "Serranía del Perijá",
    notes: "Noter av kakao, panela og røde bær",
    image: "/assets/bag-origen.jpg",
    alt: "Origen - Serranía del Perijá",
    featured: true,
  },
  {
    id: "product_mestizaje",
    slug: "mestizaje",
    name: "Mestizaje",
    origin: "Serranía del Perijá",
    notes: "Noter av karamell, mandel og sitrus",
    image: "/assets/bag-mestizaje.jpg",
    alt: "Mestizaje - Serranía del Perijá",
  },
  {
    id: "product_encuentro",
    slug: "encuentro",
    name: "Encuentro",
    origin: "Serranía del Perijá",
    notes: "Noter av honning, nøtter og krydder",
    image: "/assets/bag-encuentro.jpg",
    alt: "Encuentro - Serranía del Perijá",
  },
  {
    id: "product_territorio",
    slug: "territorio",
    name: "Territorio",
    origin: "Serranía del Perijá",
    notes: "Noter av mørk sjokolade, kirsebær og florale toner",
    image: "/assets/bag-territorio.jpg",
    alt: "Territorio - Serranía del Perijá",
  },
];

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.75;
    const scrollTo =
      direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <section className="w-full overflow-hidden bg-theme-light-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="relative z-20 mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-brand-terracotta">
              Første kolleksjon
            </p>

            <Heading variant="display" className="text-brand-coffee">
              Vår <em className="font-light italic">kaffe</em>
            </Heading>

            <Text
              variant="body"
              className="mt-4 max-w-xl text-lg text-brand-coffee/70 md:text-xl"
            >
              Hver kaffe forteller en historie fra Serranía del Perijá.
            </Text>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-coffee/20 text-brand-coffee transition-colors duration-300 hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-coffee/20 text-brand-coffee transition-colors duration-300 hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-visible">
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-visible px-6 pb-20 pt-10 scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 md:px-12 md:scroll-px-12 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className={`group flex-none snap-center overflow-hidden rounded-2xl border border-brand-coffee/10 bg-brand-cream p-4 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-editorial md:p-6 lg:p-8 ${
                product.featured
                  ? "w-[85vw] md:w-[45vw] lg:w-[38vw]"
                  : "w-[75vw] md:w-[32vw] lg:w-[26vw]"
              }`}
            >
              <div
                className={`relative mb-6 w-full overflow-hidden rounded-2xl bg-brand-linen ${
                  product.featured ? "aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                {product.featured && (
                  <div className="absolute right-4 top-4 z-20">
                    <Badge variant="featured">Utvalgt</Badge>
                  </div>
                )}

                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60" />
              </div>

              <div>
                <Heading
                  variant="h3"
                  className="text-brand-coffee transition-colors group-hover:text-brand-terracotta"
                >
                  {product.name}
                </Heading>

                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-coffee/55">
                  {product.origin}
                </p>

                <Text
                  variant="small"
                  className="mt-3 leading-relaxed text-brand-coffee/70"
                >
                  {product.notes}
                </Text>
              </div>
            </Link>
          ))}

          <div className="w-4 shrink-0 md:w-8" />
        </div>
      </div>

      <div className="mt-4 flex justify-center px-4">
        <Button href="/shop" variant="secondary" size="sm" withArrow>
          Se alle produkter
        </Button>
      </div>
    </section>
  );
}