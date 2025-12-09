/// <reference types="cypress" />

import { navigateTo } from "../page-objects/POMnavigationPage"

beforeEach('Open application', () => {
    cy.visit('/')
})

describe('Authentification', () => {

    it('Register', () => {
    navigateTo.registerPage()
    cy.get('[placeholder="Full name"]').type('John Doe')
    cy.get('[placeholder="Email address"]').type('johndoe@test.com')
    cy.get('[placeholder="Password"]').type('password123')
    cy.get('[placeholder="Confirm Password"]').type('password123')
    cy.get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.contains('button', ' Register ').click()
})
    it('Login', () => {
    navigateTo.loginPage()
    cy.get('[placeholder="Email address"]').type('johndoe@test.com')
    cy.get('[placeholder="Password"]').type('password123')
    cy.contains('button', ' Log In ').click()
    })

})

describe('Forms', () => {

it('Inline form', () => {
    navigateTo.formLayoutsPage() 
    cy.contains('div', 'Inline form')
    .get('[placeholder="Jane Doe"]').type('Jane Doe')
    cy.contains('div', 'Inline form').within(() =>{
    cy.get('[placeholder="Email"]').type('John Doe')
    })
    .get('[type="checkbox"]').check({force:true}).should('be.checked')
    cy.contains('button', 'Submit').click()
})

it('Using the Grid', () => {
    navigateTo.formLayoutsPage() 
    cy.get('#inputEmail1').type('test@test.com')
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
        })
    cy.contains('button', 'Sign in').click()
})

it('Form without labels', () => {
    navigateTo.formLayoutsPage() 
    cy.contains('nb-card', 'Form without labels')
    cy.get('[placeholder="Recipients"]').type('test@test.com').should('have.value', 'test@test.com')
    cy.get('[placeholder="Subject"]').type('subject1').should('have.value', 'subject1')
    cy.get('[placeholder="Message"]').type('message1').should('have.value', 'message1')
    cy.contains('button', 'Send').click()
})

it('Basic form', () => {
    navigateTo.formLayoutsPage()
    cy.contains('nb-card', 'Basic form')
    cy.get('#exampleInputEmail1').type('randomname@test.com')
    cy.get('#exampleInputPassword1').type('randompassword')
    cy.get('[type="checkbox"]').eq(1).check({force:true})
    cy.contains('nb-card', 'Basic form').contains('button', 'Submit').click()
})

it('Block form', () => {
    navigateTo.formLayoutsPage()
    cy.contains('nb-card', 'Block form')
    .scrollIntoView
    cy.get('#inputFirstName').should('not.have.value').type('John') //assert that the input does not have any value before typing
    cy.get('#inputLastName').should('not.have.value').type('Doe')
    cy.get('#inputEmail').should('not.have.value').type('test@test.com')
    cy.get('#inputWebsite').should('not.have.value').type('www.test.com')
    cy.contains('nb-card', 'Block form').contains('button', 'Submit').click()
})
it('Horizontal form', () => {
    navigateTo.formLayoutsPage()
    cy.contains('nb-card', 'Horizontal form')
    .scrollIntoView
    cy.get('#inputEmail3').should('not.have.value').type('test@test.com')
    cy.get('#inputPassword3').should('not.have.value').type('randompassword')
    cy.get('[type="checkbox"]').eq(2).check({force:true}).should('be.checked')
    cy.contains('nb-card', 'Horizontal form').contains('button', 'Sign in').click()  
})
})

