const Cart = require('../../models/Cart');

const getCartByIdUser = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getCartByIdUser;
