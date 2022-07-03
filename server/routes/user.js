const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const {
  editUser,
  deleteUser,
  getAllUser,
  getUserById,
  getStatus,
} = require('../controller');

router.put('/:id', verifyTokenAndAuthorization, editUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/find/:id', verifyTokenAndAdmin, getUserById);
router.get('/', verifyTokenAndAdmin, getAllUser);
router.get('/status', verifyTokenAndAdmin, getStatus);

module.exports = router;
