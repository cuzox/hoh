var express = require('express')
var router = express.Router()

var cartsService = require('../services/carts.service')

var controller = {}

controller.getAll = getAll
controller.getById = getById
controller.create = create
controller.updateAdd = updateAdd
controller.updateRm = updateRm
controller.delete = _delete

module.exports = controller

function getAll(req, res) {
    cartsService.getAll().then( carts => {
        res.send(carts)
    }).catch( err => {
        res.status(400).send(err)
    })
}

function getById(req, res) {
    cartsService.getById(req.params._id).then( carts => {
        res.send(carts)
    }).catch( err => {
        res.status(400).send(err)
    })
}

function create(req, res) {
    cartsService.create(req.body).then( carts => {
        res.send(carts)
    }).catch( err => {
        res.status(400).send(err)
    })
}
 
function updateAdd(req, res) {
    cartsService.updateAdd(req.params._id, req.params.childId).then( msg => {
        res.send(msg)
    }).catch( err => {
        res.status(400).send(err)
    })
}

function updateRm(req, res) {
    cartsService.updateRm(req.params._id, req.params.childId).then( msg => {
        res.send(msg)
    }).catch( err => {
        res.status(400).send(err)
    })
}
 
function _delete(req, res) {
    cartsService.delete(req.params._id, req.body).then( msg => {
        res.send(msg)
    }).catch( err => {
        res.status(400).send(err)
    })
}
