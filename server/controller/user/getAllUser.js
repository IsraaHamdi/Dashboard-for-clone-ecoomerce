const User = require('../../models/User');

const getAllUser = async (req, res, next) => {
  console.log('i come')
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUser;
