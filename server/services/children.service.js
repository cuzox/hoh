var Q = require('q');
var mongojs = require('mongojs');
var config = require('../config');
var db = mongojs(config.connectionString, ['children']);

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getAll() {
    var deferred = Q.defer();
 
    db.children.find().toArray(function (err, children) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(children);
    });
 
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
 
    db.users.finOne(
        { _id: mongojs.ObjectID(_id)}, 
        function (err, children) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            deferred.resolve(children);
        } else {
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function create(childParams) {
    var deferred = Q.defer();
 
    // validation
    db.children.findOne(
        { _id: mongojs.ObjectId(childParams._id) },
        function (err, child) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (child) {
                deferred.reject('Child already in database');
            } else {
                createChild();
            }
        });
 
    function createChild() {  
        db.children.insert(
            childParams,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            }
        );
    }
 
    return deferred.promise;
}

function update(_id, childParams) {
    var deferred = Q.defer();
 
    // validation
    db.children.findById(
        { _id: mongojs.ObjectId(childParams._id) }, 
        function (err, child) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (!child) {
            deferred.reject('Child no longer in database');
        } else {
            updateChild();
        }
    });
 
    function updateChild() {
        db.users.update(
            { _id: mongojs.ObjectId(_id) },
            { $set: childParams },
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
 
    db.children.remove(
        { _id: mongojs.ObjectId(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}