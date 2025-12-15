/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Authentication Flows', () => {

    // Test: Registration workflow for a new user
    it('Registers a new user with valid data', () => {
        // Generate random user data to simulate realistic input
        const fullName = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        // Navigate to the registration page
        navigateTo.registerPage()

        // Fill in the registration form fields
        cy.get('[placeholder="Full name"]')
          .type(fullName)
          .should('have.value', fullName)  // Verify full name input
        cy.get('[placeholder="Email address"]')
          .type(email)
          .should('have.value', email)     // Verify email input
        cy.get('[placeholder="Password"]')
          .type(password)
          .should('have.value', password)  // Verify password input
        cy.get('[placeholder="Confirm Password"]')
          .type(password)
          .should('have.value', password)  // Verify password confirmation

        // Check terms & conditions checkbox
        cy.get('[type="checkbox"]')
          .check({ force: true })
          .should('be.checked')            // Verify checkbox is selected

        // Submit the registration form
        cy.contains('button', ' Register ').click()
        // Expected outcome: user is successfully registered (e.g., redirected or success message)
    })

    // Test: Login workflow for an existing user
    it('Logs in an existing user with valid credentials', () => {
        // Generate random credentials (simulate login input; replace with valid test data in real scenario)
        const email = faker.internet.email()
        const password = faker.internet.password()

        // Navigate to the login page
        navigateTo.loginPage()
        
        // Fill in login form fields
        cy.get('[placeholder="Email address"]')
          .type(email)
          .should('have.value', email)     // Verify email input
        cy.get('[placeholder="Password"]')
          .type(password)
          .should('have.value', password)  // Verify password input

        // Submit the login form
        cy.contains('button', ' Log In ').click()
        // Expected outcome: user is successfully logged in (e.g., dashboard page appears)
    })
})
