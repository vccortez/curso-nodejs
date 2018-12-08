const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy, ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')

const config = require('./config')
const Usuario = require('./models/usuario')

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 })
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretKey: config.secretKey
}

exports.jwt = passport.use(new Strategy(opts, (payload, done) => {
  console.log('jwt payload:', payload)
  Usuario.findById(payload._id, (err, usuario) => {
    if (err) return done(err, false)
    if (usuario) return done(null, usuario)
    done(null, false)
  })
}))

exports.verifyUser = passport.authenticate('jwt', { session: false })

exports.local = passport.use(new LocalStrategy(Usuario.authenticate()))

passport.serializeUser(Usuario.serializeUser())
passport.deserializeUser(Usuario.deserializeUser())
