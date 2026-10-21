'use strict';
(() => {
  const section = document.querySelector('#cuidados');
  if (!section) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const names = { facial: 'Estética facial', corporal: 'Dermatofuncional', posoperatorio: 'Pós-operatório de cirurgia plástica', coluna: 'Coluna', ortopedia: 'Ortopedia' };
  const selected = new Set();
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Map();
  const photoDialog = $('#carePhotoDialog');
  let photoTrigger = null;
  const multiple = document.createElement('option');
  multiple.value = 'Mais de um cuidado'; multiple.textContent = 'Mais de um cuidado';
  if (![...$('#subject').options].some(option => option.value === multiple.value)) $('#subject').append(multiple);

  function animateVisibleCards() {
    const cards = $$('#cuidados .care-card').filter(card => !card.hidden);
    $('#careResultCount').textContent = String(cards.length).padStart(2, '0') + (cards.length === 1 ? ' área para explorar' : ' áreas para explorar');
    for (const animation of running.values()) animation.cancel();
    running.clear();
    if (motion.matches) return;
    cards.forEach((card, index) => {
      if (typeof card.animate !== 'function') return;
      const animation = card.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 380, delay: index * 65, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      running.set(card, animation);
      animation.finished.then(() => { if (running.get(card) === animation) running.delete(card); }).catch(() => {});
    });
  }
  $$('#cuidados [data-filter]').forEach(button => button.addEventListener('click', animateVisibleCards));
  motion.addEventListener('change', () => { if (motion.matches) { for (const animation of running.values()) animation.cancel(); running.clear(); } });

  function renderSelection(announcement = '') {
    $$('#cuidados [data-care-select]').forEach(button => {
      const key = button.dataset.careSelect, active = selected.has(key);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', (active ? 'Remover ' : 'Adicionar ') + names[key] + (active ? ' dos interesses' : ' aos interesses'));
      button.querySelector('.care-select-label').textContent = active ? 'Selecionado' : 'Tenho interesse';
      button.querySelector('.care-select-icon').textContent = active ? '✓' : '+';
      button.closest('.care-card').classList.toggle('is-selected', active);
    });
    $('#careSelection').hidden = selected.size === 0;
    $('#careSelectionTitle').textContent = selected.size === 1 ? 'Seu cuidado de interesse' : 'Seus ' + selected.size + ' cuidados de interesse';
    $('#careSelectionContact').disabled = selected.size === 0;
    const items = [...selected].map(key => {
      const item = document.createElement('li');
      const text = document.createElement('span'); text.textContent = names[key];
      const button = document.createElement('button'); button.type = 'button'; button.className = 'care-remove'; button.textContent = '×';
      button.setAttribute('aria-label', 'Remover ' + names[key] + ' da seleção');
      button.addEventListener('click', () => {
        selected.delete(key); renderSelection(names[key] + ' removido da seleção.');
        const target = $('#careSelectedList .care-remove') || $('#cuidados .care-card:not([hidden]) .care-select');
        target?.focus({ preventScroll: true });
      });
      item.append(text, button); return item;
    });
    $('#careSelectedList').replaceChildren(...items);
    $('#careSelectionStatus').textContent = announcement ? announcement + ' ' + selected.size + (selected.size === 1 ? ' interesse selecionado.' : ' interesses selecionados.') : '';
  }
  $$('#cuidados [data-care-select]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.careSelect;
    if (selected.has(key)) { selected.delete(key); renderSelection(names[key] + ' removido da seleção.'); }
    else { selected.add(key); renderSelection(names[key] + ' adicionado à seleção.'); }
  }));
  $('#clearCareSelection').addEventListener('click', () => {
    selected.clear(); renderSelection('Seleção limpa.');
    $('#cuidados .care-card:not([hidden]) .care-select')?.focus({ preventScroll: true });
  });
  // O manipulador de data-contact em main.js abre o diálogo primeiro.
  $('#careSelectionContact').addEventListener('click', () => {
    if (!selected.size) return;
    const chosen = [...selected].map(key => names[key]);
    $('#subject').value = chosen.length > 1 ? 'Mais de um cuidado' : chosen[0];
    $('#subject').dispatchEvent(new Event('change', { bubbles: true }));
    const joined = chosen.length < 2 ? chosen[0] : chosen.slice(0, -1).join(', ') + ' e ' + chosen.at(-1);
    $('#message').value = 'Olá! Gostaria de conhecer ' + (chosen.length > 1 ? 'os cuidados de ' : 'o cuidado de ') + joined + '. Podem me orientar sobre as possibilidades, a avaliação e os horários disponíveis?';
    $('#message').dispatchEvent(new Event('input', { bubbles: true }));
  });
  $$('#cuidados [data-care-zoom]').forEach(button => button.addEventListener('click', () => {
    const image = button.closest('.care-photo').querySelector('.care-image');
    photoTrigger = button;
    $('#carePhotoFull').src = image.currentSrc || image.src; $('#carePhotoFull').alt = image.alt;
    $('#carePhotoTitle').textContent = names[button.dataset.careZoom];
    photoDialog.showModal(); document.body.classList.add('modal-open');
  }));
  photoDialog.addEventListener('close', () => {
    document.body.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
    photoTrigger?.focus({ preventScroll: true });
  });
  // Continua aceitando fotos reais individuais por meio do config.js.
  const photos = window.CLINIC_CONFIG?.servicePhotos || {};
  for (const key of Object.keys(names)) {
    const value = photos[key]; if (typeof value !== 'string' || !value.trim()) continue;
    try {
      const url = new URL(value, document.baseURI);
      if (url.protocol !== 'https:' && !(url.origin === location.origin && ['http:', 'file:'].includes(url.protocol))) continue;
      const image = $('#cuidados [data-category="' + key + '"] .care-image');
      const probe = new Image();
      probe.addEventListener('load', () => { image.src = url.href; image.alt = 'Imagem relacionada à área de ' + names[key]; });
      probe.src = url.href;
    } catch (_) { /* Mantém a imagem ilustrativa quando o endereço é inválido. */ }
  }
  renderSelection();
})();
