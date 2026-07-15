const SystemSettings = require('../models/SystemSettings');

// @desc    Get system settings (Public)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne({ key: 'global' });
    if (!settings) {
      settings = await SystemSettings.create({ key: 'global' });
    }
    res.json(settings);
  } catch (error) {
    console.error('Error in getSettings:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update system settings (SuperAdmin)
// @route   PUT /api/superadmin/settings
// @access  Private (SuperAdmin)
const updateSettings = async (req, res) => {
  const { 
    watchDemoVideoUrl, platformName, supportEmail, 
    paymentGateway, taxPercentage, emailNotificationOnRegistration, 
    alertOnFailedPayment 
  } = req.body;

  try {
    let settings = await SystemSettings.findOne({ key: 'global' });
    
    if (!settings) {
      settings = new SystemSettings({ key: 'global' });
    }

    if (watchDemoVideoUrl !== undefined) settings.watchDemoVideoUrl = watchDemoVideoUrl;
    if (platformName !== undefined) settings.platformName = platformName;
    if (supportEmail !== undefined) settings.supportEmail = supportEmail;
    if (paymentGateway !== undefined) settings.paymentGateway = paymentGateway;
    if (taxPercentage !== undefined) settings.taxPercentage = taxPercentage;
    if (emailNotificationOnRegistration !== undefined) settings.emailNotificationOnRegistration = emailNotificationOnRegistration;
    if (alertOnFailedPayment !== undefined) settings.alertOnFailedPayment = alertOnFailedPayment;

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Error in updateSettings:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
