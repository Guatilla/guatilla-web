import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Vår Historie | Kaffe Guatilla",
  description:
    "Oppdag historien bak Kaffe Guatilla – fra de colombianske fjellene til kaffekulturen i Stavanger.",
};

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const INK = "#2E2018";
const DARK_BROWN = "#3B2A20";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";
const LEAD = "#EFE3D6";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const BRIDGE = [
  { n: "01", bg: TERRA, color: ON_DARK, label: "Mellom territorier" },
  { n: "02", bg: OLIVE, color: ON_DARK, label: "Mellom kulturer" },
  { n: "03", bg: MUSTARD, color: INK, label: "Mellom produsenten og din kopp" },
];

const IDENTITY = [
  { bg: TERRA, color: ON_DARK, label: "Navnet" },
  { bg: OLIVE, color: ON_DARK, label: "Symbolet" },
  { bg: MUSTARD, color: INK, label: "Kaffen" },
];

const CSS = `
.om { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.om a { color:${TERRA}; transition:color .16s ease, background-color .16s ease; }
.om a:hover { color:${INK}; }
.om *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }

/* content column — aligned with navbar / footer / sections */
.om-section { padding-top:clamp(44px,5vw,72px); }

.om-q2 { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:2px; }
.om-q3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:2px; }
@media (max-width:640px){ .om-q2, .om-q3 { grid-template-columns:1fr; } }

.om-eyebrow { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; }

/* ── HERO ─────────────────────────────────────────── */
/* full-bleed brown band; copy sits on the content column, photo bleeds to the right edge */
.om-hero { background:${DARK_BROWN}; border-bottom:2px solid ${MUSTARD}; overflow:hidden; }
.om-hero-inner { max-width:1440px; margin:0 auto; padding-left:20px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); align-items:stretch; }
@media (min-width:640px){ .om-hero-inner { padding-left:32px; } }
@media (min-width:1024px){ .om-hero-inner { padding-left:96px; } }
.om-hero-copy { padding:clamp(40px,5vw,84px) clamp(28px,4vw,56px) clamp(40px,5vw,84px) 0; display:flex; flex-direction:column; justify-content:center; gap:22px; }
.om-hero-copy .om-eyebrow { color:${MUSTARD}; }
.om-hero-h1 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(30px,4.6vw,62px); line-height:1; letter-spacing:-.035em; color:${CREAM}; text-wrap:balance; }
.om-hero-h1 em { font-style:italic; }
.om-hero-lead { margin:0; max-width:44ch; font-family:${F_KARLA}; font-size:16.5px; line-height:1.7; color:${LEAD}; }
.om-hero-tags { display:flex; flex-wrap:wrap; gap:2px; background:${MUSTARD}; border:2px solid ${MUSTARD}; width:fit-content; max-width:100%; }
.om-hero-tags span { background:${DARK_BROWN}; color:${MUSTARD}; padding:10px 14px; font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
.om-hero-photo { position:relative; min-height:clamp(320px,42vw,560px); background:${INK}; border-left:2px solid ${MUSTARD}; margin-right:calc(50% - 50vw); }
@media (max-width:820px){
  .om-hero-inner { grid-template-columns:1fr; padding-left:0; }
  .om-hero-copy { padding:clamp(32px,7vw,44px) 20px; }
  .om-hero-photo { border-left:0; border-top:2px solid ${MUSTARD}; margin-right:0; min-height:clamp(280px,60vw,400px); }
}

/* ── NAVNET ───────────────────────────────────────── */
.om-rule { display:flex; flex-wrap:wrap; align-items:flex-end; gap:14px 28px; }
.om-rule .om-eyebrow { color:${TERRA}; }
.om-rule i { flex:1; height:2px; background:${INK}; opacity:.15; }
.om-h2 { margin:18px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(34px,5.2vw,66px); line-height:.98; letter-spacing:-.04em; color:${INK}; max-width:20ch; text-wrap:balance; }
.om-h2 .mark { display:inline-block; background:${TEAL}; color:#FFF7EF; font-style:italic; padding:0 14px 6px; }
.om-prose { margin-top:26px; background:${INK}; border:2px solid ${INK}; }
.om-prose-cell { box-sizing:border-box; padding:clamp(24px,2.8vw,36px); }
.om-prose-cell .k { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; }
.om-prose-cell p { margin:14px 0 0; font-family:${F_KARLA}; font-size:16px; line-height:1.7; color:${INK}; }

/* ── QUOTE ────────────────────────────────────────── */
.om-quote { margin-top:clamp(44px,5vw,72px); background:${DARK_BROWN}; border-top:2px solid ${INK}; border-bottom:2px solid ${INK}; }
.om-quote-inner { padding:clamp(40px,4.8vw,72px) 0; display:flex; gap:clamp(16px,2.4vw,30px); align-items:stretch; }
.om-quote-inner i { flex:none; width:8px; background:${MUSTARD}; }
.om-quote-inner p { margin:0; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:clamp(24px,3.6vw,42px); line-height:1.25; letter-spacing:-.02em; color:${CREAM}; text-wrap:balance; }

/* ── SYMBOLET ─────────────────────────────────────── */
.om-sym-eyebrow { color:${TERRA}; }
.om-sym-h2 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(28px,3.6vw,46px); line-height:1.04; letter-spacing:-.03em; color:${INK}; max-width:20ch; text-wrap:balance; }
.om-sym-grid { margin-top:24px; display:grid; grid-template-columns:1fr; gap:2px; background:${INK}; border:2px solid ${INK}; align-items:stretch; }
@media (min-width:1100px){ .om-sym-grid { grid-template-columns:minmax(0,1fr) minmax(0,1fr); } }
/* square cell matches the source's ~1:1 ratio, so cover fills it with no crop and no side gaps */
.om-sym-photo { position:relative; aspect-ratio:956 / 960; overflow:hidden; background:${WARM}; }
.om-sym-copy { box-sizing:border-box; background:${CREAM}; padding:clamp(24px,2.8vw,36px); display:flex; flex-direction:column; justify-content:center; gap:20px; }
.om-sym-copy p { margin:0; font-family:${F_KARLA}; font-size:16px; line-height:1.7; color:${INK}; }
.om-sym-copy p.small { font-size:15px; line-height:1.65; color:${BODY}; }
.om-bridge { display:flex; flex-direction:column; gap:2px; background:${INK}; border:2px solid ${INK}; }
.om-bridge-row { padding:14px 16px; display:flex; align-items:baseline; gap:12px; }
.om-bridge-row b { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.12em; }
.om-bridge-row span { font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:18px; line-height:1.15; }

/* ── ANSVARET ─────────────────────────────────────── */
.om-resp { display:flex; flex-wrap:wrap; gap:2px; background:${INK}; border:2px solid ${INK}; }
.om-resp-lead { flex:1 1 100%; box-sizing:border-box; background:${TEAL}; padding:clamp(26px,3vw,42px) clamp(22px,3vw,38px); }
.om-resp-lead .om-eyebrow { color:#FFF7EF; }
.om-resp-lead p { margin:16px 0 0; max-width:62ch; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:clamp(19px,2.2vw,26px); line-height:1.35; letter-spacing:-.015em; color:#FFF7EF; text-wrap:pretty; }
.om-resp-grid { flex:1 1 100%; border-top:2px solid ${INK}; }
.om-resp-cell { box-sizing:border-box; padding:26px 24px; }
.om-resp-cell b { display:block; font-family:${F_BITTER}; font-weight:800; font-size:21px; line-height:1.15; color:${INK}; }
.om-resp-cell p { margin:9px 0 0; font-family:${F_KARLA}; font-size:15px; line-height:1.6; color:${BODY}; }

/* ── ÉN IDENTITET ─────────────────────────────────── */
.om-id { max-width:1000px; margin:0 auto; text-align:center; }
.om-id .om-eyebrow { color:${TERRA}; }
.om-id h2 { margin:14px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(28px,3.8vw,48px); line-height:1.05; letter-spacing:-.03em; color:${INK}; text-wrap:balance; }
.om-id p { margin:18px auto 0; max-width:62ch; font-family:${F_KARLA}; font-size:16.5px; line-height:1.7; color:${BODY}; }
.om-id-row { margin-top:26px; background:${INK}; border:2px solid ${INK}; text-align:left; }
.om-id-row div { box-sizing:border-box; padding:20px 18px; font-family:${F_BITTER}; font-weight:800; font-style:italic; font-size:20px; line-height:1.1; }

/* ── CTA ──────────────────────────────────────────── */
.om-cta { margin-top:clamp(44px,5vw,72px); background:${MUSTARD}; border-top:2px solid ${INK}; }
.om-cta-inner { padding:clamp(36px,4.2vw,60px) 0; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:22px 40px; }
.om-cta-text { flex:1 1 420px; min-width:0; }
.om-cta-text h2 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(26px,3.4vw,44px); line-height:1.05; letter-spacing:-.03em; color:${INK}; text-wrap:balance; }
.om-cta-text p { margin:14px 0 0; max-width:48ch; font-family:${F_KARLA}; font-size:16.5px; line-height:1.65; color:${INK}; }
.om-cta-btns { display:flex; flex-wrap:wrap; gap:2px; background:${INK}; border:2px solid ${INK}; }
.om-cta-btns a { padding:19px 30px; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; }
.om-cta-btns a.dark { background:${INK}; color:${CREAM}; }
.om-cta-btns a.dark:hover { color:${CREAM}; }
.om-cta-btns a.light { background:${CREAM}; color:${INK}; }
.om-cta-btns a.light:hover { color:${INK}; }
@media (max-width:460px){ .om-cta-btns { align-self:stretch; width:100%; } .om-cta-btns a { flex:1 1 100%; text-align:center; } }

@media (prefers-reduced-motion: reduce){ .om * { transition:none !important; } }
`;

