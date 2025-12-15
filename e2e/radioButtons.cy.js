/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Open the application before each test to ensure a clean state
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Radio Button Selection', () => {

    // Validates radio button behavior:
    // - Only one option can be selected at a time
    // - Previously selected options are deselected automatically
    // - Disabled options cannot be selected
    it('Selects and verifies radio options with expected enabled/disabled states', () => {
        navigateTo.formLayoutsPage()

        // Target radio buttons inside the grid-based form
        cy.contains('nb-card', 'Using the Grid')
          .find('[type="radio"]')
          .then(radioButtons => {

              // Select first radio option
              cy.wrap(radioButtons)
                .eq(0)
                .check({ force: true })
                .should('be.checked')

              // Select second radio option
              cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })
                .should('be.checked')

              // Verify first option is deselected
              cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked')

              // Verify third option is disabled
              cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
          })

        // Expected outcome:
        // Radio group enforces single selection and respects disabled states
    })
})
