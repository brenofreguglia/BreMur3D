"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, Color, Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
  colors: Color[];
}

const PRICE_RANGES = [
  { label: "Qualquer preço", value: "all" },
  { label: "Até R$ 30", value: "0-30" },
  { label: "R$ 30 – R$ 60", value: "30-60" },
  { label: "Acima de R$ 60", value: "60-9999" },
];

export function CatalogClient({ products, categories, colors }: CatalogClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [color, setColor] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const [min, max] = priceRange === "all" ? [0, Infinity] : priceRange.split("-").map(Number);

    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      const matchesColor = color === "all" || product.colors.some((c) => c.name === color);
      const matchesPrice = product.price >= min && product.price <= max;
      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });
  }, [products, search, category, color, priceRange]);

  const hasActiveFilters = category !== "all" || color !== "all" || priceRange !== "all" || search !== "";

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setColor("all");
    setPriceRange("all");
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="lg:w-64 lg:shrink-0">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="mb-4 flex w-full items-center justify-between rounded-xs border border-[rgb(var(--border))] px-4 py-3 text-sm lg:hidden"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </span>
          {hasActiveFilters && <span className="h-2 w-2 rounded-full bg-accent-500" />}
        </button>

        <div className={`flex-col gap-6 lg:flex ${filtersOpen ? "flex" : "hidden"}`}>
          <Input
            label="Buscar"
            placeholder="Nome do produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select label="Categoria" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select label="Cor" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="all">Todas as cores</option>
            {colors.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select label="Preço" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="justify-start px-0">
              <X className="h-3.5 w-3.5" />
              Limpar filtros
            </Button>
          )}
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-400">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </span>
          <div className="relative hidden items-center gap-2 text-ink-400 sm:flex">
            <Search className="h-3.5 w-3.5" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xs border border-dashed border-[rgb(var(--border))] py-20 text-center">
            <p className="font-display text-lg font-semibold">Nenhum produto encontrado</p>
            <p className="max-w-sm text-sm text-ink-400">
              Ajuste os filtros ou fale com a gente — se não está no catálogo,
              provavelmente conseguimos criar.
            </p>
            <Button variant="secondary" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
