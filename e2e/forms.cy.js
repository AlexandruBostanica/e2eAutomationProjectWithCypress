/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})


describe('Form Submission Scenarios', () => {

it('Submits inline form successfully', () => {

    navigateTo.formLayoutsPage() 

    cy.get('[placeholder="Jane Doe"]').type(faker.person.fullName())
    cy.contains('div', 'Inline form').within(() =>{
    cy.get('[placeholder="Email"]').type(faker.internet.email())
    })
    cy.get('[type="checkbox"]').eq(0).check({force:true}).should('be.checked')
    cy.contains('button', 'Submit').click()
})

it('Submits grid-based form successfully', () => {
    navigateTo.formLayoutsPage() 
    cy.get('#inputEmail1').type(faker.internet.email())
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
        })
    cy.contains('button', 'Sign in').click()

it('Submits form without labels successfully', () => {
    const recipients = faker.person.fullName()
    const subject = faker.lorem.words(3)
    const message = faker.lorem.sentence(5)
   
    navigateTo.formLayoutsPage() 

    cy.contains('nb-card', 'Form without labels')
    cy.get('[placeholder="Recipients"]').type(recipients).should('have.value', recipients)
    cy.get('[placeholder="Subject"]').type(subject).should('have.value', subject)
    cy.get('[placeholder="Message"]').type(message).should('have.value',message)
    cy.contains('button', 'Send').click()
})

it('Submits basic form successfully', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    
    navigateTo.formLayoutsPage()

    cy.contains('nb-card', 'Basic form')
    cy.get('#exampleInputEmail1').clear().type(email).should('have.value', email)
    cy.get('#exampleInputPassword1').clear().type(password).should('have.value', password)
    cy.get('[type="checkbox"]').eq(1).check({force:true})
    cy.contains('nb-card', 'Basic form').contains('button', 'Submit').click()
})

it('Submits block layout form successfully', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const website = faker.internet.url()
   
    navigateTo.formLayoutsPage()

    cy.contains('nb-card', 'Block form')
    .scrollIntoView
    cy.get('#inputFirstName').should('not.have.value').type(firstName).should('have.value', firstName)
    cy.get('#inputLastName').should('not.have.value').type(lastName).should('have.value', lastName)
    cy.get('#inputEmail').should('not.have.value').type(email).should('have.value', email)
    cy.get('#inputWebsite').should('not.have.value').type(website).should('have.value', website)
    cy.contains('nb-card', 'Block form').contains('button', 'Submit').click()
})

it('Submits horizontal form successfully', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    
    navigateTo.formLayoutsPage()

    cy.contains('nb-card', 'Horizontal form')
    .scrollIntoView
    cy.get('#inputEmail3').should('not.have.value').type(email).should('have.value', email)
    cy.get('#inputPassword3').should('not.have.value').type(password).should('have.value', password)
    cy.get('[type="checkbox"]').eq(2).check({force:true}).should('be.checked')
    cy.contains('nb-card', 'Horizontal form').contains('button', 'Sign in').click()  
})
})
})