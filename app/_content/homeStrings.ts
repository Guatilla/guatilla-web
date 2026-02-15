export type HomeLocale = "es" | "no" | "en";

export type HomeStrings = {
  brandLine: string;
  logoSubLine: string;
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
  
// NUEVO: opciones del formulario de interés
  interestOptionSell: string;
  interestOptionBuy: string;
  
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
    brandLine: "Café especial de Colombia · Ruiz Gomez Import",
    logoSubLine: "Café de origen · Colombia",
    locationLine: "Stavanger · Noruega",
    taglineLine: "Importación directa desde la Serranía del Perijá",
    switchToLabel: "Norsk",
    switchToHref: "/",

    heroTitle: "Café de montaña, historias reales.",
    heroBodyBefore: "Estamos Conectando ",
    heroBodyStrong1: "fincas de la Serranía del Perijá",
    heroBodyMiddle: " con compradores conscientes en Noruega. El primer lote se importará con ",
    heroBodyStrong2: "Ruiz Gomez Import",
    heroBodyAfter:
      " como comprador ancla, y a partir de esa experiencia abriremos la puerta a más productores y amantes del café.",
    ctaFacebook: "Seguir el proyecto en Facebook",
    ctaNotify: "Quiero saber cuándo esté listo para comprar",

// NUEVO
    interestOptionSell: "Quiero vender café",
    interestOptionBuy: "Quiero comprar café",
    
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
    brandLine: "Spesialkaffe fra Colombia · Ruiz Gomez Import",
    logoSubLine: "Opprinnelseskaffe · Colombia",
    locationLine: "Stavanger · Norge",
    taglineLine: "Direkte import fra Serranía del Perijá",
    switchToLabel: "Español",
    switchToHref: "/es",

    heroTitle: "Fjellkaffe, ekte historier.",
    heroBodyBefore: "Vi kobler sammen ",
    heroBodyStrong1: "gårder i Serranía del Perijá",
    heroBodyMiddle:
      " med bevisste kjøpere i Norge. Det første partiet importeres med ",
    heroBodyStrong2: "Ruiz Gomez Import",
    heroBodyAfter:
      " som ankerkjøper, og med den erfaringen åpner vi døren for flere produsenter og kaffeentusiaster.",
    ctaFacebook: "Følg prosjektet på Facebook",
    ctaNotify: "Jeg vil vite når det er klart for kjøp",

// NUEVO
    interestOptionSell: "Jeg vil selge kaffe",
    interestOptionBuy: "Jeg vil kjøpe kaffe",
    
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
  en: {
    brandLine: "Specialty Coffee from Colombia · Ruiz Gomez Import",
    logoSubLine: "Origin coffee · Colombia",
    locationLine: "Stavanger · Norway",
    taglineLine: "Direct import from Serranía del Perijá",
    switchToLabel: "English",
    switchToHref: "/en",

    heroTitle: "Mountain coffee, real stories.",
    heroBodyBefore: "We are connecting ",
    heroBodyStrong1: "farms in Serranía del Perijá",
    heroBodyMiddle: " with conscious buyers in Norway. The first batch will be imported with ",
    heroBodyStrong2: "Ruiz Gomez Import",
    heroBodyAfter: " as anchor buyer, and from that experience we will open the door to more producers and coffee lovers.",
    ctaFacebook: "Follow the project on Facebook",
    ctaNotify: "I want to know when it's ready to buy",

    interestOptionSell: "I want to sell coffee",
    interestOptionBuy: "I want to buy coffee",

    cardTitle: "From tourism to single-origin coffee",
    cardBody: "The Guatilla symbol was born at a mountain viewpoint in Serranía del Perijá. Today it becomes a gateway to bring the landscape, communities, and high-altitude coffee directly to Stavanger.",
    cardImageAlt: "Structure that inspires the Guatilla logo",

    perijaTitle: "Serranía del Perijá · Coffee Origin",
    perijaBodyBefore: "The mountain range rises to ",
    perijaBodyStrong1: "3600 m above sea level",
    perijaBodyMiddle: " and marks the natural border between Colombia and Venezuela. Our network of pilot farms is in this mountain, in the area of ",
    perijaBodyStrong2: "Agustín Codazzi (Cesar)",
    perijaBodyAfter: ".",
    perijaImgAlt1: "Sunset in Serranía del Perijá",
    perijaImgAlt2: "Mountains and clouds over Perijá",
    perijaImgAlt3: "Peaks of Serranía del Perijá",
    perijaImgAlt4: "Vegetation and coffee plantations in Perijá",

    processTitle: "How coffee is processed",
    processBody1: "We start with small, washed lots with full traceability farm by farm. This pilot phase allows us to document each step: selective harvesting, pulping, fermentation, and sun-drying on high-altitude patios.",
    processBody2: "The goal is to build a solid technical foundation so that within the next 12 months we can carry out the first import to Norway and verify the entire logistics journey from the mountains to Stavanger.",
    processImgAlt1: "Coffee fermentation",
    processImgAlt2: "Coffee washing in channels",
    processImgAlt3: "Coffee washing system in the mountains",

    communitiesTitle: "Communities and Territory",
    communitiesBody1: "Guatilla arises in a territory inhabited by farming and indigenous communities. The idea is that each cup of coffee carries clear information about the origin and history of those who produce it.",
    communitiesBody2: "This project is not just a product: it is technical, social, and logistical documentation that will later enable other farms in Perijá to export following an already-tested model.",
    communitiesImgAlt1: "Indigenous people in the mountains of Perijá",
    communitiesImgAlt2: "Documenting the reality of communities",

    videoTitle: "A first look at the process on the farm",
    videoBody: "This is a simple recording of coffee pulping at one of the pilot farms. Later we will turn this type of material into educational content for buyers and producers.",

    footerCompany: "Ruiz Gomez Import · Stavanger",
    footerEmailLabel: "Email",
    footerPhoneLabel: "Phone",
    footerRightLine: "Pilot website for Kaffe Guatilla · 2025",
    footerFacebookLink: "See project updates on Facebook",
  },
};

export function getHomeStrings(locale: HomeLocale): HomeStrings {
  return homeStrings[locale] ?? homeStrings.es;
}


