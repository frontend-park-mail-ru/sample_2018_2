const AjaxModule = window.AjaxModule;

export default class UsersService {
	static FetchUsers () {
		return AjaxModule
			.doPromiseGet({
				path: '/users'
			})
			.then(function (xhr) {
				return JSON.parse(xhr.responseText);
			});
	}
};
