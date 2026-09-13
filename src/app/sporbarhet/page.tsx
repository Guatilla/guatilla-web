import SporbarhetClient from "./SporbarhetClient";

export const metadata = {
  title: "Sporbarhet | Kaffe Guatilla",
  description:
    "Skriv inn lotnummeret på kaffeposen og se hele reisen — fra gård i Serranía del Perijá til posen din.",
};

interface SporbarhetPageProps {
  searchParams: Promise<{ lot?: string }>;
}

export default async function SporbarhetPage({ searchParams }: SporbarhetPageProps) {
  const { lot } = await searchParams;
  return <SporbarhetClient initialLot={lot} />;
}
