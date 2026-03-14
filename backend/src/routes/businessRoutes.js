const express = require('express');
const router = express.Router();
const { getBusiness, updateBusiness, generateQR, getPublicBusiness, getBusinessStats } = require('../controllers/businessController');
const { protect, businessAdmin } = require('../middlewares/authMiddleware');

router.get('/public/:id', getPublicBusiness);
router.get('/stats', protect, businessAdmin, getBusinessStats);

router.route('/')
  .get(protect, businessAdmin, getBusiness)
  .put(protect, businessAdmin, updateBusiness);

router.post('/generate-qr', protect, businessAdmin, generateQR);

module.exports = router;
