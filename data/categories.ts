import type { Category, Color, Material } from "@/types";

export const categories: Category[] = [
  { id: "cat-1", slug: "escritorio", name: "Escritório", description: "Peças para organizar sua mesa e ambiente de trabalho." },
  { id: "cat-2", slug: "gaming", name: "Gaming", description: "Suportes e acessórios para setup gamer." },
  { id: "cat-3", slug: "casa", name: "Casa", description: "Utilidades e organização para o dia a dia." },
  { id: "cat-4", slug: "personalizados", name: "Personalizados", description: "Peças sob encomenda, sob medida." },
];

export const colors: Color[] = [
  { id: "col-1", name: "Preto", hex: "#0a0a0c" },
  { id: "col-2", name: "Branco", hex: "#fafafa" },
  { id: "col-3", name: "Cinza", hex: "#71717a" },
  { id: "col-4", name: "Azul", hex: "#2563eb" },
  { id: "col-5", name: "Vermelho", hex: "#dc2626" },
  { id: "col-6", name: "Verde", hex: "#16a34a" },
  { id: "col-7", name: "Amarelo", hex: "#eab308" },
  { id: "col-8", name: "Laranja", hex: "#ea580c" },
];

export const materials: Material[] = [
  {
    id: "mat-1",
    name: "PLA",
    description: "Material padrão, biodegradável, ótimo acabamento superficial.",
    characteristics: ["Fácil de imprimir", "Boa rigidez", "Ideal para uso interno"],
  },
  {
    id: "mat-2",
    name: "PETG",
    description: "Mais resistente a impacto e umidade que o PLA.",
    characteristics: ["Resistente à umidade", "Boa resistência mecânica", "Leve flexibilidade"],
  },
  {
    id: "mat-3",
    name: "ABS",
    description: "Resistente a altas temperaturas, usado em peças técnicas.",
    characteristics: ["Resistente ao calor", "Alta durabilidade", "Superfície pós-processável"],
  },
  {
    id: "mat-4",
    name: "TPU",
    description: "Material flexível, tipo borracha, para peças que precisam ceder.",
    characteristics: ["Flexível", "Resistente à abrasão", "Absorve impacto"],
  },
];
