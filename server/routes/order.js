const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const {
  addOrder,
  editOrder,
  deleteOrder,
  getOrderByIdUser,
  getAllOrder,
  getIncomeOrder,
} = require('../controller');

router.post('/', verifyToken, addOrder);
router.put('/:id', verifyTokenAndAdmin, editOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);
router.get('/find/:userId', verifyTokenAndAuthorization, getOrderByIdUser);
router.get('/', verifyTokenAndAdmin, getAllOrder);
router.get('/income', verifyTokenAndAdmin, getIncomeOrder);

module.exports = router;
