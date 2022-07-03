const Order = require('../../models/Order');

const getOrderBuIdUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getOrderBuIdUser;
