import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const siteUrl = "https://forma3d.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/catalogo",
    "/projetos-personalizados",
    "/sobre",
    "/contato",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/catalogo/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
