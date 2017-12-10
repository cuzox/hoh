var Q = require('q')
var mongojs = require('mongojs')
var config = require('../config')
var shortId = require('shortid')
var db = mongojs(config.dbConnectionString, ['articles'])

var service = {}

service.getAll = getAll
service.getById = getById
service.create = create
service.update = update
service.delete = _delete

module.exports = service


function getAll() {
  var deferred = Q.defer()

  db.articles.find().toArray(function (err, articles) {
    if (err) deferred.reject(err.name + ': ' + err.message)
    else deferred.resolve(articles)
  })

  return deferred.promise
}

function getById(_id) {
  var deferred = Q.defer()

  db.articles.findOne({ _id: _id }, (err, article) => {
    if (err) deferred.reject(err.name + ': ' + err.message)
    else if (article) deferred.resolve(article)
    else deferred.reject(`Article of id ${_id} not in database`)
  })

  return deferred.promise
}

function create(articleParams) {
  var deferred = Q.defer()

  db.articles.findOne({ title: articleParams.title }, (err, article) => {
    if (err) deferred.reject(err.name + ': ' + err.message)
    else if (article) deferred.reject('Article already in database')
    else {
      articleParams._id = shortId.generate()
      db.articles.insert(articleParams, (err, article) => {
        if (err) deferred.reject(err.name + ': ' + err.message)
        else deferred.resolve(article)
      })
    }
  })

  return deferred.promise
}

function update(_id, articleParams) {
  var deferred = Q.defer()

  db.articles.findOne({ _id: _id }, (err, article) => {
    if (err) deferred.reject(err.name + ': ' + err.message)
    else if (article) updateArticle()
    else deferred.reject('Article not in database')
  })

  function updateArticle() {
    delete articleParams._id
    db.articles.update({ _id: _id }, { $set: articleParams }, (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message)
      else deferred.resolve('Article updated successfully')
    })
  }

  return deferred.promise
}

function _delete(_id) {
  var deferred = Q.defer()

  db.articles.remove({ _id: _id }, err => {
    if (err) deferred.reject(err.name + ': ' + err.message)
    else deferred.resolve('Article deleted successfully')
  })

  return deferred.promise
}