const router = require('express').Router();
const { addStripe } = require('../controller');

router.post('/payment', addStripe);

module.exports = router;
