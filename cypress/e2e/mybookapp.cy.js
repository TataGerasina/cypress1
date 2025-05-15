describe('template spec', () => {
	
	it('1. Успешная регистрация по валидному логину и паролю', () => {
		cy.visit('http://localhost:3000/');
		cy.login('bropet@mail.ru', '123');
		cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible').wait(700);
		cy.contains('Log out').should('be.visible');
	});

	it('2. Невалидный логин - пробел', () => {
		cy.visit('/');
		cy.login(' ', '123');
		cy.get('#mail').then((elements) => {
			return elements[0].checkValidity();
		}).should('be.false');
	});

	it('3. Невалидный пароль - пробел, пустой пароль', () => {
		cy.visit('http://localhost:3000/');
		cy.login('bropet@mail.ru', ' ');
		cy.get('.mb-3').should('be.visible')
			//.and('contain', 'Неправильная почта или пароль')
	});

	it('4. Добавление новой книги', () => {
		cy.visit('http://localhost:3000/');
		cy.login('bropet@mail.ru', '123');
		cy.get('.btn-warning').click().wait(500); //<button type="button" class="btn btn-warning">Add new</button>
		cy.testBook('Гордость и предубеждение', 'Второй роман английской писательницы Джейн Остин, опубликованный в 1813 году. Это роман нравов, в котором рассказывается о развитии характера Элизабет Беннет, главной героини книги, которая узнаёт о последствиях поспешных суждений и начинает понимать разницу между внешней и настоящей добротой.', 'Джейн Остин');
	
	});

	it('5. Добавление книги в избранное', () => {
		cy.visit('http://localhost:3000/');
		cy.login('bropet@mail.ru', '123');
		cy.get('.btn-warning').click(); // нажимаем кнопку создать новую книгу <button type="button" class="btn btn-warning">Add new</button>
		//cy.testBook('Медвежонок Паддингтон', 'Приключения медвежонка из Перу', 'Майкл Бонд'); //заполняем карточку
		cy.testBook('Гордость и предубеждение', 'Второй роман английской писательницы Джейн Остин, опубликованный в 1813 году. Это роман нравов, в котором рассказывается о развитии характера Элизабет Беннет, главной героини книги, которая узнаёт о последствиях поспешных суждений и начинает понимать разницу между внешней и настоящей добротой.', 'Джейн Остин');
		
		cy.contains('.card-title', 'Гордость и предубеждение') // Ищем по названию книги
			.parents('.card') // Поднимаемся к родительской карточке
			.within(() => { // Работаем внутри карточки
				cy.get('.btn-success').click().wait(500); // Кликаем кнопку "Add to favorite" '.btn-success'
			});
		cy.contains('Favorites').click(); // Переходим в избранное
		cy.contains('.card-title', 'Гордость и предубеждение').should('exist'); // Проверяем, что книга добавилась
	});

	it('6. Удаление книги из избранного', () => {
		cy.visit('http://localhost:3000/');
		cy.login('bropet@mail.ru', '123');
		cy.contains('Favorites').click(); // Переходим в избранное
		cy.get('.card-title', {
			timeout: 10000
		}).should('exist'); // Ждем загрузки списка 
		cy.get('.card').should('have.length.gt', 0); // Проверяем что есть книги
		cy.get('.card-title').each(($el) => {
			console.log('Найдена книга:', $el.text());
		});
		cy.get('.btn-secondary').click(); // ищем кнопку удаления по классу
	    cy.contains('.card-title', 'Гордость и предубеждение').should('not.exist'); //Проверяем, что книга исчезла
	    cy.contains('Please add some book to favorit on home page').should('be.visible');
	});
});