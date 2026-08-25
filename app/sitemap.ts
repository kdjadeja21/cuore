import type { MetadataRoute } from "next";
import { SITE } from "./lib/site";

const ROUTES = [
  { path: "", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/reservations", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
