import type { Metadata } from "next";
import { site } from "./config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | CampusLync` },
    description,
    alternates: site.url ? { canonical: `${site.url}${path}` } : undefined,
    openGraph: {
      title: `${title} | CampusLync`,
      description,
      siteName: "CampusLync",
      locale: "en_GB",
      type: "website",
      ...(site.url
        ? {
            url: `${site.url}${path}`,
            images: [
              { url: `${site.url}/opengraph-image`, width: 1200, height: 630 },
            ],
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
