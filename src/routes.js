const { resolve } = require('path');
const express = require('express');
const routes = new express.Router();

const { readFileSync } = require('fs');
const upload = require('multer')(require('./uploadConfig'));
const handleUpload = require('./handleUpload');

routes.get('/files', (req, res) => {
  const database = JSON.parse(
    readFileSync(resolve(__dirname, 'songs', 'database.json'))
  );
  res.status(200).json(database);
});

const pagesFolder = resolve(__dirname, '..', 'public', 'html');

routes.get('/', (req, res) => res.sendFile(`${pagesFolder}/home.html`));
routes.get('/player', (req, res) => res.sendFile(`${pagesFolder}/player.html`));
routes.get('/upload', (req, res) => res.sendFile(`${pagesFolder}/upload.html`));

routes.post('/upload', upload.any(), (req, res) => {
  handleUpload.save(req.files, req.body.title, req.body.artist);
  return res.status(200).json({ upload: true });
});

module.exports = routes;
