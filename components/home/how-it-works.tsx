"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { processSteps } from "@/data/content";

export function HowItWorks() {
  return (
    <section className="hairline border-t border-[rgb(var(--border))]">
      <div className="container-page py-16 md:py-20">
        <div className="mb-12 flex flex-col gap-3">
          <span className="eyebrow">Do pedido à entrega</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Como funciona
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-stretch">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-1 flex-col items-center gap-4 py-4 text-center md:flex-row md:py-0"
            >
              <div className="flex flex-1 flex-col items-center gap-3 px-4">
                <span className="font-mono text-xs text-accent-500">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold">{step.title}</h3>
                <p className="max-w-[16rem] text-sm text-ink-400">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <>
                  <ArrowDown className="h-5 w-5 shrink-0 text-ink-400 md:hidden" />
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-ink-400 md:block" />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
