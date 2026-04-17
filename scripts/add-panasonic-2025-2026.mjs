import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const uploadsDir = path.join(root, "public", "uploads", "catalog");

const PRODUCT_URLS = [
  "https://www.croma.com/panasonic-eu-7-in-1-convertible-1-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-eu12bky3fm-/p/313369",
  "https://www.croma.com/panasonic-eu-7-in-1-convertible-1-ton-5-star-inverter-split-ac-with-ecotough-2025-model-copper-condenser-cs-cu-eu12bky5f-/p/313351",
  "https://www.croma.com/panasonic-eu-7-in-1-convertible-1-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-eu12bky5fm-/p/313459",
  "https://www.croma.com/panasonic-eu-7-in-1-convertible-2-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-eu24bky3fm-/p/313348",
  "https://www.croma.com/panasonic-eu-7-in-1-convertible-2-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-eu24bky5fm-/p/313380",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-eu18cky3f-/p/320888",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-eu18cky3xfh-/p/320898",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-5-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-eu18cky3xfmh-/p/320879",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-5-ton-4-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-eu18cky4xfm-/p/320814",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-5-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-eu18cky5xfm-/p/320760",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-ton-3-star-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-eu12cky3f-/p/320885",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-ton-3-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-eu12cky3fm-/p/320876",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-ton-4-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-eu12cky4fm-/p/320779",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-ton-5-star-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-eu12cky5f-/p/320767",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-1-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-eu12cky5fm-/p/320756",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-2-ton-3-star-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-eu24cky3f-/p/320903",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-2-ton-3-star-inverter-split-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-eu24cky3fm-/p/320882",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-2-ton-4-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-eu24cky4fm-/p/320823",
  "https://www.croma.com/panasonic-eu-8-in-1-convertible-2-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-eu24cky5fm-/p/320764",
  "https://www.croma.com/panasonic-ez-7-in-1-convertible-1-5-ton-3-star-hot-cold-inverter-split-ac-with-crystal-clean-2025-model-copper-condenser-cs-cu-ez18bkyf-/p/315249",
  "https://www.croma.com/panasonic-ez-7-in-1-convertible-1-5-ton-3-star-hot-cold-inverter-split-smart-ac-with-voice-control-2025-model-copper-condenser-cs-cu-ez18bkyxfm-/p/315244",
  "https://www.croma.com/panasonic-ez-7-in-1-convertible-2-ton-3-star-hot-cold-inverter-split-smart-ac-with-voice-control-2025-model-copper-condenser-cs-cu-ez24bkyfm-/p/315239",
  "https://www.croma.com/panasonic-ez-8-in-1-convertible-1-5-ton-3-star-hot-cold-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-ez18ckyf-/p/320853",
  "https://www.croma.com/panasonic-ez-8-in-1-convertible-1-5-ton-3-star-hot-cold-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-ez18ckyxfm-/p/320857",
  "https://www.croma.com/panasonic-ez-8-in-1-convertible-1-ton-3-star-hot-cold-inverter-split-ac-with-pm-0-1-filter-2026-model-copper-condenser-cs-cu-ez12ckyf-/p/320850",
  "https://www.croma.com/panasonic-ez-8-in-1-convertible-2-ton-3-star-hot-cold-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-ez24ckyfm-/p/320862",
  "https://www.croma.com/panasonic-hu-8-in-1-convertible-1-5-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-hu18cky5xfmh-p-/p/320752",
  "https://www.croma.com/panasonic-hu-8-in-1-convertible-1-ton-5-star-inverter-split-smart-ac-with-voice-assistant-2026-model-copper-condenser-cs-cu-hu12cky5fm-p-/p/320749",
  "https://www.croma.com/panasonic-qu-8-in-1-convertible-2-5-ton-3-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-qu30ckyfm-/p/320817",
  "https://www.croma.com/panasonic-wu-7-in-1-convertible-1-5-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-wu18bkyfm-/p/313364",
  "https://www.croma.com/panasonic-wu-7-in-1-convertible-1-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-wu12bkyfm-/p/313549",
  "https://www.croma.com/panasonic-wu-7-in-1-convertible-2-ton-3-star-inverter-split-smart-ac-with-voice-assistant-2025-model-copper-condenser-cs-cu-wu24bkyfm-/p/313375",
  "https://www.croma.com/panasonic-wu-8-in-1-convertible-1-5-ton-4-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-wu18cky4xfm-p-/p/320776",
  "https://www.croma.com/panasonic-xu-8-in-1-convertible-1-5-ton-5-star-inverter-window-ac-with-pm-0-1-filter-2026-model-copper-condenser-cw-xu185cgt-/p/320892",
  "https://www.croma.com/panasonic-zu-8-in-1-convertible-2-ton-5-star-inverter-split-smart-ac-with-google-alexa-voice-assistant-2026-model-copper-condenser-cs-cu-zu24cky5fm-/p/320773",
];

