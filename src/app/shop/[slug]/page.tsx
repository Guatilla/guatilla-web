import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { getRequestLocale } from "@/i18n/server";
import { localizeProduct } from "@/i18n/products";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const locale = await getRequestLocale();
  
  if (!product) {
    const title = {
      no: "Produktet ble ikke funnet | Kaffe Guatilla",
      en: "Product not found | Kaffe Guatilla",
      es: "Producto no encontrado | Kaffe Guatilla",
    } as const;
    return { title: title[locale] };
  }

  const localizedProduct = localizeProduct(product, locale);

  return {
    title: `${localizedProduct.name} | Kaffe Guatilla`,
    description: localizedProduct.description,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const locale = await getRequestLocale();

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={localizeProduct(product, locale)} />;
}

