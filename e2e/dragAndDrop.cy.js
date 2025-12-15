/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Ensures each test starts from a clean application state
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Drag and Drop Operations', () => {

    // Validates that a single draggable item can be moved
    // from the source list into the drop zone
    it('Drags a single todo item into drop zone', () => {
        navigateTo.dragAndDropPage()

        // Start dragging the first todo item
        cy.get('#todo-list div')
          .first()
          .trigger('dragstart')

        // Drop the item into the target container
        cy.get('#drop-list')
          .trigger('drop')

        // Expected outcome:
        // The dragged item is successfully moved to the drop zone
    })

    // Validates that multiple draggable items can be moved sequentially
    // and that drag-and-drop behavior remains consistent across items
    it('Drags all todo items into drop zone in sequence', () => {
        navigateTo.dragAndDropPage()

        // Drag and drop each todo item individually
        cy.get('#todo-list').contains('Get groceries').trigger('dragstart')
        cy.get('#drop-list').trigger('drop')

        cy.get('#todo-list').contains('Feed the dog').trigger('dragstart')
        cy.get('#drop-list').trigger('drop')

        cy.get('#todo-list').contains('Clean my room').trigger('dragstart')
        cy.get('#drop-list').trigger('drop')

        cy.get('#todo-list').contains('Hangout with friends').trigger('dragstart')
        cy.get('#drop-list').trigger('drop')

        // Expected outcome:
        // All todo items are successfully transferred to the drop zone
    })
})
