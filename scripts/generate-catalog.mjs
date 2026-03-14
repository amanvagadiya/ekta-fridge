import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const uploadsDir = path.join(root, "public", "uploads", "generated");
const dataDir = path.join(root, "src", "data");

const brands = [
  {
    id: "samsung",
    name: "Samsung",
    tagline: "Smart cooling and connected home appliances",
    color: "hsl(210, 100%, 50%)",
    accent: "#0b5fff",
    dark: "#09348c",
  },
  {
    id: "lg",
    name: "LG",
    tagline: "Reliable appliances built for everyday comfort",
    color: "hsl(351, 75%, 47%)",
    accent: "#d61f45",
    dark: "#7d1735",
  },
];

const categories = [
  { id: "ac", label: "Air Conditioner", icon: "Wind", short: "AC" },
  { id: "washing-machine", label: "Washing Machine", icon: "Waves", short: "WM" },
  { id: "microwave", label: "Microwave", icon: "Zap", short: "MW" },
  { id: "fridge", label: "Refrigerator", icon: "Thermometer", short: "RF" },
  { id: "freezer", label: "Freezer", icon: "Snowflake", short: "FZ" },
  { id: "air-cooler", label: "Air Cooler", icon: "Wind", short: "ACR" },
];

const categoryTemplates = {
  ac: [
    { line: "1 Ton 3 Star Inverter Split AC", price: 28990, specs: ["1 Ton", "3 Star", "Inverter", "Copper Condenser"] },
    { line: "1 Ton 5 Star WindFree Split AC", price: 33990, specs: ["1 Ton", "5 Star", "WindFree", "HD Filter"] },
    { line: "1.5 Ton 3 Star Inverter Split AC", price: 35990, specs: ["1.5 Ton", "3 Star", "Inverter", "Fast Cooling"] },
    { line: "1.5 Ton 5 Star AI Split AC", price: 41990, specs: ["1.5 Ton", "5 Star", "AI Cooling", "Convertible 5-in-1"] },
    { line: "1.5 Ton Wi-Fi Smart Split AC", price: 44990, specs: ["1.5 Ton", "Wi-Fi", "Voice Control", "PM 1.0 Filter"] },
    { line: "1.8 Ton Hot & Cold Inverter AC", price: 49990, specs: ["1.8 Ton", "Hot & Cold", "Inverter", "Stabilizer Free"] },
    { line: "2 Ton 3 Star Split AC", price: 46990, specs: ["2 Ton", "3 Star", "Twin Rotary", "Auto Clean"] },
    { line: "2 Ton 5 Star Smart Split AC", price: 55990, specs: ["2 Ton", "5 Star", "Smart Diagnosis", "Sleep Mode"] },
    { line: "1 Ton Window AC", price: 25990, specs: ["1 Ton", "Window", "3 Star", "Dust Filter"] },
    { line: "1.5 Ton Convertible Split AC", price: 38990, specs: ["1.5 Ton", "Convertible", "Dual Inverter", "Silent Mode"] },
  ],
  "washing-machine": [
    { line: "7 kg Front Load Washer", price: 30990, specs: ["7 kg", "Front Load", "Steam Wash", "Inverter"] },
    { line: "8 kg Top Load Washer", price: 22990, specs: ["8 kg", "Top Load", "Soft Closing", "Smart Wash"] },
    { line: "8 kg Front Load Washer", price: 34990, specs: ["8 kg", "Front Load", "Hygiene Steam", "Quick Wash"] },
    { line: "9 kg AI Front Load Washer", price: 40990, specs: ["9 kg", "AI Wash", "Wi-Fi", "Eco Bubble"] },
    { line: "10 kg Front Load Washer", price: 47990, specs: ["10 kg", "Front Load", "TurboWash", "Auto Restart"] },
    { line: "6.5 kg Top Load Washer", price: 18990, specs: ["6.5 kg", "Top Load", "Lint Filter", "Delay End"] },
    { line: "7 kg Semi Automatic Washer", price: 13990, specs: ["7 kg", "Semi Automatic", "Air Dry", "Rat Away"] },
    { line: "9 kg Top Load Washer", price: 26990, specs: ["9 kg", "Top Load", "Smart Inverter", "Turbo Drum"] },
    { line: "11 kg Front Load Washer", price: 55990, specs: ["11 kg", "Front Load", "Allergy Care", "AI DD"] },
    { line: "12 kg Washer Dryer Combo", price: 68990, specs: ["12 kg", "Washer Dryer", "Steam+", "Auto Dose"] },
  ],
  microwave: [
    { line: "20 L Solo Microwave Oven", price: 6790, specs: ["20L", "Solo", "Defrost", "Auto Cook"] },
    { line: "21 L Solo Microwave Oven", price: 7290, specs: ["21L", "Solo", "Quick Reheat", "Child Lock"] },
    { line: "23 L Grill Microwave Oven", price: 9690, specs: ["23L", "Grill", "Quartz Heater", "Keep Warm"] },
    { line: "28 L Convection Microwave", price: 13990, specs: ["28L", "Convection", "SlimFry", "Ceramic Cavity"] },
    { line: "28 L Diet Fry Microwave", price: 14990, specs: ["28L", "Convection", "Diet Fry", "Autocook"] },
    { line: "30 L Convection Microwave", price: 16490, specs: ["30L", "Convection", "Tandoor Mode", "Pasteurize"] },
    { line: "32 L HotBlast Microwave", price: 18990, specs: ["32L", "HotBlast", "Crusty Plate", "Touch Panel"] },
    { line: "32 L Smart Microwave Oven", price: 19990, specs: ["32L", "Wi-Fi", "Voice Control", "Sensor Cook"] },
    { line: "35 L Convection Microwave", price: 22990, specs: ["35L", "Convection", "Large Family", "Rotisserie"] },
    { line: "39 L Commercial Microwave", price: 26990, specs: ["39L", "Commercial", "Stainless Steel", "Preset Menus"] },
  ],
  fridge: [
    { line: "183 L Direct Cool Single Door Refrigerator", price: 16990, specs: ["183L", "Single Door", "Direct Cool", "Base Stand"] },
    { line: "215 L Direct Cool Single Door Refrigerator", price: 18990, specs: ["215L", "Single Door", "Digital Inverter", "Toughened Glass"] },
    { line: "236 L Frost Free Double Door Refrigerator", price: 24990, specs: ["236L", "Double Door", "Frost Free", "Convertible"] },
    { line: "253 L Frost Free Double Door Refrigerator", price: 27990, specs: ["253L", "Double Door", "Twin Cooling", "Deodorizer"] },
    { line: "324 L Convertible Double Door Refrigerator", price: 34990, specs: ["324L", "Convertible", "Wi-Fi", "Power Cool"] },
    { line: "350 L Bottom Mount Refrigerator", price: 41990, specs: ["350L", "Bottom Mount", "Multi Air Flow", "Fresh Box"] },
    { line: "394 L Triple Door Refrigerator", price: 48990, specs: ["394L", "Triple Door", "Smart Diagnosis", "Hygiene Fresh+"] },
    { line: "415 L Side by Side Refrigerator", price: 63990, specs: ["415L", "Side by Side", "InstaView", "Express Freeze"] },
    { line: "465 L Convertible Side by Side Refrigerator", price: 75990, specs: ["465L", "Side by Side", "Convertible", "Dual Fan"] },
    { line: "653 L Family Hub Side by Side Refrigerator", price: 122990, specs: ["653L", "Family Hub", "Twin Cooling", "SmartThings"] },
  ],
  freezer: [
    { line: "145 L Convertible Freezer", price: 14990, specs: ["145L", "Convertible", "Power Cool", "Compact Footprint"] },
    { line: "185 L Chest Freezer", price: 16990, specs: ["185L", "Chest", "Fast Freeze", "Lock & Key"] },
    { line: "215 L Chest Freezer", price: 19490, specs: ["215L", "Chest", "Deep Freeze", "Interior Light"] },
    { line: "250 L Vertical Freezer", price: 24990, specs: ["250L", "Vertical", "No Frost", "Multi Shelf"] },
    { line: "280 L Smart Freezer", price: 27990, specs: ["280L", "Smart", "Digital Control", "Quick Freeze"] },
    { line: "310 L Vertical Freezer", price: 31990, specs: ["310L", "Vertical", "No Frost", "Door Alarm"] },
    { line: "345 L Commercial Chest Freezer", price: 34990, specs: ["345L", "Commercial", "Heavy Duty", "Caster Wheels"] },
    { line: "390 L Convertible Freezer", price: 39990, specs: ["390L", "Convertible", "Turbo Freeze", "Wide Voltage"] },
    { line: "450 L Commercial Freezer", price: 46990, specs: ["450L", "Commercial", "Sliding Glass", "LED Lighting"] },
    { line: "520 L Premium Deep Freezer", price: 58990, specs: ["520L", "Deep Freezer", "Dual Compartment", "High Efficiency"] },
  ],
  "air-cooler": [
    { line: "35 L Personal Air Cooler", price: 7490, specs: ["35L", "Personal", "Honeycomb Pads", "Ice Chamber"] },
    { line: "45 L Personal Air Cooler", price: 8990, specs: ["45L", "Personal", "Remote Control", "Low Noise"] },
    { line: "55 L Desert Air Cooler", price: 10990, specs: ["55L", "Desert", "Auto Swing", "Inverter Compatible"] },
    { line: "60 L Tower Air Cooler", price: 12490, specs: ["60L", "Tower", "Touch Panel", "Mosquito Net"] },
    { line: "70 L Desert Air Cooler", price: 13990, specs: ["70L", "Desert", "Powerful Blower", "Humidity Control"] },
    { line: "75 L Portable Air Cooler", price: 14990, specs: ["75L", "Portable", "4-Way Swing", "Water Level Indicator"] },
    { line: "85 L Jumbo Air Cooler", price: 16990, specs: ["85L", "Jumbo", "Motorized Louvre", "Collapsible Handle"] },
    { line: "95 L Commercial Air Cooler", price: 18990, specs: ["95L", "Commercial", "Heavy Duty", "Large Wheels"] },
    { line: "110 L Desert Air Cooler", price: 21490, specs: ["110L", "Desert", "Turbo Air Throw", "Auto Fill"] },
    { line: "120 L Outdoor Air Cooler", price: 23990, specs: ["120L", "Outdoor", "Powerful Throw", "Rust Free Body"] },
  ],
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function capacityFromSpecs(specs) {
  const match = specs.find((spec) => /^\d+(\.\d+)?\s?(l|kg|ton)$/i.test(spec));
  if (!match) return null;
  const numeric = Number.parseFloat(match);
  return Number.isNaN(numeric) ? null : numeric;
}

function getBadge(index) {
  if (index === 0 || index === 3 || index === 6) return "Best Seller";
  if (index === 4 || index === 8) return "New";
  return null;
}

function getModelCode(brandId, categoryShort, index) {
  return `${brandId === "samsung" ? "SAM" : "LG"}-${categoryShort}-${String(index + 1).padStart(2, "0")}`;
}

function hashTone(input) {
  let total = 0;
  for (const char of input) total = (total + char.charCodeAt(0) * 7) % 360;
  return total;
}

function categoryShape(categoryId, view, accent, tone) {
  switch (categoryId) {
    case "ac":
      return `
        <rect x="80" y="120" rx="30" ry="30" width="800" height="170" fill="url(#body)" stroke="${accent}" stroke-width="8"/>
        <rect x="120" y="160" rx="16" ry="16" width="720" height="34" fill="rgba(255,255,255,0.65)"/>
        <rect x="120" y="208" rx="12" ry="12" width="720" height="18" fill="rgba(255,255,255,0.28)"/>
        ${view === "angle" ? `<path d="M830 120 L900 160 L900 260 L830 290 Z" fill="rgba(255,255,255,0.22)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "open" ? `<path d="M120 246 C260 315, 700 315, 840 246" stroke="rgba(255,255,255,0.8)" stroke-width="12" fill="none" stroke-linecap="round"/>` : ""}
        ${view === "detail" ? `<circle cx="790" cy="205" r="24" fill="rgba(255,255,255,0.8)"/><text x="790" y="212" text-anchor="middle" font-size="22" font-family="Arial" fill="${accent}">AI</text>` : ""}
      `;
    case "washing-machine":
      return `
        <rect x="190" y="90" rx="42" ry="42" width="580" height="760" fill="url(#body)" stroke="${accent}" stroke-width="8"/>
        <rect x="230" y="130" rx="22" ry="22" width="500" height="115" fill="rgba(255,255,255,0.18)"/>
        <circle cx="480" cy="510" r="210" fill="#0f172a" opacity="0.94"/>
        <circle cx="480" cy="510" r="165" fill="url(#drum)"/>
        <circle cx="480" cy="510" r="110" fill="rgba(255,255,255,0.18)"/>
        <circle cx="650" cy="183" r="24" fill="rgba(255,255,255,0.86)"/>
        ${view === "angle" ? `<path d="M770 100 L840 150 L840 820 L770 850 Z" fill="rgba(255,255,255,0.15)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "open" ? `<circle cx="480" cy="510" r="230" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="18" stroke-dasharray="1080 240"/><circle cx="680" cy="510" r="26" fill="rgba(255,255,255,0.9)"/>` : ""}
        ${view === "detail" ? `<rect x="262" y="160" rx="16" ry="16" width="220" height="55" fill="rgba(255,255,255,0.78)"/><rect x="510" y="160" rx="12" ry="12" width="95" height="55" fill="#111827"/>` : ""}
      `;
    case "microwave":
      return `
        <rect x="120" y="180" rx="28" ry="28" width="760" height="470" fill="url(#body)" stroke="${accent}" stroke-width="8"/>
        <rect x="170" y="230" rx="22" ry="22" width="500" height="365" fill="#0f172a"/>
        <rect x="195" y="255" rx="12" ry="12" width="450" height="315" fill="url(#screen)" opacity="0.95"/>
        <rect x="705" y="235" rx="16" ry="16" width="120" height="140" fill="rgba(255,255,255,0.18)"/>
        <circle cx="765" cy="455" r="42" fill="rgba(255,255,255,0.82)"/>
        <circle cx="765" cy="555" r="28" fill="rgba(255,255,255,0.52)"/>
        ${view === "angle" ? `<path d="M880 190 L925 225 L925 620 L880 650 Z" fill="rgba(255,255,255,0.18)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "open" ? `<path d="M170 230 L80 190 L80 600 L170 595 Z" fill="rgba(255,255,255,0.15)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "detail" ? `<rect x="720" y="255" rx="10" ry="10" width="90" height="26" fill="rgba(255,255,255,0.8)"/><rect x="720" y="295" rx="8" ry="8" width="90" height="14" fill="rgba(255,255,255,0.4)"/><rect x="220" y="290" width="400" height="210" rx="18" ry="18" fill="rgba(0,0,0,0.28)"/>` : ""}
      `;
    case "fridge":
    case "freezer":
      return `
        <rect x="280" y="70" rx="34" ry="34" width="400" height="800" fill="url(#body)" stroke="${accent}" stroke-width="8"/>
        <line x1="280" y1="390" x2="680" y2="390" stroke="rgba(255,255,255,0.5)" stroke-width="6"/>
        <rect x="620" y="180" rx="8" ry="8" width="14" height="120" fill="rgba(255,255,255,0.82)"/>
        <rect x="620" y="500" rx="8" ry="8" width="14" height="165" fill="rgba(255,255,255,0.82)"/>
        ${view === "angle" ? `<path d="M680 80 L760 135 L760 840 L680 880 Z" fill="rgba(255,255,255,0.16)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "open" ? `<path d="M280 80 L180 145 L180 840 L280 870 Z" fill="rgba(255,255,255,0.13)" stroke="${accent}" stroke-width="8"/><line x1="220" y1="240" x2="220" y2="760" stroke="rgba(255,255,255,0.8)" stroke-width="6"/><line x1="250" y1="250" x2="250" y2="760" stroke="rgba(255,255,255,0.5)" stroke-width="4"/>` : ""}
        ${view === "detail" ? `<rect x="335" y="160" rx="18" ry="18" width="290" height="85" fill="rgba(255,255,255,0.18)"/><circle cx="375" cy="202" r="18" fill="hsl(${tone}, 80%, 72%)"/><circle cx="430" cy="202" r="18" fill="hsl(${(tone + 30) % 360}, 80%, 72%)"/><circle cx="485" cy="202" r="18" fill="hsl(${(tone + 60) % 360}, 80%, 72%)"/>` : ""}
      `;
    case "air-cooler":
      return `
        <rect x="310" y="80" rx="38" ry="38" width="340" height="780" fill="url(#body)" stroke="${accent}" stroke-width="8"/>
        <rect x="360" y="150" rx="22" ry="22" width="240" height="130" fill="rgba(255,255,255,0.18)"/>
        <g fill="rgba(255,255,255,0.64)">
          <rect x="370" y="340" rx="10" ry="10" width="220" height="20"/>
          <rect x="370" y="390" rx="10" ry="10" width="220" height="20"/>
          <rect x="370" y="440" rx="10" ry="10" width="220" height="20"/>
          <rect x="370" y="490" rx="10" ry="10" width="220" height="20"/>
          <rect x="370" y="540" rx="10" ry="10" width="220" height="20"/>
        </g>
        <circle cx="385" cy="780" r="20" fill="#1f2937"/>
        <circle cx="575" cy="780" r="20" fill="#1f2937"/>
        ${view === "angle" ? `<path d="M650 90 L720 145 L720 835 L650 870 Z" fill="rgba(255,255,255,0.18)" stroke="${accent}" stroke-width="8"/>` : ""}
        ${view === "open" ? `<path d="M360 150 C430 100, 530 100, 600 150" stroke="rgba(255,255,255,0.85)" stroke-width="12" fill="none"/><circle cx="480" cy="215" r="46" fill="rgba(255,255,255,0.72)"/>` : ""}
        ${view === "detail" ? `<rect x="395" y="185" rx="12" ry="12" width="170" height="60" fill="#111827"/><circle cx="470" cy="215" r="18" fill="hsl(${tone}, 82%, 74%)"/>` : ""}
      `;
    default:
      return "";
  }
}

function makeProductSvg({ brand, product, category, view }) {
  const tone = hashTone(product.id);
  const accent = brand.accent;
  const accentDark = brand.dark;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" role="img" aria-labelledby="${product.id}-${view}">
  <title id="${product.id}-${view}">${product.name} ${view} view</title>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="hsl(${tone}, 70%, 97%)"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="body" x1="0" x2="0.9" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="hsl(${tone}, 22%, 92%)"/>
      <stop offset="100%" stop-color="hsl(${tone}, 16%, 82%)"/>
    </linearGradient>
    <linearGradient id="drum" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="hsl(${tone}, 88%, 68%)"/>
      <stop offset="100%" stop-color="${accentDark}"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="960" height="960" fill="url(#bg)"/>
  <circle cx="130" cy="140" r="95" fill="${accent}" opacity="0.12"/>
  <circle cx="845" cy="825" r="130" fill="${accentDark}" opacity="0.1"/>
  <rect x="55" y="55" width="850" height="850" rx="48" ry="48" fill="rgba(255,255,255,0.5)" stroke="rgba(15,23,42,0.08)" stroke-width="4"/>
  ${categoryShape(category.id, view, accent, tone)}
  <text x="95" y="110" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="${accentDark}">${brand.name.toUpperCase()}</text>
  <text x="95" y="145" font-size="20" font-family="Arial, Helvetica, sans-serif" fill="#475569">${category.label.toUpperCase()}</text>
  <text x="95" y="780" font-size="36" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#0f172a">${product.name.replace(/&/g, "&amp;")}</text>
  <text x="95" y="825" font-size="24" font-family="Arial, Helvetica, sans-serif" fill="#475569">${product.modelCode}</text>
  <text x="95" y="865" font-size="22" font-family="Arial, Helvetica, sans-serif" fill="#334155">${product.specs.slice(0, 3).join(" • ").replace(/&/g, "&amp;")}</text>
</svg>`;
}

function makeCategorySvg(category, index) {
  const hue = 200 + index * 18;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-labelledby="cat-${category.id}">
  <title id="cat-${category.id}">${category.label}</title>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 90%, 96%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 20}, 70%, 84%)"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" rx="48" ry="48" fill="url(#bg)"/>
  <circle cx="145" cy="135" r="95" fill="white" opacity="0.55"/>
  <circle cx="655" cy="665" r="130" fill="white" opacity="0.25"/>
  <rect x="80" y="80" width="640" height="640" rx="40" ry="40" fill="rgba(255,255,255,0.45)" stroke="rgba(15,23,42,0.08)" stroke-width="4"/>
  ${categoryShape(category.id, "front", "#0f172a", hue)}
  <text x="70" y="665" font-size="44" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#0f172a">${category.label.replace(/&/g, "&amp;")}</text>
  <text x="70" y="710" font-size="24" font-family="Arial, Helvetica, sans-serif" fill="#475569">Dedicated category image</text>
</svg>`;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  await ensureDir(uploadsDir);
  await ensureDir(path.join(uploadsDir, "categories"));

  const generatedCategories = categories.map((category, index) => ({
    id: category.id,
    label: category.label,
    icon: category.icon,
    count: brands.length * categoryTemplates[category.id].length,
    image: `/uploads/generated/categories/category-${category.id}.svg`,
  }));

  const products = [];

  for (const [categoryIndex, category] of categories.entries()) {
    const categorySvg = makeCategorySvg(category, categoryIndex);
    await fs.writeFile(path.join(uploadsDir, "categories", `category-${category.id}.svg`), categorySvg, "utf8");

    for (const brand of brands) {
      const productDir = path.join(uploadsDir, brand.id, category.id);
      await ensureDir(productDir);

      for (const [index, template] of categoryTemplates[category.id].entries()) {
        const modelCode = getModelCode(brand.id, category.short, index);
        const id = `${brand.id}-${category.id}-${String(index + 1).padStart(2, "0")}`;
        const name = `${brand.name} ${template.line}`;
        const slug = slugify(id);
        const gallery = ["front", "angle", "open", "detail"].map(
          (view) => `/uploads/generated/${brand.id}/${category.id}/${slug}-${view}.svg`,
        );
        const product = {
          id,
          modelCode,
          name,
          brand: brand.id,
          category: category.id,
          price: template.price + (brand.id === "lg" ? 600 : 0),
          originalPrice: template.price + (brand.id === "lg" ? 5600 : 6600),
          rating: Number((4.1 + ((index % 5) * 0.15) + (brand.id === "samsung" ? 0.1 : 0)).toFixed(1)),
          reviews: 95 + index * 34 + (brand.id === "lg" ? 18 : 0),
          image: gallery[0],
          gallery,
          capacity: category.id === "fridge" || category.id === "freezer" ? capacityFromSpecs(template.specs) : null,
          badge: getBadge(index),
          specs: [
            ...template.specs,
            brand.id === "samsung" ? "Official Samsung Warranty" : "Official LG Warranty",
          ],
          inStock: index !== 9,
        };

        for (const view of ["front", "angle", "open", "detail"]) {
          const svg = makeProductSvg({ brand, product, category, view });
          await fs.writeFile(path.join(productDir, `${slug}-${view}.svg`), svg, "utf8");
        }

        products.push(product);
      }
    }
  }

  const generatedBrands = brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    tagline: brand.tagline,
    productCount: categories.length * 10,
    color: brand.color,
  }));

  await writeJson(path.join(dataDir, "brands.json"), generatedBrands);
  await writeJson(path.join(dataDir, "categories.json"), generatedCategories);
  await writeJson(path.join(dataDir, "products.json"), products);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
