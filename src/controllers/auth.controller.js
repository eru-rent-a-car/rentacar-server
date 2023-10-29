const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { validateRegister, validateLogin } = require('../validators/user.validate');

require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const user = await User.findOne({ where: { email: req.body.email, isDeleted: false } });
    if (user) {
      return res.status(400).json({ error: { message: 'Email already exists' } });
    }
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const user = await User.findOne({ where: { email: req.body.email, isDeleted: false } });
    if (!user) {
      return res.status(400).json({ error: { message: 'Email does not exist' } });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: { message: 'Incorrect password' } });
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email, isDeleted: false } });
    if (!user) {
      return res.status(400).json({ error: { message: 'Email does not exist' } });
    }
    const resetToken = jwt.sign(user, process.env.JWT_SECRET_RESET, { expiresIn: '1h' });
    await user.update({ resetToken });
    return res.status(200).json({ message: 'Check your email for the reset link' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
    if (!decoded) {
      return res.status(400).json({ error: { message: 'Invalid token' } });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.verifyEmail = async (req, res) => {};

exports.resendVerificationEmail = async (req, res) => {};
