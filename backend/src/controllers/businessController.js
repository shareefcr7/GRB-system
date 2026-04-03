const Business = require('../models/Business');
const Review = require('../models/Review');
const QRCode = require('qrcode');
const NodeCache = require('node-cache');

// Initialize cache with 1 minute expiration to improve performance
const statsCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// @desc    Get business details
// @route   GET /api/business
// @access  Private (Business Admin)
const getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.user.businessId);

    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update business details
// @route   PUT /api/business
// @access  Private (Business Admin)
const updateBusiness = async (req, res) => {
  const { name, googleReviewLink, phone, address } = req.body;

  try {
    const business = await Business.findById(req.user.businessId);

    if (business) {
      business.name = name || business.name;
      business.googleReviewLink = googleReviewLink || business.googleReviewLink;
      business.phone = phone || business.phone;
      business.address = address || business.address;

      const updatedBusiness = await business.save();
      res.json(updatedBusiness);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate QR Code for Business
// @route   POST /api/business/generate-qr
// @access  Private (Business Admin)
const generateQR = async (req, res) => {
  try {
    const business = await Business.findById(req.user.businessId);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // The URL the QR code points to (Frontend Scanner Page)
    // FRONTEND_URL is dynamic based on env
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const scannerUrl = `${frontendUrl}/r/${business._id}`;

    // Generate QR Code as Data URI
    const qrCodeDataUri = await QRCode.toDataURL(scannerUrl);

    business.qrCodeUrl = qrCodeDataUri;
    await business.save();

    res.json({
      qrCodeUrl: business.qrCodeUrl,
      scannerUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get public business info (for scanner)
// @route   GET /api/business/public/:id
// @access  Public
const getPublicBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).select('name googleReviewLink');
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business stats (Scans, Ratings, Feedback)
// @route   GET /api/business/stats
// @access  Private (Business Admin)
const getBusinessStats = async (req, res) => {
  try {
    const businessId = req.user.businessId;

    // Check if stats are in cache
    const cacheKey = `stats_${businessId}`;
    const cachedStats = statsCache.get(cacheKey);

    if (cachedStats) {
      return res.json(cachedStats);
    }

    const mongoose = require('mongoose');
    const stats = await Review.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(businessId) } },
      {
        $group: {
          _id: null,
          totalScans: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          internalFeedbackCount: {
            $sum: { $cond: [{ $lt: ['$rating', 4] }, 1, 0] }
          },
          unresolvedIssues: {
            $sum: {
              $cond: [
                { $and: [{ $lt: ['$rating', 4] }, { $eq: ['$resolutionStatus', 'Pending'] }] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalScans: 0,
      avgRating: 0,
      internalFeedbackCount: 0,
      unresolvedIssues: 0,
    };

    const finalResult = {
      totalScans: result.totalScans,
      avgRating: result.avgRating ? result.avgRating.toFixed(1) : 0,
      internalFeedbackCount: result.internalFeedbackCount,
      unresolvedIssues: result.unresolvedIssues,
      scansGrowth: '+12.5%', // Mocked growth for now
      ratingGrowth: '+0.1'
    };

    // Save to cache
    statsCache.set(cacheKey, finalResult);

    res.json(finalResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusiness,
  updateBusiness,
  generateQR,
  getPublicBusiness,
  getBusinessStats
};
