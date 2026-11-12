(function () {
  // versao dos arquivos (vem do ?v= do app.js no HTML): faz o navegador buscar fotos novas apos cada atualizacao
  var VERSAO = (function () { var s = document.currentScript && document.currentScript.src; var m = s && /[?&]v=([^&]+)/.exec(s); return m ? m[1] : ""; })();
  function comV(u) { return VERSAO ? u + (u.indexOf("?") < 0 ? "?" : "&") + "v=" + VERSAO : u; }
  var topo = document.getElementById('topo');
  var WA = 'https://wa.me/5555981615722?text=';

  // idioma: o script no <head> decide (navegador em espanhol, ?lang=es ou escolha salva); textos em espanhol no es.js
  var LANG = window.IDIOMA === 'es' && typeof ES !== 'undefined' ? 'es' : 'pt';
  var U = LANG === 'es' ? ES.ui : {
    manha: 'Manhã', tarde: 'Tarde', noite: 'Noite',
    ordinais: ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo'],
    oDia: 'O dia', diaMin: 'dia', diasMin: 'dias', Dia: 'Dia',
    cidade: 'cidade', cidades: 'cidades', passeios: 'passeios',
    verRoteiro: 'Ver o roteiro', ideiaRoteiro: 'Ideia de roteiro', consultarPara: 'Consultar hospedagem para',
    waRoteiro: 'Olá! Vi a ideia de roteiro de {n} {d} e quero saber os valores da hospedagem para a minha data.',
    waGeral: 'Olá! Vi os roteiros e quero saber os valores para a minha data.',
    waPousada: 'Olá! Vi as fotos da pousada e quero saber os valores para a minha data.',
    localizacao: 'Localização', verFotos: 'Ver as {n} fotos em tela cheia', ampliar: 'Ampliar: ',
    fotosPousada: 'Fotos da pousada', fechar: 'Fechar', fotoAnt: 'Foto anterior', fotoProx: 'Próxima foto',
    passeiosDia: 'Passeios do dia', menu: 'Menu', fecharMenu: 'Fechar menu',
    consultarWA: 'Consultar valores no WhatsApp', mandarDirect: 'Mandar direct',
    consultar: 'Consultar valores', direct: 'Direct'
  };
  var periodos = [['manha', U.manha], ['tarde', U.tarde], ['noite', U.noite]];
  var ordinais = U.ordinais;
  try { if (window.IDIOMA_ESCOLHIDO) localStorage.setItem('lang', LANG); } catch (e) {}
  if (LANG === 'es') {
    // textos fixos das paginas (atributos data-es no HTML)
    Array.prototype.forEach.call(document.querySelectorAll('[data-es]'), function (el) { el.innerHTML = el.getAttribute('data-es'); });
    ['aria-label', 'title', 'content', 'href', 'data-legenda'].forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-es-' + a + ']'), function (el) { el.setAttribute(a, el.getAttribute('data-es-' + a)); });
    });
    // textos dos roteiros e da pousada
    Object.keys(ES.L).forEach(function (k) { if (L[k]) { L[k].t = ES.L[k].t; L[k].d = ES.L[k].d; } });
    Object.keys(ES.D).forEach(function (k) { if (D[k]) D[k].titulo = ES.D[k]; });
    ROTEIROS.forEach(function (r) { var t = ES.R[r.dias]; if (t) Object.keys(t).forEach(function (c) { r[c] = t[c]; }); });
    if (typeof ESPACOS !== 'undefined') ESPACOS.forEach(function (e) {
      var t = ES.E[e.id]; if (!t) return;
      ['curto', 'rotulo', 'titulo', 'texto', 'itens'].forEach(function (c) { if (t[c]) e[c] = t[c]; });
      if (t.legs) e.fotos.forEach(function (f, i) { if (t.legs[i]) f.leg = t.legs[i]; });
    });
  }
  function onde(o) { return LANG === 'es' && ES.O[o] ? ES.O[o] : o; }

  if (!RASCUNHO) document.body.classList.add('final');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function conf(c) { return c ? '<em class="conf" data-c="' + esc(c) + '">a confirmar</em>' : ''; }
  function diasTxt(n) { return n === 1 ? U.diaMin : U.diasMin; }
  function linkRoteiro(n) { return 'roteiro.html?dias=' + n; }
  function msgWA(r) { return WA + encodeURIComponent(U.waRoteiro.replace('{n}', r.dias).replace('{d}', diasTxt(r.dias))); }

  // fotos: aparecem quando o arquivo existe; se nao existe, fica o espaco reservado com o nome
  function carregarFotos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll('.foto[data-src]'), function (f) {
      if (f.getAttribute('data-ok')) return;
      f.setAttribute('data-ok', '1');
      var s = document.createElement('span'); s.className = 'foto-label'; s.textContent = f.getAttribute('data-label') || ''; f.appendChild(s);
      var img = new Image();
      img.onload = function () { f.style.backgroundImage = 'url("' + img.src + '")'; f.classList.add('ok'); };
      img.onerror = function () { f.classList.add('falhou'); if (f.classList.contains('hero-foto') && typeof legenda === 'function' && slides) legenda(); };
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
  function nCidades(n) { return n + ' ' + (n === 1 ? U.cidade : U.cidades); }

  function cartao(r) {
    return '<a class="card" href="' + linkRoteiro(r.dias) + '">' +
      '<figure class="foto card-foto" data-src="img/roteiro-' + r.dias + '-a.jpg" data-label="' + esc(r.fotos[0]) + '">' +
        '<span class="card-num">' + r.dias + '<small>' + diasTxt(r.dias) + '</small></span>' +
      '</figure>' +
      '<div class="card-txt">' +
        '<p class="card-meta">' + nCidades(info(r).cidades.length) + ' · ' + info(r).passeios + ' ' + U.passeios + '</p>' +
        '<h3>' + esc(r.nome) + '</h3>' +
        '<p>' + esc(r.resumo) + '</p>' +
        '<span class="card-ver">' + U.verRoteiro + ' <i aria-hidden="true">→</i></span>' +
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

    // capa rotativa: foto do roteiro + uma foto de cada passeio, na ordem dos dias
    var capaFotos = r.capa ? [] : [{ src: 'img/roteiro-' + r.dias + '-a.jpg', leg: r.capaLeg || r.nome }];
    var jaTem = {};
    if (r.capa) { jaTem[r.capa] = 1; capaFotos.push({ src: 'img/lugares/' + r.capa + '.jpg', leg: L[r.capa].t + ' · ' + onde(L[r.capa].o) }); }
    r.dias_.forEach(function (id, k) {
      periodos.forEach(function (p) {
        D[id][p[0]].forEach(function (lid) {
          var l = L[lid];
          if (jaTem[lid] || l.o === 'Pousada das Missões' || lid === 'jantar') return;
          jaTem[lid] = 1;
          capaFotos.push({ src: 'img/lugares/' + lid + '.jpg', leg: (r.dias_.length > 1 ? U.Dia + ' ' + (k + 1) + ' · ' : '') + l.t });
        });
      });
    });
    document.getElementById('rot-hero-fotos').innerHTML = capaFotos.map(function (f, i) {
      return '<figure class="foto hero-foto' + (i ? '' : ' ativa') + '" data-src="' + esc(f.src) + '" data-legenda="' + esc(f.leg) + '" data-label=""></figure>';
    }).join('');
    document.getElementById('hero-prog').innerHTML = capaFotos.map(function () { return '<i></i>'; }).join('');
    document.getElementById('rot-rotulo').textContent = U.ideiaRoteiro + ' · ' + r.dias + ' ' + diasTxt(r.dias);
    document.getElementById('rot-titulo').textContent = r.nome;
    document.getElementById('rot-resumo').textContent = r.resumo;
    document.getElementById('rot-ideal').textContent = r.ideal;
    var inf = info(r);
    document.getElementById('rot-qtd').textContent = r.dias + ' ' + diasTxt(r.dias) + ' · ' + inf.passeios + ' ' + U.passeios;
    document.getElementById('rot-cidades').textContent = inf.cidades.join(', ');
    Array.prototype.forEach.call(document.querySelectorAll('.js-wa'), function (a) { a.href = msg; });
    var ctaBtn = document.getElementById('rot-cta-btn');
    ctaBtn.textContent = U.consultarPara + ' ' + r.dias + ' ' + diasTxt(r.dias);

    // barra com os dias (so quando tem mais de um)
    var nav = document.getElementById('nav-dias');
    if (r.dias_.length > 1) {
      nav.innerHTML = r.dias_.map(function (id, k) {
        return '<a href="#dia-' + (k + 1) + '"><small>' + U.Dia + '</small><b>' + (k + 1) + '</b></a>';
      }).join('');
    } else {
      nav.parentNode.style.display = 'none';
    }

    // cada dia, cada lugar com a sua foto (img/lugares/<chave>.jpg)
    var lado = 0;
    pag.innerHTML = r.dias_.map(function (id, k) {
      var d = D[id];
      // resumo do dia (coluna fixa no computador): manha, tarde e noite com atalho para cada passeio
      var n = 0, resumo = '';
      periodos.forEach(function (p) {
        if (!d[p[0]].length) return;
        resumo += '<div class="dia-per"><p>' + p[1] + '</p><ul>' + d[p[0]].map(function (lid) {
          n++;
          return '<li><a href="#d' + (k + 1) + '-' + n + '">' + esc(L[lid].t) + '</a></li>';
        }).join('') + '</ul></div>';
      });
      var h = '<section class="dia-sec" id="dia-' + (k + 1) + '">' +
        '<header class="dia-cab">' +
          '<p class="rotulo">' + (r.dias_.length > 1 ? ordinais[k] + ' ' + U.diaMin : U.oDia) + '</p>' +
          '<h2>' + esc(d.titulo) + '</h2>' +
          '<nav class="dia-resumo" aria-label="' + U.passeiosDia + '">' + resumo + '</nav>' +
        '</header><div class="dia-lugares">';
      n = 0;
      periodos.forEach(function (p) {
        d[p[0]].forEach(function (lid) {
          var l = L[lid];
          lado++; n++;
          h += '<article class="lugar' + (lado % 2 === 0 ? ' lugar-inv' : '') + '" id="d' + (k + 1) + '-' + n + '">' +
            '<figure class="foto lugar-foto" data-src="img/lugares/' + lid + '.jpg" data-label="Foto: ' + esc(l.t) + '"><figcaption class="lugar-onde">' + esc(onde(l.o)) + '</figcaption></figure>' +
            '<div class="lugar-txt">' +
              '<p class="lugar-periodo">' + p[1] + '</p>' +
              '<h3>' + esc(l.t) + conf(l.c) + '</h3>' +
              '<p>' + esc(l.d) + '</p>' +
            '</div>' +
          '</article>';
        });
      });
      return h + '</div></section>';
    }).join('');

    // resumo do dia como trajeto: passeios ja vistos preenchidos, o da tela em verde, os proximos vazados
    if ('IntersectionObserver' in window) {
      var obsL = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var a = pag.querySelector('.dia-resumo a[href="#' + e.target.id + '"]');
          if (!a) return;
          var itens = a.closest('.dia-resumo').querySelectorAll('li'), at = a.parentNode, passou = true;
          Array.prototype.forEach.call(itens, function (li) {
            if (li === at) passou = false;
            li.classList.toggle('feito', passou);
            li.classList.toggle('ativo', li === at);
          });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      Array.prototype.forEach.call(pag.querySelectorAll('.lugar'), function (s) { obsL.observe(s); });
    }
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
    if (document.getElementById('localizacao')) navE.innerHTML += '<a href="#localizacao"><small>' + U.localizacao + '</small></a>';
    espacos.innerHTML = ESPACOS.map(function (e, k) {
      var ini = lista.length;
      e.fotos.forEach(function (f) { lista.push({ src: comV(f.f), leg: f.leg || e.titulo, sec: e.titulo }); });
      var gal = e.fotos.map(function (f, j) {
        return '<button type="button" class="gal-item' + (j === 0 ? ' gal-grande' : '') + '" data-i="' + (ini + j) + '" aria-label="' + U.ampliar + esc(f.leg || e.titulo) + '">' +
          '<img loading="lazy" src="' + esc(comV(f.f)) + '" alt="' + esc(f.leg || e.titulo) + '"></button>';
      }).join('');
      return '<section class="espaco' + (k % 2 ? ' espaco-alt' : '') + '" id="' + e.id + '">' +
        '<div class="espaco-cab">' +
          '<p class="rotulo">' + esc(e.rotulo) + '</p>' +
          '<h2>' + esc(e.titulo) + '</h2>' +
          '<p class="espaco-txt">' + esc(e.texto) + conf(e.c) + '</p>' +
          (e.itens ? '<ul class="espaco-itens">' + e.itens.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : '') +
          (e.fotos.length > 1 ? '<button type="button" class="gal-todas espaco-ver" data-i="' + ini + '">' + U.verFotos.replace('{n}', e.fotos.length) + '</button>' : '') +
        '</div>' +
        '<div class="galeria gal-' + Math.min(e.fotos.length, 7) + '">' + gal + '</div>' +
        (e.fotos.length > 1 ? '<p class="gal-ver"><button type="button" class="gal-todas" data-i="' + ini + '">' + U.verFotos.replace('{n}', e.fotos.length) + '</button></p>' : '') +
      '</section>';
    }).join('');

    // visualizador
    var lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', U.fotosPousada);
    lb.innerHTML = '<button type="button" class="lb-fechar" aria-label="' + U.fechar + '">×</button>' +
      '<button type="button" class="lb-seta lb-ant" aria-label="' + U.fotoAnt + '">‹</button>' +
      '<figure class="lb-fig"><img alt=""><figcaption><span class="lb-sec"></span><span class="lb-leg"></span><span class="lb-n"></span></figcaption></figure>' +
      '<button type="button" class="lb-seta lb-prox" aria-label="' + U.fotoProx + '">›</button>';
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
      a.href = WA + encodeURIComponent(U.waPousada);
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
    mm.className = 'menu-mob'; mm.setAttribute('role', 'dialog'); mm.setAttribute('aria-modal', 'true'); mm.setAttribute('aria-label', U.menu);
    mm.innerHTML = '<img src="img/logo.png" alt="Pousada das Missões">' +
      '<button type="button" class="menu-mob-fechar" aria-label="' + U.fecharMenu + '">×</button>' +
      '<nav>' + document.querySelector('.topo .menu').innerHTML + '</nav>' +
      (document.querySelector('.topo .idiomas') ? document.querySelector('.topo .idiomas').outerHTML : '') +
      '<div class="botoes"><a class="btn btn-verde" target="_blank" rel="noopener" href="' + linkWA + '">' + U.consultarWA + '</a>' +
      '<a class="btn btn-contorno" target="_blank" rel="noopener" href="https://ig.me/m/pousadadasmissoes">' + U.mandarDirect + '</a></div>';
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
  barra.innerHTML = '<a class="btn btn-verde" target="_blank" rel="noopener" href="' + (pag ? msg : WA + encodeURIComponent(U.waGeral)) + '">' + U.consultar + '</a>' +
    '<a class="btn barra-direct" target="_blank" rel="noopener" href="https://ig.me/m/pousadadasmissoes">' + U.direct + '</a>';
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
  // numero e total contam so as fotos que existem (foto que nao abriu sai da conta e da barra)
  function legenda() {
    var hn = document.getElementById('hero-n'), hl = document.getElementById('hero-leg'), ht = document.getElementById('hero-tot');
    var pos = 0, tot = 0;
    Array.prototype.forEach.call(slides, function (s, i) {
      if (s.classList.contains('falhou')) return;
      tot++; if (i <= atual) pos = tot;
    });
    if (hn) hn.textContent = (pos < 10 ? '0' : '') + pos;
    if (ht) ht.textContent = '/ ' + tot;
    if (hl) hl.textContent = slides[atual].getAttribute('data-legenda') || '';
    Array.prototype.forEach.call(prog, function (p, i) {
      p.style.display = slides[i] && slides[i].classList.contains('falhou') ? 'none' : '';
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

  // seletor PT | ES: cada link abre a mesma pagina no outro idioma (e a escolha fica salva)
  function comLang(href, l) {
    var h = href.split('#'), u = h[0].replace(/([?&])lang=(pt|es)&?/, '$1').replace(/[?&]$/, '');
    return u + (u.indexOf('?') < 0 ? '?' : '&') + 'lang=' + l + (h.length > 1 ? '#' + h[1] : '');
  }
  Array.prototype.forEach.call(document.querySelectorAll('.js-idioma'), function (a) {
    var l = a.getAttribute('data-lang');
    a.href = comLang((location.pathname.split('/').pop() || 'index.html') + location.search + location.hash, l);
    a.classList.toggle('atual', l === LANG);
    if (l === LANG) a.setAttribute('aria-current', 'true');
  });
  // quem escolheu o idioma continua nele ao passar de uma pagina para outra (mesmo sem memoria do navegador)
  if (window.IDIOMA_ESCOLHIDO) {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="index.html"], a[href^="roteiro.html"], a[href^="pousada.html"]'), function (a) {
      if (!a.classList.contains('js-idioma')) a.setAttribute('href', comLang(a.getAttribute('href'), LANG));
    });
  }
  document.documentElement.classList.add('pronto');
})();