const BRAND = {
  id: "panasonic",
  name: "Panasonic",
  tagline: "Smart AC performance designed for Indian homes",
  color: "hsl(208, 88%, 38%)",
};

const categoryMeta = [
  { id: "ac", label: "Air Conditioner", icon: "Wind", fallbackImage: "/uploads/category-ac.jpg" },
  { id: "washing-machine", label: "Washing Machine", icon: "Waves", fallbackImage: "/uploads/category-washing.jpg" },
  { id: "microwave", label: "Microwave", icon: "Zap", fallbackImage: "/uploads/category-microwave.jpg" },
  { id: "fridge", label: "Refrigerator", icon: "Thermometer", fallbackImage: "/uploads/category-fridge.jpg" },
  { id: "freezer", label: "Deep Freezer", icon: "Snowflake", fallbackImage: "/uploads/category-freezer.jpg" },
  { id: "air-cooler", label: "Air Cooler", icon: "Wind", fallbackImage: "/uploads/generated/categories/category-air-cooler.svg" },
];

function decodeHtml(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&rsquo;/gi, "'")
    .replace(/&trade;/gi, "TM")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanProductName(rawName = "") {
  return decodeHtml(
    rawName
      .replace(/^Buy\s+/i, "")
      .replace(/\s+Online\s*[-–]\s*Croma.*$/i, "")
      .replace(/\s+\|\s*Croma.*$/i, "")
      .replace(/\s*[-–]\s*Best Price.*$/i, "")
      .trim(),
  );
}

function dedupeStrings(values) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    output.push(value);
  }
  return output;
}

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"]+)["']/i)?.[1];
  const titleTag = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  return cleanProductName(og || titleTag || "Panasonic AC");
}

function extractPrice(html) {
  const candidates = new Set();
  for (const match of html.matchAll(/"price"\s*:\s*"?([0-9]{4,7})(?:\.[0-9]+)?"?/g)) {
    candidates.add(Number.parseInt(match[1], 10));
  }
  for (const match of html.matchAll(/\u20B9\s*([0-9,]{4,9})/g)) {
    candidates.add(Number.parseInt(match[1].replace(/,/g, ""), 10));
  }

  const prices = [...candidates]
    .filter((value) => Number.isFinite(value) && value >= 5000 && value <= 500000)
    .sort((a, b) => a - b);

  if (prices.length === 0) return { price: 0, originalPrice: 0 };
  return {
    price: prices[0],
    originalPrice: prices.find((value) => value > prices[0]) || Math.round(prices[0] * 1.15),
  };
}

function extractSpecValue(html, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`####\\s+${escaped}[\\s\\S]{0,140}?\\*\\s+([^\\n<][^\\n]*)`, "i");
  return decodeHtml(pattern.exec(html)?.[1] || "");
}

function extractModelCode(name, html, url) {
  const trailingModel = name.match(/,\s*([A-Z0-9/.-]{6,})\)\s*$/i);
  if (trailingModel) return trailingModel[1];

  const modelNumber = extractSpecValue(html, "Model Number");
  if (modelNumber) return modelNumber;

  const modelMatch = name.match(/\b((?:CS\/CU|CW)-[A-Z0-9-]+|[A-Z]{2,}[0-9]{2,}[A-Z0-9-]*)\b/i);
  if (modelMatch) return modelMatch[1];

  const urlCode = url.split("/p/")[0].split("-").filter(Boolean).at(-1) || "";
  return urlCode.toUpperCase();
}

function extractSpecs(name, modelCode, html) {
  const specs = [];
  const add = (value) => {
    if (value && !specs.includes(value)) specs.push(value);
  };

  for (const match of name.match(/\b\d+(?:\.\d+)?\s?(Ton|Star)\b/gi) || []) {
    add(match.replace(/\s+/g, " "));
  }

  add(/Window AC/i.test(name) ? "Window AC" : "Split AC");

  for (const value of [
    "Inverter AC",
    "Convertible",
    "Copper Condenser",
    "Voice Assistant",
    "Google & Alexa",
    "Wi-Fi",
    "Hot & Cold",
    "PM 0.1 Filter",
    "Matter Enabled",
  ]) {
    if (new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(`${name} ${html}`)) add(value);
  }

  add(modelCode);
  return specs.filter(Boolean).slice(0, 6);
}

function pickBadge(index, name) {
  if (/2026 Model/i.test(name)) return index < 5 ? "New Launch" : "New";
  if (/2025 Model/i.test(name)) return index < 3 ? "Trending" : "New";
  return index === 0 ? "Best Seller" : null;
}

function nextId(products, brandId, categoryId) {
  const used = new Set(
    products
      .filter((product) => product.brand === brandId && product.category === categoryId)
      .map((product) => Number.parseInt(product.id.split("-").at(-1), 10))
      .filter(Number.isFinite),
  );

  let n = 1;
  while (used.has(n)) n += 1;
  return `${brandId}-${categoryId}-${String(n).padStart(2, "0")}`;
}

