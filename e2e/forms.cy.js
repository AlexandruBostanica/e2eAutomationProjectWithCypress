/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Ensure a clean application state before each test
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Form Submission Scenarios', () => {

    // Validates successful submission of an inline form layout
    it('Submits inline form successfully', () => {

        navigateTo.formLayoutsPage()

        // Populate full name field
        cy.get('[placeholder="Jane Doe"]')
          .type(faker.person.fullName())

        // Populate email field within the inline form container
        cy.contains('div', 'Inline form').within(() => {
            cy.get('[placeholder="Email"]')
              .type(faker.internet.email())
        })

        // Accept terms checkbox
        cy.get('[type="checkbox"]')
          .eq(0)
          .check({ force: true })
          .should('be.checked')

        // Submit the inline form
        cy.contains('button', 'Submit').click()

        // Expected outcome:
        // Form submits successfully without validation errors
    })

    // Validates grid-based form submission using radio buttons
    it('Submits grid-based form successfully', () => {
        navigateTo.formLayoutsPage()

        // Enter email address
        cy.get('#inputEmail1')
          .type(faker.internet.email())

        // Select first radio option inside grid-based form
        cy.contains('nb-card', 'Using the Grid')
          .find('[type="radio"]')
          .then(radioButtons => {
              cy.wrap(radioButtons)
                .eq(0)
                .check({ force: true })
                .should('be.checked')
          })

        // Submit the grid form
        cy.contains('button', 'Sign in').click()

        // Expected outcome:
        // Grid-based form submits successfully
    })

    // Validates form submission when labels are not present
    it('Submits form without labels successfully', () => {
        const recipients = faker.person.fullName()
        const subject = faker.lorem.words(3)
        const message = faker.lorem.sentence(5)

        navigateTo.formLayoutsPage()

        // Ensure correct form section is visible
        cy.contains('nb-card', 'Form without labels')

        // Populate form fields relying on placeholders
        cy.get('[placeholder="Recipients"]')
          .type(recipients)
          .should('have.value', recipients)

        cy.get('[placeholder="Subject"]')
          .type(subject)
          .should('have.value', subject)

        cy.get('[placeholder="Message"]')
          .type(message)
          .should('have.value', message)

        // Submit the form
        cy.contains('button', 'Send').click()

        // Expected outcome:
        // Message form submits successfully
    })

    // Validates basic form submission with email and password
    it('Submits basic form successfully', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        navigateTo.formLayoutsPage()

        cy.contains('nb-card', 'Basic form')

        // Populate credentials
        cy.get('#exampleInputEmail1')
          .clear()
          .type(email)
          .should('have.value', email)

        cy.get('#exampleInputPassword1')
          .clear()
          .type(password)
          .should('have.value', password)

        // Accept remember-me checkbox
        cy.get('[type="checkbox"]')
          .eq(1)
          .check({ force: true })

        // Submit the basic form
        cy.contains('nb-card', 'Basic form')
          .contains('button', 'Submit')
          .click()

        // Expected outcome:
        // Basic form submits successfully
    })

    // Validates block layout form submission
    it('Submits block layout form successfully', () => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const email = faker.internet.email()
        const website = faker.internet.url()

        navigateTo.formLayoutsPage()

        // Scroll block form into view to ensure visibility
        cy.contains('nb-card', 'Block form')
          .scrollIntoView()

        // Populate all block form fields
        cy.get('#inputFirstName')
          .should('not.have.value')
          .type(firstName)
          .should('have.value', firstName)

        cy.get('#inputLastName')
          .should('not.have.value')
          .type(lastName)
          .should('have.value', lastName)

        cy.get('#inputEmail')
          .should('not.have.value')
          .type(email)
          .should('have.value', email)

        cy.get('#inputWebsite')
          .should('not.have.value')
          .type(website)
          .should('have.value', website)

        // Submit the block form
        cy.contains('nb-card', 'Block form')
          .contains('button', 'Submit')
          .click()

        // Expected outcome:
        // Block layout form submits successfully
    })

    // Validates horizontal form submission
    it('Submits horizontal form successfully', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        navigateTo.formLayoutsPage()

        // Scroll horizontal form into view
        cy.contains('nb-card', 'Horizontal form')
          .scrollIntoView()

        // Populate credentials
        cy.get('#inputEmail3')
          .should('not.have.value')
          .type(email)
          .should('have.value', email)

        cy.get('#inputPassword3')
          .should('not.have.value')
          .type(password)
          .should('have.value', password)

        // Accept terms checkbox
        cy.get('[type="checkbox"]')
          .eq(2)
          .check({ force: true })
          .should('be.checked')

        // Submit the horizontal form
        cy.contains('nb-card', 'Horizontal form')
          .contains('button', 'Sign in')
          .click()

        // Expected outcome:
        // Horizontal form submits successfully
    })
})
