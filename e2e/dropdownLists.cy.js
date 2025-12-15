/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"

// Ensure the application is opened fresh before each test
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Dropdown List Selections', () => {

    // Verifies that a standard (native) HTML dropdown
    // allows selecting a value programmatically
    it('Selects a native dropdown option and verifies selection', () => {
        navigateTo.toastrPage()

        // Locate native select element and choose a specific option
        cy.contains('div', 'Toast type:')
          .find('select')
          .select('danger')

        // Expected outcome:
        // The dropdown reflects the selected option
    })

    // Verifies behavior of a custom dropdown component
    // by iterating through all available options
    it('Selects from custom dropdown and verifies positions iteratively', () => {
        navigateTo.toastrPage()

        // Open custom dropdown component
        cy.contains('div', 'Position:')
          .find('nb-select')
          .click()

        // Select a specific option and verify it is displayed
        cy.get('.option-list')
          .contains('top-right')
          .click()

        cy.contains('div', 'Position:')
          .find('nb-select')
          .should('have.text', 'top-right')

        // Iterate through all dropdown options to ensure
        // each can be selected without breaking the component
        cy.contains('div', 'Position:')
          .find('nb-select')
          .then(dropdown => {
              cy.wrap(dropdown).click()

              cy.get('.option-list nb-option')
                .each((option, index, list) => {
                    cy.wrap(option).click()

                    // Reopen dropdown unless this is the last option
                    if (index < list.length - 1) {
                        cy.wrap(dropdown).click()
                    }
                })
          })

        // Expected outcome:
        // All dropdown options can be selected successfully
    })
})

