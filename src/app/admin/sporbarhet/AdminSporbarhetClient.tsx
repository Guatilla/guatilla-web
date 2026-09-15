"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CoffeeLot, CoffeeLotInput, LotImage } from "@/types/coffeeLot";
import { EMPTY_LOT_INPUT } from "@/types/coffeeLot";

/* ── Tokens (modern patchwork · turkis/petrol) ────────────────────── */
const CREAM = "#FDF1E5";
const WARM = "#F2E6D8";
const INK = "#2E2018";
const BODY = "#4A382C";
const MUTED = "#6B5A4E";
const TEAL = "#1F4B4B";
const MUSTARD = "#DDA83A";
const TERRA = "#A94B2F";
const OLIVE = "#5C7148";
const ON_DARK = "#FFF7EF";

const F_BITTER = "var(--font-bitter), Georgia, serif";
const F_KARLA = "var(--font-karla), system-ui, sans-serif";
const F_MONO = "var(--font-space-mono), ui-monospace, monospace";

const CSS = `
.adm { background:${CREAM}; color:${BODY}; font-family:${F_KARLA}; min-height:100dvh; }
.adm *:focus-visible { outline:2px solid ${INK}; outline-offset:2px; }
.adm button { cursor:pointer; font-family:${F_KARLA}; }
.adm input, .adm textarea, .adm select { font-family:${F_KARLA}; font-size:14px; }

.adm-login { min-height:100dvh; display:flex; align-items:center; justify-content:center; padding:24px; }
.adm-login-box { width:100%; max-width:360px; border:2px solid ${INK}; background:${TEAL}; padding:32px 28px; }
.adm-login-box h1 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:22px; color:${ON_DARK}; }
.adm-login-box p { margin:8px 0 20px; font-size:13.5px; color:rgba(255,247,239,.75); }
.adm-login-box input { width:100%; box-sizing:border-box; border:2px solid ${INK}; padding:13px 14px; background:${CREAM}; color:${INK}; }
.adm-login-box button { width:100%; margin-top:12px; border:none; background:${INK}; color:${ON_DARK}; padding:14px; font-family:${F_MONO}; font-weight:700; font-size:12px; letter-spacing:.12em; text-transform:uppercase; }
.adm-login-err { margin:12px 0 0; padding:10px 12px; background:${TERRA}; color:${ON_DARK}; font-size:13px; }

.adm-topbar { position:sticky; top:0; z-index:10; display:flex; align-items:center; gap:12px; background:${INK}; color:${ON_DARK}; padding:14px 20px; }
.adm-topbar h1 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:17px; }
.adm-topbar .sp { flex:1; }
.adm-topbar button, .adm-topbar a { border:none; background:transparent; color:${ON_DARK}; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; }

.adm-body { max-width:1200px; margin:0 auto; padding:24px 20px 80px; display:grid; grid-template-columns:280px 1fr; gap:24px; align-items:start; }
@media (max-width:900px) { .adm-body { grid-template-columns:1fr; } }

.adm-list { border:2px solid ${INK}; background:${CREAM}; }
.adm-list-hd { display:flex; align-items:center; gap:8px; padding:12px 14px; background:${WARM}; border-bottom:2px solid ${INK}; }
.adm-list-hd span { font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:${MUTED}; }
.adm-list-hd .sp { flex:1; }
.adm-newbtn { border:2px solid ${INK}; background:${MUSTARD}; color:${INK}; padding:7px 10px; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.06em; }
.adm-row { display:block; width:100%; text-align:left; border:none; border-bottom:1.5px solid ${WARM}; background:${CREAM}; padding:12px 14px; }
.adm-row:last-child { border-bottom:none; }
.adm-row.active-sel { background:${MUSTARD}; }
.adm-row .num { margin:0; font-family:${F_MONO}; font-weight:700; font-size:12px; color:${INK}; }
.adm-row .name { margin:3px 0 0; font-size:12.5px; color:${MUTED}; }
.adm-row .badge { display:inline-block; margin-top:6px; font-family:${F_MONO}; font-size:9px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:2px 6px; }
.adm-row .badge.on { background:${OLIVE}; color:${ON_DARK}; }
.adm-row .badge.off { background:${MUTED}; color:${ON_DARK}; }
.adm-empty { padding:24px 14px; font-size:13px; color:${MUTED}; text-align:center; }

.adm-form { border:2px solid ${INK}; background:${CREAM}; }
.adm-form-hd { display:flex; flex-wrap:wrap; align-items:center; gap:12px; padding:16px 20px; background:${TEAL}; }
.adm-form-hd h2 { margin:0; font-family:${F_BITTER}; font-weight:800; font-size:19px; color:${ON_DARK}; }
.adm-form-hd .sp { flex:1; }
.adm-toggle { display:inline-flex; align-items:center; gap:8px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:${ON_DARK}; }
.adm-save { border:none; background:${MUSTARD}; color:${INK}; padding:11px 18px; font-family:${F_MONO}; font-weight:700; font-size:11.5px; letter-spacing:.1em; text-transform:uppercase; }
.adm-save:disabled { opacity:.6; }
.adm-orders-link { border:1px solid ${ON_DARK}; color:${ON_DARK}; padding:8px 10px; font-family:${F_MONO}; font-size:10px; font-weight:700; text-decoration:none; text-transform:uppercase; }
.adm-msg { margin:0; padding:10px 20px; font-size:13px; font-family:${F_MONO}; }
.adm-msg.ok { background:${OLIVE}; color:${ON_DARK}; }
.adm-msg.err { background:${TERRA}; color:${ON_DARK}; }

.adm-section { padding:20px; border-top:2px solid ${INK}; }
.adm-section h3 { margin:0 0 14px; font-family:${F_MONO}; font-weight:700; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:${MUTED}; }
.adm-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:12px; }
@media (max-width:560px) { .adm-grid { grid-template-columns:1fr; } }
.adm-field { display:flex; flex-direction:column; gap:5px; }
.adm-field.full { grid-column:1 / -1; }
.adm-field label { font-family:${F_MONO}; font-weight:700; font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:${MUTED}; }
.adm-field input, .adm-field select, .adm-field textarea { border:1.5px solid ${MUTED}; background:#fff; color:${INK}; padding:9px 10px; }
.adm-field textarea { resize:vertical; min-height:72px; font-family:${F_KARLA}; }

.adm-images { display:grid; grid-template-columns:repeat(auto-fill, minmax(110px,1fr)); gap:10px; margin-top:12px; }
.adm-img { position:relative; aspect-ratio:1; border:1.5px solid ${MUTED}; overflow:hidden; }
.adm-img img { width:100%; height:100%; object-fit:cover; display:block; }
.adm-img button { position:absolute; top:4px; right:4px; border:none; background:${INK}; color:${ON_DARK}; width:22px; height:22px; font-size:12px; line-height:1; }
.adm-upload { display:inline-flex; align-items:center; gap:8px; margin-top:12px; border:1.5px dashed ${MUTED}; padding:12px 14px; font-size:12.5px; color:${MUTED}; }
.adm-upload input { display:none; }
.adm-upload label { cursor:pointer; font-family:${F_MONO}; font-weight:700; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; color:${TEAL}; }
.adm-topbar { display:none; }
`;

