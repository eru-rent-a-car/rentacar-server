const User = require('../models/User');

/** Create */

/** Read */
exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) return res.status(404).json({ error: { message: 'Users not found' } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Update */
exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    user.update(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/** Delete */
