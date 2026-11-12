/*
  PONTOS TURISTICOS (pagina pontos.html)
  O texto e a cidade de cada ponto vem do roteiros.js (L), pelo mesmo id. Assim, mudou o texto la, muda aqui tambem.
  Aqui ficam: grupo ('sm' = em Sao Miguel, 'regiao' = pela regiao), nome na pagina [portugues, espanhol],
  etiquetas (itens) e fotos [arquivo, legenda em portugues, legenda em espanhol]. A primeira foto abre a galeria.
  capa = foto da capa rotativa do topo (horizontal e grande); sem capa, usa a primeira foto.
  Galeria fecha certinho com 1, 2, 3, 5 ou 9 fotos.
*/
const PONTOS = [
  // ===== Em Sao Miguel das Missoes =====
  { id: 'sitio', grupo: 'sm', capa: 'img/hero-igreja.jpg',
    titulo: ['Sítio de São Miguel Arcanjo', 'Sitio de São Miguel Arcanjo'],
    itens: [['Patrimônio Mundial da UNESCO', 'Patrimonio Mundial de la UNESCO'], ['Sítio arqueológico', 'Sitio arqueológico']],
    fotos: [
      ['img/hero-igreja.jpg', 'A igreja de São Miguel Arcanjo', 'La iglesia de São Miguel Arcanjo'],
      ['img/lugares/sitio.jpg', 'O sítio a céu aberto', 'El sitio a cielo abierto'],
      ['img/roteiro-6-a.jpg', 'Arcos da antiga igreja', 'Arcos de la antigua iglesia'],
      ['img/hero-torre.jpg', 'A torre da igreja', 'La torre de la iglesia'],
      ['img/hero-neblina.jpg', 'O sítio ao amanhecer', 'El sitio al amanecer']
    ] },
  { id: 'museu', grupo: 'sm', capa: 'img/lugares/museu.jpg',
    titulo: ['Museu das Missões', 'Museo de las Misiones'],
    itens: [['Dentro do sítio', 'Dentro del sitio']],
    fotos: [
      ['img/lugares/museu.jpg', 'O pavilhão do museu', 'El pabellón del museo'],
      ['img/pontos/museu-2.jpg', 'O museu e o gramado do sítio', 'El museo y el césped del sitio']
    ] },
  { id: 'someluz', grupo: 'sm',
    titulo: ['Espetáculo Som e Luz', 'Espectáculo Luz y Sonido'],
    itens: [['À noite', 'De noche']],
    fotos: [
      ['img/lugares/someluz.jpg', 'Som e Luz na fachada da igreja', 'Luz y Sonido sobre la fachada de la iglesia'],
      ['img/lugares/someluz2.jpg', 'A igreja iluminada à noite', 'La iglesia iluminada de noche']
    ] },
  { id: 'fonte', grupo: 'sm',
    titulo: ['Fonte Missioneira', 'Fuente Misionera'],
    fotos: [
      ['img/lugares/fonte.jpg', 'Rostos esculpidos na pedra', 'Rostros tallados en la piedra'],
      ['img/roteiro-2-a.jpg', 'A água saindo da pedra esculpida', 'El agua que brota de la piedra tallada']
    ] },
  { id: 'praca', grupo: 'sm',
    titulo: ['Praça e centro de São Miguel', 'Plaza y centro de São Miguel'],
    fotos: [['img/lugares/praca.jpg', 'Monumento a São Miguel, na praça', 'Monumento a São Miguel, en la plaza']] },
  { id: 'artesanato', grupo: 'sm',
    titulo: ['Artesanato guarani', 'Artesanía guaraní'],
    fotos: [['img/lugares/artesanato.jpg', 'Bichos esculpidos em madeira', 'Animales tallados en madera']] },
  { id: 'aldeia', grupo: 'sm',
    titulo: ['Aldeia guarani Tekoá Koenju', 'Aldea guaraní Tekoá Koenju'],
    fotos: [['img/lugares/aldeia.jpg', 'Casa tradicional na aldeia', 'Casa tradicional en la aldea']] },
  { id: 'benzedores', grupo: 'sm',
    titulo: ['Visita aos benzedores', 'Visita a los benzedores'],
    fotos: [['img/lugares/benzedores.jpg', 'Dona Alzira benzendo', 'Doña Alzira dando una bendición']] },
  { id: 'antimon', grupo: 'sm',
    titulo: ['Antimonumento ao Bandeirante', 'Antimonumento al Bandeirante'],
    fotos: [['img/lugares/antimon.jpg', 'A cabeça do bandeirante afundada no chão', 'La cabeza del bandeirante hundida en el suelo']] },
  { id: 'borraio', grupo: 'sm',
    titulo: ['Borraio', 'Borraio'],
    fotos: [
      ['img/lugares/borraio.jpg', 'O galpão do Borraio', 'El galpón del Borraio'],
      ['img/pontos/borraio-2.jpg', 'Rádios, televisores e lembranças antigas', 'Radios, televisores y recuerdos antiguos']
    ] },

  // ===== Pela regiao =====
  { id: 'caaro', grupo: 'regiao',
    titulo: ['Santuário do Caaró', 'Santuario de Caaró'],
    fotos: [['img/lugares/caaro.jpg', 'Santuário do Caaró, em Caibaté', 'Santuario de Caaró, en Caibaté']] },
  { id: 'catedral', grupo: 'regiao',
    titulo: ['Catedral Angelopolitana', 'Catedral Angelopolitana'],
    fotos: [
      ['img/lugares/catedral.jpg', 'Catedral Angelopolitana, em Santo Ângelo', 'Catedral Angelopolitana, en Santo Ângelo'],
      ['img/lugares/stoangelo.jpg', 'Praça Pinheiro Machado, no centro de Santo Ângelo', 'Plaza Pinheiro Machado, en el centro de Santo Ângelo']
    ] },
  { id: 'saojoao', grupo: 'regiao',
    titulo: ['Sítio de São João Batista', 'Sitio de São João Batista'],
    itens: [['Sítio arqueológico', 'Sitio arqueológico']],
    fotos: [
      ['img/lugares/saojoao.jpg', 'Painel em relevo no sítio', 'Panel en relieve en el sitio'],
      ['img/pontos/saojoao-2.jpg', 'O sítio entre as árvores', 'El sitio entre los árboles'],
      ['img/pontos/saojoao-3.jpg', 'Detalhe do relevo esculpido', 'Detalle del relieve tallado']
    ] },
  { id: 'saonic', grupo: 'regiao',
    titulo: ['São Nicolau', 'São Nicolau'],
    fotos: [['img/lugares/saonic.jpg', 'Sítio de São Nicolau', 'Sitio de São Nicolau']] },
  { id: 'saoluiz', grupo: 'regiao',
    titulo: ['São Luiz Gonzaga', 'São Luiz Gonzaga'],
    fotos: [['img/lugares/saoluiz.jpg', 'Catedral de São Luiz Gonzaga', 'Catedral de São Luiz Gonzaga']] },
  { id: 'caminho', grupo: 'regiao',
    titulo: ['Caminho das Missões', 'Camino de las Misiones'],
    fotos: [['img/lugares/caminho.jpg', 'Trecho do Caminho das Missões', 'Tramo del Camino de las Misiones']] },
  { id: 'argentina', grupo: 'regiao',
    titulo: ['San Ignacio Miní', 'San Ignacio Miní'],
    itens: [['Na Argentina', 'En Argentina'], ['Patrimônio Mundial da UNESCO', 'Patrimonio Mundial de la UNESCO']],
    fotos: [['img/lugares/argentina.jpg', 'San Ignacio Miní, na Argentina', 'San Ignacio Miní, en Argentina']] }
];
