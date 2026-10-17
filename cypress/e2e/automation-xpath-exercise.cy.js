/// <reference types="cypress" />
describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.xpath("//a[contains(@href,'login')]").click();

    cy.xpath(
      "//*[contains(concat(' ', normalize-space(@class), ' '), ' logo ')]//img",
    )
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("Cadastrar um novo usuário com sucesso", () => {
    cy.contains("New User Signup!").should("be.visible");
    cy.xpath("//input[@data-qa='signup-name']").type("QA Automation");

    const timestamp = Date.now();
    const email = `qa_automation+${timestamp}@teste.com`;

    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").contains("Signup").click();
    cy.contains("Enter Account Information").should("be.visible");

    cy.xpath("//*[@id='id_gender1']").click();
    cy.xpath("//*[@data-qa='name']").should("have.value", "QA Automation");
    cy.xpath("//*[@data-qa='email']").should("have.value", email);

    cy.xpath("//*[@data-qa='password']").type("pwd123");

    cy.xpath("//*[@data-qa='days']").select("1").should("be.visible");

    cy.xpath("//*[@data-qa='months']").select("November").should("be.visible");

    cy.xpath("//*[@data-qa='years']").select("1990").should("be.visible");

    cy.xpath("//*[@id='newsletter']").click();
    cy.xpath("//*[@id='optin']").click();

    cy.xpath("//*[@id='first_name']").type("Alessandro");
    cy.xpath("//*[@id='last_name']").type("Andrade");
    cy.xpath("//*[@data-qa='company']").type("XPTO");

    cy.xpath("//*[@data-qa='address']").type("Rua A, n° 25, São José Operário");
    cy.xpath("//*[@data-qa='country']").select("Canada").should("be.visible");

    cy.xpath("//*[@data-qa='state']").type("Montreal");
    cy.xpath("//*[@data-qa='city']").type("Quebec");
    cy.xpath("//input[@data-qa='zipcode']").type("68901-170");
    cy.xpath("//*[@data-qa='mobile_number']").type("92 99999-9999");

    cy.xpath("//button[@data-qa='create-account']")
      .contains("Create Account")
      .click();

    cy.contains("Account Created!").should("be.visible");
    cy.xpath("//a[@data-qa='continue-button']").contains("Continue").click();
    cy.xpath("//ul[contains(@class,'navbar-nav')]//li")
      .contains("Logged in as QA Automation")
      .should("be.visible");

    cy.xpath("//ul[contains(@class,'navbar-nav')]//li")
      .contains("Delete Account")
      .click();
    cy.xpath("//*[@data-qa='account-deleted']")
      .contains("Account Deleted!")
      .should("be.visible");

    cy.xpath("//*[@data-qa='continue-button']").contains("Continue").click();
    cy.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' logo ')]//img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("Validar login de usuário com e-mail e senha corretos", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.xpath("//*[@data-qa='login-email']").type("ravi_bezerra@teste.com");
    cy.xpath("//*[@data-qa='login-password']").type("pwd123");
    cy.xpath("//*[@data-qa='login-button']").contains("Login").click();

    cy.xpath("//ul[contains(@class,'navbar-nav')]//li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");
  });

  it("Validar login do usuário com email e senha incorretos", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.xpath("//*[@data-qa='login-email']").type("ravi_bezerra@email.com");
    cy.xpath("//*[@data-qa='login-password']").type("123456");
    cy.xpath("//*[@data-qa='login-button']").contains("Login").click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("Validar login e logout do usuário", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.xpath("//*[@data-qa='login-email']").type("ravi_bezerra@teste.com");
    cy.xpath("//*[@data-qa='login-password']").type("pwd123");
    cy.xpath("//*[@data-qa='login-button']").contains("Login").click();

    cy.xpath("//ul[contains(@class,'navbar-nav')]//li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");

    cy.xpath("//ul[contains(@class,'navbar-nav')]//li")
      .contains("Logout")
      .click();
    cy.url().should("include", "/login");
  });

  it("Validar o cadastro de usuário com e-mail existente", () => {
    cy.contains("New User Signup!").should("be.visible");

    cy.xpath("//input[@data-qa='signup-name']").type("Ravi Bezerra");
    cy.xpath("//input[@data-qa='signup-email']").type("ravi_bezerra@teste.com");
    cy.xpath("//button[@data-qa='signup-button']").contains("Signup").click();
    cy.contains("Email Address already exist!").should("be.visible");
  });
});
