import JournalPage from "@/components/journal/JournalPage";
import { journalEntries } from "@/data/journal";
import { localizeJournalEntries } from "@/i18n/journal";
import { getRequestLocale } from "@/i18n/server";

const META = {
  no: {
    title: "Feltjournal | Kaffe Guatilla",
    description: "Oppdag historiene bak kaffen vår – om gårdene, menneskene og foredlingen i Colombia.",
  },
  en: {
    title: "Field Journal | Kaffe Guatilla",
    description: "Discover the stories behind our coffee – the farms, people and craft in Colombia.",
  },
  es: {
    title: "Diario de campo | Kaffe Guatilla",
    description: "Descubre las historias detrás de nuestro café: las fincas, las personas y el trabajo en Colombia.",
  },
};

export async function generateMetadata() {
  const locale = await getRequestLocale();
  return META[locale];
}

export default async function JournalIndexPage() {
  const locale = await getRequestLocale();
  return <JournalPage entries={localizeJournalEntries(journalEntries, locale)} />;
}
