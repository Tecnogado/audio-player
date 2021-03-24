const fs = require('fs');
const dataBase = require('../files/database');

exports.save = function(files, title, artist) {
    const add = {
        "title" : title,
        "artist" : artist,
        "cover" : files[0].fieldname === 'file' ? 'https://via.placeholder.com/300' : 'files/' + files[0].filename,
        "file" : files[0].fieldname === 'file' ? files[0].filename : files[1].filename
    }

    for (let i = 0; i < (dataBase.data.length); i++) {
        if (dataBase.data[i].album == "Indies") {
            dataBase.data[i].audios = [...dataBase.data[i].audios, add];
        }
    }
    
    fs.writeFileSync('./src/files/database.json', JSON.stringify(dataBase, null, 4));
}