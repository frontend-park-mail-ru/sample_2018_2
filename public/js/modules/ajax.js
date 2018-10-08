(function () {
	const noop = () => null;

	class AjaxModule {
		static _ajax ({callback = noop, method = 'GET', path = '/', body} = {}) {
			const baseURL = AjaxModule.BaseURL || '';
			const xhr = new XMLHttpRequest();
			xhr.open(method, baseURL + path, true);
			xhr.withCredentials = true;

			if (body) {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
					return;
				}

				callback(xhr);
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send();
			}
		}

		static doGet (params = {}) {
			AjaxModule._ajax({...params, method: 'GET'});
		}

		static doPost (params = {}) {
			AjaxModule._ajax({...params, method: 'POST'});
		}

		static doPromiseGet (params = {}) {
			return new Promise(function (resolve, reject) {

				AjaxModule._ajax({
					...params,
					method: 'GET',
					callback (xhr) {

						resolve(xhr);
					}
				});

			});
		}

		static doFetchPost (params = {}) {
			const baseURL = AjaxModule.BaseURL || '';
			return fetch(baseURL + params.path, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(params.body)
			});
		}
	}

	window.AjaxModule = AjaxModule;
})();
