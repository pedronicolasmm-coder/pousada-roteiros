# Roteiros pelas Missões | Pousada das Missões

Página de ideias de roteiros (1 a 7 dias) para o link da bio do @pousadadasmissoes.
A pousada sugere; não vende pacote nem roteiro.

## Páginas

- `index.html`: página inicial com a capa rotativa e os 7 cartões de roteiro.
- `roteiro.html?dias=N`: página de cada roteiro (N de 1 a 7), dia a dia, com uma foto para cada lugar.
  Uma página só serve para os 7 roteiros: o conteúdo vem de `roteiros.js`.
- `pousada.html`: "Conheça a pousada", espaços internos com galeria e visualizador em tela cheia. Textos e fotos em `pousada-fotos.js`, fotos em `img/pousada/`.

No ar (GitHub Pages): https://pedronicolasmm-coder.github.io/pousada-roteiros/

## Como editar

- **Textos dos roteiros:** `roteiros.js`. Cada lugar tem nome (`t`), descrição (`d`) e, quando falta confirmar, `c`.
- **Etiquetas "a confirmar":** aparecem enquanto `RASCUNHO = true` no topo de `roteiros.js`. Depois da aprovação, trocar para `false`.
- **Cidade de cada lugar:** campo `o` em `roteiros.js` (aparece na legenda da foto e conta as cidades de cada roteiro).
- **Como chegar:** bloco no `index.html` com mapa do Google e tempos de viagem marcados "a confirmar".
- **Google:** as duas páginas estão com `noindex` (rascunho). Tirar essa linha do `index.html` e do `roteiro.html` quando aprovar.

## Fotos

Basta colocar o arquivo com o nome certo. Ele aparece sozinho no lugar do espaço reservado.

| Arquivo | Onde aparece |
|---|---|
| 12 fotos (sítio, Fonte, Caaró, Catedral, Som e Luz, São João Batista, São Nicolau, San Ignacio...) | Capa rotativa da página inicial (troca a cada 3 s; lista e legendas no `index.html`, bloco `hero-fotos`; para cada foto nova, mais um `<i></i>` em `hero-prog`) |
| `img/roteiro-N-a.jpg` | Cartão do roteiro na página inicial e capa da página do roteiro |
| `img/lugares/<chave>.jpg` | Foto de cada lugar dentro do roteiro. A chave é o nome do lugar em `roteiros.js` (ex.: `museu`, `praca`, `caaro`) |
| `img/cta.jpg` | Fundo do convite final |

**Lugares ainda sem foto (aparece o espaço reservado):** aldeia, artesanato, praca, irmaica, antimon, jantar, cotiguacu, caminho.

## Atualizar o site

Depois de mudar qualquer arquivo, troque o número `?v=` (ex.: `20261111c`) nos `<link>` e `<script>` do `index.html`, `roteiro.html` e `pousada.html`. Isso faz o navegador de quem já visitou buscar as fotos e textos novos na hora.

## Link direto para um roteiro

`roteiro.html?dias=3` abre o roteiro de 3 dias. O link antigo `index.html#3-dias` redireciona para ele.

## Origem das fotos atuais (10/11/2026)

- **Acervo da pousada (Drive):** capa, hero-2 (IMG_9925), hero-4 (IMG_9906), hero-5 (IMG_9946), cta, e em `lugares/`: sitio, someluz, cafe, volta, piscina, livre.
- **Wikimedia Commons (crédito no rodapé e em `creditos.json`):** Fonte, Caaró, Catedral Angelopolitana, São João Batista, São Nicolau, arcos do sítio, San Ignacio Miní, praça de Santo Ângelo, catedral de São Luiz Gonzaga, igreja à noite.
- Ao trocar uma foto do Commons por uma da pousada, tirar o crédito correspondente do rodapé (`index.html` e `roteiro.html`).
