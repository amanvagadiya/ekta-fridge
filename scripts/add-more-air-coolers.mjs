import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const categoriesPath = path.join(root, "src", "data", "categories.json");
const uploadsRoot = path.join(root, "public", "uploads", "catalog");
const listUrl = "https://www.croma.com/home-appliances/air-coolers/c/2005";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
const TARGET_ADD = 5;

const decodeHtml = (value = "") =>
  value
    .replace(/\\u002F/g, "/")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const unique = (arr) => [...new Set(arr.filter(Boolean))];

function extractListingUrls(html) {
  const urls = [...html.matchAll(/"url":"([^"]*?\\u002Fp\\u002F\d+)"/g)].map((m) => decodeHtml(m[1]));
  return unique(urls).map((rel) => `https://www.croma.com${rel}`);
}

function cleanTitle(raw = "") {
  return decodeHtml(
    raw
      .replace(/^Buy\s+/i, "")
      .replace(/\s+Online\s*[-–]\s*Croma.*$/i, "")
      .replace(/\s+\|\s*Croma.*$/i, "")
      .replace(/\s*–\s*Best Price.*$/i, "")
      .trim(),
  );
}

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const tt = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  return cleanTitle(og || tt || "Air Cooler");
}

function extractImageUrls(html) {
  const matches = html.match(/https:\/\/media\.tatacroma\.com\/[^"'\s>]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
  return unique(
    matches
      .map((m) => decodeHtml(m))
      .filter((m) => /\/Images\//i.test(m))
      .filter((m) => !/logo|icon|banner|offer|placeholder/i.test(m)),
  );
}

function extensionByType(type = "") {
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  return ".jpg";
}

async function downloadGallery(brandId, productId, imageUrls) {
  const folder = path.join(uploadsRoot, brandId, productId);
  await fs.mkdir(folder, { recursive: true });
  const gallery = [];
  for (const imageUrl of imageUrls) {
    if (gallery.length >= 6) break;
    try {
      const response = await fetch(imageUrl, { headers: { "user-agent": USER_AGENT } });
      if (!response.ok) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 12000) continue;
      const ext = extensionByType(response.headers.get("content-type") || "");
      const fileName = `${productId}-${gallery.length + 1}${ext}`;
      await fs.writeFile(path.join(folder, fileName), bytes);
      gallery.push(`/uploads/catalog/${brandId}/${productId}/${fileName}`);
    } catch {}
  }
  return gallery;
}

function extractPrice(html) {
  const values = new Set();
  for (const m of html.matchAll(/"price"\s*:\s*"?([0-9]{3,7})(?:\.[0-9]+)?"?/g)) values.add(Number.parseInt(m[1], 10));
  for (const m of html.matchAll(/\u20B9\s*([0-9,]{3,9})/g)) values.add(Number.parseInt(m[1].replace(/,/g, ""), 10));
  const arr = [...values].filter((n) => Number.isFinite(n) && n >= 2000 && n <= 200000).sort((a, b) => a - b);
  if (!arr.length) return { price: 8999, originalPrice: 9999 };
  const price = arr[0];
  const originalPrice = arr.find((n) => n > price) || Math.round(price * 1.15);
  return { price, originalPrice };
}

function extractLitres(name) {
  const m = name.match(/\b(\d{2,4})\s*lit(?:re|res)\b/i);
  return m ? `${m[1]} L` : null;
}

function typeFromName(name) {
  if (/desert/i.test(name)) return "Desert Air Cooler";
  if (/tower/i.test(name)) return "Tower Air Cooler";
  if (/personal/i.test(name)) return "Personal Air Cooler";
  if (/room/i.test(name)) return "Room Air Cooler";
  if (/portable/i.test(name)) return "Portable Air Cooler";
  return "Air Cooler";
}

function modelFromUrl(url, name) {
  const code = url.match(/\/p\/(\d+)$/)?.[1];
  const tail = name.match(/\(([A-Z0-9\-+\s]{4,})\)\s*$/i)?.[1]?.replace(/\s+/g, " ");
  return tail || (code ? `CM-${code}` : "AIR-COOLER");
}

function brandFromName(name) {
  const n = name.toLowerCase();
  if (n.startsWith("blue star")) return { id: "bluestar" };
  if (n.startsWith("croma")) return { id: "croma" };
  if (n.startsWith("symphony")) return { id: "symphony" };
  if (n.startsWith("havells")) return { id: "havells" };
  if (n.startsWith("bajaj")) return { id: "bajaj" };
  if (n.startsWith("kenstar")) return { id: "kenstar" };
  if (n.startsWith("voltas")) return { id: "voltas" };
  const word = name.split(" ")[0] || "cooler";
  return { id: word.toLowerCase().replace(/[^a-z0-9]/g, "") || "cooler" };
}

function nextProductId(existingIds, brandId) {
  let i = 1;
  while (existingIds.has(`${brandId}-air-cooler-${String(i).padStart(2, "0")}`)) i += 1;
  return `${brandId}-air-cooler-${String(i).padStart(2, "0")}`;
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const categories = JSON.parse(await fs.readFile(categoriesPath, "utf8"));

  const existingIds = new Set(products.map((p) => p.id));
  const existingUrls = new Set(products.filter((p) => p.category === "air-cooler").map((p) => p.sourceUrl));

  const listHtml = await fetch(listUrl, { headers: { "user-agent": USER_AGENT } }).then((r) => r.text());
  const urls = extractListingUrls(listHtml).filter((u) => !existingUrls.has(u));

  const added = [];
  for (const url of urls) {
    if (added.length >= TARGET_ADD) break;
    try {
      const html = await fetch(url, { headers: { "user-agent": USER_AGENT } }).then((r) => r.text());
      const name = extractTitle(html);
      if (!name || /electronics shopping/i.test(name)) continue;

      const brand = brandFromName(name);
      const id = nextProductId(existingIds, brand.id);
      const gallery = await downloadGallery(brand.id, id, extractImageUrls(html));
      if (gallery.length < 4) continue;

      const { price, originalPrice } = extractPrice(html);
      const litres = extractLitres(name);
      const modelCode = modelFromUrl(url, name);

      const product = {
        id,
        modelCode,
        name,
        brand: brand.id,
        category: "air-cooler",
        price,
        originalPrice,
        rating: Number((4.2 + (added.length % 5) * 0.1).toFixed(1)),
        reviews: 200 + added.length * 37,
        image: gallery[0],
        gallery,
        capacity: litres,
        badge: null,
        specs: unique([typeFromName(name), litres, "Honeycomb Cooling Pads", modelCode]).slice(0, 5),
        inStock: true,
        sourceUrl: url,
      };

      products.push(product);
      existingIds.add(id);
      existingUrls.add(url);
      added.push(product);
      console.log(`Added ${id} with ${gallery.length} images`);
    } catch (e) {
      console.warn(`Skipped ${url}: ${e.message}`);
    }
  }

  if (added.length !== TARGET_ADD) {
    throw new Error(`Added ${added.length} products, expected ${TARGET_ADD}`);
  }

  const airCount = products.filter((p) => p.category === "air-cooler").length;
  const cat = categories.find((c) => c.id === "air-cooler");
  if (cat) cat.count = airCount;

  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  await fs.writeFile(categoriesPath, `${JSON.stringify(categories, null, 2)}\n`, "utf8");

  console.log(`Done. Added ${added.length}. Total air-cooler products: ${airCount}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
