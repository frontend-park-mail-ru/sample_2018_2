const url = require('url');
const uuid = require('uuid/v4');

const users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72
	}
};
const ids = {};

const initMocks = (app) => {

	const allowedOrigins = [
		'localhost',
		'sample.now.sh'
	];

	const CORS_HEADERS = {
		requestedHeaders: 'Access-Control-Request-Headers'.toLowerCase(),
		requestedMethod: 'Access-Control-Request-Method'.toLowerCase(),

		allowOrigin: 'Access-Control-Allow-Origin'.toLowerCase(),
		allowMethods: 'Access-Control-Allow-Methods'.toLowerCase(),
		allowHeaders: 'Access-Control-Allow-Headers'.toLowerCase(),
		allowCredentials: 'Access-Control-Allow-Credentials'.toLowerCase(),
	};

	app.use(function (req, res, next) {
		const requestOrigin = req.headers['origin'];

		if (typeof requestOrigin !== 'undefined') {
			const requestOriginHostname = url.parse(requestOrigin).hostname;

			const requestedHeaders = req.headers[CORS_HEADERS.requestedHeaders];
			const requestedMethod = req.headers[CORS_HEADERS.requestedMethod];

			console.log(`CORS-запрос с домена ${requestOriginHostname}`, {requestedHeaders, requestedMethod});

			const headers = [];
			if (requestedHeaders) {
				headers.push([CORS_HEADERS.allowHeaders, requestedHeaders]);
			}
			if (requestedMethod) {
				headers.push([CORS_HEADERS.allowMethods, 'GET, POST, OPTIONS']);
			}

			if (allowedOrigins.includes(requestOriginHostname)) {
				headers.push([CORS_HEADERS.allowOrigin, requestOrigin]);
				headers.push([CORS_HEADERS.allowCredentials, 'true']);
			}

			const result = headers.map(pair => '\t' + pair.join(': ')).join('\n');
			console.log(`Response with headers:\n` + result);

			headers.forEach(([name, value]) => res.setHeader(name, value));
		}
		next();
	});

	app.post('/signup', function (req, res) {
		const password = req.body.password;
		const email = req.body.email;
		const age = req.body.age;
		if (
			!password || !email || !age ||
			!password.match(/^\S{4,}$/) ||
			!email.match(/@/) ||
			!(typeof age === 'number' && age > 10 && age < 100)
		) {
			return res.status(400).json({
				error: 'Не валидные данные пользователя'
			});
		}
		if (users[ email ]) {
			return res.status(400).json({
				error: 'Пользователь уже существует'
			});
		}

		const id = uuid();
		const user = {
			password,
			email,
			age,
			score: 0
		};
		ids[ id ] = email;
		users[ email ] = user;

		res.cookie('sessionid', id, {
			expires: new Date(Date.now() + 1000 * 60 * 10)
		});
		res.status(201).json({
			id
		});
	});

	app.post('/login', function (req, res) {
		const password = req.body.password;
		const email = req.body.email;
		if (!password || !email) {
			return res.status(400).json({
				error: 'Не указан E-Mail или пароль'
			});
		}
		if (!users[ email ] || users[ email ].password !== password) {
			return res.status(400).json({
				error: 'Не верный E-Mail и/или пароль'
			});
		}

		const id = uuid();
		ids[ id ] = email;

		res.cookie('sessionid', id, {
			expires: new Date(Date.now() + 1000 * 60 * 10)
		});
		res.status(201).json({
			id
		});
	});

	app.get('/me', function (req, res) {
		const id = req.cookies[ 'sessionid' ];
		const email = ids[ id ];
		if (!email || !users[ email ]) {
			return res.status(401).end();
		}

		users[ email ].score += 1;

		res.json(users[ email ]);
	});

	app.get('/users', function (req, res) {
		const scorelist = Object.values(users)
			.sort((l, r) => r.score - l.score)
			.map(user => {
				return {
					email: user.email,
					age: user.age,
					score: user.score
				};
			});

		res.json(scorelist);
	});

};

module.exports = initMocks;
