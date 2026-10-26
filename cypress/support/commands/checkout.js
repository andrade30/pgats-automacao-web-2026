// --- Carrinho ---
Cypress.Commands.add("adicionarProdutoAoCarrinho", (id) => {
    cy.get(`[data-product-id="${id}"]`).first().contains("Add to cart").click();
    cy.get(".modal-footer").contains("Continue Shopping").click();
})

// --- Pagamento ---
Cypress.Commands.add("preencherPagamento", (nomeNoCartao, card) => {
  cy.get('[data-qa="name-on-card"]').type(nomeNoCartao);
  cy.get('[data-qa="card-number"]').type(card.number);
  cy.get('[data-qa="cvc"]').type(card.cvc);
  cy.get('[data-qa="expiry-month"]').type(card.expiryMonth);
  cy.get('[data-qa="expiry-year"]').type(card.expiryYear);
});