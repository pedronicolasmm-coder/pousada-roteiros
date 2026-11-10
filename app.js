(function () {
  var topo = document.getElementById('topo');
  var periodos = [['manha', 'Manhã'], ['tarde', 'Tarde'], ['noite', 'Noite']];
  var ordinais = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo'];
  var WA = 'https://wa.me/5555981615722?text=';

  if (!RASCUNHO) document.body.classList.add('final');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function conf(c) { return c ? '<em class="conf" data-c="' + esc(c) + '">a confirmar</em>' : ''; }
  function diasTxt(n) { return n === 1 ? 'dia' : 'dias'; }
  function linkRoteiro(n) { return 'roteiro.html?dias=' + n; }
  function msgWA(r) { return WA + encodeURIComponent('Olá! Vi a ideia de roteiro de ' + r.dias + ' ' + diasTxt(r.dias) + ' e quero saber os valores da hospedagem para a minha data.'); }

  // fotos: aparecem quando o arquivo existe; se nao existe, fica o espaco reservado com o nome
  function carregarFotos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll('.foto[data-src]'), function (f) {
      if (f.getAttribute('data-ok')) return;
      f.setAttribute('data-ok', '1');
      var s = document.createElement('span'); s.className = 'foto-label'; s.textContent = f.getAttribute('data-label') || ''; f.appendChild(s);
      var img = new Image();
      img.onload = function () { f.style.backgroundImage = 'url("' + img.src + '")'; f.classList.add('ok'); };
      img.src = f.getAttribute('data-src');
    });
  }

  function cartao(r) {
    return '<a class="card" href="' + linkRoteiro(r.dias) + '">' +
      '<figure class="foto card-foto" data-src="img/roteiro-' + r.dias + '-a.jpg" data-label="' + esc(r.fotos[0]) + '">' +
        '<span class="card-num">' + r.dias + '<small>' + diasTxt(r.dias) + '</small></span>' +
      '</figure>' +
      '<div class="card-txt">' +
        '<h3>' + esc(r.nome) + '</h3>' +
        '<p>' + esc(r.resumo) + '</p>' +
        '<span class="card-ver">Ver o roteiro <i aria-hidden="true">→</i></span>' +
      '</div>' +
    '</a>';
  }

  /* ===== pagina inicial: cartoes dos 7 roteiros ===== */
  var cartoes = document.getElementById('cartoes');
  if (cartoes) {
    // links antigos (index.html#3-dias) vao para a pagina do roteiro
    var antigo = /^#(\d)-dias?$/.exec(location.hash);
    if (antigo) { location.replace(linkRoteiro(antigo[1])); return; }
    cartoes.innerHTML = ROTEIROS.map(cartao).join('');
  }

  /* ===== pagina de um roteiro ===== */
  var pag = document.getElementById('roteiro');
  if (pag) {
    var q = /[?&]dias=(\d)/.exec(location.search);
    var idx = q ? Math.min(Math.max(parseInt(q[1], 10) - 1, 0), ROTEIROS.length - 1) : 0;
    var r = ROTEIROS[idx];
    var msg = msgWA(r);
    document.title = r.nome + ' | Pousada das Missões';

    document.getElementById('rot-hero-foto').setAttribute('data-src', 'img/roteiro-' + r.dias + '-a.jpg');
    document.getElementById('rot-rotulo').textContent = 'Ideia de roteiro · ' + r.dias + ' ' + diasTxt(r.dias);
    document.getElementById('rot-titulo').textContent = r.nome;
    document.getElementById('rot-resumo').textContent = r.resumo;
    document.getElementById('rot-ideal').textContent = r.ideal;
    document.getElementById('rot-qtd').textContent = r.dias + ' ' + diasTxt(r.dias);
    Array.prototype.forEach.call(document.querySelectorAll('.js-wa'), function (a) { a.href = msg; });
    var ctaBtn = document.getElementById('rot-cta-btn');
    ctaBtn.textContent = 'Consultar hospedagem para ' + r.dias + ' ' + diasTxt(r.dias);

    // barra com os dias (so quando tem mais de um)
    var nav = document.getElementById('nav-dias');
    if (r.dias_.length > 1) {
      nav.innerHTML = r.dias_.map(function (id, k) {
        return '<a href="#dia-' + (k + 1) + '"><small>Dia</small><b>' + (k + 1) + '</b></a>';
      }).join('');
    } else {
      nav.parentNode.style.display = 'none';
    }

    // cada dia, cada lugar com a sua foto (img/lugares/<chave>.jpg)
    var lado = 0;
    pag.innerHTML = r.dias_.map(function (id, k) {
      var d = D[id];
      var h = '<section class="dia-sec" id="dia-' + (k + 1) + '">' +
        '<header class="dia-cab">' +
          '<p class="rotulo">' + (r.dias_.length > 1 ? ordinais[k] + ' dia' : 'O dia') + '</p>' +
          '<h2>' + esc(d.titulo) + '</h2>' +
        '</header>';
      periodos.forEach(function (p) {
        d[p[0]].forEach(function (lid) {
          var l = L[lid];
          lado++;
          h += '<article class="lugar' + (lado % 2 === 0 ? ' lugar-inv' : '') + '">' +
            '<figure class="foto lugar-foto" data-src="img/lugares/' + lid + '.jpg" data-label="Foto: ' + esc(l.t) + '"></figure>' +
            '<div class="lugar-txt">' +
              '<p class="lugar-periodo">' + p[1] + '</p>' +
              '<h3>' + esc(l.t) + conf(l.c) + '</h3>' +
              '<p>' + esc(l.d) + '</p>' +
            '</div>' +
          '</article>';
        });
      });
      return h + '</section>';
    }).join('');

    // outros roteiros
    document.getElementById('outros').innerHTML = ROTEIROS.filter(function (o) { return o !== r; }).map(cartao).join('');

    // marca o dia que esta na tela
    if ('IntersectionObserver' in window && r.dias_.length > 1) {
      var links = nav.querySelectorAll('a');
      var obs = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var n = parseInt(e.target.id.split('-')[1], 10) - 1;
          Array.prototype.forEach.call(links, function (a, i) { a.classList.toggle('ativo', i === n); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Array.prototype.forEach.call(pag.querySelectorAll('.dia-sec'), function (s) { obs.observe(s); });
    }
  }

  carregarFotos(document);

  /* ===== capa rotativa da pagina inicial: troca a cada 3 segundos, em loop ===== */
  var slides = document.querySelectorAll('.hero-fotos .hero-foto');
  var atual = 0;
  var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slides.length > 1 && !semMovimento) {
    setInterval(function () {
      if (document.hidden) return;
      var n = atual;
      do { n = (n + 1) % slides.length; } while (n !== atual && !slides[n].classList.contains('ok'));
      if (n === atual) return;
      slides[atual].classList.remove('ativa');
      slides[n].classList.add('ativa');
      atual = n;
    }, 3000);
  }

  function rolar() { topo.classList.toggle('solido', window.pageYOffset > 40); }
  window.addEventListener('scroll', rolar, { passive: true });
  rolar();
})();
