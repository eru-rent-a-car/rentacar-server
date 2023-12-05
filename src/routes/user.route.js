const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const { update } = require('../schemas/user.schema');

const validate = require('../middlewares/validateSchema');
const verify = require('../middlewares/verify');
const checkRole = require('../middlewares/checkRole');

const { ADMIN, USER } = require('../helpers/roles');

/** Get */
router.get('/:id', verify, userController.getById);

/** Post */

/** Patch */
router.patch('/:id', verify, checkRole([USER, ADMIN]), validate(update), userController.update);

/** Delete */

module.exports = router;
