"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

interface AddToCartButtonProps {
  product: Product;
  label?: string;
  addedLabel?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Patchwork "Legg i kurv" button — a stitched patch that drops the product
 * into the real cart and briefly confirms.
 */
export default function AddToCartButton({
  product,
  label = "Legg i kurv",
  addedLabel = "Lagt i kurv ✓",
  className = "bg-brand-coffee text-brand-cream",
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({
      id: product.id,
      name: product.name,
      origin: product.origin,
      price: product.price,
      priceNum: product.priceNum,
      listPriceNum: product.priceNum,
      currency: product.currency,
      image: product.image,
      slug: product.slug,
      weight: product.weight.split(" / ")[0],
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`stitch inline-flex items-center justify-center px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {added ? addedLabel : label}
    </button>
  );
}
