"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JournalEntry } from "@/data/journal";
import { CATEGORY_META } from "./categories";

interface JournalPageProps {
  entries: JournalEntry[];
}

/* ── Tokens (modern patchwork) ─────────────────────────── */
const CREAM = "#FDF1E5";
const INK = "#2E2018";
const MUTED = "#6B5A4E";
const TERRA = "#A94B2F";
const MUSTARD = "#DDA83A";
const OLIVE = "#5C7148";
const TEAL = "#1F4B4B";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const CATS: JournalEntry["category"][] = [
  "Opprinnelse",
  "Mennesker",
  "Prosess",
  "Kvalitet",
];

const ROT_CLASSES = ["fj-rot-a", "fj-rot-b", "fj-rot-c", "fj-rot-d"];

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

const CSS = `
.fj { background:${CREAM}; color:#4A382C; font-family:${F_KARLA}; min-height:100vh; }
.fj a { color:${TERRA}; text-decoration:none; transition:color .15s ease; }
.fj a:hover { color:${INK}; }
.fj *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }

.fj-strip { display:grid; grid-template-columns:repeat(4,1fr); height:7px; }
.fj-strip span { display:block; }

.fj-eyebrow { margin:0; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:${MUTED}; }
.fj-kicker { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; }
.fj-readmore { display:inline-flex; align-items:center; gap:7px; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:${TERRA}; }
.fj-cover { object-fit:cover; }
.fj-swatches { display:flex; justify-content:center; gap:3px; margin-bottom:16px; }
.fj-swatches span { width:11px; height:11px; display:block; }
.fj-dot { width:9px; height:9px; flex:none; display:block; }

.fj-chip { display:inline-flex; align-items:center; gap:8px; padding:9px 16px; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.13em; text-transform:uppercase; border:2px solid transparent; background:none; color:rgba(74,56,44,.58); cursor:pointer; flex:none; white-space:nowrap; transition:color .15s ease; }
.fj-chip:hover { color:${INK}; }
.fj-chip[aria-pressed="true"] { border-color:${INK}; background:${MUSTARD}; color:${INK}; }

/* ── Masthead ─────────────────────────────────────────── */
.fj-hd { padding-top:72px; padding-bottom:34px; text-align:center; }
.fj-hd h1 { margin:16px auto 0; font-family:${F_BITTER}; font-weight:800; font-size:84px; line-height:.95; letter-spacing:-.03em; color:${INK}; }
.fj-hd-intro { margin:20px auto 0; max-width:620px; font-family:${F_BITTER}; font-weight:400; font-style:italic; font-size:21px; line-height:1.55; color:rgba(74,56,44,.72); text-wrap:pretty; }
.fj-hd-meta { margin-top:22px; }

/* ── Filter bar ───────────────────────────────────────── */
.fj-filterbar { position:relative; border-top:2px dashed rgba(46,32,24,.3); border-bottom:2px dashed rgba(46,32,24,.3); }
.fj-filters { padding-top:18px; padding-bottom:18px; display:flex; flex-wrap:nowrap; justify-content:safe center; gap:8px; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
.fj-filters::-webkit-scrollbar { display:none; }
.fj-filter-fade { position:absolute; top:0; bottom:0; right:0; width:40px; background:linear-gradient(to right, rgba(253,241,229,0), ${CREAM} 72%); pointer-events:none; display:none; }

.fj-spine { border-top:2px solid ${INK}; }

/* ── Feed (sydd tidslinje) ────────────────────────────── */
.fj-feed { padding-top:56px; padding-bottom:30px; }
.fj-entry { display:flex; }
.fj-entry + .fj-entry { margin-top:68px; }
.fj-rail { width:44px; flex:none; position:relative; }
.fj-rail::before { content:""; position:absolute; top:8px; bottom:-68px; left:5px; width:0; border-left:2px dashed rgba(46,32,24,.3); }
.fj-entry:last-child .fj-rail::before { bottom:0; }
.fj-rail-dot { position:absolute; top:0; left:0; width:11px; height:11px; }
.fj-entry-body { flex:1; min-width:0; display:grid; grid-template-columns:1.35fr 1fr; gap:52px; align-items:center; }
.fj-entry.rev .fj-entry-body { grid-template-columns:1fr 1.35fr; }
.fj-entry.rev .fj-e-photo { order:2; }
.fj-entry.rev .fj-e-text { order:1; }
.fj-e-photo { position:relative; height:380px; border:2px solid ${INK}; overflow:hidden; background:${INK}; }
.fj-rot-a { transform:rotate(-.5deg); }
.fj-rot-b { transform:rotate(.5deg); }
.fj-rot-c { transform:rotate(-.4deg); }
.fj-rot-d { transform:rotate(.4deg); }
.fj-e-text h2 { margin:12px 0 0; font-family:${F_BITTER}; font-weight:800; font-size:36px; line-height:1.08; letter-spacing:-.02em; color:${INK}; text-wrap:balance; }
.fj-e-quote { margin:20px 0 0; padding-left:22px; font-family:${F_BITTER}; font-weight:400; font-style:italic; font-size:21px; line-height:1.48; color:rgba(46,32,24,.8); text-wrap:pretty; }
.fj-e-foot { margin-top:20px; display:flex; align-items:center; gap:20px; }
.fj-e-foot .meta { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:rgba(107,90,78,.7); }

/* ── Colophon ─────────────────────────────────────────── */
.fj-colophon { padding-top:18px; padding-bottom:22px; display:flex; justify-content:space-between; align-items:center; gap:16px; }

/* ── Empty state ──────────────────────────────────────── */
.fj-empty { padding:72px 0; text-align:center; }
.fj-empty p { margin:0; font-family:${F_BITTER}; font-weight:400; font-style:italic; font-size:22px; color:rgba(46,32,24,.45); }
.fj-empty button { margin-top:26px; background:none; border:0; border-bottom:2px solid ${TERRA}; padding:0 0 3px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:${TERRA}; cursor:pointer; }

@media (max-width:920px) {
  .fj-strip { height:6px; }
  .fj-eyebrow, .fj-kicker, .fj-readmore { font-size:9.5px; }
  .fj-hd { padding-top:36px; padding-bottom:24px; }
  .fj-hd h1 { font-size:50px; }
  .fj-hd-intro { font-size:16px; }
  .fj-hd-meta { margin-top:16px; }

  .fj-filters { padding-left:20px; padding-right:40px; justify-content:flex-start; margin-right:calc(50% - 50vw); }
  .fj-filter-fade { display:block; }
  .fj-chip { padding:7px 12px; gap:6px; font-size:9.5px; }

  .fj-feed { padding-top:32px; padding-bottom:20px; }
  .fj-entry + .fj-entry { margin-top:38px; }
  .fj-rail { width:26px; }
  .fj-rail::before { top:6px; bottom:-38px; left:4px; }
  .fj-rail-dot { width:9px; height:9px; }
  .fj-entry-body, .fj-entry.rev .fj-entry-body { display:flex; flex-direction:column; align-items:stretch; gap:16px; grid-template-columns:none; }
  .fj-entry.rev .fj-e-photo, .fj-entry.rev .fj-e-text { order:0; }
  .fj-e-photo { height:210px; }
  .fj-rot-a, .fj-rot-b, .fj-rot-c, .fj-rot-d { transform:none; }
  .fj-e-text h2 { margin-top:10px; font-size:25px; line-height:1.1; letter-spacing:-.015em; }
  .fj-e-quote { margin-top:14px; padding-left:16px; font-size:16px; line-height:1.46; }
  .fj-e-foot { margin-top:14px; flex-wrap:wrap; gap:14px; }
  .fj-e-foot .meta { font-size:9px; }
}
@media (prefers-reduced-motion:reduce) { .fj a { transition:none; } }
`;

