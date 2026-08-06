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
import ColorSelector from "@/components/products/color-selector";

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

          <div>
            <ColorSelector options={product.colors} selectedId={selectedColor?.id} onSelect={(c) => setSelectedColor(c)} />
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
