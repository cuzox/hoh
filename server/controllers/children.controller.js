var express = require('express')
var router = express.Router()

var childService = require('../services/children.service')

var controller = {}

controller.getAll = getAll
controller.getById = getById
controller.create = create
controller.update = update
controller.delete = _delete

module.exports = controller

function getAll(req, res) {
    childService.getAll().then( (children) => {
        res.send(children)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function getById(req, res) {
    childService.getById(req.params._id).then( (child) => {
        if (child) {
            res.send(child)
        } else {
            res.sendStatus(404)
        }
    }).catch( (err) => {
        res.status(400).send(err)
    })
}

function create(req, res) {
    childService.create(req.body).then( () => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function update(req, res) {
    childService.update(req.params._id, req.body).then( () => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function _delete(req, res) {
    childService._delete(req.params._id).then( () => {
        res.sendStatus(200)
    }).catch(function (err) {
        res.status(400).send(err)
    })
}
