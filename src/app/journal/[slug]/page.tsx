import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  journalEntries,
  getJournalEntryBySlug,
  getRelatedJournalEntries,
} from "@/data/journal";
import { CATEGORY_META } from "@/components/journal/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ── Tokens (modern patchwork) ─────────────────────────── */
const CREAM = "#FDF1E5";
const INK = "#2E2018";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) return { title: "Innlegg ikke funnet | Kaffe Guatilla" };
  return { title: `${entry.title} | Feltjournal`, description: entry.excerpt };
}

function ArrowLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const Strip = () => (
  <div className="art-strip" aria-hidden="true">
    <span style={{ background: TERRA }} />
    <span style={{ background: MUSTARD }} />
    <span style={{ background: OLIVE }} />
    <span style={{ background: TEAL }} />
  </div>
);

const CSS = `
.art { background:${CREAM}; color:#4A382C; font-family:${F_KARLA}; min-height:100vh; overflow-x:clip; }
.art a { color:${TERRA}; text-decoration:none; transition:color .15s ease; }
.art a:hover { color:${INK}; }
.art *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }

.art-strip { display:grid; grid-template-columns:repeat(4,1fr); height:7px; }
.art-strip span { display:block; }
.art-cover { object-fit:cover; }

.art-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${TERRA}; }
.art-kicker { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.13em; text-transform:uppercase; }
.art-metaline { display:flex; align-items:center; gap:10px; }
.art-dot { width:11px; height:11px; flex:none; display:block; }
.art-back { display:inline-flex; align-items:center; gap:9px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.15em; text-transform:uppercase; }
.art-readmore { display:inline-flex; align-items:center; gap:7px; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:${TERRA}; }

.art-backrow { padding-top:30px; }

/* rail (thread) */
.art-threadrow { display:flex; padding-top:34px; }
.art-thread { width:44px; flex:none; position:relative; }
.art-thread::before { content:""; position:absolute; top:8px; bottom:8px; left:5px; width:0; border-left:2px dashed rgba(46,32,24,.3); }
.art-thread-dot { position:absolute; top:0; left:0; width:11px; height:11px; }
.art-main { flex:1; min-width:0; }

.art-head h1 { margin:16px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:60px; line-height:1; letter-spacing:-.025em; color:${INK}; text-wrap:balance; }
.art-loc { margin:18px 0 0; display:inline-flex; align-items:center; gap:8px; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:rgba(107,90,78,.8); }

.art-hero { position:relative; margin-top:34px; height:460px; border:2px solid ${INK}; overflow:hidden; background:${INK}; }

.art-body { margin-top:34px; max-width:700px; }
.art-quote { margin:0; padding-left:24px; font-family:${F_BITTER}; font-weight:400; font-style:italic; font-size:27px; line-height:1.45; color:rgba(46,32,24,.82); text-wrap:pretty; }
.art-prose { margin-top:30px; }
.art-prose p { margin:0; font-family:${F_KARLA}; font-weight:400; font-size:17px; line-height:1.9; color:rgba(74,56,44,.8); }
.art-prose p + p { margin-top:20px; }

.art-author { margin-top:40px; display:flex; align-items:center; justify-content:space-between; gap:20px; border-top:2px dashed rgba(46,32,24,.22); padding-top:20px; }
.art-author-id { display:flex; align-items:center; gap:13px; }
.art-avatar { width:42px; height:42px; flex:none; border:2px solid ${INK}; display:flex; align-items:center; justify-content:center; color:rgba(46,32,24,.4); }
.art-author-id .role { margin:0; font-family:${F_MONO}; font-weight:700; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:rgba(46,32,24,.38); }
.art-author-id .name { margin:3px 0 0; font-family:${F_KARLA}; font-weight:500; font-size:14px; color:${INK}; }
.art-copyr { font-family:${F_MONO}; font-weight:700; font-size:9.5px; letter-spacing:.13em; text-transform:uppercase; color:rgba(46,32,24,.3); }

/* related mini-feed */
.rel-wrap { padding-top:56px; padding-bottom:30px; }
.rel-rule { display:flex; align-items:flex-end; gap:24px; }
.rel-rule span { flex:1; height:2px; background:rgba(46,32,24,.14); }
.rel-feed { margin-top:30px; }
.rel-entry { display:flex; }
.rel-entry + .rel-entry { margin-top:34px; }
.rel-rail { width:44px; flex:none; position:relative; }
.rel-rail::before { content:""; position:absolute; top:6px; bottom:-34px; left:5px; width:0; border-left:2px dashed rgba(46,32,24,.3); }
.rel-entry:last-child .rel-rail::before { bottom:0; }
.rel-dot { position:absolute; top:0; left:0; width:11px; height:11px; }
.rel-body { flex:1; min-width:0; display:grid; grid-template-columns:260px 1fr; gap:28px; align-items:center; }
.rel-photo { position:relative; height:168px; border:2px solid ${INK}; overflow:hidden; background:${INK}; }
.rel-text h3 { margin:8px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:23px; line-height:1.14; letter-spacing:-.015em; color:${INK}; }

.art-endrow { padding-bottom:40px; }

@media (max-width:920px) {
  .art-strip { height:6px; }
  .art-eyebrow, .art-kicker, .art-back, .art-readmore { font-size:9.5px; }
  .art-backrow { padding-top:20px; }
  .art-threadrow { padding-top:22px; }
  .art-thread { width:24px; }
  .art-thread::before { top:6px; bottom:6px; left:3px; }
  .art-thread-dot { width:9px; height:9px; }
  .art-head h1 { font-size:33px; line-height:1.04; letter-spacing:-.015em; }
  .art-loc { margin-top:14px; }
  .art-hero { margin-top:22px; height:230px; border-left:0; border-right:0; margin-left:calc(50% - 50vw); margin-right:calc(50% - 50vw); }
  .art-body { margin-top:22px; }
  .art-quote { padding-left:15px; font-size:19px; line-height:1.42; }
  .art-prose { margin-top:20px; }
  .art-prose p { font-size:15px; line-height:1.82; }
  .art-prose p + p { margin-top:16px; }
  .art-author { margin-top:28px; gap:14px; padding-top:18px; }
  .art-author-id { gap:11px; }
  .art-avatar { width:38px; height:38px; }
  .art-author-id .role { font-size:8px; }
  .art-author-id .name { font-size:13px; }
  .art-copyr { font-size:8.5px; }

  .rel-wrap { padding-top:34px; padding-bottom:22px; }
  .rel-rule { gap:16px; }
  .rel-feed { margin-top:18px; }
  .rel-entry + .rel-entry { margin-top:26px; }
  .rel-rail { width:24px; }
  .rel-rail::before { top:5px; bottom:-26px; left:3px; }
  .rel-dot { width:9px; height:9px; }
  .rel-body { display:flex; flex-direction:column; align-items:stretch; gap:10px; grid-template-columns:none; }
  .rel-photo { height:150px; }
  .rel-text h3 { margin:0; font-size:18px; line-height:1.16; }
  .rel-text .art-readmore { display:none; }
  .art-endrow { padding-bottom:26px; }
}
@media (prefers-reduced-motion:reduce) { .art a { transition:none; } }
`;

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const cat = CATEGORY_META[entry.category];
  const related = getRelatedJournalEntries(slug, 3);
  const paragraphs = entry.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="art">
      <style>{CSS}</style>

      <Strip />

      <div className="container-page art-backrow">
        <Link className="art-back" href="/journal" style={{ color: "rgba(46,32,24,.5)" }}>
          <ArrowLeft />
          Tilbake til feltjournalen
        </Link>
      </div>

      <div className="container-page art-threadrow">
        <div className="art-thread">
          <span className="art-thread-dot" style={{ background: cat.dot }} />
        </div>
        <div className="art-main">

          <div className="art-head">
            <span className="art-kicker" style={{ color: cat.text }}>
              {entry.category} · {entry.date}
            </span>
            <h1>{entry.title}</h1>
            {entry.location && (
              <p className="art-loc">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {entry.location}
              </p>
            )}
          </div>

          <div className="art-hero">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              priority
              className="art-cover"
              sizes="100vw"
            />
          </div>

          <div className="art-body">
            <p className="art-quote" style={{ borderLeft: `3px solid ${cat.dot}` }}>
              {entry.excerpt}
            </p>

            <div className="art-prose">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="art-author">
              <div className="art-author-id">
                <span className="art-avatar">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
                  </svg>
                </span>
                <div>
                  <p className="role">Arkivansvarlig</p>
                  <p className="name">{entry.author}</p>
                </div>
              </div>
              <span className="art-copyr">
                Kaffe Guatilla © {new Date().getFullYear()}
              </span>
            </div>
          </div>

        </div>
      </div>

      {related.length > 0 && (
        <div className="container-page rel-wrap">
          <div className="rel-rule">
            <p className="art-eyebrow">Flere innlegg</p>
            <span />
          </div>
          <div className="rel-feed">
            {related.map((r) => {
              const rc = CATEGORY_META[r.category];
              return (
                <div key={r.slug} className="rel-entry">
                  <div className="rel-rail">
                    <span className="rel-dot" style={{ background: rc.dot }} />
                  </div>
                  <Link href={`/journal/${r.slug}`} className="rel-body">
                    <div className="rel-photo">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="art-cover"
                        sizes="(max-width: 920px) 100vw, 260px"
                      />
                    </div>
                    <div className="rel-text">
                      <span className="art-kicker" style={{ color: rc.text }}>
                        {r.category} · {r.date}
                      </span>
                      <h3>{r.title}</h3>
                      <span className="art-readmore" style={{ marginTop: 10 }}>
                        Les hele saken <ArrowRight />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="container-page art-endrow">
        <Link className="art-back" href="/journal" style={{ color: INK }}>
          <ArrowLeft />
          Tilbake til feltjournalen
        </Link>
      </div>

      <Strip />
    </article>
  );
}
