Cypress.Commands.add('preencherFormCadastroDeUsuario', (user) => {
    cy.contains("Enter Account Information").should("be.visible");
    cy.get("#id_gender1").click();
    cy.get('[data-qa="name"]').should("have.value", user.name);
    cy.then(() => {
      cy.get('[data-qa="email"]').should("have.value", Cypress.env('userEmail'));
    })

    cy.get('[data-qa="password"]').type(user.password, { log: false });
    cy.get('[data-qa="days"]').select(user.day).should("be.visible");
    cy.get('[data-qa="months"]').select(user.month).should("be.visible");
    cy.get('[data-qa="years"]').select(user.year).should("be.visible");

    cy.get("#newsletter").click();
    cy.get("#optin").click();

    cy.get("#first_name").type(user.name);
    cy.get("#last_name").type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);

    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country).should("be.visible");
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('input[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);

    cy.get('button[data-qa="create-account"]')
      .contains("Create Account")
      .click();
})

Cypress.Commands.add('submeterCadastroComEmailDuplicado', (nome, email) => {
    cy.get('a[href="/login"]').contains("Signup / Login").click();
    cy.contains("New User Signup!").should("be.visible");
    cy.get('input[data-qa="signup-name"]').type(nome);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').contains("Signup").click();
})