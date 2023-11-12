const express = require('express');

const router = express.Router();

const vehicleController = require('../controllers/vehicle.controller');
const vehicleSchema = require('../schemas/vehicle.schema');
const validate = require('../middlewares/validateSchema');
const verify = require('../middlewares/verify');

/** Get */
router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getById);

/** Post */
router.post('/', verify, validate(vehicleSchema.create), vehicleController.create);

/** Patch */
router.patch('/:id', verify, validate(vehicleSchema.update), vehicleController.update);

/** Delete */
router.delete('/:id', verify, vehicleController.delete);

module.exports = router;
