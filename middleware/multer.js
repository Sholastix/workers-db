const multer = require('multer');
const path = require('path');

// Directory where we storing employees photos.
const dir = '../workers-db/client/public/photos';

// Here we configuring the storage and naming settings.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the storage path.
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Name of each uploaded file must be unique in our fs/db, but we also want to preserve intact file's original name and extension. 
    const parts = file.originalname.split('.');
    cb(null, parts[0] + '_' + Date.now() + '.' + parts[1]);
  }
});

const upload = multer({
  storage: storage,
  // File filter's config.
  fileFilter: (req, file, cb) => {
    // Create RegExp for allowed filetypes.
    const allowedFiletypes = /jpg|jpeg|png/i;
    // Checking extension of file which we want to upload.
    const checkExtension = allowedFiletypes.test(path.extname(file.originalname));
    // Checking mimetype of file which we want to upload (actually, this step is important, because file extension alone very easy to change).
    const checkMimetype = allowedFiletypes.test(file.mimetype);
    if (checkExtension && checkMimetype) {
      return cb(null, true);
    } else {
      return cb('ERROR: This filetype not allowed. Use static images only!');
    };
  }
});

module.exports = {
  upload
};