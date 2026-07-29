import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { buildGeneralContactLink } from "@/lib/whatsapp";

const columns = [
  {
    title: "Navegação",
    links: [
      { href: "/", label: "Início" },
      { href: "/catalogo", label: "Catálogo" },
      { href: "/projetos-personalizados", label: "Projetos personalizados" },
      { href: "/sobre", label: "Sobre" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/contato", label: "Contato" },
      { href: "/sobre", label: "Missão e valores" },
      { href: "/catalogo", label: "Materiais e cores" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline border-t border-[rgb(var(--border))]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-xs bg-accent-500 text-xs text-white">
              3D
            </span>
            FORMA3D
          </span>
          <p className="max-w-xs text-sm text-ink-400">
            Transformamos ideias em peças reais. Impressão 3D personalizada, do
            protótipo à peça final.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={buildGeneralContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-xs border border-[rgb(var(--border))] hover:border-accent-500 hover:text-accent-500"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-xs border border-[rgb(var(--border))] hover:border-accent-500 hover:text-accent-500"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:contato@forma3d.com.br"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-xs border border-[rgb(var(--border))] hover:border-accent-500 hover:text-accent-500"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
              {column.title}
            </span>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-ink-400 transition-colors hover:text-accent-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
            Atendimento
          </span>
          <p className="text-sm text-ink-400">Seg – Sex · 9h às 18h</p>
          <p className="text-sm text-ink-400">Sáb · 9h às 13h</p>
        </div>
      </div>

      <div className="hairline border-t border-[rgb(var(--border))]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>© {year} FORMA3D. Todos os direitos reservados.</span>
          <span className="font-mono">CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
