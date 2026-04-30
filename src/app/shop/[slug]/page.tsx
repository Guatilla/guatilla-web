import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) return { title: "Produkt ikke funnet" };

  return {
    title: `${product.name} | Kaffe Guatilla`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

