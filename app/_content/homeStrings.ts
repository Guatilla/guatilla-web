export type HomeLocale = "es" | "no";

export type HomeStrings = {
  brandLine: string;
  locationLine: string;
  taglineLine: string;
  switchToLabel: string;
  switchToHref: string;

  heroTitle: string;
  heroBodyBefore: string;
  heroBodyStrong1: string;
  heroBodyMiddle: string;
  heroBodyStrong2: string;
  heroBodyAfter: string;
  ctaFacebook: string;
  ctaNotify: string;

  cardTitle: string;
  cardBody: string;
  cardImageAlt: string;

  perijaTitle: string;
  perijaBodyBefore: string;
  perijaBodyStrong1: string;
  perijaBodyMiddle: string;
  perijaBodyStrong2: string;
  perijaBodyAfter: string;
  perijaImgAlt1: string;
  perijaImgAlt2: string;
  perijaImgAlt3: string;
  perijaImgAlt4: string;

  processTitle: string;
  processBody1: string;
  processBody2: string;
  processImgAlt1: string;
  processImgAlt2: string;
  processImgAlt3: string;

  communitiesTitle: string;
  communitiesBody1: string;
  communitiesBody2: string;
  communitiesImgAlt1: string;
  communitiesImgAlt2: string;

  videoTitle: string;
  videoBody: string;

  footerCompany: string;
  footerEmailLabel: string;
  footerPhoneLabel: string;
  footerRightLine: string;
  footerFacebookLink: string;
};

