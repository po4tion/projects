describe('Test index', () => {
	before(() => {
		cy.fixture('navigationLinks.json').then(data => {
			this.links = data.links;
		});
	});

	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('Test NavigationBar', () => {
		cy.get('[data-cy=NavigationBar]');

		cy.log('Check APP Logo');
		cy.get('[data-cy=AppName]').should('have.text', 'Dong Gyu');

		cy.log('Check Links');

		this.links.forEach(link => {
			cy.get(`[data-cy=${link}]`).should('exist');
		});
	});

	it('Test TypedHeader', () => {
		cy.get(`[data-cy=${this.links[0]}]`).click();
		cy.get('[data-cy=TypedHeader]');

		cy.log('Check Text');
		cy.get('[data-cy=WhoAmI]').should('have.text', '저는 누구일까요?');
	});

	it('Test AboutMe', () => {
		cy.get(`[data-cy=${this.links[1]}]`).click();
		cy.get('[data-cy=AboutMe]');

		cy.log('Check Text');
		cy.get('[data-cy=Introduce]').should('contain', '안녕하세요');
	});

	it('Test SkillSet', () => {
		cy.get(`[data-cy=${this.links[2]}]`).click();
		cy.get('[data-cy=Skills]').should('have.text', 'SKILLS');
	});

	it('Test Portfolio', () => {
		cy.get(`[data-cy=${this.links[3]}]`).click();

		cy.get('[data-cy=Portfolio]');

		cy.log('Check Text');
		cy.fixture('portfolioData.json').then(data => {
			data.names.forEach(name => {
				cy.get(`[data-cy=${name}]`).should('exist');
			});
		});
	});
});
