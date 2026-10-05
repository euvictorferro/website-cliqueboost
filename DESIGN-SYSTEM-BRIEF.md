# Brief para o Claude Design: design system da Clique Boost

Cole o bloco "Descrição" no campo de descrição do negócio. Anexe os arquivos da seção "Assets".

## Descrição (colar)

A Clique Boost é uma agência de marketing para profissionais brasileiros nos EUA (corretores, agentes de seguro, consultores financeiros, contadores, designers de interiores). Ela não vende serviços soltos: monta um sistema, o BoostConnect, que leva o contato do anúncio até a conversa de venda. A IA responde e qualifica, uma pessoa fecha. O cliente acompanha tudo no Clique Boost Dash.

Ideia central do site: "O anúncio traz o contato. O atendimento decide se vira cliente."

Público: empreendedores brasileiros nos EUA com negócio em operação, ambiciosos, abertos a tecnologia e a IA, que desconfiam de consultor sem experiência prática. O site é usado de duas formas: mostrado na tela por um consultor durante uma call de vendas e navegado sozinho.

Tom de voz: direto, empático, especialista, cultural. Português do Brasil. Frases curtas, uma ideia por tela.

### Direção visual
- Tema escuro, sóbrio, editorial. Preto quase puro, branco e cinzas tonais. Superfícies separadas por tom de cinza, não por brilho nem por borda dupla.
- Cor é rara. O degradê da marca (roxo #8A2BE2 para azul, 135 graus) aparece apenas no botão de ação principal e no logo. Nada de texto em degradê, brilhos coloridos, anéis ou manchas decorativas.
- Hierarquia por tamanho e peso, não por cor. Títulos grandes em serifada leve, tracking apertado (-0,025em a -0,035em), nunca em caixa alta. Sem kicker ou rótulo acima de títulos.
- Uma peça central por seção (diagrama, tela do produto, interface de chat), nunca decoração abstrata.
- Movimento com propósito: GSAP para revelar na rolagem, cada seção com sua entrada, um efeito de fluido discreto no hero. Respeitar prefers-reduced-motion mantendo feedback curto de 120ms.

### Tokens
- Fundo #0B0B0D, painel #151515, painel elevado #1C1C1F, texto #FFFFFF, texto secundário #9A9AA2, borda rgba(255,255,255,0.10), borda forte rgba(255,255,255,0.20).
- Botão principal: degradê 135 graus de #8A2BE2 para #0A6EF0, texto branco (contraste 4,7:1). Botão secundário: contorno de 1px, sem preenchimento.
- Formas: painéis com raio 20px, botões em pílula, círculos neutros para números.
- Espaçamento vertical de seção: 7rem. Largura de conteúdo: 72rem.
- Paleta secundária (somente visualização de dados no produto): #4D54FF, #00C49A, #F012BE, #FFD700, #00F0FF, #FF4136, #39CCCC.
- Tipografia: títulos em Instrument Serif peso 400 (itálico para ênfase), corpo e títulos pequenos em Geist (h3 em 600). Substitui Montserrat e Roboto por decisão do Victor em 05/10/2026.

### Componentes que o sistema precisa cobrir
Navbar translúcida com menu de serviços, botão pílula (principal e secundário), painel, marcador numérico neutro, diagrama de ciclo animado (4 etapas), fluxo de 3 etapas com retorno, linha de etapas, acordeão de perguntas, interface de chat de assistente com IA (aviso de IA visível, atalhos de resposta, campo de texto), moldura de navegador para telas do produto com legenda, cartões de caso em texto e número, rodapé.

### Regras de honestidade (obrigatórias em qualquer tela)
- Nada que pareça resultado, cliente ou depoimento inventado. Sem fotos de pessoas, logos de clientes, notificações de venda ou gráficos de resultado.
- Telas do Dash só como "Tela de exemplo do Dash." em legenda discreta abaixo das imagens.
- Sem preço, desconto, garantia, "vagas limitadas" ou selo da App Store enquanto o app não estiver publicado.
- A IA sempre se apresenta como IA. O chat tem aviso curto de privacidade e nenhum rosto humano no avatar.
- Visualizações medem alcance, não vendas: a nota de rodapé do Método Viral nunca some.
- Nenhum travessão (— ou –) em texto de interface.

### Palavras banidas
"Acho que...", fórmula mágica, promessas vazias, post por postar, processo manual, "vamos ver no que dá", jargão complicado, genérico, burocracia.

## Assets (anexar)
- `public/brand/logo-light.png` (logo branca, fundo escuro, uso padrão)
- `public/brand/logo-dark.png` (logo preta, fundo claro)
- `public/brand/favicon.png` (símbolo isolado: duas setas, "Clique" e "Boost")
- `public/dash/dash_organico_exemplo.png` e `public/dash/dash_tasks_exemplo.png` (telas de exemplo do Dash)
- Arquivos das fontes escolhidas, se forem trocadas
- Opcional: print da home atual (rodando em localhost:3210) como referência de composição
