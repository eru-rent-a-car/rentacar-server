const express = require('express');

const router = express.Router();

const bookingController = require('../controllers/booking.controller');

const { create, update, accept } = require('../schemas/booking.schema');
const validate = require('../middlewares/validateSchema');

const verify = require('../middlewares/verify');
const checkRole = require('../middlewares/checkRole');
const { ADMIN, USER } = require('../helpers/roles');

/** Get */
router.get('/requests', verify, checkRole([ADMIN, USER]), bookingController.getMyBookingRequests);

router.get('/:id', checkRole([USER, ADMIN]), verify, bookingController.getById);

router.get('/', verify, checkRole([ADMIN]), bookingController.getAll);

router.get('/my', verify, checkRole([ADMIN, USER]), bookingController.getMyBookings);

/** Post */
router.post('/', verify, checkRole([USER]), validate(create), bookingController.create);

/** Patch */
router.patch('/:id', verify, checkRole([ADMIN]), validate(update), bookingController.update);

router.patch('/process/:id', verify, checkRole([ADMIN, USER]), validate(accept), bookingController.processBooking);

/** Delete */
router.delete('/:id', verify, checkRole([ADMIN]), bookingController.delete);

module.exports = router;
