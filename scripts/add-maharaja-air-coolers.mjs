import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const categoriesPath = path.join(root, "src", "data", "categories.json");
const brandsPath = path.join(root, "src", "data", "brands.json");
const uploadsRoot = path.join(root, "public", "uploads", "catalog", "maharaja");
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

const urls = [
  "https://www.maharajawhiteline.com/air-cooler/maxfrost-90",
  "https://www.maharajawhiteline.com/air-cooler/air-pro-80",
  "https://www.maharajawhiteline.com/air-cooler/prowave-super-65-with-remote",
  "https://www.maharajawhiteline.com/air-cooler/super-grand-70-plus",
  "https://www.maharajawhiteline.com/air-cooler/glacio-55",
];

const unique = (arr) => [...new Set(arr.filter(Boolean))];

const decodeHtml = (value = "") =>
  value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

function extractTitle(html, slug) {
  const og = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)/i)?.[1];
  const tt = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const raw = decodeHtml(og || tt || slug);
  return raw
    .replace(/\s*\|\s*Maharaja Whiteline.*$/i, "")
    .replace(/\s*Desert Air Coolers Online.*$/i, "")
    .replace(/\s*Air Coolers Online.*$/i, "")
    .trim();
}

function extractLitres(name, slug) {
  const fromName = name.match(/\b(\d{2,3})\s*L\b/i)?.[1] || name.match(/\b(\d{2,3})\s*lit(?:re|res)?\b/i)?.[1];
  if (fromName) return `${fromName} L`;
  const fromSlug = slug.match(/-(\d{2,3})(?:-|$)/)?.[1];
  return fromSlug ? `${fromSlug} L` : null;
}

function extractImages(html) {
  const matches = html.match(/https?:\/\/www\.maharajawhiteline\.com\/assests\/(?:product-images|product-other-images)\/(?:big-image|enlarge-image)\/[^"'\s>]+\.jpg/gi) || [];
  const clean = unique(matches);
  const primary = clean.filter((u) => /\/product-images\//i.test(u));
  const others = clean.filter((u) => /\/product-other-images\//i.test(u));
  return unique([...primary, ...others]).slice(0, 8);
}

async function downloadGallery(productId, imageUrls) {
  const folder = path.join(uploadsRoot, productId);
  await fs.mkdir(folder, { recursive: true });
  const gallery = [];

  for (const imageUrl of imageUrls) {
    if (gallery.length >= 6) break;
    try {
      const response = await fetch(imageUrl, { headers: { "user-agent": USER_AGENT } });
      if (!response.ok) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 12000) continue;
      const fileName = `${productId}-${gallery.length + 1}.jpg`;
      await fs.writeFile(path.join(folder, fileName), bytes);
      gallery.push(`/uploads/catalog/maharaja/${productId}/${fileName}`);
    } catch {}
  }

  return gallery;
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const categories = JSON.parse(await fs.readFile(categoriesPath, "utf8"));
  const brands = JSON.parse(await fs.readFile(brandsPath, "utf8"));

  const existingIds = new Set(products.map((p) => p.id));
  const existingUrls = new Set(products.map((p) => p.sourceUrl));

  const added = [];
  let idx = 1;
  for (const url of urls) {
    if (existingUrls.has(url)) continue;
    const slug = url.split("/").pop();
    const id = `maharaja-air-cooler-${String(idx).padStart(2, "0")}`;
    idx += 1;
    if (existingIds.has(id)) continue;

    try {
      const html = await fetch(url, { headers: { "user-agent": USER_AGENT } }).then((r) => r.text());
      const nameBase = extractTitle(html, slug);
      const name = `Maharaja ${nameBase}`;
      const capacity = extractLitres(name, slug);
      const imgUrls = extractImages(html);
      const gallery = await downloadGallery(id, imgUrls);
      if (gallery.length < 3) throw new Error("not enough images");

      const capNum = Number.parseInt((capacity || "60").replace(/\D/g, ""), 10) || 60;
      const price = Math.round((4500 + capNum * 70) / 10) * 10;
      const originalPrice = Math.round(price * 1.18);

      const product = {
        id,
        modelCode: slug.toUpperCase().replace(/-/g, "-"),
        name,
        brand: "maharaja",
        category: "air-cooler",
        price,
        originalPrice,
        rating: Number((4.3 + (added.length % 3) * 0.1).toFixed(1)),
        reviews: 150 + added.length * 35,
        image: gallery[0],
        gallery,
        capacity,
        badge: added.length === 0 ? "Trending" : null,
        specs: unique(["Air Cooler", capacity, "Honeycomb Cooling Pads", "Inverter Compatible", slug.toUpperCase()]).slice(0, 5),
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

  if (added.length !== 5) {
    throw new Error(`Added ${added.length}, expected 5`);
  }

  const airCount = products.filter((p) => p.category === "air-cooler").length;
  const cat = categories.find((c) => c.id === "air-cooler");
  if (cat) cat.count = airCount;

  const hasBrand = brands.some((b) => b.id === "maharaja");
  if (!hasBrand) {
    brands.push({
      id: "maharaja",
      name: "Maharaja",
      tagline: "Maharaja Whiteline air coolers for powerful home cooling",
      color: "hsl(12, 78%, 44%)",
      productCount: 5,
    });
  } else {
    brands.forEach((b) => {
      if (b.id === "maharaja") b.productCount = (b.productCount || 0) + 5;
    });
  }

  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  await fs.writeFile(categoriesPath, `${JSON.stringify(categories, null, 2)}\n`, "utf8");
  await fs.writeFile(brandsPath, `${JSON.stringify(brands, null, 2)}\n`, "utf8");

  console.log(`Done. Added ${added.length} Maharaja air coolers. Total air-cooler: ${airCount}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
