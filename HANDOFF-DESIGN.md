# Handoff do Marketing (copy e oferta) para o Design

Data: 05/10/2026. Quem escreve: sessão Marketing. Quem lê: sessão de Design (webdesign e design estático de posts).

## Papéis
- **Marketing:** oferta, estratégia, copy (todo texto da página), regras do que pode ou não ser dito, assistente do chat (prompt e base de conhecimento).
- **Design:** layout, hierarquia, estilo, componentes, animação, imagens, peças estáticas.
- **Victor:** decide, faz a infra (deploy, chat no servidor).

**Texto não se reescreve no design.** Se um bloco precisar de outra frase (por exemplo, não cabe), peça ao Victor para levar ao Marketing. O guia "25 Claude Design Tricks" sugere reescrever a copy com base nos concorrentes (dica 06): **não aplicar aqui**. A copy já foi escrita com base em quatro livros de copy e em dados reais da Clique, e passou por regras de honestidade.

## Ler primeiro (no projeto)
1. `COPY.md` (o que o texto pode e não pode dizer).
2. `PRODUCT.md` e `DESIGN.md` (marca, tom, Brand Guidelines 2025). Em caso de conflito sobre **o que dizer**, vale o `COPY.md`.
3. `src/app/page.tsx` (a home atual).

## A ideia da página (uma só)
**"O anúncio traz o contato. O atendimento decide se vira cliente."** A Clique Boost não vende serviços soltos: vende um **sistema** (método BoostConnect) que leva o contato do anúncio até a conversa de venda, para profissionais brasileiros nos EUA. A IA responde e qualifica, uma pessoa fecha.

O desenho precisa reforçar essa ideia única. Menos é mais: uma ideia por tela, poucas palavras, hierarquia clara.

## Ordem das seções da home (já escrita)
1. **Hero** com título, subtítulo, tagline "Acelerando o seu sonho americano" e dois botões (Agendar uma conversa, Falar no WhatsApp).
2. **O sistema comercial da Clique Boost: quatro partes, um ciclo** (Atrair, Trazer, Atender, Acompanhar). É o coração da página: o desenho pode transformá-lo em um ciclo visual.
3. **Converse com a nossa assistente:** hoje é um espaço reservado. O design define a interface do chat. O Victor faz a infra e o Marketing escreve o prompt.
4. **Tráfego e IA trabalham juntos** (três itens).
5. **Método Viral:** três casos **sem nome**, com uma nota de rodapé obrigatória (ver regras).
6. **Dash:** painel do cliente. Funciona no navegador e no celular. App para iPhone "a caminho".
7. **O que você deixa de carregar** (cinco itens).
8. **Perguntas que todo mundo faz** (três itens).
9. **Como começamos** (Diagnóstico, Plano, Execução, Acompanhamento).
10. **Final** com botão para agendar.

## Regras para o visual (honestidade)
- **Nada que pareça resultado, cliente ou depoimento real e seja inventado.** Mockup é permitido, desde que rotulado como ilustrativo ou claramente provisório.
- **Dash:** usar só as telas ilustrativas, que trazem o selo "DADOS ILUSTRATIVOS" (pasta `Empresa/Marketing/Vitrine` do vault: `dash_organico.png`, `dash_tasks.png`). Não usar a aba Ads (ainda é mockada) nem a tela Booster AI (erro).
- **Casos do Método Viral:** só texto e número. **Não mostrar o vídeo, o print nem o nome** dos clientes. Nenhuma foto de pessoa, nenhum logo de cliente.
- **A nota de rodapé do Método Viral não pode ser removida nem ficar ilegível:** "Visualizações medem alcance, não vendas. O resultado de cada perfil varia."
- **Não incluir selo da App Store** nem texto "disponível no iPhone" enquanto o app não estiver publicado.
- **Chat:** deixar visível que é uma **assistente virtual com IA**. Aviso curto sobre privacidade. Nenhum rosto humano no avatar que sugira que é uma pessoa.
- Sem imagens geradas de "clientes satisfeitos", de equipe que não existe, de gráficos de resultado, nem de notificações de venda.
- Sem preço, garantia, desconto ou "vagas limitadas" no visual.

