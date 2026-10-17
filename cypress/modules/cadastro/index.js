// CADASTRO
function iniciarCadastro(nome, email) {
  cy.get('a[href="/login"]').contains("Signup / Login").click();
  cy.contains("New User Signup!").should("be.visible");

  // const timestamp = Date.now();
  // const email = `qa_automation+${timestamp}@teste.com`;

  cy.get('input[data-qa="signup-name"]').type(nome);
  cy.get('input[data-qa="signup-email"]').type(email);
  cy.get('button[data-qa="signup-button"]').contains("Signup").click();
}

function preencherCadastro() {
  cy.contains("Enter Account Information").should("be.visible");
  cy.get("#id_gender1").click();
  cy.get('[data-qa="name"]').should("have.value", "Alessandro Andrade");
  // cy.get('[data-qa="email"]').should("have.value", "qa_automation+1791815400273@teste.com");
  cy.get('[data-qa="password"]').type("12345");

  cy.get('[data-qa="days"]').select("1").should("be.visible");
  cy.get('[data-qa="months"]').select("September").should("be.visible");
  cy.get('[data-qa="years"]').select("1995").should("be.visible");

  cy.get("#newsletter").click();
  cy.get("#optin").click();

  cy.get("#first_name").type("Alessandro");
  cy.get("#last_name").type("Andrade");
  cy.get('[data-qa="company"]').type("XPTO");

  cy.get('[data-qa="address"]').type("Rua 17, n° 59, São José Operário");
  cy.get('[data-qa="country"]').select("Canada").should("be.visible");
  cy.get('[data-qa="state"]').type("Montreal");
  cy.get('[data-qa="city"]').type("Quebec");
  cy.get('[data-qa="zipcode"]').type("68901-180");
  cy.get('[data-qa="mobile_number"]').type("92 98499-9982");

  cy.get('button[data-qa="create-account"]').contains("Create Account").click();
}

function verificarCadastroEfetuadoComSucesso() {
  cy.contains("Account Created!").should("be.visible");
  cy.get('a[data-qa="continue-button"]').contains("Continue").click();
  cy.get(".navbar-nav li").contains("Logged in as Alessandro Andrade").should("be.visible");
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.contains("Email Address already exist!").should("be.visible");
}

module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarCadastroEfetuadoComSucesso,
    verificarSeMensagemDeCadastroExistenteFoiExibida
}