// Preencha somente com dados oficiais confirmados pela clínica.
window.CLINIC_CONFIG = {
  // País + DDD + número, somente dígitos. O número não foi fornecido.
  whatsapp: '',
  address: '',
  hours: '',
  mapsUrl: '',
  instagramUrl: '',
  preview: true, // false somente após validar textos, serviços e imagens
  ownerPhoto: '', // Exemplo de caminho: assets/images/daniele.jpg
  ownerBio: '',
  servicePhotos: { facial: '', corporal: '', posoperatorio: '', coluna: '', ortopedia: '' },
  // Somente fotos reais autorizadas. Exemplo de estrutura:
  // { src: 'assets/images/recepcao.jpg', alt: 'Recepção da clínica', caption: 'Recepção' }
  gallery: [],
  // Somente avaliações reais autorizadas. Exemplo de estrutura:
  // { quote: 'Texto real', author: 'Nome autorizado', sourceUrl: 'https://...' }
  reviews: []
};
