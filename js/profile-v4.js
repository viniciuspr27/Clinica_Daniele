'use strict';
(() => {
  const profile = window.CLINIC_PROFILE_V4;
  if (!profile) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const linkTargets = {
    googleReviewsLink: profile.profileUrl, googleWriteReview: profile.writeReviewUrl,
    googleReviewInvite: profile.writeReviewUrl, locationProfileLink: profile.profileUrl,
    mapFallbackLink: profile.profileUrl, driveRoute: profile.routes.driving,
    transitRoute: profile.routes.transit, walkRoute: profile.routes.walking
  };
  for (const [id, href] of Object.entries(linkTargets)) $('#' + id).href = href;
  $('#clinicPhoneLink').href = 'tel:+' + profile.phone;
  $('#clinicPhoneLink').textContent = profile.phoneDisplay;
  $('#locationAddress').textContent = profile.address;
  $('#addressCopyFallback').value = profile.address;
  $('#copyClinicAddress').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(profile.address);
      $('#copyAddressStatus').textContent = 'Endereço copiado.';
      $('#addressCopyFallback').hidden = true;
    } catch (_) {
      const input = $('#addressCopyFallback'); input.hidden = false; input.focus(); input.select();
      $('#copyAddressStatus').textContent = 'Copie o endereço selecionado com Ctrl+C ou pelo menu do celular.';
    }
  });
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekday = days.indexOf(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short' }).format(new Date()));
  $('#todayHours').textContent = weekday >= 1 && weekday <= 5 ? 'Hoje · 08h–20h' : 'Hoje · fechado';
  const today = $('[data-weekday="' + weekday + '"]');
  if (today) {
    today.classList.add('is-today');
    const label = document.createElement('span'); label.className = 'today-label'; label.textContent = 'Hoje'; today.querySelector('th').append(label);
  }
  $('#loadClinicMap').addEventListener('click', () => {
    if ($('#clinicMapFrame')) return;
    const iframe = document.createElement('iframe'); iframe.id = 'clinicMapFrame'; iframe.title = 'Mapa da Clínica de Especialidade Daniele Lucena, Avenida do Anastácio, 1499a'; iframe.src = profile.mapEmbedUrl; iframe.loading = 'lazy'; iframe.referrerPolicy = 'no-referrer-when-downgrade'; iframe.allowFullscreen = true;
    $('#clinicMapContainer').append(iframe); $('#mapPlaceholder').hidden = true;
  });
  const track = $('#reviewsTrack');
  const cards = $$('#reviewsTrack .review-card');
  cards.forEach((card, index) => {
    const review = profile.reviews[index]; if (!review) return;
    card.dataset.reviewTopics = review.topics.join(' ');
    const top = document.createElement('div'); top.className = 'review-card-top';
    const stars = document.createElement('span'); stars.className = 'review-card-stars'; stars.textContent = '★'.repeat(review.rating); stars.setAttribute('role', 'img'); stars.setAttribute('aria-label', review.rating + ' de 5 estrelas');
    const source = document.createElement('a'); source.className = 'review-source'; source.textContent = 'Google ↗'; source.href = profile.profileUrl; source.target = '_blank'; source.rel = 'noopener noreferrer'; source.setAttribute('aria-label', 'Abrir perfil da clínica no Google Maps'); top.append(stars, source); card.prepend(top);
    const quote = card.querySelector('blockquote'); quote.id = 'clinicReviewQuote' + index;
    const cite = card.querySelector('cite');
    if (review.quote.length > 170) {
      card.classList.add('has-expand');
      const button = document.createElement('button'); button.type = 'button'; button.className = 'review-expand'; button.textContent = 'Ler relato completo'; button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', quote.id);
      button.addEventListener('click', () => {
        const expanded = !card.classList.contains('is-expanded'); card.classList.toggle('is-expanded', expanded); button.setAttribute('aria-expanded', String(expanded)); button.textContent = expanded ? 'Recolher relato' : 'Ler relato completo';
      });
      card.insertBefore(button, cite);
    }
    const author = document.createElement('div'); author.className = 'review-author';
    const initials = document.createElement('span'); initials.className = 'review-avatar'; initials.setAttribute('aria-hidden', 'true');
    initials.textContent = review.author.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toLocaleUpperCase('pt-BR');
    if (review.excerpt) { const note = document.createElement('span'); note.className = 'review-excerpt-label'; note.textContent = 'Trecho da avaliação'; cite.append(note); }
    author.append(initials, cite); card.append(author);
  });
  function visibleCards() { return cards.filter(card => !card.hidden); }
  function syncReviews() {
    const visible = visibleCards();
    $('#previousReview').disabled = !visible.length || track.scrollLeft <= 2;
    $('#nextReview').disabled = !visible.length || track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    $('#reviewsVisibleCount').textContent = visible.length + (visible.length === 1 ? ' depoimento selecionado' : ' depoimentos selecionados');
    $('#reviewStatus').textContent = visible.length + (visible.length === 1 ? ' depoimento neste filtro.' : ' depoimentos neste filtro.');
  }
  function scrollReviews(direction) {
    const first = visibleCards()[0]; if (!first) return;
    track.scrollBy({ left: direction * (first.getBoundingClientRect().width + 18), behavior: motion.matches ? 'auto' : 'smooth' });
  }
  // Usa os cartões visíveis, inclusive após a filtragem por tema.
  $('#previousReview').addEventListener('click', event => { event.stopImmediatePropagation(); scrollReviews(-1); }, true);
  $('#nextReview').addEventListener('click', event => { event.stopImmediatePropagation(); scrollReviews(1); }, true);
  $$('[data-review-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-review-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.reviewFilter !== 'all' && !card.dataset.reviewTopics.split(' ').includes(button.dataset.reviewFilter); });
    track.scrollLeft = 0; syncReviews();
  }));
  track.addEventListener('scroll', syncReviews, { passive: true }); window.addEventListener('resize', syncReviews);
  track.addEventListener('keydown', event => { if (event.target === track && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); scrollReviews(event.key === 'ArrowRight' ? 1 : -1); } });
  syncReviews();
})();
