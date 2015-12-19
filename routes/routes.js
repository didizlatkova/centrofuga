var express = require('express'),
    router = express.Router(),
    handlebars = require("handlebars"),
    path = require('path');

module.exports = function(database, templates) {
    var usersDb = database.collection('users'),
        users = require('../db/users')(usersDb),
        validator = require('../bl/validator')(database);

    router.get('/', function(req, res) {
        res.send(templates.loginTemplate({}));
    });

    router.get('/home', function(req, res) {
        //if (req.user) {
            res.send(templates.homeTemplate({}));
        //} else {
        //    res.send(templates.loginTemplate({}));
        //}
    });

    router.post('/login', function(req, res) {
        validator.validateLoginModel(req.body, function(user, valid) {
            if (valid) {
                var publicUser = {
                    userName: user.userNameLogin
                };
                req.login(publicUser, function(err) {
                    if (err) {
                        user.generalError = err.message;
                        return res.send(templates.loginTemplate(user));
                    }

                    res.redirect('/home');
                });
            } else {
                res.send(templates.loginTemplate(user));
            }
        });
    });

    return router;
};