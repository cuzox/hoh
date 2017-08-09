var express = require('express');
var router = express.Router();

var zonesService = require('../services/zones.service');

var controller = {};

controller.getAll = getAll;
controller.getById = getById;
controller.create = create;
controller.update = update;
controller.delete = _delete;

module.exports = controller;

function getAll(req, res) {
    zonesService.getAll().then( (zones) => {
        res.send(zones);
    }).catch( (err) => {
        res.status(400).send(err);
    });
}
 
function getById(req, res) {
    zonesService.getById(req.params._id).then( (zone) => {
        if (zone) {
            res.send(zone);
        } else {
            res.sendStatus(404);
        }
    }).catch( (err) => {
        res.status(400).send(err);
    });
}

function create(req, res) {
    zonesService.create(req.body).then( () => {
        res.sendStatus(200);
    }).catch( (err) => {
        res.status(400).send(err);
    });
}
 
function update(req, res) {
    zonesService.update(req.params._id, req.body).then( () => {
        res.sendStatus(200);
    }).catch( (err) => {
        res.status(400).send(err);
    });
}
 
function _delete(req, res) {
    zonesService._delete(req.params._id).then( () => {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(400).send(err);
    });
}
