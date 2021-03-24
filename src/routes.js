const path = require('path');
const express = require('express');
const routes = new express.Router();

const multer = require('multer');
const uploadConfig = require('./uploadConfig');
const upload = multer(uploadConfig);
const handleUpload = require('./src/js/handleUpload');

routes.get('/', (req,res) => {
    res.sendFile(path.resolve('src/pages/home/index.html'));
})

routes.get('/player', (req,res) => {
    res.sendFile(path.resolve('src/pages/player/index.html')); 
})

routes.get('/upload', (req,res) => {
    res.sendFile(path.resolve('src/pages/upload/index.html'));
})

routes.post('/upload', upload.any(), async (req,res) => {
    handleUpload.save(req.files, req.body.title, req.body.artist);
    if (req.connection.localAddress.split(':').length < 4) res.redirect(`http://localhost:5500/player`);
    else res.redirect(`http://${req.connection.localAddress.split(':')[3]}:5500/player`);
});

module.exports = routes;
