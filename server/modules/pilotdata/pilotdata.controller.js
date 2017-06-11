exports.getPilotdata = getPilotdata
exports.deletePilotdata = deletePilotdata
exports.postPilotdata = postPilotdata
exports.putPilotdata = putPilotdata
exports.getPilotdataById = getPilotdataById
exports.paramPilotdata = paramPilotdata

var auto = require('run-auto')
var mongoose = require('mongoose')
var pilotdatas = mongoose.model('pilotdata')
var _ = require('lodash')
//var logger = require('./../../logger.js').logger

function getPilotdata (req, res, next) {
  auto({
    pilotdatas: function (cb) {
      pilotdatas
        .find()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.pilotdatas)
  })
}

/*
function deletePilotdata (req, res, next) {
  req.pilotdata.remove(function () {
    res.status(204).send()
  })
}
*/

/*
function postPilotdata (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  req.body.user = req.user._id
  pilotdatas.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
*/

function putPilotdata (req, res, next) {
  req.pilotdata = _.merge(req.pilotdata, req.body)
  req.pilotdata.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.pilotdata)
  })
}


function getPilotdataById (req, res, next) {
  res.send(req.pilotdata)
}

function paramPilotdata (req, res, next, id) {
  req.assert('pilotdataId', 'Your Pilotdata ID cannot be blank').notEmpty()
  req.assert('pilotdataId', 'Your Pilotdata ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  auto({
    pilotdata: function (cb) {
      pilotdatas
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    req.pilotdata = results.pilotdata
    next()
  })
}
