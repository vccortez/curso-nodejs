const express = require('express')

const Combo = require('../models/combo')

const comboRouter = express.Router()
const unsupported = (req, res) => res.status(403).end(`${req.method} não suportado em ${req.url}`)

comboRouter.route('/')
  .get((req, res, next) => {
    Combo.find({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post((req, res, next) => {
    Combo.create(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported)
  .delete((req, res, next) => {
    Combo.deleteMany({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

comboRouter.route('/:comboId')
  .get((req, res, next) => {
    Combo.findById(req.params.comboId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(unsupported)
  .put((req, res, next) => {
    Combo.findByIdAndUpdate(
      req.params.comboId,
      { $set: req.body },
      { new: true }).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete((req, res, next) => {
    Combo.findByIdAndRemove(req.params.comboId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

module.exports = comboRouter
