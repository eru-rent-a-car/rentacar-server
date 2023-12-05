const express = require('express');

const router = express.Router();

const bookingController = require('../controllers/booking.controller');

const bookingSchema = require('../schemas/booking.schema');
const validate = require('../middlewares/validateSchema');

const verify = require('../middlewares/verify');
const checkRole = require('../middlewares/checkRole');
const roles = require('../helpers/roles');

/** Get */
router.get('/', verify, checkRole([roles.ADMIN]), bookingController.getAll);

router.get('/:id', verify, bookingController.getById);

/** Post */
router.post('/', verify, validate(bookingSchema.create), bookingController.create);

/** Patch */
router.patch('/:id', verify, checkRole([roles.ADMIN]), validate(bookingSchema.update), bookingController.update);

/** Delete */
router.delete('/:id', verify, checkRole([roles.ADMIN]), bookingController.delete);

module.exports = router;
