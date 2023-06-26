const express = require('express')
const exampleController = require('../controllers/exampleController')

const router = express.Router()

router.route('/').get(exampleController.helloWorld)

module.exports = router
