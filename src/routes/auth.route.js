const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const userSchema = require('../schemas/user.schema');
const validate = require('../middlewares/validateSchema');

/** Post */
router.post('/register', validate(userSchema.register), authController.register);

router.post('/login', validate(userSchema.login), authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/resend-verification-email', authController.resendVerificationEmail);

/** Patch */
router.patch('/reset-password/:resetToken', authController.resetPassword);

router.patch('/verify-email/:verifyToken', authController.verifyEmail);

module.exports = router;
