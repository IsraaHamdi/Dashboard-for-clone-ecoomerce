const Cart = require('../../models/Cart');

const addCart = async (req, res, next) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({ message: 'successfully added Cart', data: savedCart });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = addCart;
