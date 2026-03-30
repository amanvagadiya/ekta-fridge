export const SITE_URL = "https://ekta-fridge.vercel.app";

export const VISIBLE_BRANDS = ["Samsung", "LG", "Whirlpool", "DAIKIN", "Panasonic", "Voltas"];

export const DEFAULT_KEYWORDS = [
  "Ekta",
  "Ekta Fridge",
  "Ekta Fridge Chhapi",
  "Ektafridge",
  "Ekta Electronics",
  "Electronics Store",
  "Home Appliances",
  "AC",
  "Fridge",
  "Deep Freezer",
  "Air Cooler",
  "Washing Machine",
  "Microwave",
  "Samsung",
  "LG",
  "Whirlpool",
  "DAIKIN",
  "Panasonic",
  "Voltas",
  "Chhapi",
  "Banaskantha",
  "Gujarat",
];

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function dedupeKeywords(items: Array<string | undefined | null>) {
  const clean = items
    .map((item) => (item || "").trim())
    .filter(Boolean)
    .map((item) => item.replace(/\s+/g, " "));
  return [...new Set(clean)];
}
