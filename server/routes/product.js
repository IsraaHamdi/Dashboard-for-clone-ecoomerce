const router = require('express').Router();
const {
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
} = require('../controller');

router.post('/', verifyTokenAndAdmin, addProduct);
router.put('/:id', verifyTokenAndAdmin, editProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);
router.get('/find/:id', getProductById);
router.get('/', getAllProduct);

module.exports = router;
