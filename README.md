# BreMur3D — Site institucional de Impressão 3D

Site institucional para uma empresa de impressão 3D, construído para apresentar
produtos, gerar confiança e direcionar clientes para orçamento via WhatsApp —
sem checkout, sem backend (por enquanto).

## Stack

- **Next.js 15** (App Router, Server Components por padrão)
- **React 18** + **TypeScript**
- **TailwindCSS** com um sistema de tokens de design próprio (cores, tipografia, layout)
- **Framer Motion** para animações
- **Lucide Icons**
- Componentes de UI no estilo **shadcn/ui** (Button, Input, Select, Badge), escritos à mão para não depender de instalação via CLI

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Antes de publicar

1. **Número de WhatsApp** — troque o número fictício em `lib/whatsapp.ts` (`WHATSAPP_NUMBER`) pelo número real da empresa, no formato `55DDDNÚMERO` (só dígitos).
2. **Imagens** — as imagens em `/public/images` são ilustrações vetoriais (SVG) geradas para servir de placeholder com a identidade visual do projeto (estilo blueprint/CAD). Troque por fotos reais dos produtos, da impressora e do ambiente quando disponíveis — os componentes já usam `next/image`, então basta trocar o arquivo e, se for o caso, o `src`.
3. **Instagram/Email** — atualize os links em `components/layout/footer.tsx` e `app/contato/page.tsx`.
4. **Domínio** — atualize `siteUrl` em `app/layout.tsx` (usado nas tags de SEO/Open Graph).

## Estrutura

```
/app                     Rotas (App Router)
  /catalogo              Catálogo + filtros + página de produto ([slug])
  /projetos-personalizados  Formulário de projeto sob medida
  /sobre                 Missão, visão, valores
  /contato               Canais de contato
  loading.tsx, error.tsx, not-found.tsx   Estados globais
/components
  /layout                Header, Footer
  /home                  Seções da home (Hero, Diferenciais, Como funciona...)
  /products              Card de produto, filtros de catálogo, modal de orçamento, detalhe do produto
  /custom-project        Formulário de projetos personalizados
  /ui                    Primitivos reutilizáveis (Button, Input, Select, Badge)
  /shared                Theme provider/toggle, skeletons
/data                    "Banco de dados" fictício (produtos, categorias, cores, materiais)
/types                   Contratos de dados (Product, Order, Customer, Category...)
/lib                     Utilitários (cn, formatPrice, geração de link do WhatsApp)
/public/images           Ilustrações placeholder (SVG)
```

## Como funciona o botão "Solicitar orçamento"

Não existe checkout. Ao clicar, o site monta uma mensagem de texto (nome do
produto, preço, cor, quantidade e observações) e abre um link
`https://wa.me/<numero>?text=<mensagem>` em uma nova aba — a conversa
continua no WhatsApp da empresa. A lógica de montagem da mensagem vive em
`lib/whatsapp.ts`, centralizada para ser fácil de ajustar.

## Preparado para o futuro

A arquitetura já foi pensada para receber, sem grandes refatorações:

- **Supabase / Prisma / API REST** — as funções em `/data/*.ts`
  (`products`, `categories`, `colors`, `materials`) têm a mesma forma que uma
  chamada `fetch`/`supabase.from(...).select()` teria. Trocar o array estático
  por uma chamada assíncrona é o único passo necessário; os componentes já
  recebem os dados via props ou Server Components.
- **Autenticação e painel administrativo** — os tipos em `types/index.ts`
  (`Product`, `Order`, `Customer`, `CustomProjectRequest`, `OrderStatus`) já
  modelam o que um painel de administração (cadastro de produtos, pedidos,
  clientes, estoque, dashboard) precisaria persistir.
- **Upload de imagens** — `ProductImage` já separa `url` de `alt`/`isPrimary`,
  então trocar um SVG local por uma URL do Supabase Storage não exige mudança
  de tipo.

## Dark mode

Implementado com `next-themes`, alternável pelo botão no header. O tema
padrão é escuro (`defaultTheme="dark"`), alinhado à identidade visual do
projeto.
