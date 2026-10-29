"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { buildCustomProjectLink } from "@/lib/whatsapp";
import { materials, colors } from "@/data/categories";

type FormState = "idle" | "submitting" | "submitted";

export function CustomProjectForm() {
  const [state, setState] = useState<FormState>("idle");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [waLink, setWaLink] = useState<string | null>(null);

  function handleAddImages(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls].slice(0, 4));
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    const link = buildCustomProjectLink({
      name: String(formData.get("name") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      email: String(formData.get("email") ?? ""),
      ideaDescription: String(formData.get("idea") ?? ""),
      height: String(formData.get("height") ?? ""),
      width: String(formData.get("width") ?? ""),
      depth: String(formData.get("depth") ?? ""),
      material: String(formData.get("material") ?? ""),
      color: String(formData.get("color") ?? ""),
    });

    // Simulated submission — no backend yet. This is where a future
    // POST /api/custom-projects call would go, alongside this WhatsApp link.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setWaLink(link);
    setState("submitted");
  }

  if (state === "submitted" && waLink) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-xs border border-[rgb(var(--border))] p-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10 text-gold-gradient">
          ✓
        </span>
        <h2 className="font-display text-xl font-semibold">Ideia recebida</h2>
        <p className="text-sm text-ink-400">
          Preparamos sua mensagem — falta só enviar pelo WhatsApp para nossa
          equipe dar seguimento ao orçamento.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Enviar pelo WhatsApp</Button>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Nome" name="name" placeholder="Seu nome completo" required />
        <Input label="WhatsApp" name="whatsapp" placeholder="(11) 91234-5678" required />
      </div>

      <Input label="Email" name="email" type="email" placeholder="voce@email.com" required />

      <Textarea
        label="Descrição da ideia"
        name="idea"
        placeholder="Conte o que você imagina: para que serve, referências, funcionalidade esperada..."
        required
      />

      <div className="grid gap-6 sm:grid-cols-3">
        <Input label="Altura (cm)" name="height" type="number" min="0" step="0.1" required />
        <Input label="Largura (cm)" name="width" type="number" min="0" step="0.1" required />
        <Input label="Profundidade (cm)" name="depth" type="number" min="0" step="0.1" required />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Select label="Material desejado" name="material" defaultValue="">
          <option value="" disabled>
            Selecione um material
          </option>
          {materials.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name} — {m.description}
            </option>
          ))}
        </Select>

        <Select label="Cor desejada" name="color" defaultValue="">
          <option value="" disabled>
            Selecione uma cor
          </option>
          {colors.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
          Imagens de referência (opcional)
        </span>
        <div className="flex flex-wrap gap-3">
          {images.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={src} className="relative h-20 w-20 overflow-hidden rounded-xs border border-[rgb(var(--border))]">
              <img src={src} alt={`Referência ${index + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                aria-label="Remover imagem"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {images.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xs border border-dashed border-[rgb(var(--border))] text-ink-400 hover:border-accent-500 hover:text-gold-gradient"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px]">Adicionar</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          className="hidden"
        />
        <p className="text-xs text-ink-400">
          As imagens ficam apenas na sua sessão neste momento — o envio de
          arquivos ao servidor entra quando o backend for conectado.
        </p>
      </div>

      <Button type="submit" size="lg" disabled={state === "submitting"} className="w-full sm:w-fit">
        {state === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {state === "submitting" ? "Enviando..." : "Enviar ideia"}
      </Button>
    </form>
  );
}
