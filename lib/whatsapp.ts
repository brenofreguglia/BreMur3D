import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Central place for the studio's WhatsApp number.
 * Replace with the real number (country code + DDD + number, digits only)
 * once the client provides it. Kept here so the whole app only has one
 * source of truth — easy to swap when a backend/config panel exists.
 */
export const WHATSAPP_NUMBER = "5518998165080";

export interface QuoteRequestDetails {
  product: Product;
  color?: string;
  quantity?: number;
  notes?: string;
}

/**
 * Builds a pre-filled WhatsApp deep link for a product quote request.
 * No checkout, no backend — just an honest, readable message assembled
 * from what the customer picked on the page.
 */
export function buildProductQuoteLink({
  product,
  color,
  quantity = 1,
  notes,
}: QuoteRequestDetails): string {
  const lines = [
    "Olá! Quero solicitar um orçamento:",
    "",
    `Produto: ${product.name}`,
    `Preço de referência: ${formatPrice(product.price)}`,
  ];

  if (color) lines.push(`Cor: ${color}`);
  lines.push(`Quantidade: ${quantity}`);
  if (notes && notes.trim().length > 0) {
    lines.push(`Observações: ${notes.trim()}`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export interface CustomProjectDetails {
  name: string;
  whatsapp: string;
  email: string;
  ideaDescription: string;
  height: string;
  width: string;
  depth: string;
  material: string;
  color: string;
}

/**
 * Builds a WhatsApp deep link summarizing a custom-project request
 * submitted on the "Projetos Personalizados" page.
 */
export function buildCustomProjectLink(details: CustomProjectDetails): string {
  const lines = [
    "Olá! Tenho interesse em um projeto personalizado:",
    "",
    `Nome: ${details.name}`,
    `WhatsApp: ${details.whatsapp}`,
    `Email: ${details.email}`,
    "",
    `Ideia: ${details.ideaDescription}`,
    `Dimensões (A x L x P): ${details.height}cm x ${details.width}cm x ${details.depth}cm`,
    `Material desejado: ${details.material}`,
    `Cor desejada: ${details.color}`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildGeneralContactLink(message = "Olá! Vim pelo site e gostaria de mais informações."): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
