'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();
const initMocks = require('./mocks');
const proxy = require('express-http-proxy');

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

if (process.env.MOCKS) {
	initMocks(app);
}

app.use('*', proxy('https://sample-go.now.sh/', {
	proxyReqPathResolver: function (req) {
		return req.originalUrl;
	}
}));

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
