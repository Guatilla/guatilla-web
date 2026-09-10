import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeader from "@/components/sections/SectionHeader";
import Card from "@/components/ui/Card";
import { Coffee, Warehouse, Ship } from "lucide-react";

export default function BusinessModel() {
  return (
    <SectionContainer
      id="model"
      theme="cream"
      className="border-y border-brand-coffee/5"
    >
      {/* HEADER */}
      <SectionHeader
        eyebrow="Modell"
        title="Vår direkte modell"
        description="Vi kobler colombianske kaffebønder direkte med europeiske kaffeelskere."
      />

      {/* GRID */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card
          icon={Coffee}
          title="Colombia"
          description="Direkte innkjøp fra bønder i Serranía del Perijá, noe som sikrer rettferdig betaling og full sporbarhet."
          variant="cream"
        />

        <Card
          icon={Warehouse}
          title="Prosessering"
          description="Egen infrastruktur lar oss kontrollere kvaliteten fra bønne til eksport."
          variant="cream"
        />

        <Card
          icon={Ship}
          title="Norge"
          description="Import og distribusjon av Guatilla AS direkte til din dør i Europa."
          variant="cream"
        />
      </div>
    </SectionContainer>
  );
}