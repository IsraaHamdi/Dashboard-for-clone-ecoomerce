const Cart = require('../../models/Cart');

const editCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: 'successfully updated Cart', data: updatedCart });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = editCart;
