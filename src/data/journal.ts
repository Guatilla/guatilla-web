export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Mennesker" | "Prosess" | "Territorium" | "Kvalitet";
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
    category: "Territorium",
    date: "26. april 2024",
    excerpt: "Når tåken ruller inn over Serranía del Perijá, skapes de unike forholdene som gir kaffen vår sin karakteristiske sødme.",
    content: "Høyden og det spesielle mikroklimaet i Perijá-fjellene er avgjørende for kvaliteten på Kaffe Guatilla. Her, på over 1700 meter over havet, modnes kaffebærene langsommere, noe som gir mer komplekse smaker. \n\nI dag dokumenterte vi innhøstingen under de typiske tåkeforholdene som preger regionen i denne sesongen. Den høye luftfuktigheten kombinert med den vulkanske jorda skaper et økosystem som er perfekt for våre spesialvarianter.",
    image: "/assets/journal/harvest-mist.png",
    location: "Serranía del Perijá, Colombia",
    author: "Felt-teamet",
    readingTime: "4 min",
    featured: true,
  },
  {
    id: "portrett-av-don-fabio",
    slug: "portrett-av-don-fabio",
    title: "Møt Don Fabio: En vokter av tradisjon",
    category: "Mennesker",
    date: "20. april 2024",
    excerpt: "Gjennom tre generasjoner har Fabio-familien dyrket kaffe med en dedikasjon som er sjelden å se i dagens marked.",
    content: "Don Fabio har sett kaffemarkedet endre seg gjennom tiårene, men hans tilnærming til kvalitet har forblitt urokkelig. For ham er hver kaffebønne et resultat av tålmodighet og respekt for naturen. \n\nVi satt ned med Fabio for å diskutere hvordan våre direkte handelsrelasjoner har påvirket hans gård. Han forteller om stabiliteten det gir å vite at kvaliteten blir verdsatt rettferdig, noe som har gjort det mulig for ham å investere i bedre verktøy for familien sin.",
    image: "/assets/journal/don-fabio.png",
    location: "Serranía del Perijá, Colombia",
    author: "Relasjonsansvarlig",
    readingTime: "5 min",
    featured: true,
  },
  {
    id: "torkeprosessen-ved-trilladoraen",
    slug: "torkeprosessen-ved-trilladoraen",
    title: "Presisjon i tørkeprosessen",
    category: "Prosess",
    date: "12. april 2024",
    excerpt: "Tørking er kanskje det mest kritiske punktet mellom innhøsting og eksport. Vi følger hver batch nøye.",
    content: "Ved vår trilladora i Colombia tar vi ingen snarveier. Etter at bærene er vasket, legges de ut på 'camas' (tørkesenger) hvor de vendes regelmessig for å sikre jevn tørking. \n\nOvervåking av fuktighetsinnholdet er en vitenskap i seg selv. Vi sikrer at bønnene når det ideelle nivået på 10-12% før de pakkes for sin reise til Norge. Dette bevarer smaksprofilen og sikrer lang holdbarhet uten kvalitetstap.",
    image: "/assets/journal/drying-process.png",
    location: "Trilladora, Colombia",
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
    excerpt: "Nye plantinger markerer starten på en ny syklus av bærekraft og vekst for KAFFE GUATILLA.",
    content: "Denne uken plantet vi de første seedlingene av en ny batch som skal høstes om tre år. Den rike, røde vulkanske jorda i regionen vår er full av næringsstoffer som er essensielle for de unge plantene. \n\nValget av varianter er basert på både koppekvalitet og motstandsdyktighet mot klimaendringer. Vi investerer i fremtiden ved å sikre at jordsmonnet forblir sunt og produktivt for generasjonene som kommer.",
    image: "/assets/journal/young-plants.png",
    location: "Serranía del Perijá, Colombia",
    author: "Agronom-teamet",
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
