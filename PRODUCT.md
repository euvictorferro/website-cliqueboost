# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Três audiências agora (a terceira é nova nesta revisão):
- Empreendedores brasileiros nos EUA com um negócio em operação, ambiciosos, que sentem a necessidade de se destacar no mercado digital americano. Perfil oficial da persona (Brand Guidelines 2025): já rodando um negócio, quer crescer e usar tecnologia como vantagem competitiva, mentalidade aberta a IA, valoriza parceiros que entregam resultado mensurável.
- Empresas com marketing fragmentado (freelancers/agências separadas por site, tráfego, social) que querem consolidar num único fornecedor.
- **Nova:** outras agências de marketing (nos EUA ou não) que querem licenciar o software interno da Clique Boost (o "Aplicativo"/Clique Boost Dash) como white-label para seus próprios clientes — audiência B2B, página própria (`/aplicativo`), tom diferente das páginas de serviço (fala de agência pra agência, não de agência pra cliente final).

Job a ser feito: (1) decidir se contrata a Clique Boost como fornecedor único de marketing — em call comercial ou sozinho, sem falar com ninguém; (2) para a audiência B2B, decidir se vale a pena adotar o software da Clique Boost em vez de construir ou comprar outro painel de cliente.

## Product Purpose

Agência de marketing full-service (Websites, Tráfego Pago, Social Media, Automação, Design, Brand Guidelines) vendida como método integrado — o "BoostConnect" é o nome do método, e a homepage agora É essa página de método (antes vivia em `/metodo`). Existe também um produto de software interno, o **Clique Boost Dash** (app cliente em produção real) mais um **Admin Panel** da agência — juntos, o "Aplicativo" que ganha página própria de venda B2B para outras agências.

## Positioning

Um único time e um único painel centralizando todas as frentes de marketing do cliente — mecanismo que uma agência fragmentada não replica. Para a audiência B2B: a Clique Boost já opera essa tecnologia em produção real, com clientes reais e dado real (não é uma ideia ou MVP) — isso é o argumento de credibilidade do `/aplicativo`.

## Operating Context

- Site usado em dois contextos: (1) compartilhado na tela durante call de vendas; (2) navegado sozinho.
- **Nova estrutura de navegação:** a home (`/`) é o método (conteúdo que antes vivia em `/metodo` — `/metodo` deixa de existir, redireciona para `/`). O menu tem um dropdown "Serviços" com 7 itens: Websites, Tráfego Pago, Social Media, Automação, Design, Brand Guidelines, e Aplicativo (este último aponta para a página B2B dedicada).
- Fluxo de conversão: WhatsApp ("Falar com um consultor") nas páginas de serviço/home; a página `/aplicativo` deve ter sua própria CTA (provavelmente waitlist/contato comercial B2B, não o mesmo WhatsApp de vendas B2C — a decidir com o usuário quando o briefing do app chegar).

## Capabilities and Constraints

- Next.js (App Router) + Tailwind v4. GSAP mantido para reveals de scroll; biblioteca `motion` adicionada para interações spring-based (dropdown do menu, feedback de press) seguindo a skill Apple Design.
- **Ativos de marca reais agora disponíveis** em `public/brand/`: `logo-light.png` (logo branca, para fundo escuro), `logo-dark.png` (logo preta, para fundo claro), `favicon.png` (símbolo apenas). Vieram do Brand Guidelines 2025 oficial.
- **Produto real por trás do "Aplicativo":** repositório `dashboard_cliqueboost` (Next.js + Supabase, em produção em `dash.cliqueboost.io`). Funcionalidades confirmadas em produção: métricas orgânicas de Instagram com dado real via Meta Graph API (6 clientes reais conectados: Débora, Laís, Sam, Nelson, Tiago, Bela), aba de Ads (hoje mockada/bloqueada até cliente ter tráfego pago ativo), board de conteúdos (via Trello), tarefas (via ClickUp), calendário de postagens, atas de reunião (Google Drive/Calendar), "Booster AI" (chat com IA via Anthropic dentro do painel do cliente), área de arquivos do cliente ("Bunker"), conta/faturamento/indicações (Stripe). Existe também um Admin Panel da agência (`admin.cliqueboost.io`) para gestão de clientes, indicações e faturamento.
- **Fundação multi-tenant já iniciada** no banco (tabela `agencies`, coluna `agency_id`) mas a oferta B2B em si (outras agências se cadastrando e usando com a própria marca) **ainda não está no ar** — é o próximo passo, não um produto já vendido. A página `/aplicativo` deve vender isso como "em abertura/early access sobre uma base já validada em produção", nunca como algo já disponível para self-signup hoje.
- **Modelo de negócio do B2B confirmado pelo usuário: white-label** — a agência cliente usa o painel com a própria marca; a Clique Boost é a tecnologia por trás, invisível para o cliente final da agência licenciada.
- Relatório em PDF é um stub (não implementado). Não afirmar isso como funcionalidade pronta.
- **Briefing do app recebido (visão de produto, ainda não tudo construído):** o Aplicativo é pensado como um **hub com dois lados**, não só um painel de leitura.
  - **Lado cliente da agência:** acompanha tarefas da agência, conteúdos produzidos, métricas orgânicas E pagas, e conversa com um chatbot de IA sobre métricas e plano — hoje isso já existe parcialmente (tarefas via ClickUp, conteúdo via Trello, métricas orgânicas reais, Booster AI) mas **métricas pagas (Ads) ainda são mockadas** e o chatbot ainda não fala especificamente "sobre o plano" da agência — é a direção, não o estado atual completo.
  - **Lado agência (dono da agência, o cliente B2B do white-label):** um SaaS onde a agência conecta a própria conta Meta/Business Manager com todos os clientes dela, e um agente de IA entende automaticamente o negócio de cada cliente (produto, estratégia, budget, nicho) a partir de um briefing, gerando campanhas e roteiros de conteúdo com padrão viral para o nicho — a agência foca em captar cliente e executar produção (edição de vídeo, design). **Isso é visão/roadmap do produto, não uma funcionalidade construída ainda** — não existe hoje conexão de Business Manager de terceiros, nem geração automática de campanha/roteiro por IA no código do `dashboard_cliqueboost`.
  - Existe também um app mobile nativo em desenvolvimento (`Clique Boost App`, wrapper Capacitor + iOS) — **ainda não publicado na App Store**, é o mesmo produto embalado para mobile.
  - **Regra de honestidade a manter na página `/aplicativo`:** apresentar a visão do hub de dois lados como "para onde estamos indo" com convicção (é um pitch de visão, não uma mentira — é real que está sendo construído), mas nunca apresentar geração automática de campanha por IA, conexão de Business Manager de terceiros, ou app na App Store como já disponíveis hoje.

