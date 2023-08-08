const bcrypt = require("bcryptjs");

module.exports.comparePassword = function (plainTextPass, hashedPass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPass, hashedPass, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


