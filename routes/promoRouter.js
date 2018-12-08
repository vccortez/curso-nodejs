const express = require('express')

const autenticar = require('../autenticar')
const Promo = require('../models/promo')

const promoRouter = express.Router()
const unsupported = (req, res) => res.status(403).end(`${req.method} não suportado em ${req.url}`)

promoRouter.route('/')
  .get((req, res, next) => {
    Promo.find({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(autenticar.verifyUser, (req, res, next) => {
    Promo.create(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported)
  .delete(autenticar.verifyUser, (req, res, next) => {
    Promo.deleteMany({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promo.findById(req.params.promoId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(unsupported)
  .put(autenticar.verifyUser, (req, res, next) => {
    Promo.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete(autenticar.verifyUser, (req, res, next) => {
    Promo.findByIdAndRemove(req.params.promoId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

module.exports = promoRouter
