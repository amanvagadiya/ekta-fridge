import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const uploadsDir = path.join(root, "public", "uploads", "catalog");

const LISTING_URL = "https://www.croma.com/daikin-air-conditioners/bc/b-0826-46";
const EXTRA_URLS = [
  "https://www.croma.com/daikin-1-5-ton-3-star-hot-cold-inverter-split-ac-copper-condenser-pm-1-0-filter-ftht50xv16-/p/321523",
  "https://www.croma.com/daikin-streamer-1-5-ton-5-star-inverter-split-ac-2025-model-copper-condenser-pm-1-0-filter-jtkj50-/p/316933",
  "https://www.croma.com/daikin-1-ton-5-star-inverter-split-smart-ac-with-voice-app-control-copper-condenser-pm-1-0-filter-jtkj35xv16vaa-/p/321564",
  "https://www.croma.com/daikin-1-ton-2-star-split-ac-copper-condenser-pm-2-5-filter-ftq35xv16wba-/p/321542",
];

const DAIKIN_BRAND = {
  id: "daikin",
  name: "DAIKIN",
  tagline: "Energy-efficient air conditioners with premium cooling control",
  color: "hsl(200, 85%, 42%)",
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

  const prices = [...candidates]
    .filter((value) => Number.isFinite(value) && value >= 5000 && value <= 500000)
    .sort((a, b) => a - b);

  if (prices.length === 0) return { price: 0, originalPrice: 0 };
  return {
    price: prices[0],
    originalPrice: prices.find((value) => value > prices[0]) || Math.round(prices[0] * 1.15),
  };
}

function extractModelCode(name, url) {
  const modelMatch = name.match(/\(([A-Z0-9\/\-\s.]{4,})\)\s*$/i);
  if (modelMatch) return modelMatch[1].replace(/\s+/g, " ").trim();
  const urlCode = url.split("/p/")[0].split("-").filter(Boolean).at(-1) || "";
  return urlCode.toUpperCase();
}

function extractSpecs(name, modelCode) {
  const specs = [];
  const add = (value) => {
    if (value && !specs.includes(value)) specs.push(value);
  };

  for (const match of name.match(/\b\d+(?:\.\d+)?\s?(Ton|Star|Litres?|kg)\b/gi) || []) {
    add(match.replace(/\s+/g, " "));
  }

  for (const value of ["Inverter", "Split AC", "Copper Condenser", "5 Star", "4 Star", "3 Star", "2 Star", "Hot & Cold", "Smart AC"]) {
    if (new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(name)) add(value);
  }

  add(modelCode);
  return specs.slice(0, 5);
}

function pickBadge(index) {
  if (index === 0) return "Best Seller";
  if (index === 1 || index === 4) return "Trending";
  if (index === 2 || index === 7) return "New";
  return null;
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
  const folder = path.join(uploadsDir, "daikin", productId);
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
      gallery.push(`/uploads/catalog/daikin/${productId}/${fileName}`);
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

async function getListingUrls() {
  const html = await fetchText(LISTING_URL);
  const match = html.match(/window\.__INITIAL_DATA__=\s*(\{.*?\})<\/script>/s);
  if (!match) throw new Error("Could not read Daikin listing data from Croma.");

  const listingData = vm.runInNewContext(`(${match[1]})`);
  const products = listingData?.plpReducer?.plpData?.products || [];
  return products
    .map((product) => product?.url)
    .filter(Boolean)
    .map((productUrl) => `https://www.croma.com${productUrl.replace(/\\u002F/g, "/")}`);
}

async function importSingleProduct(products, url, index) {
  const html = await fetchText(url);
  const id = nextId(products, "daikin", "ac");
  const name = extractTitle(html);
  const { price, originalPrice } = extractPrice(html);
  const modelCode = extractModelCode(name, url);
  const specs = extractSpecs(name, modelCode);
  const gallery = await downloadImages(id, extractCromaImageUrls(html));

  if (gallery.length === 0) {
    throw new Error(`No downloadable product images found for ${url}`);
  }

  return {
    id,
    modelCode,
    name,
    brand: "daikin",
    category: "ac",
    price: price || 19990,
    originalPrice: Math.max(originalPrice || Math.round((price || 19990) * 1.15), price || 19990),
    rating: Number((4.3 + ((index % 4) * 0.1)).toFixed(1)),
    reviews: 95 + (index * 37),
    image: gallery[0],
    gallery,
    capacity: null,
    badge: pickBadge(index),
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
  const existingSourceUrls = new Set(products.filter((product) => product.brand === "daikin").map((product) => product.sourceUrl));

  const candidateUrls = dedupeStrings([...(await getListingUrls()), ...EXTRA_URLS]).filter((url) => !existingSourceUrls.has(url));
  if (candidateUrls.length < 22) {
    throw new Error(`Only found ${candidateUrls.length} new Daikin AC URLs, need 22.`);
  }

  const selectedUrls = candidateUrls.slice(0, 22);
  for (const [index, url] of selectedUrls.entries()) {
    console.log(`Importing Daikin AC ${index + 1}/22`);
    const product = await importSingleProduct(products, url, index);
    products.push(product);
  }

  products.sort((a, b) => a.id.localeCompare(b.id));

  const mergedBrands = brands.map((brand) =>
    brand.id === "daikin"
      ? {
          ...brand,
          ...DAIKIN_BRAND,
          productCount: products.filter((product) => product.brand === "daikin").length,
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

  console.log(`Added ${selectedUrls.length} new Daikin AC products.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
