/* ============ HARBOUR CITY FC — script.js ============ */
(function () {
  'use strict';

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WHATSAPP = '2349027911490';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------- Countdown ---------- */
  function nextMatchDate() {
    var d = new Date();
    d.setHours(18, 0, 0, 0);
    var day = d.getDay();
    var diff = (6 - day + 7) % 7;
    if (diff === 0 && d < new Date()) diff = 7;
    d.setDate(d.getDate() + diff);
    return d;
  }
  var kickoff = nextMatchDate();
  var daysEl = $('#cDays'), hoursEl = $('#cHours'), minsEl = $('#cMins'), secsEl = $('#cSecs');

  function tick() {
    var now = new Date();
    var diff = Math.max(0, kickoff - now);
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s %= 86400;
    var h = Math.floor(s / 3600); s %= 3600;
    var m = Math.floor(s / 60); s %= 60;
    daysEl.textContent = d;
    hoursEl.textContent = h;
    minsEl.textContent = m;
    secsEl.textContent = s;
    if (diff === 0) {
      $('#matchDate').textContent = 'Kick-off! Live at Harbour Arena';
      clearInterval(timer);
    }
  }
  var timer = setInterval(tick, 1000);
  tick();
  $('#matchDate').textContent = 'Home • Harbour Arena — ' + kickoff.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }) + ', 18:00';

  /* ---------- Fixtures ---------- */
  var upcoming = [
    { date: 'Sat 22 Aug', home: true, opp: 'Northbank United', league: 'Coastal Premier League • MD 10' },
    { date: 'Sat 29 Aug', home: false, opp: 'Delta Forge', league: 'Coastal Premier League • MD 11' },
    { date: 'Sat 05 Sep', home: true, opp: 'Lagos Rovers', league: 'Cup Quarter-Final' }
  ];
  var results = [
    { date: 'Sat 14 Aug', home: false, opp: 'Portside Rovers', score: '3 – 1', res: 'w' },
    { date: 'Sat 07 Aug', home: true, opp: 'Bayview Wanderers', score: '1 – 1', res: 'd' },
    { date: 'Sat 31 Jul', home: false, opp: 'Eastgate Kestrels', score: '0 – 2', res: 'w' }
  ];
  var fxList = $('#fxList');
  var fxMode = 'up';

  function renderFx() {
    var data = fxMode === 'up' ? upcoming : results;
    fxList.innerHTML = '';
    data.forEach(function (f) {
      var el = document.createElement('div');
      el.className = 'fx-row';
      if (fxMode === 'up') {
        el.innerHTML =
          '<span class="fx-date">' + f.date + '</span>' +
          '<div class="fx-teams"><span class="fx-badge ' + (f.home ? 'home' : 'away') + '">' + (f.home ? 'Home' : 'Away') + '</span>' +
          'Harbour City FC <b>VS</b> ' + f.opp + '</div>' +
          '<span class="fx-result" style="color:var(--yellow)">' + f.league + '</span>';
      } else {
        el.innerHTML =
          '<span class="fx-date">' + f.date + '</span>' +
          '<div class="fx-teams"><span class="fx-badge ' + (f.home ? 'home' : 'away') + '">' + (f.home ? 'Home' : 'Away') + '</span>' +
          'Harbour City FC ' + f.score + ' ' + f.opp + '</div>' +
          '<span class="fx-result ' + f.res + '">' + ({ w: 'Win', d: 'Draw', l: 'Loss' }[f.res]) + '</span>';
      }
      fxList.appendChild(el);
    });
  }
  $$('.fx-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      fxMode = btn.dataset.fx;
      $$('.fx-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      renderFx();
    });
  });

  /* ---------- Squad ---------- */
  var players = [
    { no: 1, name: 'K. Okonkwo', pos: 'GK', apps: 96, clean: 34, saves: 210, img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80' },
    { no: 16, name: 'B. Iheme', pos: 'GK', apps: 41, clean: 12, saves: 98, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
    { no: 3, name: 'T. Adeola', pos: 'DEF', apps: 88, goals: 4, assists: 9, img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80' },
    { no: 4, name: 'J. Martins', pos: 'DEF', apps: 104, goals: 6, assists: 3, img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80' },
    { no: 5, name: 'E. Bello', pos: 'DEF', apps: 72, goals: 2, assists: 5, img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80' },
    { no: 12, name: 'S. Bamidele', pos: 'DEF', apps: 58, goals: 1, assists: 7, img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80' },
    { no: 6, name: 'N. Uche', pos: 'MID', apps: 141, goals: 12, assists: 22, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
    { no: 8, name: 'P. Eze', pos: 'MID', apps: 64, goals: 8, assists: 10, img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80' },
    { no: 10, name: 'A. Calabar', pos: 'MID', apps: 157, goals: 34, assists: 48, img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80' },
    { no: 14, name: 'S. Jimoh', pos: 'MID', apps: 49, goals: 5, assists: 11, img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80' },
    { no: 7, name: 'R. Litoral', pos: 'FWD', apps: 81, goals: 29, assists: 14, img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
    { no: 9, name: 'D. Bakare', pos: 'FWD', apps: 119, goals: 61, assists: 12, img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80' },
    { no: 11, name: 'M. Tunde', pos: 'FWD', apps: 17, goals: 4, assists: 3, img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80' }
  ];
  var squadGrid = $('#squadGrid');
  var activePos = 'All';

  function posLabel(pos) {
    return { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward' }[pos];
  }
  function renderSquad() {
    squadGrid.innerHTML = '';
    players.forEach(function (p) {
      var show = activePos === 'All' || p.pos === activePos;
      var el = document.createElement('article');
      el.className = 'p-card' + (show ? '' : ' hide');
      var statA = p.pos === 'GK' ? ['Clean Sheets', p.clean] : ['Goals', p.goals];
      var statB = p.pos === 'GK' ? ['Saves', p.saves] : ['Assists', p.assists];
      el.innerHTML =
        '<span class="p-no">' + p.no + '</span>' +
        '<img src="' + p.img + '" alt="' + p.name + ' — ' + posLabel(p.pos) + '" loading="lazy">' +
        '<div class="p-stats"><div class="ps-row">' +
          '<div><b>' + p.apps + '</b><span>Apps</span></div>' +
          '<div><b>' + statA[1] + '</b><span>' + statA[0] + '</span></div>' +
          '<div><b>' + statB[1] + '</b><span>' + statB[0] + '</span></div>' +
        '</div></div>' +
        '<div class="p-name"><b>' + p.name + '</b><span>' + posLabel(p.pos) + ' • No. ' + p.no + '</span></div>';
      squadGrid.appendChild(el);
    });
  }
  $$('.sf-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activePos = btn.dataset.pos;
      $$('.sf-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      renderSquad();
    });
  });

  /* ---------- WhatsApp helpers (tickets + shop) ---------- */
  function waBuy(text) {
    var msg = 'Hello Harbour City FC! I would like to buy: ' + text + '\n\nName:\nPhone:';
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
  }
  $$('[data-ticket]').forEach(function (b) {
    b.addEventListener('click', function () { waBuy(b.dataset.ticket); });
  });
  $$('[data-product]').forEach(function (b) {
    b.addEventListener('click', function () { waBuy(b.dataset.product); });
  });

  /* ---------- Nav ---------- */
  var navToggle = $('#navToggle'), navMenu = $('#navMenu');
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { navMenu.classList.remove('open'); navToggle.classList.remove('open'); }
  });
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderFx();
  renderSquad();
})();