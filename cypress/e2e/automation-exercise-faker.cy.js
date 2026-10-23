/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import { buildUser, createUserViaApi, deleteUserViaApi } from "../support/helpers/userHelpers.js";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.get("a[href*=login]").click();

    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("Validar o cadastro de um novo usuário com sucesso", () => {
    const user = buildUser();
    
    cy.contains("New User Signup!").should("be.visible");
    cy.get('input[data-qa="signup-name"]').type(user.name);
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[data-qa="signup-button"]').contains("Signup").click();
    cy.contains("Enter Account Information").should("be.visible");

    cy.get("#id_gender1").click();
    cy.get('[data-qa="name"]').should("have.value", user.name);
    cy.get('[data-qa="email"]').should("have.value", user.email);

    cy.get('[data-qa="password"]').type(user.password);

    cy.get('[data-qa="days"]').select(user.birthDay).should('be.visible');
    cy.get('[data-qa="months"]').select(user.birthMonth).should('be.visible');
    cy.get('[data-qa="years"]').select(user.birthYear).should('be.visible');

    cy.get("#newsletter").click();
    cy.get("#optin").click();

    cy.get("#first_name").type(user.firstName);
    cy.get("#last_name").type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);

    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country).should('be.visible');

    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('input[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);

    cy.get('button[data-qa="create-account"]')
      .contains("Create Account")
      .click();

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains(`Logged in as ${user.name}`)
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();
  });

  context("Cenários que dependem de um usuário já cadastrado", () => {
    let user;

    // Cria um usuário novo (via API) antes de cada teste, em vez de depender
    // de um usuário fixo que pode ser removido ou alterado por terceiros.
    beforeEach(() => {
      user = buildUser();
      createUserViaApi(user);
    });

    // Limpeza: remove o usuário criado, mantendo o ambiente limpo.
    afterEach(() => {
      deleteUserViaApi(user);
    })
    
   it("Validar login de usuário com e-mail e senha corretos", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').contains("Login").click();

    cy.get(".navbar-nav li")
      .contains(`Logged in as ${user.name}`)
      .should("be.visible");
  });

  it("Validar login do usuário com email e senha incorretos", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(`${user.password}_errada`);
    cy.get('[data-qa="login-button"]').contains("Login").click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("Validar login e logout do usuário", () => {
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').contains("Login").click();

    cy.get(".navbar-nav li")
      .contains(`Logged in as ${user.name}`)
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Logout").click();
    cy.url().should("include", "/login");
  });

  it("Validar o cadastro de usuário com e-mail existente", () => {
    cy.contains("New User Signup!").should("be.visible");

    cy.get('input[data-qa="signup-name"]').type(faker.person.fullName());
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[data-qa="signup-button"]').contains("Signup").click();

    cy.contains("Email Address already exist!").should("be.visible");
  });
 })
});
