const Product = require('../../models/Product');

const addProduct = async (req, res, next) => {
  const { product } = req.body;
  const newProduct = new Product(product);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'successfully added Product', data: savedProduct });
  } catch (error) {
    next(error);
    // res.status(500).json(err);
  }
};

module.exports = addProduct;
