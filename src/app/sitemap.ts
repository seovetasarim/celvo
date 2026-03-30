import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const entries: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/koleksiyon", changeFrequency: "weekly", priority: 0.9 },
    { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tanitim-videosu", changeFrequency: "monthly", priority: 0.8 },
    { path: "/iletisim", changeFrequency: "monthly", priority: 0.7 },
    { path: "/kvkk", changeFrequency: "yearly", priority: 0.3 },
    { path: "/kullanim-kosullari", changeFrequency: "yearly", priority: 0.3 },
    { path: "/gizlilik-politikasi", changeFrequency: "yearly", priority: 0.3 },
  ];

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
