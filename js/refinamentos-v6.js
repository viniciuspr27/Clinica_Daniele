/* Mantém os comportamentos originais do projeto; complementa o menu de horários. */
(() => {
  const hours = document.querySelector('.header-hours');
  if (!hours) return;
  document.addEventListener('click', event => {
    if (!hours.contains(event.target)) hours.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hours.open) {
      hours.open = false;
      hours.querySelector('summary').focus();
    }
  });
  const day = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short'
  }).format(new Date());
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const row = hours.querySelector(`[data-weekday="${weekdays.indexOf(day)}"]`);
  if (row) {
    row.classList.add('is-today');
    row.setAttribute('aria-current', 'date');
  }
})();
