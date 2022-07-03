const Product = require('../../models/Product');

const editProduct = async (req, res, next) => {
  const { product } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: product,
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: 'successfully updated Product', data: updatedProduct });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = editProduct;
