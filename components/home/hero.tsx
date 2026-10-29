"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="eyebrow">Impressão 3D sob medida</span>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Transformamos ideias em{" "}
           <span className="text-gold-gradient">peças reais.</span>
          </h1>
          <p className="max-w-md text-base text-ink-400 sm:text-lg">
            Impressão 3D personalizada para sua casa, empresa ou projeto — do
            primeiro esboço à peça acabada na sua mão.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link href="/projetos-personalizados">
              <Button size="lg" className="w-full sm:w-auto">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <LayoutGrid className="h-4 w-4" />
                Ver catálogo
              </Button>
            </Link>
          </div>

          <div className="hairline mt-4 flex gap-8 pt-6 font-mono text-xs text-ink-400">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-[rgb(var(--foreground))]">
                0.1mm
              </span>
              precisão de camada
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-[rgb(var(--foreground))]">
                8+
              </span>
              cores disponíveis
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-[rgb(var(--foreground))]">
                24h
              </span>
              resposta no orçamento
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15,
          }}
          className="flex w-full items-center justify-center"
        >
          <div className="relative aspect-square w-full max-w-[550px]">
            <Image
              src="/images/logo/BreMur3D.png"
              alt="Logo BreMur 3D"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 550px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
