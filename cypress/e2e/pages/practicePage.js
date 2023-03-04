export class PracticePage {
  open() {
    cy.visit('/')
  }

  get dropDownList() {
    return cy.get('#dropdown-class-example')
  }

  get openWindowButton() {
    return cy.get('#openwindow')
  }

  get openTabButton() {
    return cy.get('#opentab')
  }

  get inputMessage() {
    return cy.get('#name')
  }

  get alertButton() {
    return cy.get('#alertbtn')
  }

  get confirmButton() {
    return cy.get('#confirmbtn')
  }

  get dynamicTextBox() {
    return cy.get('#displayed-text')
  }

  get hideButton() {
    return cy.get('#hide-textbox')
  }

  get showButton() {
    return cy.get('#show-textbox')
  }

  get hoverButton() {
    return cy.get('button[class*=hover-btn]')
  }

  get hoverMenu() {
    return cy.get('[class=hover-content]')
  }

  iframeContent = {
    get navBar() {
      return cy.getIframeBody().find('#menu-top-navigation')
    },

    get languageButton() {
      return cy.getIframeBody().find('[class=select-menu]')
    },

    get languageMenu() {
      return cy.getIframeBody().find('[class="select-menu open"]')
    },

    get pageTitle() {
      return cy.getIframeBody().find('.rw-sentence')
    },

    get pricingButton() {
      return this.navBar.find('a').contains('Pricing')
    },

    get pricingPageTitle() {
      return cy.getIframeBody().find('.pricing-page-title')
    },
  }
}
