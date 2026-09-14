import ShopClient from "./ShopClient";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = {
    no: {
      title: "Butikk | Kaffe Guatilla",
      description:
        "Utforsk utvalget vårt av colombiansk spesialkaffe fra Serranía del Perijá.",
    },
    en: {
      title: "Shop | Kaffe Guatilla",
      description:
        "Explore our selection of Colombian specialty coffee from Serranía del Perijá.",
    },
    es: {
      title: "Tienda | Kaffe Guatilla",
      description:
        "Descubre nuestra selección de café colombiano de especialidad de la Serranía del Perijá.",
    },
  } as const;

  return copy[locale];
}

export default function ShopPage() {
  return <ShopClient />;
}
