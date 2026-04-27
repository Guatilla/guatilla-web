import React from "react";
import JournalPage from "@/components/journal/JournalPage";
import { journalEntries } from "@/data/journal";

export const metadata = {
  title: "Feltjournal | KAFFE GUATILLA",
  description: "Oppdag historiene bak kaffen vår. Dokumentasjon fra feltet, menneskene og prosessene i Colombia.",
};

export default function JournalIndexPage() {
  return <JournalPage entries={journalEntries} />;
}
