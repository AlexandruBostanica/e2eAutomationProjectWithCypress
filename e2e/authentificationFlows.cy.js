/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Authentication Flows', () => {

    it('Registers a new user with valid data', () => {
  const fullName = faker.person.fullName()
  const email = faker.internet.email()
  const password = faker.internet.password()

    navigateTo.registerPage()

    cy.get('[placeholder="Full name"]').type(fullName).should('have.value', fullName)
    cy.get('[placeholder="Email address"]').type(email).should('have.value', email)
    cy.get('[placeholder="Password"]').type(password).should('have.value', password)
    cy.get('[placeholder="Confirm Password"]').type(password).should('have.value', password)
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.contains('button', ' Register ').click()
})
    it('Logs in an existing user with valid credentials', () => {
  const email = faker.internet.email()
  const password = faker.internet.password()

  navigateTo.loginPage()
    
    cy.get('[placeholder="Email address"]').type(email).should('have.value', email)
    cy.get('[placeholder="Password"]').type(password).should('have.value', password)
    cy.contains('button', ' Log In ').click()
 })
})