import type { MetadataRoute } from "next";

const siteUrl = "https://www.tecdit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/calc`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/calc/body-surface-area-calculator`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
