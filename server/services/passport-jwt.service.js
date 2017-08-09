'use strict'

var JWTStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var config = require('./../config.js')
var mongojs = require('mongojs')
var db = mongojs(config.connectionString, ['users'])


// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {}
    
    options.secretOrKey = config.secret
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')

    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        db.users.findOne({ _id: mongojs.ObjectID(JWTPayload._id)}, function(err, user) {
            if (err) {
                return callback(err, false)
            }
            
            if(user) {
                callback(null, user)
                return
            }
            
            callback(null, false)
        })
    }))
    
}

module.exports = hookJWTStrategy