const express = require('express');

const router = express.Router();

const bookingController = require('../controllers/booking.controller');

const bookingSchema = require('../schemas/booking.schema');
const validate = require('../middlewares/validateSchema');

const verify = require('../middlewares/verify');
const checkRole = require('../middlewares/checkRole');
const { ADMIN, USER } = require('../helpers/roles');

/** Get */
router.get('/:id', verify, bookingController.getById);

/** Post */
router.post('/', verify, validate(bookingSchema.create), bookingController.create);

/** Patch */
router.patch('/:id', verify, validate(bookingSchema.update), bookingController.update);

router.patch('/accept/:id', verify, checkRole([ADMIN, USER]), bookingController.acceptBooking);

/** Delete */
module.exports = router;
