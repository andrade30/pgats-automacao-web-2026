Cypress.Commands.add('signup', (name) => {
    const timestamp = Date.now();
    const email = `qa_automation+${timestamp}@teste.com`;

    // Salva o e-mail gerado para ser usado em etapas posteriores do teste
    Cypress.env('userEmail', email);

    cy.get('a[href="/login"]').contains("Signup / Login").click();
    cy.contains("New User Signup!").should("be.visible");
    cy.get('input[data-qa="signup-name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').contains("Signup").click();
})

Cypress.Commands.add('login', (email, password) => {
    cy.get('a[href="/login"]').contains("Signup / Login").click();
    cy.contains("Login to your account").should("be.visible");
    
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').contains("Login").click();
})

Cypress.Commands.add('loginInvalid', (email, password) => {
    cy.get('a[href="/login"]').contains("Signup / Login").click();
    cy.contains("Login to your account").should("be.visible");
    
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').contains("Login").click();
})