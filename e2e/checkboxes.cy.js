/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Runs before each test to ensure a clean starting point
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Checkbox Behavior', () => {

    // Validates that multiple checkboxes can be checked and unchecked
    // and that their state updates correctly in the UI
    it('Checks and unchecks multiple checkboxes with expected state changes', () => {

        // Navigate to the page containing checkbox elements
        navigateTo.toastrPage()

        // Retrieve all checkbox elements on the page
        cy.get('[type="checkbox"]').then(checkboxes => {

            // Check each checkbox and verify it becomes checked
            cy.wrap(checkboxes).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(checkboxes).eq(1).check({ force: true }).should('be.checked')
            cy.wrap(checkboxes).eq(2).check({ force: true }).should('be.checked')

            // Uncheck each checkbox and verify it becomes unchecked
            cy.wrap(checkboxes).eq(0).uncheck({ force: true }).should('not.be.checked')
            cy.wrap(checkboxes).eq(1).uncheck({ force: true }).should('not.be.checked')
            cy.wrap(checkboxes).eq(2).uncheck({ force: true }).should('not.be.checked')
        })
    })
})
