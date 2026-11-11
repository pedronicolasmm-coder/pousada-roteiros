/*
  TEXTOS DOS ROTEIROS
  Edite aqui. Cada lugar tem: t = nome, o = cidade (aparece na foto), d = descricao, c = observacao "a confirmar"
  (aparece como etiqueta enquanto RASCUNHO = true). Quando os donos aprovarem,
  apague o campo c e troque RASCUNHO para false.
*/
const RASCUNHO = true;

const L = {
  sitio:     { t: "Patrimônio Mundial de São Miguel Arcanjo", o: "São Miguel das Missões", d: "Caminhada pelo sítio arqueológico reconhecido pela UNESCO: a igreja, a praça das reduções e os detalhes da pedra trabalhada pelos guaranis." },
  museu:     { t: "Museu das Missões", o: "São Miguel das Missões", d: "Imagens sacras esculpidas nas reduções, guardadas dentro do próprio sítio." },
  aldeia:    { t: "Aldeia guarani Tekoá Koenju", o: "São Miguel das Missões", d: "Comunidade guarani mbyá que mantém viva a língua, o canto e o artesanato do povo que ergueu as reduções. Uma visita para ouvir e aprender, sempre combinada antes.", c: "Confirmar nome da aldeia, se recebe visitantes, como agendar e se há guia." },
  artesanato:{ t: "Artesanato guarani", o: "São Miguel das Missões", d: "Peças feitas pelas famílias guarani da região, um jeito de levar as Missões para casa.", c: "Confirmar onde e quando o artesanato fica exposto." },
  someluz:   { t: "Espetáculo Som e Luz", o: "São Miguel das Missões", d: "À noite, a história dos Sete Povos contada com luz e narração na fachada da igreja.", c: "Confirmar dias e horários do espetáculo." },
  someluz2:  { t: "Som e Luz de novo, se quiser", o: "São Miguel das Missões", d: "Quem gostou na primeira noite costuma rever com outro olhar, já conhecendo a história." },
  cafe:      { t: "Café colonial na pousada", o: "Pousada das Missões", d: "Incluso na diária, para começar o dia sem pressa." },
  fonte:     { t: "Fonte Missioneira", o: "São Miguel das Missões", d: "Fonte de pedra do tempo das reduções, um dos cantos mais bonitos da cidade.", c: "Confirmar descrição histórica." },
  praca:     { t: "Praça e centro da cidade", o: "São Miguel das Missões", d: "Passeio a pé pelo centro de São Miguel, com tempo para um café e para as lojinhas." },
  irmaica:   { t: "Cena Irmaicá", o: "São Miguel das Missões", d: "Texto a definir com a pousada.", c: "Confirmar nome correto e o que é o lugar." },
  antimon:   { t: "Antimonumento ao Bandeirante", o: "São Miguel das Missões", d: "Obra que provoca a pensar a história das Missões pelo olhar de quem viveu aqui.", c: "Confirmar local e descrição." },
  borraio:   { t: "Borraio", o: "São Miguel das Missões", d: "Galpão rústico com objetos antigos, ferramentas e lembranças que contam as origens das famílias da região.", c: "Confirmar descrição, endereço e horário de visitação." },
  jantar:    { t: "Jantar na cidade", o: "São Miguel das Missões", d: "A pousada não serve jantar, mas indica onde comer bem em São Miguel." },
  caaro:     { t: "Santuário do Caaró, em Caibaté", o: "Caibaté", d: "Lugar de fé ligado aos mártires das Missões, com o santuário e a mata ao redor.", c: "Confirmar descrição histórica." },
  catedral:  { t: "Catedral Angelopolitana, em Santo Ângelo", o: "Santo Ângelo", d: "A catedral inspirada na igreja de São Miguel Arcanjo, no coração de Santo Ângelo." },
  stoangelo: { t: "Centro de Santo Ângelo", o: "Santo Ângelo", d: "Praça, comércio e almoço antes de voltar para a pousada.", c: "Confirmar outros pontos que a pousada indica em Santo Ângelo." },
  volta:     { t: "Volta para a pousada", o: "Pousada das Missões", d: "A mesma cama todas as noites: sem fazer e desfazer mala a cada cidade." },
  saojoao:   { t: "Sítio de São João Batista, em Entre-Ijuís", o: "Entre-Ijuís", d: "Vestígios de mais uma redução dos Sete Povos, para entender como as Missões se espalhavam pela região.", c: "Confirmar horários de visitação." },
  piscina:   { t: "Tarde na piscina da pousada", o: "Pousada das Missões", d: "Depois de uma manhã de estrada, a tarde é para descansar sem sair da pousada." },
  saonic:    { t: "São Nicolau", o: "São Nicolau", d: "Um dos Sete Povos, com sítio arqueológico e paisagem do Rio Uruguai na região.", c: "Confirmar o que está aberto para visitação." },
  saoluiz:   { t: "São Luiz Gonzaga", o: "São Luiz Gonzaga", d: "Mais um dos Sete Povos, com memória missioneira no centro da cidade.", c: "Confirmar o que a pousada indica visitar." },
  detalhes:  { t: "O sítio com calma", o: "São Miguel das Missões", d: "Segunda visita ao Patrimônio Mundial para ver o que passa despercebido: relógio de sol, a quinta dos padres e os caminhos das reduções.", c: "Confirmar os pontos com o Zé." },
  cotiguacu: { t: "Cotiguaçu", o: "Região das Missões", d: "Texto a definir com a pousada.", c: "Confirmar o que é e como visitar." },
  livre:     { t: "Noite livre", o: "Pousada das Missões", d: "Para jantar com calma na cidade ou ficar na pousada." },
  argentina: { t: "San Ignacio Miní, na Argentina", o: "San Ignacio, Argentina", d: "Do outro lado do Rio Uruguai, outra redução jesuítica reconhecida pela UNESCO.", c: "Confirmar travessia, documentos e se a pousada quer sugerir este passeio." },
  caminho:   { t: "Ou: um trecho do Caminho das Missões", o: "Região das Missões", d: "Para quem gosta de caminhar, um pedaço da rota a pé entre os antigos povos.", c: "Confirmar como indicar este passeio." }
};

