import Image from "next/image";
import Link from "next/link";

/* ── Tokens (modern patchwork) ─────────────────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const INK = "#2E2018";
const TERRA = "#A94B2F";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const CSS = `
.dt { background:${CREAM}; }
.dt *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.dt a { transition:background-color .16s ease, color .16s ease; }

.dt-inner { max-width:1300px; margin:0 auto; padding-inline:clamp(16px,3vw,44px); padding-bottom:clamp(36px,4vw,64px); }

.dt-headline { padding:clamp(40px,4.5vw,64px) 0 clamp(28px,3vw,40px); }
.dt-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:${TERRA}; }
.dt-h2 { margin:14px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:clamp(30px,4.2vw,56px); line-height:1.03; letter-spacing:-.035em; color:${INK}; max-width:22ch; text-wrap:balance; }
.dt-patch { display:inline-block; background:${TERRA}; color:${ON_DARK}; font-style:italic; padding:0 12px 5px; }

.dt-row { display:flex; flex-wrap:wrap; gap:2px; background:${INK}; border:2px solid ${INK}; }
.dt-text { order:1; flex:1 1 340px; min-width:0; box-sizing:border-box; background:${WARM}; padding:clamp(28px,3.2vw,44px) clamp(24px,3vw,38px); display:flex; flex-direction:column; justify-content:center; gap:22px; }
.dt-p { margin:0; font-family:${F_KARLA}; font-weight:400; font-size:16.5px; line-height:1.7; color:${INK}; }
.dt-link { align-self:flex-start; background:${INK}; color:${CREAM}; padding:17px 26px; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; text-decoration:none; }
.dt-link:hover { color:${ON_DARK}; }
.dt-photo { order:2; flex:1 1 460px; min-width:0; position:relative; min-height:min(400px,42vw); background:${WARM}; }

@media (max-width: 860px) {
  .dt-row { flex-direction:column; }
  .dt-text, .dt-photo { flex:0 0 auto; }
  .dt-text { order:2; }
  .dt-photo { order:1; min-height:260px; }
}

@media (prefers-reduced-motion: reduce) { .dt * { transition:none !important; } }
`;

export default function DirectTrade() {
  return (
    <section className="dt">
      <style>{CSS}</style>

      <div className="dt-inner">
        {/* 1) HEADLINE BLOCK */}
        <div className="dt-headline">
          <p className="dt-eyebrow">Direkte handel</p>
          <h2 className="dt-h2">
            Vi kjenner alle som dyrker kaffen — det er{" "}
            <span className="dt-patch">familien vår</span>
          </h2>
        </div>

        {/* 2) SPLIT ROW — text left, photo right */}
        <div className="dt-row">
          <div className="dt-text">
            <p className="dt-p">
              Kaffebransjen har ofte lange verdikjeder der sporbarheten tilbake
              til menneskene bak kaffen går tapt. Hos Guatilla kjenner vi dem
              som sår, høster og foredler kaffen — fordi de er vår egen familie.
              Slik bringer vi varmen og engasjementet fra Colombia direkte inn i
              norsk kaffekultur.
            </p>
            <Link href="/origen" className="dt-link">
              Les vår historie →
            </Link>
          </div>

          <div className="dt-photo">
            <Image
              src="/assets/trilladora-arbeid.jpg"
              alt="Familien vår foredler kaffen ved tørrmøllen i Agustín Codazzi"
              fill
              sizes="(max-width: 860px) 100vw, 55vw"
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
