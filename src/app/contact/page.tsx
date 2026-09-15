import Link from "@/components/LocalizedLink";
import { getRequestLocale } from "@/i18n/server";

/* ── Tokens (modern patchwork, toned down) ───────────────────────── */
const INK = "#2E2018";
const CREAM = "#FDFCF8";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const MUTED_LIGHT = "#A99C8E";
const HAIRLINE = "#E7DDD1";
const FIELD_BORDER = "#D8CCBE";
const DASH = "#C9BBAC";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const TEAL = "#1F4B4B";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const CHANNEL_COLORS = [TERRA, MUSTARD, TEAL];

const CONTACT_COPY = {
  no: {
    metaTitle: "Kontakt | Kaffe Guatilla",
    metaDescription:
      "Har du spørsmål eller ønsker å samarbeide? Ta kontakt med Kaffe Guatilla.",
    eyebrow: "Kontakt",
    heroBefore: "La oss ta en prat om",
    heroEmphasis: "kaffe",
    lead: "Har du spørsmål om partiene våre, ønsker et samarbeid på vegne av et brenneri eller representerer pressen? Vi holder til i Stavanger, og svarer så raskt vi kan.",
    emailCta: "Send oss en e-post",
    channelsCta: "eller se kontaktkanaler",
    writeEyebrow: "Skriv til oss",
    writeTitle: "Fortell oss hva du lurer på.",
    formIntro: "Fyll ut skjemaet, eller skriv direkte til oss på e-post. Alle henvendelser går til samme adresse — uansett om det gjelder kaffe, samarbeid eller presse.",
    responseTime: "Svarer vanligvis innen 24–48 timer",
    name: "Navn",
    namePlaceholder: "Ditt navn",
    email: "E-post",
    emailPlaceholder: "din@epost.no",
    subject: "Emne",
    message: "Melding",
    messagePlaceholder: "Skriv meldingen din her …",
    send: "Send melding",
    channelsEyebrow: "Kontaktkanaler",
    channelsTitle: "Ett sted å skrive, uansett hva det gjelder.",
    channels: [
      {
        title: "Kaffe og generelle spørsmål",
        body: "Spørsmål om partiene våre, smaksprofiler eller en bestilling.",
      },
      {
        title: "Samarbeid og engros",
        body: "Vil du bli forhandler eller kjøpe råkaffe til brenneriet ditt?",
      },
      {
        title: "Presse",
        body: "Presseforespørsler, pressebilder og bakgrunn om kaffen og opprinnelsen.",
      },
    ],
    journal: "Feltjournalen",
    closingTitle: "Følg reisen fra jord til kopp.",
    journalCta: "Les feltjournalen",
  },
  en: {
    metaTitle: "Contact | Kaffe Guatilla",
    metaDescription:
      "Have a question or want to work with us? Contact Kaffe Guatilla.",
    eyebrow: "Contact",
    heroBefore: "Let's talk about",
    heroEmphasis: "coffee",
    lead: "Have questions about our lots, want to collaborate on behalf of a roastery or represent the press? We are based in Stavanger and reply as quickly as we can.",
    emailCta: "Send us an email",
    channelsCta: "or see contact channels",
    writeEyebrow: "Write to us",
    writeTitle: "Tell us what is on your mind.",
    formIntro: "Fill in the form or email us directly. Every enquiry goes to the same address, whether it concerns coffee, collaboration or press.",
    responseTime: "We usually reply within 24–48 hours",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    message: "Message",
    messagePlaceholder: "Write your message here …",
    send: "Send message",
    channelsEyebrow: "Contact channels",
    channelsTitle: "One place to write, whatever it is about.",
    channels: [
      {
        title: "Coffee and general questions",
        body: "Questions about our lots, flavour profiles or an order.",
      },
      {
        title: "Partnerships and wholesale",
        body: "Would you like to become a retailer or buy green coffee for your roastery?",
      },
      {
        title: "Press",
        body: "Press enquiries, images and background information about the coffee and its origin.",
      },
    ],
    journal: "Field journal",
    closingTitle: "Follow the journey from soil to cup.",
    journalCta: "Read the field journal",
  },
  es: {
    metaTitle: "Contacto | Kaffe Guatilla",
    metaDescription:
      "¿Tienes preguntas o quieres colaborar? Contacta con Kaffe Guatilla.",
    eyebrow: "Contacto",
    heroBefore: "Hablemos de",
    heroEmphasis: "café",
    lead: "¿Tienes preguntas sobre nuestros lotes, quieres colaborar en nombre de una tostadora o representas a un medio? Estamos en Stavanger y respondemos lo antes posible.",
    emailCta: "Envíanos un correo",
    channelsCta: "o consulta los canales de contacto",
    writeEyebrow: "Escríbenos",
    writeTitle: "Cuéntanos qué necesitas.",
    formIntro: "Completa el formulario o escríbenos directamente por correo. Todas las consultas llegan a la misma dirección, ya sean sobre café, colaboraciones o prensa.",
    responseTime: "Solemos responder en 24–48 horas",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo electrónico",
    emailPlaceholder: "tu@correo.es",
    subject: "Asunto",
    message: "Mensaje",
    messagePlaceholder: "Escribe tu mensaje aquí …",
    send: "Enviar mensaje",
    channelsEyebrow: "Canales de contacto",
    channelsTitle: "Un solo lugar para escribir, sea cual sea el motivo.",
    channels: [
      {
        title: "Café y preguntas generales",
        body: "Preguntas sobre nuestros lotes, perfiles de sabor o un pedido.",
      },
      {
        title: "Colaboraciones y venta mayorista",
        body: "¿Quieres ser distribuidor o comprar café verde para tu tostadora?",
      },
      {
        title: "Prensa",
        body: "Consultas de prensa, imágenes e información sobre el café y su origen.",
      },
    ],
    journal: "Diario de campo",
    closingTitle: "Sigue el viaje de la tierra a la taza.",
    journalCta: "Leer el diario de campo",
  },
} as const;

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = CONTACT_COPY[locale];

  return { title: copy.metaTitle, description: copy.metaDescription };
}

