# Detalhes do projeto

## O desafio

Microsite responsivo para mostrar a previsão do tempo nas localidades informadas na caixa de texto branca (na imagem de [exemplo](./docs/exemplo.jpg) é o local aonde aparece "Rio de Janeiro, Rio de Janeiro"). Essa caixa de texto deve ser um `input`, aonde o usuário pode trocar a localidade. Com a mudança da localidade, devem ser carregadas as informações de previsão do tempo referentes à nova localidade.

Logo que a página seja aberta deve ser coletada as coordenadas geográficas do usuário pela API do navegador para então se descobrir o nome da cidade via _reverse geocode_.

Como fundo de tela deve ser usado a imagem de destaque do Bing. Devem ser mostradas as previsões para: hoje, amanhã e depois de amanhã.

Note que existe um degradê sobreposto na imagem original, na verdade essa cor reflete a temperatura atual do lugar buscado para as três datas. Para temperaturas abaixo de 15ºC deve ser usado tons de azul, para temperaturas acima de 35ºC deve ser usado tons de vermelho e use tons de amarelo para as demais temperaturas. Quando não houver nenhuma localidade escolhida deve ser usado tons de cinza como base para o degradê. Se o usuário clicar em qualquer temperatura, as temperaturas devem ser alteradas de Celsius para Fahrenheit ou de Fahrenheit para Celsius.

A URL da imagem de fundo deve ser extraida da [API do Bing](https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR).

Para consultar a previsão do tempo, utilize a do [OpenWeather](http://api.openweathermap.org/data/2.5/weather?q={{location_name}}&APPID=772920597e4ec8f00de8d376dfb3f094) informando o nome da localidade no lugar de `{{location_name}}` usando a app id `772920597e4ec8f00de8d376dfb3f094`. Caso necessário, crie uma nova conta.

Para converter latitude e longitude em uma localidade utilize o [OpenCage](https://api.opencagedata.com/geocode/v1/json?q={{latitude}},{{longitude}}&key=c63386b4f77e46de817bdf94f552cddf&language=en) usando a API key `c63386b4f77e46de817bdf94f552cddf`. Caso necessário, crie uma nova conta.

Os ícones podem ser encontrados em http://www.alessioatzeni.com/meteocons/.

O layout deve ser seguido, mas você pode sugerir melhorias. Descreva essas melhorias no [MELHORIAS.md](./MELHORIAS.md) e diga o por que delas.

## Requisitos

- Faça em React e Nextjs
- Para a folha de estilo, você pode usar o que preferir (CSS Modules, CSS-in-JS)
- Preferencialmente use Webpack. Se preferir, você pode usar [create-react-app](https://github.com/facebook/create-react-app) ou similares.
- É interessante que a aplicação esteja pronta para produção. Criar no Docker um `stage` para produção e um para desenvolvimento da pontos extras.
- O código precisa rodar dentro de um container Docker.
- Para executar seu código, deve ser preciso apenas rodar os seguintes comandos:
  - docker compose up
  - comando para instalar dependências
  - comando para executar a aplicação
- Criar testes unitários, de integração e end-to-end.

## Critério de qualidade

- **É executado conforme esperado**: O passo-a-passo pedido para rodar a aplicação funciona?
- **Organização do código**: Separação de módulos e organização do projeto (back-end e front-end).
- **Clareza**: O README explica de forma resumida qual é o problema e como pode rodar a aplicação?
- **Legibilidade do código** É fácil ler e entender o código? Existem muitas variáveis/funções com nome enigmático?
- **Segurança**: Existe alguma vulnerabilidade clara?
- **Cobertura de testes** Qualidade e cobertura dos testes (não espero cobertura completa).
- **UX**: A interface é de fácil uso e auto-explicativa? As rotas/métodos da API são intuitivos?
