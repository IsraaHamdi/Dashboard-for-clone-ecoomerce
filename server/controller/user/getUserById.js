/* eslint-disable no-underscore-dangle */
const User = require('../../models/User');

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getUserById;
