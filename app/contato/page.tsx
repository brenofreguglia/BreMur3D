import type { Metadata } from "next";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { buildGeneralContactLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a BreMur3D pelo WhatsApp, Instagram ou email. Veja também nosso horário de atendimento.",
};

export default function ContatoPage() {
  return (
    <div className="container-page py-14">
      <div className="mb-14 flex flex-col gap-4">
        <span className="eyebrow">Fale com a gente</span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Contato</h1>
        <p className="max-w-xl text-sm text-ink-400">
          O canal mais rápido é o WhatsApp — é por lá que orçamentos,
          dúvidas e acompanhamento de produção acontecem.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <a
            href={buildGeneralContactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xs border border-[rgb(var(--border))] p-5 transition-colors hover:border-accent-500"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xs bg-accent-500/10 text-gold-gradient">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">WhatsApp</p>
              <p className="text-sm text-ink-400">Resposta em até 24h úteis</p>
            </div>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xs border border-[rgb(var(--border))] p-5 transition-colors hover:border-accent-500"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xs bg-accent-500/10 text-gold-gradient">
              <Instagram className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">Instagram</p>
              <p className="text-sm text-ink-400">@BreMur3D</p>
            </div>
          </a>

          <a
            href="mailto:contato@BreMur3D.com.br"
            className="flex items-center gap-4 rounded-xs border border-[rgb(var(--border))] p-5 transition-colors hover:border-accent-500"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xs bg-accent-500/10 text-gold-gradient">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">Email</p>
              <p className="text-sm text-ink-400">contato@BreMur3D.com.br</p>
            </div>
          </a>

          <div className="hairline mt-4 border-t border-[rgb(var(--border))] pt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Horário de atendimento</p>
            <div className="mt-3 flex flex-col gap-1 text-sm text-ink-400">
              <div className="flex justify-between">
                <span>Segunda a sexta</span>
                <span className="font-mono">9h – 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado</span>
                <span className="font-mono">9h – 13h</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo</span>
                <span className="font-mono">Fechado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="spec-frame relative flex min-h-[320px] flex-col items-center justify-center gap-3 overflow-hidden rounded-xs border border-[rgb(var(--border))] bg-ink-950 text-white">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(37,99,235,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.25)_1px,transparent_1px)] [background-size:32px_32px]" />
          <MapPin className="relative h-6 w-6 text-gold-gradient" />
          <p className="relative font-mono text-sm">São Paulo, SP — Brasil</p>
          <p className="relative max-w-xs text-center text-xs text-ink-300">
            Atendimento e produção por encomenda. Endereço exato compartilhado
            após a confirmação do orçamento.
          </p>
          <a href={buildGeneralContactLink()} target="_blank" rel="noopener noreferrer" className="relative">
            <Button variant="secondary" size="sm" className="border-white/20 text-white hover:border-accent-500">
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
