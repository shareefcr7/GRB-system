const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const { protect, businessAdmin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, businessAdmin, getReviews);

router.post('/:businessId', submitReview);

module.exports = router;
