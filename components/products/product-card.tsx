"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuoteModal } from "@/components/products/quote-modal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [open, setOpen] = useState(false);
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group flex flex-col overflow-hidden rounded-xs border border-[rgb(var(--border))] transition-colors hover:border-accent-500/60"
      >
        <Link href={`/catalogo/${product.slug}`} className="spec-frame relative block aspect-square overflow-hidden">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <Badge className="absolute left-3 top-3 bg-[rgb(var(--background))]/80">
            {product.category}
          </Badge>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/catalogo/${product.slug}`}>
              <h3 className="font-display text-base font-semibold hover:text-accent-500">
                {product.name}
              </h3>
            </Link>
            <span className="font-mono text-sm text-accent-500">{formatPrice(product.price)}</span>
          </div>
          <p className="text-sm text-ink-400">{product.shortDescription}</p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex -space-x-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.id}
                  title={c.name}
                  className="h-4 w-4 rounded-full border border-[rgb(var(--surface))]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
              Solicitar orçamento
            </Button>
          </div>
        </div>
      </motion.article>

      <QuoteModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
