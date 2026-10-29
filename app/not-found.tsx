import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="font-mono text-7xl font-semibold text-gold-gradient/20 sm:text-8xl">404</span>
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Essa peça não foi encontrada.
        </h1>
        <p className="max-w-sm text-sm text-ink-400">
          A página que você procura não existe ou foi movida. Que tal voltar
          para o início ou dar uma olhada no catálogo?
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>
            <Home className="h-4 w-4" />
            Voltar ao início
          </Button>
        </Link>
        <Link href="/catalogo">
          <Button variant="secondary">
            <Compass className="h-4 w-4" />
            Ver catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
}