/* ── form-state helpers ─────────────────────────────────────────── */
function lotToForm(lot: CoffeeLot | null): CoffeeLotInput {
  if (!lot) return { ...EMPTY_LOT_INPUT };
  const { id: _id, created_at: _c, updated_at: _u, ...rest } = lot;
  void _id;
  void _c;
  void _u;
  return {
    ...rest,
    images: Array.isArray(rest.images) ? rest.images : [],
  };
}

function textVal(v: string | null): string {
  return v ?? "";
}

interface TextField {
  key: keyof CoffeeLotInput;
  label: string;
  type?: "text" | "date" | "textarea" | "select";
  options?: string[];
}

const SECTIONS: { title: string; fields: TextField[] }[] = [
  {
    title: "Produkt",
    fields: [
      { key: "product_name", label: "Produktnavn" },
      { key: "grind", label: "Format", type: "select", options: ["Hele bønner", "Malt"] },
      { key: "net_weight", label: "Nettovekt" },
      { key: "roast_degree", label: "Brenningsgrad" },
      { key: "roast_date", label: "Brennedato", type: "date" },
      { key: "best_before", label: "Best før", type: "date" },
    ],
  },
  {
    title: "Opprinnelse",
    fields: [
      { key: "country", label: "Land" },
      { key: "region", label: "Region / departement" },
      { key: "municipality", label: "Kommune" },
      { key: "farm", label: "Gård" },
      { key: "producer", label: "Produsent" },
      { key: "altitude", label: "Høyde over havet" },
      { key: "harvest_period", label: "Innhøstingsår / periode" },
    ],
  },
  {
    title: "Kaffen",
    fields: [
      { key: "species", label: "Art" },
      { key: "variety", label: "Kaffesort" },
      { key: "grade", label: "Klassifisering", type: "select", options: ["Excelso", "Especial"] },
      { key: "process", label: "Prosess" },
      { key: "screen_size", label: "Siktestørrelse" },
    ],
  },
  {
    title: "Kvalitetskontroll",
    fields: [
      { key: "moisture", label: "Fuktighet" },
      { key: "water_activity", label: "Vannaktivitet" },
      { key: "defects", label: "Defekter" },
      { key: "lab_notes", label: "Laboratoriekontroller" },
      { key: "cupping_score", label: "Cuppingpoeng" },
      { key: "flavour_profile", label: "Smaksprofil", type: "textarea" },
    ],
  },
  {
    title: "Fra Colombia til Norge",
    fields: [
      { key: "exporter", label: "Eksportør" },
      { key: "export_date", label: "Eksportdato", type: "date" },
      { key: "importer", label: "Importør" },
      { key: "received_date_norway", label: "Mottaksdato i Norge", type: "date" },
    ],
  },
  {
    title: "Brenning og pakking",
    fields: [
      { key: "roasted_by", label: "Brent hos" },
      { key: "packing_date", label: "Pakkedato", type: "date" },
      { key: "production_notes", label: "Produksjonsopplysninger", type: "textarea" },
    ],
  },
];

