const AjaxModule = window.AjaxModule;

function delay (obj) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(obj);
		}, 1000);
	});
}

export default class UsersService {
	static FetchUsers () {
		return AjaxModule
			.doPromiseGet({
				path: '/users'
			})
			.then(function (xhr) {
				return delay(JSON.parse(xhr.responseText));
			});
	}
};
