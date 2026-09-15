import { getPublishedCatalog } from "@/lib/catalog";
import { getRequestLocale } from "@/i18n/server";
import type { StorefrontCatalogProduct } from "@/types/catalog";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  return {
    no: {
      title: "Butikk | Kaffe Guatilla",
      description: "Utforsk publisert colombiansk spesialkaffe fra Guatilla.",
    },
    en: {
      title: "Shop | Kaffe Guatilla",
      description: "Explore Guatilla's published Colombian specialty coffee.",
    },
    es: {
      title: "Tienda | Kaffe Guatilla",
      description: "Descubre el café colombiano de especialidad publicado por Guatilla.",
    },
  }[locale];
}

export default async function ShopPage() {
  let products: StorefrontCatalogProduct[];
  let catalogUnavailable = false;

  try {
    products = await getPublishedCatalog();
  } catch {
    products = [];
    catalogUnavailable = true;
  }

  return <ShopClient products={products} catalogUnavailable={catalogUnavailable} />;
}
