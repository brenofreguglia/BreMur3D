import type { Metadata } from "next";
import { CustomProjectForm } from "@/components/custom-project/custom-project-form";

export const metadata: Metadata = {
  title: "Projetos personalizados",
  description:
    "Desenvolvemos peças sob medida a partir da sua ideia: descreva o projeto, envie referências e receba um orçamento pelo WhatsApp.",
};

export default function ProjetosPersonalizadosPage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-4 text-center">
        <span className="eyebrow">Sob medida</span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Projetos personalizados
        </h1>
        <p className="text-sm text-ink-400">
          Se a peça que você precisa não está no catálogo, a gente desenvolve
          do zero. Conte a ideia, as medidas e o material desejado — o resto
          fica com a nossa equipe.
        </p>
      </div>

      <CustomProjectForm />
    </div>
  );
}
