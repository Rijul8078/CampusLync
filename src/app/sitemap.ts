import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url
    ? routes
        .filter((route) => !["/privacy", "/terms"].includes(route))
        .map((route) => ({
          url: `${site.url}${route}`,
          changeFrequency: "monthly",
          priority: route === "/" ? 1 : 0.7,
        }))
    : [];
}
