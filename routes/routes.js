var express = require('express'),
    router = express.Router(),
    handlebars = require("handlebars"),
    path = require('path');

module.exports = function(database, templates) {
    // var usersDb = database.collection('users'),
    //     programsDb = database.collection('programs'),
    //     users = require('../db/users')(usersDb),
    //     programs = require('../db/programs')(programsDb, usersDb),
    //     programsManager = require('../bl/programs-manager')(),
    //     usersManager = require('../bl/users-manager')(database),
    //     validator = require('../bl/validator')(database);

    router.get('/', function(req, res) {
        res.send(templates.loginTemplate({}));
    });

    return router;
};