## Sobre o guia "25 Claude Design Tricks"
Pode usar, com estes cuidados:
- **Dica 05 (fontes):** a marca já tem fontes oficiais (Montserrat e Roboto, Brand Guidelines 2025). Só trocar se o Victor decidir.
- **Dicas 14, 15, 18 (componentes e efeitos):** checar a licença de cada um. O Canvas UI é MIT mais Commons Clause (usar sim, revender não). O Lordicon exige crédito no site. O React Bits tem licença por componente.
- **Dica 08 (gerar imagens com Kie AI):** só para fundos e ilustrações abstratas. Seguir as regras do visual acima.
- **Dica 21 (GSAP):** o projeto já usa GSAP. Cuidar de desempenho e de `prefers-reduced-motion`.
- **Dicas 06 e 12 (copy e tom de voz):** **não aplicar.** Texto é do Marketing.
- **Dica 07 (misturar sistemas de design):** a base é a marca da Clique. Não copiar a identidade de outra empresa.

## Placeholders que o design precisa tratar
- Seção do **chat** (item 3): hoje é um painel vazio.
- Seção **Dash** (item 6): hoje são dois painéis "mockup". Substituir pelas telas ilustrativas.
- **Casos do Método Viral** (item 5): cartões só com texto. Podem ganhar destaque tipográfico no número ("230 mil visualizações").

## Pedidos de texto
Se uma frase precisar mudar, o Victor leva ao chat do Marketing. Peça com o motivo (por exemplo, "não cabe em 2 linhas no mobile") para o Marketing propor a versão.

## Microcopy do chat (confirmado pelo Marketing em 05/10/2026)
- Nome: "Assistente virtual". Selo: "IA". Campo: "Escreva sua mensagem". Todos confirmados.
- Aviso de privacidade (trocar): **"Você está falando com uma IA. Não compartilhe senhas nem dados de cartão."**
- Status provisório "Chat de teste, em construção": pode ficar até o chat ligar. Quando ligar, o texto é removido.
- Mensagem de abertura da assistente (nova): "Oi! Sou a assistente virtual da Clique Boost. Posso te explicar como funciona e, se você quiser, passar para uma pessoa. Sobre o que você quer saber?"
- Atalhos de resposta (opcional, até 3): "Como funciona?", "Já tenho agência", "Quero agendar uma conversa".

## Seção 7 existe
"O que você deixa de carregar" é o componente `ValuesSlider`. O conteúdo já foi trocado pelo Marketing: os cinco itens são os da seção 7, e não os valores da marca. Manter.

## Rodada 2 (05/10/2026): mudanças de copy e o que o Design precisa ajustar

Texto já alterado em `src/app/page.tsx` pelo Marketing. O Design ajusta o visual a partir disto.

1. **Hero:** a tagline "Acelerando o seu sonho americano" **saiu**. Reequilibrar o espaço entre o texto e os botões.
2. **Seção do ciclo:** o título agora é "Um sistema para o contato não esfriar no caminho" (mais curto que o anterior). Os quatro passos (Atrair, Trazer, Atender, Acompanhar) continuam.
3. **Chat:** o parágrafo agora diz que "aqui" a assistente se apresenta como IA e que, no negócio do cliente, nome, tom de voz e fluxo são desenhados com ele. Sem mudança na interface.
4. **Tráfego e IA (FlowLoop):** continua com três itens, mas os textos 2 e 3 ficaram mais longos. Item 3: "O fluxo é desenhado com você". Verificar se cabem sem quebrar o loop visual.
5. **Método Viral (ViralCases):** **reduzir o destaque dos números.** Hoje o número é maior que tudo na seção. Os números são verdadeiros, mas modestos, e não devem ser o herói. O título e a ideia do método (formatos que já funcionaram) devem ter mais peso que o "230 mil". Manter a nota de rodapé legível.
6. **Dash (DashProofSection):**
   - Usar as novas imagens `public/dash/dash_organico_exemplo.png` e `dash_tasks_exemplo.png`, **sem** o selo "DADOS ILUSTRATIVOS" sobre a imagem.
   - **Remover o selo "DADOS ILUSTRATIVOS" da moldura** e colocar uma **legenda discreta abaixo das telas:** "Tela de exemplo do Dash." Uma linha, texto pequeno e legível. É a forma de manter honestidade sem poluir a imagem.
   - **App Store:** existe a constante `APP_STORE_LIVE` (hoje `false`) em `page.tsx`. Adicionar uma prop `appStoreLive` em `DashProofSection` e **renderizar o selo oficial da App Store só quando for `true`**. Com `false`, nenhum selo e o texto diz "o app para iPhone está a caminho". Usar o selo oficial da Apple, conforme as diretrizes de marca dela.
7. **FAQ (FaqList):** agora são **cinco** perguntas, e as respostas ficaram mais longas. Conferir o layout em mobile.
8. **Sem travessão (— ou –) em nenhum texto da interface.** Em português, usar ponto, vírgula ou dois-pontos. Isso vale para textos novos do design (rótulos, legendas, atalhos).
