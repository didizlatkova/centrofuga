var express = require('express'),
    router = express.Router(),
    handlebars = require("handlebars"),
    path = require('path');

module.exports = function(database, templates) {
    var usersDb = database.collection('users'),
        users = require('../db/users')(usersDb),
        programsDb = database.collection('programs'),
        programs = require('../db/programs')(programsDb, usersDb),
        validator = require('../bl/validator')(database);

    router.get('/', function(req, res) {
        res.send(templates.loginTemplate({}));
    });

    router.get('/home', function(req, res) {
        if (req.user) {
            programs.getByUser(req.user.userName, function(ownPrograms) {
                programs.getByUser('default', function(defaultPrograms) {
                    res.send(templates.homeTemplate({
                        ownPrograms: ownPrograms,
                        defaultPrograms: defaultPrograms
                    }));
                });
            });
        } else {
            res.send(templates.loginTemplate({}));
        }
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

    router.post('/add', function(req, res) {
        if (req.user && req.body) {
            users.getByUserName(req.user.userName, function(user, err) {
                if (err) {
                    return res.status(err.status).send(templates.errorTemplate({
                        message: err.message
                    }));
                }

                programs.create(req.body, user.userName, function(err) {
                    if (err) {
                        return res.status(err.status).write(templates.errorTemplate({
                            message: err.message
                        }));
                    }

                    res.redirect('/home');
                });
            });
        } else {
            res.send(undefined);
        }
    });

    return router;
};