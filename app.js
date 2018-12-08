const path = require('path')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser')
const passport = require('passport')
const sessao = require('express-session')
const FileStore = require('session-file-store')(sessao)

const config = require('./config')

const index = require('./routes/index')
const users = require('./routes/users')

const pizzaRouter = require('./routes/pizzaRouter')
const promoRouter = require('./routes/promoRouter')
const comboRouter = require('./routes/comboRouter')

// mongoose connection
mongoose.connect(config.mongoURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('conectado ao banco'))
  .catch(console.error)

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(cookieParser('segredo'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(sessao({
  name: 'sessao-id',
  secret: 'segredo',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', index)
app.use('/users', users)

app.use('/pizzas', pizzaRouter)
app.use('/promos', promoRouter)
app.use('/combos', comboRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
