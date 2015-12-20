var express = require('express'),
    moment = require('moment'),
    ObjectID = require('mongodb').ObjectID;

function to_database(program) {
    program._id = new ObjectID(program.id);
    delete program.id;
    return program;
}

module.exports = function(programs, users) {
    return {
        getByUser: function(userName, callback) {
            users.findOne({
                userName: userName
            }, function(err, user) {
                if (err) {
                    console.error('Cannot get user', err);
                    return callback(null, err);
                }

                if (user !== null) {
                    programs.find({
                        _id: {
                            $in: user.programs
                        }
                    }).toArray(function(err, programs) {
                        if (err) {
                            console.error('Cannot get programs', err);
                            return callback(null, err);
                        }

                        return callback(programs);
                    });
                } else {
                    return callback(null);
                }
            });
        },

        create: function(program, userName, callback) {
            program = to_database(program);
            program.author = userName;
            programs.insert(program, function(err, records) {
                if (err) {
                    console.error('Cannot insert program', err);
                    return callback(err);
                }

                users.update({
                    userName: userName
                }, {
                    $addToSet: {
                        "programs": program._id
                    }
                }, function(err) {
                    if (err) {
                        console.error('Cannot update user', err);
                        return callback(err);
                    }

                    return callback(null, records[0]);
                });
            });
        },

        delete: function(id, authorName, callback) {
            programs.remove({
                _id: new ObjectID(id)
            }, function(err) {
                if (err) {
                    console.error('Cannot remove program', err);
                    return callback(err);
                }

                users.update({
                    userName: authorName
                }, {
                    $pull: {
                        "programs": new ObjectID(id)
                    }
                }, function(err) {
                    if (err) {
                        console.error('Cannot update user', err);
                        return callback(err);
                    }

                    return callback();
                });
            });
        }
    };
};