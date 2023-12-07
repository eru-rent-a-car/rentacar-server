const Vehicle = require('../models/Vehicle');
const VehiclePhoto = require('../models/VehiclePhoto');
const Photo = require('../models/Photo');

/** Create */
exports.create = async (req, res) => {
  try {
    console.log(req.files);
    const photos = req.files;
    const vehicle = await Vehicle.create({ ...req.body, userId: req.user.id });
    Object.keys(photos).forEach(async (key) => {
      Photo.create({ url: photos[key].location })
        .then((photo) => {
          VehiclePhoto.create({ vehicleId: vehicle.id, photoId: photo.id });
        })
        .catch((error) => {
          return res.status(401).json(error);
        });
    });
    return res.status(201).json(vehicle);
  } catch (error) {
    throw error;
  }
};

/** Read */
exports.getAll = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const vehicles = await Vehicle.findAll({
      where: { isRented: false, isDeleted: false },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        {
          model: VehiclePhoto,
          include: [Photo],
        },
      ],
    });
    if (!vehicles) return res.status(404).json({ error: { message: 'No Cars Available' } });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { id: req.params.id, isRented: false, isDeleted: false },
      include: [
        {
          model: VehiclePhoto,
          include: [Photo],
        },
      ],
    });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Update */
exports.update = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id, userId: req.user.id, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    await vehicle.update(req.body);
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Delete */
exports.delete = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id, userId: req.user.id, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found!' } });
    await vehicle.update({ isDeleted: true });
    await VehiclePhoto.update({ isDeleted: true }, { where: { vehicleId: vehicle.id } });
    await Photo.update({ isDeleted: true }, { where: { id: vehicle.photoId } });
    return res.status(200).json({ message: 'Vehicle deleted successfully!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
