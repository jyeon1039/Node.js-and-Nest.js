//server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(3002, () => {
	console.log('Start server');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/excel_upload', require('./excel_upload'));
app.use('/excel_download', require('./excel_download'));