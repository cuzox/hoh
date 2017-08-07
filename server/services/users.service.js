var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongojs = require('mongojs');
var config = require('../config');
var db = mongojs(config.connectionString, ['users']);
 
var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;
 
function authenticate(email, password) {
    var deferred = Q.defer();
 
    db.users.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: 'Bearer ' + jwt.sign({ _id: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
function getAll() {
    var deferred = Q.defer();
 
    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });
 
        deferred.resolve(users);
    });
 
    return deferred.promise;
}
 
function getById(_id) {
    var deferred = Q.defer();
 
    db.users.findOne({ _id: mongojs.ObjectID(_id) }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
function create(userParam) {
    var deferred = Q.defer();
 
    // validation
    db.users.findOne({ email: userParam.email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // email already exists
            deferred.reject('email "' + userParam.email + '" is already taken');
        } else {
            createUser();
        }
    });
 
    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        user.role = 1;
 
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
 
        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
 
function update(_id, req) {
    var deferred = Q.defer();
    var userParam = req.body;
    var currentRole = req.user.role;
 
    // validation
    db.users.findOne({_id: mongojs.ObjectID(_id)}, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.role != userParam.role){
            if(currentRole == config.userRoles.admin && userParam.role == config.userRoles.super_admin){
                req.forbidden = true;
            }
        }
        if (req.forbidden == null){
            if (user.email !== userParam.email) {
                // email has changed so check if the new email is already taken
                db.users.findOne( { email: userParam.email }, function (err, conflictUser) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
    
                    if (conflictUser) {
                        // email already exists
                        deferred.reject('Email "' + conflictUser.email + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
            } else {
                updateUser();
            }
        }
    });
 
    function updateUser() {
 
        // update password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(set.password, 10);
            delete userParam.password;
        }
 
        db.users.update(
            { _id: mongojs.ObjectID(_id) },
            { $set: userParam },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            }
        );
    }
 
    return deferred.promise;
}
 
function _delete(_id) {
    var deferred = Q.defer();
 
    db.users.remove(
        { _id: mongojs.ObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}