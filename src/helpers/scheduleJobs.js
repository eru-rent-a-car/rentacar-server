const schedule = require('node-schedule');

const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const checkBookingStatus = () => {
  schedule.scheduleJob('30 14 * * *', async () => {
    try {
      const bookings = await Booking.find({ status: 'PENDING' });
      bookings.forEach(async (booking) => {
        if (booking.endDate < Date.now()) {
          const vehicle = await Vehicle.findById(booking.vehicleId);
          vehicle.isRented = false;
          await vehicle.save();
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { checkBookingStatus };
