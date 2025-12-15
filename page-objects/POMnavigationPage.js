function selectGroupMenuItem(groupItemName){
cy.contains('a', groupItemName).invoke('attr', 'aria-expanded').then(attr => {
if(attr.includes('false')){
    cy.contains('a', groupItemName).click()
}
})
}

class NavigationPage {

formLayoutsPage(){
    selectGroupMenuItem('Forms')
    cy.contains('Form Layouts').click()
}
dialogsPage(){
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Dialog').click()
}
toastrPage(){
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click()
}
tooltipPage(){
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click()
}
dragAndDropPage(){
    selectGroupMenuItem('Extra Components')
    cy.contains('Drag & Drop').click()
}
smartTablePage(){
    selectGroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click()
}

registerPage(){
    selectGroupMenuItem('Auth')
    cy.contains('Register').click()
}

loginPage(){
    selectGroupMenuItem('Auth')
    cy.contains('Login').click()

}
}

export const navigateTo = new NavigationPage()
