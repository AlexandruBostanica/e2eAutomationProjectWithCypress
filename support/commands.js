// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', () => {
    
    cy.get('[placeholder="Email address"]').type(faker.internet.email())
    cy.get('[placeholder="Password"]').type(faker.internet.password())
    cy.contains('button', ' Log In ').click()
 })

 Cypress.Commands.add('register', () => {

  const password = faker.internet.password()

    cy.get('[placeholder="Full name"]').type(faker.person.fullName())
    cy.get('[placeholder="Email address"]').type(faker.internet.email())
    cy.get('[placeholder="Password"]').type(password)
    cy.get('[placeholder="Confirm Password"]').type(password)
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.contains('button', ' Register ').click()
  })

  Cypress.Commands.add('submitInlineForm', () => {

    cy.get('[placeholder="Jane Doe"]').type(faker.person.fullName())
    cy.contains('div', 'Inline form').within(() =>{
    cy.get('[placeholder="Email"]').type(faker.internet.email())
    })
    cy.get('[type="checkbox"]').eq(0).check({force:true}).should('be.checked')
    cy.contains('button', 'Submit').click()
   })

   Cypress.Commands.add('submitUsingTheGrid', () => {

    cy.get('#inputEmail1').type(faker.internet.email())
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
        })
    cy.contains('button', 'Sign in').click()
    })

    Cypress.Commands.add('submitFormWithoutLabels', () => {

      const recipients = faker.person.fullName()
      const subject = faker.lorem.words(3)
      const message = faker.lorem.sentence(5)

    cy.contains('nb-card', 'Form without labels')
    cy.get('[placeholder="Recipients"]').type(recipients).should('have.value', recipients)
    cy.get('[placeholder="Subject"]').type(subject).should('have.value', subject)
    cy.get('[placeholder="Message"]').type(message).should('have.value',message)
    cy.contains('button', 'Send').click()
     })

    Cypress.Commands.add('submitBasicForm', () => { 

    const email = faker.internet.email()
    const password = faker.internet.password()

    cy.contains('nb-card', 'Basic form')
    cy.get('#exampleInputEmail1').clear().type(email).should('have.value', email)
    cy.get('#exampleInputPassword1').clear().type(password).should('have.value', password)
    cy.get('[type="checkbox"]').eq(1).check({force:true})
    cy.contains('nb-card', 'Basic form').contains('button', 'Submit').click()
     })


    Cypress.Commands.add('submitBlockForm', () => { 

      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      const email = faker.internet.email()
      const website = faker.internet.url()

    cy.contains('nb-card', 'Block form')
    .scrollIntoView
    cy.get('#inputFirstName').should('not.have.value').type(firstName).should('have.value', firstName)
    cy.get('#inputLastName').should('not.have.value').type(lastName).should('have.value', lastName)
    cy.get('#inputEmail').should('not.have.value').type(email).should('have.value', email)
    cy.get('#inputWebsite').should('not.have.value').type(website).should('have.value', website)
    cy.contains('nb-card', 'Block form').contains('button', 'Submit').click()
    })


    Cypress.Commands.add('submitHorizontalForm', () => { 

      const email = faker.internet.email()
      const password = faker.internet.password()

    cy.contains('nb-card', 'Horizontal form')
    .scrollIntoView
    cy.get('#inputEmail3').should('not.have.value').type(email).should('have.value', email)
    cy.get('#inputPassword3').should('not.have.value').type(password).should('have.value', password)
    cy.get('[type="checkbox"]').eq(2).check({force:true}).should('be.checked')
    cy.contains('nb-card', 'Horizontal form').contains('button', 'Sign in').click()
    })

    Cypress.Commands.add('openDialogWithComponent', () => { 

    cy.contains('Open Dialog with component').click()
    cy.contains('Dismiss Dialog').click()
    cy.contains('Open Dialog with component').should('be.visible')
    })

     Cypress.Commands.add('openDialogWithTemplate', () => {

    cy.contains('Open Dialog with template').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open Dialog with component').should('be.visible')
    })


    Cypress.Commands.add('openDialogWithDelay3s', () => { 

    cy.contains('Open with delay 3 seconds').click()
    cy.contains('OK').click()
    cy.contains('Open with delay 3 seconds').should('be.visible')
     })

    Cypress.Commands.add('openDialogWithDelay10s', () => { 

    cy.contains('Open with delay 10 seconds').click()
    cy.wait(10000)
    cy.contains('OK').click()
    cy.contains('Open with delay 10 seconds').should('be.visible')
    })

    Cypress.Commands.add('openIframeWithEscClose', () => { 

    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.realPress('Escape');
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').should('be.visible');
    })

    Cypress.Commands.add('openIframeWithoutEscClose', () => {

    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').click()
    cy.contains('OK').click()
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').should('be.visible');
    })


    Cypress.Commands.add('openDialogWithBackdropClick', () => {
    cy.contains('Open Dialog with backdrop click').click()
    cy.contains('Dismiss Dialog').click({ force: true });
    cy.contains('Dismiss Dialog').should('not.exist');
     })

    Cypress.Commands.add('openDialogWithoutBackdropClick', () => {

    cy.contains('Open without backdrop click').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open without backdrop click').should('be.visible')
    })

    Cypress.Commands.add('openRandomDialog', () => { 

      const name = faker.person.fullName()

    cy.contains('Enter Name').click()
    cy.get('body').then($body => { // condition that checks what dialog opens
  if ($body.find('button:contains("OK")').length) {
    cy.contains('OK').click();
  } 
    cy.get('[placeholder="Name"]').type(name);
    cy.contains('button', 'Submit').click();
})
    cy.contains('h3', 'Names:')
  .parent()
  .within(() => {
    cy.get('li').should('contain.text', name);
  })
})

    Cypress.Commands.add('triggerNativeDialog', () => { 

    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
    expect(confirm).to.equal('Are you sure you want to delete?')
    })
})

    Cypress.Commands.add('triggerNativeDialog1', () => { 

    cy.get('.nb-trash').first().click()
    cy.window().then( window => {
    cy.stub(window, 'confirm').as('dialog').returns(false)
    })
    cy.get('.nb-trash').first().click()
    cy.get('@dialog').should('be.calledWith', 'Are you sure you want to delete?')
    })



