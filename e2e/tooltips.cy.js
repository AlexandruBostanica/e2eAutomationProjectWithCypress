/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"

// Open the application before each test to ensure consistent state
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Tooltip Visibility', () => {

    // Verifies that tooltip text appears when hovering over a trigger element
    it('Shows tooltip text on hover', () => {
        navigateTo.tooltipPage()

        // Trigger mouse hover event on tooltip activator
        cy.contains('Show Tooltip')
          .trigger('mouseenter')

        // Validate tooltip overlay is visible and contains expected text
        cy.get('#cdk-overlay-0')
          .contains('This is a tooltip')
          .should('be.visible')

        // Expected outcome:
        // Tooltip text is displayed when user hovers over the element
    })

    // Verifies that tooltip icon (SVG) appears correctly on hover
    it('Displays tooltip icon on hover with SVG visibility', () => {
        navigateTo.tooltipPage()

        // Hover over element with tooltip icon
        cy.get('[nbtooltipicon="alert-triangle"]')
          .trigger('mouseenter')

        // Validate SVG icon inside tooltip overlay is visible
        cy.get('#cdk-overlay-0')
          .find('svg')
          .should('be.visible')

        // Expected outcome:
        // Tooltip icon renders correctly on hover
    })
})

