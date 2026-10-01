import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.url
        ? { allow: "/", disallow: ["/api/", "/admin"] }
        : { disallow: "/" }),
    },
    ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
