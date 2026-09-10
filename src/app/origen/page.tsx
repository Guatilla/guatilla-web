import Image from "next/image";

export const metadata = {
  title: "Opprinnelse | Kaffe Guatilla",
  description:
    "Røttene våre i Serranía del Perijá — familiegårder i Agustín Codazzi, Cesar, opp til 2 000 moh, egen trille (Ruiz Café Esperanza) og direkte handel til Stavanger.",
};

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const PHOTO_CELL = "#F7ECDE";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TERRA = "#A94B2F";
const DEEP_TERRA = "#8E3A2B";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const PEOPLE = [
  {
    name: "Stevenson",
    role: "Jord & foredling · Codazzi",
    line: "Steller jorda og prosesseringen i Agustín Codazzi.",
    accent: OLIVE,
  },
  {
    name: "Jennifer",
    role: "Teknisk eksport · Colombia",
    line: "Styrer den tekniske eksporten og dokumentasjonen fra Colombia.",
    accent: TEAL,
  },
  {
    name: "Wilkins",
    role: "Rist & levering · Stavanger",
    line: "Leder ristingen og leveringen i Stavanger.",
    accent: TERRA,
  },
];

const CSS = `
.org { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.org *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.org a { transition:background-color .16s ease, color .16s ease; }

.org-sect { max-width:1180px; margin:0 auto; padding:clamp(60px,6vw,104px) clamp(24px,4vw,56px); }
.org-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:${TERRA}; }
.org-disp { margin:0; font-family:${F_BITTER}; font-weight:800; color:${INK}; letter-spacing:-.035em; line-height:1; }

/* banner */
.org-banner { position:relative; width:100%; height:clamp(240px,40vw,460px); overflow:hidden;
  border-bottom:2px solid ${INK}; background:${TEAL}; }
.org-banner-tag { position:absolute; left:0; bottom:0; background:${CREAM}; color:${INK};
  padding:9px 15px; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }

/* hero */
.org-hero { padding-top:clamp(52px,5.5vw,88px); }
.org-h1 { margin:24px 0 0; font-size:clamp(38px,6.2vw,88px); max-width:15ch; text-wrap:balance; }
.org-lead { margin:30px 0 0; max-width:52ch; font-size:18px; line-height:1.62; color:${BODY}; }

.org-altbar { margin-top:48px; display:flex; align-items:flex-end; gap:2px; background:${CREAM}; }
.org-alt { flex:1; box-shadow:0 0 0 2px ${INK}; padding:12px 18px; display:flex; flex-direction:column; justify-content:flex-end; color:${ON_DARK}; }
.org-alt .k { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; }
.org-alt .v { font-family:${F_BITTER}; font-weight:800; font-size:20px; }

/* terroir */
.org-band { background:${WARM}; border-top:2px solid ${INK}; border-bottom:2px solid ${INK}; }
.org-tiles { margin-top:40px; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-tile { padding:30px 24px; display:flex; flex-direction:column; gap:14px; min-height:300px; }
.org-tile .t { font-family:${F_BITTER}; font-weight:800; font-size:27px; line-height:1; }
.org-tile .m { font-family:${F_MONO}; font-weight:700; font-size:12px; }
.org-tile .b { margin-top:auto; font-size:14.5px; line-height:1.55; }

/* vertikal kontroll */
.org-steps { margin-top:40px; display:flex; flex-direction:column; gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-step { display:flex; gap:2px; background:${INK}; }
.org-step-n { flex:0 0 120px; display:flex; align-items:center; justify-content:center; color:${ON_DARK};
  font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:40px; }
.org-step-c { flex:1; background:${CREAM}; padding:24px 26px; min-width:0; }
.org-step-c h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:20px; color:${INK}; }
.org-step-c p { margin:8px 0 0; font-size:14.5px; line-height:1.6; color:${BODY}; }
.org-chip { margin-top:14px; display:inline-block; background:${INK}; color:${CREAM}; padding:8px 14px;
  font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }

/* human */
.org-quote { margin:22px 0 0; max-width:30ch; font-family:${F_BITTER}; font-weight:800;
  font-size:clamp(24px,3.2vw,42px); line-height:1.15; letter-spacing:-.02em; color:${INK}; }
.org-quote em { font-style:italic; color:${TERRA}; }
.org-humans { margin-top:40px; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-human { background:${CREAM}; padding:26px 22px; display:flex; flex-direction:column; gap:10px; }
.org-human .bar { height:8px; width:56px; }
.org-human .n { margin-top:4px; font-family:${F_BITTER}; font-weight:800; font-size:22px; color:${INK}; }
.org-human .r { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:${MUTED}; }
.org-human .l { font-size:13.5px; line-height:1.55; color:${BODY}; }

/* route */
.org-route { margin-top:40px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.org-route .dot { width:14px; height:14px; flex:none; }
.org-route .city { font-family:${F_BITTER}; font-weight:800; font-size:20px; color:${INK}; }
.org-route .line { flex:1; min-width:40px; height:2px; background:${INK}; }
.org-blocks { margin-top:34px; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:2px; background:${INK}; border:2px solid ${INK}; }
.org-block { padding:28px 24px; }
.org-block h3 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:19px; color:${INK}; }
.org-block p { margin:10px 0 0; font-size:14.5px; line-height:1.6; color:${BODY}; }

/* institusjonelt */
.org-inst { border-top:2px solid ${INK}; }
.org-inst-row { max-width:1180px; margin:0 auto; }
.org-inst-inner { display:flex; flex-wrap:wrap; gap:2px; background:${INK}; border-left:2px solid ${INK}; border-right:2px solid ${INK}; }
.org-inst-inner span { flex:1 1 220px; background:${WARM}; color:${INK}; padding:22px 24px;
  font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.08em; text-transform:uppercase; }

@media (max-width: 760px) {
  .org-tiles { grid-template-columns:1fr; }
  .org-tile { min-height:0; }
  .org-humans { grid-template-columns:1fr; }
  .org-blocks { grid-template-columns:1fr; }
}
@media (max-width: 560px) {
  .org-altbar { display:grid; grid-template-columns:1fr 1fr; align-items:stretch; }
  .org-alt { height:auto; min-height:96px; }
  .org-step-n { flex-basis:84px; font-size:32px; }
}
@media (prefers-reduced-motion: reduce) { .org * { transition:none !important; } }
`;

