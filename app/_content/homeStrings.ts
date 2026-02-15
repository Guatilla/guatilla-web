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

  waitlistCta: string;
  valueBlocks: { title: string; body: string }[];
  statusTitle: string;
  statusItems: { label: string; status: string }[];
  finalCtaTitle: string;
  finalCtaBody: string;

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

    heroTitle: "Café de origen del Perijá, con trazabilidad real.",
    heroBodyBefore: "Guatilla está en montaje: ",
    heroBodyStrong1: "lotes piloto",
    heroBodyMiddle: " para documentar calidad y transparencia, ",
    heroBodyStrong2: "sin prometer fechas",
    heroBodyAfter: ". Te avisamos cuando el primer lote esté listo.",
    ctaFacebook: "Seguir el proyecto en Facebook",
    ctaNotify: "Quiero saber cuándo esté listo para comprar",

// NUEVO
    interestOptionSell: "Quiero vender café",
    interestOptionBuy: "Quiero comprar café",
    
    cardTitle: "De turismo a café de origen",
    cardBody:
      "El símbolo de Guatilla nace en un mirador de montaña en la Serranía del Perijá. Hoy se transforma en una puerta para acercar el paisaje, las comunidades y el café de altura directamente a Stavanger.",
    cardImageAlt: "Estructura que inspira el logo Guatilla",

    perijaTitle: "Origen (Perijá)",
    perijaBodyBefore: "La Serranía del Perijá nos da altura, agua y biodiversidad. ",
    perijaBodyStrong1: "Altitud",
    perijaBodyMiddle: ", clima, suelos y agua se combinan para crear un perfil limpio y dulce en taza.",
    perijaBodyStrong2: "",
    perijaBodyAfter: "",
    perijaImgAlt1: "Atardecer en la Serranía del Perijá",
    perijaImgAlt2: "Montañas y nubes sobre el Perijá",
    perijaImgAlt3: "Cumbres de la Serranía del Perijá",
    perijaImgAlt4: "Vegetación y cafetales en el Perijá",

    processTitle: "Calidad desde el origen",
    processBody1:
      "Trabajamos con lotes pequeños y procesos controlados para definir perfiles de tueste y consistencia en taza.",
    processBody2:
      "Sin prometer lotes específicos: estamos construyendo el estándar técnico antes de abrir la preventa.",
    processImgAlt1: "Fermentación del café",
    processImgAlt2: "Lavado del café en canales",
    processImgAlt3: "Sistema de lavado de café en la serranía",

    communitiesTitle: "Transparencia y trazabilidad",
    communitiesBody1:
      "Queremos que cada taza tenga datos reales: región, proceso, fechas y ruta logística.",
    communitiesBody2:
      "La transparencia es parte del producto: compartimos avances y lo que falta por resolver.",
    communitiesImgAlt1: "Pueblo indígena en la serranía del Perijá",
    communitiesImgAlt2: "Documentando la realidad de las comunidades",

    videoTitle: "Registro de campo (en construcción)",
    videoBody:
      "Publicaremos videos y fotos del proceso cuando tengamos más documentación de los lotes piloto.",

    waitlistCta: "Únete a la lista de espera",
    valueBlocks: [
      {
        title: "Origen",
        body: "Perijá es montaña, agua limpia y biodiversidad. De ahí viene el carácter del café.",
      },
      {
        title: "Calidad",
        body: "Lotes piloto, procesos controlados y perfiles de tueste en desarrollo.",
      },
      {
        title: "Transparencia",
        body: "Datos reales por lote y actualizaciones honestas del avance.",
      },
    ],
    statusTitle: "Estado del proyecto",
    statusItems: [
      { label: "Trilladora en montaje", status: "En curso" },
      { label: "Registro exportador", status: "En curso" },
      { label: "Primer lote piloto", status: "Siguiente" },
      { label: "Importacion a Noruega", status: "Siguiente" },
    ],
    finalCtaTitle: "Recibe el aviso del primer lote",
    finalCtaBody:
      "Si quieres comprar o distribuir, deja tus datos y te avisamos cuando haya disponibilidad.",

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

    heroTitle: "Fjellkaffe fra Perijá, med ekte sporbarhet.",
    heroBodyBefore: "Guatilla bygges nå: ",
    heroBodyStrong1: "pilotpartier",
    heroBodyMiddle: " for kvalitet og åpenhet, ",
    heroBodyStrong2: "uten å love datoer",
    heroBodyAfter: ". Vi varsler når første parti er klart.",
    ctaFacebook: "Følg prosjektet på Facebook",
    ctaNotify: "Jeg vil vite når det er klart for kjøp",

