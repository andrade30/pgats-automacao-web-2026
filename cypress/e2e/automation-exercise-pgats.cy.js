/// <reference types="cypress" />

import users from "../fixtures/users.json";
import products from "../fixtures/products.json";
import payment from "../fixtures/payment.json";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT001: Validar o cadastro de um novo usuário com sucesso", () => {
    const user = users.usuarioCanada;

    cy.signup(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains(`Logged in as ${user.name}`)
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("CT002: Validar login de usuário com e-mail e senha corretos", () => {
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));

    cy.get(".navbar-nav li")
      .contains(`Logged in as ${Cypress.env("LOGIN_NAME")}`)
      .should("be.visible");
  });

  it("CT003: Validar login do usuário com email e senha incorretos", () => {
    const { email, password } = users.credenciaisInvalidas;

    cy.loginInvalid(email, password);
    cy.contains("Your email or password is incorrect!")
      .should("be.visible");
  });

  it("CT004: Validar login e logout do usuário", () => {
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));

    cy.get(".navbar-nav li")
      .contains(`Logged in as ${Cypress.env("LOGIN_NAME")}`)
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Logout").click();
    cy.url().should("include", "/login");
  });

  it("CT005: Validar o cadastro de usuário com e-mail existente", () => {
    cy.submeterCadastroComEmailDuplicado("Ravi", "ravi_bezerra@teste.com")
    cy.contains("Email Address already exist!")
      .should("be.visible");
  });

  it("CT008: Validar o acesso as páginas de catálogo e detalhes do produto", () => {
    const produto = products.blueTop;

    cy.get(".navbar-nav li").contains("Products").click();
    cy.location("pathname").should("eq", "/products");
    cy.contains("All Products").should("be.visible");

    cy.get(`a[href="/product_details/${produto.id}"]`).first().click();
    cy.location("pathname").should("eq", `/product_details/${produto.id}`);

    cy.get(".product-information")
      .should("be.visible")
      .within(() => {
        cy.contains(produto.name).should("be.visible");
        cy.contains(`Category: ${produto.category}`).should("be.visible");
        cy.contains(produto.price).should("be.visible");
        cy.contains(`Availability: ${produto.availability}`).should("be.visible");
        cy.contains(`Condition: ${produto.condition}`).should("be.visible");
        cy.contains(`Brand: ${produto.brand}`).should("be.visible");
      });
  });

  it("CT009: Validar a pesquisa por um produto do catálogo", () => {
    const produto = products.premiumPolo;

    cy.get(".navbar-nav li").contains("Products").click();
    cy.location("pathname").should("eq", "/products");
    cy.contains("All Products").should("be.visible");

    cy.get("#search_product").type(produto.name);
    cy.get("#submit_search").click();

    cy.get(".title")
      .contains("Searched Products")
      .should("be.visible");

    cy.get(".features_items .productinfo p")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        expect($el.text()).to.contain(produto.name);
    });

    // cy.contains("Premium Polo T-Shirts")
    //   .should("be.visible");
  });

  it("CT010: Validar assinatura na página inicial", () => {
    const { email } = users.assinatura;

    cy.get("footer").contains("Subscription").scrollIntoView().should('be.visible');
    cy.get("#susbscribe_email").type(email);
    cy.get("#subscribe").click();

    cy.get(".alert-success")
      .contains("You have been successfully subscribed!")
      .should("be.visible");
  });

  it("CT015: Validar o registro de uma conta antes de finalizar a compra", () => {
    const user = users.usuarioEUA;

    cy.signup(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains(`Logged in as ${user.name}`)
      .should("be.visible");

    cy.adicionarProdutoAoCarrinho(1);
    cy.adicionarProdutoAoCarrinho(2);

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.location("pathname").should("eq", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length", 2);
    
    cy.get("#cart_items").contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
    cy.get("#address_delivery")
      .should("contain", user.address)
      .and("contain", user.city)

    cy.contains("Review Your Order").should("be.visible");
    cy.get("#product-1").should("contain", "Blue Top");
    cy.get("#product-2").should("contain", "Men Tshirt");

    cy.get("textarea[name='message']").type("Produtos adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.preencherPagamento(`${user.name} ${user.lastName}`, payment.cartaoCT015)
    cy.get('[data-qa="pay-button"]').click();

    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("CT016: Validar login bem-sucedido antes de efetuar uma compra", () => {
    const nome = Cypress.env("LOGIN_NAME");

    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));
    cy.get(".navbar-nav li")
      .contains(`Logged in as ${nome}`)
      .should("be.visible");

    cy.adicionarProdutoAoCarrinho(3);
    cy.adicionarProdutoAoCarrinho(4);

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.location("pathname").should("eq", "/view_cart")
    cy.get("#cart_info_table tbody tr").should("have.length", 2);

    cy.get("#cart_items").contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
    cy.get(".address_title")
      .contains("Your delivery address")
      .should("be.visible");

    cy.contains("Review Your Order").should("be.visible");
    cy.get("#product-3").should("contain", "Sleeveless Dress");
    cy.get("#product-4").should("contain", "Stylish Dress");

    cy.get("textarea[name='message']").type("Produtos adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.preencherPagamento(nome, payment.cartaoCT016);
    cy.get('[data-qa="pay-button"]').click();
    
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });
});
