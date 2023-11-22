const fs = require('fs');

const checkDirectory = () => {
  // Setting the path for 'photos' directory. 
  const dir = './public/photos';

  fs.access(dir, (err) => {
    // If we have no errors then our directory exists and no need to proceed with this function.
    if (!err) return;

    // This block fired if error exists.
    if (err && err.code === 'ENOENT') {
      // Here we synchronously create our directory.
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory '${dir}' created successfully!`);
      return;
    };

    // If there is different from 'ENOENT' error then we catch it here.
    if (err) console.error(err);
  });
};

module.exports = checkDirectory;