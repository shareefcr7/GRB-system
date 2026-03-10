const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/billingController');
const { protect, businessAdmin } = require('../middlewares/authMiddleware');

router.post('/create-order', protect, businessAdmin, createOrder);
router.post('/verify-payment', protect, businessAdmin, verifyPayment);

module.exports = router;
