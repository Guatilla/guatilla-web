import Image from "next/image";
import Link from "next/link";

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const INK = "#2E2018";
const BODY = "#4A382C";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const BENEFITS: {
  n: string;
  bg: string;
  fg: string;
  title: string;
  body: string;
}[] = [
  {
    n: "✓",
    bg: TERRA,
    fg: ON_DARK,
    title: "Registrert hos Mattilsynet",
    body: "Importør og første mottaker av næringsmidler i Norge.",
  },
  {
    n: "✓",
    bg: MUSTARD,
    fg: INK,
    title: "100 % sporbarhet · GS1",
    body: "Dokumentert lot for lot, fra treet til posen.",
  },
  {
    n: "✓",
    bg: TEAL,
    fg: ON_DARK,
    title: "Ekte direct trade",
    body: "Direkte handel med vår egen familie i opprinnelse.",
  },
];

const CSS = `
.seasonal { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; }
.seasonal *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.seasonal .on-olive:focus-visible { outline-color:${ON_DARK}; }
.seasonal a { transition:background-color .16s ease, color .16s ease; }

.seasonal-banner-wrap { max-width:1300px; margin:0 auto; padding-inline:clamp(16px,3vw,44px); }
.seasonal-banner {
  border:2px solid ${INK};
  display:grid;
  grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);
  gap:2px;
  background:${INK};
}
.seasonal-photo { position:relative; min-height:min(440px,40vw); background:${WARM}; }
.seasonal-panel {
  background:${OLIVE};
  color:${ON_DARK};
  padding:clamp(34px,4vw,56px) clamp(28px,4vw,64px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:26px;
}
.seasonal-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:${ON_DARK}; }
.seasonal-h2 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(32px,4vw,52px); line-height:1; letter-spacing:-.03em; color:${ON_DARK}; text-wrap:balance; }
.seasonal-h2 em { font-style:italic; }
.seasonal-lead { margin:0; max-width:34ch; font-family:${F_KARLA}; font-size:16px; line-height:1.6; color:${ON_DARK}; }
.seasonal-cta-inline {
  align-self:flex-start;
  background:${CREAM};
  color:${INK};
  padding:18px 28px;
  font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.12em; text-transform:uppercase;
  text-decoration:none;
}
.seasonal-cta-inline:hover { background:${ON_DARK}; }

.seasonal-inner { max-width:1300px; margin:0 auto; padding:0 clamp(16px,3vw,44px) clamp(48px,6vw,72px); }

.seasonal-headline {
  margin:clamp(40px,5vw,64px) auto 0;
  max-width:26ch;
  text-align:center;
  font-family:${F_BITTER}; font-weight:800; font-size:clamp(26px,3.2vw,38px); line-height:1.1; letter-spacing:-.03em;
  color:${INK}; text-wrap:balance;
}

.seasonal-benefits {
  margin-top:clamp(24px,3vw,36px);
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap:2px;
}
.benefit {
  background:${CREAM};
  box-shadow:0 0 0 2px ${INK};
  padding:26px 24px;
  display:flex;
  gap:18px;
  align-items:flex-start;
}
.benefit-patch {
  width:52px; height:52px; flex:none;
  display:grid; place-items:center;
  font-family:${F_BITTER}; font-weight:800; font-size:26px; line-height:1;
}
.benefit-title { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:18px; color:${INK}; }
.benefit-body { margin:6px 0 0; font-family:${F_KARLA}; font-size:14.5px; line-height:1.5; color:${BODY}; }

.seasonal-cta-wrap { margin-top:clamp(26px,3vw,36px); text-align:center; }
.seasonal-cta {
  display:inline-block;
  background:${INK}; color:${CREAM};
  padding:19px 32px;
  font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.12em; text-transform:uppercase;
  text-decoration:none;
}
.seasonal-cta:hover { color:${ON_DARK}; }

@media (max-width: 860px) {
  .seasonal-banner { grid-template-columns:1fr; }
  .seasonal-photo { min-height:260px; }
}

/* 2-up band: let the lone third benefit fill the row instead of
   leaving an empty cell */
@media (min-width: 556px) and (max-width: 812px) {
  .benefit:nth-child(3):last-child { grid-column:1 / -1; }
}

@media (prefers-reduced-motion: reduce) {
  .seasonal * { transition:none !important; }
}
`;

export default function SeasonalClosing() {
  return (
    <section className="seasonal">
      <style>{CSS}</style>

      {/* ── SEASONAL SPLIT (photo left · olive panel right) ── */}
      <div className="seasonal-banner-wrap">
      <div className="seasonal-banner">
        <div className="seasonal-photo">
          <Image
            src="/assets/cafe-pergamino.jpg"
            alt="Sesongens kaffe fra Serranía del Perijá"
            fill
            sizes="(max-width: 860px) 100vw, 55vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>

        <div className="seasonal-panel">
          <p className="seasonal-eyebrow">Sesongens parti · Uke 36</p>
          <h2 className="seasonal-h2">
            Hei igjen, <em>Perijá</em> høsten
          </h2>
          <p className="seasonal-lead">
            Årets natural-partier er akkurat ristet — plomme, kakao og et hint av
            jasmin.
          </p>
          <Link href="/shop" className="seasonal-cta-inline on-olive">
            Smak sesongen →
          </Link>
        </div>
      </div>
      </div>

      {/* ── HEADLINE + BENEFITS + CTA ────────────────────── */}
      <div className="seasonal-inner">
        <h2 className="seasonal-headline">
          Fra jorda i Cesar til posen din — sporet hele veien
        </h2>

        <div className="seasonal-benefits">
          {BENEFITS.map((b) => (
            <div key={b.title} className="benefit">
              <span
                className="benefit-patch"
                style={{ background: b.bg, color: b.fg }}
                aria-hidden
              >
                {b.n}
              </span>
              <div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-body">{b.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="seasonal-cta-wrap">
          <Link href="/origen" className="seasonal-cta">
            Utforsk opprinnelsene →
          </Link>
        </div>
      </div>
    </section>
  );
}
