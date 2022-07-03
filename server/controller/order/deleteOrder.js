const Order = require('../../models/Order');

const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order has been deleted...');
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = deleteOrder;
