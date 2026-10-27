# Automação Web com Cypress

Projeto de automação de testes end-to-end desenvolvido como parte dos estudos de QA e automação web. Os cenários validam funcionalidades do site [Automation Exercise](https://automationexercise.com) e exercícios complementares do site [The Internet](https://the-internet.herokuapp.com).

## Tecnologias

- [Cypress](https://www.cypress.io/) 13
- JavaScript
- [Faker](https://fakerjs.dev/) para geração de dados de teste
- Cypress Mochawesome Reporter para geração de relatórios
- BrowserStack para execução remota dos testes

## Cenários cobertos

Os testes incluem, entre outros:

- Cadastro de usuário, incluindo criação e exclusão de conta.
- Login, logout e validação de credenciais incorretas.
- Tentativa de cadastro com e-mail já existente.
- Navegação, pesquisa e detalhes de produtos.
- Assinatura de newsletter e fluxo de checkout.
- Seletores XPath, drag and drop e navegação entre janelas.

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/          # Cenários de teste end-to-end
│   ├── fixtures/     # Dados utilizados pelos testes
│   ├── modules/      # Módulos reutilizáveis por funcionalidade
│   └── support/      # Custom commands e helpers
├── browserstack.json # Configuração da execução no BrowserStack
├── cypress.config.js # Configuração do Cypress e do reporter
└── package.json      # Dependências e scripts npm
```

Para mais detalhes sobre os padrões de organização e implementação, consulte [diretrizes-arquitetura-projeto.md](./diretrizes-arquitetura-projeto.md).

## Pré-requisitos

- Node.js e npm instalados.
- Acesso à internet para acessar os sites testados.
- Credenciais do BrowserStack para executar testes remotamente.

## Instalação

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
git clone https://github.com/andrade30/pgats-automacao-web-2026.git
cd pgats-automacao-web-2026
npm install
```

## Executar os testes localmente

Abrir o Cypress em modo interativo:

```bash
npx cypress open
```

Executar os testes em modo headless:

```bash
npx cypress run
```

O endereço-base configurado para o Cypress é `https://automationexercise.com`. Alguns cenários complementares acessam outros sites diretamente.

## Executar no BrowserStack

1. Copie `.env.example` para `.env`.
2. Preencha `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` com as credenciais da sua conta.
3. Execute:

```bash
npm run test:browserstack
```

Não compartilhe nem versione o arquivo `.env` ou credenciais. O arquivo `browserstack.json` define a configuração do navegador e da execução remota.

## Relatórios

O Cypress está configurado com o reporter Mochawesome, incluindo gráficos e capturas de tela incorporadas ao relatório. O diretório de saída configurado é `cypress/reports`.

## Assinatura

**Alessandro Andrade**
