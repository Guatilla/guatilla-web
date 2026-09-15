import Image from "next/image";
import { notFound } from "next/navigation";
import LocalizedLink from "@/components/LocalizedLink";
import { CATEGORY_META } from "@/components/journal/categories";
import {
  getJournalEntryBySlug,
  getRelatedJournalEntries,
  journalEntries,
} from "@/data/journal";
import {
  JOURNAL_CATEGORY_LABELS,
  localizeJournalEntries,
  localizeJournalEntry,
} from "@/i18n/journal";
import { getRequestLocale } from "@/i18n/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COPY = {
  no: {
    notFound: "Innlegg ikke funnet",
    journal: "Feltjournal",
    back: "Tilbake til feltjournalen",
    archivist: "Arkivansvarlig",
    more: "Flere innlegg",
    read: "Les hele saken",
  },
  en: {
    notFound: "Entry not found",
    journal: "Field Journal",
    back: "Back to the field journal",
    archivist: "Archive editor",
    more: "More entries",
    read: "Read the full story",
  },
  es: {
    notFound: "Entrada no encontrada",
    journal: "Diario de campo",
    back: "Volver al diario de campo",
    archivist: "Responsable del archivo",
    more: "Más entradas",
    read: "Leer la historia completa",
  },
};

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const [{ slug }, locale] = await Promise.all([params, getRequestLocale()]);
  const source = getJournalEntryBySlug(slug);
  const copy = COPY[locale];
  if (!source) return { title: `${copy.notFound} | Kaffe Guatilla` };
  const entry = localizeJournalEntry(source, locale);
  return { title: `${entry.title} | ${copy.journal}`, description: entry.excerpt };
}

function ArrowLeft() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Strip() {
  return (
    <div className="art-strip" aria-hidden="true">
      <span style={{ background: "#A94B2F" }} /><span style={{ background: "#DDA83A" }} />
      <span style={{ background: "#5C7148" }} /><span style={{ background: "#1F4B4B" }} />
    </div>
  );
}

const CSS = `
.art{background:#FDF1E5;color:#4A382C;font-family:var(--font-karla),system-ui,sans-serif;min-height:100vh;overflow-x:clip}.art a{color:#A94B2F;text-decoration:none}.art *:focus-visible{outline:2px solid #2E2018;outline-offset:2px}.art-strip{display:grid;grid-template-columns:repeat(4,1fr);height:7px}.art-strip span{display:block}.art-back{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-space-mono),monospace;font-weight:700;font-size:11px;letter-spacing:.15em;text-transform:uppercase}.art-backrow{padding-top:30px}.art-threadrow{display:flex;padding-top:34px}.art-thread,.rel-rail{width:44px;flex:none;position:relative}.art-thread:before,.rel-rail:before{content:"";position:absolute;top:8px;bottom:8px;left:5px;border-left:2px dashed rgba(46,32,24,.3)}.art-dot,.rel-dot{position:absolute;top:0;left:0;width:11px;height:11px}.art-main{flex:1;min-width:0}.art-kicker,.art-eyebrow,.art-readmore,.art-role,.art-copyr{font-family:var(--font-space-mono),monospace;font-weight:700;text-transform:uppercase}.art-kicker{font-size:10.5px;letter-spacing:.13em}.art-head h1{margin:16px 0 0;font-family:var(--font-bitter),Georgia,serif;font-weight:800;font-size:60px;line-height:1;letter-spacing:-.025em;color:#2E2018}.art-loc{margin:18px 0 0;display:inline-flex;align-items:center;gap:8px;font-family:var(--font-space-mono),monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(107,90,78,.8)}.art-hero{position:relative;margin-top:34px;height:460px;border:2px solid #2E2018;overflow:hidden;background:#2E2018}.art-hero img,.rel-photo img{object-fit:cover}.art-body{margin-top:34px;max-width:700px}.art-quote{margin:0;padding-left:24px;font-family:var(--font-bitter),Georgia,serif;font-style:italic;font-size:27px;line-height:1.45;color:rgba(46,32,24,.82)}.art-prose{margin-top:30px}.art-prose p{margin:0;font-size:17px;line-height:1.9;color:rgba(74,56,44,.8)}.art-prose p+p{margin-top:20px}.art-author{margin-top:40px;display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:2px dashed rgba(46,32,24,.22);padding-top:20px}.art-author-id{display:flex;align-items:center;gap:13px}.art-avatar{width:42px;height:42px;border:2px solid #2E2018;display:flex;align-items:center;justify-content:center}.art-role{margin:0;font-size:9px;letter-spacing:.14em;color:rgba(46,32,24,.45)}.art-name{margin:3px 0 0;font-size:14px;color:#2E2018}.art-copyr{font-size:9.5px;letter-spacing:.13em;color:rgba(46,32,24,.4)}
.rel-wrap{padding-top:56px;padding-bottom:30px}.rel-rule{display:flex;align-items:flex-end;gap:24px}.art-eyebrow{margin:0;font-size:11px;letter-spacing:.18em;color:#A94B2F}.rel-rule>span{flex:1;height:2px;background:rgba(46,32,24,.14)}.rel-feed{margin-top:30px}.rel-entry{display:flex}.rel-entry+.rel-entry{margin-top:34px}.rel-rail:before{bottom:-34px}.rel-entry:last-child .rel-rail:before{bottom:0}.rel-body{flex:1;min-width:0;display:grid;grid-template-columns:260px 1fr;gap:28px;align-items:center}.rel-photo{position:relative;height:168px;border:2px solid #2E2018;overflow:hidden}.rel-text h3{margin:8px 0 0;font-family:var(--font-bitter),Georgia,serif;font-size:23px;line-height:1.14;color:#2E2018}.art-readmore{display:inline-flex;align-items:center;gap:7px;margin-top:10px;font-size:10.5px;letter-spacing:.14em}.art-endrow{padding-bottom:40px}
@media(max-width:920px){.art-backrow{padding-top:20px}.art-threadrow{padding-top:22px}.art-thread,.rel-rail{width:24px}.art-dot,.rel-dot{width:9px;height:9px}.art-head h1{font-size:33px}.art-hero{margin-top:22px;height:230px;border-left:0;border-right:0;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw)}.art-body{margin-top:22px}.art-quote{padding-left:15px;font-size:19px}.art-prose{margin-top:20px}.art-prose p{font-size:15px;line-height:1.82}.art-author{margin-top:28px}.rel-wrap{padding-top:34px}.rel-body{display:flex;flex-direction:column;align-items:stretch;gap:10px}.rel-photo{height:150px}.rel-text h3{font-size:18px}.rel-text .art-readmore{display:none}}
`;

