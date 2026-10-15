// Interações da POC Slim: menu, interesses e mensagem demonstrativa.
const $ = (selector) => document.querySelector(selector);
const modal = $('#contactDialog');
let selected = 'Uma primeira orientação';

function message() {
  $('#message').value = 'Olá! Gostaria de saber mais sobre ' +
    $('#subject').value.toLowerCase() +
    '. Podem me orientar sobre a avaliação e os horários disponíveis?';
  $('#copyStatus').textContent = '';
}

function openContact(subject = 'Uma primeira orientação') {
  $('#subject').value = subject;
  message();
  modal.showModal();
}

// Botões gerais e botões específicos de cada cuidado.
document.querySelectorAll('[data-contact]').forEach((button) => {
  button.addEventListener('click', () => openContact());
});
document.querySelectorAll('[data-interest]').forEach((button) => {
  button.addEventListener('click', () => openContact(button.dataset.interest));
});
$('#subject').addEventListener('change', message);
$('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
      modal.close();
    }
  }
});

// Menu de navegação no celular.
$('.menu').addEventListener('click', () => {
  const isOpen = $('.navlinks').classList.toggle('open');
  $('.menu').setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.navlinks a').forEach((link) => {
  link.addEventListener('click', () => {
    $('.navlinks').classList.remove('open');
    $('.menu').setAttribute('aria-expanded', 'false');
  });
});

// Seletor de interesse: preenche a conversa com o tema escolhido.
document.querySelectorAll('[data-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    selected = button.dataset.choice;
    document.querySelectorAll('[data-choice]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    $('#interestResult').textContent = 'Seu interesse: ' + selected +
      '. Vamos preparar uma mensagem para você tirar suas dúvidas com a clínica. ' +
      'A indicação de qualquer cuidado depende de avaliação.';
    $('.result').classList.add('on');
  });
});
$('#interestContact').addEventListener('click', () => openContact(selected));

// Apenas copia a mensagem. Esta versão não envia dados nem agenda consultas.
$('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#message').value);
    $('#copyStatus').textContent = 'Mensagem copiada! Nenhum contato foi enviado.';
  } catch (error) {
    $('#message').focus();
    $('#message').select();
    $('#copyStatus').textContent =
      'Selecione e copie a mensagem com Ctrl+C ou pelo menu do celular.';
  }
});
