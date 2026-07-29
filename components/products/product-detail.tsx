"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Layers, Ruler } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/products/quote-modal";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

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
          <div className="spec-frame relative aspect-square overflow-hidden rounded-xs border border-[rgb(var(--border))]">
            <Image
              src={product.images[activeImage].url}
              alt={product.images[activeImage].alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 overflow-hidden rounded-xs border ${
                    activeImage === index ? "border-accent-500" : "border-[rgb(var(--border))]"
                  }`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
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
                <span
                  key={c.id}
                  className="flex items-center gap-2 rounded-xs border border-[rgb(var(--border))] px-3 py-2 text-xs"
                >
                  <span className="h-3 w-3 rounded-full border border-[rgb(var(--border))]" style={{ backgroundColor: c.hex }} />
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full sm:w-fit" onClick={() => setQuoteOpen(true)}>
            Solicitar orçamento
          </Button>
        </div>
      </div>

      <QuoteModal product={product} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
