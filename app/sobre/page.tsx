import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a missão, visão e valores da FORMA3D, estúdio de impressão 3D personalizada.",
};

const values = [
  { icon: Target, title: "Missão", text: "Transformar ideias em objetos reais, com precisão técnica e atendimento próximo, tornando a impressão 3D acessível para pessoas e empresas." },
  { icon: Eye, title: "Visão", text: "Ser a referência em impressão 3D sob medida, reconhecida pela qualidade de acabamento e pela confiança na relação com cada cliente." },
  { icon: Heart, title: "Valores", text: "Transparência no orçamento, cuidado em cada camada impressa e compromisso com prazos que a gente realmente cumpre." },
];

export default function SobrePage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col gap-4 text-center">
        <span className="eyebrow">Quem faz</span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Um estúdio pequeno, obcecado por acabamento.
        </h1>
        <p className="text-sm text-ink-400">
          A FORMA3D nasceu da vontade de aproximar a impressão 3D do dia a dia
          das pessoas — sem jargão técnico, sem letra miúda, com peças que
          realmente resolvem um problema.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="spec-frame relative aspect-[4/3] overflow-hidden rounded-xs border border-[rgb(var(--border))]">
          <Image src="/images/about/printer.svg" alt="Impressora 3D FDM do estúdio" fill className="object-cover" />
        </div>
        <div className="spec-frame relative aspect-[4/3] overflow-hidden rounded-xs border border-[rgb(var(--border))]">
          <Image src="/images/about/workshop.svg" alt="Ambiente de produção da FORMA3D" fill className="object-cover" />
        </div>
      </div>

      <div className="hairline mt-16 grid gap-px overflow-hidden rounded-xs border border-[rgb(var(--border))] bg-[rgb(var(--border))] sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-4 bg-[rgb(var(--background))] p-8">
            <value.icon className="h-5 w-5 text-accent-500" />
            <h2 className="font-display text-lg font-semibold">{value.title}</h2>
            <p className="text-sm text-ink-400">{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
