/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Smart table data operations', () => {

       it('Updates age value in web table and verifies outcome', () => {

        const age = faker.number.int({ min: 18, max: 80 })

    navigateTo.smartTablePage()
           
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age.toString())
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', age.toString())
    })
})
    it('Adds a new row with random user data and verifies entry', () => {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

    navigateTo.smartTablePage()
        
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow1 => {
    cy.wrap(tableRow1).find('[placeholder="First Name"]').type(firstName)
    cy.wrap(tableRow1).find('[placeholder="Last Name"]').type(lastName)
    cy.wrap(tableRow1).find('.nb-checkmark').click()
})
cy.get('tbody tr').first().find('td').then(tableColumns => {
    cy.wrap(tableColumns).eq(2).should('have.text', firstName)
    cy.wrap(tableColumns).eq(3).should('have.text', lastName)

})
})
it('Updates entire table row with multiple fields and verifies all values', () => {

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const age = faker.number.int({ min: 18, max: 80 })
    const username = faker.internet.username()
    const email = faker.internet.email()

    navigateTo.smartTablePage()
    
    cy.get('tbody').contains('tr', 'Ruben').then(tablerows => {
        cy.wrap(tablerows).find('.nb-edit').click()
        cy.wrap(tablerows).find('[placeholder="First Name"]').clear().type(firstName)
        cy.wrap(tablerows).find('[placeholder="Last Name"]').clear().type(lastName)
        cy.wrap(tablerows).find('[placeholder="Age"]').clear().type(age.toString())
        cy.wrap(tablerows).find('[placeholder="Username"]').clear().type(username)
        cy.wrap(tablerows).find('[placeholder="E-mail"]').clear().type(email)
        cy.wrap(tablerows).find('.nb-checkmark').click()
        cy.wrap(tablerows)
        .should('contain', firstName)
        .and('contain', lastName)
        .and('contain', username)
        .and('contain', email)
        .and('contain',age.toString())
    })
})

it('Filters web table entries by age and verifies filtered results', () =>{
    
    navigateTo.smartTablePage()
    
    const ages = [20, 30, 40, 200]
    
   cy.wrap(ages).each(age => {
    cy.get('thead [placeholder="Age"]').clear().type(age)
    cy.wait(500)
    cy.get('tbody tr').each(tableRow => {
        if(age == 200){
            cy.wrap(tableRow).should('contain', 'No data found')
        } else {
        cy.wrap(tableRow).find('td').eq(6).should('have.text', age.toString())
        }
    })
   })
})

})

