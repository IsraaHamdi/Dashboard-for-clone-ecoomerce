const {
  editUser, deleteUser, getAllUser, getUserById, getStatus,
} = require('./user');

const {
  addCart,
  editCart,
  deleteCart,
  getCartByIdUser,
  getAllCart,
} = require('./cart');

const {
  addOrder,
  editOrder,
  deleteOrder,
  getOrderByIdUser,
  getAllOrder,
  getIncomeOrder,
} = require('./order');

const {
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
} = require('./product');

const { login, register } = require('./auth');

const addStripe = require('./stripe');

module.exports = {
  editUser,
  deleteUser,
  getAllUser,
  getUserById,
  getStatus,
  addCart,
  editCart,
  deleteCart,
  getCartByIdUser,
  getAllCart,
  addOrder,
  editOrder,
  deleteOrder,
  getOrderByIdUser,
  getAllOrder,
  getIncomeOrder,
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
  login,
  register,
  addStripe,
};
