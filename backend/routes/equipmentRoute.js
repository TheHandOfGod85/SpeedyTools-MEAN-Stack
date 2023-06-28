const express = require('express')
const equipmentController = require('../controllers/equipmentController')

const router = express.Router()

router
  .route('/')
  .get(equipmentController.getAllEquipments)
  .post(equipmentController.createEquipment)

router
  .route('/:id')
  .get(equipmentController.getEquipment)
  .patch(equipmentController.updateEquipment)
  .delete(equipmentController.deleteEquipment)

module.exports = router
