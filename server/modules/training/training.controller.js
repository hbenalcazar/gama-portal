exports.getTraining = getTraining
exports.deleteTraining = deleteTraining
exports.postTraining = postTraining
exports.putTraining = putTraining
exports.getTrainingById = getTrainingById
exports.paramTraining = paramTraining

var auto = require('run-auto')
var mongoose = require('mongoose')
var trainings = mongoose.model('training')
var _ = require('lodash')
//var logger = require('./../../logger.js').logger

function getTraining (req, res, next) {
  auto({
    trainings: function (cb) {
      trainings
        .find()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.trainings)
  })
}

function deleteTraining (req, res, next) {
  req.training.remove(function () {
    res.status(204).send()
  })
}

function postTraining (req, res, next) {
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
  trainings.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function putTraining (req, res, next) {
  req.training = _.merge(req.training, req.body)
  req.training.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.training)
  })
}


function getTrainingById (req, res, next) {
  res.send(req.training)
}

function paramTraining (req, res, next, id) {
  req.assert('trainingId', 'Your Training ID cannot be blank').notEmpty()
  req.assert('trainingId', 'Your Training ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  auto({
    training: function (cb) {
      trainings
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    req.training = results.training
    next()
  })
}
