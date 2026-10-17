# Contexto e Padrões Arquiteturais — Projeto Cypress

## 1. Objetivo

Este documento define as diretrizes arquiteturais que devem ser seguidas em todas as implementações, refatorações e manutenções dos testes automatizados do projeto.

O objetivo é manter uma estrutura modular, reutilizável, legível e de fácil manutenção, evitando complexidade desnecessária.

**Stack principal:** Cypress + JavaScript.

## 2. Padrão de modularização obrigatório

Adotar a abordagem **Custom Commands + Seletores Centralizados**, organizando os arquivos por funcionalidade e responsabilidade.

As seguintes diretrizes devem ser respeitadas:

- Utilizar Custom Commands reutilizáveis para encapsular ações e fluxos recorrentes.
- Centralizar os seletores em arquivos separados por funcionalidade.
- Organizar os comandos em módulos específicos, como autenticação, cadastro, produtos, carrinho e checkout.
- Manter os testes declarativos, claros e focados nos cenários e nas validações dos resultados.
- Separar dados de teste da lógica de automação, utilizando fixtures ou estruturas adequadas.
- Evitar duplicação de código e seletores.
- Criar abstrações somente quando agregarem benefícios reais à manutenção.

## 3. Preferência por funções e CommonJS

**Priorizar funções e módulos CommonJS, utilizando `module.exports` e `require()`.**

### Regras

- Não utilizar classes para organizar a lógica de automação.
- Não utilizar Page Objects.
- Não criar classes para representar páginas, componentes ou fluxos da aplicação.
- Preferir funções independentes, objetos simples e módulos com responsabilidades bem definidas.
- Utilizar `module.exports` para exportar funções, objetos de seletores e outras estruturas reutilizáveis.
- Utilizar `require()` para importar os módulos.
- Evitar a mistura desnecessária de CommonJS com ES Modules (`import`/`export`).
- Respeitar a configuração existente do Cypress e verificar a compatibilidade do sistema de módulos antes de realizar alterações.

### Exemplo de módulo de seletores

Arquivo `cypress/support/selectors/loginSelectors.js`:

```javascript
const loginSelectors = {
  email: '[data-qa="login-email"]',
  password: '[data-qa="login-password"]',
  submit: '[data-qa="login-button"]',
  errorMessage: "form[action='/login'] p",
};

module.exports = loginSelectors;
```

### Exemplo de módulo de funções

Arquivo `cypress/support/helpers/loginHelper.js`:

```javascript
const selectors = require("../selectors/loginSelectors");

function preencherCredenciais(email, senha) {
  cy.get(selectors.email).type(email);
  cy.get(selectors.password).type(senha);
}

module.exports = {
  preencherCredenciais,
};
```

### Exemplo de Custom Command

Arquivo `cypress/support/commands/authCommands.js`:

```javascript
const selectors = require("../selectors/loginSelectors");

Cypress.Commands.add("login", (email, senha) => {
  cy.get(selectors.email).type(email);
  cy.get(selectors.password).type(senha);
  cy.get(selectors.submit).click();
});
```

Os exemplos são ilustrativos. Os seletores, as funções e as ações devem corresponder ao comportamento real da aplicação.

## 4. Centralização dos seletores

Os seletores devem ficar em arquivos específicos por funcionalidade, por exemplo:

- `loginSelectors.js`
- `signupSelectors.js`
- `productSelectors.js`
- `cartSelectors.js`
- `checkoutSelectors.js`

### Critérios

- Priorizar atributos estáveis, como `data-testid`, `data-cy` e `data-qa`, quando disponíveis.
- Evitar classes CSS geradas automaticamente e seletores excessivamente dependentes da estrutura do DOM.
- Utilizar nomes descritivos e consistentes.
- Evitar declarar o mesmo seletor em diferentes módulos.
- Atualizar o seletor em um único local quando necessário.

**Importante:** os seletores devem ser centralizados, mas não devem ser transformados em classes ou objetos de página com métodos de interação.

## 5. Organização dos Custom Commands

Separar os comandos por funcionalidade, mantendo um ponto central de registro.

Exemplo de estrutura:

```text
cypress/
├── e2e/
│   ├── authentication.cy.js
│   ├── signup.cy.js
│   └── checkout.cy.js
├── fixtures/
│   └── users.json
└── support/
    ├── e2e.js
    ├── commands.js
    ├── commands/
    │   ├── authCommands.js
    │   ├── signupCommands.js
    │   └── checkoutCommands.js
    ├── selectors/
    │   ├── loginSelectors.js
    │   ├── signupSelectors.js
    │   └── checkoutSelectors.js
    └── helpers/
        └── loginHelper.js
```

Essa estrutura é uma referência. Os diretórios e arquivos devem ser adaptados ao tamanho e às funcionalidades reais do projeto.

Evitar a criação de arquivos sem responsabilidade clara ou que apenas repassem chamadas sem agregar valor.

## 6. Organização dos testes

Os arquivos `*.cy.js` devem:

- Descrever o comportamento esperado por meio de cenários claros.
- Utilizar Custom Commands para ações reutilizáveis.
- Manter asserções importantes visíveis nos testes quando isso facilitar a compreensão.
- Evitar concentrar toda a lógica de interação diretamente nos cenários.
- Preservar os cenários positivos, negativos e alternativos já existentes.
- Manter os nomes dos testes objetivos e alinhados às regras de negócio.

## 7. Dados e configurações

- Utilizar fixtures para dados reutilizáveis de teste.
- Utilizar variáveis de ambiente para credenciais e informações sensíveis.
- Não versionar senhas reais, tokens ou outros segredos.
- Preservar as configurações existentes do Cypress, alterando somente o necessário.
- Garantir que os comandos estejam corretamente registrados no arquivo de suporte.

## 8. Regras para futuras refatorações

Sempre que um código for enviado para refatoração, seguir este processo:

1. Analisar a estrutura atual e identificar duplicações, dependências e responsabilidades.
2. Preservar os cenários existentes, as regras de negócio e as validações.
3. Propor uma estrutura modular compatível com o projeto.
4. Centralizar os seletores em arquivos separados por funcionalidade.
5. Implementar Custom Commands reutilizáveis.
6. Utilizar funções e CommonJS (`module.exports` e `require()`), evitando classes e Page Objects.
7. Separar os dados de teste da lógica quando apropriado.
8. Apresentar o código completo dos arquivos criados ou modificados, identificando os respectivos caminhos.
9. Explicar os ajustes necessários na configuração e no registro dos comandos.
10. Sinalizar dependências, seletores e comportamentos que precisem de validação no ambiente real.
11. Não afirmar que os testes passaram sem que tenham sido efetivamente executados.

## 9. Restrições arquiteturais

Não adotar:

- Page Objects ou classes de página.
- Classes para encapsular funcionalidades da interface.
- Módulos ES (`import`/`export`) como padrão, quando o projeto estiver utilizando CommonJS.
- Seletores duplicados e espalhados desnecessariamente.
- Um único arquivo extenso concentrando todos os comandos.
- Camadas de abstração excessivas.
- Alterações de comportamento não solicitadas durante uma refatoração.

## 10. Resultado esperado

Toda implementação ou refatoração deve respeitar o seguinte padrão:

**Cypress + JavaScript + Custom Commands reutilizáveis + seletores centralizados + funções + CommonJS (`module.exports` e `require()`).**

Os testes devem ser declarativos, os módulos devem ter responsabilidades bem definidas e a arquitetura deve permanecer simples, consistente e escalável, sem utilizar classes ou Page Objects.

Este documento deve ser considerado a referência arquitetural para as próximas atividades do projeto.