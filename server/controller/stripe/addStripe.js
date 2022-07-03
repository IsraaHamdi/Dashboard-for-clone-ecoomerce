const stripe = require('stripe')(process.env.STRIPE_KEY);
const { customizedError } = require('../../utils');

const addStripe = async (req, res, next) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd',
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          throw customizedError({status: 500, message: stripeErr });
        } else {
          res.status(200).json(stripeRes);
        }
      },
    );
  } catch (error) {
    next(error);
  }
};

module.exports = addStripe;
