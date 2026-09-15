import { notFound } from "next/navigation";
import { getRequestLocale } from "@/i18n/server";
import { localizeCatalogProduct } from "@/i18n/products";
import { getPublishedProductBySlug } from "@/lib/catalog";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string | string[] }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const [{ slug }, locale] = await Promise.all([params, getRequestLocale()]);
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    return {
      title: {
        no: "Produktet ble ikke funnet | Kaffe Guatilla",
        en: "Product not found | Kaffe Guatilla",
        es: "Producto no encontrado | Kaffe Guatilla",
      }[locale],
    };
  }

  const localized = localizeCatalogProduct(product, locale);
  return { title: `${localized.name} | Kaffe Guatilla`, description: localized.description };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const [{ slug }, query, locale] = await Promise.all([params, searchParams, getRequestLocale()]);
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();
  const requestedVariant = typeof query.variant === "string" ? query.variant : undefined;
  const initialVariantId = product.variants.some((variant) => variant.id === requestedVariant)
    ? requestedVariant
    : undefined;

  return <ProductDetailClient product={localizeCatalogProduct(product, locale)} initialVariantId={initialVariantId} />;
}
