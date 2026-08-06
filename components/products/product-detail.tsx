"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronLeft, Clock, Layers, Ruler } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/products/quote-modal";

const ProductViewer = dynamic(
  () => import("@/components/products/product-viewer").then((module) => module.ProductViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center text-sm text-ink-400">
        Carregando modelo 3D...
      </div>
    ),
  },
);

export function ProductDetail({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const viewerModel = product.model ?? `/models/products/${product.slug}.glb`;
  const viewerColor = selectedColor?.hex ?? product.colors[0]?.hex ?? "#d4d4d8";

  return (
    <div className="container-page py-14">
      <Link
        href="/catalogo"
        className="mb-8 inline-flex items-center gap-1 text-sm text-ink-400 hover:text-accent-500"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="spec-frame overflow-hidden rounded-xs border border-[rgb(var(--border))] bg-[linear-gradient(180deg,rgba(37,99,235,0.07),rgba(255,255,255,0))]">
            <ProductViewer model={viewerModel} color={viewerColor} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit">{product.category}</Badge>
            <h1 className="font-display text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="font-mono text-2xl text-accent-500">{formatPrice(product.price)}</p>
            <p className="text-sm leading-relaxed text-ink-400">{product.description}</p>
          </div>

          <div className="hairline grid grid-cols-3 gap-4 border-t border-[rgb(var(--border))] py-6">
            <div className="flex flex-col gap-2">
              <Clock className="h-4 w-4 text-accent-500" />
              <span className="text-xs text-ink-400">Produção</span>
              <span className="font-mono text-sm">{product.productionTimeDays} dia(s)</span>
            </div>
            <div className="flex flex-col gap-2">
              <Layers className="h-4 w-4 text-accent-500" />
              <span className="text-xs text-ink-400">Material</span>
              <span className="font-mono text-sm">{product.materials.join(" / ")}</span>
            </div>
            {product.dimensions && (
              <div className="flex flex-col gap-2">
                <Ruler className="h-4 w-4 text-accent-500" />
                <span className="text-xs text-ink-400">Dimensões</span>
                <span className="font-mono text-sm">
                  {product.dimensions.height}×{product.dimensions.width}×{product.dimensions.depth}
                  {product.dimensions.unit}
                </span>
              </div>
            )}
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-400">Cores disponíveis</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 rounded-xs border px-3 py-2 text-xs transition-colors ${
                    selectedColor?.id === c.id
                      ? "border-accent-500 text-accent-500"
                      : "border-[rgb(var(--border))] text-ink-400 hover:border-accent-500 hover:text-accent-500"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-[rgb(var(--border))]"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full sm:w-fit" onClick={() => setQuoteOpen(true)}>
            Solicitar orçamento
          </Button>
        </div>
      </div>

      <QuoteModal
        product={product}
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultColor={selectedColor?.name}
      />
    </div>
  );
}
