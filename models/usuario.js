const mongoose = require('mongoose')
const passport = require('passport-local-mongoose')

const usuarioSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  admin: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.plugin(passport)

module.exports = mongoose.model('Usuario', usuarioSchema)
