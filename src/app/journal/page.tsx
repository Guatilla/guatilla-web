import React from "react";
import JournalPage from "@/components/journal/JournalPage";
import { journalEntries } from "@/data/journal";

export const metadata = {
  title: "Feltjournal | Kaffe Guatilla",
  description: "Oppdag historiene bak kaffen vår — om gårdene, menneskene og foredlingen i Colombia.",
};

export default function JournalIndexPage() {
  return <JournalPage entries={journalEntries} />;
}
