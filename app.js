(function () {
  // versao dos arquivos (vem do ?v= do app.js no HTML): faz o navegador buscar fotos novas apos cada atualizacao
  var VERSAO = (function () { var s = document.currentScript && document.currentScript.src; var m = s && /[?&]v=([^&]+)/.exec(s); return m ? m[1] : ""; })();
  function comV(u) { return VERSAO ? u + (u.indexOf("?") < 0 ? "?" : "&") + "v=" + VERSAO : u; }
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
      img.src = comV(f.getAttribute('data-src'));
    });
  }

  // numeros de cada roteiro: cidades visitadas e passeios (sem contar pousada e jantar)
  function info(r) {
    var cidades = [], passeios = 0;
    r.dias_.forEach(function (id) {
      periodos.forEach(function (p) {
        D[id][p[0]].forEach(function (lid) {
          var l = L[lid];
          if (l.o === 'Pousada das Missões' || lid === 'jantar') return;
          passeios++;
          var c = l.o === 'Região das Missões' ? null : l.o;
          if (c && cidades.indexOf(c) < 0) cidades.push(c);
        });
      });
    });
    return { cidades: cidades, passeios: passeios };
  }
  function nCidades(n) { return n + (n === 1 ? ' cidade' : ' cidades'); }

  function cartao(r) {
    return '<a class="card" href="' + linkRoteiro(r.dias) + '">' +
      '<figure class="foto card-foto" data-src="img/roteiro-' + r.dias + '-a.jpg" data-label="' + esc(r.fotos[0]) + '">' +
        '<span class="card-num">' + r.dias + '<small>' + diasTxt(r.dias) + '</small></span>' +
      '</figure>' +
      '<div class="card-txt">' +
        '<p class="card-meta">' + nCidades(info(r).cidades.length) + ' · ' + info(r).passeios + ' passeios</p>' +
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
    var inf = info(r);
    document.getElementById('rot-qtd').textContent = r.dias + ' ' + diasTxt(r.dias) + ' · ' + inf.passeios + ' passeios';
    document.getElementById('rot-cidades').textContent = inf.cidades.join(', ');
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
            '<figure class="foto lugar-foto" data-src="img/lugares/' + lid + '.jpg" data-label="Foto: ' + esc(l.t) + '"><figcaption class="lugar-onde">' + esc(l.o) + '</figcaption></figure>' +
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

  /* ===== pagina da pousada: espacos com galeria e visualizador em tela cheia ===== */
  var espacos = document.getElementById('espacos');
  if (espacos && typeof ESPACOS !== 'undefined') {
    var lista = []; // todas as fotos, na ordem, para o visualizador
    var navE = document.getElementById('nav-espacos');
    navE.innerHTML = ESPACOS.map(function (e) { return '<a href="#' + e.id + '"><small>' + esc(e.curto || e.titulo) + '</small></a>'; }).join('');
    if (document.getElementById('localizacao')) navE.innerHTML += '<a href="#localizacao"><small>Localização</small></a>';
    espacos.innerHTML = ESPACOS.map(function (e, k) {
      var ini = lista.length;
      e.fotos.forEach(function (f) { lista.push({ src: comV(f.f), leg: f.leg || e.titulo, sec: e.titulo }); });
      var gal = e.fotos.map(function (f, j) {
        return '<button type="button" class="gal-item' + (j === 0 ? ' gal-grande' : '') + '" data-i="' + (ini + j) + '" aria-label="Ampliar: ' + esc(f.leg || e.titulo) + '">' +
          '<img loading="lazy" src="' + esc(comV(f.f)) + '" alt="' + esc(f.leg || e.titulo) + '"></button>';
      }).join('');
      return '<section class="espaco' + (k % 2 ? ' espaco-alt' : '') + '" id="' + e.id + '">' +
        '<div class="espaco-cab">' +
          '<p class="rotulo">' + esc(e.rotulo) + '</p>' +
          '<h2>' + esc(e.titulo) + '</h2>' +
          '<p class="espaco-txt">' + esc(e.texto) + conf(e.c) + '</p>' +
          (e.itens ? '<ul class="espaco-itens">' + e.itens.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : '') +
        '</div>' +
        '<div class="galeria gal-' + Math.min(e.fotos.length, 7) + '">' + gal + '</div>' +
        (e.fotos.length > 1 ? '<p class="gal-ver"><button type="button" class="gal-todas" data-i="' + ini + '">Ver as ' + e.fotos.length + ' fotos em tela cheia</button></p>' : '') +
      '</section>';
    }).join('');

    // visualizador
    var lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Fotos da pousada');
    lb.innerHTML = '<button type="button" class="lb-fechar" aria-label="Fechar">×</button>' +
      '<button type="button" class="lb-seta lb-ant" aria-label="Foto anterior">‹</button>' +
      '<figure class="lb-fig"><img alt=""><figcaption><span class="lb-sec"></span><span class="lb-leg"></span><span class="lb-n"></span></figcaption></figure>' +
      '<button type="button" class="lb-seta lb-prox" aria-label="Próxima foto">›</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), lbAt = 0;
    function mostra(i) {
      lbAt = (i + lista.length) % lista.length;
      var it = lista[lbAt];
      lbImg.src = it.src; lbImg.alt = it.leg;
      lb.querySelector('.lb-sec').textContent = it.sec;
      lb.querySelector('.lb-leg').textContent = it.leg === it.sec ? '' : it.leg;
      lb.querySelector('.lb-n').textContent = (lbAt + 1) + ' / ' + lista.length;
    }
    function abre(i) { mostra(i); lb.classList.add('aberto'); document.documentElement.classList.add('sem-rolar'); lb.querySelector('.lb-fechar').focus(); }
    function fecha() { lb.classList.remove('aberto'); document.documentElement.classList.remove('sem-rolar'); }
    espacos.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-i]');
      if (b) abre(parseInt(b.getAttribute('data-i'), 10));
    });
    lb.querySelector('.lb-fechar').addEventListener('click', fecha);
    lb.querySelector('.lb-ant').addEventListener('click', function () { mostra(lbAt - 1); });
    lb.querySelector('.lb-prox').addEventListener('click', function () { mostra(lbAt + 1); });
    lb.addEventListener('click', function (ev) { if (ev.target === lb) fecha(); });
    document.addEventListener('keydown', function (ev) {
      if (!lb.classList.contains('aberto')) return;
      if (ev.key === 'Escape') fecha();
      if (ev.key === 'ArrowLeft') mostra(lbAt - 1);
      if (ev.key === 'ArrowRight') mostra(lbAt + 1);
    });
    var tx = null;
    lb.addEventListener('touchstart', function (ev) { tx = ev.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (ev) {
      if (tx === null) return;
      var dx = ev.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 50) mostra(lbAt + (dx < 0 ? 1 : -1));
    });

    // marca o espaco que esta na tela
    if ('IntersectionObserver' in window) {
      var linksE = navE.querySelectorAll('a');
      var obsE = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var n = ESPACOS.map(function (x) { return x.id; }).concat(['localizacao']).indexOf(e.target.id);
          Array.prototype.forEach.call(linksE, function (a, i) { a.classList.toggle('ativo', i === n); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Array.prototype.forEach.call(espacos.querySelectorAll('.espaco'), function (s) { obsE.observe(s); });
      var loc = document.getElementById('localizacao'); if (loc) obsE.observe(loc);
    }
    var outrosP = document.getElementById('outros');
    if (outrosP) outrosP.innerHTML = ROTEIROS.map(cartao).join('');
    Array.prototype.forEach.call(document.querySelectorAll('.js-wa'), function (a) {
      a.href = WA + encodeURIComponent('Olá! Vi as fotos da pousada e quero saber os valores para a minha data.');
    });
  }

  // rodape: lista dos roteiros e ano
  var rr = document.getElementById('rodape-roteiros');
  if (rr) rr.innerHTML = ROTEIROS.map(function (o) { return '<li><a href="' + linkRoteiro(o.dias) + '">' + esc(o.nome) + '</a></li>'; }).join('');
  var ano = document.getElementById('ano'); if (ano) ano.textContent = new Date().getFullYear();

  // menu do celular (botao com tres linhas no topo)
  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    var linkWA = (document.querySelector('.topo .js-wa') || document.querySelector('.topo .btn-peq')).href;
    var mm = document.createElement('div');
    mm.className = 'menu-mob'; mm.setAttribute('role', 'dialog'); mm.setAttribute('aria-modal', 'true'); mm.setAttribute('aria-label', 'Menu');
    mm.innerHTML = '<img src="img/logo.png" alt="Pousada das Missões">' +
      '<button type="button" class="menu-mob-fechar" aria-label="Fechar menu">×</button>' +
      '<nav>' + document.querySelector('.topo .menu').innerHTML + '</nav>' +
      '<div class="botoes"><a class="btn btn-verde" target="_blank" rel="noopener" href="' + linkWA + '">Consultar valores no WhatsApp</a>' +
      '<a class="btn btn-contorno" target="_blank" rel="noopener" href="https://ig.me/m/pousadadasmissoes">Mandar direct</a></div>';
    document.body.appendChild(mm);
    var abreM = function () { mm.classList.add('aberto'); menuBtn.setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('sem-rolar'); };
    var fechaM = function () { mm.classList.remove('aberto'); menuBtn.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('sem-rolar'); };
    menuBtn.addEventListener('click', abreM);
    mm.querySelector('.menu-mob-fechar').addEventListener('click', fechaM);
    mm.addEventListener('click', function (ev) { if (ev.target.closest('nav a')) fechaM(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fechaM(); });
  }

  // barra fixa de contato no celular (aparece depois da capa)
  var barra = document.createElement('div');
  barra.className = 'barra-mob';
  barra.innerHTML = '<a class="btn btn-verde" target="_blank" rel="noopener" href="' + (pag ? msg : WA + encodeURIComponent('Olá! Vi os roteiros e quero saber os valores para a minha data.')) + '">Consultar valores</a>' +
    '<a class="btn barra-direct" target="_blank" rel="noopener" href="https://ig.me/m/pousadadasmissoes">Direct</a>';
  document.body.appendChild(barra);
  var contato = document.getElementById('contato');
  function barraMob() {
    var noFim = contato && contato.getBoundingClientRect().top < window.innerHeight;
    barra.classList.toggle('ver', window.pageYOffset > 520 && !noFim);
  }
  window.addEventListener('scroll', barraMob, { passive: true });

  carregarFotos(document);

  /* ===== capa rotativa da pagina inicial: troca a cada 3 segundos, em loop ===== */
  var slides = document.querySelectorAll('.hero-fotos .hero-foto');
  var atual = 0;
  var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var prog = document.querySelectorAll('#hero-prog i');
  function legenda() {
    var hn = document.getElementById('hero-n'), hl = document.getElementById('hero-leg');
    if (hn) hn.textContent = (atual < 9 ? '0' : '') + (atual + 1);
    if (hl) hl.textContent = slides[atual].getAttribute('data-legenda') || '';
    Array.prototype.forEach.call(prog, function (p, i) {
      p.classList.remove('ativo'); p.classList.toggle('feito', i < atual);
      if (i === atual) { void p.offsetWidth; p.classList.add('ativo'); }
    });
  }
  if (slides.length) legenda();
  if (slides.length > 1 && !semMovimento) {
    setInterval(function () {
      if (document.hidden) return;
      var n = atual;
      do { n = (n + 1) % slides.length; } while (n !== atual && !slides[n].classList.contains('ok'));
      if (n === atual) return;
      slides[atual].classList.remove('ativa');
      slides[n].classList.add('ativa');
      atual = n;
      legenda();
    }, 3000);
  }

  function rolar() { topo.classList.toggle('solido', window.pageYOffset > 40); }
  // a barra dos dias/espacos gruda logo abaixo do topo, qualquer que seja a altura dele
  function alturaTopo() { document.documentElement.style.setProperty('--topo-h', (topo.offsetTop + topo.offsetHeight) + 'px'); }
  window.addEventListener('resize', alturaTopo);
  topo.addEventListener('transitionend', alturaTopo);
  window.addEventListener('scroll', function () { requestAnimationFrame(alturaTopo); }, { passive: true });
  alturaTopo();
  window.addEventListener('scroll', rolar, { passive: true });
  rolar();
})();
