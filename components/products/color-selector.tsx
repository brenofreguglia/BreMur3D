"use client";

import { motion } from "framer-motion";
import React from "react";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  options: ColorOption[];
  selectedId?: string;
  onSelect: (option: ColorOption) => void;
}

export function ColorSelector({ options, selectedId, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-wider text-ink-400">Cores disponíveis</span>
      <div className="mt-2 flex items-center gap-3">
        {options.map((c) => {
          const isSelected = selectedId === c.id;

          return (
            <motion.button
              key={c.id}
              aria-label={`Selecionar cor ${c.name}`}
              onClick={() => onSelect(c)}
              initial={false}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-3"
            >
              <motion.span
                layout
                className={`rounded-full border border-[rgb(var(--border))]`}
                style={{
                  width: isSelected ? 36 : 22,
                  height: isSelected ? 36 : 22,
                  backgroundColor: c.hex,
                  display: "inline-block",
                }}
              />
              <div className="flex flex-col items-start">
                {isSelected ? (
                  <motion.span layout className="text-sm font-medium text-ink-800">
                    {c.name}
                  </motion.span>
                ) : (
                  <span className="text-sm text-ink-400">{c.name}</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorSelector;
