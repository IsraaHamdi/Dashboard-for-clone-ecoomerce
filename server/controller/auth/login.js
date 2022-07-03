/* eslint-disable no-underscore-dangle */
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { customizedError } = require('../../utils');

const login = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw customizedError({ status: 400, message: 'Wrong with password or username' });
      // res.status(400).json('Wrong with password or username');
    }

    const hashedPassword = cryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY,
    );

    const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);

    const inputPassword = req.body.password;
    if (originalPassword !== inputPassword) {
      throw customizedError({ status: 401, message: 'Wrong with password or username' });
      // res.status(400).json(' Wrong with password or username');
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' },
    );

    const { password, ...others } = user._doc;
    res
      .status(200)
      .json({ message: 'login successfully', data: others, accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
