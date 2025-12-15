/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Tooltip Visibility', () => {

    it('Shows tooltip text on hover', () => {
    navigateTo.tooltipPage()
    cy.contains('Show Tooltip').trigger('mouseenter')
    cy.get('#cdk-overlay-0').contains('This is a tooltip').should('be.visible')
    })

    it('Displays tooltip icon on hover with SVG visibility', () => {
    navigateTo.tooltipPage()
    cy.get('[nbtooltipicon="alert-triangle"]').trigger('mouseenter')
    cy.get('#cdk-overlay-0').find('svg').should('be.visible')
    })
})