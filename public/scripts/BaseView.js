/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
	constructor (el) {
		this.el = el;

		this.el.dataset.view = this.constructor.name;
		this.el.hidden = true;
	}

	get active() {
		return !this.el.hidden;
	}

	hide () {
		this.el.hidden = true;
	}

	show () {
		this.el.hidden = false;
		this.render();
	}

	render() {

	}
}
