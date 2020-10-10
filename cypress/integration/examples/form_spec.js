describe('MVP testing',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/pizza-form');
    })
    it('name validation',()=>{
        cy.get('[data-cy=name]').type('ozzy').should('have.value','ozzy')
        cy.get('[data-cy=chicken]').check().should('be.checked')
        cy.get('[data-cy=peppers]').check().should('be.checked')
        cy.get('[data-cy=submit]').click().should("have.prop",{isDisabled: false})
    })
})