const multer = require('multer');
const path = require('path');
const shortId = require('shortid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename(req, file, cb) {
        cb(null, shortId.generate() + '-' + file.originalname)
    }
})

exports.upload = multer({ storage })