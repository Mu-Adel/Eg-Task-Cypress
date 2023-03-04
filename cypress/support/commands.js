/// <reference types="cypress" />

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
    .get('#courses-iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(($body) => {
      expect($body[0].childElementCount).to.be.greaterThan(0)
      return cy.get('#courses-iframe').its('0.contentDocument.body')
    })
})
