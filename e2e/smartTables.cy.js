/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

// Ensure a clean application state before each test
beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Smart Table Data Operations', () => {

    // Validates updating a single field (age) in an existing table row
    it('Updates age value in web table and verifies outcome', () => {
        const age = faker.number.int({ min: 18, max: 80 })

        navigateTo.smartTablePage()

        // Locate specific row by unique identifier and enable edit mode
        cy.get('tbody')
          .contains('tr', 'Larry')
          .then(tableRow => {
              cy.wrap(tableRow).find('.nb-edit').click()

              // Update age field
              cy.wrap(tableRow)
                .find('[placeholder="Age"]')
                .clear()
                .type(age.toString())

              // Save changes
              cy.wrap(tableRow).find('.nb-checkmark').click()

              // Verify updated age value in table
              cy.wrap(tableRow)
                .find('td')
                .last()
                .should('have.text', age.toString())
          })

        // Expected outcome:
        // Age value is successfully updated for the selected row
    })

    // Validates adding a new table row with dynamically generated data
    it('Adds a new row with random user data and verifies entry', () => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        navigateTo.smartTablePage()

        // Trigger new row creation
        cy.get('.nb-plus').click()

        // Populate new row fields in the table header
        cy.get('thead tr')
          .eq(2)
          .then(tableRow => {
              cy.wrap(tableRow)
                .find('[placeholder="First Name"]')
                .type(firstName)

              cy.wrap(tableRow)
                .find('[placeholder="Last Name"]')
                .type(lastName)

              // Save new entry
              cy.wrap(tableRow).find('.nb-checkmark').click()
          })

        // Verify new row appears in table body
        cy.get('tbody tr')
          .first()
          .find('td')
          .then(tableColumns => {
              cy.wrap(tableColumns).eq(2).should('have.text', firstName)
              cy.wrap(tableColumns).eq(3).should('have.text', lastName)
          })

        // Expected outcome:
        // New user record is added and visible in the table
    })

    // Validates updating multiple fields within a single table row
    it('Updates entire table row with multiple fields and verifies all values', () => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const age = faker.number.int({ min: 18, max: 80 })
        const username = faker.internet.username()
        const email = faker.internet.email()

        navigateTo.smartTablePage()

        // Locate row and enter edit mode
        cy.get('tbody')
          .contains('tr', 'Ruben')
          .then(tableRow => {
              cy.wrap(tableRow).find('.nb-edit').click()

              // Update all editable fields
              cy.wrap(tableRow).find('[placeholder="First Name"]').clear().type(firstName)
              cy.wrap(tableRow).find('[placeholder="Last Name"]').clear().type(lastName)
              cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age.toString())
              cy.wrap(tableRow).find('[placeholder="Username"]').clear().type(username)
              cy.wrap(tableRow).find('[placeholder="E-mail"]').clear().type(email)

              // Save changes
              cy.wrap(tableRow).find('.nb-checkmark').click()

              // Verify all updated values are reflected in the row
              cy.wrap(tableRow)
                .should('contain', firstName)
                .and('contain', lastName)
                .and('contain', username)
                .and('contain', email)
                .and('contain', age.toString())
          })

        // Expected outcome:
        // All updated fields are persisted and visible
    })

    // Validates table filtering behavior based on age input
    it('Filters web table entries by age and verifies filtered results', () => {
        navigateTo.smartTablePage()

        const ages = [20, 30, 40, 200]

        // Iterate through multiple filter values
        cy.wrap(ages).each(age => {
            cy.get('thead [placeholder="Age"]')
              .clear()
              .type(age)

            // Small wait to allow table refresh
            cy.wait(500)

            cy.get('tbody tr').each(tableRow => {
                if (age === 200) {
                    // Validate empty state when no matching records exist
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    // Validate all rows match the filtered age
                    cy.wrap(tableRow)
                      .find('td')
                      .eq(6)
                      .should('have.text', age.toString())
                }
            })
        })

        // Expected outcome:
        // Table correctly filters results and handles empty states
    })
})
