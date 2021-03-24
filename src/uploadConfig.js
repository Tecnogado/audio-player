const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, 'src', 'files'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename);
            })
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'audio/midi',
            'audio/mpeg',
            'audio/webm',
            'audio/ogg',
            'audio/wav',
            'audio/mp3',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
}
