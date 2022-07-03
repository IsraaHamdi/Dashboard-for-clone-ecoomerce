const Product = require('../../models/Product');

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = deleteProduct;
