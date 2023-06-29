const Equipment = require('../models/equipmentModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.getAllEquipments = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Equipment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const equipments = await features.query

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: equipments.length,
    data: {
      equipments,
    },
  })
})
exports.getEquipment = catchAsync(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id)

  if (!equipment) {
    return next(new AppError('No equipment found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      equipment,
    },
  })
})

exports.createEquipment = catchAsync(async (req, res, next) => {
  const newEquipment = await Equipment.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      newEquipment,
    },
  })
})

exports.updateEquipment = catchAsync(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!equipment) {
    return next(new AppError('No equipment found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      equipment,
    },
  })
})

exports.deleteEquipment = catchAsync(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndDelete(req.params.id)

  if (!equipment) {
    return next(new AppError('No equipment found with that ID', 404))
  }

  res.status(204).json({
    status: 'succcess',
    data: null,
  })
})
