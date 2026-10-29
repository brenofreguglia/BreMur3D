import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedProducts() {

  return (
    <section className="hairline border-t border-[rgb(var(--border))]">
      <div className="container-page py-16 md:py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Catálogo em destaque</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Peças que já saem da fila de produção.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="flex items-center gap-1 text-sm text-gold-gradient hover:underline"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