// NUEVO
    interestOptionSell: "Jeg vil selge kaffe",
    interestOptionBuy: "Jeg vil kjøpe kaffe",
    
    cardTitle: "Fra reise til opprinnelseskaffe",
    cardBody:
      "Symbolet til Guatilla ble født på et fjellutsiktspunkt i Serranía del Perijá. I dag blir det en inngang som bringer landskapet, lokalsamfunnene og høydens kaffe direkte til Stavanger.",
    cardImageAlt: "Struktur som inspirerer Guatilla-logoen",

    perijaTitle: "Opprinnelse (Perijá)",
    perijaBodyBefore: "Perijá gir høyde, rent vann og mangfold. ",
    perijaBodyStrong1: "Høyde",
    perijaBodyMiddle: ", klima, jord og vann gir en ren og søt kopp.",
    perijaBodyStrong2: "",
    perijaBodyAfter: "",
    perijaImgAlt1: "Solnedgang i Serranía del Perijá",
    perijaImgAlt2: "Fjell og skyer over Perijá",
    perijaImgAlt3: "Toppene i Serranía del Perijá",
    perijaImgAlt4: "Vegetasjon og kaffegårder i Perijá",

    processTitle: "Kvalitet fra opprinnelsen",
    processBody1:
      "Vi jobber med små partier og kontrollerte prosesser for å forme smaksprofilene.",
    processBody2:
      "Ingen løfter om spesifikke partier ennå. Vi bygger standarden først.",
    processImgAlt1: "Fermentering av kaffe",
    processImgAlt2: "Vasking av kaffe i kanaler",
    processImgAlt3: "Vaskesystem for kaffe i fjellene",

    communitiesTitle: "Apenhet og sporbarhet",
    communitiesBody1:
      "Hver kopp skal ha data: region, prosess, datoer og logistikkspor.",
    communitiesBody2:
      "Vi deler fremdrift og det som gjenstar.",
    communitiesImgAlt1: "Urfolk i fjellene i Perijá",
    communitiesImgAlt2: "Dokumentasjon av lokalsamfunnenes virkelighet",

    videoTitle: "Feltoppdateringer (under bygging)",
    videoBody:
      "Vi legger ut bilder og video når vi har mer dokumentasjon fra pilotpartiene.",

    waitlistCta: "Bli med pa ventelisten",
    valueBlocks: [
      {
        title: "Opprinnelse",
        body: "Perijá gir høyde, rent vann og biodiversitet.",
      },
      {
        title: "Kvalitet",
        body: "Pilotpartier og kontrollerte prosesser for jevn smak.",
      },
      {
        title: "Apenhet",
        body: "Ekte data per parti og ærlige oppdateringer.",
      },
    ],
    statusTitle: "Prosjektstatus",
    statusItems: [
      { label: "Trilleri under montering", status: "Under arbeid" },
      { label: "Eksportregistrering", status: "Under arbeid" },
      { label: "Første pilotparti", status: "Neste" },
      { label: "Import til Norge", status: "Neste" },
    ],
    finalCtaTitle: "Få beskjed om første parti",
    finalCtaBody:
      "Legg igjen kontaktinfo hvis du vil kjøpe eller distribuere.",

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

    heroTitle: "Perijá origin coffee with real traceability.",
    heroBodyBefore: "Guatilla is in build mode: ",
    heroBodyStrong1: "pilot lots",
    heroBodyMiddle: " for quality and transparency, ",
    heroBodyStrong2: "without promising dates",
    heroBodyAfter: ". We will notify you when the first lot is ready.",
    ctaFacebook: "Follow the project on Facebook",
    ctaNotify: "I want to know when it's ready to buy",

    interestOptionSell: "I want to sell coffee",
    interestOptionBuy: "I want to buy coffee",

    cardTitle: "From tourism to single-origin coffee",
    cardBody: "The Guatilla symbol was born at a mountain viewpoint in Serranía del Perijá. Today it becomes a gateway to bring the landscape, communities, and high-altitude coffee directly to Stavanger.",
    cardImageAlt: "Structure that inspires the Guatilla logo",

    perijaTitle: "Origin (Perijá)",
    perijaBodyBefore: "Perijá brings altitude, clean water, and biodiversity. ",
    perijaBodyStrong1: "Altitude",
    perijaBodyMiddle: ", climate, soils, and water shape a clean, sweet cup.",
    perijaBodyStrong2: "",
    perijaBodyAfter: "",
    perijaImgAlt1: "Sunset in Serranía del Perijá",
    perijaImgAlt2: "Mountains and clouds over Perijá",
    perijaImgAlt3: "Peaks of Serranía del Perijá",
    perijaImgAlt4: "Vegetation and coffee plantations in Perijá",

    processTitle: "Quality from the start",
    processBody1: "We work with small lots and controlled processes to define roasting profiles.",
    processBody2: "No promises about specific lots yet. We are building the standard first.",
    processImgAlt1: "Coffee fermentation",
    processImgAlt2: "Coffee washing in channels",
    processImgAlt3: "Coffee washing system in the mountains",

    communitiesTitle: "Transparency and traceability",
    communitiesBody1: "Every cup should carry real data: region, process, dates, and logistics.",
    communitiesBody2: "We share honest progress and what remains to solve.",
    communitiesImgAlt1: "Indigenous people in the mountains of Perijá",
    communitiesImgAlt2: "Documenting the reality of communities",

    videoTitle: "Field updates (in progress)",
    videoBody: "We will publish photos and videos as pilot documentation grows.",

    waitlistCta: "Join the waitlist",
    valueBlocks: [
      {
        title: "Origin",
        body: "Perijá brings altitude, clean water, and biodiversity.",
      },
      {
        title: "Quality",
        body: "Pilot lots and controlled processing to shape profiles.",
      },
      {
        title: "Transparency",
        body: "Real data per lot and honest updates.",
      },
    ],
    statusTitle: "Project status",
    statusItems: [
      { label: "Milling facility setup", status: "In progress" },
      { label: "Exporter registration", status: "In progress" },
      { label: "First pilot lot", status: "Next" },
      { label: "Import to Norway", status: "Next" },
    ],
    finalCtaTitle: "Get notified about the first lot",
    finalCtaBody:
      "Leave your contact if you want to buy or distribute.",

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


