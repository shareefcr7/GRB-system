const Business = require('../models/Business');
const QRCode = require('qrcode');

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

module.exports = {
  getBusiness,
  updateBusiness,
  generateQR,
  getPublicBusiness,
};
