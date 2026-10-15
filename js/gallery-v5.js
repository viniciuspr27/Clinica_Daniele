'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const data = window.CLINIC_GALLERY_V5;
  if (!data || !Array.isArray(data.items)) return;
  const section = $('#galeria'), grid = $('#galleryGrid'), dialog = $('#galleryDialog');
  const image = $('#galleryImage'), video = $('#galleryVideo');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const url = new URL(value, document.baseURI); if (url.protocol === 'https:' || (url.origin === location.origin && ['http:', 'file:'].includes(url.protocol))) return url.href; } catch (_) {}
    return '';
  }
  const items = data.items.filter(item => item && item.alt && safeUrl(item.src)).map(item => ({ ...item, type: item.type === 'video' ? 'video' : 'image', src: safeUrl(item.src), poster: safeUrl(item.poster), caption: String(item.caption || item.alt), category: String(item.category || (item.type === 'video' ? 'Vídeo' : 'Registro')) }));
  if (!items.length) return;
  let index = 0, trigger = null, touchStart = null;
  function resetVideo() {
    if (video.hasAttribute('src')) { video.pause(); video.removeAttribute('src'); video.load(); }
    video.hidden = true;
  }
  function showItem(nextIndex) {
    resetVideo(); index = (nextIndex + items.length) % items.length;
    const item = items[index];
    $('#galleryDialogTitle').textContent = item.caption;
    $('#galleryDialogCategory').textContent = item.category;
    $('#galleryCaption').textContent = (index + 1) + ' de ' + items.length + (item.description ? ' · ' + item.description : '');
    $('#galleryLoadStatus').textContent = '';
    image.hidden = item.type === 'video';
    if (item.type === 'video') {
      image.removeAttribute('src'); image.alt = '';
      video.hidden = false; video.preload = 'metadata';
      if (item.poster) video.poster = item.poster; else video.removeAttribute('poster');
      video.setAttribute('aria-label', item.alt); video.src = item.src; video.load();
    } else {
      image.alt = item.alt; image.src = item.src;
    }
    $('#previousPhoto').hidden = $('#nextPhoto').hidden = items.length < 2;
    $$('#galleryThumbnails button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  function openGallery(nextIndex, button) {
    trigger = button; showItem(nextIndex);
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  items.forEach((item, i) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'gallery-tile'; button.dataset.kind = item.kind || item.type;
    button.style.setProperty('--gallery-focus', item.focus || '50% 50%');
    button.setAttribute('aria-label', (item.type === 'video' ? 'Abrir vídeo: ' : 'Ampliar foto: ') + item.caption);
    const src = item.type === 'video' ? item.poster : item.src;
    if (src) {
      const img = new Image(); img.src = src; img.alt = item.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = item.width || 680; img.height = item.height || 510; button.append(img);
    } else {
      const cover = document.createElement('span'); cover.className = 'gallery-video-cover'; cover.textContent = 'Vídeo'; cover.setAttribute('aria-hidden', 'true'); button.append(cover);
    }
    const category = document.createElement('span'); category.className = 'gallery-category'; category.textContent = item.category;
    const icon = document.createElement('span'); icon.className = 'gallery-open-icon'; icon.textContent = '↗'; icon.setAttribute('aria-hidden', 'true');
    const caption = document.createElement('span'); caption.className = 'gallery-tile-caption';
    const title = document.createElement('strong'); title.textContent = item.caption; caption.append(title);
    if (item.description) { const description = document.createElement('small'); description.textContent = item.description; caption.append(description); }
    button.append(category, icon, caption);
    if (item.type === 'video') { const play = document.createElement('span'); play.className = 'gallery-play'; play.textContent = '▶'; play.setAttribute('aria-hidden', 'true'); button.append(play); }
    button.addEventListener('click', () => openGallery(i, button)); grid.append(button);
    const thumb = document.createElement('button'); thumb.type = 'button'; thumb.className = 'gallery-thumb'; thumb.setAttribute('aria-label', (item.type === 'video' ? 'Ver vídeo ' : 'Ver foto ') + (i + 1) + ': ' + item.caption); thumb.setAttribute('aria-pressed', String(i === 0));
    if (src) { const preview = new Image(); preview.src = src; preview.alt = ''; preview.loading = 'lazy'; preview.width = preview.height = 57; thumb.append(preview); }
    if (item.type === 'video') { const play = document.createElement('span'); play.textContent = '▶'; play.setAttribute('aria-hidden', 'true'); thumb.append(play); }
    thumb.addEventListener('click', () => showItem(i)); $('#galleryThumbnails').append(thumb);
  });
  const photoCount = items.filter(item => item.type === 'image').length, videoCount = items.length - photoCount;
  $('#galleryMediaCount').textContent = videoCount ? photoCount + (photoCount === 1 ? ' foto' : ' fotos') + ' e ' + videoCount + (videoCount === 1 ? ' vídeo' : ' vídeos') : String(items.length).padStart(2, '0') + ' registros para explorar';
  section.hidden = false;
  $('#previousPhoto').addEventListener('click', () => showItem(index - 1));
  $('#nextPhoto').addEventListener('click', () => showItem(index + 1));
  dialog.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    // Preserva as teclas nativas do player de vídeo.
    event.stopImmediatePropagation();
    if (event.target.closest('video')) return;
    event.preventDefault(); showItem(index + (event.key === 'ArrowRight' ? 1 : -1));
  }, true);
  $('#galleryStage').addEventListener('touchstart', event => { touchStart = event.target.closest('video') || event.touches.length !== 1 ? null : event.touches[0].clientX; }, { passive: true });
  $('#galleryStage').addEventListener('touchend', event => {
    if (touchStart !== null && event.changedTouches.length) { const distance = event.changedTouches[0].clientX - touchStart; if (Math.abs(distance) > 55) showItem(index + (distance < 0 ? 1 : -1)); }
    touchStart = null;
  }, { passive: true });
  dialog.addEventListener('close', () => {
    resetVideo(); document.body.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  image.addEventListener('error', () => { $('#galleryLoadStatus').textContent = 'Não foi possível carregar esta foto. Tente outro registro.'; });
  image.addEventListener('load', () => { $('#galleryLoadStatus').textContent = ''; });
  video.addEventListener('error', () => { $('#galleryLoadStatus').textContent = 'Não foi possível reproduzir o vídeo. Confira o arquivo ou escolha outro registro.'; });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!motion.matches) $$('#galleryGrid .gallery-tile').forEach((tile, i) => { if (typeof tile.animate === 'function') tile.animate([{ opacity: 0, transform: 'translateY(15px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, delay: i * 65, easing: 'ease-out', fill: 'backwards' }); });
      observer.disconnect();
    }, { threshold: .1 }); observer.observe(section);
  }
})();
