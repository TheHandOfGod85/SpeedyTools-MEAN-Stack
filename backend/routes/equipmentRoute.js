const express = require('express')
const equipmentController = require('../controllers/equipmentController')
const authController = require('./../controllers/authController')

const router = express.Router()

router
    .route('/')
    // .get(authController.protect, equipmentController.getAllEquipments)
    .get(equipmentController.getAllEquipments)
    .post(equipmentController.createEquipment)

router
    .route('/:id')
    .get(equipmentController.getEquipment)
    .patch(equipmentController.updateEquipment)
    .delete(
        authController.protect,
        // authController.restrictTo('admin'),
        equipmentController.deleteEquipment
    )

module.exports = router
