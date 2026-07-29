import type { Product } from "@/types";
import { colors } from "@/data/categories";

const c = (name: string) => colors.find((color) => color.name === name)!;

export const products: Product[] = [
  {
    id: "prod-1",
    slug: "suporte-headset",
    name: "Suporte para Headset",
    shortDescription: "Suporte de mesa para manter seu headset sempre à mão.",
    description:
      "Suporte robusto para headset, projetado para ficar fixo na mesa sem escorregar. Base alargada para estabilidade e encaixe reforçado para não deformar com o peso do fone.",
    price: 59.9,
    categoryId: "cat-2",
    category: "Gaming",
    images: [
      { id: "img-1a", url: "/images/products/suporte-headset.svg", alt: "Suporte para headset em PLA azul", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Azul"), c("Cinza")],
    materials: ["PLA", "PETG"],
    productionTimeDays: 2,
    featured: true,
    dimensions: { height: 18, width: 12, depth: 10, unit: "cm" },
    createdAt: "2026-01-10",
  },
  {
    id: "prod-2",
    slug: "suporte-notebook",
    name: "Suporte para Notebook",
    shortDescription: "Eleva o notebook para uma postura mais ergonômica.",
    description:
      "Suporte ventilado que eleva o notebook a um ângulo confortável, melhorando a circulação de ar e a postura durante o uso prolongado. Compatível com a maioria dos notebooks de 13 a 16 polegadas.",
    price: 89.9,
    categoryId: "cat-1",
    category: "Escritório",
    images: [
      { id: "img-2a", url: "/images/products/suporte-notebook.svg", alt: "Suporte para notebook", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Cinza")],
    materials: ["PETG", "ABS"],
    productionTimeDays: 3,
    featured: true,
    dimensions: { height: 6, width: 26, depth: 22, unit: "cm" },
    createdAt: "2026-01-08",
  },
  {
    id: "prod-3",
    slug: "organizador-cabos",
    name: "Organizador de Cabos",
    shortDescription: "Elimina a bagunça de fios atrás da mesa.",
    description:
      "Peça circular com passagens internas para conduzir e agrupar cabos de forma discreta, fixável embaixo da mesa ou na parede. Reduz nós e facilita a manutenção do setup.",
    price: 29.9,
    categoryId: "cat-1",
    category: "Escritório",
    images: [
      { id: "img-3a", url: "/images/products/organizador-cabos.svg", alt: "Organizador de cabos", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Azul")],
    materials: ["PLA"],
    productionTimeDays: 1,
    featured: true,
    dimensions: { height: 4, width: 9, depth: 9, unit: "cm" },
    createdAt: "2026-01-05",
  },
  {
    id: "prod-4",
    slug: "suporte-controle",
    name: "Suporte para Controle",
    shortDescription: "Exibe e organiza seu controle de videogame.",
    description:
      "Suporte de mesa para até dois controles, com encaixe que respeita a curvatura do produto e evita marcas. Ótimo para manter o setup organizado e o controle sempre visível.",
    price: 49.9,
    categoryId: "cat-2",
    category: "Gaming",
    images: [
      { id: "img-4a", url: "/images/products/suporte-controle.svg", alt: "Suporte para controle de videogame", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Vermelho"), c("Azul")],
    materials: ["PLA", "PETG"],
    productionTimeDays: 2,
    featured: true,
    dimensions: { height: 10, width: 22, depth: 8, unit: "cm" },
    createdAt: "2026-01-14",
  },
  {
    id: "prod-5",
    slug: "gancho-multiuso",
    name: "Gancho Multiuso",
    shortDescription: "Pendure o que precisar, onde precisar.",
    description:
      "Gancho resistente para parede ou armário, ideal para chaves, casacos, bolsas ou ferramentas. Curva projetada para distribuir o peso e evitar que objetos escorreguem.",
    price: 19.9,
    categoryId: "cat-3",
    category: "Casa",
    images: [
      { id: "img-5a", url: "/images/products/gancho-multiuso.svg", alt: "Gancho multiuso de parede", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Cinza"), c("Amarelo")],
    materials: ["PETG", "ABS"],
    productionTimeDays: 1,
    dimensions: { height: 12, width: 6, depth: 4, unit: "cm" },
    createdAt: "2026-01-02",
  },
  {
    id: "prod-6",
    slug: "porta-chaves",
    name: "Porta Chaves",
    shortDescription: "Um lugar fixo para as chaves de casa.",
    description:
      "Porta-chaves de parede com três ganchos, acabamento fosco e furos de fixação discretos. Simples, direto e sem burocracia — as chaves nunca mais se perdem.",
    price: 34.9,
    categoryId: "cat-3",
    category: "Casa",
    images: [
      { id: "img-6a", url: "/images/products/porta-chaves.svg", alt: "Porta chaves de parede com três ganchos", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Azul"), c("Verde")],
    materials: ["PLA"],
    productionTimeDays: 1,
    dimensions: { height: 3, width: 24, depth: 10, unit: "cm" },
    createdAt: "2026-01-03",
  },
  {
    id: "prod-7",
    slug: "organizador-mesa",
    name: "Organizador de Mesa",
    shortDescription: "Compartimentos para canetas, clipes e o resto.",
    description:
      "Organizador modular com dois compartimentos de tamanhos diferentes, pensado para caber canetas, post-its, clipes e pequenos objetos de escritório sem virar bagunça.",
    price: 44.9,
    categoryId: "cat-1",
    category: "Escritório",
    images: [
      { id: "img-7a", url: "/images/products/organizador-mesa.svg", alt: "Organizador de mesa modular", isPrimary: true },
    ],
    colors: [c("Preto"), c("Branco"), c("Cinza"), c("Azul")],
    materials: ["PETG", "PLA"],
    productionTimeDays: 2,
    dimensions: { height: 12, width: 30, depth: 15, unit: "cm" },
    createdAt: "2026-01-06",
  },
];

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
