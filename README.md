# Automação Web com Cypress

![WEB E2E TESTS](https://github.com/andrade30/pgats-automacao-web-2026/actions/workflows/cypress.yml/badge.svg)

Projeto de automação de testes end-to-end desenvolvido como parte dos estudos de QA e automação web. Os cenários validam funcionalidades do site [Automation Exercise](https://automationexercise.com) e exercícios complementares do site [The Internet](https://the-internet.herokuapp.com).

## Tecnologias

- [Cypress](https://www.cypress.io/) 13
- JavaScript
- Cypress Mochawesome Reporter para geração de relatórios
- BrowserStack para execução remota dos testes
- GitHub Actions para integração contínua

## Cenários cobertos

Os testes incluem, entre outros:

- Cadastro de usuário, incluindo criação e exclusão de conta.
- Login e validação de credenciais incorretas.
- Tentativa de cadastro com e-mail já existente.
- Navegação, pesquisa e detalhes de produtos.
- Assinatura de newsletter e fluxo de checkout.
- Seletores XPath, drag and drop e navegação entre janelas.

## Estrutura do projeto

```text
.
├── .github/workflows/  # Pipeline do GitHub Actions
├── cypress/
│   ├── e2e/            # Cenários de teste end-to-end
│   ├── fixtures/       # Dados de teste (users, products, payment)
│   ├── modules/        # Módulos reutilizáveis por funcionalidade
│   └── support/        # Custom commands e configuração global
├── browserstack.json   # Configuração da execução no BrowserStack
├── cypress.config.js   # Configuração do Cypress e do reporter
└── package.json        # Dependências e scripts npm
```

Para mais detalhes sobre os padrões de organização e implementação, consulte [diretrizes-arquitetura-projeto.md](./diretrizes-arquitetura-projeto.md).

## Pré-requisitos

- Node.js 20 ou superior e npm instalados.
- Acesso à internet para acessar os sites testados.
- Credenciais do BrowserStack para executar testes remotamente.

## Instalação

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
git clone https://github.com/andrade30/pgats-automacao-web-2026.git
cd pgats-automacao-web-2026
npm ci
```

## Credenciais da conta de teste

Alguns cenários (login, cadastro com e-mail existente e compra com usuário logado) usam uma conta já cadastrada no Automation Exercise. Crie o arquivo `cypress.env.json` na raiz do projeto. Ele está no `.gitignore` e não deve ser versionado:

```json
{
  "LOGIN_EMAIL": "seu_email@teste.com",
  "LOGIN_PASSWORD": "sua_senha",
  "LOGIN_NAME": "Nome exibido em Logged in as"
}
```

> Essa conta é fixa e não deve ser excluída por nenhum teste.

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

O Cypress está configurado com o reporter Mochawesome, incluindo gráficos e capturas de tela incorporadas ao relatório.

- **Local:** após `npx cypress run`, abra `cypress/reports/html/index.html`.
- **Pipeline:** na execução do workflow, baixe o artifact `relatorio-cypress`, extraia o ZIP e abra o `index.html`.

## Integração contínua

O workflow `WEB E2E TESTS` (`.github/workflows/cypress.yml`) roda em push e pull request para a `main`, e também manualmente (`workflow_dispatch`):

1. **Cypress (Chrome):** executa os testes e publica o relatório HTML como artifact (`relatorio-cypress`). Em caso de falha, publica também os screenshots.
2. **BrowserStack:** executa após o sucesso do job anterior.

### Secrets necessários

Cadastre em **Settings → Secrets and variables → Actions → Repository secrets**:

| Secret | Uso |
|---|---|
| `LOGIN_EMAIL` | E-mail da conta de teste |
| `LOGIN_PASSWORD` | Senha da conta de teste |
| `LOGIN_NAME` | Nome exibido em "Logged in as" |
| `BROWSERSTACK_USERNAME` | Usuário do BrowserStack |
| `BROWSERSTACK_ACCESS_KEY` | Chave de acesso do BrowserStack |

## Assinatura

**Alessandro Andrade**