/*
  FOTOS E TEXTOS DA PAGINA "CONHECA A POUSADA" (pousada.html)
  Cada espaco tem: id (ancora), curto (nome no menu), rotulo, titulo, texto, c = observacao "a confirmar",
  itens (lista opcional) e fotos [{ f: arquivo, leg: legenda }]. A primeira foto aparece grande.
  Para trocar uma foto: substitua o arquivo em img/pousada/ ou mude o caminho aqui.
  Regra da pousada: falar "apartamentos" e "suites" (nunca "quartos").
  Galeria fecha certinho com 3, 5 ou 9 fotos.
  capa = foto horizontal e grande (2000 px ou mais) que entra na capa rotativa do topo; '' = espaco fica fora da capa.
*/
const ESPACOS = [
  {
    id: 'apartamentos', capa: 'img/pousada/std-1.jpg', curto: 'Apartamentos', rotulo: 'Hospedagem', titulo: 'Apartamentos',
    texto: 'Do individual ao quádruplo, com camas arrumadas com capricho, para casais, famílias e grupos de amigos descansarem bem depois dos passeios.',
    c: 'Confirmar comodidades dos apartamentos (ar-condicionado, TV, frigobar, Wi-Fi).',
    itens: ['Individual', 'Duplo', 'Triplo', 'Quádruplo', 'Banheiro privativo'],
    fotos: [
      { f: 'img/pousada/std-1.jpg', leg: 'Apartamento com cama de casal e de solteiro' },
      { f: 'img/pousada/std-2.jpg', leg: 'Apartamento de casal' },
      { f: 'img/pousada/std-3.jpg', leg: 'Apartamento triplo' },
      { f: 'img/pousada/apto-8.jpg', leg: 'Apartamento com cama de casal e de solteiro' },
      { f: 'img/pousada/std-4.jpg', leg: 'Apartamento com duas camas' }
    ]
  },
  {
    id: 'suites', capa: 'img/pousada/apto-1.jpg', curto: 'Suítes', rotulo: 'Um cuidado a mais', titulo: 'Suítes com hidromassagem',
    texto: 'Suítes amplas, com banheira de hidromassagem, iluminação aconchegante e bancada com cuba dupla. Para uma viagem a dois ou uma comemoração.',
    c: 'Confirmar quantas suítes existem e as comodidades de cada uma.',
    itens: ['Banheira de hidromassagem', 'Cama de casal', 'Cuba dupla'],
    fotos: [
      { f: 'img/pousada/apto-1.jpg', leg: 'Suíte com hidromassagem, vista geral' },
      { f: 'img/pousada/apto-2.jpg', leg: 'Cama de casal com enxoval' },
      { f: 'img/pousada/apto-3.jpg', leg: 'Mesa e iluminação da suíte' },
      { f: 'img/pousada/apto-4.jpg', leg: 'Banheira de hidromassagem' },
      { f: 'img/pousada/apto-5.jpg', leg: 'Bancada com cuba dupla' }
    ]
  },
  {
    id: 'cafe', capa: '', curto: 'O melhor café da região', rotulo: 'Todas as manhãs', titulo: 'O melhor café da região',
    texto: 'Incluso na diária. Frutas, pães, frios, bolos e o que mais a cozinha preparar no dia. Em dias bonitos, o café também pode virar piquenique no jardim da pousada.',
    c: 'Confirmar horário do café e se o piquenique é oferecido, como pedir e se tem custo extra.',
    fotos: [
      { f: 'img/pousada/cafe-a.jpg', leg: 'Bolos, pães caseiros e folhados do café da manhã' },
      { f: 'img/pousada/piq-1.jpg', leg: 'Piquenique no jardim da pousada' },
      { f: 'img/pousada/cafe-b.jpg', leg: 'Bolos e pães caseiros' },
      { f: 'img/pousada/cafe-1.jpg', leg: 'Mesa do café da manhã' },
      { f: 'img/pousada/piq-2.jpg', leg: 'Piquenique entre os apartamentos' },
      { f: 'img/pousada/cafe-c.jpg', leg: 'Mesa posta no salão' },
      { f: 'img/pousada/piq-3.jpg', leg: 'Piquenique a dois no gramado' },
      { f: 'img/pousada/cafe-d.jpg', leg: 'Sucos, leite e café' },
      { f: 'img/pousada/piq-4.jpg', leg: 'Cesta de piquenique' }
    ]
  },
  {
    id: 'cozinha', capa: 'img/pousada/churras-capa.jpg', curto: 'Cozinha e churrasco', rotulo: 'Para os hóspedes', titulo: 'Cozinha e churrasqueira',
    texto: 'Uma cozinha equipada e uma área de churrasqueira com mesa grande, para preparar uma refeição ou fazer aquele churrasco em família.',
    c: 'Confirmar se a cozinha e a churrasqueira são de uso dos hóspedes, horários e se precisa reservar.',
    fotos: [
      { f: 'img/pousada/churras-1.jpg', leg: 'Área da churrasqueira' },
      { f: 'img/pousada/cozinha-1.jpg', leg: 'Cozinha' },
      { f: 'img/pousada/cozinha-2.jpg', leg: 'Cozinha equipada' }
    ]
  },
  {
    id: 'piscina', capa: 'img/pousada/piscina-1.jpg', curto: 'Piscina', rotulo: 'Lazer', titulo: 'Piscina',
    texto: 'Para as tardes de calor, entre um passeio e outro, com espreguiçadeiras e mesas ao redor.',
    c: 'Confirmar horário de uso e em que meses fica aberta.',
    fotos: [
      { f: 'img/pousada/piscina-1.jpg', leg: 'Piscina da pousada' },
      { f: 'img/pousada/piscina-2.jpg', leg: 'Mesas ao redor da piscina' },
      { f: 'img/roteiro-6-b.jpg', leg: 'Piscina com palmeiras' },
      { f: 'img/pousada/piscina-3.jpg', leg: 'Espreguiçadeiras' },
      { f: 'img/pousada/piscina-4.jpg', leg: 'Área da piscina' }
    ]
  },
  {
    id: 'jardins', capa: 'img/pousada/jardim-2.jpg', curto: 'Jardins', rotulo: 'Áreas externas', titulo: 'Jardins e áreas externas',
    texto: 'Palmeiras, gramado e caminhos de jardim entre os apartamentos. Um lugar tranquilo para voltar no fim do dia.',
    fotos: [
      { f: 'img/pousada/jardim-4.jpg', leg: 'Fachada com palmeiras' },
      { f: 'img/pousada/jardim-5.jpg', leg: 'Flores na entrada' },
      { f: 'img/pousada/jardim-6.jpg', leg: 'Jardim em frente aos apartamentos' },
      { f: 'img/pousada/jardim-2.jpg', leg: 'Jardim interno' },
      { f: 'img/cta.jpg', leg: 'Jardim entre os apartamentos' }
    ]
  },
  {
    id: 'estacionamento', capa: '', curto: 'Estacionamento', rotulo: 'Incluso na diária', titulo: 'Estacionamento',
    texto: 'O carro fica dentro da pousada durante toda a estadia, enquanto tu aproveita os passeios.',
    c: 'Confirmar se há vagas cobertas.',
    fotos: [
      { f: 'img/pousada/jardim-7.jpg', leg: 'Estacionamento ao lado do jardim' },
      { f: 'img/pousada/estac-2.jpg', leg: 'Placa do estacionamento' },
      { f: 'img/pousada/estac-3.jpg', leg: 'Acesso de carro' }
    ]
  }
];
