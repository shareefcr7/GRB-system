const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'global'
    },
    watchDemoVideoUrl: {
      type: String,
      default: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    platformName: {
      type: String,
      default: 'GRB App'
    },
    supportEmail: {
      type: String,
      default: 'support@grb.com'
    },
    paymentGateway: {
      type: String,
      default: 'Razorpay'
    },
    taxPercentage: {
      type: Number,
      default: 18
    },
    emailNotificationOnRegistration: {
      type: Boolean,
      default: true
    },
    alertOnFailedPayment: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
