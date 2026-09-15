import "server-only";

import type {
  CategoryInput,
  ProductInput,
  ProductVariantInput,
} from "@/types/catalog";
import { DATABASE_INT_MAX } from "@/lib/numericLimits";

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: readonly string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function requiredText(
  body: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
): ValidationResult<string> {
  const value = body[key];
  if (typeof value !== "string" || !value.trim()) {
    return { ok: false, error: `${label} es obligatorio.` };
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    return {
      ok: false,
      error: `${label} no puede superar ${maxLength} caracteres.`,
    };
  }
  return { ok: true, data: trimmed };
}

function booleanValue(
  body: Record<string, unknown>,
  key: string,
  label: string,
): ValidationResult<boolean> {
  if (typeof body[key] !== "boolean") {
    return { ok: false, error: `${label} debe ser verdadero o falso.` };
  }
  return { ok: true, data: body[key] };
}

function nullableUuid(
  body: Record<string, unknown>,
  key: string,
  label: string,
): ValidationResult<string | null> {
  const value = body[key];
  if (value === null || value === "" || value === undefined) {
    return { ok: true, data: null };
  }
  if (typeof value !== "string" || !UUID_PATTERN.test(value)) {
    return { ok: false, error: `${label} no es válido.` };
  }
  return { ok: true, data: value };
}

function positiveUuid(
  body: Record<string, unknown>,
  key: string,
  label: string,
): ValidationResult<string> {
  const value = body[key];
  if (typeof value !== "string" || !UUID_PATTERN.test(value)) {
    return { ok: false, error: `${label} no es válido.` };
  }
  return { ok: true, data: value };
}

function nullableText(
  body: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
): ValidationResult<string | null> {
  const value = body[key];
  if (value === null || value === "" || value === undefined) {
    return { ok: true, data: null };
  }
  if (typeof value !== "string") {
    return { ok: false, error: `${label} no es válido.` };
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    return {
      ok: false,
      error: `${label} no puede superar ${maxLength} caracteres.`,
    };
  }
  return { ok: true, data: trimmed || null };
}

function integerValue(
  body: Record<string, unknown>,
  key: string,
  label: string,
  options: { nullable?: boolean; minimum?: number } = {},
): ValidationResult<number | null> {
  const value = body[key];
  if (
    options.nullable &&
    (value === null || value === "" || value === undefined)
  ) {
    return { ok: true, data: null };
  }
  if (!Number.isSafeInteger(value)) {
    return { ok: false, error: `${label} debe ser un número entero.` };
  }
  const numberValue = value as number;
  if (numberValue < (options.minimum ?? 0)) {
    return {
      ok: false,
      error: `${label} debe ser igual o mayor que ${options.minimum ?? 0}.`,
    };
  }
  if (numberValue > DATABASE_INT_MAX) {
    return {
      ok: false,
      error: `${label} supera el máximo permitido.`,
    };
  }
  return { ok: true, data: numberValue };
}

function validateSlug(slug: string): ValidationResult<string> {
  if (!SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      error:
        "El slug sólo puede contener letras minúsculas, números y guiones simples.",
    };
  }
  return { ok: true, data: slug };
}

export function validateCategoryInput(
  value: unknown,
): ValidationResult<CategoryInput> {
  if (!isRecord(value) || !hasOnlyKeys(value, ["name", "slug", "active"])) {
    return { ok: false, error: "Solicitud no válida." };
  }

  const name = requiredText(value, "name", "El nombre", 120);
  if (!name.ok) return name;
  const slugText = requiredText(value, "slug", "El slug", 120);
  if (!slugText.ok) return slugText;
  const slug = validateSlug(slugText.data);
  if (!slug.ok) return slug;
  const active = booleanValue(value, "active", "El estado activo");
  if (!active.ok) return active;

  return { ok: true, data: { name: name.data, slug: slug.data, active: active.data } };
}

export function validateProductInput(
  value: unknown,
): ValidationResult<ProductInput> {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, [
      "categoryId",
      "name",
      "slug",
      "description",
      "isFeatured",
      "isPublished",
    ])
  ) {
    return { ok: false, error: "Solicitud no válida." };
  }

  const categoryId = nullableUuid(value, "categoryId", "La categoría");
  if (!categoryId.ok) return categoryId;
  const name = requiredText(value, "name", "El nombre", 180);
  if (!name.ok) return name;
  const slugText = requiredText(value, "slug", "El slug", 180);
  if (!slugText.ok) return slugText;
  const slug = validateSlug(slugText.data);
  if (!slug.ok) return slug;
  const description = requiredText(value, "description", "La descripción", 5000);
  if (!description.ok) return description;
  const isFeatured = booleanValue(
    value,
    "isFeatured",
    "El estado destacado",
  );
  if (!isFeatured.ok) return isFeatured;
  const isPublished = booleanValue(
    value,
    "isPublished",
    "El estado publicado",
  );
  if (!isPublished.ok) return isPublished;

  return {
    ok: true,
    data: {
      categoryId: categoryId.data,
      name: name.data,
      slug: slug.data,
      description: description.data,
      isFeatured: isFeatured.data,
      isPublished: isPublished.data,
    },
  };
}

export function validateProductVariantInput(
  value: unknown,
): ValidationResult<ProductVariantInput> {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, [
      "productId",
      "sku",
      "name",
      "grind",
      "weightGrams",
      "priceOre",
      "inventory",
      "active",
    ])
  ) {
    return { ok: false, error: "Solicitud no válida." };
  }

  const productId = positiveUuid(value, "productId", "El producto");
  if (!productId.ok) return productId;
  const sku = requiredText(value, "sku", "El SKU", 120);
  if (!sku.ok) return sku;
  const name = requiredText(value, "name", "El nombre", 180);
  if (!name.ok) return name;
  const grind = nullableText(value, "grind", "La molienda", 120);
  if (!grind.ok) return grind;
  const weightGrams = integerValue(value, "weightGrams", "El peso", {
    nullable: true,
    minimum: 1,
  });
  if (!weightGrams.ok) return weightGrams;
  const priceOre = integerValue(value, "priceOre", "El precio en øre", {
    minimum: 0,
  });
  if (!priceOre.ok) return priceOre;
  if (priceOre.data === null) {
    return { ok: false, error: "El precio en øre es obligatorio." };
  }
  const inventory = integerValue(value, "inventory", "El inventario", {
    minimum: 0,
  });
  if (!inventory.ok) return inventory;
  if (inventory.data === null) {
    return { ok: false, error: "El inventario es obligatorio." };
  }
  const active = booleanValue(value, "active", "El estado activo");
  if (!active.ok) return active;
  if (active.data && priceOre.data === 0) {
    return {
      ok: false,
      error: "Una variante activa debe tener un precio mayor que 0 øre.",
    };
  }

  return {
    ok: true,
    data: {
      productId: productId.data,
      sku: sku.data,
      name: name.data,
      grind: grind.data,
      weightGrams: weightGrams.data,
      priceOre: priceOre.data,
      inventory: inventory.data,
      active: active.data,
    },
  };
}

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}
