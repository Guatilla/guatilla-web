"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  AdminCatalog,
  AdminCategory,
  AdminProduct,
  AdminProductVariant,
} from "@/types/catalog";

interface Props {
  initialCatalog: AdminCatalog;
  initialError: string | null;
}

type Message = { kind: "ok" | "error"; text: string } | null;

const EMPTY_CATEGORY = { name: "", slug: "", active: true };
const EMPTY_PRODUCT = {
  categoryId: "",
  name: "",
  slug: "",
  description: "",
  isFeatured: false,
  isPublished: false,
};
const EMPTY_VARIANT = {
  productId: "",
  sku: "",
  name: "",
  grind: "",
  weightGrams: "",
  priceOre: "",
  inventory: "",
  active: true,
};

const CSS = `
.catalog-admin { color:#2E2018; }
.catalog-admin * { box-sizing:border-box; }
.catalog-admin button, .catalog-admin input, .catalog-admin select, .catalog-admin textarea { font:inherit; }
.catalog-admin button { cursor:pointer; }
.catalog-admin button:disabled { cursor:not-allowed; opacity:.55; }
.ca-head h1 { margin:.35rem 0 0; font-family:var(--font-bitter),Georgia,serif; font-size:clamp(2.25rem,5vw,3.25rem); line-height:1; font-weight:800; }
.ca-eyebrow { margin:0; color:#A94B2F; font-family:var(--font-space-mono),monospace; font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
.ca-lead { max-width:66ch; margin:.85rem 0 0; color:rgba(74,56,44,.75); font-size:14px; line-height:1.6; }
.ca-message { margin:1.25rem 0 0; border:2px solid #2E2018; padding:.8rem 1rem; font-size:13px; }
.ca-message.ok { background:#5C7148; color:#FFF7EF; }
.ca-message.error { background:#A94B2F; color:#FFF7EF; }
.ca-section { margin-top:2rem; border:2px solid #2E2018; background:#FDF1E5; }
.ca-section-head { display:flex; flex-wrap:wrap; align-items:center; gap:12px; border-bottom:2px solid #2E2018; background:#1F4B4B; padding:14px 16px; color:#FFF7EF; }
.ca-section-head h2 { margin:0; font-family:var(--font-bitter),Georgia,serif; font-size:21px; font-weight:800; }
.ca-section-head p { margin:0; font-size:12px; opacity:.72; }
.ca-section-head .spacer { flex:1; }
.ca-new { border:2px solid #2E2018; background:#DDA83A; padding:9px 12px; color:#2E2018; font-family:var(--font-space-mono),monospace!important; font-size:10px!important; font-weight:700!important; letter-spacing:.08em; text-transform:uppercase; }
.ca-layout { display:grid; grid-template-columns:minmax(210px,300px) minmax(0,1fr); align-items:start; }
.ca-list { border-right:2px solid #2E2018; }
.ca-row { display:block; width:100%; border:0; border-bottom:1px solid #D8C8B6; background:#FDF1E5; padding:13px 14px; text-align:left; }
.ca-row:last-child { border-bottom:0; }
.ca-row.selected { background:#DDA83A; }
.ca-row strong { display:block; font-family:var(--font-bitter),Georgia,serif; font-size:15px; }
.ca-row span { display:block; margin-top:3px; color:rgba(74,56,44,.68); font-size:11px; }
.ca-empty { padding:24px 16px; color:rgba(74,56,44,.65); font-size:13px; }
.ca-form { padding:18px; }
.ca-form h3 { margin:0 0 16px; font-family:var(--font-bitter),Georgia,serif; font-size:19px; font-weight:800; }
.ca-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:13px; }
.ca-field { display:flex; min-width:0; flex-direction:column; gap:6px; }
.ca-field.full { grid-column:1/-1; }
.ca-field label, .ca-check { font-family:var(--font-space-mono),monospace; font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; }
.ca-field input, .ca-field select, .ca-field textarea { width:100%; border:1.5px solid #6B5A4E; background:#fff; padding:10px 11px; color:#2E2018; }
.ca-field textarea { min-height:120px; resize:vertical; }
.ca-checks { display:flex; flex-wrap:wrap; gap:16px; grid-column:1/-1; }
.ca-check { display:inline-flex; align-items:center; gap:8px; }
.ca-check input { width:17px; height:17px; accent-color:#1F4B4B; }
.ca-actions { display:flex; justify-content:flex-end; grid-column:1/-1; margin-top:5px; }
.ca-save { border:0; background:#2E2018; padding:12px 20px; color:#FFF7EF; font-family:var(--font-space-mono),monospace!important; font-size:11px!important; font-weight:700!important; letter-spacing:.1em; text-transform:uppercase; }
@media(max-width:760px){.ca-layout{grid-template-columns:1fr}.ca-list{border-right:0;border-bottom:2px solid #2E2018;max-height:260px;overflow:auto}.ca-grid{grid-template-columns:1fr}.ca-field.full,.ca-checks,.ca-actions{grid-column:auto}.ca-actions .ca-save{width:100%}}
`;

