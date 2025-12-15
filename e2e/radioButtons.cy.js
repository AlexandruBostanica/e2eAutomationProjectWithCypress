/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Radio button selection', () => {

it('Selects and verifies radio options with expected enabled/disabled states', () => {
    
    navigateTo.formLayoutsPage()
    
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
        cy.wrap(radioButtons).eq(1).check({force:true}).should('be.checked')
        cy.wrap(radioButtons).eq(0).should('not.be.checked')
        cy.wrap(radioButtons).eq(2).should('be.disabled')
    })
})

})
