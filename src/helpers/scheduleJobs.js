const schedule = require('node-schedule');

const Booking = require('../models/Booking');

const checkBookingStatus = () => {
  schedule.scheduleJob('30 14 * * *', async () => {
    try {
      const bookings = await Booking.find({ status: 'pending' });
      bookings.forEach(async (booking) => {
        if (booking.date < Date.now()) {
          booking.status = 'expired';
          await booking.save();
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { checkBookingStatus };
