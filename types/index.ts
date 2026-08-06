/**
 * Domain types for FORMA3D.
 *
 * These are written as the future database contract, not just UI props.
 * When Supabase/Prisma is introduced, these interfaces should map ~1:1
 * onto generated table types (id becomes a uuid, dates become ISO strings
 * from Postgres timestamptz, etc). Keeping them here now means the data
 * layer (`/data/*.ts`) and the API layer can be swapped later without
 * touching component code.
 */

export type UUID = string;

export interface Category {
  id: UUID;
  slug: string;
  name: string;
  description?: string;
}

export interface Color {
  id: UUID;
  name: string;
  hex: string;
}

export type MaterialKind = "PLA" | "PETG" | "ABS" | "TPU" | "Resina";

export interface Material {
  id: UUID;
  name: MaterialKind;
  description: string;
  characteristics: string[];
}

export interface ProductImage {
  id: UUID;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: UUID;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  categoryId: UUID;
  category: Category["name"];
  images: ProductImage[];
  colors: Color[];
  model?: string;
  materials: MaterialKind[];
  productionTimeDays: number;
  featured?: boolean;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
    unit: "cm" | "mm";
  };
  createdAt: string;
}

/**
 * Represents a customer's quote request — either for a catalog product
 * or a fully custom project. Today this only ever becomes a WhatsApp
 * message; once there's a backend, this is the shape that gets persisted
 * and shown in the future admin dashboard.
 */
export type OrderStatus =
  | "novo"
  | "em_analise"
  | "orcamento_enviado"
  | "aprovado"
  | "em_producao"
  | "concluido"
  | "cancelado";

export interface OrderItem {
  productId?: UUID;
  productName: string;
  color?: string;
  quantity: number;
  unitPrice?: number;
}

export interface Order {
  id: UUID;
  customerId?: UUID;
  status: OrderStatus;
  items: OrderItem[];
  isCustomProject: boolean;
  notes?: string;
  createdAt: string;
}

export interface Customer {
  id: UUID;
  name: string;
  whatsapp: string;
  email: string;
  createdAt: string;
}

export interface CustomProjectRequest {
  id: UUID;
  customer: Pick<Customer, "name" | "whatsapp" | "email">;
  ideaDescription: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  material: string;
  color: string;
  referenceImageUrls?: string[];
  createdAt: string;
}

/** Simple, static content blocks — not user editable yet, but structured
 * so an admin panel could edit them without a code change later. */
export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}
