(function () {
  var seletor = document.getElementById('seletor');
  var painel = document.getElementById('painel');
  var periodos = [['manha', 'Manhã'], ['tarde', 'Tarde'], ['noite', 'Noite']];

  if (!RASCUNHO) document.body.classList.add('final');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function conf(c) { return c ? '<em class="conf" data-c="' + esc(c) + '">a confirmar</em>' : ''; }

  function lugar(id) {
    var l = L[id];
    return '<li><h5>' + esc(l.t) + conf(l.c) + '</h5><p>' + esc(l.d) + '</p></li>';
  }

  function dia(id, n) {
    var d = D[id];
    var h = '<article class="dia"><header><span class="dia-n">Dia ' + n + '</span><h4>' + esc(d.titulo) + '</h4></header><div class="periodos">';
    periodos.forEach(function (p) {
      h += '<div class="periodo periodo-' + p[0] + '"><span class="periodo-nome">' + p[1] + '</span><ul>' + d[p[0]].map(lugar).join('') + '</ul></div>';
    });
    return h + '</div></article>';
  }

  function render(i) {
    var r = ROTEIROS[i];
    var h = '<div class="rot-cab">' +
      '<p class="rot-num">' + r.dias + (r.dias === 1 ? ' dia' : ' dias') + '</p>' +
      '<h3 class="titulo-caixa"><span>' + esc(r.nome) + '</span></h3>' +
      '<p class="rot-resumo">' + esc(r.resumo) + '</p>' +
      '<p class="pilula pilula-verde pilula-peq">Ideal para: ' + esc(r.ideal) + '</p></div>' +
      '<div class="rot-fotos">' +
      '<figure class="foto" data-src="img/roteiro-' + r.dias + '-a.jpg" data-label="Foto: ' + esc(r.fotos[0]) + '"></figure>' +
      '<figure class="foto" data-src="img/roteiro-' + r.dias + '-b.jpg" data-label="Foto: ' + esc(r.fotos[1]) + '"></figure></div>' +
      '<div class="dias">' + r.dias_.map(function (id, k) { return dia(id, k + 1); }).join('') + '</div>' +
      '<a class="btn btn-verde rot-btn" target="_blank" rel="noopener" href="https://wa.me/5555981615722?text=' +
      encodeURIComponent('Olá! Vi o roteiro de ' + r.dias + (r.dias === 1 ? ' dia' : ' dias') + ' e quero saber os valores para a minha data.') +
      '">Quero os valores para ' + r.dias + (r.dias === 1 ? ' dia' : ' dias') + '</a>';
    painel.innerHTML = h;
    carregarFotos(painel);
    Array.prototype.forEach.call(seletor.children, function (b, k) {
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
      b.classList.toggle('ativo', k === i);
    });
  }

  function carregarFotos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll('.foto[data-src]'), function (f) {
      if (!f.querySelector('.foto-label')) {
        var s = document.createElement('span'); s.className = 'foto-label'; s.textContent = f.getAttribute('data-label'); f.appendChild(s);
      }
      var img = new Image();
      img.onload = function () { f.style.backgroundImage = 'url("' + img.src + '")'; f.classList.add('ok'); };
      img.src = f.getAttribute('data-src');
    });
  }

  ROTEIROS.forEach(function (r, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab');
    b.innerHTML = '<b>' + r.dias + '</b><small>' + (r.dias === 1 ? 'dia' : 'dias') + '</small>';
    b.addEventListener('click', function () {
      render(i);
      try { history.replaceState(null, '', '#' + r.dias + '-dias'); } catch (e) {}
    });
    seletor.appendChild(b);
  });

  var m = /^#(\d)-dias?$/.exec(location.hash);
  var ini = m ? Math.min(Math.max(parseInt(m[1], 10) - 1, 0), ROTEIROS.length - 1) : 0;
  render(ini);
  if (m) document.getElementById('roteiros').scrollIntoView();
  carregarFotos(document);
})();
