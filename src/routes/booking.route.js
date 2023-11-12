const express = require('express');

const router = express.Router();

const bookingController = require('../controllers/booking.controller');
const bookingSchema = require('../schemas/booking.schema');
const validate = require('../middlewares/validateSchema');
const verify = require('../middlewares/verify');

/** Get */
router.get('/', verify, bookingController.getAll);

router.get('/:id', verify, bookingController.getById);

/** Post */
router.post('/', verify, validate(bookingSchema.create), bookingController.create);

/** Patch */
router.patch('/:id', verify, validate(bookingSchema.update), bookingController.update);

/** Delete */
router.delete('/:id', verify, bookingController.delete);

module.exports = router;
