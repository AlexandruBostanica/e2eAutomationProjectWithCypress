/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Slider control interaction', () => {

    it('Adjusts temperature slider to specific value and verifies display', () => {
    cy.visit('https://playground.bondaracademy.com/')
    cy.get('[tabtitle="Temperature"] circle')
    .invoke('attr', 'cx', '267.66')
    .invoke('attr', 'cy', '170.58')
    .click()
    cy.get('[class="value temperature h1"]').should('contain.text', '28')
})
})