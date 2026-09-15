export interface StorefrontCatalogVariant {
  id: string;
  name: string;
  grind: string | null;
  weightGrams: number | null;
  priceOre: number;
  currency: "NOK";
  inStock: boolean;
}

export interface StorefrontCatalogProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string | null;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  variants: StorefrontCatalogVariant[];
}

export interface StorefrontCartLine {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  productDescription: string;
  variantName: string;
  grind: string | null;
  weightGrams: number | null;
  priceOre: number;
  currency: "NOK";
  image: string | null;
  inStock: boolean;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface AdminProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  grind: string | null;
  weightGrams: number | null;
  priceOre: number;
  currency: "NOK";
  inventory: number;
  active: boolean;
}

export interface AdminProduct {
  id: string;
  categoryId: string | null;
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isPublished: boolean;
  variants: AdminProductVariant[];
}

export interface AdminCatalog {
  categories: AdminCategory[];
  products: AdminProduct[];
}

export interface CategoryInput {
  name: string;
  slug: string;
  active: boolean;
}

export interface ProductInput {
  categoryId: string | null;
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface ProductVariantInput {
  productId: string;
  sku: string;
  name: string;
  grind: string | null;
  weightGrams: number | null;
  priceOre: number;
  inventory: number;
  active: boolean;
}

export interface AdminSummary {
  newOrders: number;
  pendingPayments: number;
  reviewPayments: number;
  paidAwaitingPreparation: number;
  preparingOrders: number;
  lowInventoryProducts: number;
}