export default function OrigenPage() {
  return (
    <div className="org">
      <style>{CSS}</style>

      {/* ── BANNER ───────────────────────────────────────── */}
      <div className="org-banner">
        <Image
          src="/assets/perija-hero.jpg"
          alt="Serranía del Perijá — tåkeskog og skogkledde skråninger på Cesars østside"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
        <span className="org-banner-tag">Serranía del Perijá · Cesars østskråning</span>
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="org-sect org-hero">
        <p className="org-eyebrow">Opprinnelse · Frente Colombia</p>
        <h1 className="org-disp org-h1">Røttene våre i Serranía del Perijá</h1>
        <p className="org-lead">
          Mellom tåkeskoger og fruktbar vulkansk jord dyrker vi spesialkaffe med
          generasjoners kunnskap — og forpliktelsen til å bringe den rett til
          Norge, uten mellomledd.
        </p>

        <div className="org-altbar">
          <div className="org-alt" style={{ background: OLIVE, height: 84 }}>
            <span className="k">Dalen</span>
            <span className="v">1 400 moh</span>
          </div>
          <div className="org-alt" style={{ background: TEAL, height: 122 }}>
            <span className="k">Skråning</span>
            <span className="v">1 700 moh</span>
          </div>
          <div className="org-alt" style={{ background: DEEP_TERRA, height: 168 }}>
            <span className="k">Topp</span>
            <span className="v">2 000 moh</span>
          </div>
          <div
            className="org-alt"
            style={{ flex: 1.1, background: PHOTO_CELL, color: MUTED, alignSelf: "stretch" }}
          >
            <span className="k">Familiegårder</span>
            <span className="v" style={{ color: INK, fontSize: 18 }}>
              100 % Arabica
            </span>
          </div>
        </div>
      </section>

      {/* ── TERROIR ──────────────────────────────────────── */}
      <section className="org-band">
        <div className="org-sect">
          <p className="org-eyebrow">Terroiret</p>
          <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
            Naturen som former koppen
          </h2>

          <div className="org-tiles">
            <div className="org-tile" style={{ background: MUSTARD, color: INK }}>
              <span className="t">Høyde</span>
              <span className="m">1 400–2 000 MOH</span>
              <span className="b">
                Langsom modning gir høyere tetthet i bønnen og kompleks eplesyre.
              </span>
            </div>
            <div className="org-tile" style={{ background: OLIVE, color: ON_DARK }}>
              <span className="t">Mikroklima</span>
              <span className="m">VIND · SKY · KJØLIGE NETTER</span>
              <span className="b">
                Naturlig konsentrasjon av sukker — søte toner av panela og karamell.
              </span>
            </div>
            <div className="org-tile" style={{ background: TEAL, color: ON_DARK }}>
              <span className="t">Jord &amp; skygge</span>
              <span className="m">INNFØDT SKOGDEKKE</span>
              <span className="b">
                Bevart biologisk fuktighet og jevn, homogen modning.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTIKAL KONTROLL ────────────────────────────── */}
      <section className="org-sect">
        <p className="org-eyebrow">Vertikal kontroll · Fra frø til trille</p>
        <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
          Vi eier hvert steg
        </h2>

        <div className="org-steps">
          <div className="org-step">
            <div className="org-step-n" style={{ background: DEEP_TERRA }}>01</div>
            <div className="org-step-c">
              <h3>Stell av kaffetreet</h3>
              <p>
                Tradisjonelle Arabica-varianter — Caturra og Castillo — og
                mikrolot i toppklasse: Rosa Bourbon og Rød Bourbon.
              </p>
            </div>
          </div>
          <div className="org-step">
            <div className="org-step-n" style={{ background: MUSTARD, color: INK }}>02</div>
            <div className="org-step-c">
              <h3>Selektiv håndplukking</h3>
              <p>
                Vi høster kun bær på sitt optimale modningspunkt — riktig brix —
                og unngår grønne og overmodne bønner.
              </p>
            </div>
          </div>
          <div className="org-step">
            <div className="org-step-n" style={{ background: TEAL }}>03</div>
            <div className="org-step-c">
              <h3>Beneficio og trille · Ruiz Café Esperanza</h3>
              <p>
                Tradisjonell våt foredling med kontrollert fermentering og jevn
                tørking. Mekanisk trilling klassifiserer etter tetthet og
                størrelse — skjerm over 14/16 — og gir grønne bønner med
                fuktighet på 11,5–12,5 %.
              </p>
              <span className="org-chip">INGESEC-trille · 80 kg/t</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEN MENNESKELIGE DIMENSJONEN ─────────────────── */}
      <section className="org-band">
        <div className="org-sect">
          <p className="org-eyebrow">Den menneskelige dimensjonen · Ekte direct trade</p>
          <p className="org-quote">
            Broen er <em>familiær</em> — ikke en slogan.
          </p>
          <p style={{ margin: "20px 0 0", maxWidth: "60ch", fontSize: 15.5, lineHeight: 1.7, color: BODY }}>
            I den globale kaffekjeden måles avstanden mellom den som sår og den
            som drikker ofte i titalls mellomledd. Hos Guatilla AS er det vår
            faktiske driftsstruktur.
          </p>

          <div className="org-humans">
            {PEOPLE.map((p) => (
              <div key={p.name} className="org-human">
                <span className="bar" style={{ background: p.accent }} />
                <span className="n">{p.name}</span>
                <span className="r">{p.role}</span>
                <span className="l">{p.line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRA CARTAGENA TIL STAVANGER ──────────────────── */}
      <section className="org-sect">
        <p className="org-eyebrow">Fra Cartagena til Stavanger</p>
        <h2 className="org-disp" style={{ marginTop: 14, fontSize: "clamp(30px,3.8vw,52px)" }}>
          Den rene ruten
        </h2>

        <div className="org-route">
          <span className="dot" style={{ background: TEAL }} />
          <span className="city">Cartagena</span>
          <span className="line" />
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16h16l-2.4 4.5H6.4z" />
            <path d="M12 3.5v9.5" />
            <path d="M12 4.5l5.5 8H12z" />
          </svg>
          <span className="line" />
          <span className="city">Stavanger</span>
          <span className="dot" style={{ background: OLIVE }} />
        </div>

        <div className="org-blocks">
          <div className="org-block" style={{ background: CREAM }}>
            <h3>Inspeksjon i opprinnelse</h3>
            <p>
              Plantehelse- og tollsertifisering i Colombia, avviklet gjennom FNC
              og plattformen Cafenlace.
            </p>
          </div>
          <div className="org-block" style={{ background: PHOTO_CELL }}>
            <h3>Ren rute</h3>
            <p>
              Sjøfrakt fra Sociedad Portuaria de Cartagena rett til Stavanger,
              med ferskheten beskyttet helt fram til mikrobrenneriet.
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTITUSJONELT ──────────────────────────────── */}
      <div className="org-inst">
        <div className="org-inst-row org-sect" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="org-inst-inner">
            <span>FNC-godkjent produksjon og eksport</span>
            <span>Despatsjer via Cafenlace</span>
            <span>Ruiz Café Esperanza — egen trilladora</span>
          </div>
        </div>
      </div>
      <div style={{ height: 56 }} />
    </div>
  );
}
