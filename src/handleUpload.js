const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

exports.save = function (files, title, artist) {
  const database = JSON.parse(
    readFileSync(resolve(__dirname, 'songs', 'database.json'))
  );

  const add = {
    title: title,
    artist: artist,
    cover: files[0].fieldname === 'file' ? '' : files[0].filename,
    file: files[0].fieldname === 'file' ? files[0].filename : files[1].filename,
  };

  for (let i = 0; i < database.albums.length; i++) {
    if (database.albums[i].album == 'Indies') {
      database.albums[i].audios = [...database.albums[i].audios, add];
    }
  }

  writeFileSync(
    resolve(__dirname, 'songs', 'database.json'),
    JSON.stringify(database, null, 2),
  );
};
