const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be provided'],
  },
  email: {
    type: String,
    required: [true, 'An email must be provided'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // this only works on create or save
    validate: {
      validator: function (element) {
        return element === this.password //custom validation to make sure password and confirm matches
      },
      message: 'Password are not the same',
    },
  },
})
// Encrypt the password with mongoose middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

//instance method to decrypt the password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)
module.exports = User
