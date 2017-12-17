var express = require('express')
var fs = require('fs')
var router = express.Router()

var imagesService = require('../services/images.service')

var controller = {}

controller.getById = getById
controller.create = create
controller.update = update
controller.delete = _delete

module.exports = controller
 
function getById(req, res) {
    imagesService.getById(req.params._id, req.imgPath).then( data => {
        res.setHeader('Content-Type', data.mimetype)
        fs.createReadStream(data.path).pipe(res);
    }).catch( (err) => {
        res.status(400).send(err)
    })
}

function create(req, res) {
    imagesService.create(req.file, req.imgPath).then( data => {
        res.send(data)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function update(req, res) {
    imagesService.update(req.params._id, req.file, req.imgPath).then( msg => {
        res.send(msg)
    }).catch( (err) => {
        res.status(400).send(err)
    })
}
 
function _delete(req, res) {
    imagesService.delete(req.params._id, req.imgPath).then( msg => {
        res.send(msg)
    }).catch(function (err) {
        res.status(400).send(err)
    })
}