export default async function JournalDetailPage({ params }: PageProps) {
  const [{ slug }, locale] = await Promise.all([params, getRequestLocale()]);
  const source = getJournalEntryBySlug(slug);
  if (!source) notFound();

  const copy = COPY[locale];
  const categoryLabels = JOURNAL_CATEGORY_LABELS[locale];
  const entry = localizeJournalEntry(source, locale);
  const related = localizeJournalEntries(getRelatedJournalEntries(slug, 3), locale);
  const category = CATEGORY_META[entry.category];
  const paragraphs = entry.content.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <article className="art">
      <style>{CSS}</style>
      <Strip />
      <div className="container-page art-backrow">
        <LocalizedLink className="art-back" href="/journal"><ArrowLeft />{copy.back}</LocalizedLink>
      </div>

      <div className="container-page art-threadrow">
        <div className="art-thread"><span className="art-dot" style={{ background: category.dot }} /></div>
        <div className="art-main">
          <header className="art-head">
            <span className="art-kicker" style={{ color: category.text }}>{categoryLabels[entry.category]} · {entry.date}</span>
            <h1>{entry.title}</h1>
            {entry.location && <p className="art-loc">⌖ {entry.location}</p>}
          </header>
          <div className="art-hero"><Image src={entry.image} alt={entry.title} fill priority sizes="100vw" /></div>
          <div className="art-body">
            <p className="art-quote" style={{ borderLeft: `3px solid ${category.dot}` }}>{entry.excerpt}</p>
            <div className="art-prose">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="art-author">
              <div className="art-author-id">
                <span className="art-avatar" aria-hidden="true">✦</span>
                <div><p className="art-role">{copy.archivist}</p><p className="art-name">{entry.author}</p></div>
              </div>
              <span className="art-copyr">Kaffe Guatilla · {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-page rel-wrap">
          <div className="rel-rule"><p className="art-eyebrow">{copy.more}</p><span /></div>
          <div className="rel-feed">
            {related.map((relatedEntry) => {
              const relatedCategory = CATEGORY_META[relatedEntry.category];
              return (
                <div key={relatedEntry.slug} className="rel-entry">
                  <div className="rel-rail"><span className="rel-dot" style={{ background: relatedCategory.dot }} /></div>
                  <LocalizedLink href={`/journal/${relatedEntry.slug}`} className="rel-body">
                    <div className="rel-photo"><Image src={relatedEntry.image} alt={relatedEntry.title} fill sizes="(max-width: 920px) 100vw, 260px" /></div>
                    <div className="rel-text">
                      <span className="art-kicker" style={{ color: relatedCategory.text }}>{categoryLabels[relatedEntry.category]} · {relatedEntry.date}</span>
                      <h3>{relatedEntry.title}</h3>
                      <span className="art-readmore">{copy.read} <ArrowRight /></span>
                    </div>
                  </LocalizedLink>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="container-page art-endrow">
        <LocalizedLink className="art-back" href="/journal"><ArrowLeft />{copy.back}</LocalizedLink>
      </div>
      <Strip />
    </article>
  );
}
