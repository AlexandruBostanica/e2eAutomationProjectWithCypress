/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Drag and drop operations', () => {

    it('Drags a single todo item into drop zone', () => {
  navigateTo.dragAndDropPage()
    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    })

    it('Drags all todo items into drop zone in sequence', () => {
    navigateTo.dragAndDropPage() 
    cy.get('#todo-list').contains('Get groceries').trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    cy.get('#todo-list').contains('Feed the dog').trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    cy.get('#todo-list').contains('Clean my room').trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    cy.get('#todo-list').contains('Hangout with friends').trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    })
})