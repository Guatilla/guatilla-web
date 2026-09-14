import type { JournalEntry } from "@/data/journal";
import type { Locale } from "./config";

type JournalTranslation = Pick<
  JournalEntry,
  "title" | "excerpt" | "content" | "date" | "author" | "readingTime" | "location"
>;

const TRANSLATIONS: Record<"en" | "es", Record<string, JournalTranslation>> = {
  en: {
    "innhosting-i-takeheimen": {
      title: "Harvest in the mist",
      date: "April 26, 2024",
      excerpt:
        "When the mist rolls over Serranía del Perijá, it creates the unique conditions that give our coffee its characteristic sweetness.",
      content:
        "The altitude and distinctive microclimate of the Perijá mountains are essential to the quality of Kaffe Guatilla. Here, at elevations of up to 1,800 metres above sea level, the coffee cherries ripen more slowly and develop more complex flavours.\n\nToday we documented the harvest in the typical misty conditions that define the region at this time of year. The high humidity and volcanic soil create an ecosystem well suited to our coffee varieties.",
      location: "Serranía del Perijá, Colombia",
      author: "Field team",
      readingTime: "4 min read",
    },
    "torkeprosessen-ved-trilladoraen": {
      title: "Precision in the drying process",
      date: "April 12, 2024",
      excerpt:
        "Drying may be the most critical stage between harvest and export. We monitor every lot closely.",
      content:
        "At the family dry mill in Colombia, we take no shortcuts. After washing, the beans are laid on raised drying beds and turned regularly to ensure even drying.\n\nWe closely monitor moisture content and make sure the beans reach the ideal level of 10–12% before they are packed and sent to Norway. This preserves their flavour profile and quality throughout the journey.",
      location: "The dry mill, Colombia",
      author: "Quality control team",
      readingTime: "6 min read",
    },
    "nye-kaffeplanter-i-rod-jord": {
      title: "The future sprouts in red soil",
      date: "April 5, 2024",
      excerpt:
        "New coffee plants mark the beginning of a new phase of long-term growth for Kaffe Guatilla.",
      content:
        "This week we planted the first coffee plants in a new field that will be harvested in three years. The rich, red volcanic soil in our region is full of nutrients that are important for the young plants.\n\nThe coffee varieties were selected for both their cup quality and their resilience to climate change. We are investing in the future by caring for healthy, productive soil for generations to come.",
      location: "Serranía del Perijá, Colombia",
      author: "Agronomy team",
      readingTime: "4 min read",
    },
  },
  es: {
    "innhosting-i-takeheimen": {
      title: "Cosecha entre la niebla",
      date: "26 de abril de 2024",
      excerpt:
        "Cuando la niebla cubre la Serranía del Perijá, crea las condiciones únicas que dan a nuestro café su dulzor característico.",
      content:
        "La altitud y el microclima particular de la serranía del Perijá son decisivos para la calidad de Kaffe Guatilla. Aquí, hasta 1.800 metros sobre el nivel del mar, las cerezas de café maduran más lentamente y desarrollan sabores más complejos.\n\nHoy documentamos la cosecha bajo las condiciones de niebla típicas de la región en esta temporada. La alta humedad y el suelo volcánico crean un ecosistema ideal para nuestras variedades de café.",
      location: "Serranía del Perijá, Colombia",
      author: "Equipo de campo",
      readingTime: "4 min de lectura",
    },
    "torkeprosessen-ved-trilladoraen": {
      title: "Precisión en el proceso de secado",
      date: "12 de abril de 2024",
      excerpt:
        "El secado es quizás la etapa más crítica entre la cosecha y la exportación. Seguimos cada lote de cerca.",
      content:
        "En la trilladora de la familia en Colombia no tomamos atajos. Después del lavado, los granos se extienden sobre camas elevadas y se voltean con frecuencia para lograr un secado uniforme.\n\nControlamos cuidadosamente la humedad y nos aseguramos de que los granos alcancen el nivel ideal del 10–12 % antes de empacarlos y enviarlos a Noruega. Así preservamos el perfil de sabor y la calidad durante todo el viaje.",
      location: "La trilladora, Colombia",
      author: "Equipo de control de calidad",
      readingTime: "6 min de lectura",
    },
    "nye-kaffeplanter-i-rod-jord": {
      title: "El futuro brota en tierra roja",
      date: "5 de abril de 2024",
      excerpt:
        "Nuevas plantas de café marcan el inicio de una etapa de crecimiento a largo plazo para Kaffe Guatilla.",
      content:
        "Esta semana sembramos las primeras plantas de café en un nuevo lote que se cosechará dentro de tres años. La rica tierra volcánica roja de nuestra región está llena de nutrientes importantes para las plantas jóvenes.\n\nElegimos las variedades tanto por su calidad en taza como por su resistencia al cambio climático. Invertimos en el futuro cuidando un suelo sano y productivo para las generaciones que vienen.",
      location: "Serranía del Perijá, Colombia",
      author: "Equipo de agronomía",
      readingTime: "4 min de lectura",
    },
  },
};

export const JOURNAL_CATEGORY_LABELS: Record<
  Locale,
  Record<JournalEntry["category"], string>
> = {
  no: { Opprinnelse: "Opprinnelse", Mennesker: "Mennesker", Prosess: "Prosess", Kvalitet: "Kvalitet" },
  en: { Opprinnelse: "Origin", Mennesker: "People", Prosess: "Process", Kvalitet: "Quality" },
  es: { Opprinnelse: "Origen", Mennesker: "Personas", Prosess: "Proceso", Kvalitet: "Calidad" },
};

export function localizeJournalEntry(entry: JournalEntry, locale: Locale): JournalEntry {
  if (locale === "no") return entry;
  return { ...entry, ...TRANSLATIONS[locale][entry.slug] };
}

export function localizeJournalEntries(entries: JournalEntry[], locale: Locale): JournalEntry[] {
  return entries.map((entry) => localizeJournalEntry(entry, locale));
}
