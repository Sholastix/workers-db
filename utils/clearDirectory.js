const fs = require('fs');

// This function is intended to clean the 'photos' directory of unnecessary photos.
// Disabled for now because of BUG. When no employees exists in DB and we create new employee then here a sequence of actions:
// 1. 'Multer' uploaded photo in FS (public folder).
// 2. Function 'getAllEmployees' (where we initially put this function) runs, finds no employee in the DB, assumes that the photo from step 1 is not associated with any profile and deletes it from FS.
// 3. Function 'createNewEmployee' runs.
// 4. Function 'getAllEmployees' runs again and employee's profile displays without photo, beacause it already deleted from FS.
const clearDirectory = () => {
  fs.readdir('public/photos', (err, files) => {
    files.forEach((file) => {
      if (file !== 'default.jpg') {
        fs.unlink(`public/photos/${file}`, (err) => {
          if (err) {
            console.error(err);
          };
        });
      };
    });
  });
};

module.exports = clearDirectory;