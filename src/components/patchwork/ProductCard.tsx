import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  /** Header patch colour for non-featured cards (featured always uses gold). */
  headerClassName?: string;
  /** Overrides the shown price (e.g. subscription −15%). */
  displayPrice?: string;
}

/**
 * "Modell E" — mini-quilt product card: name, image, notes and price are
 * separate stitched patches sewn onto a coffee thread. Featured cards get a
 * gold header; the product bag runs flush to the image patch border.
 */
export default function ProductCard({
  product,
  headerClassName = "bg-brand-forest text-brand-cream",
  displayPrice,
}: ProductCardProps) {
  const header = product.featured
    ? "bg-brand-gold text-brand-coffee"
    : headerClassName;
  const tag = product.featured ? "mest solgt" : product.process;

  return (
    <div className="pop group grid gap-1 bg-brand-coffee p-1 transition-transform hover:-translate-y-0.5">
      {/* header */}
      <div className={`stitch flex items-baseline justify-between gap-3 px-4 py-3 ${header}`}>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-heading text-[22px] font-extrabold transition-opacity hover:opacity-80">
            {product.name}
          </h3>
        </Link>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] opacity-80">
          {tag}
        </span>
      </div>

      {/* image — flush to the patch border */}
      <Link
        href={`/shop/${product.slug}`}
        className="stitch block overflow-hidden bg-brand-linen"
      >
        <div className="relative aspect-[1000/735] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
          />
        </div>
      </Link>

      {/* meta */}
      <div className="stitch bg-brand-cream px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-coffee/50">
          {product.process} • {product.roast}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-brand-coffee/70">
          {product.notes}
        </p>
      </div>

      {/* price + cta */}
      <div className="stitch flex items-center justify-between bg-brand-cream px-4 py-3">
        <span className="text-[17px] font-bold">{displayPrice ?? product.price}</span>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
