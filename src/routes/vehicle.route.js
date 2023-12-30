const express = require('express');

const router = express.Router();

const { upload } = require('../configs/aws');

const vehicleController = require('../controllers/vehicle.controller');
const vehicleSchema = require('../schemas/vehicle.schema');

const validate = require('../middlewares/validateSchema');
const verify = require('../middlewares/verify');
const checkRole = require('../middlewares/checkRole');

const { ADMIN, USER } = require('../helpers/roles');

/** Get */
router.get('/', vehicleController.getAll);

router.get('/my-vehicles', verify, vehicleController.getMyVehicles);

router.get('/:id', vehicleController.getById);

/** Post */
router.post('/', verify, upload.array('photos', 3), vehicleController.create);

/** Patch */
router.patch('/:id', verify, validate(vehicleSchema.update), vehicleController.update);

/** Delete */
router.delete('/:id', verify, vehicleController.delete);

module.exports = router;
