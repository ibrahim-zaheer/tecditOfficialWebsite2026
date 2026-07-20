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
  ];
}
