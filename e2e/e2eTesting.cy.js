/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"
import { faker } from '@faker-js/faker';

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Authentification', () => {

    it('Succe', () => {
    navigateTo.registerPage()
    cy.register()
})
    it('login', () => {
    navigateTo.loginPage()
    cy.login()
    })

})

describe('Forms', () => {

it('Inline form', () => {
    navigateTo.formLayoutsPage() 
    cy.submitInlineForm()
})

it('Using the Grid', () => {
    navigateTo.formLayoutsPage() 
    cy.submitUsingTheGrid()
})

it('Form without labels', () => {
    navigateTo.formLayoutsPage() 
    cy.submitFormWithoutLabels()
})

it('Basic form', () => {
    navigateTo.formLayoutsPage()
    cy.submitBasicForm()
})

it('Block form', () => {
    navigateTo.formLayoutsPage()
    cy.submitBlockForm()
})

it('Horizontal form', () => {
    navigateTo.formLayoutsPage()
    cy.submitHorizontalForm()  
})
})

describe('Dialogs', () => {

it('Open dialog with component', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithComponent()
})

it('Open dialog with template', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithTemplate()
})

it('Open dialog with delay 3s', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithDelay3s()
})

it('Open dialog with delay 10s', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithDelay10s()
})

it('Iframe dialog with esc close', () => {
    navigateTo.dialogsPage()
    cy.openIframeWithEscClose()
    })

 it('Iframe dialog without esc close', () => {
    navigateTo.dialogsPage()
    cy.openIframeWithoutEscClose()

    })
it('Open Dialog with backdrop click', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithBackdropClick()
    
})

it('Open without backdrop click', () => {
    navigateTo.dialogsPage()
    cy.openDialogWithoutBackdropClick()

})

it('Open random dialog', () => {
    navigateTo.dialogsPage()
    cy.openRandomDialog()
})

it('Native browser dialog box with default click', () => {
    navigateTo.smartTablePage()
    cy.triggerNativeDialog()
})

it('Native browser dialog box with boolean', () => {
    navigateTo.smartTablePage()
    cy.triggerNativeDialog1()
})
})

describe('Checkboxes', () => {

it('Multiple checkboxes with assertions', () => {
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

describe('Radio buttons', () => {

it('Multiple radio buttons with assertions', () => {
    navigateTo.formLayoutsPage()
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
        cy.wrap(radioButtons).eq(1).check({force:true}).should('be.checked')
        cy.wrap(radioButtons).eq(0).should('not.be.checked')
        cy.wrap(radioButtons).eq(2).should('be.disabled')
    })
})
})

describe('Sliders', () => {

    it('Slide the circle by invoking attr', () => {
    cy.visit('https://playground.bondaracademy.com/')
    cy.get('[tabtitle="Temperature"] circle')
    .invoke('attr', 'cx', '267.66')
    .invoke('attr', 'cy', '170.58')
    .click()
    cy.get('[class="value temperature h1"]').should('contain.text', '28')
})
})

describe('Tooltips', () => {

    it('Tooltip with text', () => {
    navigateTo.tooltipPage()
    cy.contains('Show Tooltip').trigger('mouseenter')
    cy.get('#cdk-overlay-0').contains('This is a tooltip').should('be.visible')
    })

    it('Tooltip with Icon', () => {
    navigateTo.tooltipPage()
    cy.get('[nbtooltipicon="alert-triangle"]').trigger('mouseenter')
    cy.get('#cdk-overlay-0').find('svg').should('be.visible')
    })
   
    describe('Drop down lists', () => {

    it('Native drop down list', () => {
    navigateTo.toastrPage()
    cy.contains('div', 'Toast type:').find('select').select('danger')
        })

    it('Custom drop down list', () => {
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
})

describe('Drag and drop', () => {

    it('Drag one item', () => {
  navigateTo.dragAndDropPage()
    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    })

    it('Drag all items', () => {
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
describe('Web tables', () => {

       it('Updating some data in a web table', () => {

        const age = faker.number.int({ min: 18, max: 80 })

    navigateTo.smartTablePage()
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age.toString())
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', age.toString())
    })
})
    it('Add new row in a table by using index', () => {

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
it('Updating entire row data in table', () => {

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

it('Filtering data in table', () =>{
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


