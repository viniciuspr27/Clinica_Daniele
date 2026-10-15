# Clínica Daniele Lucena — versão boutique

Landing page em HTML, CSS e JavaScript puro. Não precisa de npm ou compilação.

## Ver no VS Code

Abra `index.html` com a extensão Live Server. Alternativa no Git Bash, com Python instalado:

```bash
py -m http.server 5500 --bind 127.0.0.1
```

Acesse http://localhost:5500. No Linux ou macOS, use `python3` no lugar de `py`.

## O que mudou

- Identidade em creme, oliva e dourado; títulos serifados, abertura compacta e retrato da Daniele.
- Filtros por área e detalhes de cada cuidado em diálogo acessível.
- Guia de interesse em dois passos e mensagem editável com cópia e fallback manual.
- Contato com WhatsApp quando o número oficial for configurado.
- Menu móvel com fechamento por âncora, clique fora e Escape; seção atual destacada.
- Animações discretas e respeito à preferência por movimento reduzido.
- Layouts para celular pequeno, celular, tablet e desktop; barra móvel com área segura.
- Galeria ampliável e avaliações com controles, exibidas somente quando receberem conteúdo real.

## Configurar dados oficiais

Edite `js/config.js`. Todas as opções são locais. Nunca coloque senhas ou dados privados nesse arquivo.

- `whatsapp`: país 55 + DDD + número, somente dígitos. Sem esse dado, o site prepara e copia a mensagem, sem enviar contato.
- `address`, `hours`, `mapsUrl`, `instagramUrl`: dados confirmados. Campos vazios não aparecem.
- `ownerPhoto`: caminho para foto individual autorizada. Enquanto vazio, usa o recorte original de referência.
- `ownerBio`: apresentação profissional validada. Enquanto vazio, mantém o texto de apresentação atual.
- `servicePhotos`: caminhos para fotos individuais autorizadas, por área.
- `gallery`: lista com `{ src, alt, caption }`. Lista vazia mantém a galeria oculta.
- `reviews`: lista com `{ quote, author, sourceUrl }`. Não inserir depoimentos fictícios.
- `preview`: mantenha `true` até validar textos, serviços e imagens.

As imagens originais são referências de composição reaproveitadas por enquadramento CSS. Não foram criadas fotos da clínica nem adicionadas credenciais, endereço, preços ou avaliações não fornecidos.

## Conferência manual

No celular e desktop, confira filtros, abertura e fechamento dos diálogos (incluindo Escape), guia em dois passos, edição/cópia da mensagem e menu móvel. Com dados oficiais preenchidos, confira também o destino do WhatsApp, localização, fotos e avaliações.

A implementação foi verificada por sintaxe e testes em DOM simulado; a validação visual desta adaptação no navegador deve ser feita localmente.

## Referência Lovable

Referência visual separada, não publicada: https://lovable.dev/projects/e06f1f2e-82e5-4201-bb9a-9d8cd6fa856f

Foram adaptadas a composição compacta, hierarquia editorial, paleta e microinterações ao projeto original. A implementação local mantém a foto e os arquivos do repositório existente e não depende do Lovable para funcionar.

## Publicação

Nenhum comando deste pacote faz commit, push ou deploy. Revise localmente antes de qualquer publicação. Um push futuro pode acionar hospedagens já conectadas ao GitHub.