const CSS = `
.ct { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.ct *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.ct a { transition: color .16s ease, background-color .16s ease; }
.ct-container { max-width:1180px; margin:0 auto; padding-inline:clamp(16px,3vw,44px); }

/* ── HERO — quiet route diagram, generous air ──── */
.ct-hero { padding:clamp(64px,9vw,120px) 0 clamp(56px,7vw,92px); text-align:center; }
.ct-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:${TERRA}; }
.ct-h1 { margin:16px auto 0; max-width:19ch; font-family:${F_BITTER}; font-weight:700; font-size:clamp(32px,4.6vw,52px); line-height:1.08; letter-spacing:-.02em; color:${INK}; text-wrap:balance; }
.ct-h1 em { font-style:italic; color:${TERRA}; }
.ct-lead { margin:18px auto 0; max-width:48ch; font-size:16px; line-height:1.65; color:${MUTED}; }

.ct-hero-actions { margin-top:clamp(44px,6vw,64px); display:flex; flex-direction:column; align-items:center; gap:14px; }
.ct-btn-primary { display:inline-block; background:${INK}; color:${CREAM}; padding:15px 30px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; }
.ct-btn-primary:hover { background:${BODY}; }
.ct-link-quiet { color:${MUTED}; font-size:13.5px; text-decoration:underline; text-underline-offset:3px; text-decoration-color:${DASH}; }
.ct-link-quiet:hover { color:${TERRA}; text-decoration-color:${TERRA}; }

/* ── FORM ─────────────────────────────────────── */
.ct-section { padding:clamp(52px,6vw,80px) 0; }
.ct-section-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:${TERRA}; }
.ct-h2 { margin:10px 0 0; font-family:${F_BITTER}; font-weight:700; font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.02em; color:${INK}; text-wrap:balance; }
.ct-form-block { margin-top:clamp(32px,3.6vw,48px); display:grid; grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr); gap:clamp(32px,4vw,64px); }
.ct-form-copy { border-left:2px solid ${TERRA}; padding-left:22px; display:flex; flex-direction:column; gap:16px; align-self:start; }
.ct-form-copy p { margin:0; font-size:15px; line-height:1.65; color:${MUTED}; }
.ct-form-email { font-family:${F_BITTER}; font-weight:700; font-size:20px; color:${INK}; text-decoration:none; word-break:break-word; }
.ct-form-email:hover { color:${TERRA}; }
.ct-form-note { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:${MUTED_LIGHT}; }
.ct-field { display:flex; flex-direction:column; gap:7px; margin-bottom:18px; }
.ct-field label { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:${MUTED}; }
.ct-field input, .ct-field select, .ct-field textarea {
  border:1px solid ${FIELD_BORDER}; background:#FFFFFF; padding:12px 13px; font-family:${F_KARLA}; font-size:14.5px; color:${INK}; outline:none;
}
.ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { border-color:${TERRA}; }
.ct-field textarea { resize:vertical; min-height:104px; font-family:${F_KARLA}; }
.ct-row2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.ct-submit { margin-top:4px; background:${INK}; color:${CREAM}; border:none; padding:15px 28px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; }
.ct-submit:hover { background:${BODY}; }
@media (max-width: 780px) { .ct-form-block { grid-template-columns:1fr; } .ct-row2 { grid-template-columns:1fr; } }

/* ── CHANNELS — quiet 3-col list ──────────────── */
.ct-channels { margin-top:clamp(32px,3.6vw,48px); display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:clamp(28px,3.4vw,40px); }
.ct-channel { padding-top:18px; border-top:1px solid ${HAIRLINE}; }
.ct-dot { width:7px; height:7px; border-radius:50%; margin-bottom:12px; }
.ct-channel h3 { margin:0; font-family:${F_BITTER}; font-weight:700; font-size:17px; color:${INK}; }
.ct-channel p { margin:8px 0 0; font-size:14px; line-height:1.6; color:${MUTED}; }
@media (max-width: 720px) { .ct-channels { grid-template-columns:1fr; } }

/* ── CLOSING — quiet split, no color block ────── */
.ct-closing { border-top:1px solid ${HAIRLINE}; }
.ct-closing-inner { padding-block:clamp(44px,5.5vw,64px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:24px; }
.ct-closing-copy p:first-child { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:${TERRA}; }
.ct-closing-copy h2 { margin:8px 0 0; font-family:${F_BITTER}; font-weight:700; font-size:clamp(21px,2.6vw,28px); line-height:1.2; color:${INK}; max-width:22ch; }
.ct-closing-link { flex:none; display:inline-flex; align-items:center; gap:8px; color:${INK}; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; border-bottom:1px solid ${INK}; padding-bottom:3px; }
.ct-closing-link:hover { color:${TERRA}; border-color:${TERRA}; }

@media (prefers-reduced-motion: reduce) { .ct * { transition:none !important; } }
`;

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const copy = CONTACT_COPY[locale];

  return (
    <div className="ct">
      <style>{CSS}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="ct-hero">
        <div className="ct-container">
          <p className="ct-eyebrow">{copy.eyebrow}</p>
          <h1 className="ct-h1">
            {copy.heroBefore} <em>{copy.heroEmphasis}</em>.
          </h1>
          <p className="ct-lead">{copy.lead}</p>

          <div className="ct-hero-actions">
            <a href="mailto:kontakt@kaffeguatilla.com" className="ct-btn-primary">
              {copy.emailCta}
            </a>
            <a href="#kanaler" className="ct-link-quiet">
              {copy.channelsCta} ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────── */}
      <section className="ct-section">
        <div className="ct-container">
          <p className="ct-section-eyebrow">{copy.writeEyebrow}</p>
          <h2 className="ct-h2">{copy.writeTitle}</h2>

          <div className="ct-form-block">
            <div className="ct-form-copy">
              <p>{copy.formIntro}</p>
              <a href="mailto:kontakt@kaffeguatilla.com" className="ct-form-email">
                kontakt@kaffeguatilla.com
              </a>
              <p className="ct-form-note">{copy.responseTime}</p>
            </div>
            <div>
              <div className="ct-row2">
                <div className="ct-field">
                  <label htmlFor="ct-name">{copy.name}</label>
                  <input id="ct-name" type="text" placeholder={copy.namePlaceholder} />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email">{copy.email}</label>
                  <input id="ct-email" type="email" placeholder={copy.emailPlaceholder} />
                </div>
              </div>
              <div className="ct-field">
                <label htmlFor="ct-subject">{copy.subject}</label>
                <select id="ct-subject">
                  {copy.channels.map((channel) => (
                    <option key={channel.title}>{channel.title}</option>
                  ))}
                </select>
              </div>
              <div className="ct-field">
                <label htmlFor="ct-message">{copy.message}</label>
                <textarea id="ct-message" placeholder={copy.messagePlaceholder} />
              </div>
              <button type="button" className="ct-submit">
                {copy.send}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHANNELS ─────────────────────────────────── */}
      <section className="ct-section" id="kanaler" style={{ paddingTop: 0 }}>
        <div className="ct-container">
          <p className="ct-section-eyebrow">{copy.channelsEyebrow}</p>
          <h2 className="ct-h2">{copy.channelsTitle}</h2>

          <div className="ct-channels">
            {copy.channels.map((channel, index) => (
              <div className="ct-channel" key={channel.title}>
                <div className="ct-dot" style={{ background: CHANNEL_COLORS[index] }} />
                <h3>{channel.title}</h3>
                <p>{channel.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────── */}
      <section className="ct-closing">
        <div className="ct-container ct-closing-inner">
          <div className="ct-closing-copy">
            <p>{copy.journal}</p>
            <h2>{copy.closingTitle}</h2>
          </div>
          <Link href="/journal" className="ct-closing-link">
            {copy.journalCta} →
          </Link>
        </div>
      </section>
    </div>
  );
}
