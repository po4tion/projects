describe('Test Mobile index', () => {
	before(() => {
		cy.fixture('navigationLinks.json').then(data => {
			this.links = data.links;
		});
	});

	beforeEach(() => {
		cy.viewport('samsung-note9');
		cy.visit('http://localhost:3000/');
		cy.get('[data-cy=MobileMenu]').click();
	});

	it('Test Mobile NavigationBar', () => {
		cy.get('[data-cy=NavigationBar]');

		cy.log('Check APP Logo');
		cy.get('[data-cy=AppName]').should('have.text', 'Dong Gyu');

		cy.log('Check Mobile Links');

		this.links.forEach(link => {
			cy.get(`[data-cy=${link}]`).should('exist');
		});
	});

	it('Test Mobile TypedHeader', () => {
		cy.get(`[data-cy=${this.links[0]}]`).click({ multiple: true, force: true });
		cy.get('[data-cy=TypedHeader]');

		cy.log('Check Mobile Text');
		cy.get('[data-cy=WhoAmI]').should('have.text', '저는 누구일까요?');
	});

	it('Test Mobile AboutMe', () => {
		cy.get(`[data-cy=${this.links[1]}]`).click({ multiple: true, force: true });
		cy.get('[data-cy=AboutMe]');

		cy.log('Check Mobile Text');
		cy.get('[data-cy=Introduce]').should('contain', '안녕하세요');
	});

	it('Test Mobile SkillSet', () => {
		cy.get(`[data-cy=${this.links[2]}]`).click({ multiple: true, force: true });
		cy.get('[data-cy=Skills]').should('have.text', 'SKILLS');
	});

	it('Test Mobile Portfolio', () => {
		cy.get(`[data-cy=${this.links[3]}]`).click({ multiple: true, force: true });

		cy.get('[data-cy=Portfolio]');

		cy.log('Check Mobile Text');
		cy.fixture('portfolioData.json').then(data => {
			data.names.forEach(name => {
				cy.get(`[data-cy=${name}]`).should('exist');
			});
		});
	});
});
