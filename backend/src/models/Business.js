const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleReviewLink: {
      type: String,
      required: true,
    },
    qrCodeUrl: {
      type: String,
    },
    subscriptionPlan: {
      type: String,
      enum: ['Trial', 'Basic', 'Pro', 'Premium'],
      default: 'Trial',
    },
    subscriptionStatus: {
      type: String,
      enum: ['Active', 'Expired', 'Cancelled'],
      default: 'Active',
    },
    trialEndsAt: {
      type: Date,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
