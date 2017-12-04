var express = require('express')
var router = express.Router()

var articlesService = require('../services/articles.service')

var controller = {}

controller.getAll = getAll
controller.getById = getById
controller.create = create
controller.update = update
controller.delete = _delete

module.exports = controller

function getAll(req, res) {
    articlesService.getAll().then( articles => {
        res.send(articles)
    }).catch( err => {
        res.status(400).send(err)
    })
}
 
function getById(req, res) {
    articlesService.getById(req.params._id).then( article => {
        res.send(article)
    }).catch( err => {
        res.status(400).send(err)
    })
}

function create(req, res) {
    articlesService.create(req.body).then( article => {
        res.send(article)
    }).catch( err => {
        res.status(400).send(err)
    })
}
 
function update(req, res) {
    articlesService.update(req.params._id, req.body).then( msg => {
        res.send(msg)
    }).catch( err => {
        res.status(400).send(err)
    })
}
 
function _delete(req, res) {
    articlesService.delete(req.params._id).then( msg => {
        res.send(msg)
    }).catch( err => {
        res.status(400).send(err)
    })
}
