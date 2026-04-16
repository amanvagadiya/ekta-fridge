import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const uploadsDir = path.join(root, "public", "uploads", "catalog");
const dataDir = path.join(root, "src", "data");

const brands = [
  {
    id: "samsung",
    name: "Samsung",
    tagline: "Official Samsung appliances with genuine image galleries",
    color: "hsl(210, 100%, 50%)",
  },
  {
    id: "lg",
    name: "LG",
    tagline: "Official LG appliances with real product photography",
    color: "hsl(351, 75%, 47%)",
  },
];

const categories = [
  { id: "ac", label: "Air Conditioner", icon: "Wind" },
  { id: "washing-machine", label: "Washing Machine", icon: "Waves" },
  { id: "microwave", label: "Microwave", icon: "Zap" },
  { id: "fridge", label: "Refrigerator", icon: "Thermometer" },
];

const productSources = {
  samsung: {
    fridge: [
      "https://www.samsung.com/in/refrigerators/side-by-side/rs8000cch-side-by-side-smart-conversion-696l-silver-rs76cg8003s9hl/",
      "https://www.samsung.com/in/refrigerators/side-by-side/rs8000cch-side-by-side-smart-conversion-633l-silver-rs78cg8543s9hl/",
      "https://www.samsung.com/in/refrigerators/french-door/rf9000d-rf9000dc-t-style-french-door-beverage-center-650l-black-rf65dg90bdsgtl/",
      "https://www.samsung.com/in/refrigerators/french-door/rf5000a-580l-silver-rf57a5032s9-tl/",
      "https://www.samsung.com/in/refrigerators/bespoke-refrigerators/bespoke-convertible-5in1-side-by-side-refrigerator-653l-glam-deep-charcoal-rs76cb81a333hl/",
      "https://www.samsung.com/in/refrigerators/side-by-side/rs8000cch-side-by-side-smart-conversion-696l-black-rs76cg8113b1hl/",
      "https://www.samsung.com/in/refrigerators/side-by-side/rs8000cch-side-by-side-smart-conversion-696l-black-rs76cg8115b1hl/",
      "https://www.samsung.com/in/refrigerators/double-door/tmf-refrigerator-rt80h22c-2-in-1-smart-conversion-double-door-refrigerator-with-convertible-freezer-256l-silver-rt40h30u2phl/",
      "https://www.samsung.com/in/refrigerators/one-door/rr1500mh-single-door-refrigerator-with-stylish-grande-design-183l-red-rr20h11c2rh-hl/",
      "https://www.samsung.com/in/refrigerators/double-door/rt6300dh-double-door-refrigerator-with-bespoke-ai-330l-black-doi-rt34hg5a43b1hl/",
    ],
    "washing-machine": [
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww6000d-front-loading-smartthings-ai-energy-mode-a-10-percent-extra-energy-efficiency-9kg-navy-ww90dg6u24astl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww5000d-front-loading-smartthings-ai-energy-mode-a-10-percent-extra-energy-efficiency-ai-ecobubble-12kg-refined-inox-ww12dg5b24axtl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww8400d-front-loading-smartthings-ai-energy-made-a-xx-percent-extra-energy-efficiency-ai-ecobubble-12kg-navy-ww12db8b54gstl/",
      "https://www.samsung.com/in/washers-and-dryers/washer-dryer-combo/wd7000f-front-loading-ai-ecobubble-ai-energy-mode-ai-control-12kg-black-wd12fb7b34gbtl/",
      "https://www.samsung.com/in/washers-and-dryers/washer-dryer-combo/12-7-kg-front-load-washer-dryer-combo-ai-wash-12kg-black-wd12fb8b94gbtl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww5000d-ww6000d-front-loading-smartthings-ai-energy-mode-9kg-refined-inox-9kg-refined-inox-ww90dg5u24axtl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww6000d-12kg-front-load-ai-washing-machine-with-superspeed-12kg-navy-ww12dg6b24astl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/ww5300t-front-loading-eco-bubble-ai-energy-mode-ai-control-16kg-gray-ww80t504dax1tl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/wa4000b-top-loading-ecobubble-digital-inverter-large-capacity-8kg-lightgray-wa80bg4441bgtl/",
      "https://www.samsung.com/in/washers-and-dryers/washing-machines/wa4000am-twin-5-star-energy-rating-hexa-storm-pulsator-magic-mixer-9-5kg-ebony-black-wt95a4260gd-tl/",
    ],
    microwave: [
      "https://www.samsung.com/in/microwave-ovens/convection/mw7300b-mc32b7382qc-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/mw5100h-mc28a5135ck-mc28a5147vk-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/32-litre-convection-microwave-oven-mc32a7056ck-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/--microwave-oven-convection-mc28a6036qk-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/mc32a7035cttl-mc32a7035ct-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/mw5100h-mc28a5135ck-mc28a5145vr-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/mw5100h-mc28a5135ck-moisture-sensor-slimfry-ceramic-enamel-cavity-with-10-year-warranty-curd-making-mc28a5145vk-tl/",
      "https://www.samsung.com/in/microwave-ovens/grill/grill-fry-mg23a3515ak-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/28-litre-convection-microwave-oven-mc28a5013ak-tl/",
      "https://www.samsung.com/in/microwave-ovens/convection/28-litre-convection-microwave-oven-mc28a5025vs-tl/",
    ],
    ac: [
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-windfree-inverter-split-ac-6-30-kw-3-star-2026-ar60h24d13wnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-6-30-kw-3-star-2026-ar50h24d1xhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-3-3-kw-3-star-ar50h12d1xhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-4-8-kw-4-star-ar50h18d14hnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-4-7-kw-5-star-ar50h18d1zhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-4-7-kw-5-star-ar60h18d15wnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-3-3-kw-3-star-ar50h12d1lhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-4-7-kw-5-star-ar50h18d15hnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-windfree-inverter-split-ac-4-75-kw-5-star-2026-ar60h18d1zwnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-5-10-kw-1-5-3-star-2026-ar50h19d1xhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-windfree-inverter-split-ac-4-8-kw-3-star-ar60h18d1lwnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-3-35-kw-5-star-2026-ar50h12d1zhnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-4-8-kw-1-5-3-star-ar50h18d13hnna/",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-windfree-inverter-split-ac-4-75-kw-4-star-2026-ar60h18d1ywnna/",
      "https://www.samsung.com/content/samsung/in/air-conditioners/split-ac/bespoke-ai-inverter-split-ac-5-00-kw-1-5-4-star-2026-ar50h19d1ahnna",
      "https://www.samsung.com/in/air-conditioners/split-ac/bespoke-ai-windfree-inverter-split-ac-4-8-kw-3-star-ar60h18d1pwnna/",
      "https://www.samsung.com/content/samsung/in/air-conditioners/split-ac/ar9500t-ar50f12c1uhnsa-non-windfree-inverter-split-ac-3-35-kw-3-star-ar50f12d0lhnna",
      "https://www.samsung.com/content/samsung/in/air-conditioners/split-ac/inverter-split-ac-4-40-kw-3-star-ar50f18d1xhnna",
      "https://www.samsung.com/in/air-conditioners/split-ac/inverter-split-ac-4-40-kw-3-star-ar50f18d1lhnna/",
      "https://www.samsung.com/content/samsung/in/air-conditioners/split-ac/inverter-split-ac-5-30-kw-3-star-ar50f19d13hnna",
      "https://www.samsung.com/in/multistore/campus/pd.AR50F19D1ZHNNA/",
    ],
  },
  lg: {
    fridge: [
      "https://www.lg.com/in/refrigerators/double-door-refrigerators/glb3426bfpt/",
      "https://www.lg.com/in/refrigerators/double-door-refrigerators/glt2926pdes/",
      "https://www.lg.com/in/refrigerators/double-door-refrigerators/glt2516wwpz/",
      "https://www.lg.com/in/refrigerators/double-door-refrigerators/gl-t502cesr/",
      "https://www.lg.com/in/refrigerators/double-door-refrigerators/gl-s342sdsx/",
      "https://www.lg.com/in/refrigerators/single-door-refrigerators/gld0536vrsw/",
      "https://www.lg.com/in/refrigerators/single-door-refrigerators/gld2156zhnb/",
      "https://www.lg.com/in/refrigerators/single-door-refrigerators/gld2156zhcp/",
      "https://www.lg.com/in/refrigerators/side-by-side-refrigerators/gl-l257cmc3/",
      "https://www.lg.com/in/refrigerators/side-by-side-refrigerators/gl-b257hdsy/",
    ],
    "washing-machine": [
      "https://www.lg.com/in/laundry/top-loading-washing-machines/t70vbmb1z/",
      "https://www.lg.com/in/laundry/front-loading-washing-machines/fhp1209z5m/",
      "https://www.lg.com/in/laundry/semi-automatic-washing-machines/p8530sraz/",
      "https://www.lg.com/in/laundry/washer-dryers/fhd1207stb/",
      "https://www.lg.com/in/laundry/semi-automatic-washing-machines/p7020ngaz/",
      "https://www.lg.com/in/laundry/front-loading-washing-machines/fhb1207z2w/",
      "https://www.lg.com/in/laundry/top-loading-washing-machines/t80kmmb3z/",
      "https://www.lg.com/in/laundry/front-loading-washing-machines/fhb1208z4m/",
      "https://www.lg.com/in/laundry/top-loading-washing-machines/t80vbmb1z/",
      "https://www.lg.com/in/laundry/washer-dryers/fhd0905swm/",
    ],
    microwave: [
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2886brum/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2846bg/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2846bv/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2146bg/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2846sl/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2146bv/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc3286brum/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc3286blu/",
      "https://www.lg.com/in/microwave-ovens/convection-microwave/mc2146br/",
      "https://www.lg.com/in/microwave-ovens/wifi-enabled-charcoal-convection-microwave/mjen326sfw/",
    ],
    ac: [
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/us-q19ynze3-p/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/us-q19bnze3-p/",
      "https://www.lg.com/in/air-conditioners/window-air-conditioners/aw-q24wwxa/",
      "https://www.lg.com/in/air-conditioners/window-air-conditioners/aw-q18wuxa/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/as-q24enxe/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/us-q19jwze3-p/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/as-q18tnxe-n/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/as-q19mnxe-n/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/us-q19bnze/",
      "https://www.lg.com/in/air-conditioners/split-air-conditioners/us-q14enze/",
    ],
  },
};

