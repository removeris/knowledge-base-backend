const multer = require('multer');
const path = require('path');

const storageConfig = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, res) => {
        res(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storageConfig,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = upload;