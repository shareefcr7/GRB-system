const express = require('express');
const router = express.Router();
const { submitReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect, businessAdmin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, businessAdmin, getReviews);

router.route('/:id')
  .delete(protect, businessAdmin, deleteReview);

router.post('/:businessId', submitReview);

module.exports = router;
