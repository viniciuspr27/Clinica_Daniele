'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const config = window.CLINIC_CONFIG || {};
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => motion.matches ? 'auto' : 'smooth';
  const phone = String(config.whatsapp || '').replace(/\D/g, '');
  const hasWhatsApp = /^55\d{10,11}$/.test(phone);
  const services = {
    facial: { title: 'Estética facial', eyebrow: '01 / Pele e rosto', description: 'Um espaço para conversar sobre sua pele, seus objetivos e as possibilidades de cuidado facial.', topics: ['O que você busca para a sua pele', 'Cuidados disponíveis e avaliação individual', 'Dúvidas sobre rotina, valores e horários'] },
    corporal: { title: 'Dermatofuncional', eyebrow: '02 / Corpo', description: 'Converse sobre cuidados com a pele e o corpo e entenda quais possibilidades podem fazer sentido para você.', topics: ['Seus objetivos e suas dúvidas', 'Possibilidades de cuidado após avaliação', 'Disponibilidade, valores e primeiro atendimento'] },
    bemestar: { title: 'Saúde integrativa', eyebrow: '03 / Bem-estar', description: 'Um ponto de partida para conversar sobre bem-estar, rotina e uma visão integrada do cuidado.', topics: ['O que você busca para sua rotina e bem-estar', 'Áreas e profissionais disponíveis na clínica', 'Como funciona uma primeira orientação'] }
  };
  const nav = $('#navigation'), menu = $('.menu');
  const subject = $('#subject'), message = $('#message');
  let activeService = 'facial', lastInterest = 'Uma primeira orientação', currentGoal = '';
  let photoIndex = 0, dialogTrigger = null;

  function safeUrl(value, local = false) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, document.baseURI);
      if (url.protocol === 'https:') return url.href;
      if (local && url.origin === location.origin && ['http:', 'file:'].includes(url.protocol)) return url.href;
    } catch (_) { /* Endereços inválidos não criam links. */ }
    return '';
  }
  function closeMenu(restore = false) {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
    if (restore) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open));
  });
  $$('#navigation a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', () => closeMenu());

  function openDialog(dialog) {
    const active = document.activeElement;
    if (active && !active.closest('dialog')) dialogTrigger = active;
    closeMenu();
    $$('dialog[open]').forEach(item => item.close());
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      const anyOpen = Boolean($('dialog[open]'));
      document.body.classList.toggle('modal-open', anyOpen);
      if (!anyOpen) {
        if (dialogTrigger?.isConnected && dialogTrigger.getClientRects().length) dialogTrigger.focus({ preventScroll: true });
        else if (menu.getClientRects().length) menu.focus({ preventScroll: true });
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
  });
  function syncContact() {
    const text = message.value.trim(), link = $('#whatsappLink');
    $('#copyMessage').disabled = !text; link.hidden = !hasWhatsApp;
    if (hasWhatsApp && text) {
      link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text); link.removeAttribute('aria-disabled');
    } else { link.removeAttribute('href'); link.setAttribute('aria-disabled', 'true'); }
  }
  function buildMessage() {
    const purpose = currentGoal === 'Consultar avaliação e horários'
      ? 'Gostaria de consultar como funciona a avaliação e os horários disponíveis.'
      : 'Gostaria de conhecer as possibilidades e entender como funciona o primeiro atendimento.';
    message.value = 'Olá! Tenho interesse em ' + subject.value.toLocaleLowerCase('pt-BR') + '. ' + purpose + ' Podem me orientar?';
    $('#contactStatus').textContent = ''; syncContact();
  }
  function openContact(interest = lastInterest, goal = '') {
    lastInterest = [...subject.options].some(item => item.value === interest) ? interest : 'Uma primeira orientação';
    currentGoal = goal; subject.value = lastInterest; buildMessage(); openDialog($('#contactDialog'));
  }
  $$('[data-contact]').forEach(button => button.addEventListener('click', () => openContact()));
  if (hasWhatsApp) $$('[data-contact-label]').forEach(label => { label.textContent = 'Conversar no WhatsApp'; });
  $('#contactIntro').textContent = hasWhatsApp
    ? 'Confira sua mensagem e continue no WhatsApp. O atendimento e a disponibilidade serão confirmados pela clínica.'
    : 'O contato direto está em configuração. Você já pode preparar e copiar sua mensagem; nenhum contato será enviado nesta etapa.';
  subject.addEventListener('change', () => { lastInterest = subject.value; buildMessage(); });
  message.addEventListener('input', () => { $('#contactStatus').textContent = ''; syncContact(); });
  $('#whatsappLink').addEventListener('click', event => { if (!hasWhatsApp || !message.value.trim()) event.preventDefault(); });
  $('#copyMessage').addEventListener('click', async () => {
    if (!message.value.trim()) return;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.value.trim());
      $('#contactStatus').textContent = 'Mensagem copiada. Você pode colar na sua conversa com a clínica.';
    } catch (_) {
      message.focus(); message.select();
      $('#contactStatus').textContent = 'Copie o texto selecionado com Ctrl+C ou pelo menu do celular.';
    }
  });
  $$('[data-service]').forEach(button => button.addEventListener('click', () => {
    activeService = button.dataset.service;
    const service = services[activeService];
    $('#serviceTitle').textContent = service.title; $('#serviceEyebrow').textContent = service.eyebrow;
    $('#serviceDescription').textContent = service.description;
    $('#serviceTopics').replaceChildren(...service.topics.map(topic => { const li = document.createElement('li'); li.textContent = topic; return li; }));
    openDialog($('#serviceDialog'));
  }));
  $('#serviceContact').addEventListener('click', () => openContact(services[activeService].title));
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    $$('.card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) { count++; card.classList.remove('is-pending'); card.classList.add('is-visible'); }
    });
    $('#filterStatus').textContent = count === 1 ? '1 área disponível.' : count + ' áreas disponíveis.';
  }));
  const form = $('#interestForm');
  function finderStep(step) {
    $('#stepOne').hidden = step !== 1; $('#stepTwo').hidden = step !== 2;
    $('#stepLabel').textContent = 'Passo 0' + step + ' de 02';
    $$('.progress span').forEach((dot, index) => dot.classList.toggle('active', index < step));
    if (step === 2) $('#goalLegend').focus({ preventScroll: true });
    else $('input[name="interest"]:checked', form)?.focus({ preventScroll: true });
  }
  form.addEventListener('change', () => {
    $('#nextStep').disabled = !$('input[name="interest"]:checked', form);
    $('#finishFinder').disabled = !$('input[name="goal"]:checked', form);
  });
  $('#nextStep').addEventListener('click', () => {
    const interest = $('input[name="interest"]:checked', form); if (!interest) return;
    $('#chosenInterest').textContent = 'Seu interesse: ' + interest.value; finderStep(2);
  });
  $('#backStep').addEventListener('click', () => finderStep(1));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const interest = $('input[name="interest"]:checked', form), goal = $('input[name="goal"]:checked', form);
    if (interest && goal) openContact(interest.value, goal.value);
  });
  // Informações oficiais opcionais. Os valores são tratados como texto.
  if (config.ownerBio) $('#ownerBio').textContent = String(config.ownerBio);
  const ownerPhoto = safeUrl(config.ownerPhoto, true);
  if (ownerPhoto) {
    const img = new Image(); img.src = ownerPhoto; img.alt = ''; img.width = 488; img.height = 360; img.fetchPriority = 'high';
    img.addEventListener('load', () => { $('.portrait').style.backgroundImage = 'none'; });
    img.addEventListener('error', () => img.remove(), { once: true }); $('.portrait').append(img);
  }
  for (const key of Object.keys(services)) {
    const url = safeUrl(config.servicePhotos?.[key], true), visual = $('.card[data-category="' + key + '"] .card-pic');
    if (!url || !visual) continue;
    const probe = new Image();
    probe.addEventListener('load', () => { visual.style.backgroundImage = 'url(' + JSON.stringify(url) + ')'; visual.classList.add('custom-photo'); });
    probe.src = url;
  }
  if (config.address) { $('#addressText').textContent = String(config.address); $('#addressBlock').hidden = false; }
  if (config.hours) { $('#hoursText').textContent = String(config.hours); $('#hoursBlock').hidden = false; }
  const maps = safeUrl(config.mapsUrl), instagram = safeUrl(config.instagramUrl);
  if (maps && config.address) { $('#mapsLink').href = maps; $('#mapsLink').hidden = false; }
  if (instagram) { $('#instagramLink').href = instagram; $('#instagramLink').hidden = false; }
  $('#contactDetails').hidden = !(config.address || config.hours || instagram);
  $('#previewNote').hidden = config.preview === false; $('#year').textContent = String(new Date().getFullYear());
  const gallery = (Array.isArray(config.gallery) ? config.gallery : []).filter(item => item && item.alt && safeUrl(item.src, true));
  function showPhoto(index) {
    if (!gallery.length) return;
    photoIndex = (index + gallery.length) % gallery.length;
    const item = gallery[photoIndex]; $('#galleryImage').src = safeUrl(item.src, true); $('#galleryImage').alt = String(item.alt);
    $('#galleryCaption').textContent = (photoIndex + 1) + ' / ' + gallery.length + ' — ' + (item.caption || item.alt);
    $('#previousPhoto').hidden = $('#nextPhoto').hidden = gallery.length < 2;
  }
  if (gallery.length) {
    $('#galeria').hidden = false;
    gallery.forEach((item, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'gallery-item'; button.setAttribute('aria-label', 'Ampliar: ' + item.alt);
      const img = new Image(); img.src = safeUrl(item.src, true); img.alt = String(item.alt); img.loading = 'lazy'; img.decoding = 'async'; img.width = 640; img.height = 480;
      const caption = document.createElement('span'); caption.textContent = item.caption || item.alt; button.append(img, caption);
      button.addEventListener('click', () => { showPhoto(index); openDialog($('#galleryDialog')); }); $('#galleryGrid').append(button);
    });
  }
  $('#previousPhoto').addEventListener('click', () => showPhoto(photoIndex - 1)); $('#nextPhoto').addEventListener('click', () => showPhoto(photoIndex + 1));
  $('#galleryDialog').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
  });
  let touchStart = null;
  $('#galleryImage').addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? event.touches[0].clientX : null; }, { passive: true });
  $('#galleryImage').addEventListener('touchend', event => {
    if (touchStart !== null && event.changedTouches.length) { const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 55) showPhoto(photoIndex + (delta < 0 ? 1 : -1)); }
    touchStart = null;
  }, { passive: true });
  const reviews = (Array.isArray(config.reviews) ? config.reviews : []).filter(item => item && item.quote && item.author);
  if (reviews.length) {
    $('#avaliacoes').hidden = false;
    reviews.forEach(item => {
      const card = document.createElement('article'); card.className = 'review-card';
      const quote = document.createElement('blockquote'); quote.textContent = String(item.quote);
      const cite = document.createElement('cite'); cite.textContent = String(item.author); card.append(quote, cite);
      const url = safeUrl(item.sourceUrl);
      if (url) { const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Ver avaliação original ↗'; card.append(link); }
      $('#reviewsTrack').append(card);
    });
  }
  const track = $('#reviewsTrack');
  function syncReviews() {
    $('#previousReview').disabled = track.scrollLeft <= 2;
    $('#nextReview').disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function scrollReview(direction) {
    const card = $('.review-card', track); if (!card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: behavior() });
  }
  $('#previousReview').addEventListener('click', () => scrollReview(-1)); $('#nextReview').addEventListener('click', () => scrollReview(1));
  track.addEventListener('scroll', () => {
    syncReviews(); const card = $('.review-card', track);
    if (card) $('#reviewStatus').textContent = 'Avaliação ' + Math.min(reviews.length, 1 + Math.round(track.scrollLeft / (card.getBoundingClientRect().width + 20))) + ' de ' + reviews.length;
  }, { passive: true });
  window.addEventListener('resize', syncReviews); syncReviews();
  // O conteúdo permanece visível sem suporte aos observadores.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    if (!motion.matches) $$('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) { element.classList.add('is-pending'); revealObserver.observe(element); }
    });
    document.addEventListener('focusin', event => {
      const element = event.target.closest('.is-pending');
      if (element) { element.classList.remove('is-pending'); element.classList.add('is-visible'); revealObserver.unobserve(element); }
    });
    motion.addEventListener('change', () => { if (motion.matches) $$('.is-pending').forEach(element => { element.classList.remove('is-pending'); revealObserver.unobserve(element); }); });
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$('#navigation a').forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    $$('main section[id]').filter(section => !section.hidden).forEach(section => navObserver.observe(section));
  }
})();
