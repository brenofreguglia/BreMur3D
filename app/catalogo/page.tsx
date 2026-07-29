import type { Metadata } from "next";
import { products } from "@/data/products";
import { categories, colors } from "@/data/categories";
import { CatalogClient } from "@/components/products/catalog-client";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Todas as peças disponíveis para impressão 3D personalizada, com filtros por categoria, cor e preço.",
};

export default function CatalogoPage() {
  return (
    <div className="container-page py-14">
      <div className="mb-10 flex flex-col gap-3">
        <span className="eyebrow">Catálogo completo</span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Todas as peças, prontas para orçamento.
        </h1>
        <p className="max-w-xl text-sm text-ink-400">
          Filtre por categoria, cor ou preço, ou use a busca para encontrar a
          peça certa. Todos os itens podem ser personalizados sob consulta.
        </p>
      </div>

      <CatalogClient products={products} categories={categories} colors={colors} />
    </div>
  );
}
