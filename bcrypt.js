const bcrypt = require("bcryptjs");

module.exports.hashPassword = function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(error, salt) {
            if (error) {
                return reject(error);
            }
            bcrypt.hash(plainTextPassword, salt, function(error, hash) {
                if (error) {
                    return reject(error);
                }
                resolve(hash);
            });
        });
    });
};

module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(error, doesMatch) {
                if (error) {
                    reject(error);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