## Brand Commitments (Brand Guidelines 2025 — oficial, substitui qualquer decisão de direção anterior)

- Nome: Clique Boost. Nome do método: "BoostConnect".
- **Tagline oficial:** "Acelerando o seu sonho americano." (usar literal, é a síntese da missão — sempre em Montserrat Bold ou destaque visual equivalente).
- **Paleta primária:** Future Gradient (roxo `#8A2BE2` → azul `#007BFF`, 135°), Deep Black `#151515`, Pure White `#FFFFFF`.
- **Paleta secundária** (uso pontual, nunca como base): Accent Purple `#8A2BE2`, Accent Blue `#007BFF`, Indigo Tech `#4D54FF`, Success Green `#00C49A`, Cyber Pink `#F012BE`, Warning Yellow `#FFD700`, Neon Cyan `#00F0FF`, Error Red `#FF4136`, Teal Data `#39CCCC`, além de cinzas (Light/Mid/Dark Grey).
- **Tipografia oficial:** Montserrat (Bold para H1, SemiBold para H2, tracking -15 no display) para títulos; Roboto Regular para corpo de texto. Isso substitui qualquer fonte usada antes (nada de fonte script/cursiva, nada de fonte industrial condensada — essas eram direções provisórias pré-brand-guidelines).
- **Logo:** símbolo é duas setas abstratas ("Clique" e "Boost") — seta inferior = ponto de partida/ação inicial, seta superior = crescimento acelerado/ascensão, unidas por gradiente. Variantes reais em `public/brand/`: `logo-light.png` (branca, fundo escuro — uso padrão no site, que é dark), `logo-dark.png` (preta, fundo claro), `favicon.png` (símbolo isolado).
- **Persona:** "Empreendedor Brasileiro nos EUA" — perfil oficial documentado (ver seção Users).
- **Visão:** ser a agência de marketing de referência para a comunidade brasileira nos EUA, reconhecida por gerar resultados de vendas exponenciais e ser parceiro estratégico essencial.
- **Missão:** impulsionar o sucesso de empreendedores brasileiros nos EUA transformando negócios com estratégias de marketing inovadoras e tecnologia de ponta (IA).
- **Tom de voz:** Direto, Empático, Especialista, Cultural — fala a língua de quem é brasileiro nos EUA, valida medos reais (desconfiança de consultor sem experiência prática, dificuldade de explicar pra família que está investindo fora), usa autoridade baseada em resultado, não em teoria.
- **Palavras que a marca gosta:** Inteligência Artificial, Performance, Resultados Mensuráveis, Automação Inteligente, Crescimento Acelerado, Eficiência Operacional, Vantagem Competitiva, Estratégia, Inovação Prática.
- **Palavras banidas:** "Acho que...", Fórmula Mágica, Promessas Vazias, Post por Postar, Processo Manual, "Vamos ver no que dá", Jargão Complicado, Genérico, Burocracia.
- Idioma: português do Brasil, em todas as páginas.

## Evidence on Hand

- Ainda sem cases/depoimentos/números de clientes publicáveis no site institucional — não inventar.
- **Porém**, para a página `/aplicativo`, existe evidência real e honesta a favor: o Clique Boost Dash está em produção real (`dash.cliqueboost.io`) atendendo 6 clientes reais com dado real do Instagram via Meta Graph API — isso pode e deve ser usado como prova de solidez técnica ("testado em produção", "dado real, não maquete"), sem citar nomes de clientes publicamente e sem prometer o programa B2B como já disponível.

## Product Principles

1. O site deve funcionar em dois modos de uso: apresentado por um consultor em call e navegado sozinho.
2. A percepção de "método único" (BoostConnect) é a espinha dorsal da narrativa da home, não só um item de menu.
3. A partir desta revisão, a identidade visual **segue o Brand Guidelines 2025 oficial** — não é mais uma direção de design inventada; gradiente/preto/branco/Montserrat/Roboto são compromisso de marca, não escolha estética livre.
4. A página `/aplicativo` fala com outra audiência (agências) e nunca deve reaproveitar o `ServicePageTemplate` das páginas de serviço B2C.
5. Honestidade sobre o estágio do produto B2B: "fundação em produção real, abertura para outras agências em breve" — nunca "disponível agora" enquanto não for.
6. Não deve parecer "gerado por IA": zero clichês de landing page genérica.
