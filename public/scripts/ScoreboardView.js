import BaseView from './BaseView.js';
import bus from './bus.js';

const templateFunc = window.fest[ 'js/components/Board/Board.tmpl' ];


export default class ScoreboardView extends BaseView {
	constructor (el) {
		super(el);

		this.users = null;

		bus.on('users-loaded', this.setUsers.bind(this));
	}

	show () {
		super.show();

		this.fetchUsers();
	}

	fetchUsers () {
		bus.emit('fetch-users');
	}

	setUsers (users) {
		this.users = users;
		this.render();
	}

	render () {
		this.el.innerHTML = '';

		if (!this.users) {
			this.renderLoading();
		} else {
			this.renderScoreboard();
		}
	}

	renderLoading () {
		const loading = document.createElement('strong');
		loading.textContent = 'Loading';
		this.el.appendChild(loading);
	}

	renderScoreboard () {
		this.el.innerHTML = templateFunc(this.users);
	}
}
