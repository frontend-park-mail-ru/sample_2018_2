export default class Router {
	constructor (root) {
		this.routes = {};

		this.root = root;
	}

	/**
	 * @param {string} path
	 * @param {BaseView} View
	 */
	register(path, View) {
		this.routes[path] = {
			View: View,
			view: null,
			el: null,
		};

		return this;
	}

	/**
	 * @param {string} path
	 */
	open(path) {

	}

	start() {

	}
}
