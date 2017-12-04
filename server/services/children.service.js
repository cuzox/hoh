var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var shortid = require('shortid')
var db = mongojs(config.dbConnectionString, ['children'])

var service = {}

service.getAll = getAll
service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service


function getAll() {
    var deferred = Q.defer()
 
    db.children.find().toArray( (err, children) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve(children)
    })
 
    return deferred.promise
}

function getById(_id) {
    var deferred = Q.defer()
 
    db.children.findOne({ _id: _id }, (err, child) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (child) deferred.resolve(child)
        else deferred.reject(`Child with id ${_id} not in database`)
    })
 
    return deferred.promise
}

function create(childParams) {
    var deferred = Q.defer()
    let _id = shortid.generate()
 
    db.children.findOne({ _id: _id }, (err, child) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (child) deferred.reject(`Child with id ${_id} already in database`)
        else createChild()
    })
 
    function createChild() {  
        childParams._id = _id
        db.children.insert( childParams, (err, child) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve(child)
        })
    }
 
    return deferred.promise
}

function update(_id, childParams) {
    var deferred = Q.defer()
 
    db.children.findOne({ _id: _id }, (err, child) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (child) updateChild()
        else deferred.reject(`Child with id ${_id} not in database`)
    })
 
    function updateChild() {
        delete childParams._id
        
        db.children.update({ _id: _id }, { $set: childParams }, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve('Child updated successfully')
        })
    }
 
    return deferred.promise
}

function _delete(_id) {
    var deferred = Q.defer()
 
    db.children.remove({ _id: _id }, err => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve('Child deleted successfully')
    })
 
    return deferred.promise
}