export default function AdminCatalogClient({ initialCatalog, initialError }: Props) {
  const router = useRouter();
  const [catalog, setCatalog] = useState(initialCatalog);
  const [message, setMessage] = useState<Message>(
    initialError ? { kind: "error", text: initialError } : null,
  );
  const [busy, setBusy] = useState(false);

  const [categoryId, setCategoryId] = useState<string | "new" | null>(null);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY);

  const [productId, setProductId] = useState<string | "new" | null>(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);

  const [variantId, setVariantId] = useState<string | "new" | null>(null);
  const [variantForm, setVariantForm] = useState(EMPTY_VARIANT);

  const selectedProduct = useMemo(
    () =>
      productId && productId !== "new"
        ? catalog.products.find((product) => product.id === productId) ?? null
        : null,
    [catalog.products, productId],
  );

  async function refreshCatalog() {
    const response = await fetch("/api/admin/catalogo", { cache: "no-store" });
    if (response.status === 401) {
      router.push("/admin/login");
      return null;
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || "No se pudo actualizar el catálogo.");
    setCatalog(data);
    return data as AdminCatalog;
  }

  async function save(path: string, method: "POST" | "PATCH", body: unknown) {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No se pudo guardar.");
      await refreshCatalog();
      setMessage({ kind: "ok", text: "Cambios guardados." });
      return true;
    } catch (error) {
      setMessage({
        kind: "error",
        text: error instanceof Error ? error.message : "No se pudo guardar.",
      });
      return false;
    } finally {
      setBusy(false);
    }
  }

  function selectCategory(category: AdminCategory) {
    setCategoryId(category.id);
    setCategoryForm({ name: category.name, slug: category.slug, active: category.active });
    setMessage(null);
  }

  function selectProduct(product: AdminProduct) {
    setProductId(product.id);
    setProductForm({
      categoryId: product.categoryId ?? "",
      name: product.name,
      slug: product.slug,
      description: product.description,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
    });
    setVariantId(null);
    setVariantForm({ ...EMPTY_VARIANT, productId: product.id });
    setMessage(null);
  }

  function selectVariant(variant: AdminProductVariant) {
    setVariantId(variant.id);
    setVariantForm({
      productId: variant.productId,
      sku: variant.sku,
      name: variant.name,
      grind: variant.grind ?? "",
      weightGrams: variant.weightGrams?.toString() ?? "",
      priceOre: variant.priceOre.toString(),
      inventory: variant.inventory.toString(),
      active: variant.active,
    });
    setMessage(null);
  }

  async function submitCategory(event: React.FormEvent) {
    event.preventDefault();
    const isNew = categoryId === "new";
    const ok = await save(
      isNew ? "/api/admin/catalogo/categories" : `/api/admin/catalogo/categories/${categoryId}`,
      isNew ? "POST" : "PATCH",
      categoryForm,
    );
    if (ok && isNew) {
      setCategoryId(null);
      setCategoryForm(EMPTY_CATEGORY);
    }
  }

  async function submitProduct(event: React.FormEvent) {
    event.preventDefault();
    const isNew = productId === "new";
    const ok = await save(
      isNew ? "/api/admin/catalogo/products" : `/api/admin/catalogo/products/${productId}`,
      isNew ? "POST" : "PATCH",
      { ...productForm, categoryId: productForm.categoryId || null },
    );
    if (ok && isNew) {
      setProductId(null);
      setProductForm(EMPTY_PRODUCT);
    }
  }

  async function submitVariant(event: React.FormEvent) {
    event.preventDefault();
    const isNew = variantId === "new";
    const ok = await save(
      isNew ? "/api/admin/catalogo/variants" : `/api/admin/catalogo/variants/${variantId}`,
      isNew ? "POST" : "PATCH",
      {
        ...variantForm,
        grind: variantForm.grind.trim() || null,
        weightGrams: variantForm.weightGrams === "" ? null : Number(variantForm.weightGrams),
        priceOre: Number(variantForm.priceOre),
        inventory: Number(variantForm.inventory),
      },
    );
    if (ok && isNew) {
      setVariantId(null);
      setVariantForm({ ...EMPTY_VARIANT, productId: variantForm.productId });
    }
  }

  return (
    <div className="catalog-admin">
      <style>{CSS}</style>
      <header className="ca-head">
        <p className="ca-eyebrow">Cloud SQL · fuente oficial</p>
        <h1>Catálogo</h1>
        <p className="ca-lead">
          Crea primero las categorías y productos; después añade sus variantes con SKU, precio entero en øre e inventario real.
        </p>
      </header>

      {message && <p className={`ca-message ${message.kind}`} role="status">{message.text}</p>}

      <section className="ca-section">
        <div className="ca-section-head">
          <div><h2>Categorías</h2><p>{catalog.categories.length} registradas</p></div>
          <span className="spacer" />
          <button type="button" className="ca-new" onClick={() => { setCategoryId("new"); setCategoryForm(EMPTY_CATEGORY); setMessage(null); }}>+ Nueva categoría</button>
        </div>
        <div className="ca-layout">
          <div className="ca-list">
            {catalog.categories.length === 0 ? <p className="ca-empty">No hay categorías.</p> : catalog.categories.map((category) => (
              <button type="button" key={category.id} className={`ca-row${categoryId === category.id ? " selected" : ""}`} onClick={() => selectCategory(category)}>
                <strong>{category.name}</strong><span>/{category.slug} · {category.active ? "activa" : "inactiva"}</span>
              </button>
            ))}
          </div>
          <form className="ca-form" onSubmit={submitCategory}>
            <h3>{categoryId === "new" ? "Nueva categoría" : categoryId ? "Editar categoría" : "Selecciona una categoría"}</h3>
            {categoryId && <div className="ca-grid">
              <Field label="Nombre"><input required maxLength={120} value={categoryForm.name} onChange={(event) => setCategoryForm((current) => ({ ...current, name: event.target.value }))} /></Field>
              <Field label="Slug"><input required maxLength={120} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={categoryForm.slug} onChange={(event) => setCategoryForm((current) => ({ ...current, slug: event.target.value }))} /></Field>
              <div className="ca-checks"><Check label="Categoría activa" checked={categoryForm.active} onChange={(active) => setCategoryForm((current) => ({ ...current, active }))} /></div>
              <Actions busy={busy} />
            </div>}
          </form>
        </div>
      </section>

      <section className="ca-section">
        <div className="ca-section-head">
          <div><h2>Productos</h2><p>{catalog.products.length} registrados</p></div>
          <span className="spacer" />
          <button type="button" className="ca-new" onClick={() => { setProductId("new"); setProductForm(EMPTY_PRODUCT); setVariantId(null); setMessage(null); }}>+ Nuevo producto</button>
        </div>
        <div className="ca-layout">
          <div className="ca-list">
            {catalog.products.length === 0 ? <p className="ca-empty">No hay productos. No se mostrará ningún producto ficticio en la tienda.</p> : catalog.products.map((product) => (
              <button type="button" key={product.id} className={`ca-row${productId === product.id ? " selected" : ""}`} onClick={() => selectProduct(product)}>
                <strong>{product.name}</strong><span>/{product.slug} · {product.isPublished ? "publicado" : "borrador"} · {product.variants.length} variantes</span>
              </button>
            ))}
          </div>
          <form className="ca-form" onSubmit={submitProduct}>
            <h3>{productId === "new" ? "Nuevo producto" : productId ? "Editar producto" : "Selecciona un producto"}</h3>
            {productId && <div className="ca-grid">
              <Field label="Nombre"><input required maxLength={180} value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} /></Field>
              <Field label="Slug"><input required maxLength={180} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={productForm.slug} onChange={(event) => setProductForm((current) => ({ ...current, slug: event.target.value }))} /></Field>
              <Field label="Categoría"><select value={productForm.categoryId} onChange={(event) => setProductForm((current) => ({ ...current, categoryId: event.target.value }))}><option value="">Sin categoría</option>{catalog.categories.map((category) => <option key={category.id} value={category.id}>{category.name}{category.active ? "" : " (inactiva)"}</option>)}</select></Field>
              <Field label="Descripción" full><textarea required maxLength={5000} value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} /></Field>
              <div className="ca-checks">
                <Check label="Producto destacado" checked={productForm.isFeatured} onChange={(isFeatured) => setProductForm((current) => ({ ...current, isFeatured }))} />
                <Check label="Producto publicado" checked={productForm.isPublished} onChange={(isPublished) => setProductForm((current) => ({ ...current, isPublished }))} />
              </div>
              <Actions busy={busy} />
            </div>}
          </form>
        </div>
      </section>

      <section className="ca-section">
        <div className="ca-section-head">
          <div><h2>Variantes</h2><p>{selectedProduct ? selectedProduct.name : "Selecciona un producto guardado"}</p></div>
          <span className="spacer" />
          <button type="button" className="ca-new" disabled={!selectedProduct} onClick={() => { if (!selectedProduct) return; setVariantId("new"); setVariantForm({ ...EMPTY_VARIANT, productId: selectedProduct.id }); setMessage(null); }}>+ Nueva variante</button>
        </div>
        <div className="ca-layout">
          <div className="ca-list">
            {!selectedProduct ? <p className="ca-empty">Selecciona un producto para gestionar sus variantes.</p> : selectedProduct.variants.length === 0 ? <p className="ca-empty">Este producto no tiene variantes.</p> : selectedProduct.variants.map((variant) => (
              <button type="button" key={variant.id} className={`ca-row${variantId === variant.id ? " selected" : ""}`} onClick={() => selectVariant(variant)}>
                <strong>{variant.name}</strong><span>{variant.sku} · {variant.priceOre} øre · inventario {variant.inventory} · {variant.active ? "activa" : "inactiva"}</span>
              </button>
            ))}
          </div>
          <form className="ca-form" onSubmit={submitVariant}>
            <h3>{variantId === "new" ? "Nueva variante" : variantId ? "Editar variante" : "Selecciona una variante"}</h3>
            {variantId && <div className="ca-grid">
              <Field label="Producto"><select required value={variantForm.productId} onChange={(event) => setVariantForm((current) => ({ ...current, productId: event.target.value }))}>{catalog.products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></Field>
              <Field label="Nombre de la variante"><input required maxLength={180} value={variantForm.name} onChange={(event) => setVariantForm((current) => ({ ...current, name: event.target.value }))} /></Field>
              <Field label="SKU"><input required maxLength={120} value={variantForm.sku} onChange={(event) => setVariantForm((current) => ({ ...current, sku: event.target.value }))} /></Field>
              <Field label="Tipo de molienda"><input maxLength={120} value={variantForm.grind} onChange={(event) => setVariantForm((current) => ({ ...current, grind: event.target.value }))} /></Field>
              <Field label="Peso (gramos)"><input type="number" min="1" step="1" value={variantForm.weightGrams} onChange={(event) => setVariantForm((current) => ({ ...current, weightGrams: event.target.value }))} /></Field>
              <Field label="Precio (øre)"><input required type="number" min={variantForm.active ? "1" : "0"} step="1" value={variantForm.priceOre} onChange={(event) => setVariantForm((current) => ({ ...current, priceOre: event.target.value }))} /></Field>
              <Field label="Inventario"><input required type="number" min="0" step="1" value={variantForm.inventory} onChange={(event) => setVariantForm((current) => ({ ...current, inventory: event.target.value }))} /></Field>
              <div className="ca-checks"><Check label="Variante activa" checked={variantForm.active} onChange={(active) => setVariantForm((current) => ({ ...current, active }))} /></div>
              <Actions busy={busy} />
            </div>}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, full = false, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return <label className={`ca-field${full ? " full" : ""}`}><span>{label}</span>{children}</label>;
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="ca-check"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}

function Actions({ busy }: { busy: boolean }) {
  return <div className="ca-actions"><button type="submit" className="ca-save" disabled={busy}>{busy ? "Guardando…" : "Guardar"}</button></div>;
}
