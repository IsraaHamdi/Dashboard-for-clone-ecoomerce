const Order = require('../../models/Order');

const editOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: 'successfully updated Order', data: updatedOrder });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = editOrder;
