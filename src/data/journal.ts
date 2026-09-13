export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Mennesker" | "Prosess" | "Opprinnelse" | "Kvalitet";
  date: string;
  image: string;
  author: string;
  readingTime: string;
  featured: boolean;
  location?: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: "innhosting-i-takeheimen",
    slug: "innhosting-i-takeheimen",
    title: "Innhøsting i tåkeheimen",
    category: "Opprinnelse",
    date: "26. april 2024",
    excerpt: "Når tåken ruller inn over Serranía del Perijá, skapes de unike forholdene som gir kaffen vår sin karakteristiske sødme.",
    content: "Høyden og det særegne mikroklimaet i Perijá-fjellene er avgjørende for kvaliteten på Kaffe Guatilla. Her, på opp mot 1 800 meter over havet, modnes kaffebærene langsommere og utvikler mer komplekse smaker. \n\nI dag dokumenterte vi innhøstingen under de typiske tåkeforholdene som preger regionen i denne sesongen. Den høye luftfuktigheten og den vulkanske jorda skaper et økosystem som passer godt for kaffesortene våre.",
    image: "/assets/journal/harvest-mist.jpg",
    location: "Serranía del Perijá, Colombia",
    author: "Feltteamet",
    readingTime: "4 min",
    featured: true,
  },
  {
    id: "torkeprosessen-ved-trilladoraen",
    slug: "torkeprosessen-ved-trilladoraen",
    title: "Presisjon i tørkeprosessen",
    category: "Prosess",
    date: "12. april 2024",
    excerpt: "Tørking er kanskje det mest kritiske leddet mellom innhøsting og eksport. Vi følger hvert parti nøye.",
    content: "Ved familiens tørrmølle i Colombia tar vi ingen snarveier. Etter vask legges bønnene på hevede tørkesenger, der de vendes regelmessig for å tørke jevnt. \n\nVi overvåker fuktighetsinnholdet nøye og sørger for at bønnene når det ideelle nivået på 10–12 % før de pakkes og sendes til Norge. Slik bevarer vi smaksprofilen og kvaliteten gjennom hele reisen.",
    image: "/assets/journal/drying-process.jpg",
    location: "Tørrmøllen, Colombia",
    author: "Kvalitetskontrollør",
    readingTime: "6 min",
    featured: false,
  },
  {
    id: "nye-kaffeplanter-i-rod-jord",
    slug: "nye-kaffeplanter-i-rod-jord",
    title: "Fremtiden spirer i rød jord",
    category: "Kvalitet",
    date: "5. april 2024",
    excerpt: "Nye kaffeplanter markerer starten på en ny fase med langsiktig vekst for Kaffe Guatilla.",
    content: "Denne uken plantet vi de første kaffeplantene i et nytt felt som skal høstes om tre år. Den rike, røde vulkanske jorda i regionen vår er full av næringsstoffer som er viktige for de unge plantene. \n\nKaffesortene er valgt ut fra både kvaliteten i koppen og motstandsdyktighet mot klimaendringer. Vi investerer i fremtiden ved å ta vare på et sunt og produktivt jordsmonn for generasjonene som kommer.",
    image: "/assets/journal/almacigo-surcos.jpg",
    location: "Serranía del Perijá, Colombia",
    author: "Agronomteamet",
    readingTime: "4 min",
    featured: false,
  },
];

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((e) => e.slug === slug);
}

export function getFeaturedJournalEntries(): JournalEntry[] {
  return journalEntries.filter((e) => e.featured);
}

export function getRelatedJournalEntries(slug: string, limit = 3): JournalEntry[] {
  return journalEntries
    .filter((e) => e.slug !== slug)
    .slice(0, limit);
}

export function getJournalEntriesByCategory(category: string): JournalEntry[] {
  if (category === "Alle") return journalEntries;
  return journalEntries.filter((e) => e.category === category);
}
