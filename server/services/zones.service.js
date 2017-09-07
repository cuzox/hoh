var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.connectionString, ['zones'])

var service = {}

service.getAll = getAll
service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service


function getAll() {
    var deferred = Q.defer()
 
    db.zones.find().toArray(function (err, zones) {
        if (err) deferred.reject(err.name + ': ' + err.message)

        deferred.resolve(zones)
    })
 
    return deferred.promise
}

function getById(_id) {
    var deferred = Q.defer()
 
    db.zones.finOne(
        { _id: mongojs.ObjectID(_id)}, 
        function (err, zone) {
        if (err) deferred.reject(err.name + ': ' + err.message)
 
        if (zone) {
            deferred.resolve(zone)
        } else {
            deferred.resolve()
        }
    })
 
    return deferred.promise
}

function create(zoneParams) {
    var deferred = Q.defer()
 
    // validation
    db.zones.findOne(
        { _id: mongojs.ObjectId(zoneParams._id) },
        function (err, zone) {
            if (err) deferred.reject(err.name + ': ' + err.message)
 
            if (zone) {
                deferred.reject('zone already in database')
            } else {
                createzone()
            }
        })
 
    function createzone() {
        delete zoneParams._id
        db.zones.insert(
            zoneParams,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message)
 
                deferred.resolve()
            }
        )
    }
 
    return deferred.promise
}

function update(_id, zoneParams) {
    var deferred = Q.defer()
 
    // validation
    db.zones.findById(
        { _id: mongojs.ObjectId(zoneParams._id) }, 
        function (err, zone) {
        if (err) deferred.reject(err.name + ': ' + err.message)
 
        if (!zone) {
            deferred.reject('zone no longer in database')
        } else {
            updatezone()
        }
    })
 
    function updatezone() {
        delete zoneParams._id
        db.zones.update(
            { _id: mongojs.ObjectId(_id) },
            { $set: zoneParams },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message)
 
                deferred.resolve()
            }
        )
    }
 
    return deferred.promise
}

function _delete(_id) {
    var deferred = Q.defer()
 
    db.zones.remove(
        { _id: mongojs.ObjectId(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message)
 
            deferred.resolve()
        })
 
    return deferred.promise
}