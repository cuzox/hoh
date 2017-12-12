'use strict'

exports.imgType = function (type) {
  return (req) => {
    req.imgType = type
    next()
  }
}