export const homeStrings: Record<HomeLocale, HomeStrings> = {
  es: {
    brandLine: "Café especial del Perijá · Ruiz Gomez Import",
    locationLine: "Stavanger · Noruega",
    taglineLine: "Importación directa desde la Serranía del Perijá",
    switchToLabel: "Norsk",
    switchToHref: "/no",

    heroTitle: "Café de montaña, historias reales.",
    heroBodyBefore: "Estamos construyendo una plataforma para conectar ",
    heroBodyStrong1: "fincas de la Serranía del Perijá",
    heroBodyMiddle: " con compradores conscientes en Noruega. El primer lote se importará con ",
    heroBodyStrong2: "Ruiz Gomez Import",
    heroBodyAfter:
      " como comprador ancla, y a partir de esa experiencia abriremos la puerta a más productores y amantes del café.",
    ctaFacebook: "Seguir el proyecto en Facebook",
    ctaNotify: "Quiero saber cuándo esté listo para comprar",

    cardTitle: "De turismo a café de origen",
    cardBody:
      "El símbolo de Guatilla nace en un mirador de montaña en la Serranía del Perijá. Hoy se transforma en una puerta para acercar el paisaje, las comunidades y el café de altura directamente a Stavanger.",
    cardImageAlt: "Estructura que inspira el logo Guatilla",

    perijaTitle: "Serranía del Perijá · Origen del café",
    perijaBodyBefore: "La serranía se eleva hasta los ",
    perijaBodyStrong1: "3600 m s. n. m.",
    perijaBodyMiddle:
      " y marca la frontera natural entre Colombia y Venezuela. Nuestra red de fincas piloto está en esta montaña, en la zona de ",
    perijaBodyStrong2: "Agustín Codazzi (Cesar)",
    perijaBodyAfter: ".",
    perijaImgAlt1: "Atardecer en la Serranía del Perijá",
    perijaImgAlt2: "Montañas y nubes sobre el Perijá",
    perijaImgAlt3: "Cumbres de la Serranía del Perijá",
    perijaImgAlt4: "Vegetación y cafetales en el Perijá",

    processTitle: "Cómo se procesa el café",
    processBody1:
      "Empezamos con pequeños lotes lavados, trazables finca por finca. Esta fase piloto nos permite documentar cada paso: cosecha selectiva, despulpado, fermentación y secado en patios de altura.",
    processBody2:
      "El objetivo es construir una base técnica sólida para, en los próximos 12 meses, realizar la primera importación a Noruega y validar todo el recorrido logístico desde la serranía hasta Stavanger.",
    processImgAlt1: "Fermentación del café",
    processImgAlt2: "Lavado del café en canales",
    processImgAlt3: "Sistema de lavado de café en la serranía",

    communitiesTitle: "Comunidades y territorio",
    communitiesBody1:
      "Guatilla nace en un territorio habitado por comunidades campesinas y pueblos indígenas. La idea es que cada taza de café lleve consigo información clara sobre el origen y la historia de quienes lo producen.",
    communitiesBody2:
      "Este proyecto no es solo un producto: es una documentación técnica, social y logística que permita, más adelante, que otras fincas del Perijá puedan exportar siguiendo un modelo ya probado.",
    communitiesImgAlt1: "Pueblo indígena en la serranía del Perijá",
    communitiesImgAlt2: "Documentando la realidad de las comunidades",

    videoTitle: "Un primer vistazo al proceso en finca",
    videoBody:
      "Este es un registro simple del despulpado del café en una de las fincas piloto. Más adelante convertiremos este tipo de material en contenido educativo para compradores y productores.",

    footerCompany: "Ruiz Gomez Import · Stavanger",
    footerEmailLabel: "Correo",
    footerPhoneLabel: "Teléfono",
    footerRightLine: "Página piloto de Kaffe Guatilla · 2025",
    footerFacebookLink: "Ver avances del proyecto en Facebook",
  },
  no: {
    brandLine: "Spesialkaffe fra Perijá · Ruiz Gomez Import",
    locationLine: "Stavanger · Norge",
    taglineLine: "Direkte import fra Serranía del Perijá",
    switchToLabel: "Español",
    switchToHref: "/",

    heroTitle: "Fjellkaffe, ekte historier.",
    heroBodyBefore: "Vi bygger en plattform for å koble ",
    heroBodyStrong1: "gårder i Serranía del Perijá",
    heroBodyMiddle:
      " med bevisste kjøpere i Norge. Det første partiet importeres med ",
    heroBodyStrong2: "Ruiz Gomez Import",
    heroBodyAfter:
      " som ankerkjøper, og med den erfaringen åpner vi døren for flere produsenter og kaffeentusiaster.",
    ctaFacebook: "Følg prosjektet på Facebook",
    ctaNotify: "Jeg vil vite når det er klart for kjøp",

    cardTitle: "Fra reise til opprinnelseskaffe",
    cardBody:
      "Symbolet til Guatilla ble født på et fjellutsiktspunkt i Serranía del Perijá. I dag blir det en inngang som bringer landskapet, lokalsamfunnene og høydens kaffe direkte til Stavanger.",
    cardImageAlt: "Struktur som inspirerer Guatilla-logoen",

    perijaTitle: "Serranía del Perijá · Kaffens opprinnelse",
    perijaBodyBefore: "Fjellkjeden stiger opp til ",
    perijaBodyStrong1: "3600 moh.",
    perijaBodyMiddle:
      " og danner den naturlige grensen mellom Colombia og Venezuela. Nettverket vårt av pilotgårder ligger i dette fjellet, i området ",
    perijaBodyStrong2: "Agustín Codazzi (Cesar)",
    perijaBodyAfter: ".",
    perijaImgAlt1: "Solnedgang i Serranía del Perijá",
    perijaImgAlt2: "Fjell og skyer over Perijá",
    perijaImgAlt3: "Toppene i Serranía del Perijá",
    perijaImgAlt4: "Vegetasjon og kaffegårder i Perijá",

    processTitle: "Slik foredles kaffen",
    processBody1:
      "Vi starter med små, vaskede partier med sporbarhet gård for gård. Denne pilotfasen lar oss dokumentere hvert trinn: selektiv plukking, avskalling, fermentering og tørking på høylandsplasser.",
    processBody2:
      "Målet er å bygge et solid teknisk grunnlag slik at vi i løpet av de neste 12 månedene kan gjennomføre den første importen til Norge og verifisere hele logistikkreisen fra fjellene til Stavanger.",
    processImgAlt1: "Fermentering av kaffe",
    processImgAlt2: "Vasking av kaffe i kanaler",
    processImgAlt3: "Vaskesystem for kaffe i fjellene",

    communitiesTitle: "Lokalsamfunn og territorium",
    communitiesBody1:
      "Guatilla oppstår i et territorium der bonde- og urfolkssamfunn lever. Tanken er at hver kopp kaffe skal bære tydelig informasjon om opprinnelsen og historien til dem som produserer den.",
    communitiesBody2:
      "Dette prosjektet er ikke bare et produkt: det er teknisk, sosial og logistisk dokumentasjon som senere kan gjøre det mulig for andre gårder i Perijá å eksportere etter en modell som allerede er testet.",
    communitiesImgAlt1: "Urfolk i fjellene i Perijá",
    communitiesImgAlt2: "Dokumentasjon av lokalsamfunnenes virkelighet",

    videoTitle: "Et første glimt av prosessen på gården",
    videoBody:
      "Dette er en enkel registrering av avskallingen av kaffen på en av pilotgårdene. Senere vil vi gjøre slikt materiale om til lærerikt innhold for kjøpere og produsenter.",

    footerCompany: "Ruiz Gomez Import · Stavanger",
    footerEmailLabel: "E-post",
    footerPhoneLabel: "Telefon",
    footerRightLine: "Pilotnettside for Kaffe Guatilla · 2025",
    footerFacebookLink: "Se oppdateringer om prosjektet på Facebook",
  },
};

export function getHomeStrings(locale: HomeLocale): HomeStrings {
  return homeStrings[locale] ?? homeStrings.es;
}


