const Order = require('../../models/Order');

const addOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: 'successfully added Order', data: savedOrder });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = addOrder;
