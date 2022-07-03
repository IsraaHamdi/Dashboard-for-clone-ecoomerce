const cryptoJs = require('crypto-js');
const User = require('../../models/User');

const editUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY,
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: 'successfully updated', data: updatedUser });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = editUser;
