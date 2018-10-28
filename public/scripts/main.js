import bus from './bus.js';
import MenuView from './MenuView.js';
import Router from './Router.js';
import ScoreboardView from './ScoreboardView.js';
import UsersService from './UsersService.js';


bus.on('fetch-users', function () {
	UsersService
		.FetchUsers()
		.then(function (users) {
			bus.emit('users-loaded', users);
		})
		.catch(function (error) {
			console.error(error);
		});
});

const root = document.getElementById('root');
const router = new Router(root);

const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = function () {
	ws.send('hi');
};

router
	.register('/', MenuView)
	.register('/scoreboard', ScoreboardView);

router.start();
