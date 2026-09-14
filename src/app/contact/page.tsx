import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kontakt | Kaffe Guatilla",
  description:
    "Har du spørsmål eller ønsker å samarbeide? Ta kontakt med Kaffe Guatilla.",
};

/* ── Tokens (modern patchwork, toned down) ───────────────────────── */
const INK = "#2E2018";
const CREAM = "#FDFCF8";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const MUTED_LIGHT = "#A99C8E";
const HAIRLINE = "#E7DDD1";
const FIELD_BORDER = "#D8CCBE";
const DASH = "#C9BBAC";
const MEDAL_BG = "#F2E6D8";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const TEAL = "#1F4B4B";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const CHANNELS = [
  {
    dot: TERRA,
    title: "Kaffe og generelle spørsmål",
    body: "Spørsmål om partiene våre, smaksprofiler eller en bestilling.",
  },
  {
    dot: MUSTARD,
    title: "Samarbeid og engros",
    body: "Vil du bli forhandler eller kjøpe råkaffe til brenneriet ditt?",
  },
  {
    dot: TEAL,
    title: "Presse",
    body: "Presseforespørsler, bilder og intervjuer med familien på gården.",
  },
];

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

.ct-route { position:relative; margin:clamp(48px,6vw,68px) auto 0; max-width:380px; display:flex; align-items:center; justify-content:space-between; }
.ct-route::before { content:""; position:absolute; left:50px; right:50px; top:50%; border-top:1px dashed ${DASH}; }
.ct-node { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:12px; flex:none; }
.ct-medal { position:relative; width:84px; height:84px; border-radius:50%; overflow:hidden; background:${MEDAL_BG}; border:1px solid ${HAIRLINE}; }
.ct-medal svg { width:100%; height:100%; padding:22px; }
.ct-node span { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:${MUTED}; text-align:center; }
.ct-waypoint { position:relative; z-index:1; flex:none; background:${CREAM}; border:1px solid ${HAIRLINE}; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; }

.ct-hero-actions { margin-top:clamp(40px,5vw,56px); display:flex; flex-direction:column; align-items:center; gap:14px; }
.ct-btn-primary { display:inline-block; background:${INK}; color:${CREAM}; padding:15px 30px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; }
.ct-btn-primary:hover { background:${BODY}; }
.ct-link-quiet { color:${MUTED}; font-size:13.5px; text-decoration:underline; text-underline-offset:3px; text-decoration-color:${DASH}; }
.ct-link-quiet:hover { color:${TERRA}; text-decoration-color:${TERRA}; }
@media (max-width: 560px) { .ct-route { max-width:300px; } .ct-route::before { left:52px; right:52px; } .ct-medal { width:64px; height:64px; } }

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

export default function ContactPage() {
  return (
    <div className="ct">
      <style>{CSS}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="ct-hero">
        <div className="ct-container">
          <p className="ct-eyebrow">Kontakt</p>
          <h1 className="ct-h1">
            La oss ta en prat om <em>kaffe</em>.
          </h1>
          <p className="ct-lead">
            Har du spørsmål om partiene våre, ønsker et samarbeid på vegne av
            et brenneri eller representerer pressen? Vi svarer fra både
            Colombia og Norge.
          </p>

          <div className="ct-route">
            <div className="ct-node">
              <div className="ct-medal">
                <Image
                  src="/assets/perija-montanas.jpg"
                  alt="Serranía del Perijá"
                  fill
                  sizes="84px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span>
                Perijá,
                <br />
                Colombia
              </span>
            </div>

            <div className="ct-waypoint" title="Kaffen reiser fra Perijá til Stavanger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8h12l-1 10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
                <path d="M18 9h1.5a2 2 0 0 1 0 4H18" />
                <path d="M9 4c-.6.6-.6 1.4 0 2M13 4c-.6.6-.6 1.4 0 2" />
              </svg>
            </div>

            <div className="ct-node">
              <div className="ct-medal">
                <svg viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l8-5 8 5v12" />
                  <path d="M9 21v-6h6v6" />
                  <path d="M4 9l8 5 8-5" />
                </svg>
              </div>
              <span>
                Stavanger,
                <br />
                Norge
              </span>
            </div>
          </div>

          <div className="ct-hero-actions">
            <a href="mailto:kontakt@kaffeguatilla.com" className="ct-btn-primary">
              Send oss en e-post
            </a>
            <a href="#kanaler" className="ct-link-quiet">
              eller se kontaktkanaler ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────── */}
      <section className="ct-section">
        <div className="ct-container">
          <p className="ct-section-eyebrow">Skriv til oss</p>
          <h2 className="ct-h2">Fortell oss hva du lurer på.</h2>

          <div className="ct-form-block">
            <div className="ct-form-copy">
              <p>
                Fyll ut skjemaet, eller skriv direkte til oss på e-post. Alle
                henvendelser går til samme adresse — uansett om det gjelder
                kaffe, samarbeid eller presse.
              </p>
              <a href="mailto:kontakt@kaffeguatilla.com" className="ct-form-email">
                kontakt@kaffeguatilla.com
              </a>
              <p className="ct-form-note">Svarer vanligvis innen 24–48 timer</p>
            </div>
            <div>
              <div className="ct-row2">
                <div className="ct-field">
                  <label htmlFor="ct-name">Navn</label>
                  <input id="ct-name" type="text" placeholder="Ditt navn" />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email">E-post</label>
                  <input id="ct-email" type="email" placeholder="din@epost.no" />
                </div>
              </div>
              <div className="ct-field">
                <label htmlFor="ct-subject">Emne</label>
                <select id="ct-subject">
                  <option>Kaffe og generelle spørsmål</option>
                  <option>Samarbeid og engros</option>
                  <option>Presse</option>
                </select>
              </div>
              <div className="ct-field">
                <label htmlFor="ct-message">Melding</label>
                <textarea id="ct-message" placeholder="Skriv meldingen din her …" />
              </div>
              <button type="button" className="ct-submit">
                Send melding
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHANNELS ─────────────────────────────────── */}
      <section className="ct-section" id="kanaler" style={{ paddingTop: 0 }}>
        <div className="ct-container">
          <p className="ct-section-eyebrow">Kontaktkanaler</p>
          <h2 className="ct-h2">Ett sted å skrive, uansett hva det gjelder.</h2>

          <div className="ct-channels">
            {CHANNELS.map((c) => (
              <div className="ct-channel" key={c.title}>
                <div className="ct-dot" style={{ background: c.dot }} />
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────── */}
      <section className="ct-closing">
        <div className="ct-container ct-closing-inner">
          <div className="ct-closing-copy">
            <p>Feltjournalen</p>
            <h2>Følg reisen fra jord til kopp.</h2>
          </div>
          <Link href="/journal" className="ct-closing-link">
            Les feltjournalen →
          </Link>
        </div>
      </section>
    </div>
  );
}
