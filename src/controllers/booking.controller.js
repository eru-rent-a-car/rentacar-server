const Booking = require('../models/Booking');

/** Create */
exports.create = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    return res.status(201).send(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Read */
exports.getById = async (req, res) => {};

exports.getMyBookingRequests = async (req, res) => {};

/** Update */
exports.update = async (req, res) => {};

exports.acceptBooking = async (req, res) => {};

/** Delete */