export default function AdminSporbarhetClient() {
  return <Dashboard onLoggedOut={() => undefined} />;
}

/* The former standalone login remains in version history; authentication is
   now enforced by the shared /admin server layout. */
/*
function Login({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/sporbarhet/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Kunne ikke logge inn.");
        return;
      }
      onLoggedIn();
    } catch {
      setError("Ingen kontakt med serveren.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm">
      <style>{CSS}</style>
      <div className="adm-login">
        <form className="adm-login-box" onSubmit={handleSubmit}>
          <h1>Sporbarhet · administrasjon</h1>
          <p>Logg inn for å opprette og redigere kaffepartier.</p>
          <input
            type="password"
            aria-label="Passord"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={busy || !password}>
            {busy ? "Logger inn …" : "Logg inn"}
          </button>
          {error && <p className="adm-login-err">{error}</p>}
        </form>
      </div>
    </div>
  );
}
*/

function Dashboard({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [lots, setLots] = useState<CoffeeLot[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<CoffeeLotInput>(() => lotToForm(null));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const refreshList = useMemo(
    () => async () => {
      setLoadingList(true);
      try {
        const res = await fetch("/api/admin/sporbarhet/lots");
        const data = await res.json();
        if (res.ok) setLots(data.lots ?? []);
      } finally {
        setLoadingList(false);
      }
    },
    []
  );

  useEffect(() => {
    Promise.resolve().then(() => {
      refreshList();
    });
  }, [refreshList]);

  function selectLot(id: string | "new") {
    setMessage(null);
    setSelectedId(id);
    if (id === "new") {
      setForm(lotToForm(null));
    } else {
      const lot = lots.find((l) => l.id === id) ?? null;
      setForm(lotToForm(lot));
    }
  }

  function setField<K extends keyof CoffeeLotInput>(key: K, value: CoffeeLotInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogout() {
    await fetch("/api/admin/sporbarhet/auth", { method: "DELETE" });
    onLoggedOut();
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage(null);
    try {
      const uploaded: LotImage[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/sporbarhet/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setMessage({ kind: "err", text: data?.error || "Kunne ikke laste opp bildet." });
          continue;
        }
        uploaded.push({ id: data.id, url: data.url });
      }
      if (uploaded.length > 0) {
        setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
      }
    } finally {
      setUploading(false);
    }
  }

  function removeImage(id: string) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img.id !== id) }));
  }

  async function handleSave() {
    if (!form.lot_number.trim()) {
      setMessage({ kind: "err", text: "Partinummer må fylles ut." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const isNew = selectedId === "new";
      const url = isNew
        ? "/api/admin/sporbarhet/lots"
        : `/api/admin/sporbarhet/lots/${selectedId}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "err", text: data?.error || "Kunne ikke lagre." });
        return;
      }
      setMessage({ kind: "ok", text: "Lagret." });
      await refreshList();
      setSelectedId(data.lot.id);
      setForm(lotToForm(data.lot));
    } catch {
      setMessage({ kind: "err", text: "Ingen kontakt med serveren." });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive() {
    if (selectedId === "new" || !selectedId) {
      setField("active", !form.active);
      return;
    }
    const nextActive = !form.active;
    setField("active", nextActive);
    try {
      await fetch(`/api/admin/sporbarhet/lots/${selectedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
      await refreshList();
    } catch {
      // feltet er allerede oppdatert lokalt — lagre-knappen sender full payload uansett
    }
  }

  return (
    <div className="adm">
      <style>{CSS}</style>

      <div className="adm-topbar">
        <h1>Sporbarhet · administrasjon</h1>
        <span className="sp" />
        <a href="/sporbarhet" target="_blank" rel="noreferrer">
          Se /sporbarhet ↗
        </a>
        <button onClick={handleLogout}>Logg ut</button>
      </div>

      <div className="adm-body">
        {/* ── LOT LIST ─────────────────────────────────────── */}
        <div className="adm-list">
          <div className="adm-list-hd">
            <span>{loadingList ? "Laster …" : `${lots.length} partier`}</span>
            <span className="sp" />
            <button className="adm-newbtn" onClick={() => selectLot("new")}>
              + Nytt parti
            </button>
          </div>
          {lots.length === 0 && !loadingList ? (
            <div className="adm-empty">Ingen partier registrert ennå.</div>
          ) : (
            lots.map((lot) => (
              <button
                key={lot.id}
                className={`adm-row${selectedId === lot.id ? " active-sel" : ""}`}
                onClick={() => selectLot(lot.id)}
              >
                <p className="num">{lot.lot_number}</p>
                {lot.product_name && <p className="name">{lot.product_name}</p>}
                <span className={`badge ${lot.active ? "on" : "off"}`}>
                  {lot.active ? "Aktiv" : "Deaktivert"}
                </span>
              </button>
            ))
          )}
        </div>

        {/* ── FORM ─────────────────────────────────────────── */}
        {selectedId ? (
          <div className="adm-form">
            <div className="adm-form-hd">
              <h2>{selectedId === "new" ? "Nytt parti" : form.lot_number || "Rediger parti"}</h2>
              <span className="sp" />
              {selectedId !== "new" && (
                <a className="adm-orders-link" href={`/admin/sporbarhet/lotes/${selectedId}`}>
                  Pedidos asignados
                </a>
              )}
              <label className="adm-toggle">
                <input type="checkbox" checked={form.active} onChange={toggleActive} />
                Aktiv (synlig på /sporbarhet)
              </label>
              <button className="adm-save" onClick={handleSave} disabled={saving}>
                {saving ? "Lagrer …" : "Lagre"}
              </button>
            </div>
            {message && <p className={`adm-msg ${message.kind}`}>{message.text}</p>}

            <div className="adm-section">
              <h3>Parti</h3>
              <div className="adm-grid">
                <div className="adm-field">
                  <label htmlFor="lot_number">Partinummer</label>
                  <input
                    id="lot_number"
                    value={form.lot_number}
                    onChange={(e) => setField("lot_number", e.target.value)}
                    placeholder="KG-261015-01"
                  />
                </div>
              </div>
            </div>

            {SECTIONS.map((section) => (
              <div className="adm-section" key={section.title}>
                <h3>{section.title}</h3>
                <div className="adm-grid">
                  {section.fields.map((f) => (
                    <div
                      className={`adm-field${f.type === "textarea" ? " full" : ""}`}
                      key={String(f.key)}
                    >
                      <label htmlFor={String(f.key)}>{f.label}</label>
                      {f.type === "select" ? (
                        <select
                          id={String(f.key)}
                          value={textVal(form[f.key] as string | null)}
                          onChange={(e) => setField(f.key, e.target.value)}
                        >
                          <option value="">—</option>
                          {f.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt === "Malt" ? "Malt kaffe" : opt}
                            </option>
                          ))}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea
                          id={String(f.key)}
                          value={textVal(form[f.key] as string | null)}
                          onChange={(e) => setField(f.key, e.target.value)}
                        />
                      ) : (
                        <input
                          id={String(f.key)}
                          type={f.type === "date" ? "date" : "text"}
                          value={textVal(form[f.key] as string | null)}
                          onChange={(e) => setField(f.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="adm-section">
              <h3>Historien bak kaffen</h3>
              <div className="adm-grid">
                <div className="adm-field full">
                  <label htmlFor="story_text">Kort tekst</label>
                  <textarea
                    id="story_text"
                    value={textVal(form.story_text)}
                    onChange={(e) => setField("story_text", e.target.value)}
                  />
                </div>
                <div className="adm-field full">
                  <label htmlFor="story_video_url">Video-URL (valgfri innbyggingslenke)</label>
                  <input
                    id="story_video_url"
                    value={textVal(form.story_video_url)}
                    onChange={(e) => setField("story_video_url", e.target.value)}
                    placeholder="https://www.youtube.com/embed/…"
                  />
                </div>
              </div>

              {form.images.length > 0 && (
                <div className="adm-images">
                  {form.images.map((img) => (
                    <div className="adm-img" key={img.id}>
                      <Image src={img.url} alt="" fill={false} width={160} height={160} unoptimized />
                      <button type="button" onClick={() => removeImage(img.id)} aria-label="Fjern bilde">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="adm-upload">
                <label htmlFor="image-upload">
                  {uploading ? "Laster opp …" : "+ Last opp bilder"}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  multiple
                  onChange={(e) => handleUpload(e.target.files)}
                  disabled={uploading}
                />
                <span>PNG, JPEG, WEBP eller GIF — maks 10 MB per bilde.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="adm-form">
            <div className="adm-empty">Velg et parti i listen, eller opprett et nytt.</div>
          </div>
        )}
      </div>
    </div>
  );
}
