const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');
const { sendEmail, chooseMailTemplate } = require('../services/mail.service');

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email, isDeleted: false } });
    if (user) {
      return res.status(400).json({ error: { message: 'Email already exists' } });
    }
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET_VERIFY, { expiresIn: '24h' });
    newUser.verifyToken = token;
    await newUser.save();
    sendEmail(newUser.email, chooseMailTemplate(newUser, token, 'verifyEmail'));
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email, isDeleted: false } });
    if (!user) {
      return res.status(400).json({ error: { message: 'Email does not exist' } });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: { message: 'Incorrect password' } });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    const resetToken = jwt.sign({ user }, process.env.JWT_SECRET_RESET, { expiresIn: '1h' });
    await user.update({ resetToken: resetToken });
    sendEmail(user.email, chooseMailTemplate(user, resetToken, 'resetPassword'));
    return res.status(200).json({ message: 'Check your email for the reset link' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.query;
    const { password } = req.body;
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
    if (!decoded) {
      return res.status(400).json({ error: { message: 'Invalid token' } });
    }
    const user = await User.findOne({ where: { email: decoded.user.email, isDeleted: false } });
    if (!user) {
      return res.status(400).json({ error: { message: 'Email does not exist' } });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await user.update({ password: hashedPassword, resetToken: null });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.verifyEmail = async (req, res) => {
  const { verifyToken } = req.query;
  const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET_VERIFY);
  if (!decoded) {
    return res.status(400).json({ error: { message: 'Invalid token' } });
  }
  const user = await User.findOne({ where: { id: decoded.user.id, isDeleted: false } });
  if (!user) {
    return res.status(400).json({ error: { message: 'User does not exist' } });
  }
  if (user.isVerified) {
    return res.status(400).json({ error: { message: 'Email already verified' } });
  }
  await user.update({ isVerified: true });
  return res.status(200).json({ message: 'Email verified successfully' });
};

exports.resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email, isDeleted: false } });
    if (!user) {
      return res.status(400).json({ error: { message: 'Email does not exist' } });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: { message: 'Email already verified' } });
    }
    if (user.verifyToken && jwt.verify(user.verifyToken, process.env.JWT_SECRET_KEY_VERIFY)) {
      return res.status(400).json({ error: { message: 'Email already sent' } });
    }
    const newVerifyToken = jwt.sign({ user }, process.env.JWT_SECRET_VERIFY, { expiresIn: '1h' });
    sendEmail(user.email, chooseMailTemplate(user, newVerifyToken, 'verifyEmail'));
    await user.update({ verifyToken: newVerifyToken });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
