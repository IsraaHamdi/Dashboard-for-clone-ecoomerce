const cryptoJs = require('crypto-js');
const User = require('../../models/User');

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  const newUser = new User({
    username,
    password: cryptoJs.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    email,
  });
  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: ' successfully register', data: savedUser });
  } catch (error) {
    next(error);
    // res.status(500).json({ message: err.message });
  }
};

module.exports = register;
