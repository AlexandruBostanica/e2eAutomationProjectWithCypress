/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Dropdown list selections', () => {

    it('Selects a native dropdown option and verifies selection', () => {
        
    navigateTo.toastrPage()
        
    cy.contains('div', 'Toast type:').find('select').select('danger')
        })

    it('Selects from custom dropdown and verifies positions iteratively', () => {
        
    navigateTo.toastrPage()
        
cy.contains('div', 'Position:').find('nb-select').click()
cy.get('.option-list').contains('top-right').click()
cy.contains('div', 'Position:').find('nb-select').should('have.text', 'top-right')
cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
    cy.wrap(dropdown).click()
    cy.get('.option-list nb-option').each((option, index, list)=> {
        cy.wrap(option).click()
        if(index < list.length-1)
        cy.wrap(dropdown).click()
            })
        })
    })
})

