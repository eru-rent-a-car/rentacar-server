const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

/** Create */
exports.create = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.body.vehicleId, isDeleted: false } });
    if (!vehicle) return res.status(404).json({ error: { message: 'Vehicle not found' } });
    if (vehicle.isRented) return res.status(400).json({ error: { message: 'Vehicle is already rented' } });
    if (vehicle.userId === req.user.id) return res.status(400).json({ error: { message: 'You cannot rent your own vehicle' } });
    const booking = new Booking({ userId: req.user.id, ...req.body });
    await booking.save();
    return res.status(201).send(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Read */
exports.getById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: { message: 'Booking not found' } });
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const bookings = await Booking.findAll({
      where: { isDeleted: false },
      limit: limit || 10,
      offset: offset || 0,
    });
    if (!bookings || bookings.length === 0) return res.status(404).json({ error: { message: 'Bookings not found' } });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getMyBookingRequests = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { status: 'PENDING', isDeleted: false },
      include: [{ model: Vehicle, where: { userId: req.user.id } }],
    });
    if (!bookings || bookings.length === 0) return res.status(404).json({ error: { message: 'Bookings not found' } });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Update */
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!booking) return res.status(404).json({ error: { message: 'Booking not found' } });
    await booking.update(req.body);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id }, include: [Vehicle] });
    if (!booking) return res.status(404).json({ error: { message: 'Booking not found' } });
    if (booking.Vehicle.userId !== req.user.id) return res.status(403).json({ error: { message: 'Unauthorized' } });
    if (booking.Vehicle.isRented) return res.status(400).json({ error: { message: 'Vehicle is already rented' } });
    if (req.body.status === 'REJECTED') {
      await booking.update({ status: 'REJECTED' });
      return res.status(200).json(booking);
    }
    if (req.body.status === 'APPROVED') {
      await booking.update({ status: 'APPROVED' });
      await booking.Vehicle.update({ isRented: true });
      return res.status(200).json(booking);
    }
    return res.status(400).json({ error: { message: 'Invalid status' } });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Delete */
exports.delete = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!booking) return res.status(404).json({ error: { message: 'Booking not found' } });
    await booking.update({ isDeleted: true });
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
};