function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const byProperty = new RegExp(`<meta[^>]+property="${escaped}"[^>]+content="([^"]+)"`, "i");
  const byName = new RegExp(`<meta[^>]+name="${escaped}"[^>]+content="([^"]+)"`, "i");
  return (html.match(byProperty) || html.match(byName) || [])[1] || null;
}

function cleanTitle(title) {
  return title
    .replace(/\s+\|\s+(Samsung India|LG IN)$/i, "")
    .replace(/^Buy\s+/i, "")
    .trim();
}

function extractModelCode(url) {
  const parts = url.split("/").filter(Boolean);
  return parts.at(-1)?.toUpperCase() || "";
}

function parseSamsungImages(html) {
  const matches = [...html.matchAll(/images\.samsung\.com\/is\/image\/samsung\/[^"'<>]+/g)].map((m) => m[0]);
  const seen = new Set();
  const unique = matches
    .filter((url) => url.includes("gallery/"))
    .filter((url) => !url.includes("thumb"))
    .filter((url) => url.includes("Q90_") || url.includes("1300_1038_PNG") || url.includes("720_576_PNG"))
    .filter((url) => {
      const key = url.split("?")[0];
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);
  return unique.map((url) => `https://${url}`);
}

function parseLgImages(html) {
  const matches = [...new Set(html.match(/https:\/\/www\.lg\.com\/content\/dam\/channel\/wcms\/in\/images\/[^"'<>]+/g) || [])]
    .map((url) => url.replace(/\\+$/g, ""))
    .filter((url) => /\.(jpg|jpeg|png|webp)$/i.test(url));
  const filtered = matches.filter((url) => !url.includes("logo-lg") && !url.includes("payment-icons"));
  if (filtered.length > 0) return filtered.slice(0, 6);
  const ogImage = getMeta(html, "og:image");
  return ogImage ? [ogImage] : [];
}

function parseSamsungPrices(html) {
  const prices = [...html.matchAll(/\u20B9\s?([0-9,]+(?:\.[0-9]{2})?)/g)]
    .map((m) => Number.parseInt(m[1].replace(/,/g, ""), 10))
    .filter((value) => value >= 10000 && value <= 300000);
  const unique = [...new Set(prices)];
  return {
    originalPrice: unique[0] || 0,
    price: unique[1] || unique[0] || 0,
  };
}

function parseLgPrices(html) {
  const counts = new Map();
  for (const match of html.matchAll(/\b([1-9][0-9]{4,6})\b/g)) {
    const value = Number.parseInt(match[1], 10);
    if (value < 10000 || value > 300000) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  const price = sorted[0]?.[0] || 0;
  return {
    price,
    originalPrice: Math.round(price * 1.14),
  };
}

function extractSpecs(categoryId, text, modelCode) {
  const specs = [];
  const push = (value) => {
    if (value && !specs.includes(value)) specs.push(value);
  };

  for (const item of text.match(/\b(\d+(?:\.\d+)?)\s?(L|Kg|KG|kg|KW|kW|Ton|ton)\b/g) || []) {
    push(item.replace(/\s+/g, " "));
  }

  const categoryPatterns = {
    fridge: ["Side by Side", "French Door", "Double Door", "Single Door", "Convertible", "Frost Free", "Smart Conversion"],
    "washing-machine": ["Front Load", "Top Load", "Semi Automatic", "Washer Dryer", "AI Direct Drive", "Ecobubble", "Digital Inverter"],
    microwave: ["Convection", "Grill", "Solo", "Charcoal", "SlimFry", "HotBlast", "Wi-Fi"],
    ac: ["Split AC", "Window AC", "WindFree", "Inverter", "3 Star", "4 Star", "5 Star"],
  };

  for (const pattern of categoryPatterns[categoryId] || []) {
    if (new RegExp(pattern, "i").test(text)) push(pattern);
  }

  push(modelCode);
  return specs.slice(0, 5);
}

function capacityValue(categoryId, specs) {
  if (categoryId !== "fridge") return null;
  const match = specs.find((item) => /\b\d+(?:\.\d+)?\s?L\b/i.test(item));
  if (!match) return null;
  const value = Number.parseFloat(match);
  return Number.isNaN(value) ? null : value;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function pickBadge(index) {
  if (index === 0 || index === 4) return "Best Seller";
  if (index === 1 || index === 7) return "New";
  return null;
}

async function downloadGalleryImages(brandId, productId, imageUrls) {
  const productDir = path.join(uploadsDir, brandId, productId);
  await ensureDir(productDir);

  const gallery = [];
  for (const [imageIndex, imageUrl] of imageUrls.entries()) {
    const response = await fetch(encodeURI(imageUrl), { headers: { "user-agent": "Mozilla/5.0" } });
    if (!response.ok) continue;

    const type = response.headers.get("content-type") || "";
    let extension = ".jpg";
    if (type.includes("png")) extension = ".png";
    if (type.includes("webp")) extension = ".webp";

    const fileName = `${productId}-${imageIndex + 1}${extension}`;
    const filePath = path.join(productDir, fileName);
    await fs.writeFile(filePath, Buffer.from(await response.arrayBuffer()));
    gallery.push(`/uploads/catalog/${brandId}/${productId}/${fileName}`);
  }

  return gallery;
}

async function importProduct({ brand, category, url, index }) {
  const html = await fetchText(url);
  const title = cleanTitle(
    getMeta(html, "og:title") ||
      getMeta(html, "twitter:title") ||
      (html.match(/<title>([^<]+)<\/title>/i) || [])[1] ||
      extractModelCode(url),
  );
  const description = getMeta(html, "og:description") || "";
  const modelCode = extractModelCode(url);
  const rawImages = brand.id === "samsung" ? parseSamsungImages(html) : parseLgImages(html);
  if (rawImages.length === 0) {
    throw new Error(`No images found for ${url}`);
  }

  const priceInfo = brand.id === "samsung" ? parseSamsungPrices(html) : parseLgPrices(html);
  const productId = `${brand.id}-${category.id}-${String(index + 1).padStart(2, "0")}`;
  const gallery = await downloadGalleryImages(brand.id, productId, rawImages);
  if (gallery.length === 0) {
    throw new Error(`Could not save any images for ${url}`);
  }

  const specs = extractSpecs(category.id, `${title} ${description} ${modelCode}`, modelCode);

  return {
    id: productId,
    modelCode,
    name: title,
    brand: brand.id,
    category: category.id,
    price: priceInfo.price,
    originalPrice: Math.max(priceInfo.originalPrice, priceInfo.price),
    rating: Number((4.2 + ((index % 5) * 0.1) + (brand.id === "samsung" ? 0.1 : 0)).toFixed(1)),
    reviews: 120 + index * 29 + (brand.id === "lg" ? 11 : 0),
    image: gallery[0],
    gallery,
    capacity: capacityValue(category.id, specs),
    badge: pickBadge(index),
    specs,
    inStock: true,
    sourceUrl: url,
  };
}

async function main() {
  await ensureDir(uploadsDir);
  const products = [];

  for (const brand of brands) {
    for (const category of categories) {
      const urls = productSources[brand.id][category.id];
      for (const [index, url] of urls.entries()) {
        console.log(`Importing ${brand.id} ${category.id} ${index + 1}/${urls.length}`);
        const product = await importProduct({ brand, category, url, index });
        products.push(product);
      }
    }
  }

  const categoryData = categories.map((category) => {
    const categoryProducts = products.filter((product) => product.category === category.id);
    return {
      id: category.id,
      label: category.label,
      icon: category.icon,
      count: categoryProducts.length,
      image: categoryProducts[0]?.image || "",
    };
  });

  const brandData = brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    tagline: brand.tagline,
    productCount: products.filter((product) => product.brand === brand.id).length,
    color: brand.color,
  }));

  await writeJson(path.join(dataDir, "products.json"), products);
  await writeJson(path.join(dataDir, "categories.json"), categoryData);
  await writeJson(path.join(dataDir, "brands.json"), brandData);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
