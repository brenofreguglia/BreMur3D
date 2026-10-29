import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Differentials } from "@/components/home/differentials";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "BreMur3D — Impressão 3D personalizada",
  description:
    "Transformamos ideias em peças reais. Impressão 3D personalizada para sua casa, empresa ou projeto.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentials />
      <HowItWorks />
      <FeaturedProducts />
      <CtaBanner />
    </>
  );
}