export default function JournalPage({ entries }: JournalPageProps) {
  const [active, setActive] = useState<string>("Alle");

  const available = useMemo(
    () => Array.from(new Set(entries.map((e) => e.category))),
    [entries]
  );

  const filtered = useMemo(
    () =>
      active === "Alle" ? entries : entries.filter((e) => e.category === active),
    [entries, active]
  );

  return (
    <div className="fj">
      <style>{CSS}</style>

      <div className="fj-strip" aria-hidden="true">
        <span style={{ background: TERRA }} />
        <span style={{ background: MUSTARD }} />
        <span style={{ background: OLIVE }} />
        <span style={{ background: TEAL }} />
      </div>

      {/* Masthead */}
      <header className="container-page fj-hd">
        <div className="fj-swatches" aria-hidden="true">
          <span style={{ background: TERRA }} />
          <span style={{ background: MUSTARD }} />
          <span style={{ background: OLIVE }} />
          <span style={{ background: TEAL }} />
        </div>
        <p className="fj-eyebrow">Dokumentasjon og arkiv</p>
        <h1>Feltjournal</h1>
        <p className="fj-hd-intro">
          En samling av øyeblikk, mennesker og prosesser, fortalt som de
          skjedde — direkte fra kaffegårdene i Serranía del Perijá.
        </p>
        <p className="fj-eyebrow fj-hd-meta">
          {entries.length} innlegg · Sist oppdatert {entries[0]?.date}
        </p>
      </header>

      {/* Filter bar */}
      <div className="fj-filterbar">
        <div className="container-page">
          <div className="fj-filters">
            <button
              type="button"
              className="fj-chip"
              aria-pressed={active === "Alle"}
              onClick={() => setActive("Alle")}
            >
              Alle
            </button>
            {CATS.filter((c) => available.includes(c)).map((c) => (
              <button
                key={c}
                type="button"
                className="fj-chip"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                <span
                  className="fj-dot"
                  style={{ background: CATEGORY_META[c].dot }}
                />
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="fj-filter-fade" aria-hidden="true" />
      </div>

      <div className="container-page fj-spine" />

      {filtered.length === 0 ? (
        <div className="container-page">
          <div className="fj-empty">
            <p>Ingen journalinnlegg funnet i denne kategorien.</p>
            <button type="button" onClick={() => setActive("Alle")}>
              Tilbake til alle innlegg
            </button>
          </div>
        </div>
      ) : (
        <div className="container-page fj-feed">
          {filtered.map((entry, i) => {
            const cat = CATEGORY_META[entry.category];
            const rev = i % 2 === 1;
            return (
              <article
                key={entry.slug}
                className={`fj-entry${rev ? " rev" : ""}`}
              >
                <div className="fj-rail">
                  <span className="fj-rail-dot" style={{ background: cat.dot }} />
                </div>
                <div className="fj-entry-body">
                  <Link
                    href={`/journal/${entry.slug}`}
                    className={`fj-e-photo ${ROT_CLASSES[i % 4]}`}
                  >
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      priority={i === 0}
                      className="fj-cover"
                      sizes="(max-width: 920px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="fj-e-text">
                    <span className="fj-kicker" style={{ color: cat.text }}>
                      {entry.category} · {entry.date}
                    </span>
                    <h2>{entry.title}</h2>
                    <p
                      className="fj-e-quote"
                      style={{ borderLeft: `3px solid ${cat.dot}` }}
                    >
                      «{entry.excerpt}»
                    </p>
                    <div className="fj-e-foot">
                      <Link href={`/journal/${entry.slug}`} className="fj-readmore">
                        Les hele saken <ArrowRight />
                      </Link>
                      <span className="meta">
                        {entry.author} · {entry.readingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="fj-strip" aria-hidden="true">
        <span style={{ background: TERRA }} />
        <span style={{ background: MUSTARD }} />
        <span style={{ background: OLIVE }} />
        <span style={{ background: TEAL }} />
      </div>
      <div className="container-page fj-colophon">
        <span className="fj-eyebrow">Kaffe Guatilla — Feltjournal</span>
        <span className="fj-eyebrow">Serranía del Perijá</span>
      </div>
    </div>
  );
}
