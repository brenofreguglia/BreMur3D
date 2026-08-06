"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { buildProductQuoteLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";

interface QuoteModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  defaultColor?: string;
}

export function QuoteModal({ product, open, onClose, defaultColor }: QuoteModalProps) {
  const [color, setColor] = useState(defaultColor ?? product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const waLink = buildProductQuoteLink({ product, color, quantity, notes });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-xs border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 sm:p-8"
          >
            <button
              aria-label="Fechar"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xs text-ink-400 hover:text-accent-500"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xs border border-[rgb(var(--border))]">
                <Image src={product.images[0].url} alt={product.images[0].alt} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{product.name}</h3>
                <p className="font-mono text-sm text-accent-500">{formatPrice(product.price)}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-400">Cor</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.name)}
                      className={`flex items-center gap-2 rounded-xs border px-3 py-2 text-xs transition-colors ${
                        color === c.name
                          ? "border-accent-500 text-accent-500"
                          : "border-[rgb(var(--border))] text-ink-400 hover:border-accent-500"
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

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-400">Quantidade</span>
                <div className="mt-2 flex w-fit items-center gap-4 rounded-xs border border-[rgb(var(--border))] px-4 py-2">
                  <button
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-ink-400 hover:text-accent-500"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-mono text-sm">{quantity}</span>
                  <button
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-ink-400 hover:text-accent-500"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Textarea
                label="Observações (opcional)"
                placeholder="Ex.: preciso para até sexta-feira"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full" size="lg">
                  Enviar pelo WhatsApp
                </Button>
              </a>
              <p className="text-center text-xs text-ink-400">
                Vamos abrir o WhatsApp com sua mensagem já preenchida — nada é
                cobrado agora.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
