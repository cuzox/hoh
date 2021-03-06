var express = require('express')
var router = express.Router()
var config = require('./../config.js')
var userService = require('../services/users.service')

controller = {} 

controller.authenticate = authenticate
controller.register = register
controller.getAll = getAll
controller.getCurrent = getCurrent
controller.update = update
controller.delete = _delete

module.exports = controller

function authenticate(req, res) {
    userService.authenticate(req.body.email, req.body.password).then( user => {
        res.send(user)
    })
    .catch( (err) => {
        res.status(400).send(err)
    })
}

function register(req, res) {
    userService.create(req.body).then( (doc) => {
        res.send(doc)
    })
    .catch( (err) => {
        res.status(400).send(err)
    })
}

function getAll(req, res) {
    userService.getAll().then( users => {
        res.send(users)
    })
    .catch( (err) => {
        res.status(400).send(err)
    })
}

function getCurrent(req, res) {
    userService.getById(req.user._id).then( user => {
        res.send(user)
    })
    .catch( (err) => {
        res.status(400).send(err)
    })
}

function update(req, res) {
    userService.update(req.params._id, req).then( msg => {
        if(req.forbidden) res.sendStatus(403)
        else res.send(msg)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}

function _delete(req, res) {
    userService.delete(req.params._id).then( msg => {
        res.send(msg)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
