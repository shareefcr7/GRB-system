const Razorpay = require('razorpay');
const crypto = require('crypto');
const Business = require('../models/Business');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey12345',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key_67890',
});

// @desc Create a Razorpay Order
// @route POST /api/billing/create-order
// @access Private (Business Admin)
const createOrder = async (req, res) => {
  const { plan, amount } = req.body; // e.g., Basic, Pro, Premium
  
  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }
  
  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${req.user.businessId}_${Date.now()}`
    };
    
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: 'Error creating order' });
    }
    
    res.json({ order, plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Verify Razorpay Payment
// @route POST /api/billing/verify-payment
// @access Private (Business Admin)
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing payment signature components' });
  }
  
  try {
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key_67890')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment successful, update user's business plan
      const business = await Business.findById(req.user.businessId);
      if (business) {
        business.subscriptionPlan = plan || 'Pro'; // Default fallback
        business.subscriptionStatus = 'Active';
        // Give 30 days active state
        business.trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
        await business.save();
      }

      return res.status(200).json({
        message: 'Payment verified successfully',
        business
      });
    } else {
      return res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
