var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.connectionString, ['children'])
var shortid = require('shortid')
var multer = require('multer')
var fs = require('fs')
var upload = multer({ dest: config.imageUrl })

shortid.characters(config.shortId);

var service = {}

service.getById = getById
service.create = create
service.delete = _delete

module.exports = service


function getById(_id) {
    var deferred = Q.defer()
 
    db.children.finOne(
        { _id: _id}, 
        function (err, child) {
        if (err) deferred.reject(err.name + ': ' + err.message)
 
        if (child) {
            deferred.resolve(child)
        } else {
            deferred.resolve()
        }
    })
 
    return deferred.promise
}

function create(childParams) {
    var deferred = Q.defer()
    try {
        let id = shortId.generate()

        fs.writeFile(config.upload, req.file, function(err) {
            if(err) {
                return deferred.defer(`Error writing image to disk: ${err}`);
            }
        
            console.log("The file was saved!");
        }); 

        req.file

        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        deferred.defer("Error writing image to disk")
    }
 

 
    function creageImage() {  
        if (!shortid.isValid(childParams._id))
            childParams._id = shortid.generate()
        
        db.children.insert(
            childParams,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message)
 
                deferred.resolve()
            }
        )
    }
 
    return deferred.promise
}

function _delete(_id) {
    var deferred = Q.defer()
 
    db.children.remove(
        { _id: mongojs.ObjectId(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message)
 
            deferred.resolve()
        })
 
    return deferred.promise
}


