var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.dbConnectionString, ['images'])
var fs = require('fs')
var glob = require('glob')
var shortId = require('shortid')
shortId.characters(config.shortIdChars)

var service = {}

service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service


function getById(_id) {
    let deferred = Q.defer()
 
    db.images.findOne({_id: _id}, (err, image) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (image) getImageFile(image)
        else deferred.reject(`Image with id ${_id} not in database`) 
    })

    function getImageFile(image){
        glob(`${config.imagePath}/${_id}.*`, function (err, files) {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else if (files) fs.exists(files[0], exists => {
                if (exists){
                    let processed = {
                        path: files[0], 
                        mimetype: image.mimetype, 
                    }
                    deferred.resolve(processed)
                } else deferred.reject(`Image file with id ${_id} was not found`)
            })
        })
    }
 
    return deferred.promise
}

function create(image) {
    let deferred = Q.defer()
    let _id = shortId.generate()
    let ext = image.originalname.split('.').pop()
    // Check size somewhere here
    let processed = {
        _id: _id,
        fieldname: image.fieldname,
        encoding: image.encoding,
        mimetype: image.mimetype,
        ext: ext,
    }

    db.images.insert(processed, (err, doc)=>{
        if (err) deferred.reject(err.name + ': ' + err.message)
        else fs.writeFile(`${config.imagePath}/${_id}.${ext}`, image.buffer, err =>{
            if (err) deferred.reject(err.name + ': ' + err.message)
            else deferred.resolve(doc)
        })
    })
    
    return deferred.promise
}

function update(_id, image) {
    let deferred = Q.defer()
    let ext = image.originalname.split('.').pop()
 
    db.images.findOne({ _id: _id }, (err, dbImage) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else if (dbImage) updateImage(dbImage.ext) // Pass original file extension
        else deferred.reject(`Image with id ${_id} not in database`) 
    })
 
    function updateImage(originalExt) {
        let processed = {
            fieldname: image.fieldname,
            encoding: image.encoding,
            mimetype: image.mimetype,
            ext: ext,
        }

        db.images.update({ _id: _id }, { $set: processed }, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else fs.unlink(`${config.imagePath}/${_id}.${originalExt}`, err => {
                if (err) deferred.reject(err.name + ': ' + err.message)
                else fs.writeFile(`${config.imagePath}/${_id}.${ext}`, image.buffer, err =>{
                    if (err) deferred.reject(err.name + ': ' + err.message)
                    else deferred.resolve('Image updated successfully')
                })    
            })
        })
    }
 
    return deferred.promise
}

function _delete(_id) {
    let deferred = Q.defer()
    
    db.images.remove({ _id: _id }, (err) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else glob(`${config.imagePath}/${_id}.*`, function (err, files) {
            if (err) deferred.reject(err.name + ': ' + err.message)
            else fs.unlink(files[0], err => {
                if (err) deferred.reject(err.name + ': ' + err.message)
                else deferred.resolve('Image deleted successfully')
            })
        })
    })
 
    return deferred.promise
}