export default function AboutPage() {
  return (
    <div className="om">
      <style>{CSS}</style>

      {/* ── 1) HERO ─────────────────────────────────────── */}
      <section className="om-hero">
        <div className="om-hero-inner">
          <div className="om-hero-copy">
            <p className="om-eyebrow">Vår historie</p>
            <h1 className="om-hero-h1">
              Fra Perijá til <em>Stavanger</em>.
            </h1>
            <p className="om-hero-lead">
              Vår historie begynner i den majestetiske Serranía del Perijá i
              Colombia, men den finner sitt sanne hjem i Stavanger og den
              europeiske kaffekulturen.
            </p>
            <div className="om-hero-tags">
              <span>Colombia</span>
              <span>Stavanger</span>
            </div>
          </div>
          <div className="om-hero-photo">
            <Image
              src="/assets/perija-montanas.jpg"
              alt="Serranía del Perijá"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ── 2) NAVNET ───────────────────────────────────── */}
      <section className="om-section">
        <div className="container-page">
          <div className="om-rule">
            <p className="om-eyebrow">Navnet</p>
            <i />
          </div>
          <h2 className="om-h2">
            Fra <span className="mark">avstand</span> til forbindelse
          </h2>
          <div className="om-prose om-q2">
            <div className="om-prose-cell" style={{ background: CREAM }}>
              <div className="k" style={{ color: MUTED }}>
                Før
              </div>
              <p>
                Guatilla var et begrep brukt av urfolkssamfunnene i Serranía del
                Perijá for å referere til de utenfor deres fellesskap – et ord
                som en gang markerte avstand og ulikhet.
              </p>
            </div>
            <div className="om-prose-cell" style={{ background: WARM }}>
              <div className="k" style={{ color: TERRA }}>
                Nå
              </div>
              <p>
                For oss betyr Guatilla ikke lenger splittelse, men forbindelse.
                Det er et møtepunkt mellom kulturer, en bro mellom opprinnelse og
                destinasjon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3) QUOTE ────────────────────────────────────── */}
      <section className="om-quote">
        <div className="container-page">
          <div className="om-quote-inner">
            <i />
            <p>«I dag tolker vi dette navnet på nytt.»</p>
          </div>
        </div>
      </section>

      {/* ── 4) SYMBOLET ─────────────────────────────────── */}
      <section className="om-section">
        <div className="container-page">
          <p className="om-eyebrow om-sym-eyebrow">Symbolet</p>
          <h2 className="om-sym-h2">Et utsiktspunkt som ble en bro</h2>
          <div className="om-sym-grid">
            <div className="om-sym-photo">
              <Image
                src="/assets/about-circle.jpg"
                alt="Guatilla sirkulær skulptur"
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="om-sym-copy">
              <p>
                Symbolet til Guatilla ble unnfanget ved et utsiktspunkt høyt oppe
                i Serranía del Perijá. Det som startet som en visuell opplevelse
                av landskapet og fargene, har blitt retolket som en bro.
              </p>
              <div className="om-bridge">
                {BRIDGE.map((b) => (
                  <div
                    key={b.n}
                    className="om-bridge-row"
                    style={{ background: b.bg }}
                  >
                    <b style={{ color: b.color }}>{b.n}</b>
                    <span style={{ color: b.color }}>{b.label}</span>
                  </div>
                ))}
              </div>
              <p className="small">
                Den sirkulære formen representerer en fullstendig syklus – fra
                den colombianske jorden til Europa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5) ANSVARET ─────────────────────────────────── */}
      <section className="om-section">
        <div className="container-page">
          <div className="om-resp">
            <div className="om-resp-lead">
              <p className="om-eyebrow">Ansvaret</p>
              <p>
                For oss er ikke kvalitet bare en teknisk poengsum; det er et
                løfte. Ved å samarbeide direkte med våre produsenter, sikrer vi
                rettferdige vilkår og bærekraftig utvikling for lokalsamfunnene i
                Colombia.
              </p>
            </div>
            <div className="om-resp-grid om-q2">
              <div className="om-resp-cell" style={{ background: CREAM }}>
                <b>Full åpenhet</b>
                <p>Ærlighet i hvert eneste ledd av prosessen.</p>
              </div>
              <div className="om-resp-cell" style={{ background: WARM }}>
                <b>Direkte relasjoner</b>
                <p>Langsiktig tillit bygget på felles vekst.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6) ÉN IDENTITET ─────────────────────────────── */}
      <section className="om-section">
        <div className="container-page">
          <div className="om-id">
            <p className="om-eyebrow">Én identitet</p>
            <h2>Ett system, en felles historie.</h2>
            <p>
              Navnet, symbolet og kaffen er deler av den samme identiteten. Ved å
              forene meningen bak navnet med kraften i symbolet, skaper vi en
              opplevelse som starter i Perijá og fullføres i din hverdag.
            </p>
            <div className="om-id-row om-q3">
              {IDENTITY.map((i) => (
                <div key={i.label} style={{ background: i.bg, color: i.color }}>
                  {i.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7) CTA ──────────────────────────────────────── */}
      <section className="om-cta">
        <div className="container-page">
          <div className="om-cta-inner">
            <div className="om-cta-text">
              <h2>Bli en del av vår historie.</h2>
              <p>
                Utforsk partiene fra Perijá, eller ta kontakt med oss direkte.
              </p>
            </div>
            <div className="om-cta-btns">
              <Link href="/shop" className="dark">
                Utforsk kaffen →
              </Link>
              <Link href="/contact" className="light">
                Kontakt oss →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
