"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import type { JournalEntry } from "@/data/journal";
import { useLocale } from "@/i18n/LocaleProvider";
import { JOURNAL_CATEGORY_LABELS } from "@/i18n/journal";
import { CATEGORY_META } from "./categories";

interface JournalPageProps {
  entries: JournalEntry[];
}

const CATS: JournalEntry["category"][] = [
  "Opprinnelse",
  "Mennesker",
  "Prosess",
  "Kvalitet",
];

const COPY = {
  no: {
    eyebrow: "Dokumentasjon og arkiv",
    title: "Feltjournal",
    intro: "En samling av øyeblikk, mennesker og prosesser, fortalt som de skjedde – direkte fra kaffegårdene i Serranía del Perijá.",
    posts: "innlegg",
    updated: "Sist oppdatert",
    all: "Alle",
    empty: "Ingen journalinnlegg funnet i denne kategorien.",
    reset: "Tilbake til alle innlegg",
    read: "Les hele saken",
    colophon: "Feltjournal",
  },
  en: {
    eyebrow: "Documentation and archive",
    title: "Field Journal",
    intro: "A collection of moments, people and processes, told as they happened – directly from the coffee farms of Serranía del Perijá.",
    posts: "entries",
    updated: "Last updated",
    all: "All",
    empty: "No journal entries were found in this category.",
    reset: "Back to all entries",
    read: "Read the full story",
    colophon: "Field Journal",
  },
  es: {
    eyebrow: "Documentación y archivo",
    title: "Diario de campo",
    intro: "Una colección de momentos, personas y procesos contados tal como sucedieron, directamente desde las fincas cafeteras de la Serranía del Perijá.",
    posts: "entradas",
    updated: "Última actualización",
    all: "Todos",
    empty: "No hay entradas del diario en esta categoría.",
    reset: "Volver a todas las entradas",
    read: "Leer la historia completa",
    colophon: "Diario de campo",
  },
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const CSS = `
.fj{background:#FDF1E5;color:#4A382C;font-family:var(--font-karla),system-ui,sans-serif;min-height:100vh}.fj a{color:#A94B2F;text-decoration:none;transition:color .15s}.fj a:hover{color:#2E2018}.fj *:focus-visible{outline:2px solid #2E2018;outline-offset:2px}
.fj-strip{display:grid;grid-template-columns:repeat(4,1fr);height:7px}.fj-strip span{display:block}.fj-eyebrow,.fj-kicker,.fj-readmore,.fj-meta{font-family:var(--font-space-mono),ui-monospace,monospace;font-weight:700;text-transform:uppercase}.fj-eyebrow{margin:0;font-size:11px;letter-spacing:.22em;color:#6B5A4E}.fj-kicker{font-size:10.5px;letter-spacing:.12em}.fj-readmore{display:inline-flex;align-items:center;gap:7px;font-size:10.5px;letter-spacing:.14em}.fj-dot{width:9px;height:9px;display:block;flex:none}
.fj-hd{padding-top:72px;padding-bottom:34px;text-align:center}.fj-swatches{display:flex;justify-content:center;gap:3px;margin-bottom:16px}.fj-swatches span{width:11px;height:11px}.fj-hd h1{margin:16px auto 0;font-family:var(--font-bitter),Georgia,serif;font-weight:800;font-size:84px;line-height:.95;letter-spacing:-.03em;color:#2E2018}.fj-intro{margin:20px auto 0;max-width:620px;font-family:var(--font-bitter),Georgia,serif;font-style:italic;font-size:21px;line-height:1.55;color:rgba(74,56,44,.72)}.fj-hd-meta{margin-top:22px}
.fj-filterbar{position:relative;border-top:2px dashed rgba(46,32,24,.3);border-bottom:2px dashed rgba(46,32,24,.3)}.fj-filters{padding:18px 0;display:flex;justify-content:safe center;gap:8px;overflow-x:auto;scrollbar-width:none}.fj-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;font-family:var(--font-space-mono),ui-monospace,monospace;font-weight:700;font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;border:2px solid transparent;background:none;color:rgba(74,56,44,.58);cursor:pointer;white-space:nowrap}.fj-chip[aria-pressed=true]{border-color:#2E2018;background:#DDA83A;color:#2E2018}
.fj-spine{border-top:2px solid #2E2018}.fj-feed{padding-top:56px;padding-bottom:30px}.fj-entry{display:flex}.fj-entry+.fj-entry{margin-top:68px}.fj-rail{width:44px;flex:none;position:relative}.fj-rail:before{content:"";position:absolute;top:8px;bottom:-68px;left:5px;border-left:2px dashed rgba(46,32,24,.3)}.fj-entry:last-child .fj-rail:before{bottom:0}.fj-rail-dot{position:absolute;top:0;left:0;width:11px;height:11px}.fj-entry-body{flex:1;min-width:0;display:grid;grid-template-columns:1.35fr 1fr;gap:52px;align-items:center}.fj-entry.rev .fj-entry-body{grid-template-columns:1fr 1.35fr}.fj-entry.rev .fj-photo{order:2}.fj-entry.rev .fj-text{order:1}.fj-photo{position:relative;height:380px;border:2px solid #2E2018;overflow:hidden;background:#2E2018}.fj-photo img{object-fit:cover}.fj-text h2{margin:12px 0 0;font-family:var(--font-bitter),Georgia,serif;font-weight:800;font-size:36px;line-height:1.08;letter-spacing:-.02em;color:#2E2018}.fj-quote{margin:20px 0 0;padding-left:22px;font-family:var(--font-bitter),Georgia,serif;font-style:italic;font-size:21px;line-height:1.48;color:rgba(46,32,24,.8)}.fj-foot{margin-top:20px;display:flex;align-items:center;gap:20px}.fj-meta{font-size:10px;letter-spacing:.1em;color:rgba(107,90,78,.7)}
.fj-empty{padding:72px 0;text-align:center}.fj-empty p{font-family:var(--font-bitter),Georgia,serif;font-style:italic;font-size:22px;color:rgba(46,32,24,.55)}.fj-empty button{border:0;border-bottom:2px solid #A94B2F;background:none;padding:0 0 3px;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#A94B2F;cursor:pointer}.fj-colophon{padding:18px 0 22px;display:flex;justify-content:space-between;gap:16px}
@media(max-width:920px){.fj-hd{padding-top:36px;padding-bottom:24px}.fj-hd h1{font-size:50px}.fj-intro{font-size:16px}.fj-filters{justify-content:flex-start;padding-left:20px}.fj-feed{padding-top:32px}.fj-entry+.fj-entry{margin-top:38px}.fj-rail{width:26px}.fj-rail:before{bottom:-38px}.fj-entry-body,.fj-entry.rev .fj-entry-body{display:flex;flex-direction:column;align-items:stretch;gap:16px}.fj-entry.rev .fj-photo,.fj-entry.rev .fj-text{order:0}.fj-photo{height:210px}.fj-text h2{font-size:25px}.fj-quote{margin-top:14px;font-size:16px}.fj-foot{margin-top:14px;flex-wrap:wrap}.fj-eyebrow,.fj-kicker,.fj-readmore{font-size:9.5px}}
@media(prefers-reduced-motion:reduce){.fj a{transition:none}}
`;

export default function JournalPage({ entries }: JournalPageProps) {
  const locale = useLocale();
  const copy = COPY[locale];
  const categoryLabels = JOURNAL_CATEGORY_LABELS[locale];
  const [active, setActive] = useState<string>("Alle");

  const available = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.category))),
    [entries],
  );
  const filtered = useMemo(
    () => active === "Alle" ? entries : entries.filter((entry) => entry.category === active),
    [active, entries],
  );

  return (
    <div className="fj">
      <style>{CSS}</style>
      <div className="fj-strip" aria-hidden="true">
        <span style={{ background: "#A94B2F" }} /><span style={{ background: "#DDA83A" }} />
        <span style={{ background: "#5C7148" }} /><span style={{ background: "#1F4B4B" }} />
      </div>

      <header className="container-page fj-hd">
        <div className="fj-swatches" aria-hidden="true">
          <span style={{ background: "#A94B2F" }} /><span style={{ background: "#DDA83A" }} />
          <span style={{ background: "#5C7148" }} /><span style={{ background: "#1F4B4B" }} />
        </div>
        <p className="fj-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="fj-intro">{copy.intro}</p>
        <p className="fj-eyebrow fj-hd-meta">
          {entries.length} {copy.posts} · {copy.updated} {entries[0]?.date}
        </p>
      </header>

      <div className="fj-filterbar">
        <div className="container-page fj-filters">
          <button type="button" className="fj-chip" aria-pressed={active === "Alle"} onClick={() => setActive("Alle")}>
            {copy.all}
          </button>
          {CATS.filter((category) => available.includes(category)).map((category) => (
            <button key={category} type="button" className="fj-chip" aria-pressed={active === category} onClick={() => setActive(category)}>
              <span className="fj-dot" style={{ background: CATEGORY_META[category].dot }} />
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      <div className="container-page fj-spine" />
      {filtered.length === 0 ? (
        <div className="container-page fj-empty">
          <p>{copy.empty}</p>
          <button type="button" onClick={() => setActive("Alle")}>{copy.reset}</button>
        </div>
      ) : (
        <div className="container-page fj-feed">
          {filtered.map((entry, index) => {
            const category = CATEGORY_META[entry.category];
            return (
              <article key={entry.slug} className={`fj-entry${index % 2 ? " rev" : ""}`}>
                <div className="fj-rail"><span className="fj-rail-dot" style={{ background: category.dot }} /></div>
                <div className="fj-entry-body">
                  <LocalizedLink href={`/journal/${entry.slug}`} className="fj-photo">
                    <Image src={entry.image} alt={entry.title} fill priority={index === 0} sizes="(max-width: 920px) 100vw, 50vw" />
                  </LocalizedLink>
                  <div className="fj-text">
                    <span className="fj-kicker" style={{ color: category.text }}>{categoryLabels[entry.category]} · {entry.date}</span>
                    <h2>{entry.title}</h2>
                    <p className="fj-quote" style={{ borderLeft: `3px solid ${category.dot}` }}>“{entry.excerpt}”</p>
                    <div className="fj-foot">
                      <LocalizedLink href={`/journal/${entry.slug}`} className="fj-readmore">{copy.read} <ArrowRight /></LocalizedLink>
                      <span className="fj-meta">{entry.author} · {entry.readingTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="fj-strip" aria-hidden="true">
        <span style={{ background: "#A94B2F" }} /><span style={{ background: "#DDA83A" }} />
        <span style={{ background: "#5C7148" }} /><span style={{ background: "#1F4B4B" }} />
      </div>
      <div className="container-page fj-colophon">
        <span className="fj-eyebrow">Kaffe Guatilla — {copy.colophon}</span>
        <span className="fj-eyebrow">Serranía del Perijá</span>
      </div>
    </div>
  );
}