function extractCromaImageUrls(html) {
  const matches = html.match(/https:\/\/media\.tatacroma\.com\/[^"'\s>]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
  return dedupeStrings(
    matches
      .map((url) => url.replace(/\\u002F/g, "/"))
      .filter((url) => /\/Images\//i.test(url))
      .filter((url) => !/logo|icon|banner|offer|placeholder/i.test(url)),
  ).slice(0, 8);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function downloadImages(productId, urls) {
  const folder = path.join(uploadsDir, "panasonic", productId);
  await ensureDir(folder);

  const gallery = [];
  for (let i = 0; i < urls.length; i += 1) {
    const imageUrl = urls[i];
    try {
      const response = await fetch(imageUrl, { headers: { "user-agent": "Mozilla/5.0" } });
      if (!response.ok) continue;

      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 10_000) continue;

      const contentType = response.headers.get("content-type") || "";
      let extension = ".jpg";
      if (contentType.includes("png")) extension = ".png";
      if (contentType.includes("webp")) extension = ".webp";

      const fileName = `${productId}-${gallery.length + 1}${extension}`;
      await fs.writeFile(path.join(folder, fileName), bytes);
      gallery.push(`/uploads/catalog/panasonic/${productId}/${fileName}`);
      if (gallery.length >= 6) break;
    } catch {
      // Skip broken image sources.
    }
  }

  return gallery;
}

function normalizeExistingProducts(products) {
  return products.map((product) => {
    const gallery = dedupeStrings(product.gallery || [product.image]).filter(Boolean);
    const cleanGallery = gallery.length > 0 ? gallery : [product.image];
    return {
      ...product,
      name: decodeHtml(product.name || ""),
      image: cleanGallery[0],
      gallery: cleanGallery,
    };
  });
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

async function importSingleProduct(products, url, index) {
  const html = await fetchText(url);
  const name = extractTitle(html);
  const modelCode = extractModelCode(name, html, url);

  const existingByModel = products.find(
    (product) => product.brand === "panasonic" && product.category === "ac" && product.modelCode === modelCode,
  );
  if (existingByModel) return null;

  const id = nextId(products, "panasonic", "ac");
  const { price, originalPrice } = extractPrice(html);
  const specs = extractSpecs(name, modelCode, html);
  const gallery = await downloadImages(id, extractCromaImageUrls(html));

  if (gallery.length === 0) {
    throw new Error(`No downloadable product images found for ${url}`);
  }

  return {
    id,
    modelCode,
    name,
    brand: "panasonic",
    category: "ac",
    price: price || 19990,
    originalPrice: Math.max(originalPrice || Math.round((price || 19990) * 1.15), price || 19990),
    rating: Number((4.3 + ((index % 5) * 0.1)).toFixed(1)),
    reviews: 90 + (index * 23),
    image: gallery[0],
    gallery,
    capacity: null,
    badge: pickBadge(index, name),
    specs,
    inStock: true,
    sourceUrl: url,
  };
}

async function main() {
  const brandsPath = path.join(dataDir, "brands.json");
  const productsPath = path.join(dataDir, "products.json");
  const categoriesPath = path.join(dataDir, "categories.json");

  const brands = JSON.parse(await fs.readFile(brandsPath, "utf8"));
  const products = normalizeExistingProducts(JSON.parse(await fs.readFile(productsPath, "utf8")));
  const existingSourceUrls = new Set(products.filter((product) => product.brand === "panasonic").map((product) => product.sourceUrl));
  const selectedUrls = PRODUCT_URLS.filter((url) => !existingSourceUrls.has(url));

  let addedCount = 0;
  for (const [index, url] of selectedUrls.entries()) {
    console.log(`Importing Panasonic AC ${index + 1}/${selectedUrls.length}`);
    const product = await importSingleProduct(products, url, index);
    if (!product) {
      console.log(`Skipped duplicate Panasonic model for ${url}`);
      continue;
    }
    products.push(product);
    addedCount += 1;
  }

  if (addedCount === 0) {
    console.log("No new Panasonic 2025/2026 AC products to add.");
    return;
  }

  products.sort((a, b) => a.id.localeCompare(b.id));

  const mergedBrands = brands.map((brand) =>
    brand.id === "panasonic"
      ? {
          ...brand,
          ...BRAND,
          productCount: products.filter((product) => product.brand === "panasonic").length,
        }
      : {
          ...brand,
          productCount: products.filter((product) => product.brand === brand.id).length,
        },
  );

  const categories = categoryMeta.map((category) => {
    const categoryProducts = products.filter((product) => product.category === category.id);
    return {
      id: category.id,
      label: category.label,
      icon: category.icon,
      count: categoryProducts.length,
      image: categoryProducts[0]?.image || category.fallbackImage,
    };
  });

  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  await fs.writeFile(brandsPath, `${JSON.stringify(mergedBrands, null, 2)}\n`, "utf8");
  await fs.writeFile(categoriesPath, `${JSON.stringify(categories, null, 2)}\n`, "utf8");

  console.log(`Added ${addedCount} new Panasonic AC products.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
