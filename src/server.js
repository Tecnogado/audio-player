const express = require('express');
const cors = require('cors');
const app = express();

const { resolve } = require('path');

app.use('/songs', express.static(resolve(__dirname, 'songs')));
app.use('/assets', express.static(resolve(__dirname, '..', 'public', 'assets')));
app.use('/css', express.static(resolve(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(resolve(__dirname, '..', 'public', 'js')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(3000);
