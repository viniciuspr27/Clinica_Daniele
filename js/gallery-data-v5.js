'use strict';
// Fotos fornecidas pelo cliente. Os arquivos originais foram preservados.
// Para adicionar vídeo: { type: 'video', src: 'assets/videos/tour.mp4', poster: 'assets/gallery/capa.webp', alt: 'Passeio pela clínica', caption: 'Conheça a clínica', category: 'Vídeo' }
(() => {
  const provided = [
    { type: 'image', src: 'assets/gallery/ambiente-clinica.webp', alt: 'Ambiente da clínica com piso de madeira, espelho, bolas de exercício e equipamento de movimento', caption: 'Um pouco do nosso espaço', description: 'Ambiente da clínica', category: 'O espaço', kind: 'space', focus: '50% 50%', width: 382, height: 510 },
    { type: 'image', src: 'assets/gallery/cuidados-detalhe.webp', alt: 'Registro de produtos de cuidados apresentados nas mãos de uma profissional', caption: 'Cuidados em detalhe', description: 'Registros da rotina de cuidados', category: 'Detalhes', kind: 'detail', focus: '50% 50%', width: 680, height: 453 },
    { type: 'image', src: 'assets/gallery/daniele-registro.webp', alt: 'Daniele Lucena sentada à mesa em uma publicação da clínica', caption: 'Daniele Lucena', description: 'Um olhar próximo sobre quem cuida de você', category: 'Daniele', kind: 'portrait', focus: '50% 23%', width: 433, height: 510 }
  ];
  provided.push({ type: 'video', src: 'assets/videos/espaco-clinica.mp4', poster: 'assets/gallery/video-espaco-capa.webp', alt: 'Vídeo percorrendo a entrada e o interior do espaço da clínica', caption: 'Um passeio pelo espaço', description: 'Aperte play para conhecer de perto', category: 'Vídeo', kind: 'video', focus: '50% 50%', width: 600, height: 998 });
  const config = window.CLINIC_CONFIG || {};
  const extras = Array.isArray(config.gallery) ? config.gallery : [];
  const seen = new Set(provided.map(item => item.src));
  const items = [...provided];
  for (const item of extras) {
    if (!item || !item.src || seen.has(item.src)) continue;
    items.push({ type: 'image', ...item }); seen.add(item.src);
  }
  window.CLINIC_GALLERY_V5 = { items };
  // O novo módulo assume a galeria para também suportar vídeos.
  window.CLINIC_CONFIG = { ...config, gallery: [] };
})();
