describe('Test index', () => {
	it('Test components', () => {
		cy.visit('http://localhost:3000/');

		cy.get('[data-cy=NavigationBar]');

		cy.contains('저는 누구일까요?');

		cy.get('[data-cy=AppName]').should('have.text', 'Dong Gyu');
	});

	it('Test mobile components', () => {
		cy.viewport('samsung-note9');
		cy.visit('http://localhost:3000/');

		cy.get('[data-cy=MobileMenu]').click();
	});
});
