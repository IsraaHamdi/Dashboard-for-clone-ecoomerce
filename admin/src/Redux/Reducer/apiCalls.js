import { loginFailure, loginStart, loginSuccess } from "./user";
import axios from "axios";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./product";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.accessToken

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    console.log('from try')
    const res = await axios.post("/api/v1/auth/login",user);
    console.log('done')
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err, 'from catch')
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  const cancelTokenSource = axios.CancelToken.source();
  dispatch(getProductStart())
  axios
    .get(`/api/v1/products/`, {
      cancelToken: cancelTokenSource.token,
      headers: { token: `Bearer ${TOKEN}` },
    })
    .then(({ data }) => {
      dispatch(getProductSuccess(data));
    })
    .catch((error) => {
      dispatch(getProductFailure());
      console.log(error, "erge");
    });

  return () => cancelTokenSource.cancel();
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart())
  axios
    .delete(`/api/v1/products/${id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    })
    .then(() => {
      dispatch(deleteProductSuccess(id));
    })
    .catch((error) => {
      dispatch(deleteProductFailure());
      console.log(error, "erge");
    });
};

export const updateProduct = async (id, product, dispatch) => {

  dispatch(updateProductStart())
  axios
    .put(`/api/v1/products/${id}`, { product },{
      headers: { token: `Bearer ${TOKEN}` },
    })
    .then(({ data }) => {
      console.log(data)
      dispatch(updateProductSuccess({ id, product }));
    })
    .catch((error) => {
      dispatch(updateProductFailure());
      console.log(error, "erge");
    });
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  axios
    .post(`/api/v1/products/`, { product }, {
      headers: { token: `Bearer ${TOKEN}` },
    })
    .then(({ data }) => {
      console.log(data)
      // dispatch(addProductSuccess(data));
    })
    .catch((error) => {
      dispatch(addProductFailure());
      console.log(error, "erge");
    });
  dispatch(addProductStart());
};