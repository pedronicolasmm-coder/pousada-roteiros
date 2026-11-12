/*
  VERSAO EM ESPANHOL (aparece sozinha quando o navegador da pessoa esta em espanhol,
  ou quando ela escolhe ES no topo ou no rodape; link direto: qualquer pagina com ?lang=es)
  Os textos fixos das paginas ficam no proprio HTML, no atributo data-es.
  Aqui ficam: textos dos roteiros (L, D, ROTEIROS), da pagina da pousada (ESPACOS) e frases do app.js.
  Mesmas regras do portugues: nunca "ruinas" (sitio arqueologico / Patrimonio Mundial), sem travessao,
  a pousada sugere e nao vende roteiros, nao serve almoco nem jantar.
  Lugar sem traducao aqui continua em portugues.
*/
const ES = {
  ui: {
    manha: 'Mañana', tarde: 'Tarde', noite: 'Noche',
    ordinais: ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo'],
    oDia: 'El día', diaMin: 'día', diasMin: 'días', Dia: 'Día',
    cidade: 'ciudad', cidades: 'ciudades', passeios: 'paseos',
    verRoteiro: 'Ver el itinerario', ideiaRoteiro: 'Idea de itinerario',
    consultarPara: 'Consultar alojamiento para',
    waRoteiro: '¡Hola! Vi la idea de itinerario de {n} {d} y quiero saber los precios del alojamiento para mi fecha.',
    waGeral: '¡Hola! Vi los itinerarios y quiero saber los precios para mi fecha.',
    waPousada: '¡Hola! Vi las fotos de la posada y quiero saber los precios para mi fecha.',
    localizacao: 'Ubicación', verFotos: 'Ver las {n} fotos en pantalla completa', ampliar: 'Ampliar: ',
    fotosPousada: 'Fotos de la posada', fechar: 'Cerrar', fotoAnt: 'Foto anterior', fotoProx: 'Foto siguiente',
    passeiosDia: 'Paseos del día', menu: 'Menú', fecharMenu: 'Cerrar menú',
    consultarWA: 'Consultar precios por WhatsApp', mandarDirect: 'Enviar mensaje directo',
    consultar: 'Consultar precios', direct: 'Instagram',
    grupoSM: 'En São Miguel das Missões', grupoRegiao: 'Por la región', nosRoteiros: 'Aparece en los itinerarios de',
    todosPontos: '↑ Todos los atractivos', verMapa: 'Ver en el mapa', verPonto: 'Más sobre este lugar', fotosPontos: 'Fotos de los atractivos turísticos',
    waPontos: '¡Hola! Vi los atractivos turísticos y quiero saber los precios del alojamiento para mi fecha.'
  },

  // nome da regiao que aparece na foto (cidades ficam com o nome original)
  O: { 'Região das Missões': 'Región de las Misiones' },

  L: {
    sitio:      { t: 'Patrimonio Mundial de São Miguel Arcanjo', d: 'Recorrido por el sitio arqueológico reconocido por la UNESCO: la iglesia, la plaza de las reducciones y los detalles de la piedra trabajada por los guaraníes.' },
    museu:      { t: 'Museo de las Misiones', d: 'Imágenes sacras talladas en las reducciones, guardadas dentro del propio sitio.' },
    aldeia:     { t: 'Aldea guaraní Tekoá Koenju', d: 'Comunidad guaraní mbyá que mantiene viva la lengua, el canto y la artesanía del pueblo que levantó las reducciones. Una visita para escuchar y aprender, siempre coordinada antes.' },
    benzedores: { t: 'Visita a los benzedores', d: 'Doña Alzira mantiene viva la benzedura, una tradición de rezos y bendiciones populares que pasa de generación en generación en las Misiones. Una visita para conocerla de cerca, siempre coordinada antes.' },
    artesanato: { t: 'Artesanía guaraní', d: 'Piezas hechas por las familias guaraníes de la región, una forma de llevarse las Misiones a casa.' },
    someluz:    { t: 'Espectáculo Luz y Sonido', d: 'De noche, la historia de los Siete Pueblos contada con luces y narración sobre la fachada de la iglesia.' },
    someluz2:   { t: 'Luz y Sonido otra vez, si querés', d: 'Quien lo disfrutó la primera noche suele volver a verlo con otros ojos, ya conociendo la historia.' },
    cafe:       { t: 'Desayuno colonial en la posada', d: 'Incluido en la tarifa, para empezar el día sin apuro.' },
    fonte:      { t: 'Fuente Misionera', d: 'Fuente de piedra de la época de las reducciones, uno de los rincones más lindos de la ciudad.' },
    praca:      { t: 'Plaza y centro de la ciudad', d: 'Paseo a pie por el centro de São Miguel, con tiempo para un café y para recorrer las tiendas.' },
    irmaica:    { t: 'Cena Irmaicá', d: 'Texto a definir con la posada.' },
    antimon:    { t: 'Antimonumento al Bandeirante', d: 'La cabeza de un bandeirante hundida en el suelo: una obra que invierte la idea de monumento y hace pensar la historia de las Misiones desde la mirada de quienes vivieron acá.' },
    borraio:    { t: 'Borraio', d: 'Galpón rústico con objetos antiguos, herramientas y recuerdos que cuentan los orígenes de las familias de la región.' },
    jantar:     { t: 'Cena en la ciudad', d: 'La posada no sirve cena, pero te indica dónde comer bien en São Miguel.' },
    caaro:      { t: 'Santuario de Caaró, en Caibaté', d: 'Lugar de fe ligado a los mártires de las Misiones, con el santuario y el monte alrededor.' },
    catedral:   { t: 'Catedral Angelopolitana, en Santo Ângelo', d: 'La catedral inspirada en la iglesia de São Miguel Arcanjo, en el corazón de Santo Ângelo.' },
    stoangelo:  { t: 'Centro de Santo Ângelo', d: 'Plaza, comercios y almuerzo antes de volver a la posada.' },
    volta:      { t: 'Regreso a la posada', d: 'La misma cama todas las noches: sin armar y desarmar la valija en cada ciudad.' },
    saojoao:    { t: 'Sitio de São João Batista, en Entre-Ijuís', d: 'Vestigios de otra reducción de los Siete Pueblos, para entender cómo las Misiones se extendían por la región.' },
    piscina:    { t: 'Tarde en la piscina de la posada', d: 'Después de una mañana de ruta, la tarde es para descansar sin salir de la posada.' },
    saonic:     { t: 'São Nicolau', d: 'Uno de los Siete Pueblos, con sitio arqueológico y el paisaje del río Uruguay en la región.' },
    saoluiz:    { t: 'São Luiz Gonzaga', d: 'Otro de los Siete Pueblos, con memoria misionera en el centro de la ciudad.' },
    detalhes:   { t: 'El sitio con calma', d: 'Segunda visita al Patrimonio Mundial para ver lo que pasa desapercibido: el reloj de sol, la quinta de los padres y los caminos de las reducciones.' },
    cotiguacu:  { t: 'Cotiguaçu', d: 'Texto a definir con la posada.' },
    livre:      { t: 'Noche libre', d: 'Para cenar con calma en la ciudad o quedarse en la posada.' },
    argentina:  { t: 'San Ignacio Miní, en Argentina', d: 'Del otro lado del río Uruguay, otra reducción jesuítica reconocida por la UNESCO.' },
    caminho:    { t: 'O: un tramo del Camino de las Misiones', d: 'Para quienes disfrutan caminar, un tramo de la ruta a pie entre los antiguos pueblos.' }
  },

  D: {
    essencial: 'Lo esencial de São Miguel',
    sitio: 'El Patrimonio Mundial',
    cidade: 'La ciudad de São Miguel',
    caaro: 'Caaró y Santo Ângelo',
    saojoao: 'São João Batista',
    calma: 'Un día sin apuro',
    saonic: 'São Nicolau y São Luiz Gonzaga',
    outrolado: 'Del otro lado del río'
  },

  // pela quantidade de dias
  R: {
    1: { nome: 'Un día en São Miguel', resumo: 'Lo esencial en un solo viaje: Patrimonio Mundial de día y Luz y Sonido de noche.', ideal: 'Quienes están de paso o vienen por primera vez.', capaLeg: 'São Miguel Arcanjo · Patrimonio Mundial' },
    2: { nome: 'Dos días en São Miguel', resumo: 'Primero el sitio y el Luz y Sonido. Después, la ciudad a tu ritmo.', ideal: 'Parejas y familias que quieren conocer sin correr.', capaLeg: 'Fuente Misionera · São Miguel das Missões' },
    3: { nome: 'Tres días por las Misiones', resumo: 'São Miguel como base, con Caaró y la Catedral de Santo Ângelo en el camino.', ideal: 'Quienes quieren vivir las Misiones más allá de un solo lugar.' },
    4: { nome: 'Cuatro días y un pueblo más de los Siete', resumo: 'El itinerario de tres días con una mañana en el sitio de São João Batista.', ideal: 'Quienes disfrutan la historia y quieren ver más de una reducción.' },
    5: { nome: 'Cinco días por los Siete Pueblos', resumo: 'Los pueblos misioneros de la región, siempre volviendo a la misma posada.', ideal: 'Quienes quieren conocer toda la región con calma.' },
    6: { nome: 'Seis días, con un día sin apuro', resumo: 'Los Siete Pueblos y un día entero para volver al sitio con calma y descansar en la posada.', ideal: 'Quienes están de vacaciones y quieren viajar sin cansarse.', capaLeg: 'Arcos de São Miguel Arcanjo · Patrimonio Mundial' },
    7: { nome: 'Una semana en las Misiones', resumo: 'De São Miguel Arcanjo al otro lado del río Uruguay, con la posada como base.', ideal: 'Quienes quieren la experiencia completa de las Misiones.' }
  },

  // pagina da pousada, pelo id de cada espaco; legs na mesma ordem das fotos
  E: {
    apartamentos: { curto: 'Habitaciones', rotulo: 'Alojamiento', titulo: 'Habitaciones',
      texto: 'De la individual a la cuádruple, con camas tendidas con esmero, para que parejas, familias y grupos de amigos descansen bien después de los paseos.',
      itens: ['Individual', 'Doble', 'Triple', 'Cuádruple', 'Baño privado'],
      legs: ['Habitación con cama matrimonial y de una plaza', 'Habitación matrimonial', 'Habitación triple', 'Habitación con cama matrimonial y de una plaza', 'Habitación con dos camas'] },
    suites: { curto: 'Suites', rotulo: 'Un mimo extra', titulo: 'Suites con hidromasaje',
      texto: 'Suites amplias, con bañera de hidromasaje, iluminación cálida y mesada con doble bacha. Para un viaje en pareja o una celebración.',
      itens: ['Bañera de hidromasaje', 'Cama matrimonial', 'Doble bacha'],
      legs: ['Suite con hidromasaje, vista general', 'Cama matrimonial con ropa de cama', 'Mesa e iluminación de la suite', 'Bañera de hidromasaje', 'Mesada con doble bacha'] },
    cafe: { curto: 'Desayuno colonial', rotulo: 'Todas las mañanas', titulo: 'Desayuno colonial',
      texto: 'Incluido en la tarifa. Frutas, panes, fiambres, tortas y lo que la cocina prepare ese día. En días lindos, el desayuno también puede convertirse en un picnic en el jardín de la posada.',
      legs: ['Tortas, panes caseros y masas del desayuno colonial', 'Picnic en el jardín de la posada', 'Tortas y panes caseros', 'Mesa del desayuno colonial', 'Picnic entre las habitaciones', 'Mesa puesta en el salón', 'Picnic para dos en el césped', 'Jugos, leche y café', 'Canasta de picnic'] },
    cozinha: { curto: 'Cocina y parrilla', rotulo: 'Para los huéspedes', titulo: 'Cocina y parrilla',
      texto: 'Una cocina equipada y un quincho con parrilla y mesa grande, para preparar una comida o hacer ese asado en familia.',
      legs: ['Quincho con parrilla', 'Cocina', 'Cocina equipada'] },
    piscina: { curto: 'Piscina', rotulo: 'Recreación', titulo: 'Piscina',
      texto: 'Para las tardes de calor, entre un paseo y otro, con reposeras y mesas alrededor.',
      legs: ['Piscina de la posada', 'Mesas alrededor de la piscina', 'Piscina con palmeras', 'Reposeras', 'Área de la piscina'] },
    jardins: { curto: 'Jardines', rotulo: 'Áreas externas', titulo: 'Jardines y áreas externas',
      texto: 'Palmeras, césped y senderos de jardín entre las habitaciones. Un lugar tranquilo para volver al final del día.',
      legs: ['Fachada con palmeras', 'Flores en la entrada', 'Jardín frente a las habitaciones', 'Jardín interno', 'Jardín entre las habitaciones'] },
    estacionamento: { curto: 'Estacionamiento', rotulo: 'Incluido en la tarifa', titulo: 'Estacionamiento',
      texto: 'El auto queda dentro de la posada durante toda la estadía, mientras disfrutás los paseos.',
      legs: ['Estacionamiento al lado del jardín', 'Cartel del estacionamiento', 'Acceso en auto'] }
  }
};
