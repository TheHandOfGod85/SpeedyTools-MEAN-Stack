const Equipment = require('../models/equipmentModel')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllEquipments = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}
exports.getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        equipment,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

exports.createEquipment = async (req, res) => {
  try {
    const newEquipment = Equipment.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newEquipment,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      status: 'success',
      data: {
        equipment,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

exports.deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'succcess',
      data: null,
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}
