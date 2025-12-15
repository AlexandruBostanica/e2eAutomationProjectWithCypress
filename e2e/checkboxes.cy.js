/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Checkbox behavior', () => {

it('Checks and unchecks multiple checkboxes with expected state changes', () => {
    
    navigateTo.toastrPage()
    
    cy.get('[type="checkbox"]').then(checkboxes => {
        cy.wrap(checkboxes).eq(0).check({force:true}).should('be.checked')
        cy.wrap(checkboxes).eq(1).check({force:true}).should('be.checked')
        cy.wrap(checkboxes).eq(2).check({force:true}).should('be.checked')
        cy.wrap(checkboxes).eq(0).uncheck({force:true}).should('not.be.checked')
        cy.wrap(checkboxes).eq(1).uncheck({force:true}).should('not.be.checked')
        cy.wrap(checkboxes).eq(2).uncheck({force:true}).should('not.be.checked')
  })
})

})
