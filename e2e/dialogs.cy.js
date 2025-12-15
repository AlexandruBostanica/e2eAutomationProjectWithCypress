/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Ensure the application starts from a clean state before each test
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Dialog Interactions', () => {

    // Verifies that a dialog built using a component opens and closes correctly
    it('Opens component dialog successfully', () => {
        navigateTo.dialogsPage()

        // Open dialog and dismiss it using the provided action
        cy.contains('Open Dialog with component').click()
        cy.contains('Dismiss Dialog').click()

        // Validate that dialog is closed and trigger button is visible again
        cy.contains('Open Dialog with component').should('be.visible')
    })

    // Verifies that a dialog created from a template opens and closes correctly
    it('Opens template dialog successfully', () => {
        navigateTo.dialogsPage()

        cy.contains('Open Dialog with template').click()
        cy.contains('button', 'OK').click()

        // Ensure the UI returns to its initial state
        cy.contains('Open Dialog with component').should('be.visible')
    })

    // Verifies dialog behavior when opened with a short delay
    it('Opens delayed dialog after 3 seconds', () => {
        navigateTo.dialogsPage()

        cy.contains('Open with delay 3 seconds').click()
        cy.contains('OK').click()

        // Confirm dialog can be dismissed after delay
        cy.contains('Open with delay 3 seconds').should('be.visible')
    })

    // Verifies dialog behavior when opened with a longer delay
    it('Opens delayed dialog after 10 seconds', () => {
        navigateTo.dialogsPage()

        cy.contains('Open with delay 10 seconds').click()

        // Explicit wait used here to handle known delay scenario
        cy.wait(10000)

        cy.contains('OK').click()
        cy.contains('Open with delay 10 seconds').should('be.visible')
    })

    // Validates that dialogs embedded in iframes can be closed using the ESC key
    it('Closes iframe dialog using ESC key', () => {
        navigateTo.dialogsPage()

        // Ensure iframe is fully loaded before interacting
        cy.frameLoaded('[data-cy="esc-close-iframe"]')

        // Open dialog inside iframe
        cy.iframe('[data-cy="esc-close-iframe"]')
          .contains('Open Dialog with esc close')
          .click()

        // Simulate ESC key press
        cy.realPress('Escape')

        // Verify dialog is closed
        cy.iframe('[data-cy="esc-close-iframe"]')
          .contains('Open Dialog with esc close')
          .should('be.visible')
    })

    // Validates behavior when ESC key closing is disabled for iframe dialogs
    it('Closes iframe dialog when ESC key is disabled', () => {
        navigateTo.dialogsPage()

        cy.frameLoaded('[data-cy="esc-close-iframe"]')

        // Open dialog that does not allow ESC key closing
        cy.iframe('[data-cy="esc-close-iframe"]')
          .contains('Open Dialog without esc close')
          .click()

        // Dialog should only close via explicit confirmation
        cy.contains('OK').click()

        cy.iframe('[data-cy="esc-close-iframe"]')
          .contains('Open Dialog without esc close')
          .should('be.visible')
    })

    // Verifies that dialogs configured with backdrop click can be dismissed by clicking outside
    it('Open and close dialog with backdrop click enabled', () => {
        navigateTo.dialogsPage()

        cy.contains('Open Dialog with backdrop click').click()

        // Force click to simulate backdrop interaction
        cy.contains('Dismiss Dialog').click({ force: true })

        // Dialog should be fully dismissed
        cy.contains('Dismiss Dialog').should('not.exist')
    })

    // Verifies dialogs that explicitly disable backdrop click behavior
    it('Open and close dialog with backdrop click disabled', () => {
        navigateTo.dialogsPage()

        cy.contains('Open without backdrop click').click()
        cy.contains('button', 'OK').click()

        // Ensure dialog closes only via explicit action
        cy.contains('Open without backdrop click').should('be.visible')
    })

    // Validates dynamic dialog behavior and data persistence
    it('Opens a random dialog instance successfully', () => {
        const name = faker.person.fullName()

        navigateTo.dialogsPage()

        // Open dialog that may vary in content
        cy.contains('Enter Name').click()

        // Conditional handling depending on which dialog appears
        cy.get('body').then($body => {
            if ($body.find('button:contains(\"OK\")').length) {
                cy.contains('OK').click()
            }
        })

        // Enter random name and submit
        cy.get('[placeholder="Name"]').type(name)
        cy.contains('button', 'Submit').click()

        // Verify submitted data appears in the UI
        cy.contains('h3', 'Names:')
          .parent()
          .within(() => {
              cy.get('li').should('contain.text', name)
          })
    })

    // Verifies default browser confirmation dialog is triggered on delete action
    it('Triggers native browser confirmation dialog by default', () => {
        navigateTo.smartTablePage()

        cy.get('.nb-trash').first().click()

        // Assert confirmation dialog text
        cy.on('window:confirm', confirm => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })
    })

    // Verifies custom handling of native browser confirmation dialogs
    it('Triggers native browser confirmation dialog with custom boolean handling', () => {
        navigateTo.smartTablePage()

        // Stub confirm dialog to simulate user cancel action
        cy.window().then(window => {
            cy.stub(window, 'confirm').as('dialog').returns(false)
        })

        cy.get('.nb-trash').first().click()

        // Verify confirm dialog was triggered with correct message
        cy.get('@dialog')
          .should('be.calledWith', 'Are you sure you want to delete?')
    })
})
