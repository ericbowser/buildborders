import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { framePresets } from "@/data/framePresets";

const baseUrl = siteConfig.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/tool", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/tool" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/tool" ? 0.9 : 0.6,
  }));

  const presetRoutes = framePresets.map((p) => ({
    url: `${baseUrl}/tool/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...presetRoutes];
}
