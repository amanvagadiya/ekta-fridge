import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const uploadsDir = path.join(root, "public", "uploads", "catalog");

const incomingBrands = [
  {
    id: "whirlpool",
    name: "Whirlpool",
    tagline: "Trusted cooling and home appliances for everyday families",
    color: "hsl(220, 75%, 45%)",
  },
  {
    id: "daikin",
    name: "DAIKIN",
    tagline: "Energy-efficient air conditioners with premium cooling control",
    color: "hsl(200, 85%, 42%)",
  },
  {
    id: "panasonic",
    name: "Panasonic",
    tagline: "Smart AC performance designed for Indian homes",
    color: "hsl(208, 88%, 38%)",
  },
  {
    id: "voltas",
    name: "Voltas",
    tagline: "Reliable cooling systems from a leading Indian brand",
    color: "hsl(7, 88%, 55%)",
  },
];

const importPlan = {
  whirlpool: {
    ac: [
      "https://www.croma.com/whirlpool-3dcool-pro-5-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-6th-sense-technology-2025-model-copper-condenser-41486-/p/314000",
      "https://www.croma.com/whirlpool-3dcool-5-in-1-convertible-1-5-ton-5-star-inverter-split-ac-with-6th-sense-technology-2025-model-copper-condenser-41485-/p/314016",
      "https://www.croma.com/whirlpool-3dcool-5-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-6th-sense-technology-2025-model-copper-condenser-41484-/p/314010",
      "https://www.croma.com/whirlpool-3dcool-pro-5-in-1-convertible-1-5-ton-5-star-inverter-split-ac-with-6th-sense-technology-2025-model-copper-condenser-41487-/p/314007",
      "https://www.croma.com/whirlpool-supreme-cool-xpand-convertible-1-ton-5-star-intellisense-inverter-split-ac-with-microblock-filter-copper-condenser-sai12b52sxd0-/p/248597",
      "https://www.croma.com/whirlpool-supremecool-5-in-1-convertible-2-ton-3-star-inverter-split-ac-with-6th-sense-technology-2025-model-copper-condenser-41488-/p/314013"
    ],
    fridge: [
      "https://www.croma.com/whirlpool-vitamagic-pro-192-litres-3-star-direct-cool-single-door-refrigerator-with-zeolite-technology-73131-grey-/p/304853",
      "https://www.croma.com/whirlpool-vitamagic-pro-192-litres-3-star-direct-cool-single-door-refrigerator-with-zeolite-technology-73132-grey-/p/304857",
      "https://www.croma.com/whirlpool-icemagic-powercool-184-litres-3-star-direct-cool-single-door-refrigerator-with-stabilizer-free-operation-72511-steel-/p/270351",
      "https://www.croma.com/whirlpool-impro-192-litres-3-star-direct-cool-single-door-refrigerator-with-stabilizer-free-operation-215-impro-roy-purple-/p/270353",
      "https://www.croma.com/whirlpool-icemagic-pro-192-litres-3-star-direct-cool-single-door-refrigerator-with-stabilizer-free-operation-72568-steel-/p/270352",
      "https://www.croma.com/whirlpool-wde-184-litres-2-star-direct-cool-single-door-refrigerator-with-anti-bacterial-gasket-72680-wine-bloom-/p/303714"
    ],
    "washing-machine": [
      "https://www.croma.com/whirlpool-7-5-kg-5-star-fully-automatic-top-load-washing-machine-stainwash-pro-31631-in-built-heater-grey-/p/304244",
      "https://www.croma.com/whirlpool-7-kg-5-star-fully-automatic-top-load-washing-machine-whitemagic-elite-31684-6th-sense-technology-grey-/p/315524",
      "https://www.croma.com/whirlpool-6-5-kg-5-star-fully-automatic-top-load-washing-machine-magic-clean-31659-6th-sense-technology-grey-/p/315671",
      "https://www.croma.com/whirlpool-7-5-kg-5-star-fully-automatic-top-load-washing-machine-magic-clean-pro-31667-6th-sense-technology-grey-/p/315676",
      "https://www.croma.com/whirlpool-8-kg-5-star-fully-automatic-top-load-washing-machine-360-bloomwash-pro-31670-catalytic-soak-graphite-/p/306742",
      "https://www.croma.com/whirlpool-10-kg-5-star-fully-automatic-top-load-washing-machine-360-bw-pro-h-31688-in-built-heater-graphite-/p/313647"
    ],
  },
  daikin: {
    ac: [
      "https://www.croma.com/daikin-standard-1-5-ton-5-star-inverter-split-ac-copper-condenser-pm-2-5-filter-atkm50uv-/p/306495",
      "https://www.croma.com/daikin-1-8-ton-4-star-hot-cold-inverter-split-ac-2022-model-copper-condenser-pm-2-5-filter-ftht60u-/p/245996",
      "https://www.croma.com/daikin-standard-series-1-5-ton-3-star-split-ac-copper-condenser-pm-2-5-filter-ftl50uv-/p/248205",
      "https://www.croma.com/daikin-premium-series-1-ton-3-star-inverter-split-smart-ac-with-dew-clean-technology-copper-condenser-atkl35uv16w-/p/257363",
      "https://www.croma.com/daikin-premium-series-1-5-ton-3-star-inverter-split-smart-ac-with-dew-clean-technology-copper-condenser-atkl50uv16v-u-v3-/p/257366",
      "https://www.croma.com/daikin-premium-series-1-ton-5-star-inverter-split-ac-with-anti-corrosion-treatment-copper-condenser-ftkm35uv16w-/p/248175"
    ],
  },
  panasonic: {
    ac: [
      "https://www.croma.com/panasonic-1-5-ton-5-star-split-inverter-ac-tu18wkyf-white-/p/223607",
      "https://www.croma.com/panasonic-1-5-ton-5-star-inverter-split-ac-copper-condenser-anti-dust-filter-xu18ykyf-/p/247502",
      "https://www.croma.com/panasonic-su-7-in-1-convertible-1-5-ton-3-star-inverter-split-smart-ac-with-anti-dust-filter-copper-condenser-cs-cu-su18ykywt-/p/304730",
      "https://www.croma.com/panasonic-eu-7-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-higher-airflow-copper-condenser-cs-cu-eu18bky3xf-/p/313616",
      "https://www.croma.com/panasonic-su-7-in-1-convertible-1-ton-3-star-inverter-split-smart-ac-with-wi-fi-enabled-copper-condenser-cs-cu-su12ykywa-/p/304727",
      "https://www.croma.com/panasonic-eu-7-in-1-convertible-1-5-ton-5-star-inverter-split-smart-ac-with-voice-assistant-copper-condenser-cs-cu-eu18bky5xfm-/p/313386"
    ],
  },
  voltas: {
    ac: [
      "https://www.croma.com/voltas-deluxe-1-5-ton-5-star-inverter-split-ac-4-in1-convertible-copper-condenser-185v-dazj-white-/p/255831",
      "https://www.croma.com/voltas-classic-1-5-ton-3-star-inverter-split-ac-2-in-1-convertible-copper-condenser-183v-cazs-white-/p/250157",
      "https://www.croma.com/voltas-183v-vectra-platina-4-in-1-convertible-1-5-ton-3-star-inverter-split-ac-with-anti-microbial-air-filteration-copper-condenser-4503448-/p/268029",
      "https://www.croma.com/voltas-vectra-4-in-1-convertible-1-5-ton-5-star-inverter-split-ac-with-anti-dust-filter-copper-condenser-185v-vectra-pearl-marvel-/p/268313",
      "https://www.croma.com/voltas-185v-vectra-elite-4-in-1-convertible-1-5-ton-5-star-inverter-split-ac-with-anti-dust-filter-copper-condenser-4503453-/p/268573",
      "https://www.croma.com/voltas-163v-vectra-pearl-4-in-1-convertible-1-3-ton-3-star-inverter-split-ac-with-anti-dust-filter-copper-condenser-4503543-/p/270260"
    ],
  },
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
    .replace(/&trade;/gi, "™")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanProductName(rawName = "") {
  return decodeHtml(
    rawName
      .replace(/^Buy\s+/i, "")
      .replace(/\s+Online\s*[-–]\s*Croma.*$/i, "")
      .replace(/\s+\|\s*Croma.*$/i, "")
      .replace(/\s*–\s*Best Price.*$/i, "")
      .trim(),
  );
}

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const titleTag = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  return cleanProductName(og || titleTag || "Product");
}

