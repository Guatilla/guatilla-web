import SporbarhetClient from "./SporbarhetClient";
import { getRequestLocale } from "@/i18n/server";

const META = {
  no: {
    title: "Sporbarhet | Kaffe Guatilla",
    description: "Skriv inn partinummeret på kaffeposen og se hele reisen – fra gården i Serranía del Perijá til posen din.",
  },
  en: {
    title: "Traceability | Kaffe Guatilla",
    description: "Enter the lot number on your coffee bag and see the full journey from the farm in Serranía del Perijá to your bag.",
  },
  es: {
    title: "Trazabilidad | Kaffe Guatilla",
    description: "Introduce el número de lote de tu bolsa y descubre todo el recorrido desde la finca en la Serranía del Perijá.",
  },
};

interface SporbarhetPageProps {
  searchParams: Promise<{ lot?: string }>;
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  return META[locale];
}

export default async function SporbarhetPage({ searchParams }: SporbarhetPageProps) {
  const { lot } = await searchParams;
  return <SporbarhetClient initialLot={lot} />;
}
