var _ = require('lodash')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.connectionString, ['users'])
var shortId = require('shortid')
 
var service = {}
 
service.authenticate = authenticate
service.getAll = getAll
service.getById = getById
service.create = create
service.update = update
service.delete = _delete
 
module.exports = service
 
function authenticate(email, password) {
    var deferred = Q.defer()
 
    db.users.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (user && bcrypt.compareSync(password, user.hash)){
            let processed = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: 'Bearer ' + jwt.sign({ _id: user._id }, config.secret)
            }
            deferred.resolve(processed)
        } else deferred.reject('Incorrect Email or Password')
    })
 
    return deferred.promise
}
 
function getAll() {
    var deferred = Q.defer()
 
    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else {
            // return users (without hashed passwords)
            users = _.map(users, function (user) {
                return _.omit(user, 'hash')
            })
     
            deferred.resolve(users)
        }
 
    })
 
    return deferred.promise
}
 
function getById(_id) {
    var deferred = Q.defer()
 
    db.users.findOne({ _id: _id }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (user) deferred.resolve(_.omit(user, 'hash'))
        else deferred.reject('User not found')
    })
 
    return deferred.promise
}
 
function create(userParam) {
    var deferred = Q.defer()
 
    // validation
    db.users.findOne({ email: userParam.email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (user) deferred.reject('Email "' + userParam.email + '" is already taken')
        else createUser()
    })
 
    function createUser() {
        let user = _.omit(userParam, 'password')
        user.role = 1
        user.hash = bcrypt.hashSync(userParam.password, 10)
        user._id = shortId.generate()
 
        db.users.insert(user, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve()
        })
    }
 
    return deferred.promise
}
 
function update(_id, req) {
    var deferred = Q.defer()
    var userParam = req.body
    var currentRole = req.user.role
 
    // validation
    db.users.findOne({_id: _id}, (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message)

        if (user.role !== userParam.role){
            if(currentRole === config.userRoles.admin && userParam.role === config.userRoles.super_admin){
                req.forbidden = true
            }
        }
        if (req.forbidden == null){
            if (user.email !== userParam.email) {
                // email has changed so check if the new email is already taken
                db.users.findOne( { email: userParam.email }, function (err, conflictUser) {
                    if (err) deferred.reject(err.name + ': ' + err.message)
                    else if (conflictUser) deferred.reject('Email "' + conflictUser.email + '" is already taken')
                    else updateUser()
                })
            } else updateUser()
        }
    })
 
    function updateUser() {
        delete userParam._id

        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(set.password, 10)
            delete userParam.password
        }
 
        db.users.update({ _id: _id }, { $set: userParam }, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve('User updated successfully')
        })
    }
 
    return deferred.promise
}
 
function _delete(_id) {
    var deferred = Q.defer()
 
    db.users.remove({ _id: _id }, err => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve('User deleted successfully')
    })
 
    return deferred.promise
}