import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const uploadsRoot = path.join(root, "public", "uploads", "catalog");
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

const targetSourceUrls = {
  "voltas-freezer-01": "https://www.voltas.com/collections/combo-cooler",
  "voltas-freezer-02": "https://www.voltas.com/collections/combo-cooler",
  "voltas-freezer-03": "https://www.voltas.com/products/voltas-flat-glass-top-freezers-275-liters-5-star",
  "voltas-freezer-04": "https://www.voltas.com/products/voltas-flat-glass-top-freezers-326-liters-5-star",
  "voltas-freezer-05": "https://www.voltas.com/products/voltas-hard-top-convertible-double-door-421-litres-4-star",
  "rockwell-freezer-01": "https://shop.rockwell.co.in/product-category/deep-freezer/hard-top-freezer/",
  "rockwell-freezer-02": "https://shop.rockwell.co.in/product-category/deep-freezer/hard-top-freezer/",
  "rockwell-freezer-03": "https://shop.rockwell.co.in/product/rockwell-250sdu-hard-top-deep-freezer-convertible-freezer-and-cooler-single-door-with-4-years-comprehensive-warranty-low-power-consumption-chest-freezer/5905",
  "rockwell-freezer-04": "https://shop.rockwell.co.in/product/rockwell-350sdu-hard-top-deep-freezer-convertible-freezer-and-cooler-single-door-with-4-years-comprehensive-warranty-low-power-consumption-chest-freezer/14162",
  "rockwell-freezer-05": "https://shop.rockwell.co.in/product/rockwell-450ddu-hard-top-deep-freezer-convertible-freezer-and-cooler-double-door-with-4-years-comprehensive-warranty-low-power-consumption-chest-freezer/",
  "rockwell-freezer-06": "https://shop.rockwell.co.in/product/rockwell-550ddu-hard-top-deep-freezer-convertible-freezer-and-cooler-double-door-with-4-years-comprehensive-warranty-low-power-consumption-chest-freezer/",
};

const manualImageUrls = {
  "voltas-freezer-01": [
    "https://www.voltas.com/cdn/shop/files/A_3999fe63-e355-453d-a1fa-eb1da5f12687.jpg?v=1714208676&width=1080",
    "https://www.voltas.com/cdn/shop/files/0_0000_0_0005_1.jpg?v=1714208684&width=1080",
  ],
  "voltas-freezer-02": [
    "https://www.voltas.com/cdn/shop/files/A_3999fe63-e355-453d-a1fa-eb1da5f12687.jpg?v=1714208676&width=1080",
    "https://www.voltas.com/cdn/shop/files/0_0000_0_0005_1.jpg?v=1714208684&width=1080",
  ],
};

const unique = (items) => [...new Set(items.filter(Boolean))];

function decodeUrl(value) {
  return value
    .replace(/\\u002F/g, "/")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .trim();
}

async function fetchHtml(url) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  return response.text();
}

function extractVoltasImageUrls(html) {
  const matches = [
    ...html.matchAll(/https:\/\/www\.voltas\.com\/cdn\/shop\/files\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'<> ]*)?/gi),
    ...html.matchAll(/\/\/www\.voltas\.com\/cdn\/shop\/files\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'<> ]*)?/gi),
    ...html.matchAll(/https:\\\/\\\/www\.voltas\.com\\\/cdn\\\/shop\\\/files\\\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'<> ]*)?/gi),
  ].map((match) => decodeUrl(match[0]).replace(/^\/\//, "https://").replace(/\\/g, ""));

  return unique(matches.filter((url) => !/logo|icon|banner|payment|partner|flag|sprite/i.test(url)));
}

function extractRockwellImageUrls(html) {
  const matches = [
    ...html.matchAll(/https:\/\/(?:www\.)?shop\.rockwell\.co\.in\/wp-content\/uploads\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)/gi),
    ...html.matchAll(/https:\/\/(?:www\.)?rockwell\.co\.in\/wp-content\/uploads\/[^"'<> ]+\.(?:jpg|jpeg|png|webp)/gi),
  ].map((match) => decodeUrl(match[0]));

  return unique(matches.filter((url) => !/logo|icon|cropped|thumbnail|feature-image/i.test(url)));
}

function pickImageUrls(product, html) {
  const extracted = product.brand === "voltas" ? extractVoltasImageUrls(html) : extractRockwellImageUrls(html);
  return unique([...(manualImageUrls[product.id] || []), ...extracted]).slice(0, 6);
}

function extensionFor(contentType, url) {
  if (contentType.includes("png") || /\.png(?:\?|$)/i.test(url)) return ".png";
  if (contentType.includes("webp") || /\.webp(?:\?|$)/i.test(url)) return ".webp";
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
      if (bytes.length < 8000) continue;
      const ext = extensionFor(response.headers.get("content-type") || "", imageUrl);
      const fileName = `${product.id}-${gallery.length + 1}${ext}`;
      await fs.writeFile(path.join(folder, fileName), bytes);
      gallery.push(`/uploads/catalog/${product.brand}/${product.id}/${fileName}`);
    } catch {
    }
  }

  return gallery;
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const targets = products.filter((product) => targetSourceUrls[product.id]);

  let updated = 0;
  for (const product of targets) {
    const sourceUrl = targetSourceUrls[product.id];
    try {
      const html = await fetchHtml(sourceUrl);
      const gallery = await downloadGallery(product, pickImageUrls(product, html));
      if (gallery.length === 0) {
        console.warn(`No images saved for ${product.id}`);
        continue;
      }
      product.image = gallery[0];
      product.gallery = gallery;
      product.sourceUrl = sourceUrl;
      updated += 1;
      console.log(`Updated ${product.id} with ${gallery.length} images`);
    } catch (error) {
      console.warn(`Skipped ${product.id}: ${error.message}`);
    }
  }

  await fs.writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  console.log(`Completed. Updated ${updated}/${targets.length} freezer products.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
