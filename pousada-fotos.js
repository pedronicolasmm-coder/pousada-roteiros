/*
  FOTOS E TEXTOS DA PAGINA "CONHECA A POUSADA" (pousada.html)
  Cada espaco tem: id (ancora), curto (nome no menu), rotulo, titulo, texto, c = observacao "a confirmar",
  itens (lista opcional) e fotos [{ f: arquivo, leg: legenda }]. A primeira foto aparece grande.
  Para trocar uma foto: substitua o arquivo em img/pousada/ ou mude o caminho aqui.
  Regra da pousada: falar "apartamentos" e "suites" (nunca "quartos").
*/
const ESPACOS = [
  {
    id: 'apartamentos', curto: 'Apartamentos e suítes', rotulo: 'Hospedagem', titulo: 'Apartamentos e suítes',
    texto: 'Ambientes aconchegantes, com enxoval caprichado, para descansar bem depois de um dia inteiro de passeios pelas Missões.',
    c: 'Confirmar tipos de apartamento e suíte, capacidade e comodidades de cada um.',
    itens: ['Banheiro privativo', 'Suítes com banheira', 'Ar-condicionado', 'TV e frigobar', 'Wi-Fi'],
    fotos: [
      { f: 'img/pousada/apto-1.jpg', leg: 'Suíte com banheira, vista geral' },
      { f: 'img/pousada/apto-2.jpg', leg: 'Cama de casal com enxoval' },
      { f: 'img/pousada/apto-3.jpg', leg: 'Mesa e iluminação da suíte' },
      { f: 'img/pousada/apto-4.jpg', leg: 'Banheira da suíte' },
      { f: 'img/pousada/apto-5.jpg', leg: 'Bancada com cuba dupla' },
      { f: 'img/pousada/apto-6.jpg', leg: 'Apartamento' },
      { f: 'img/pousada/apto-7.jpg', leg: 'Apartamento com cama de casal' },
      { f: 'img/pousada/apto-8.jpg', leg: 'Detalhes do banheiro' },
      { f: 'img/roteiro-7-b.jpg', leg: 'Apartamento' }
    ]
  },
  {
    id: 'cafe', curto: 'Café colonial', rotulo: 'Todas as manhãs', titulo: 'Café colonial',
    texto: 'Incluso na diária. Frutas, pães, frios, bolos e o que mais a cozinha preparar no dia, para começar a viagem sem pressa.',
    c: 'Confirmar horário do café e o que costuma ser servido.',
    fotos: [
      { f: 'img/pousada/cafe-1.jpg', leg: 'Mesa do café colonial' },
      { f: 'img/roteiro-2-b.jpg', leg: 'Café colonial' },
      { f: 'img/pousada/cafe-2.jpg', leg: 'Salão do café' }
    ]
  },
  {
    id: 'piscina', curto: 'Piscina', rotulo: 'Lazer', titulo: 'Piscina',
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
    id: 'jardins', curto: 'Jardins', rotulo: 'Áreas externas', titulo: 'Jardins e áreas externas',
    texto: 'Palmeiras, gramado e caminhos de jardim entre os apartamentos. Um lugar tranquilo para voltar no fim do dia.',
    fotos: [
      { f: 'img/pousada/jardim-1.jpg', leg: 'Fachada da pousada' },
      { f: 'img/pousada/jardim-2.jpg', leg: 'Jardim interno' },
      { f: 'img/cta.jpg', leg: 'Jardim entre os apartamentos' },
      { f: 'img/roteiro-5-b.jpg', leg: 'Caminho do jardim' },
      { f: 'img/pousada/jardim-4.jpg', leg: 'Entrada' }
    ]
  },
  {
    id: 'estacionamento', curto: 'Estacionamento', rotulo: 'Incluso na diária', titulo: 'Estacionamento',
    texto: 'O carro fica dentro da pousada durante toda a estadia, enquanto tu aproveita os passeios.',
    c: 'Confirmar se há vagas cobertas.',
    fotos: [
      { f: 'img/pousada/estac-1.jpg', leg: 'Estacionamento da pousada' },
      { f: 'img/pousada/estac-2.jpg', leg: 'Placa do estacionamento' },
      { f: 'img/pousada/estac-3.jpg', leg: 'Acesso de carro' }
    ]
  }
];
