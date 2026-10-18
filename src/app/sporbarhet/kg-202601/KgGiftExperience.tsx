"use client";

import Image from "next/image";
import { FormEvent, useId, useState } from "react";
import type { CoffeeLot } from "@/types/coffeeLot";
import styles from "./KgGiftExperience.module.css";

const LOT_NUMBER = "KG-202601";
const ROAST_REFERENCE = "202601-P02";

const PACKAGING_PROPOSALS = [
  { id: 1, image: "/assets/kg-202601/packaging/proposal-01-blue.jpeg", label: "Forslag 1" },
  { id: 2, image: "/assets/kg-202601/packaging/proposal-02-ivory.jpeg", label: "Forslag 2" },
  { id: 3, image: "/assets/kg-202601/packaging/proposal-03-black.jpeg", label: "Forslag 3" },
  { id: 4, image: "/assets/kg-202601/packaging/proposal-04-terracotta.jpeg", label: "Forslag 4" },
  { id: 5, image: "/assets/kg-202601/packaging/proposal-05-green.jpeg", label: "Forslag 5" },
  { id: 6, image: "/assets/kg-202601/packaging/proposal-06-turquoise.png", label: "Forslag 6" },
] as const;

const ORIGIN_PHOTOS = [
  { image: "/assets/kg-202601/origin-01.webp", caption: "Kaffeplantene på gården Monserrate" },
  { image: "/assets/kg-202601/origin-02.webp", caption: "Modne kaffebær før innhøsting" },
  { image: "/assets/kg-202601/origin-03.webp", caption: "Grønn kaffe klar for reisen videre" },
  { image: "/assets/kg-202601/origin-04.webp", caption: "Forsendelsen klargjøres i Colombia" },
  { image: "/assets/kg-202601/origin-05.webp", caption: "Veien gjennom fjellandskapet" },
  { image: "/assets/kg-202601/origin-06.webp", caption: "Kaffedyrking i El Guamal Alto" },
  { image: "/assets/kg-202601/origin-07.webp", caption: "Kaffen veies etter innhøstingen" },
  { image: "/assets/kg-202601/origin-08.webp", caption: "Kaffebærene sorteres for hånd" },
] as const;

const ROAST_PHOTOS = [
  { image: "/assets/kg-202601/roast-01.webp", caption: "500,1 g målt før brenning" },
  { image: "/assets/kg-202601/roast-02.webp", caption: "Én av tre fuktmålinger før brenning" },
  { image: "/assets/kg-202601/roast-03.webp", caption: "Omtrent 730 ml grønn kaffe før brenning" },
  { image: "/assets/kg-202601/roast-04.webp", caption: "Resultatet fra brenning 202601-P02" },
  { image: "/assets/kg-202601/roast-05.webp", caption: "Nærbilde av de ferdig brente bønnene" },
] as const;

