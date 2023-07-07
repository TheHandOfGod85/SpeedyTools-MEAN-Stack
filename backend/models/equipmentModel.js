const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An equipment must have a name'],
  },
  description: String,
  quantity: {
    type: Number,
    default: 0,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, 'An equipment must have a serial number'],
  },
  manufacturer: {
    type: String,
    required: [true, 'An equipment must have a manufacturer'],
  },
  installationDate: Date,
  powerRequirement: {
    type: Number,
    required: [true, 'An equipment must have a power requirement'],
  },
  location: {
    type: String,
    required: [true, 'An equipment must have a location'],
  },
})

equipmentSchema.plugin(uniqueValidator, {
  message: 'Expected to be unique.',
})

const Equipment = mongoose.model('Equipment', equipmentSchema)

module.exports = Equipment
