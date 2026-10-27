# Automação Web com Cypress

[WEB E2E TESTS](https://github.com/andrade30/pgats-automacao-web-2026/actions/workflows/cypress.yml/badge.svg)

Projeto final da disciplina de Automação de Testes na Camada de Interface (Web) da Pós-Graduação em Automação de Testes de Software (PGATS), desenvolvido com foco em automação web end-to-end. Os cenários validam funcionalidades do site [Automation Exercise](https://automationexercise.com), aplicando boas práticas de organização, reutilização de código e integração contínua.

## Tecnologias

- [Cypress](https://www.cypress.io/) 13
- JavaScript
- [Faker](https://fakerjs.dev/) para geração de dados dinâmicos (spec `automation-exercise-faker`)
- Cypress Mochawesome Reporter para geração de relatórios HTML
- BrowserStack para execução remota dos testes
- GitHub Actions para integração contínua

## Cenários cobertos

- Cadastro de usuário, incluindo criação e exclusão de conta.
- Login com credenciais corretas e incorretas.
- Tentativa de cadastro com e-mail já existente.
- Navegação, pesquisa e detalhes de produtos.
- Assinatura de newsletter.
- Fluxo de compra (carrinho, checkout e pagamento) com usuário recém-cadastrado e com usuário logado.
- Uso de seletores XPath.

## Specs

| Spec | Descrição |
|---|---|
| `automation-exercise-pgats.cy.js` | Cenários principais do projeto, com fixtures e comandos customizados |
| `automation-exercise-modules.cy.js` | Mesmos fluxos organizados em módulos reutilizáveis por funcionalidade |
| `automation-exercise-faker.cy.js` | Cenários com dados dinâmicos gerados pelo Faker |
| `automation-xpath-exercise.cy.js` | Exercícios com seletores XPath |

## Estrutura do projeto

```text
.
├── .github/workflows/   # Pipeline do GitHub Actions
├── cypress/
│   ├── e2e/             # Specs dos cenários de teste
│   ├── fixtures/        # Dados de teste (users, products, payment)
│   ├── modules/         # Módulos reutilizáveis por funcionalidade
│   └── support/         # Comandos customizados e configuração global
├── browserstack.json    # Configuração da execução no BrowserStack
├── cypress.config.js    # Configuração do Cypress e do reporter
└── package.json         # Dependências e scripts npm
```

Para mais detalhes sobre os padrões de organização e implementação, consulte [diretrizes-arquitetura-projeto.md](./diretrizes-arquitetura-projeto.md).

## Pré-requisitos

- Node.js 20 ou superior e npm
- Acesso à internet
- Credenciais do BrowserStack (apenas para execução remota)

## Instalação

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

Modo interativo:

```bash
npx cypress open
```

Modo headless (gera o relatório):

```bash
npx cypress run
```

Para executar um spec específico:

```bash
npx cypress run --spec "cypress/e2e/automation-exercise-pgats.cy.js"
```

O endereço-base configurado é `https://automationexercise.com`.

## Executar no BrowserStack

1. Copie `.env.example` para `.env`.
2. Preencha `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` com as credenciais da sua conta.
3. Execute:

```bash
npm run test:browserstack
```

Não compartilhe nem versione o arquivo `.env` ou credenciais. O arquivo `browserstack.json` define os navegadores e as configurações da execução remota.

## Relatórios

O Cypress usa o reporter Mochawesome, com gráficos e capturas de tela incorporadas ao HTML.

- **Local:** após `npx cypress run`, abra `cypress/reports/html/index.html`.
- **Pipeline:** na execução do workflow, baixe o artifact `relatorio-cypress`, extraia o ZIP e abra o `index.html`.

## Integração contínua

O workflow `WEB E2E TESTS` (`.github/workflows/cypress.yml`) roda em push e pull request para a `main`, e também manualmente (`workflow_dispatch`):

1. **Cypress (Chrome):** executa os testes e publica o relatório HTML como artifact. Em caso de falha, publica também os screenshots.
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

## Autor

**Alessandro Andrade**
