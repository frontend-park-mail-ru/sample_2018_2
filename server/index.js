'use strict';

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const initMocks = require('./mocks');
const proxy = require('express-http-proxy');

const rootDir = path.resolve(__dirname, '..', 'public');
app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());

if (process.env.MOCKS) {
	initMocks(app);
}

app.use(fallback('index.html', {root: rootDir}));

app.use('*', proxy('https://sample-go.now.sh/', {
	proxyReqPathResolver: function (req) {
		return req.originalUrl;
	}
}));

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