describe('Dialogs', () => {

it('Open dialog with component', () => {
    navigateTo.dialogsPage()
    cy.contains('Open Dialog with component').click()
    cy.contains('Dismiss Dialog').click()
    cy.contains('Open Dialog with component').should('be.visible')
})

it('Open dialog with template', () => {
    navigateTo.dialogsPage()
    cy.contains('Open Dialog with template').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open Dialog with component').should('be.visible')
})

it('Open dialog with delay 3s', () => {
    navigateTo.dialogsPage()
    cy.contains('Open with delay 3 seconds').click()
    cy.contains('OK').click()
    cy.contains('Open with delay 3 seconds').should('be.visible')
})

it('Open dialog with delay 10s', () => {
    navigateTo.dialogsPage()
    cy.contains('Open with delay 10 seconds').click()
    cy.wait(10000) // hardcoded when absolutely necessary
    cy.contains('OK').click()
    cy.contains('Open with delay 10 seconds').should('be.visible')
})

it('Iframe dialog with esc close', () => {
    navigateTo.dialogsPage()
    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.realPress('Escape');
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').should('be.visible');
    })

 it('Iframe dialog without esc close', () => {
    navigateTo.dialogsPage()
    cy.frameLoaded('[data-cy="esc-close-iframe"]')
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').click()
    cy.contains('OK').click()
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog without esc close').should('be.visible');

    })
it('Open Dialog with backdrop click', () => {
    navigateTo.dialogsPage()
    cy.contains('Open Dialog with backdrop click').click()
    cy.contains('Dismiss Dialog').click({ force: true });
    cy.contains('Dismiss Dialog').should('not.exist');
    
})

it('Open without backdrop click', () => {
    navigateTo.dialogsPage()
    cy.contains('Open without backdrop click').click()
    cy.contains('button', 'OK').click()
    cy.contains('Open without backdrop click').should('be.visible')

})

it('Open random dialog', () => {
    navigateTo.dialogsPage()
    cy.contains('Enter Name').click()
cy.get('body').then($body => { // condition that checks what dialog opens
  if ($body.find('button:contains("OK")').length) {
    cy.contains('OK').click();
  } 
    cy.get('[placeholder="Name"]').type('Random');
    cy.contains('button', 'Submit').click();
})
    cy.contains('h3', 'Names:')
  .parent()
  .within(() => {
    cy.get('li').should('contain.text', 'Random');
  })
})

it('Native browser dialog box with default click', () => {
    navigateTo.smartTablePage()
    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })
})

it('Native browser dialog box with boolean', () => {
    navigateTo.smartTablePage()
    cy.get('.nb-trash').first().click()
    cy.window().then( window => {
    cy.stub(window, 'confirm').as('dialog').returns(false)
})
cy.get('.nb-trash').first().click()
cy.get('@dialog').should('be.calledWith', 'Are you sure you want to delete?')
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
    navigateTo.smartTablePage()
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', '35')
    })
})
    it('Add new row in a table by using index', () => {
    navigateTo.smartTablePage()
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow1 => {
    cy.wrap(tableRow1).find('[placeholder="First Name"]').type('John')
    cy.wrap(tableRow1).find('[placeholder="Last Name"]').type('Smith')
    cy.wrap(tableRow1).find('.nb-checkmark').click()
})
cy.get('tbody tr').first().find('td').then(tableColumns => {
    cy.wrap(tableColumns).eq(2).should('have.text', 'John')
    cy.wrap(tableColumns).eq(3).should('have.text', 'Smith')

})
})
it('Updating entire row data in table', () => {
    navigateTo.smartTablePage()
    cy.get('tbody').contains('tr', 'Ruben').then(tablerows => {
        cy.wrap(tablerows).find('.nb-edit').click()
        cy.wrap(tablerows).find('[placeholder="First Name"]').clear().type('New')
        cy.wrap(tablerows).find('[placeholder="Last Name"]').clear().type('Name')
        cy.wrap(tablerows).find('[placeholder="Age"]').clear().type('50')
        cy.wrap(tablerows).find('[placeholder="Username"]').clear().type('@NewName')
        cy.wrap(tablerows).find('[placeholder="E-mail"]').clear().type('new.name@test.com')
        cy.wrap(tablerows).find('.nb-checkmark').click()
        cy.wrap(tablerows)
        .should('contain', 'New')
        .and('contain', 'Name')
        .and('contain', '@NewName')
        .and('contain', 'new.name@test.com')
        .and('contain','50')
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


