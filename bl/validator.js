var REQUIRED_ERROR = 'Полето е задължително',
    INVALID_LOGIN_DATA = 'Грешен потребител или парола',
    bcrypt = require('bcrypt-nodejs');

module.exports = function(database) {
    var usersDb = database.collection('users'),
        users = require('../db/users')(usersDb);

    return {
        validateLoginModel: function(model, callback) {
            var valid = true;
            if (!model.userNameLogin || model.userNameLogin === null) {
                model.userNameLoginError = REQUIRED_ERROR;
                valid = false;
            }
            if (!model.passwordLogin || model.passwordLogin === null) {
                model.passwordLoginError = REQUIRED_ERROR;
                valid = false;
            }

            if (!valid) {
                return callback(model, valid);
            }

            users.getByUserName(model.userNameLogin, function(user, err) {
                if (err || !bcrypt.compareSync(model.passwordLogin, user.password)) {
                    model.generalError = INVALID_LOGIN_DATA;
                    valid = false;
                }

                callback(model, valid);
            });
        }
    };
};