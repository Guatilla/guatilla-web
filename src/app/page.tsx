import Link from "@/components/LocalizedLink";
import DirectTrade from "@/components/sections/DirectTrade";
import SeasonalClosing from "@/components/sections/SeasonalClosing";
import HeroFarmCarousel from "@/components/HeroFarmCarousel";
import { getRequestLocale } from "@/i18n/server";
import { HOME_COPY } from "@/i18n/home";
import { localizeCatalogProducts, localizeGrind } from "@/i18n/products";
import { getPublishedCatalog } from "@/lib/catalog";
import { formatNok } from "@/lib/money";

export const dynamic = "force-dynamic";

const PILLARS = [
  {
    n: "01",
    tone: "bg-brand-terracotta text-brand-cream",
    title: "Dyrket av oss",
    body: "Vi kjøper ikke anonyme kaffepartier. Vi steller kaffetrærne på familiegårdene våre i Agustín Codazzi.",
  },
  {
    n: "02",
    tone: "bg-brand-gold text-brand-coffee",
    title: "Presis brenning i Stavanger",
    body: "Vi brenner kaffen lokalt i Stavanger i mikropartier med profiler som fremhever kaffens naturlige karakter.",
  },
  {
    n: "03",
    tone: "bg-brand-forest text-brand-cream",
    title: "Garantert ferskhet",
    body: "Vi brenner og pakker med ferskhet som utgangspunkt, slik at kaffen når deg på sitt beste.",
  },
];

const CATALOG_COPY = {
  no: { coming: "Salget åpner snart", unavailable: "Katalogen er midlertidig utilgjengelig", from: "Fra", view: "Se produkt", variants: "Varianter" },
  en: { coming: "Sales coming soon", unavailable: "The catalogue is temporarily unavailable", from: "From", view: "View product", variants: "Variants" },
  es: { coming: "Venta próximamente", unavailable: "El catálogo no está disponible temporalmente", from: "Desde", view: "Ver producto", variants: "Variantes" },
} as const;

const BTN_FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coffee";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  return { title: HOME_COPY[locale].metaTitle, description: HOME_COPY[locale].metaDescription };
}

