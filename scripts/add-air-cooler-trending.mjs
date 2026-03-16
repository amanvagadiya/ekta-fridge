import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const categoriesPath = path.join(root, "src", "data", "categories.json");
const uploadsRoot = path.join(root, "public", "uploads", "catalog");
const listUrl = "https://www.croma.com/home-appliances/air-coolers/c/2005";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

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
    } catch {
      // ignore bad image
    }
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
  if (n.startsWith("blue star")) return { id: "bluestar", label: "Blue Star" };
  if (n.startsWith("croma")) return { id: "croma", label: "Croma" };
  if (n.startsWith("symphony")) return { id: "symphony", label: "Symphony" };
  if (n.startsWith("havells")) return { id: "havells", label: "Havells" };
  if (n.startsWith("bajaj")) return { id: "bajaj", label: "Bajaj" };
  if (n.startsWith("kenstar")) return { id: "kenstar", label: "Kenstar" };
  if (n.startsWith("voltas")) return { id: "voltas", label: "Voltas" };
  const word = name.split(" ")[0] || "cooler";
  return { id: word.toLowerCase().replace(/[^a-z0-9]/g, "") || "cooler", label: word };
}

function nextProductId(existingIds, brandId) {
  let i = 1;
  while (existingIds.has(`${brandId}-air-cooler-${String(i).padStart(2, "0")}`)) i += 1;
  return `${brandId}-air-cooler-${String(i).padStart(2, "0")}`;
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const categories = JSON.parse(await fs.readFile(categoriesPath, "utf8"));

  const withoutAirCooler = products.filter((p) => p.category !== "air-cooler");
  const existingIds = new Set(withoutAirCooler.map((p) => p.id));

  const listHtml = await fetch(listUrl, { headers: { "user-agent": USER_AGENT } }).then((r) => r.text());
  const urls = extractListingUrls(listHtml);
  if (!urls.length) throw new Error("No air-cooler product URLs found.");

  const preferredBrandOrder = ["croma", "havells", "bluestar", "kenstar", "bajaj", "voltas", "symphony"];
  const brandCap = {
    symphony: 2,
    croma: 2,
    havells: 2,
    bluestar: 1,
    kenstar: 1,
    bajaj: 1,
    voltas: 1,
  };
  const brandCounts = new Map();
  const candidates = [];
  const added = [];

  const takeIfAllowed = (product) => {
    const cap = brandCap[product.brand] ?? 1;
    const used = brandCounts.get(product.brand) ?? 0;
    if (used >= cap) return false;
    brandCounts.set(product.brand, used + 1);
    added.push(product);
    return true;
  };

  for (const url of urls) {
    try {
      const html = await fetch(url, { headers: { "user-agent": USER_AGENT } }).then((r) => r.text());
      const name = extractTitle(html);
      if (!name || /electronics shopping/i.test(name)) continue;

      const imgUrls = extractImageUrls(html);
      const brand = brandFromName(name);
      const id = nextProductId(existingIds, brand.id);
      const gallery = await downloadGallery(brand.id, id, imgUrls);
      if (gallery.length < 4) continue;

      const { price, originalPrice } = extractPrice(html);
      const litres = extractLitres(name);
      const coolerType = typeFromName(name);
      const modelCode = modelFromUrl(url, name);

      const product = {
        id,
        modelCode,
        name,
        brand: brand.id,
        category: "air-cooler",
        price,
        originalPrice,
        rating: Number((4.2 + (candidates.length % 5) * 0.1).toFixed(1)),
        reviews: 120 + candidates.length * 43,
        image: gallery[0],
        gallery,
        capacity: litres,
        badge: null,
        specs: unique([coolerType, litres, "Honeycomb Cooling Pads", modelCode]).slice(0, 5),
        inStock: true,
        sourceUrl: url,
      };

      candidates.push(product);
      existingIds.add(id);
      console.log(`Fetched ${id} (${brand.id}) with ${gallery.length} images`);
    } catch (e) {
      console.warn(`Skipped ${url}: ${e.message}`);
    }
  }

  for (const brandId of preferredBrandOrder) {
    if (added.length >= 8) break;
    for (const candidate of candidates) {
      if (candidate.brand !== brandId) continue;
      if (added.length >= 8) break;
      if (added.some((p) => p.id === candidate.id)) continue;
      takeIfAllowed(candidate);
    }
  }

  for (const candidate of candidates) {
    if (added.length >= 8) break;
    if (added.some((p) => p.id === candidate.id)) continue;
    takeIfAllowed(candidate);
  }

  if (added.length < 8) {
    throw new Error(`Only ${added.length} air-cooler products added; expected 8.`);
  }

  if (added[0]) added[0].badge = "Best Seller";
  if (added[1]) added[1].badge = "Trending";

  const finalProducts = [...withoutAirCooler, ...added];
  await fs.writeFile(productsPath, `${JSON.stringify(finalProducts, null, 2)}\n`, "utf8");

  const cat = categories.find((c) => c.id === "air-cooler");
  if (cat) {
    cat.count = added.length;
    cat.image = added[0].image;
  }
  await fs.writeFile(categoriesPath, `${JSON.stringify(categories, null, 2)}\n`, "utf8");

  console.log(`Done: ${added.length} trending air cooler products added.`);
  console.log(`Brand mix: ${JSON.stringify(Object.fromEntries(brandCounts.entries()))}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
