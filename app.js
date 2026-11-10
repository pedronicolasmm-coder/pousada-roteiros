(function () {
  var seletor = document.getElementById('seletor');
  var painel = document.getElementById('painel');
  var topo = document.getElementById('topo');
  var periodos = [['manha', 'Manhã'], ['tarde', 'Tarde'], ['noite', 'Noite']];
  var ordinais = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo'];
  var WA = 'https://wa.me/5555981615722?text=';

  if (!RASCUNHO) document.body.classList.add('final');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function conf(c) { return c ? '<em class="conf" data-c="' + esc(c) + '">a confirmar</em>' : ''; }
  function diasTxt(n) { return n === 1 ? 'dia' : 'dias'; }

  function lugar(id) {
    var l = L[id];
    return '<li><h5>' + esc(l.t) + conf(l.c) + '</h5><p>' + esc(l.d) + '</p></li>';
  }

  function dia(id, k, total) {
    var d = D[id];
    var h = '<article class="dia"><header>' + (total > 1 ? '<p class="dia-ord">' + ordinais[k] + ' dia</p>' : '<p class="dia-ord">O dia</p>') +
      '<h4>' + esc(d.titulo) + '</h4></header>';
    periodos.forEach(function (p) {
      h += '<div class="periodo"><span class="periodo-nome">' + p[1] + '</span><ul>' + d[p[0]].map(lugar).join('') + '</ul></div>';
    });
    return h + '</article>';
  }

  function render(i) {
    var r = ROTEIROS[i];
    var msg = WA + encodeURIComponent('Olá! Vi a ideia de roteiro de ' + r.dias + ' ' + diasTxt(r.dias) + ' e quero saber os valores da hospedagem para a minha data.');
    painel.innerHTML =
      '<aside class="rot-info">' +
        '<p class="rot-num">' + r.dias + '<small>' + diasTxt(r.dias) + '</small></p>' +
        '<h3>' + esc(r.nome) + '</h3>' +
        '<p class="rot-resumo">' + esc(r.resumo) + '</p>' +
        '<p class="rot-ideal"><span>Indicado para</span>' + esc(r.ideal) + '</p>' +
        '<a class="btn btn-verde" target="_blank" rel="noopener" href="' + msg + '">Consultar hospedagem</a>' +
        '<figure class="foto rot-foto-b" data-src="img/roteiro-' + r.dias + '-b.jpg" data-label="' + esc(r.fotos[1]) + '"></figure>' +
      '</aside>' +
      '<div class="rot-col">' +
        '<p class="rot-dica"><span aria-hidden="true">↓</span> Role dentro do quadro para ver o roteiro completo</p>' +
        '<div class="rot-caixa">' +
          '<div class="rot-dias" tabindex="0" aria-label="Roteiro dia a dia">' +
            '<figure class="foto rot-foto-a" data-src="img/roteiro-' + r.dias + '-a.jpg" data-label="' + esc(r.fotos[0]) + '"></figure>' +
            r.dias_.map(function (id, k) { return dia(id, k, r.dias_.length); }).join('') +
            '<p class="rot-nota"><b>Esta é uma sugestão, não um pacote.</b> A pousada não vende roteiros. Horários, ingressos e funcionamento dos atrativos devem ser confirmados com cada um deles.</p>' +
          '</div>' +
        '</div>' +
        '<p class="rot-cta"><a class="btn btn-verde" target="_blank" rel="noopener" href="' + msg + '">Consultar hospedagem para ' + r.dias + ' ' + diasTxt(r.dias) + '</a></p>' +
      '</div>';
    carregarFotos(painel);
    caixaRolagem(painel);
    Array.prototype.forEach.call(seletor.children, function (b, k) {
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
      b.classList.toggle('ativo', k === i);
    });
  }

  // quadro com rolagem propria: esconde a dica quando tudo cabe e tira o degrade no fim
  function caixaRolagem(raiz) {
    var col = raiz.querySelector('.rot-col');
    var caixa = raiz.querySelector('.rot-caixa');
    var box = raiz.querySelector('.rot-dias');
    function medir() {
      col.classList.toggle('cabe', box.scrollHeight <= box.clientHeight + 2);
      caixa.classList.toggle('fim', box.scrollTop + box.clientHeight >= box.scrollHeight - 4);
    }
    box.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    medir();
  }

  function carregarFotos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll('.foto[data-src]'), function (f) {
      if (f.getAttribute('data-ok')) return;
      f.setAttribute('data-ok', '1');
      var s = document.createElement('span'); s.className = 'foto-label'; s.textContent = f.getAttribute('data-label'); f.appendChild(s);
      var img = new Image();
      img.onload = function () { f.style.backgroundImage = 'url("' + img.src + '")'; f.classList.add('ok'); };
      img.src = f.getAttribute('data-src');
    });
  }

  ROTEIROS.forEach(function (r, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab');
    b.innerHTML = '<b>' + r.dias + '</b><small>' + diasTxt(r.dias) + '</small>';
    b.addEventListener('click', function () {
      render(i);
      try { history.replaceState(null, '', '#' + r.dias + '-dias'); } catch (e) {}
      var y = painel.getBoundingClientRect().top + window.pageYOffset - 150;
      if (window.pageYOffset > y) window.scrollTo(0, y);
    });
    seletor.appendChild(b);
  });

  function rolar() { topo.classList.toggle('solido', window.pageYOffset > 40); }
  window.addEventListener('scroll', rolar, { passive: true });
  rolar();

  var m = /^#(\d)-dias?$/.exec(location.hash);
  var ini = m ? Math.min(Math.max(parseInt(m[1], 10) - 1, 0), ROTEIROS.length - 1) : 0;
  render(ini);
  carregarFotos(document);

  // capa rotativa: troca de foto a cada 3 segundos, em loop, so entre as que ja carregaram
  var slides = document.querySelectorAll('.hero-foto');
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

  if (m) document.getElementById('roteiros').scrollIntoView();
})();
