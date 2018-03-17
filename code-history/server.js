const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const upload = require('./routes/upload');
const getRoute = require('./routes/get');
const authenticate = require('./routes/authenticate');

const app = express();
const port = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost/codehistory')
    .then(() => console.log('DB Connection established'))
    .catch(() => console.log('DB Connection error'));

app.use(logger('dev'))
app.use(cors("http://localhost:3000"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/upload', upload);
app.use('/get', getRoute);
app.use('/auth', authenticate);
app.listen(port, () => console.log('Listening on port ' + port));