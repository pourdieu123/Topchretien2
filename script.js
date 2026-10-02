/* TopChrétien Afrique – interactions du site */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
  };

  /* ================= DONNÉES ================= */
  const RUBRIQUES = {
    'au-quotidien': { nom: 'Au quotidien', subs: ['La Pensée du Jour', 'PassLeMot', 'Connect-Me', 'Prions les uns pour les autres', 'TopCartes', 'Podcasts'] },
    'bible': { nom: 'Bible', subs: ['TopBible', 'La Bible en 1 an', 'La Bible en 3 ans', "L'enseignement de Jésus", 'La Bible Chronologique', 'Plans de lecture'] },
    'videos': { nom: 'Vidéos', subs: ['TopTV', "Quoi d'neuf Pasteur ?", "Du nouveau dans #L'air", 'Mon histoire avec Jésus', 'TopFormations', 'Regarder le direct'] },
    'audios': { nom: 'Audios', subs: ['Radio Gospel', 'Podcasts', 'Prédications', 'La Pensée du Jour audio', 'Bible audio', 'Louange'] },
    'textes': { nom: 'Textes', subs: ['TopMessages', 'La question taboue', 'Famille & Co', 'Témoignages', 'Actualités', 'Méditations'] },
    'musique': { nom: 'Musique', subs: ['TopChrétien Musique', 'Louange', 'Tutoriels', 'Électro chrétienne', 'Artistes', 'Playlists'] },
    'chretien': { nom: 'Chrétien ?', subs: ['ConnaitreDieu', '3 Messages', 'MyStory', 'JeVeuxMourir', 'Questions fréquentes', "Parler à quelqu'un"] },
    'le-top': { nom: 'Le Top', subs: ['Qui sommes-nous ?', 'Notre actualité', 'Nous contacter', 'Devenir bénévole', 'Recrutement', 'Faire un don'] },
    'kids': { nom: 'KIDS', subs: ['Je suis un parent', 'Je suis un enfant', 'Histoires bibliques', 'Chants pour enfants', 'Coloriages', 'Prières'] },
  };

  // Versets (Louis Segond 1910) – un différent chaque jour
  const VERSETS = [
    { v: "Elle a fait ce qu'elle a pu", r: 'Mc 14.8', l: 'Marc 14.8', m: "Tu n'as pas besoin de faire plus que les autres. Donne simplement à Dieu le meilleur de toi-meme." },
    { v: "L'Éternel est mon berger: je ne manquerai de rien", r: 'Ps 23.1', l: 'Psaume 23.1', m: "Aujourd'hui, repose-toi sur Celui qui pourvoit à chacun de tes besoins." },
    { v: 'Je puis tout par celui qui me fortifie', r: 'Ph 4.13', l: 'Philippiens 4.13', m: 'Ta force ne vient pas de toi seul : avance avec confiance, Christ marche avec toi.' },
    { v: 'Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier', r: 'Ps 119.105', l: 'Psaume 119.105', m: "Quand le chemin semble obscur, ouvre ta Bible : Dieu éclaire le prochain pas." },
    { v: "Recommande ton sort à l'Éternel, Mets en lui ta confiance, et il agira", r: 'Ps 37.5', l: 'Psaume 37.5', m: "Dépose tes projets entre ses mains. Il est fidèle pour accomplir ce qu'il a promis." },
    { v: 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos', r: 'Mt 11.28', l: 'Matthieu 11.28', m: 'Tu portes trop lourd ? Jésus t’invite à lui confier ton fardeau dès maintenant.' },
  ];

  const FORMATIONS_PLUS = [
    { t: 'Grandir dans la prière', tag: 'Formation / Disciples', who: 'TopChrétien Afrique', g: '#3a6f9c,#14304a' },
    { t: 'Le leadership selon Jésus', tag: 'Formation / Leadership', who: 'TopChrétien Afrique', g: '#c2541b,#7a2e0e' },
    { t: 'Gérer son temps selon Dieu', tag: 'Formation / Développement personnel', who: 'TopChrétien Afrique', g: '#8cc63f,#3e6a1a' },
    { t: 'Bâtir un couple solide', tag: 'Formation / Famille', who: 'TopChrétien Afrique', g: '#9b4dca,#4a1f6a' },
  ];
  const PLANS_PLUS = [
    { t: 'Les Psaumes en 30 jours', g: '#f9c80e,#c28a0a' },
    { t: 'Les Évangiles en 40 jours', g: '#29a8e0,#145a7a' },
    { t: 'Les Proverbes en 31 jours', g: '#e8412c,#7a1a10' },
    { t: 'Le Nouveau Testament en 90 jours', g: '#6f8f6f,#2f4a2f' },
  ];
  const ACTUS = [
    { t: "Pourquoi Dieu n'empêche pas le mal ?", g: '#9cc4e8,#4a6f99', u: 'textes.html#s1' },
    { t: '“Les pasteurs échouent aussi”', g: '#a58bc4,#7a63a8', u: 'textes.html#s5' },
    { t: 'PassLeMot : un message qui bénit... et qui se partage', g: '#6f8f6f,#c9b89a', u: 'au-quotidien.html#s2' },
    { t: 'Une même foi, tout un continent', g: '#7a2e0e,#c2541b', u: '#afrique' },
    { t: 'Grandir chaque jour avec un plan de lecture', g: '#c9b393,#5d4a36', u: 'bible.html#s6' },
  ];
  const TV_PLUS = [
    { t: 'Louange Afrique', g: '#f9c80e,#7a2e0e' },
    { t: 'Questions de foi', g: '#29a8e0,#0d2a3a' },
  ];
  const MESSAGES_PLUS = [
    { t: "Comment garder la foi dans l'épreuve ?", tag: 'Vie chrétienne', g: '#3a6f9c,#14304a' },
    { t: 'Pardonner : par où commencer ?', tag: 'Vie chrétienne', g: '#c2541b,#f0a868' },
    { t: 'Prier en famille au quotidien', tag: 'Famille & Co / Parent', fam: true, g: '#8cc63f,#2f5a1a' },
  ];

  /* ================= OUTILS ================= */
  let toastTimer;
  function toast(msg, icon = 'fa-solid fa-circle-info') {
    let el = $('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.innerHTML = `<i class="${icon}" aria-hidden="true"></i>`;
    el.append(msg);
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  /* ================= MENU : SOUS-MENUS + MOBILE ================= */
  $$('nav li > a').forEach(a => {
    const slug = a.getAttribute('href').replace('.html', '');
    const rub = RUBRIQUES[slug];
    if (!rub) return;
    const dd = document.createElement('div');
    dd.className = 'dd';
    dd.innerHTML = rub.subs.map((t, i) => `<a href="${slug}.html#s${i + 1}">${t}</a>`).join('');
    a.parentElement.appendChild(dd);
  });

  const nav = $('nav');
  const burger = document.createElement('button');
  burger.className = 'burger';
  burger.setAttribute('aria-label', 'Ouvrir le menu');
  burger.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  $('.top-bar .right').prepend(burger);
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    $('i', burger).className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  /* ================= RECHERCHE ================= */
  const INDEX = [{ t: 'Accueil', c: 'TopChrétien Afrique', u: 'index.html' }];
  Object.entries(RUBRIQUES).forEach(([slug, r]) => {
    INDEX.push({ t: r.nom, c: 'Rubrique', u: `${slug}.html` });
    r.subs.forEach((t, i) => INDEX.push({ t, c: r.nom, u: `${slug}.html#s${i + 1}` }));
  });
  [['La Pensée du Jour', 'pensee'], ['TopChrétien Afrique', 'afrique'], ['Actualités', 'actualites'], ['Nos formations', 'formations'],
   ['Nos plans de lecture', 'plans'], ['TopTV', 'toptv'], ['TopMessages', 'topmessages'], ['Newsletter', 'newsletter']]
    .forEach(([t, id]) => INDEX.push({ t, c: 'Accueil', u: `index.html#${id}` }));

  const search = $('.search');
  if (search) {
    const input = $('input', search);
    const box = document.createElement('div');
    box.className = 'search-results';
    box.hidden = true;
    search.appendChild(box);
    input.addEventListener('input', () => {
      const q = norm(input.value.trim());
      if (q.length < 2) { box.hidden = true; return; }
      const res = INDEX.filter(e => norm(`${e.t} ${e.c}`).includes(q)).slice(0, 8);
      box.innerHTML = res.length
        ? res.map(e => `<a href="${e.u}"><b>${e.t}</b><small>${e.c}</small></a>`).join('')
        : '<p>Aucun résultat pour « ' + input.value.replace(/[<>&]/g, '') + ' »</p>';
      box.hidden = false;
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const first = $('a', box); if (first) location.href = first.href; }
      if (e.key === 'Escape') box.hidden = true;
    });
    document.addEventListener('click', e => { if (!search.contains(e.target)) box.hidden = true; });
  }

  /* ================= CARTES SUPPLÉMENTAIRES ================= */
  const trackAfter = id => { const t = document.getElementById(id); return t && t.nextElementSibling; };

  const formations = trackAfter('formations');
  if (formations) formations.insertAdjacentHTML('beforeend', FORMATIONS_PLUS.map(f =>
    `<div class="c"><div class="ph" style="background:linear-gradient(135deg,${f.g})">${f.t}</div>
      <span class="tag">${f.tag}</span><h4>${f.t}</h4>
      <div class="who"><span class="avatar sm"></span>${f.who}</div><a href="videos.html#s5" class="more">Découvrir la formation</a></div>`).join(''));

  const plans = trackAfter('plans');
  if (plans) plans.insertAdjacentHTML('beforeend', PLANS_PLUS.map(p =>
    `<div class="c"><div class="ph" style="background:linear-gradient(135deg,${p.g})">${p.t}</div>
      <span class="tag">TopChrétien Afrique</span><h4>${p.t}</h4><a href="bible.html#s6" class="more">Découvrir le plan</a></div>`).join(''));

  const tvRow = $('.tv-row');
  if (tvRow) tvRow.insertAdjacentHTML('beforeend', TV_PLUS.map(p =>
    `<div class="ph" style="background:linear-gradient(180deg,${p.g})">${p.t}</div>`).join(''));

  /* ================= CARROUSELS ================= */
  $$('.slider-nav').forEach(navEl => {
    const next = navEl.closest('.sec-title').nextElementSibling;
    const track = next.classList.contains('toptv') ? $('.tv-row', next) : next;
    if (!track) return;
    track.classList.add('carousel');
    const [prev, nxt] = $$('span', navEl);
    const dots = track.nextElementSibling && track.nextElementSibling.classList.contains('dots') ? track.nextElementSibling : null;
    const step = () => track.clientWidth * 0.9;

    [prev, nxt].forEach((b, i) => {
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', i ? 'Suivant' : 'Précédent');
      const go = () => track.scrollBy({ left: i ? step() : -step(), behavior: 'smooth' });
      b.addEventListener('click', go);
      b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });

    function update() {
      const max = track.scrollWidth - track.clientWidth;
      prev.classList.toggle('off', track.scrollLeft <= 2);
      nxt.classList.toggle('off', track.scrollLeft >= max - 2);
      if (!dots) return;
      const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth - 0.05));
      if (dots.children.length !== pages) {
        dots.innerHTML = Array.from({ length: pages }, (_, i) => `<i data-i="${i}"></i>`).join('');
      }
      const cur = max > 0 ? Math.round((track.scrollLeft / max) * (pages - 1)) : 0;
      $$('i', dots).forEach((d, i) => d.classList.toggle('on', i === cur));
    }
    if (dots) dots.addEventListener('click', e => {
      const i = e.target.dataset.i;
      if (i === undefined) return;
      const max = track.scrollWidth - track.clientWidth;
      track.scrollTo({ left: (max * i) / Math.max(1, dots.children.length - 1), behavior: 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ================= ACTUALITÉS (défilement auto) ================= */
  const actus = $('.actus');
  if (actus) {
    let cur = 1;
    const at = i => ACTUS[(i + ACTUS.length) % ACTUS.length];
    const render = () => {
      const p = at(cur - 1), c = at(cur), n = at(cur + 1);
      actus.innerHTML = `
        <button class="ph side" data-dir="-1" style="background:linear-gradient(135deg,${p.g})">${p.t}</button>
        <div class="main"><a class="ph" href="${c.u}" style="background:linear-gradient(135deg,${c.g})">${c.t}<span class="chip">JE LIS L'ARTICLE</span></a></div>
        <button class="ph side" data-dir="1" style="background:linear-gradient(135deg,${n.g})">${n.t}</button>`;
    };
    const move = d => { cur = (cur + d + ACTUS.length) % ACTUS.length; render(); };
    actus.addEventListener('click', e => { const b = e.target.closest('[data-dir]'); if (b) move(+b.dataset.dir); });
    let timer = setInterval(() => move(1), 6000);
    actus.addEventListener('mouseenter', () => clearInterval(timer));
    actus.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(() => move(1), 6000); });
    render();
  }

  /* ================= PASSLEMOT DU JOUR + PARTAGE ================= */
  const plm = $('.passlemot');
  if (plm) {
    const now = new Date();
    const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
    const v = VERSETS[day % VERSETS.length];
    $('h3', plm).textContent = `"${v.v}" (${v.r})`;
    $('p', plm).textContent = `${v.m} PassLeMot`;
    const texte = `"${v.v}" (${v.r}) – ${v.m} #PassLeMot`;
    const url = location.href.split('#')[0];
    const enc = encodeURIComponent;
    const partager = async () => {
      if (navigator.share) { try { await navigator.share({ title: 'PassLeMot', text: texte, url }); } catch { /* annulé */ } return; }
      try { await navigator.clipboard.writeText(`${texte} ${url}`); toast('Verset copié, il ne reste plus qu’à le partager !', 'fa-solid fa-copy'); }
      catch { toast('Impossible de copier automatiquement.'); }
    };
    const [fb, wa, mail, share] = $$('.share .ic', plm);
    const lien = (el, href, label) => {
      const a = document.createElement('a');
      a.className = el.className; a.innerHTML = el.innerHTML;
      a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', label);
      el.replaceWith(a);
    };
    lien(fb, `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(texte)}`, 'Partager sur Facebook');
    lien(wa, `https://wa.me/?text=${enc(texte + ' ' + url)}`, 'Partager sur WhatsApp');
    lien(mail, `mailto:?subject=${enc('PassLeMot du jour')}&body=${enc(texte + '\n\n' + url)}`, 'Partager par email');
    share.setAttribute('role', 'button'); share.setAttribute('tabindex', '0'); share.setAttribute('aria-label', 'Partager');
    share.addEventListener('click', partager);
    const [lire, passer] = $$('.share .pill', plm);
    lire.textContent = `Lire ${v.l} sur TopBible`;
    lire.href = 'bible.html#s1';
    passer.addEventListener('click', e => { e.preventDefault(); partager(); });
  }

  /* ================= TOPMESSAGES : VOIR PLUS ================= */
  const voirPlus = $('.voir-plus');
  if (voirPlus) {
    voirPlus.addEventListener('click', e => {
      if (voirPlus.dataset.done) return; // second clic : on suit le lien vers la page Textes
      e.preventDefault();
      voirPlus.insertAdjacentHTML('beforebegin', MESSAGES_PLUS.map(m =>
        `<div class="msg-item reveal in"><div class="ph" style="background:linear-gradient(135deg,${m.g})"></div>
          <div><span class="tag${m.fam ? ' fam' : ''}">${m.tag}</span><h4>${m.t}</h4><div class="author"><span class="avatar sm"></span>TopChrétien Afrique</div></div></div>`).join(''));
      voirPlus.dataset.done = '1';
      voirPlus.innerHTML = 'Voir tous les messages <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
    });
  }

  /* ================= NEWSLETTER ================= */
  const form = $('.news-form');
  if (form) {
    const msg = $('.news-msg');
    const deja = store.get('tca_newsletter', null);
    if (deja) msg.textContent = `Bon retour ${deja.prenom} ! Vous êtes déjà inscrit(e) avec ${deja.email}.`;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const prenom = form.prenom.value.trim();
      const email = form.email.value.trim();
      $$('input', form).forEach(i => i.classList.remove('err'));
      if (!prenom) { form.prenom.classList.add('err'); msg.textContent = 'Merci d’indiquer votre prénom.'; form.prenom.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { form.email.classList.add('err'); msg.textContent = 'Cette adresse email ne semble pas valide.'; form.email.focus(); return; }
      store.set('tca_newsletter', { prenom, email, date: new Date().toISOString() });
      form.reset();
      msg.innerHTML = '<i class="fa-solid fa-hands-praying" aria-hidden="true"></i>';
      msg.append(`Merci ${prenom} ! Vous recevrez bientôt "La Pensée du Jour" à l'adresse ${email}.`);
      toast('Inscription enregistrée !', 'fa-solid fa-circle-check');
    });
  }

  /* ================= LIENS PAS ENCORE DISPONIBLES ================= */
  document.addEventListener('click', e => {
    if (e.target.closest('a[href="#"]')) { e.preventDefault(); toast('Ce contenu sera bientôt disponible', 'fa-solid fa-hourglass-half'); }
    if (e.target.closest('.user-btn')) toast('L’espace membre arrive bientôt !', 'fa-regular fa-circle-user');
  });

  /* ================= ANIMATIONS AU DÉFILEMENT ================= */
  const header = $('header');
  const top = document.createElement('button');
  top.className = 'to-top';
  top.setAttribute('aria-label', 'Remonter en haut');
  top.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(top);
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 10);
    top.classList.toggle('show', scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const els = $$('.sec-title, .pensee, .amour, .afrique, .actus, .passlemot .container, .carousel, .toptv > div:first-child, .msg-main, .msg-item, .music > div, .kids-btns, .news, .page-hero .container, .sub-grid .c');
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  /* ================= DIVERS ================= */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
