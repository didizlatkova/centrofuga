var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    routes = require('./routes/routes'),
    templates = require('./bl/templates'),
    passport = require('passport'),
    session = require('express-session'),
    port = 3000,
    dburl = 'mongodb://192.168.192.100/Centrofuga';

function setup_express(routes) {
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use('/img', express.static(path.join(__dirname, 'views/img')));

    app.use(session({
        secret: 'centrofugaHackFMI',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.send('404 Page Not Found');
    });

    // error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log('error');
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

MongoClient.connect(dburl, function(err, db) {
    if (err) {
        console.error('Cannot connect to the database', err);
        return;
    }

    require('./bl/passport')(passport);
    setup_express(routes(db, templates.setup()));

    app.listen(port, function() {
        console.log('The magic happens on port ' + port);
    });
});