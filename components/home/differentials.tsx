"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Crosshair, MessageCircle, Palette, Sparkles, type LucideIcon } from "lucide-react";
import { differentials } from "@/data/content";

const ICONS: Record<string, LucideIcon> = {
  BadgeCheck,
  Crosshair,
  MessageCircle,
  Palette,
  Sparkles,
};

export function Differentials() {
  return (
    <section className="hairline border-t border-[rgb(var(--border))]">
      <div className="container-page py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">Por que FORMA3D</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Feito com o mesmo rigor de uma peça de engenharia.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xs border border-[rgb(var(--border))] bg-[rgb(var(--border))] sm:grid-cols-2 lg:grid-cols-5">
          {differentials.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="flex flex-col gap-4 bg-[rgb(var(--background))] p-6"
              >
                <Icon className="h-5 w-5 text-accent-500" />
                <h3 className="font-display text-sm font-semibold">{item.title}</h3>
                <p className="text-sm text-ink-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
