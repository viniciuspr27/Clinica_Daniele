# Avaliações e localização — versão 4

## Dados usados

Fornecidos pelo cliente e pelas capturas enviadas em 15/10/2026:

- Nome: Clínica de Especialidade Daniele Lucena.
- Endereço: Av. do Anastácio, 1499a - City América, São Paulo - SP, 05119-000.
- Telefone: (11) 99506-4088, usado nos atalhos de telefone e WhatsApp.
- Segunda a sexta: 08h–20h. Sábado e domingo: fechado.
- Nota Google: 5,0, com 43 avaliações, conforme captura. O número não é atualizado automaticamente; a página informa a data e oferece o perfil atual do Google.

Foram selecionados oito comentários enviados pelo cliente. As estrelas individuais desses oito relatos aparecem nas capturas. Os trechos mantêm a redação recebida; quando apenas parte do comentário é exibida, o cartão informa "Trecho da avaliação". Não foram acrescentadas promessas de resultado ou identidades fictícias.

As iniciais nos cartões são recursos de apresentação, não imagens de perfil dos autores.

## Fontes e destinos

O endereço, telefone e horários de segunda a sexta também constam na listagem pública do Waze:
https://www.waze.com/live-map/directions/br/sp/clinica-de-especialidade-daniele-lucena?to=place.ChIJc-JufrH5zpQRPXhoZgG-E5s

O identificador de local encontrado nessa listagem (`ChIJc-JufrH5zpQRPXhoZgG-E5s`) corresponde ao CID `11174484013658699837` presente no link fornecido pelo cliente.

As rotas usam os formatos oficiais de Maps URLs, com destino e identificador de local:
https://developers.google.com/maps/documentation/urls/get-started

O botão para avaliar abre:
https://search.google.com/local/writereview?placeid=ChIJc-JufrH5zpQRPXhoZgG-E5s

O formulário do Google e os destinos externos precisam ser conferidos no navegador do usuário; o ambiente de trabalho não conseguiu abrir diretamente o Google Maps ou o formulário de avaliação. O código apenas oferece o atalho e nunca publica uma avaliação automaticamente.

O mapa embutido é solicitado somente depois que o visitante clica em "Carregar mapa". Os atalhos externos continuam disponíveis independentemente do mapa embutido.

## Arquivos

- `js/config.js`: preservado integralmente.
- `js/clinic-profile-v4.js`: dados de contato, links, horários e comentários desta atualização. É carregado após `config.js` e atualiza somente esses dados, preservando fotos, galeria e preferências visuais.
- `js/profile-v4.js`: filtros e expansão de relatos, copiar endereço, dia da semana e mapa sob demanda.
- `css/profile-v4.css`: apresentação das novas seções e destaque de avaliações na abertura.

Não há API de avaliações ou sincronização automática com o Google. Para atualizar nota, quantidade, endereço, horário ou comentários no futuro, edite `js/clinic-profile-v4.js`.

## Verificação

Sintaxe, estrutura e fluxos verificados em DOM simulado. Foram verificados filtros, relatos, correspondência de dados, URLs de rotas e avaliação, mensagem de WhatsApp, seleção de vários cuidados, cópia do endereço, horário no fuso de São Paulo e carregamento do mapa por clique. A revisão visual e a abertura dos serviços externos devem ser feitas no navegador local.

O instalador cria backup e preserva os arquivos anteriores de fotos, cuidados e configurações. Não executa commit, push ou deploy.
