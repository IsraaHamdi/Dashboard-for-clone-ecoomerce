const Product = require('../../models/Product');

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = getProductById;
