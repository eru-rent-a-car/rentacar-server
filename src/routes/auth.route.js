const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth');

/** Post */
router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/resend-verification-email', authController.resendVerificationEmail);

/** Patch */
router.patch('/reset-password/:resetToken', authController.resetPassword);

router.patch('/verify-email/:verifyToken', authController.verifyEmail);

module.exports = router;
