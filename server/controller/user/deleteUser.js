const User = require('../../models/User');

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = deleteUser;
