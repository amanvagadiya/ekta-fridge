import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const uploadsRoot = path.join(root, "public", "uploads", "catalog");
const listingUrl = "https://www.croma.com/home-appliances/refrigerators-freezers/deep-freezer-refrigerators/c/399";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

const decode = (value) =>
  value
    .replace(/\\u002F/g, "/")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const unique = (items) => [...new Set(items.filter(Boolean))];

async function fetchHtml(url) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
}

function extractProductUrls(listingHtml) {
  const matches = [...listingHtml.matchAll(/"url":"([^"]*?\\u002Fp\\u002F\d+)"/g)].map((m) => decode(m[1]));
  return unique(matches).map((rel) => `https://www.croma.com${rel}`);
}

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const titleTag = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  return decode(og || titleTag || "Deep Freezer");
}

function extractCapacity(title) {
  const cap = title.match(/\b(\d{2,4})\s*lit(?:re|res)\b/i)?.[1];
  return cap ? `${cap} L` : null;
}

function extractImageUrls(html) {
  const matches = html.match(/https:\/\/media\.tatacroma\.com\/[^"'\s>]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
  return unique(
    matches
      .map((u) => decode(u))
      .filter((u) => /\/Images\//i.test(u))
      .filter((u) => !/logo|icon|banner|offer|placeholder/i.test(u)),
  );
}

function extensionFor(contentType) {
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  return ".jpg";
}

async function downloadGallery(product, imageUrls) {
  const folder = path.join(uploadsRoot, product.brand, product.id);
  await fs.mkdir(folder, { recursive: true });

  const gallery = [];
  for (const imageUrl of imageUrls) {
    if (gallery.length >= 6) break;
    try {
      const response = await fetch(imageUrl, { headers: { "user-agent": USER_AGENT } });
      if (!response.ok) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 12000) continue;
      const ext = extensionFor(response.headers.get("content-type") || "");
      const fileName = `${product.id}-${gallery.length + 1}${ext}`;
      const fullPath = path.join(folder, fileName);
      await fs.writeFile(fullPath, bytes);
      gallery.push(`/uploads/catalog/${product.brand}/${product.id}/${fileName}`);
    } catch {
      // Skip broken URL and continue.
    }
  }

  return gallery;
}

function updatedName(product, title, idx) {
  const cap = extractCapacity(title);
  const series = String(idx + 1).padStart(2, "0");
  if (cap) return `${product.brand.toUpperCase()} Deep Freezer ${cap} Series ${series}`;
  return `${product.brand.toUpperCase()} Deep Freezer Series ${series}`;
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const freezerProducts = products.filter((p) => p.category === "freezer").sort((a, b) => a.id.localeCompare(b.id));
  if (freezerProducts.length === 0) {
    throw new Error("No freezer products found.");
  }

  const listingHtml = await fetchHtml(listingUrl);
  const sourceUrls = extractProductUrls(listingHtml);
  if (sourceUrls.length === 0) {
    throw new Error("No deep-freezer product URLs found on listing page.");
  }

  let updatedCount = 0;
  for (let i = 0; i < freezerProducts.length; i += 1) {
    const product = freezerProducts[i];
    const sourceUrl = sourceUrls[i % sourceUrls.length];
    try {
      const html = await fetchHtml(sourceUrl);
      const title = extractTitle(html);
      const imageUrls = extractImageUrls(html);
      const gallery = await downloadGallery(product, imageUrls);
      if (gallery.length === 0) continue;

      product.image = gallery[0];
      product.gallery = unique(gallery).slice(0, 6);
      product.sourceUrl = sourceUrl;
      product.name = updatedName(product, title, i);
      product.specs = unique(["Deep Freezer", extractCapacity(title), `Series ${String(i + 1).padStart(2, "0")}`]).slice(0, 4);
      updatedCount += 1;
      console.log(`Updated ${product.id} with ${gallery.length} images`);
    } catch (error) {
      console.warn(`Skipped ${product.id}: ${error.message}`);
    }
  }

  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  console.log(`Deep freezer refresh completed. Updated: ${updatedCount}/${freezerProducts.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
