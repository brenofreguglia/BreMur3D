"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildGeneralContactLink } from "@/lib/whatsapp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this reports to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-xs border border-[rgb(var(--border))] text-gold-gradient">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h1 className="font-display text-2xl font-semibold">Algo não saiu como esperado</h1>
      <p className="max-w-md text-sm text-ink-400">
        Essa página encontrou um erro inesperado. Tente novamente — se
        continuar, fale direto com a gente pelo WhatsApp.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Tentar novamente</Button>
        <a href={buildGeneralContactLink()} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Falar no WhatsApp</Button>
        </a>
      </div>
    </div>
  );
}
