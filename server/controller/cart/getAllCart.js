const Cart = require('../../models/Cart');

const getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getAllCart;
