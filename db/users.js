var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
    router = express.Router(),
    PAGE_NOT_FOUND_ERROR = 'Страницата не е намерена';

function from_database(user) {
    user.id = user._id;
    delete user._id;
    return user;
}

module.exports = function(users) {
    return {
        getByUserName: function(userName, callback) {
            users.findOne({
                userName: userName
            }, function(err, user) {
                if (err) {
                    console.error('Cannot get user', err);
                    callback(null, err);
                }
                if (user !== null) {
                    callback(from_database(user));
                } else {
                    err = new Error(PAGE_NOT_FOUND_ERROR);
                    err.status = 404;
                    callback(null, err);
                }
            });
        }
    };
};