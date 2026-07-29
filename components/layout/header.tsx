"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/projetos-personalizados", label: "Projetos personalizados" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-xs bg-accent-500 text-xs text-white">
            3D
          </span>
          FORMA3D
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-accent-500",
                  active ? "text-accent-500" : "text-ink-400"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/catalogo">
            <Button variant="secondary" size="sm">Ver catálogo</Button>
          </Link>
          <Link href="/contato">
            <Button size="sm">Solicitar orçamento</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xs border border-[rgb(var(--border))]"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="hairline border-b border-[rgb(var(--border))] bg-[rgb(var(--background))] md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xs px-2 py-3 text-sm text-ink-400 hover:bg-[rgb(var(--surface-muted))] hover:text-accent-500"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contato" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full">Solicitar orçamento</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
