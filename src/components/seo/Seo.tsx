import { useEffect } from "react";
import { absoluteUrl, DEFAULT_KEYWORDS, dedupeKeywords } from "@/lib/seo";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "product" | "article";
  keywords?: string[];
  noindex?: boolean;
  jsonLd?: JsonLd;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, updater: (meta: HTMLMetaElement) => void) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  updater(tag);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path = "/",
  image = "/image.png",
  type = "website",
  keywords = [],
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
    const mergedKeywords = dedupeKeywords([...DEFAULT_KEYWORDS, ...keywords]);

    document.title = title;

    upsertMeta(
      "meta[name='description']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        return meta;
      },
      (meta) => meta.setAttribute("content", description),
    );

    upsertMeta(
      "meta[name='keywords']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "keywords");
        return meta;
      },
      (meta) => meta.setAttribute("content", mergedKeywords.join(", ")),
    );

    upsertMeta(
      "meta[name='robots']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "robots");
        return meta;
      },
      (meta) => meta.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"),
    );

    upsertMeta(
      "meta[property='og:title']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        return meta;
      },
      (meta) => meta.setAttribute("content", title),
    );

    upsertMeta(
      "meta[property='og:description']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        return meta;
      },
      (meta) => meta.setAttribute("content", description),
    );

    upsertMeta(
      "meta[property='og:url']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:url");
        return meta;
      },
      (meta) => meta.setAttribute("content", canonicalUrl),
    );

    upsertMeta(
      "meta[property='og:image']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        return meta;
      },
      (meta) => meta.setAttribute("content", imageUrl),
    );

    upsertMeta(
      "meta[property='og:type']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:type");
        return meta;
      },
      (meta) => meta.setAttribute("content", type),
    );

    upsertMeta(
      "meta[name='twitter:card']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:card");
        return meta;
      },
      (meta) => meta.setAttribute("content", "summary_large_image"),
    );

    upsertMeta(
      "meta[name='twitter:title']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:title");
        return meta;
      },
      (meta) => meta.setAttribute("content", title),
    );

    upsertMeta(
      "meta[name='twitter:description']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:description");
        return meta;
      },
      (meta) => meta.setAttribute("content", description),
    );

    upsertMeta(
      "meta[name='twitter:image']",
      () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:image");
        return meta;
      },
      (meta) => meta.setAttribute("content", imageUrl),
    );

    upsertCanonical(canonicalUrl);

    const schemaId = "seo-json-ld";
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, keywords, noindex, jsonLd]);

  return null;
}