const PREPARATION_METHODS = [
  ["filter", "Filterkaffe"],
  ["presskanne", "Presskanne"],
  ["espresso", "Espresso"],
  ["aeropress", "AeroPress"],
  ["mokkakanne", "Mokkakanne"],
  ["annet", "Annet"],
] as const;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function StoryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.fact}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function KgGiftExperience({ lot, onBack }: { lot: CoffeeLot; onBack: () => void }) {
  const formId = useId();
  const [packagingDesign, setPackagingDesign] = useState<number | null>(null);
  const [coffeeQuality, setCoffeeQuality] = useState<number | null>(null);
  const [notifyConsent, setNotifyConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (packagingDesign === null || coffeeQuality === null) {
      setError("Velg ett emballasjeforslag og gi kaffen en vurdering.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/sporbarhet/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lotNumber: LOT_NUMBER,
          roastReference: ROAST_REFERENCE,
          packagingDesign,
          coffeeQuality,
          preparationMethod: data.get("preparationMethod"),
          coffeeComments: data.get("coffeeComments"),
          coffeeWishes: data.get("coffeeWishes"),
          packagingComments: data.get("packagingComments"),
          pageComments: data.get("pageComments"),
          norwegianCorrections: data.get("norwegianCorrections"),
          notifyConsent,
          contactEmail: notifyConsent ? data.get("contactEmail") : null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(typeof result.error === "string" ? result.error : "Kunne ikke lagre svaret.");
      }

      setStatus("success");
      form.reset();
      setPackagingDesign(null);
      setCoffeeQuality(null);
      setNotifyConsent(false);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Kunne ikke lagre svaret. Prøv igjen.");
      setStatus("error");
    }
  }

  return (
    <article className={styles.page}>
      <button type="button" className={styles.back} onClick={onBack}>
        <span aria-hidden="true">←</span> Søk etter et annet parti
      </button>

      <header className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <Image className={styles.logo} src="/guatilla-emblem.webp" alt="Kaffe Guatilla" width={112} height={104} priority />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>En gave fra Kaffe Guatilla · Parti {lot.lot_number}</p>
          <h1>Takk for at du prøver kaffen vår!</h1>
          <p>
            Bli kjent med dette kaffepartiet, og hjelp oss å forbedre kaffen,
            emballasjen og norsken vår.
          </p>
          <a href="#gi-tilbakemelding" className={styles.heroButton}>Gi din tilbakemelding</a>
        </div>
      </header>

      <div className={styles.colorBand} aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      <section className={`${styles.section} ${styles.originSection}`} aria-labelledby="historien">
        <div className={styles.sectionHeading}>
          <p>Fra fjellgården til koppen din</p>
          <h2 id="historien">Historien bak kaffen</h2>
        </div>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <p>
              Dette partiet kommer fra gården Monserrate i El Guamal Alto ved Agustín Codazzi i Colombia.
              Produsenten er Jeniffer Perez Salem, og kaffen er dyrket omtrent 800 meter over havet.
            </p>
            <p>
              Arabica-kaffen er vasket og fermentert i 24 timer. Den 4. august 2026 er oppgitt som
              produksjonsdato, uten at produksjonsfasen er nærmere spesifisert. Kaffen kom frem til
              Guatilla 13. oktober 2026. Bildene nedenfor er delt av Jeniffer og følger reisen fra
              kaffebær til grønn kaffe.
            </p>
          </div>
          <dl className={styles.facts}>
            <StoryFact label="Produsent" value="Jeniffer Perez Salem" />
            <StoryFact label="Gård" value="Monserrate" />
            <StoryFact label="Sted" value="El Guamal Alto, Agustín Codazzi" />
            <StoryFact label="Land" value="Colombia" />
            <StoryFact label="Høyde" value="Ca. 800 moh." />
            <StoryFact label="Prosess" value="Vasket · 24 t fermentering" />
            <StoryFact label="Art" value="Arabica" />
            <StoryFact label="Sortering" value="Siktestørrelse over 14" />
          </dl>
        </div>

        <div className={styles.originGallery}>
          {ORIGIN_PHOTOS.map((photo, index) => (
            <figure key={photo.image}>
              <Image
                src={photo.image}
                alt={photo.caption}
                width={900}
                height={1100}
                sizes="(max-width: 700px) 82vw, (max-width: 1000px) 45vw, 28vw"
                priority={index < 2}
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.roastSection}`} aria-labelledby="brenningen">
        <div className={styles.sectionHeadingLight}>
          <p>Siste bekreftede brenning</p>
          <h2 id="brenningen">{ROAST_REFERENCE}</h2>
        </div>
        <div className={styles.roastIntro}>
          <p>
            Denne prøvebrenningen ble gjennomført 17. oktober 2026 med 500 g grønn kaffe.
            Etter 12 minutter og 3 sekunder veide den ferdig brente kaffen 424,5 g.
            Det tilsvarer 15,1 % vekttap.
          </p>
          <p className={styles.pendingNote}>
            Smaksvurderingen av den ferdig hvilte kaffen er ikke fastsatt ennå. Derfor er nettopp din opplevelse viktig for oss.
          </p>
        </div>
        <dl className={styles.roastFacts}>
          <StoryFact label="Dato" value="17. oktober 2026" />
          <StoryFact label="Grønn kaffe" value="500 g" />
          <StoryFact label="Brent kaffe" value="424,5 g" />
          <StoryFact label="Varighet" value="12:03" />
          <StoryFact label="Vekttap" value="15,1 %" />
          <StoryFact label="Mål" value="Utforskende espresso-profil" />
        </dl>
        <div className={styles.roastGallery}>
          {ROAST_PHOTOS.map((photo) => (
            <figure key={photo.image}>
              <Image src={photo.image} alt={photo.caption} width={900} height={1100} sizes="(max-width: 700px) 82vw, 30vw" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="gi-tilbakemelding" className={`${styles.section} ${styles.feedbackSection}`} aria-labelledby="tilbakemelding">
        <div className={styles.sectionHeading}>
          <p>Det tar bare noen få minutter</p>
          <h2 id="tilbakemelding">Hjelp oss videre</h2>
        </div>
        <p className={styles.feedbackLead}>
          Du kan stemme og svare uten konto eller e-post. Svarene lagres internt for parti {LOT_NUMBER};
          kaffevurderingen knyttes også til brenning {ROAST_REFERENCE}. Vi publiserer ikke kommentarer automatisk.
        </p>

        {status === "success" ? (
          <div className={styles.success} role="status">
            <span aria-hidden="true">✓</span>
            <div>
              <h3>Tusen takk!</h3>
              <p>Svaret ditt er lagret og hjelper oss med neste steg.</p>
            </div>
          </div>
        ) : (
          <form className={styles.feedbackForm} onSubmit={handleSubmit}>
            <fieldset className={styles.formBlock}>
              <legend>1. Hvilket emballasjeforslag liker du best?</legend>
              <p className={styles.helpText}>Forslagene er under utvikling. Alle seks vises på samme vilkår.</p>
              <div className={styles.packagingGrid}>
                {PACKAGING_PROPOSALS.map((proposal) => (
                  <label className={styles.packagingCard} key={proposal.id}>
                    <input
                      type="radio"
                      name="packagingDesign"
                      value={proposal.id}
                      checked={packagingDesign === proposal.id}
                      onChange={() => setPackagingDesign(proposal.id)}
                      required
                    />
                    <span className={styles.packageImage}>
                      <Image src={proposal.image} alt={`${proposal.label}, emballasje under utvikling`} width={900} height={1200} sizes="(max-width: 650px) 88vw, (max-width: 1000px) 42vw, 28vw" />
                    </span>
                    <span className={styles.packageLabel}>
                      <span>{proposal.label}</span>
                      <span aria-hidden="true" className={styles.radioMark} />
                    </span>
                  </label>
                ))}
              </div>
              <label className={styles.field} htmlFor={`${formId}-packaging-comments`}>
                <span>Hva ville du endret ved emballasjen? <em>Valgfritt</em></span>
                <textarea id={`${formId}-packaging-comments`} name="packagingComments" maxLength={1000} rows={4} />
              </label>
            </fieldset>

            <fieldset className={styles.formBlock}>
              <legend>2. Hvordan opplevde du kaffen?</legend>
              <div className={styles.ratingGroup}>
                <span>Helhetsinntrykk <small>1 = ikke for meg · 5 = svært god</small></span>
                <div className={styles.ratingOptions}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating}>
                      <input
                        type="radio"
                        name="coffeeQuality"
                        value={rating}
                        checked={coffeeQuality === rating}
                        onChange={() => setCoffeeQuality(rating)}
                        required
                      />
                      <span>{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className={styles.field} htmlFor={`${formId}-method`}>
                <span>Hvordan laget du kaffen?</span>
                <select id={`${formId}-method`} name="preparationMethod" defaultValue="" required>
                  <option value="" disabled>Velg bryggemetode</option>
                  {PREPARATION_METHODS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
              </label>
              <label className={styles.field} htmlFor={`${formId}-coffee-comments`}>
                <span>Fortell gjerne om smak, styrke eller oppskriften din <em>Valgfritt</em></span>
                <textarea id={`${formId}-coffee-comments`} name="coffeeComments" maxLength={1000} rows={5} />
              </label>
              <label className={styles.field} htmlFor={`${formId}-coffee-wishes`}>
                <span>Hvilke kaffer eller smaksprofiler vil du gjerne prøve? <em>Valgfritt</em></span>
                <textarea id={`${formId}-coffee-wishes`} name="coffeeWishes" maxLength={600} rows={4} />
              </label>
            </fieldset>

            <fieldset className={styles.formBlock}>
              <legend>3. Noe mer vi bør vite?</legend>
              <div className={styles.twoColumns}>
                <label className={styles.field} htmlFor={`${formId}-page-comments`}>
                  <span>Feil på siden eller andre kommentarer <em>Valgfritt</em></span>
                  <textarea id={`${formId}-page-comments`} name="pageComments" maxLength={1000} rows={4} />
                </label>
                <label className={styles.field} htmlFor={`${formId}-norwegian`}>
                  <span>Hjelp oss gjerne med norsken <em>Valgfritt</em></span>
                  <textarea id={`${formId}-norwegian`} name="norwegianCorrections" maxLength={1000} rows={4} />
                </label>
              </div>
            </fieldset>

            <fieldset className={`${styles.formBlock} ${styles.consentBlock}`}>
              <legend>4. Vil du høre om neste parti?</legend>
              <label className={styles.consentLabel}>
                <input type="checkbox" checked={notifyConsent} onChange={(event) => setNotifyConsent(event.target.checked)} />
                <span>Ja, jeg vil motta e-post om kommende kaffepartier.</span>
              </label>
              {notifyConsent && (
                <label className={styles.field} htmlFor={`${formId}-email`}>
                  <span>E-postadresse</span>
                  <input id={`${formId}-email`} name="contactEmail" type="email" maxLength={254} autoComplete="email" required />
                </label>
              )}
              <p className={styles.privacy}>Samtykket er frivillig og er ikke valgt på forhånd. E-postadressen brukes bare til varsler om nye partier.</p>
            </fieldset>

            {status === "error" && <p className={styles.formError} role="alert">{error}</p>}
            <button type="submit" className={styles.submit} disabled={status === "submitting"}>
              {status === "submitting" ? "Lagrer …" : "Send tilbakemeldingen"}
            </button>
          </form>
        )}
      </section>
    </article>
  );
}
