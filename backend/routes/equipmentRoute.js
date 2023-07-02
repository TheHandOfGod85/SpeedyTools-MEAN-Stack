const express = require('express')
const equipmentController = require('../controllers/equipmentController')
const authController = require('./../controllers/authController')

const router = express.Router()

router
  .route('/')
  .get(authController.protect, equipmentController.getAllEquipments)
  .post(equipmentController.createEquipment)

router
  .route('/:id')
  .get(equipmentController.getEquipment)
  .patch(equipmentController.updateEquipment)
  .delete(equipmentController.deleteEquipment)

module.exports = router
