const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const {
  addCart,
  editCart,
  deleteCart,
  getCartByIdUser,
  getAllCart,
} = require('../controller');

router.post('/', verifyToken, addCart);
router.put('/:id', verifyTokenAndAuthorization, editCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);
router.get('/find/:userId', verifyTokenAndAuthorization, getCartByIdUser);
router.get('/', verifyTokenAndAdmin, getAllCart);

module.exports = router;
