/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Dialog Interactions', () => {

it('Opens component dialog successfully', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open Dialog with component').click()
    cy.contains('Dismiss Dialog').click()
    cy.contains('Open Dialog with component').should('be.visible')
})

it('Opens template dialog successfully', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open Dialog with template').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open Dialog with component').should('be.visible')
})

it('Opens delayed dialog after 3 seconds', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open with delay 3 seconds').click()
    cy.contains('OK').click()
    cy.contains('Open with delay 3 seconds').should('be.visible')
})

it('Opens delayed dialog after 10 seconds', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open with delay 10 seconds').click()
    cy.wait(10000)
    cy.contains('OK').click()
    cy.contains('Open with delay 10 seconds').should('be.visible')
})

it('Closes iframe dialog using ESC key', () => {
    
    navigateTo.dialogsPage()

    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.realPress('Escape');
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').should('be.visible');
    })

 it('Closes iframe dialog when ESC key is disabled', () => {
     
    navigateTo.dialogsPage()

    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').click()
    cy.contains('OK').click()
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').should('be.visible');

    })
it('Open and close dialog with backdrop click enabled', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open Dialog with backdrop click').click()
    cy.contains('Dismiss Dialog').click({ force: true });
    cy.contains('Dismiss Dialog').should('not.exist');
    
})

it('Open and close dialog with backdrop click disabled', () => {
    
    navigateTo.dialogsPage()

    cy.contains('Open without backdrop click').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open without backdrop click').should('be.visible')

})

it('Opens a random dialog instance successfully', () => {
    const name = faker.person.fullName()
   
    navigateTo.dialogsPage()
  
    cy.contains('Enter Name').click()
    cy.get('body').then($body => { // condition that checks what dialog opens
  if ($body.find('button:contains("OK")').length) {
    cy.contains('OK').click();
  } 
    cy.get('[placeholder="Name"]').type(name);
    cy.contains('button', 'Submit').click();
})
    cy.contains('h3', 'Names:')
  .parent()
  .within(() => {
    cy.get('li').should('contain.text', name);
  })
})

it('Triggers native browser confirmation dialog by default', () => {
    
    navigateTo.smartTablePage()

 cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
    expect(confirm).to.equal('Are you sure you want to delete?')
    })
})

it('Triggers native browser confirmation dialog with custom boolean handling', () => {
    
    navigateTo.smartTablePage()
    
 cy.get('.nb-trash').first().click()
    cy.window().then( window => {
    cy.stub(window, 'confirm').as('dialog').returns(false)
    })
    cy.get('.nb-trash').first().click()
    cy.get('@dialog').should('be.calledWith', 'Are you sure you want to delete?')
})

})
