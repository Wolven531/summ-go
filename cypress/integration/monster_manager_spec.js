describe('Navigating to Monster Manager page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	describe('searching for an existing monster, and clicking it', () => {
		beforeEach(() => {
			cy.get('input#mon-name').type('Bai').should('have.value', 'Bai')
		})

		it('displays a list of search results', () => {
			cy.get('.search-results').contains('Bailey (Light)')
			// // Should be on a new URL which includes '/commands/actions'
			// cy.url().should('include', '/commands/actions')
		})
	})
})
