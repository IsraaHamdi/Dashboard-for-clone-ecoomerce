/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const stripeRoute = require('./routes/stripe');
const { clientError, serverError } = require('./controller/error');
const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/checkout', stripeRoute);

app.use(clientError);
app.use(serverError);

module.exports = app;
