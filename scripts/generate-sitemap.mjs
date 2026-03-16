import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://ekta-fridge.vercel.app";
const productsPath = path.join(root, "src", "data", "products.json");
const sitemapPath = path.join(root, "public", "sitemap.xml");

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/products", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
];

const today = new Date().toISOString().slice(0, 10);

const toUrl = (pathname) => `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

function urlNode(loc, priority, changefreq) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function main() {
  const products = JSON.parse(await fs.readFile(productsPath, "utf8"));
  const productRoutes = products.map((product) => ({
    path: `/product/${slugify(product.name)}--${product.id}`,
    priority: "0.8",
    changefreq: "weekly",
  }));

  const allRoutes = [...staticRoutes, ...productRoutes];
  const body = allRoutes.map((route) => urlNode(toUrl(route.path), route.priority, route.changefreq)).join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(sitemapPath, xml, "utf8");
  console.log(`Generated sitemap with ${allRoutes.length} URLs at public/sitemap.xml`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
