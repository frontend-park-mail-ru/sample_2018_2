import BaseView from './BaseView.js';


export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
	}

	render () {
		this.el.innerHTML = '';
		const menuSection = document.createElement('section');
		menuSection.dataset.sectionName = 'menu';

		const logo = document.createElement('div');
		logo.id = 'logo';
		const logoHeader = document.createElement('h1');
		logoHeader.textContent = 'Our game';

		logo.appendChild(logoHeader);


		const main = document.createElement('div');
		main.id = 'main';
		const mainInner = document.createElement('div');

		main.appendChild(mainInner);

		const titles = {
			sign_in: 'Sign in',
			sign_up: 'Sign up',
			scoreboard: 'Scoreboard',
			me: 'Profile'
		};


		Object.entries(titles).forEach(function (entry) {
			const href = entry[ 0 ];
			const title = entry[ 1 ];

			const a = document.createElement('a');
			a.href = href;
			a.dataset.href = href;
			a.textContent = title;
			a.classList.add('menu-button');

			mainInner.appendChild(a);
		});


		menuSection.appendChild(logo);
		menuSection.appendChild(main);

		this.el.appendChild(menuSection);
	}

}
