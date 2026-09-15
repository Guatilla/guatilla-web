import ProductCard from "@/components/ui/ProductCard";
import type { StorefrontCatalogProduct } from "@/types/catalog";

interface ProductGridProps {
  products: StorefrontCatalogProduct[];
  categorySlug?: string;
  limit?: number;
}

export default function ProductGrid({ products, categorySlug, limit }: ProductGridProps) {
  const filtered = products
    .filter((product) => !categorySlug || product.category?.slug === categorySlug)
    .filter((product) => product.image && product.variants.length > 0);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((product) => {
        const minPriceOre = Math.min(...product.variants.map((variant) => variant.priceOre));
        return (
          <ProductCard
            key={product.id}
            name={product.name}
            slug={product.slug}
            origin={product.category?.name ?? "Kaffe Guatilla"}
            price={minPriceOre / 100}
            currency="NOK"
            imageSrc={product.image as string}
            imageAlt={product.name}
            badge={product.isFeatured ? "featured" : undefined}
            badgeLabel={product.isFeatured ? "Utvalgt" : undefined}
            description={product.description}
            variant="grid"
          />
        );
      })}
    </div>
  );
}
