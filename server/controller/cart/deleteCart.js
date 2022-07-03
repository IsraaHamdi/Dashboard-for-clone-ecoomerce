const Cart = require('../../models/Cart');

const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted...');
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = deleteCart;
