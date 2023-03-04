import { PracticePage } from '../pages/practicePage'

const practicePage = new PracticePage()
const EG_URL = 'https://easygenerator.com'

beforeEach(() => {
  /* This request was failing and taking too much time to resolve
    slowing the load of the page as the page load event wont fire till all page resources are loaded
    so we can intercept it and destroy it to load the page much faster and eliminate flakiness */
  cy.intercept(
    {
      method: 'GET',
      url: 'https://ipinfo.io/?callback=*',
    },
    (req) => {
      req.destroy()
    },
  )
  practicePage.open()
})

describe('Verify that normal DOM elments of the page are accessable and functional', () => {
  it('Should select different options from the drop down menu', () => {
    practicePage.dropDownList.select('Option1')
    practicePage.dropDownList.should('have.value', 'option1')
    practicePage.dropDownList.select('Option2')
    practicePage.dropDownList.should('have.value', 'option2')
    practicePage.dropDownList.select('Option3')
    practicePage.dropDownList.should('have.value', 'option3')
  })

  it('Should open new window after clicking on "Open window" button', () => {
    /* Cypress can't handle the new window so we need to spy on the window.open method first
     then assert it was called after clicking on the button
    */
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
    practicePage.openWindowButton.click()

    cy.get('@windowOpen').should('have.been.calledOnceWith', EG_URL)
  })

  it('Should open new tab after clicking on "Open Tab" button', () => {
    /* Cypress also can't handle the new tabs so we need to verify that the button 
    have the correct target and href attributes 
    */
    practicePage.openTabButton.should('have.attr', 'target', '_blank')
    practicePage.openTabButton.should('have.attr', 'href', `${EG_URL}/`)
  })

  it('Should display alert pop-up with the correct input message', () => {
    /* We can use our readTxtFile task to read the content of the file if exists
      and then type it in the input field then use cypress on method to assert the alert message
      after firing the alert button click event
    */
    cy.task('readTxtFile', 'cypress/fixtures/alert-text.txt').then((text) => {
      practicePage.inputMessage.type(text)
      practicePage.alertButton.click()
      cy.on('window:alert', (msg) => {
        expect(msg).to.equal(
          `Hello ${text}, share this practice page and share your knowledge`,
        )
      })
    })
  })

  it('Should display confirm pop-up with the correct input message', () => {
    let name = 'Muhammad Adel'
    practicePage.inputMessage.type(name)
    practicePage.confirmButton.click()
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal(`Hello ${name}, Are you sure you want to confirm?`)
    })
  })

  it('Should hide/show element after clicking on hide/show buttons', () => {
    practicePage.hideButton.click()
    practicePage.dynamicTextBox.should('have.css', 'display', 'none')
    practicePage.dynamicTextBox.should('not.be.visible')

    practicePage.showButton.click()
    practicePage.dynamicTextBox.should('have.css', 'display', 'block')
    practicePage.dynamicTextBox.should('be.visible')
  })

  it('Should display the menu after hovering with mouse over the button', () => {
    // Here I used 3rd party lib called cypress-real-events to make a real hover not simulated one with javascript
    practicePage.hoverButton.realHover()
    practicePage.hoverMenu.should('be.visible')
  })

  it('Should scroll to the top of the page after clicking on "Top" link from the hover menu', () => {
    practicePage.hoverButton.realHover()
    practicePage.hoverMenu.contains('Top').click()

    cy.url().should('include', '/#top')
    cy.window().its('scrollY').should('equal', 0)
  })

  it('Should reload the page after clicking on "Reload" link from the hover menu', () => {
    cy.url().then((currentUrl) => {
      practicePage.hoverButton.realHover()
      practicePage.hoverMenu.contains('Reload').click()
      cy.url().should('eq', currentUrl)
    })
    cy.window().its('scrollY').should('equal', 0)
  })
})

describe('Verify that iframe elements are accessable and functional', () => {
  /* 
    In order to access the iframe body, I created a custom command called getIframeBody 
    and set chromeWebSecurity to false in cypress.config file to allow cross origin requests
  */
  it('Should open pricing page after clicking on "Pricing" from the nav bar in iframe', () => {
    practicePage.iframeContent.pricingButton.click()
    practicePage.iframeContent.pricingPageTitle.should('be.visible')
  })

  it('Should change the language of the page in iframe', () => {
    practicePage.iframeContent.languageButton.click()
    practicePage.iframeContent.languageMenu.contains('Nederlands').click()
    practicePage.iframeContent.pageTitle.should(
      'include.text',
      'Eenvoudig e-learning maken en onderhouden',
    )
  })
})
