/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Open the application before each test to ensure a consistent starting state
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Slider Control Interaction', () => {

    // Validates that a temperature slider can be adjusted
    // and that the selected value is correctly reflected in the UI
    it('Adjusts temperature slider to specific value and verifies display', () => {

        // Interact directly with the SVG slider handle by manipulating its coordinates
        // This approach is commonly used when sliders do not support standard input events
        cy.get('[tabtitle="Temperature"] circle')
          .invoke('attr', 'cx', '267.66')
          .invoke('attr', 'cy', '170.58')
          .click()

        // Verify that the displayed temperature value updates accordingly
        cy.get('[class="value temperature h1"]')
          .should('contain.text', '28')

        // Expected outcome:
        // Slider reflects the new value and UI displays the updated temperature
    })
})

