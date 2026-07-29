import type { DifferentialItem, ProcessStep } from "@/types";

export const differentials: DifferentialItem[] = [
  {
    id: "diff-1",
    title: "Alta qualidade",
    description: "Impressoras calibradas e revisão manual em cada peça antes da entrega.",
    icon: "BadgeCheck",
  },
  {
    id: "diff-2",
    title: "Impressão de precisão",
    description: "Camadas de até 0,1mm para acabamento fino e encaixes exatos.",
    icon: "Crosshair",
  },
  {
    id: "diff-3",
    title: "Atendimento personalizado",
    description: "Conversa direta pelo WhatsApp, do orçamento à entrega.",
    icon: "MessageCircle",
  },
  {
    id: "diff-4",
    title: "Diversas cores",
    description: "Mais de 8 cores de filamento disponíveis para qualquer peça.",
    icon: "Palette",
  },
  {
    id: "diff-5",
    title: "Peças exclusivas",
    description: "Desenvolvemos modelos sob medida quando o catálogo não é suficiente.",
    icon: "Sparkles",
  },
];

export const processSteps: ProcessStep[] = [
  { id: "step-1", step: 1, title: "Escolha um produto", description: "Navegue pelo catálogo ou descreva sua ideia personalizada." },
  { id: "step-2", step: 2, title: "Escolha cor e tamanho", description: "Selecione o acabamento que combina com o seu espaço." },
  { id: "step-3", step: 3, title: "Receba orçamento", description: "Enviamos o valor e prazo diretamente no seu WhatsApp." },
  { id: "step-4", step: 4, title: "Produção", description: "Sua peça entra na fila de impressão com acompanhamento." },
  { id: "step-5", step: 5, title: "Entrega", description: "Peça pronta, revisada e embalada até você." },
];
