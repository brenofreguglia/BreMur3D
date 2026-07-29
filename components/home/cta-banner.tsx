import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="hairline border-t border-[rgb(var(--border))] bg-ink-950 text-white">
      <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="flex max-w-lg flex-col gap-3">
          <span className="eyebrow">Não achou o que precisa?</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Desenvolvemos peças exclusivas, do zero.
          </h2>
          <p className="text-sm text-ink-300">
            Envie medidas, referências e a ideia — devolvemos um orçamento
            real, sem letras miúdas.
          </p>
        </div>
        <Link href="/projetos-personalizados">
          <Button size="lg">
            Criar projeto personalizado
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
