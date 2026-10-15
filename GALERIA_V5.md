# Galeria da clínica — versão 5

## Fotos utilizadas

Os três arquivos enviados pelo cliente foram copiados sem alterar os pixels:

| Arquivo recebido | Arquivo no projeto | Dimensões |
| --- | --- | --- |
| unnamed.webp | assets/gallery/ambiente-clinica.webp | 382 × 510 |
| unnamed (1).webp | assets/gallery/cuidados-detalhe.webp | 680 × 453 |
| unnamed (2).webp | assets/gallery/daniele-registro.webp | 433 × 510 |

A composição e o enquadramento das miniaturas são feitos por CSS. O visor ampliado mantém a foto inteira. O registro da Daniele conserva os textos e elementos presentes no arquivo recebido; não foi reconstruído ou retocado por IA.

A galeria combina ambiente, produtos em destaque e uma publicação da Daniele. Os títulos distinguem esses tipos de registro.

Os arquivos HTML enviados são páginas salvas do Google. Contêm referências remotas a mídia, mas não incluem os arquivos de vídeo. As referências verificadas não forneceram conteúdo de vídeo reproduzível; nenhum vídeo foi apresentado como disponível no site.

## Funcionalidades

- Composição com uma foto principal e duas menores.
- Ampliação em diálogo nativo, miniaturas, anterior/próximo e navegação circular.
- Setas do teclado, Escape e gesto de deslizar no celular.
- Foco devolvido ao botão que abriu a galeria.
- Fotos carregadas sob demanda e sem ampliação excessiva no visor.
- Botão de contato usando o WhatsApp já configurado.
- Respeito à preferência por movimento reduzido.
- Suporte a vídeos locais com controles, reprodução voluntária e pausa ao trocar de registro ou fechar o visor.

## Adicionar fotos ou vídeos

Edite `js/gallery-data-v5.js`, que define as mídias fornecidas nesta rodada. O módulo também aceita mídias adicionais definidas em `gallery` no `js/config.js` e evita duplicar caminhos.

Foto:

```js
{
  type: 'image',
  src: 'assets/gallery/foto-real.webp',
  alt: 'Descrição objetiva da fotografia',
  caption: 'Título da foto',
  description: 'Legenda curta',
  category: 'O espaço',
  width: 680,
  height: 510
}
```

Vídeo — copie o MP4 real e a capa para os respectivos caminhos antes de adicionar:

```js
{
  type: 'video',
  src: 'assets/videos/tour.mp4',
  poster: 'assets/gallery/capa-tour.webp',
  alt: 'Passeio pela clínica',
  caption: 'Conheça a clínica',
  category: 'Vídeo'
}
```

Para uma nova atualização pronta pelo Git Bash, envie o arquivo MP4 ou as fotos originais no chat.

## Verificação

Verificados sintaxe, estrutura, preservação dos bytes das fotos, navegação por miniaturas, teclado e toque, foco, contato e suporte ao player em DOM simulado. A revisão visual e a reprodução de um vídeo real devem ser conferidas no navegador local após receber o MP4.

O instalador preserva os dados de contato, avaliações, fotos anteriores e configurações. Cria backup dos arquivos que atualiza e não executa commit, push ou deploy.
