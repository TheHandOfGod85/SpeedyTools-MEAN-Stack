const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
const mongoose = require('mongoose')
const Equipment = require('../models/equipmentModel')

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection successful!'))

// READ JSON FILE
const equipments = JSON.parse(
  fs.readFileSync(`${__dirname}/equipment.json`, 'utf-8')
)

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Equipment.create(equipments)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Equipment.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

// console.log(process.argv)
// node ./data/import-data.js --import   to import
// node ./data/import-data.js --delete   to delete
