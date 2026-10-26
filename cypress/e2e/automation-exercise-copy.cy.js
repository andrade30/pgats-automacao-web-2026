/// <reference types="cypress" />
describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT001: Validar o cadastro de um novo usuário com sucesso", () => {
    const user = {
      name: 'QAx',
      lastName: 'Automation',
      password: 'pwd123',
      day: '1',
      month: 'November',
      year: '1990',
      company: 'XPTO',
      address: 'Rua A, n° 25, São José Operário',
      country: 'Canada',
      state: 'Montreal',
      city: 'Quebec',
      zipcode:'68901-170',
      mobile: '92 99999-9999'
    }

    cy.signup(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains("Logged in as QAx")
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();
  });

  it("CT002: Validar login de usuário com e-mail e senha corretos", () => {
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));

    cy.get(".navbar-nav li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");
  });

  it("CT003: Validar login do usuário com email e senha incorretos", () => {
    cy.loginInvalid("usuario.inexistente@teste.com", "SenhaInvalida123");
    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("CT004: Validar login e logout do usuário", () => {
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));

    cy.get(".navbar-nav li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Logout").click();
    cy.url().should("include", "/login");
  });

  it("CT005: Validar o cadastro de usuário com e-mail existente", () => {
    cy.submeterCadastroComEmailDuplicado("Ravi", "ravi_bezerra@teste.com")
    cy.contains("Email Address already exist!").should("be.visible");
  });

  it("CT006: Validar o envio das informações preenchidas no formulário de contato", () => {
    cy.get("a[href*=contact_us]").click();
    cy.contains("Get In Touch").should("be.visible");

    cy.get('[data-qa="name"]').type("Soraya Silva");
    cy.get('[data-qa="email"]').type("soraya@teste.com");
    cy.get('[data-qa="subject"]').type("Teste de Software");
    cy.get('input[name="upload_file"]').selectFile("cypress/fixtures/C1.pdf");
    cy.get('[data-qa="message"]').type(
      "Olá, estou entrando em contato para realizar um teste no formulário de contato. Obrigado!",
    );

    cy.get('input[data-qa="submit-button"]').contains("Submit").click();
    cy.get(".alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");

    cy.get(".btn-success").contains("Home").click();
    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT007: Validar o acesso a página de Casos de Teste", () => {
    cy.get(".navbar-nav li").contains("Test Cases").click();
    cy.contains("Test Cases").should("be.visible");
  });

  it("CT008: Validar o acesso as páginas de catálogo e detalhes do produto", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.contains("All Products").should("be.visible");

    cy.get('a[href="/product_details/1"]').click();
    cy.url().should("include", "/product_details/1");

    cy.get(".product-information")
      .should("be.visible")
      .within(() => {
        cy.contains("Blue Top").should("be.visible");
        cy.contains("Category: Women > Tops").should("be.visible");
        cy.contains("Rs. 500").should("be.visible");
        cy.contains("Availability: In Stock").should("be.visible");
        cy.contains("Condition: New").should("be.visible");
        cy.contains("Brand: Polo").should("be.visible");
      });
  });

  it("CT009: Validar a pesquisa por um produto do catálogo", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.contains("All Products").should("be.visible");

    cy.url().should("include", "/products");
    cy.get("#search_product").type("Premium Polo T-Shirts");
    cy.get("#submit_search").click();

    cy.get(".title").contains("Searched Products").should("be.visible");
    cy.contains("Premium Polo T-Shirts").should("be.visible");
  });

  it("CT010: Validar assinatura na página inicial", () => {
    cy.scrollTo("bottom");
    cy.contains("Subscription").should("be.visible");
    cy.get("#susbscribe_email").type("soraya@email.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success")
      .contains("You have been successfully subscribed!")
      .should("be.visible");
  });

  it("CT011: Validar assinatura na página do carrinho", () => {
    cy.get(".navbar-nav li").contains("Cart").click();
    cy.scrollTo("bottom");
    cy.contains("Subscription").should("be.visible");
    cy.get("#susbscribe_email").type("soraya@email.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success")
      .contains("You have been successfully subscribed!")
      .should("be.visible");
  });

  it("CT012: Validar a inclusão de produtos no carrinho de compras", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.get('[data-product-id="1"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="2"]').contains("Add to cart").click();
    cy.get('a[href="/view_cart"]').contains("View Cart").click();

    cy.get("#product-1")
      .should("be.visible")
      .within(() => {
        cy.contains("Blue Top").should("be.visible");
        cy.get(".cart_price").should("contain.text", "Rs. 500");
        cy.get(".cart_quantity").should("contain.text", "1");
        cy.get(".cart_total").should("contain.text", "Rs. 500");
      });

    cy.get("#product-2")
      .should("be.visible")
      .within(() => {
        cy.contains("Men Tshirt").should("be.visible");
        cy.get(".cart_price").should("contain.text", "Rs. 400");
        cy.get(".cart_quantity").should("contain.text", "1");
        cy.get(".cart_total").should("contain.text", "Rs. 400");
      });
  });

  it("CT013: Validar o aumento da quantidade de produtos no carrinho", () => {
    cy.get('a[href="/product_details/1"]').click();
    cy.url().should("include", "/product_details/1");

    cy.get("#quantity").clear().type("4");
    cy.get("button").contains("Add to cart").click();

    cy.get('a[href="/view_cart"]').contains("View Cart").click();
    cy.get("#product-1").within(() => {
      cy.contains("Blue Top").should("be.visible");
      cy.get(".cart_quantity")
        .invoke("text")
        .then((quantity) => {
          expect(Number(quantity.trim())).to.equal(4);
        });
    });
  });

  it("CT014: Validar o registro de uma conta durante o checkout", () => {
    const user = {
      name: 'Pedro Vinicius',
      lastName: 'Andrade',
      password: 'pwd123',
      day: '1',
      month: 'November',
      year: '1990',
      company: 'XPTO',
      address: 'Rua A, n° 25, São José Operário',
      country: 'Canada',
      state: 'Montreal',
      city: 'Quebec',
      zipcode:'68901-170',
      mobile: '92 99999-9999'
    }
    
    cy.get('[data-product-id="3"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();
    cy.get('[data-product-id="4"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();
    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart").should("be.visible");
    cy.get(".check_out").contains("Proceed To Checkout").click();

    cy.registerUser(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains("Logged in as Pedro Vinicius")
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get("#cart_items").contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
    cy.get(".address_title")
      .contains("Your delivery address")
      .should("be.visible");

    cy.contains("Review Your Order").should("be.visible");
    cy.get(".form-control").type("Produtos adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.get('[data-qa="name-on-card"]').type("Pedro Vinicius Andrade");
    cy.get('[data-qa="card-number"]').type("8901 2347 1982 7326");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("09");
    cy.get('[data-qa="expiry-year"]').type("2030");
    cy.get('[data-qa="pay-button"]').click();
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT015: Validar o registro de uma conta antes de finalizar a compra", () => {
    const user = {
      name: 'Ravi',
      lastName: 'Bezerra',
      password: 'pwd123',
      day: '8',
      month: 'August',
      year: '1995',
      company: 'XPTO',
      address: 'Rua Servidão Luiz Cardoso, n° 40, Itaum',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode:'89723-155',
      mobile: '47 99999-9999'
    }

    cy.signup(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains("Logged in as Ravi")
      .should("be.visible");

    cy.get('[data-product-id="1"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="2"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get("#cart_items").contains("Proceed To Checkout").click();
    cy.contains("Address Details").should("be.visible");
    cy.get(".address_title")
      .contains("Your delivery address")
      .should("be.visible");

    cy.contains("Review Your Order").should("be.visible");
    cy.get(".form-control").type("Produtos adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.get('[data-qa="name-on-card"]').type("Ravi Bezerra");
    cy.get('[data-qa="card-number"]').type("8201 2869 1975 7347");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2035");
    cy.get('[data-qa="pay-button"]').click();
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT016: Validar login bem-sucedido antes de efetuar uma compra", () => {
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));

    cy.get(".navbar-nav li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");

    cy.get('[data-product-id="3"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="4"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart");
    cy.get("#cart_items").contains("Proceed To Checkout").click();

    cy.contains("Address Details").should("be.visible");
    cy.get(".address_title")
      .contains("Your delivery address")
      .should("be.visible");

    cy.contains("Review Your Order").should("be.visible");
    cy.get("#product-3").contains("Sleeveless Dress").should("be.visible");
    cy.get("#product-4").contains("Stylish Dress").should("be.visible");

    cy.get(".form-control").type("Produtos adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.get('[data-qa="name-on-card"]').type("Ravi Bezerra");
    cy.get('[data-qa="card-number"]').type("7136 4629 8675 1541");
    cy.get('[data-qa="cvc"]').type("672");
    cy.get('[data-qa="expiry-month"]').type("04");
    cy.get('[data-qa="expiry-year"]').type("2029");
    cy.get('[data-qa="pay-button"]').click();
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT017: Validar a remoção de produtos do carrinho", () => {
    cy.get('[data-product-id="3"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="4"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart");
    cy.get("#product-4").within(() => {
      cy.get(".cart_quantity_delete").click();
    });

    cy.get("#product-4").should("not.exist");
  });

  it("CT018: Validar o acesso aos produtos das categorias Women e Men", () => {
    cy.get(".panel-title").contains("Women").click();
    cy.get("#Women").contains("Dress").click();
    cy.contains("Women - Dress Products").should("be.visible");

    cy.get(".panel-title").contains("Men").click();
    cy.get("#Men").contains("Jeans").click();
    cy.contains("Men - Jeans Products").should("be.visible");
  });

  it("CT019: Validar o acesso aos produtos das marcas Polo e Mast & Harbour", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.get('a[href="/brand_products/Polo"]').click();
    cy.contains("Brand - Polo Products").should("be.visible");

    cy.get('a[href="/brand_products/Mast & Harbour"]').click();
    cy.contains("Brand - Mast & Harbour Products").should("be.visible");
  });

  it("CT020: Validar a pesquisa de produtos disponíveis no catálogo", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.contains("All Products").should("be.visible");

    cy.get("#search_product").type("Premium Polo T-Shirts");
    cy.get("#submit_search").click();
    cy.contains("Searched Products").should("be.visible");
    cy.contains("Premium Polo T-Shirts").should("be.visible");

    cy.get('[data-product-id="30"]').contains("Add to cart").click();
    cy.get('a[href="/view_cart"]').contains("View Cart").click();

    cy.get('a[href="/login"]').contains("Signup / Login").click();
    cy.login(Cypress.env("LOGIN_EMAIL"), Cypress.env("LOGIN_PASSWORD"));
    cy.get(".navbar-nav li")
      .contains("Logged in as Ravi Bezerra")
      .should("be.visible");

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get("#cart_info_table")
      .contains("Premium Polo T-Shirts")
      .should("be.visible");
  });

  it("CT021: Validar a inclusão da avaliação de um produto", () => {
    cy.get(".navbar-nav li").contains("Products").click();
    cy.contains("All Products").should("be.visible");
    cy.get('a[href="/product_details/1"]').click();

    cy.url().should("include", "/product_details/1");
    cy.contains("Write Your Review").should("be.visible");
    cy.get("#name").type("Alessandro Andrade");
    cy.get("#email").type("andrade30@teste.com");
    cy.get("#review").type("Avaliação do produto realizada com sucesso");
    cy.get("#button-review").click();
    cy.contains("Thank you for your review.").should("be.visible");
  });

  it("CT022: Validar a inclusão de um produto no carrinho a partir dos itens recomendados", () => {
    cy.contains("recommended items").scrollIntoView().should("be.visible");
    cy.contains("Men Tshirt").should("be.visible");
    cy.get('[data-product-id="30"]').contains("Add to cart").click();
    cy.get('a[href="/view_cart"]').contains("View Cart").click();
    cy.url().should("include", "/view_cart");
    cy.get("#product-30")
      .should("be.visible")
      .within(() => {
        cy.contains("Premium Polo T-Shirts").should("be.visible");
      });
  });

  it("CT023: Validar que os endereços de entrega e cobrança são idênticos na página de finalização da compra", () => {
    const user = {
      name: 'Alessandro',
      lastName: 'Santos',
      password: 'pwd123',
      day: '10',
      month: 'December',
      year: '1985',
      company: 'Quality Test"',
      address: 'Rua B, n° 50, São Francisco',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode:'89723-155',
      mobile: '47 99984-9922'
    }

    cy.signup(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li")
      .contains("Logged in as Alessandro")
      .should("be.visible");

    cy.get('[data-product-id="5"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="6"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart");
    cy.get("#cart_items").contains("Proceed To Checkout").click();

    cy.contains("Address Details").should("be.visible");
    cy.get("#address_delivery").within(() => {
      cy.contains("Mr. Alessandro Santos").should("be.visible");
      cy.contains("Quality Test").should("be.visible");
      cy.contains("Rua B, n° 50, São Francisco").should("be.visible");
      cy.contains("San Francisco California 89723-155").should("be.visible");
      cy.contains("United States").should("be.visible");
      cy.contains("47 99984-9922").should("be.visible");
    });

    cy.get("#address_invoice").within(() => {
      cy.contains("Mr. Alessandro Santos").should("be.visible");
      cy.contains("Quality Test").should("be.visible");
      cy.contains("Rua B, n° 50, São Francisco").should("be.visible");
      cy.contains("San Francisco California 89723-155").should("be.visible");
      cy.contains("United States").should("be.visible");
      cy.contains("47 99984-9922").should("be.visible");
    });

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT024: Validar o download da fatura após ordem da compra", () => {
    const user = {
      name: 'Alex',
      lastName: 'Andrade',
      password: 'pwd123',
      day: '5',
      month: 'October',
      year: '1992',
      company: 'Quality Test"',
      address: 'Rua D, n° 30, Alvorada',
      country: 'Canada',
      state: 'Montreal',
      city: 'Quebec',
      zipcode:'68986-170',
      mobile: '92 99983-9702'
    }

    cy.get('[data-product-id="5"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get('[data-product-id="6"]').contains("Add to cart").click();
    cy.get(".btn-block").contains("Continue Shopping").click();

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart");
    cy.get("#cart_items").contains("Proceed To Checkout").click();
    
    cy.registerUser(user.name);
    cy.preencherFormCadastroDeUsuario(user);

    cy.contains("Account Created!").should("be.visible");
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".navbar-nav li").contains("Logged in as Alex").should("be.visible");

    cy.get(".navbar-nav li").contains("Cart").click();
    cy.get(".active").contains("Shopping Cart");
    cy.get("#cart_items").contains("Proceed To Checkout").click();

    cy.contains("Address Details").should("be.visible");
    cy.get("#address_delivery").within(() => {
      cy.contains("Mr. Alex Andrade").should("be.visible");
      cy.contains("Quality Test").should("be.visible");
      cy.contains("Rua D, n° 30, Alvorada").should("be.visible");
      cy.contains("Quebec Montreal 68986-170").should("be.visible");
      cy.contains("Canada").should("be.visible");
      cy.contains("92 99983-9702").should("be.visible");
    });

    cy.get("#address_invoice").within(() => {
      cy.contains("Mr. Alex Andrade").should("be.visible");
      cy.contains("Quality Test").should("be.visible");
      cy.contains("Rua D, n° 30, Alvorada").should("be.visible");
      cy.contains("Quebec Montreal 68986-170").should("be.visible");
      cy.contains("Canada").should("be.visible");
      cy.contains("92 99983-9702").should("be.visible");
    });

    cy.scrollTo("bottom");
    cy.contains("Review Your Order").should("be.visible");
    cy.get("#product-5").contains("Winter Top").should("be.visible");
    cy.get("#product-6").contains("Summer White Top").should("be.visible");

    cy.get(".form-control").type("Produtos top adquiridos com sucesso");
    cy.get(".check_out").contains("Place Order").click();

    cy.get(".heading").contains("Payment").should("be.visible");
    cy.get('[data-qa="name-on-card"]').type("Alex Andrade");
    cy.get('[data-qa="card-number"]').type("6501 3947 2682 9226");
    cy.get('[data-qa="cvc"]').type("529");
    cy.get('[data-qa="expiry-month"]').type("11");
    cy.get('[data-qa="expiry-year"]').type("2034");
    cy.get('[data-qa="pay-button"]').click();
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );

    cy.contains("Download Invoice").should("be.visible").click();

    cy.readFile("cypress/downloads/invoice.txt")
      .should("exist")
      .and("not.be.empty");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();

    cy.get(".navbar-nav li").contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]')
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get('[data-qa="continue-button"]').contains("Continue").click();
    cy.get(".logo img")
      .should("be.visible")
      .and("have.attr", "alt", "Website for automation practice");
  });

  it("CT025: Validar a funcionalidade de rolagem para cima e para baixo usando o botão de seta", () => {
    cy.scrollTo("bottom");
    cy.contains("Subscription").should("be.visible");
    cy.get("#scrollUp").click();
    cy.contains(
      "Full-Fledged practice website for Automation Engineers").should("be.visible");
  });

  it("CT026: Validar a funcionalidade de rolagem para cima e para baixo sem o botão de seta", () => {
    cy.scrollTo("bottom");
    cy.contains("Subscription").should("be.visible");
    cy.wait(1000)
    cy.scrollTo("top");
    cy.contains("Full-Fledged practice website for Automation Engineers").should("be.visible");
  });
});
