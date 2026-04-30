import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

interface ProductGridProps {
  filter?: string;
  limit?: number;
}

export default function ProductGrid({ filter, limit }: ProductGridProps) {
  let filtered = products;

  if (filter && filter !== "all") {
    filtered = products.filter((p) => p.category === filter);
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          slug={product.slug}
          origin={product.origin}
          price={product.priceNum}
          currency={product.currency}
          imageSrc={product.image}
          imageAlt={product.alt}
          badge={product.featured ? "featured" : undefined}
          badgeLabel={product.featured ? "Utvalgt" : undefined}
          description={product.notes}
          variant="grid"
        />
      ))}
    </div>
  );
}