function extractPrice(html) {
  const candidates = new Set();
  for (const match of html.matchAll(/"price"\s*:\s*"?([0-9]{4,7})(?:\.[0-9]+)?"?/g)) {
    candidates.add(Number.parseInt(match[1], 10));
  }
  for (const match of html.matchAll(/\u20B9\s*([0-9,]{4,9})/g)) {
    candidates.add(Number.parseInt(match[1].replace(/,/g, ""), 10));
  }
  const prices = [...candidates].filter((n) => Number.isFinite(n) && n >= 5000 && n <= 500000).sort((a, b) => a - b);
  if (prices.length === 0) return { price: 0, originalPrice: 0 };
  const price = prices[0];
  const originalPrice = prices.find((n) => n > price) || Math.round(price * 1.15);
  return { price, originalPrice };
}

function extractModelCode(name, url) {
  const modelMatch = name.match(/\(([A-Z0-9\/\-\s]{4,})\)\s*$/i);
  if (modelMatch) return modelMatch[1].replace(/\s+/g, " ").trim();
  const urlCode = url.split("/p/")[0].split("-").filter(Boolean).slice(-1)[0] || "";
  return urlCode.toUpperCase();
}

function extractSpecs(name, categoryId, modelCode) {
  const specs = [];
  const add = (value) => {
    if (!value) return;
    if (!specs.includes(value)) specs.push(value);
  };

  for (const match of name.match(/\b\d+(?:\.\d+)?\s?(Ton|Star|Litres?|kg)\b/gi) || []) {
    add(match.replace(/\s+/g, " "));
  }

  const byCategory = {
    ac: ["Inverter", "Split AC", "Copper Condenser", "5 Star", "3 Star"],
    fridge: ["Frost Free", "Double Door", "Convertible", "Inverter Compressor"],
    "washing-machine": ["Top Load", "Fully Automatic", "Semi Automatic"],
  };

  for (const key of byCategory[categoryId] || []) {
    if (new RegExp(key, "i").test(name)) add(key);
  }

  add(modelCode);
  return specs.slice(0, 5);
}

