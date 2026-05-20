# Manipulador de Texto — O Boticário

Desafio técnico de JavaScript que implementa um interpretador de comandos para manipulação de texto, inspirado em comandos de modo normal do Vim.

## Sobre o desafio

A aplicação recebe um texto e uma sequência de comandos e aplica cada comando sobre o texto, mantendo uma posição de cursor. O resultado é exibido junto com a posição final do cursor.

### Comandos suportados

| Comando | Descrição |
|---------|-----------|
| `h` | Move o cursor **uma posição** para a esquerda |
| `l` | Move o cursor **uma posição** para a direita |
| `r<char>` | **Substitui** o caractere na posição atual por `<char>` |
| `N<cmd>` | **Repete** o comando seguinte `N` vezes (ex.: `6l`, `21rA`) |

O cursor começa na posição `0` (primeiro caractere) e é sempre mantido dentro dos limites do texto.

### Exemplos

| Entrada | Comandos | Saída |
|---------|----------|-------|
| `Hello Grupo Boticario` | `rh6lrg6lrb2h` | `helloGgrupoBoticario` — substitui H→h, avança 6, G→g, avança 6, B→b, recua 2 |
| `Hello Grupo Boticario` | `9999lrO` | `Hello Grupo BoticariO` — vai ao final e substitui o último char |
| `Hello Grupo Boticario` | `21rA` | `AAAAAAAAAAAAAAAAAAAAA` — substitui todos os 21 caracteres por A |

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, variáveis, responsividade)
- JavaScript puro (Vanilla JS, sem dependências)

## Estrutura

```
manipulacao-texto-js/
├── index.html   # Marcação e formulário
├── styles.css   # Estilos e layout responsivo
└── script.js    # Lógica de interpretação dos comandos
```

## Como rodar

Abra o `index.html` diretamente no navegador — nenhuma dependência ou build necessário.

```bash
# Ou com qualquer servidor local, ex.:
npx serve .
```
