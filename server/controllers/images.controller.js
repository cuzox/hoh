var express = require('express')
var router = express.Router()


var imagesService = require('../services/images.service')

var controller = {}

controller.getById = getById
controller.create = create
controller.delete = _delete

module.exports = controller
 
function getById(req, res) {
    imagesService.getById(req.params._id).then( (image) => {
        if (image) {
            res.send(image)
        } else {
            res.sendStatus(404)
        }
    }).catch( (err) => {
        res.status(400).send(err)
    })
}

function create(req, res) {
    imagesService.create(req).then( () => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function _delete(req, res) {
    imagesService._delete(req.params._id).then( () => {
        res.sendStatus(200)
    }).catch(function (err) {
        res.status(400).send(err)
    })
}

