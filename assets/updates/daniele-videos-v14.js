(() => {
  'use strict';
  function mount() {
    const grid = document.querySelector('#galleryGrid');
    if (!grid || document.querySelector('#clinicVideosV14')) return;
    document.querySelector('#clinicVideoTour')?.remove();
    const group = document.createElement('div');
    group.id = 'clinicVideosV14';
    group.className = 'clinic-video-pair';
    grid.insertAdjacentElement('afterend', group);
    const clips = [
      { key: 'entrada', title: 'Da entrada<br><em>ao acolhimento.</em>', label: 'Da entrada ao acolhimento', eyebrow: '01 / Sua chegada', duration: 38, file: 'entrada-clinica-v14', description: 'Reconheça a fachada e acompanhe o caminho de entrada. Um primeiro olhar para o lugar onde vamos receber você.' },
      { key: 'interior', title: 'Por dentro<br><em>da clínica.</em>', label: 'Por dentro da clínica', eyebrow: '02 / Nosso espaço', duration: 44, file: 'tour-clinica-v13', description: 'Conheça os ambientes e os detalhes do nosso espaço. Um passeio para se sentir mais perto, antes mesmo da primeira visita.' }
    ];
    clips.forEach(clip => {
    const card = document.createElement('article');
    card.id = 'clinic-video-' + clip.key;
    card.className = 'clinic-video-tour';
    card.setAttribute('aria-labelledby', 'clinic-video-title-' + clip.key);
    card.innerHTML = `
      <div class="clinic-video-media">
        <video class="clinic-video-player" playsinline preload="none" poster="assets/videos/${clip.file}.jpg" aria-label="${clip.label}"></video>
        <button class="clinic-video-cover" type="button" aria-label="Assistir: ${clip.label}">
          <span class="clinic-video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></svg></span>
          <span>Assistir<small>${clip.duration} segundos · com áudio</small></span>
        </button>
      </div>
      <div class="clinic-video-copy">
        <p class="eyebrow">${clip.eyebrow}</p>
        <h3 id="clinic-video-title-${clip.key}">${clip.title}</h3>
        <p>${clip.description}</p>
        <button class="clinic-video-watch" type="button" aria-label="Reproduzir ou pausar: ${clip.label}">Assistir ao vídeo <span aria-hidden="true">↗</span></button>
        <p class="clinic-video-status" role="status"></p>
      </div>`;
    group.append(card);
    const player = card.querySelector('video');
    const cover = card.querySelector('.clinic-video-cover');
    const watch = card.querySelector('.clinic-video-watch');
    const status = card.querySelector('.clinic-video-status');
    async function play() {
      cover.hidden = true;
      player.controls = true;
      if (!player.hasAttribute('src')) {
        player.src = 'assets/videos/' + clip.file + '.mp4';
        player.load();
      }
      player.focus({ preventScroll: true });
      try { await player.play(); status.textContent = ''; }
      catch (_) { status.textContent = 'Use o botão de reprodução no vídeo para assistir.'; }
    }
    cover.addEventListener('click', play);
    watch.addEventListener('click', () => {
      if (!player.paused) { player.pause(); return; }
      play();
    });
    player.addEventListener('play', () => {
      document.querySelectorAll('video').forEach(other => { if (other !== player) other.pause(); });
      watch.innerHTML = 'Pausar vídeo <span aria-hidden="true">Ⅱ</span>';
    });
    player.addEventListener('pause', () => { watch.innerHTML = 'Continuar vídeo <span aria-hidden="true">↗</span>'; });
    player.addEventListener('ended', () => {
      cover.hidden = false;
      player.controls = false;
      watch.innerHTML = 'Assistir novamente <span aria-hidden="true">↻</span>';
    });
    player.addEventListener('error', () => {
      status.textContent = 'Não foi possível carregar o vídeo. Atualize a página e tente novamente.';
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) player.pause(); });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting && !player.paused) player.pause();
      }, { threshold: 0 });
      observer.observe(player);
    }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