export default async function Home() {
  const locale = await getRequestLocale();
  const copy = HOME_COPY[locale];
  const pillars = locale === "no" ? PILLARS : HOME_COPY[locale].pillars;
  const catalogResult = await getPublishedCatalog()
    .then((catalogProducts) => ({ catalogProducts, unavailable: false }))
    .catch(() => ({ catalogProducts: [], unavailable: true }));
  const products = localizeCatalogProducts(
    catalogResult.catalogProducts.filter((product) => product.isFeatured).slice(0, 4),
    locale,
  );
  const catalogCopy = CATALOG_COPY[locale];

  return <div className="bg-brand-linen">
    <section className="bg-brand-linen"><div className="container-page pb-12 pt-16 lg:pb-14 lg:pt-[72px]"><div className="grid gap-8 min-[880px]:grid-cols-[1.12fr_0.88fr] min-[880px]:gap-10">
      <div className="flex flex-col"><span className="self-start bg-brand-gold px-3.5 py-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-coffee">{copy.heroEyebrow}</span><h1 className="mt-6 font-heading text-[38px] font-extrabold leading-[0.98] tracking-[-0.035em] text-brand-coffee [text-wrap:balance] min-[560px]:text-[48px] min-[900px]:text-[56px] min-[1100px]:text-[68px]">{copy.heroBefore} <span className="inline-block -rotate-[1.2deg] bg-brand-terracotta-dark px-3 pb-1 italic text-brand-cream">{copy.heroEmphasis}</span> {copy.heroAfter}</h1><p className="mt-6 max-w-[46ch] font-sans text-[16px] leading-[1.6] text-brand-coffee/[0.78] min-[900px]:text-[17px]">{copy.heroBody}</p><div className="min-[880px]:flex-1" /><div className="mt-8 flex flex-col self-start border-2 border-brand-coffee min-[480px]:flex-row lg:mt-10"><Link href="/shop" className={`bg-brand-coffee px-7 py-[18px] text-center font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-cream ${BTN_FOCUS}`}>{copy.primaryCta}</Link><Link href="/kaffe" className={`border-t-2 border-brand-coffee bg-brand-linen px-7 py-[18px] text-center font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-coffee min-[480px]:border-l-2 min-[480px]:border-t-0 ${BTN_FOCUS}`}>{copy.secondaryCta} →</Link></div></div>
      <div className="flex flex-col gap-[2px] border-2 border-brand-coffee bg-brand-coffee"><div className="relative min-h-[260px] flex-1 overflow-hidden min-[880px]:min-h-[330px]"><HeroFarmCarousel /></div><div className="bg-brand-olive px-6 py-[22px] text-brand-cream"><p className="font-heading text-[26px] font-extrabold italic leading-none">{copy.farmsTitle}</p><p className="mt-1.5 font-sans text-[13.5px] leading-[1.45]">{copy.farmsMeta}</p></div></div>
    </div></div></section>

    <section className="container-page pb-14"><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta">{copy.pillarsEyebrow}</span><h2 className="mt-2 max-w-[18ch] font-heading text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[44px]">{copy.pillarsTitle}</h2><div className="mt-7 flex flex-col gap-[2px] border-2 border-brand-coffee bg-brand-coffee min-[760px]:flex-row">{pillars.map((pillar) => <div key={pillar.n} className="flex flex-1 flex-col bg-brand-cream p-7 lg:p-8"><span className={`inline-flex w-fit items-center px-2.5 py-1.5 font-heading text-[15px] font-extrabold italic leading-none ${pillar.tone}`}>{pillar.n}</span><h3 className="mt-4 font-heading text-[21px] font-extrabold leading-[1.15] text-brand-coffee">{pillar.title}</h3><p className="mt-2.5 font-sans text-[14px] leading-[1.6] text-brand-coffee/[0.75]">{pillar.body}</p></div>)}</div></section>

    <section className="container-page pb-14"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta">{copy.catalogEyebrow}</span><h2 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl lg:text-[44px]">{copy.catalogTitle}</h2></div><Link href="/shop" className={`border-2 border-brand-coffee bg-brand-cream px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-coffee ${BTN_FOCUS}`}>{copy.catalogCta} →</Link></div>
      {catalogResult.unavailable ? <div className="border-2 border-brand-coffee bg-brand-cream p-10 text-center font-heading text-2xl font-extrabold text-brand-coffee">{catalogCopy.unavailable}</div> : products.length === 0 ? <div className="border-2 border-brand-coffee bg-brand-cream p-10 text-center font-heading text-2xl font-extrabold text-brand-coffee">{catalogCopy.coming}</div> : <div className="grid gap-5 sm:grid-cols-2">{products.map((product) => {
        const minPrice = Math.min(...product.variants.map((variant) => variant.priceOre));
        const variantLabels = Array.from(new Set(product.variants.map((variant) => localizeGrind(variant.grind, locale)).filter(Boolean)));
        return <article key={product.id} className="flex flex-col border-2 border-brand-coffee bg-brand-cream"><span className="bg-brand-olive px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-brand-cream">{product.category?.name ?? catalogCopy.variants}</span><div className="flex flex-1 flex-col p-6"><h3 className="font-heading text-[26px] font-extrabold leading-none text-brand-coffee">{product.name}</h3><p className="mt-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-coffee/55">{variantLabels.join(" · ")}</p>{product.description && <p className="mt-3.5 font-sans text-[14px] leading-[1.6] text-brand-coffee/[0.78]">{product.description}</p>}<div className="flex-1" /><div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-brand-coffee pt-4"><span className="font-heading text-[16px] font-extrabold text-brand-coffee">{catalogCopy.from} {formatNok(minPrice, locale)}</span><Link href={`/shop/${product.slug}`} className={`bg-brand-coffee px-4 py-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-cream ${BTN_FOCUS}`}>{catalogCopy.view}</Link></div></div></article>;
      })}</div>}
    </section>
    <DirectTrade /><SeasonalClosing />
  </div>;
}