const D = {
  essencial: { titulo: "O essencial de São Miguel", manha: ["sitio", "museu"], tarde: ["fonte", "praca", "artesanato"], noite: ["someluz"] },
  sitio:     { titulo: "O Patrimônio Mundial", manha: ["sitio"], tarde: ["museu", "artesanato"], noite: ["someluz"] },
  cidade:    { titulo: "A cidade de São Miguel", manha: ["cafe", "fonte", "praca"], tarde: ["aldeia", "irmaica", "antimon", "borraio"], noite: ["jantar"] },
  caaro:     { titulo: "Caaró e Santo Ângelo", manha: ["cafe", "caaro"], tarde: ["catedral", "stoangelo"], noite: ["volta", "someluz2"] },
  saojoao:   { titulo: "São João Batista", manha: ["cafe", "saojoao"], tarde: ["piscina"], noite: ["livre"] },
  calma:     { titulo: "Um dia sem pressa", manha: ["cafe", "detalhes"], tarde: ["cotiguacu", "piscina"], noite: ["livre"] },
  saonic:    { titulo: "São Nicolau e São Luiz Gonzaga", manha: ["cafe", "saonic"], tarde: ["saoluiz"], noite: ["volta"] },
  outrolado: { titulo: "Do outro lado do rio", manha: ["cafe", "argentina"], tarde: ["caminho"], noite: ["someluz2"] }
};

const ROTEIROS = [
  { dias: 1, nome: "Um dia em São Miguel", resumo: "O essencial numa viagem só: Patrimônio Mundial de dia e Som e Luz à noite.", ideal: "Quem está de passagem ou vem pela primeira vez.", fotos: ["Sítio de São Miguel de dia, com gente caminhando", "Fachada iluminada no Som e Luz"], dias_: ["essencial"] },
  { dias: 2, nome: "Dois dias em São Miguel", resumo: "Primeiro o sítio e o Som e Luz. Depois, a cidade no teu ritmo.", ideal: "Casais e famílias que querem conhecer sem correr.", fotos: ["Família na frente da igreja", "Fonte Missioneira"], dias_: ["sitio", "cidade"] },
  { dias: 3, nome: "Três dias pelas Missões", resumo: "São Miguel como base, com o Caaró e a Catedral de Santo Ângelo no meio do caminho.", ideal: "Quem quer sentir as Missões além de um só lugar.", fotos: ["Santuário do Caaró", "Catedral Angelopolitana"], dias_: ["sitio", "caaro", "cidade"] },
  { dias: 4, nome: "Quatro dias, mais um dos Sete Povos", resumo: "O roteiro de três dias com uma manhã no sítio de São João Batista.", ideal: "Quem gosta de história e quer ver mais de uma redução.", fotos: ["Sítio de São João Batista", "Piscina da pousada à tarde"], dias_: ["sitio", "cidade", "caaro", "saojoao"] },
  { dias: 5, nome: "Cinco dias pelos Sete Povos", resumo: "Os povos missioneiros da região, sempre voltando para a mesma pousada.", ideal: "Quem quer conhecer a região inteira com calma.", fotos: ["São Nicolau", "Estrada entre as cidades missioneiras"], dias_: ["sitio", "cidade", "caaro", "saojoao", "saonic"] },
  { dias: 6, nome: "Seis dias, com um dia sem pressa", resumo: "Os Sete Povos e um dia inteiro para rever o sítio com calma e descansar na pousada.", ideal: "Quem está de férias e quer viajar sem cansar.", fotos: ["Detalhe da pedra no sítio", "Café colonial na pousada"], dias_: ["sitio", "cidade", "caaro", "saojoao", "calma", "saonic"] },
  { dias: 7, nome: "Uma semana nas Missões", resumo: "De São Miguel Arcanjo ao outro lado do Rio Uruguai, com a pousada como base.", ideal: "Quem quer a experiência completa das Missões.", fotos: ["Grupo de hóspedes na placa da pousada", "Rio Uruguai"], dias_: ["sitio", "cidade", "caaro", "saojoao", "calma", "saonic", "outrolado"] }
];
