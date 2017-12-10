var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var shortId = require('shortid')
var db = mongojs(config.dbConnectionString, ['zones'])

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
        else deferred.resolve(zones)
    })
 
    return deferred.promise
}

function getById(_id) {
    var deferred = Q.defer()
 
    db.zones.findOne({ _id: _id}, (err, zone) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (zone) deferred.resolve(zone)
        else deferred.reject(`Zone of id ${_id} not in database`)
    })
 
    return deferred.promise
}

function create(zoneParams) {
    var deferred = Q.defer()
    
    db.zones.findOne({ value: zoneParams.value }, (err, zone) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (zone) deferred.reject('Zone already in database')
        else {
            zoneParams._id = shortId.generate()
            db.zones.insert( zoneParams, (err, zone) => {
                if (err) deferred.reject(err.name + ': ' + err.message)
                else deferred.resolve(zone)
            })
        }
    })
 
    return deferred.promise
}

function update(_id, zoneParams) {
    var deferred = Q.defer()
 
    db.zones.findOne({ _id: _id }, (err, zone) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (zone) updatezone()
        else deferred.reject('Zone not in database')
    })
 
    function updatezone() {
        delete zoneParams._id
        db.zones.update({ _id: _id }, { $set: zoneParams }, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve('Zone updated successfully')
        })
    }
 
    return deferred.promise
}

function _delete(_id) {
    var deferred = Q.defer()
 
    db.zones.remove({ _id: _id }, err => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve('Zone deleted successfully')
    })
 
    return deferred.promise
}