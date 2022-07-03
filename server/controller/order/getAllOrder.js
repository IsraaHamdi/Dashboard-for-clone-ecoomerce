const Order = require('../../models/Order');

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getAllOrder;
