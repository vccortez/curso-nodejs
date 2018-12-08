const express = require('express')
const passport = require('passport')

const { getToken } = require('../autenticar')
const Usuario = require('../models/usuario')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  Usuario.register(new Usuario({
    username: req.body.username
  }), req.body.password, (err, usuario) => {
    if (err) {
      return next(err)
    } else {
      passport.authenticate('local')(req, res, () => {
        res.json({ mensagem: 'Usuário adicionado com sucesso' })
      })
    }
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = getToken({ _id: req.user._id })
  res.json({ sucess: true, token, message: 'Usuário logado com sucesso' })
})

module.exports = router
