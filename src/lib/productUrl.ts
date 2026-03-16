import productsData from "@/data/products.json";

type Product = (typeof productsData)[0];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function productPathFromProduct(product: Product) {
  return `/product/${slugify(product.name)}--${product.id}`;
}

export function resolveProductFromSlug(slugOrId: string | undefined) {
  if (!slugOrId) return undefined;
  const maybeId = slugOrId.split("--").pop() || slugOrId;
  return productsData.find((p) => p.id === maybeId) || productsData.find((p) => p.id === slugOrId);
}