function pickBadge(index) {
  if (index === 0) return "Best Seller";
  if (index === 1) return "Trending";
  return null;
}

function nextId(existingProducts, brandId, categoryId) {
  const used = new Set(
    existingProducts
      .filter((p) => p.brand === brandId && p.category === categoryId)
      .map((p) => Number.parseInt(p.id.split("-").at(-1), 10))
      .filter(Number.isFinite),
  );

  let n = 1;
  while (used.has(n)) n += 1;
  return `${brandId}-${categoryId}-${String(n).padStart(2, "0")}`;
}

function dedupeStrings(values) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    output.push(value);
  }
  return output;
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

async function downloadImages(brandId, productId, urls) {
  const folder = path.join(uploadsDir, brandId, productId);
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
      const filePath = path.join(folder, fileName);
      await fs.writeFile(filePath, bytes);
      gallery.push(`/uploads/catalog/${brandId}/${productId}/${fileName}`);
      if (gallery.length >= 6) break;
    } catch {
      // Skip broken images and continue with the next source.
    }
  }

  return gallery;
}

async function importSingleProduct(existingProducts, brand, categoryId, url, index) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const html = await response.text();

  const id = nextId(existingProducts, brand.id, categoryId);
  const name = extractTitle(html);
  const { price, originalPrice } = extractPrice(html);
  const modelCode = extractModelCode(name, url);
  const specs = extractSpecs(name, categoryId, modelCode);

  const imageUrls = extractCromaImageUrls(html);
  const gallery = await downloadImages(brand.id, id, imageUrls);
  if (gallery.length === 0) {
    throw new Error(`No downloadable product images found for ${url}`);
  }

  return {
    id,
    modelCode,
    name,
    brand: brand.id,
    category: categoryId,
    price: price || 19990,
    originalPrice: Math.max(originalPrice || Math.round((price || 19990) * 1.15), price || 19990),
    rating: Number((4.3 + ((index % 3) * 0.1)).toFixed(1)),
    reviews: 95 + (index * 41),
    image: gallery[0],
    gallery,
    capacity: categoryId === "fridge" ? Number.parseInt((specs.find((s) => /litre/i.test(s)) || "").replace(/[^\d]/g, ""), 10) || null : null,
    badge: pickBadge(index),
    specs,
    inStock: true,
    sourceUrl: url,
  };
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

async function main() {
  const brandsPath = path.join(dataDir, "brands.json");
  const productsPath = path.join(dataDir, "products.json");
  const categoriesPath = path.join(dataDir, "categories.json");

  const existingBrands = JSON.parse(await fs.readFile(brandsPath, "utf8"));
  const existingProductsRaw = JSON.parse(await fs.readFile(productsPath, "utf8"));
  let products = normalizeExistingProducts(existingProductsRaw).filter(
    (p) => !incomingBrands.some((brand) => brand.id === p.brand),
  );

  for (const brand of incomingBrands) {
    const categoryMap = importPlan[brand.id] || {};
    for (const [categoryId, urls] of Object.entries(categoryMap)) {
      for (const [index, url] of urls.entries()) {
        console.log(`Importing ${brand.id} ${categoryId} ${index + 1}/${urls.length}`);
        const product = await importSingleProduct(products, brand, categoryId, url, index);
        products.push(product);
      }
    }
  }

  products.sort((a, b) => a.id.localeCompare(b.id));

  const mergedBrands = [
    ...existingBrands.filter((brand) => !incomingBrands.some((incoming) => incoming.id === brand.id)),
    ...incomingBrands,
  ].map((brand) => ({
    ...brand,
    productCount: products.filter((product) => product.brand === brand.id).length,
  }));

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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
