# Clínica Daniele Lucena — Landing page Slim

Código extraído da POC_Daniele_Lucena_Slim.html, com HTML, CSS, JavaScript e imagens separados. Mantém o visual, os textos e os fluxos demonstrativos da POC. Não usa React, não exige npm e não precisa de compilação.

## Abrir no VS Code com Git Bash (Windows)

1. Extraia o ZIP. Você terá a pasta `clinica-daniele-lucena`.
2. Abra essa pasta no Explorador do Windows, clique com o botão direito e escolha **Open Git Bash here** (ou **Mostrar mais opções > Open Git Bash here**).
3. Execute:

```bash
code .
```

Se o comando `code` não for reconhecido, abra o VS Code e use **Arquivo > Abrir Pasta**, selecionando `clinica-daniele-lucena`.

## Visualizar a página

No VS Code, abra Extensões (`Ctrl+Shift+X`) e instale **Live Server**, de **Ritwick Dey**. Clique com o botão direito no `index.html` e escolha **Open with Live Server**. Salve as alterações com `Ctrl+S`; a página será atualizada no navegador.

Alternativa pelo terminal, se o Python estiver instalado:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

No Windows, se `python` não funcionar e o launcher estiver instalado, use `py -m http.server 5500 --bind 127.0.0.1`. Abra http://localhost:5500 e pressione Ctrl+C no terminal para parar.

Também é possível abrir `index.html` diretamente no navegador, mas um servidor local é preferível para a função de copiar mensagem.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Textos, seções, botões e estrutura |
| `css/styles.css` | Cores, fontes, espaçamento e visual no celular |
| `js/main.js` | Menu, seletor de interesses e modal de contato |
| `assets/images/referencia-1.png` | Primeira referência visual, usada no retrato e em um cuidado |
| `assets/images/referencia-2.png` | Segunda referência visual, usada nas outras áreas |
| `assets/favicon.svg` | Ícone da aba do navegador |
| `.vscode/` | Configurações e recomendação do Live Server |

As imagens foram extraídas, sem edição, das imagens embutidas na POC original. O CSS utiliza enquadramentos por `background-position` e `background-size`; substituir essas referências por fotos individuais exige ajustar esses valores. As cores principais ficam em `:root`, no início do CSS. As regras para celular ficam em `@media (max-width:760px)`.

## Estado atual do contato

A POC prepara e copia uma mensagem. Ainda não há número oficial de WhatsApp, envio real, backend ou agendamento. O rodapé informa que serviços e conteúdo precisam de validação da clínica. Nenhum site é publicado ao executar este projeto localmente.
