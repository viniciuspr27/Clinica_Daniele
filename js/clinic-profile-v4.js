'use strict';
// Dados de contato e avaliações fornecidos pelo cliente em 15/10/2026.
// Este arquivo atualiza esses campos após config.js e preserva fotos e opções visuais.
(() => {
  const profile = {
  "name": "Clínica de Especialidade Daniele Lucena",
  "address": "Av. do Anastácio, 1499a - City América, São Paulo - SP, 05119-000",
  "phone": "5511995064088",
  "phoneDisplay": "(11) 99506-4088",
  "hours": "Segunda a sexta: 08h às 20h.\nSábado e domingo: fechado.",
  "rating": 5,
  "reviewCount": 43,
  "ratingCapturedOn": "2026-10-15",
  "ratingCapturedLabel": "15/10/2026",
  "placeId": "ChIJc-JufrH5zpQRPXhoZgG-E5s",
  "profileUrl": "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+de+Especialidade+Daniele+Lucena%2C+Av.+do+Anast%C3%A1cio%2C+1499a+-+City+Am%C3%A9rica%2C+S%C3%A3o+Paulo+-+SP%2C+05119-000&query_place_id=ChIJc-JufrH5zpQRPXhoZgG-E5s",
  "writeReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJc-JufrH5zpQRPXhoZgG-E5s",
  "routes": {
    "driving": "https://www.google.com/maps/dir/?api=1&destination=Cl%C3%ADnica+de+Especialidade+Daniele+Lucena%2C+Av.+do+Anast%C3%A1cio%2C+1499a+-+City+Am%C3%A9rica%2C+S%C3%A3o+Paulo+-+SP%2C+05119-000&destination_place_id=ChIJc-JufrH5zpQRPXhoZgG-E5s&travelmode=driving",
    "transit": "https://www.google.com/maps/dir/?api=1&destination=Cl%C3%ADnica+de+Especialidade+Daniele+Lucena%2C+Av.+do+Anast%C3%A1cio%2C+1499a+-+City+Am%C3%A9rica%2C+S%C3%A3o+Paulo+-+SP%2C+05119-000&destination_place_id=ChIJc-JufrH5zpQRPXhoZgG-E5s&travelmode=transit",
    "walking": "https://www.google.com/maps/dir/?api=1&destination=Cl%C3%ADnica+de+Especialidade+Daniele+Lucena%2C+Av.+do+Anast%C3%A1cio%2C+1499a+-+City+Am%C3%A9rica%2C+S%C3%A3o+Paulo+-+SP%2C+05119-000&destination_place_id=ChIJc-JufrH5zpQRPXhoZgG-E5s&travelmode=walking"
  },
  "mapEmbedUrl": "https://maps.google.com/maps?q=Cl%C3%ADnica+de+Especialidade+Daniele+Lucena%2C+Av.+do+Anast%C3%A1cio%2C+1499a+-+City+Am%C3%A9rica%2C+S%C3%A3o+Paulo+-+SP%2C+05119-000&z=16&output=embed",
  "reviews": [
    {
      "author": "Angélica Ferreira",
      "quote": "Lugar excelente, atendimento super profissional e de qualidade, lugar limpo, acolhedor e moderno.",
      "rating": 5,
      "topics": [
        "atendimento",
        "ambiente"
      ],
      "excerpt": true
    },
    {
      "author": "Fernanda Castro",
      "quote": "Um ambiente agradável e com profissionais altamente capacitadas, tratamento humanizado focado no bem estar do paciente. Super recomendo!!",
      "rating": 5,
      "topics": [
        "acolhimento",
        "atendimento",
        "ambiente"
      ],
      "excerpt": false
    },
    {
      "author": "Renata F",
      "quote": "Ambiente super limpo, aconchegante e agradável! Profissionais sérios e competentes. A proprietária é fisioterapeuta e sou paciente há muitos anos. Recomendo demais!",
      "rating": 5,
      "topics": [
        "ambiente",
        "atendimento"
      ],
      "excerpt": false
    },
    {
      "author": "Patricia Cascaes Manoel",
      "quote": "Excelente profissional. Atendimento global e humanizado. Profissional altamente capacitada e recomendada na região. Recomendo fortemente.",
      "rating": 5,
      "topics": [
        "acolhimento",
        "atendimento"
      ],
      "excerpt": false
    },
    {
      "author": "Lucimar Serafim",
      "quote": "Excelentes profissionais, sou cliente a muitos anos e super satisfeita com o trabalhos!",
      "rating": 5,
      "topics": [
        "atendimento"
      ],
      "excerpt": false
    },
    {
      "author": "Regina Orlandino",
      "quote": "Super recomendo, excelentes profissionais que com muita experiência e dedicação nos proporcionam o que tem de melhor em seus atendimentos.",
      "rating": 5,
      "topics": [
        "atendimento"
      ],
      "excerpt": true
    },
    {
      "author": "Letícia Di Pietro",
      "quote": "Passei por uma cirurgia no maxilar e tive todo o apoio da Fisioterapeuta Daniele no meu pós operatório. Ela me acompanhou do centro cirúrgico até os sessões semanais com ela. Tudo extremamente perfeito!",
      "rating": 5,
      "topics": [
        "acolhimento",
        "atendimento"
      ],
      "excerpt": false
    },
    {
      "author": "Valdirene Luiza Araujo",
      "quote": "A clínica é acolhedora ,e a fisioterapeuta Vivian Garcia é maravilhosa recomendo muito a quem venha precisar",
      "rating": 5,
      "topics": [
        "acolhimento",
        "atendimento"
      ],
      "excerpt": true
    }
  ]
};
  window.CLINIC_PROFILE_V4 = profile;
  window.CLINIC_CONFIG = {
    ...(window.CLINIC_CONFIG || {}),
    whatsapp: profile.phone,
    address: profile.address,
    hours: profile.hours,
    mapsUrl: profile.routes.driving,
    reviews: profile.reviews
  };
})();
