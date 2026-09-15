import "server-only";

import { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import type {
  AdminCatalog,
  AdminSummary,
  CategoryInput,
  ProductInput,
  ProductVariantInput,
  StorefrontCartLine,
  StorefrontCatalogProduct,
} from "@/types/catalog";

const LOW_INVENTORY_THRESHOLD = 5;

const publishedProductWhere = {
  isPublished: true,
  OR: [
    { categoryId: null },
    { category: { is: { active: true } } },
  ],
  variants: { some: { active: true } },
} satisfies Prisma.ProductWhereInput;

function firstImage(images: Prisma.JsonValue): string | null {
  if (!Array.isArray(images)) return null;

  for (const image of images) {
    const candidate =
      typeof image === "string"
        ? image
        : image && typeof image === "object" && !Array.isArray(image)
          ? image.url
          : null;

    if (
      typeof candidate === "string" &&
      (candidate.startsWith("/") || candidate.startsWith("https://"))
    ) {
      return candidate;
    }
  }

  return null;
}

type StorefrontProductRecord = Prisma.ProductGetPayload<{
  include: {
    category: true;
    variants: true;
  };
}>;

function toStorefrontProduct(
  product: StorefrontProductRecord,
): StorefrontCatalogProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    image: firstImage(product.images),
    isFeatured: product.isFeatured,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
        }
      : null,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      grind: variant.grind,
      weightGrams: variant.weightGrams,
      priceOre: variant.priceOre,
      currency: "NOK",
      inStock: variant.inventory > 0,
    })),
  };
}

const storefrontInclude = {
  category: true,
  variants: {
    where: { active: true },
    orderBy: [{ priceOre: "asc" }, { createdAt: "asc" }],
  },
} satisfies Prisma.ProductInclude;

export async function getPublishedCatalog(): Promise<StorefrontCatalogProduct[]> {
  const prisma = await getPrisma();
  const products = await prisma.product.findMany({
    where: publishedProductWhere,
    include: storefrontInclude,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "asc" }],
  });

  return products.map(toStorefrontProduct);
}

export async function getPublishedProductBySlug(
  slug: string,
): Promise<StorefrontCatalogProduct | null> {
  const prisma = await getPrisma();
  const product = await prisma.product.findFirst({
    where: { ...publishedProductWhere, slug },
    include: storefrontInclude,
  });

  return product ? toStorefrontProduct(product) : null;
}

export async function getStorefrontCartLines(
  requestedItems: Array<{ variantId: string; quantity: number }>,
): Promise<StorefrontCartLine[]> {
  const variantIds = requestedItems.map((item) => item.variantId);
  if (variantIds.length === 0) return [];
  const requestedQuantity = new Map(
    requestedItems.map((item) => [item.variantId, item.quantity]),
  );

  const prisma = await getPrisma();
  const variants = await prisma.productVariant.findMany({
    where: {
      id: { in: variantIds },
      active: true,
      product: { is: publishedProductWhere },
    },
    include: { product: true },
  });

  return variants.map((variant) => ({
    variantId: variant.id,
    productId: variant.product.id,
    productSlug: variant.product.slug,
    productName: variant.product.name,
    productDescription: variant.product.description,
    variantName: variant.name,
    grind: variant.grind,
    weightGrams: variant.weightGrams,
    priceOre: variant.priceOre,
    currency: "NOK",
    image: firstImage(variant.product.images),
    inStock: variant.inventory >= (requestedQuantity.get(variant.id) ?? 1),
  }));
}

export async function getAdminCatalog(): Promise<AdminCatalog> {
  const prisma = await getPrisma();
  const [categories, products] = await prisma.$transaction([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      include: { variants: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      active: category.active,
    })),
    products: products.map((product) => ({
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      slug: product.slug,
      description: product.description,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        productId: variant.productId,
        sku: variant.sku,
        name: variant.name,
        grind: variant.grind,
        weightGrams: variant.weightGrams,
        priceOre: variant.priceOre,
        currency: "NOK",
        inventory: variant.inventory,
        active: variant.active,
      })),
    })),
  };
}

export async function createCategory(input: CategoryInput): Promise<void> {
  const prisma = await getPrisma();
  await prisma.category.create({ data: input });
}

export async function updateCategory(
  id: string,
  input: CategoryInput,
): Promise<void> {
  const prisma = await getPrisma();
  await prisma.category.update({ where: { id }, data: input });
}

export async function createProduct(input: ProductInput): Promise<void> {
  const prisma = await getPrisma();
  await prisma.product.create({ data: input });
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<void> {
  const prisma = await getPrisma();
  await prisma.product.update({ where: { id }, data: input });
}

export async function createProductVariant(
  input: ProductVariantInput,
): Promise<void> {
  const prisma = await getPrisma();
  await prisma.productVariant.create({
    data: { ...input, currency: "NOK" },
  });
}

export async function updateProductVariant(
  id: string,
  input: ProductVariantInput,
): Promise<void> {
  const prisma = await getPrisma();
  await prisma.productVariant.update({
    where: { id },
    data: { ...input, currency: "NOK" },
  });
}

export async function getAdminSummary(): Promise<AdminSummary> {
  const prisma = await getPrisma();
  const [
    newOrders,
    pendingPayments,
    reviewPayments,
    paidAwaitingPreparation,
    preparingOrders,
    lowInventoryProducts,
  ] = await prisma.$transaction([
    prisma.order.count({
      where: { orderStatus: "CONFIRMED", fulfillmentStatus: "UNFULFILLED" },
    }),
    prisma.order.count({
      where: { paymentStatus: "REQUESTED" },
    }),
    prisma.order.count({ where: { paymentStatus: "REVIEW_REQUIRED" } }),
    prisma.order.count({
      where: {
        orderStatus: "CONFIRMED",
        paymentStatus: "PAID",
        fulfillmentStatus: "UNFULFILLED",
      },
    }),
    prisma.order.count({ where: { fulfillmentStatus: "PREPARING" } }),
    prisma.productVariant.findMany({
      where: {
        active: true,
        inventory: { lte: LOW_INVENTORY_THRESHOLD },
        product: { is: { isPublished: true } },
      },
      distinct: ["productId"],
      select: { productId: true },
    }),
  ]);

  return {
    newOrders,
    pendingPayments,
    reviewPayments,
    paidAwaitingPreparation,
    preparingOrders,
    lowInventoryProducts: lowInventoryProducts.length,
  };
}

export async function getAdminOrderCount(): Promise<number> {
  const prisma = await getPrisma();
  return prisma.order.count();
}

export async function getAdminPaymentCount(): Promise<number> {
  const prisma = await getPrisma();
  return prisma.payment.count();
}

export function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export function isMissingRecordError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    (error.code === "P2003" || error.code === "P2025")
  );
}
