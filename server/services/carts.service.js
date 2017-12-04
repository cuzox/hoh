var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var shortId = require('shortid')
var db = mongojs(config.dbConnectionString, ['carts', 'users'])

var service = {}

service.getAll = getAll
service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service


function getAll() {
    var deferred = Q.defer()
 
    db.carts.find().toArray(function (err, carts) {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve(carts)
    })
 
    return deferred.promise
}

function getById(_id) {
    var deferred = Q.defer()
 
    db.carts.findOne({ _id: _id}, (err, cart) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (cart) deferred.resolve(cart)
        else deferred.reject(`Cart of id ${_id} not in database`)
    })
 
    return deferred.promise
}

function create(cartParams) {
    var deferred = Q.defer()
    if(!cartParams.userId) deferred.reject("Must include userId")
    else db.carts.findOne({ userId: cartParams.userId }, (err, cart) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (cart) deferred.reject('User already has a cart')
        else db.users.findOne({ _id: cartParams.userId }, (err, user) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else if(!user) deferred.reject("No such user with the provided id")
            else {
                cartParams._id = shortId.generate()
                db.carts.insert( cartParams, (err, cart) => {
                    if (err) deferred.reject(err.name + ': ' + err.message)
                    else deferred.resolve(cart)
                })
            }
        })
    })
 
    return deferred.promise
}

function update(_id, cartParams) {
    var deferred = Q.defer()
 
    db.carts.findById({ _id: _id }, (err, cart) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (cart) updatecart()
        else deferred.reject('Cart not in database')
    })
 
    function updatecart() {
        delete cartParams._id
        db.carts.update({ _id: _id }, { $set: cartParams }, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve('Cart updated successfully')
        })
    }
 
    return deferred.promise
}

function _delete(_id) {
    var deferred = Q.defer()
 
    db.carts.remove({ _id: _id }, err => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve('Cart deleted successfully')
    })
 
    return deferred.promise
}