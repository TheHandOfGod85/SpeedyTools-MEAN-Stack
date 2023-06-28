const mongoose = require('mongoose')

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
  },
  manufacturer: {
    type: String,
    required: true,
  },
  installationDate: Date,
  powerRequirement: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
})

const Equipment = mongoose.model('Equipment', equipmentSchema)

module.exports = Equipment
