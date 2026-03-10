const User = require('../models/User');
const Business = require('../models/Business');
const bcrypt = require('bcryptjs');

// @desc    Get all businesses
// @route   GET /api/superadmin/businesses
// @access  Private (SuperAdmin)
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({});
    // We also need owner information if possible, let's fetch BusinessAdmins
    const enhancedBusinesses = await Promise.all(businesses.map(async (biz) => {
      const owner = await User.findOne({ businessId: biz._id, role: 'BusinessAdmin' });
      return {
        _id: biz._id,
        name: biz.name,
        plan: biz.subscriptionPlan,
        status: biz.status || 'Active', // Mocking status if not present
        ownerName: owner ? owner.name : 'Unknown',
        email: owner ? owner.email : 'Unknown',
        phone: biz.phone || 'N/A'
      };
    }));
    
    res.json(enhancedBusinesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new business (by SuperAdmin)
// @route   POST /api/superadmin/businesses
// @access  Private (SuperAdmin)
const addBusiness = async (req, res) => {
  const { businessName, ownerName, email, phone, plan, googleReviewLink } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create Business
    const business = await Business.create({
      name: businessName,
      phone,
      googleReviewLink: googleReviewLink || 'https://google.com',
      subscriptionPlan: plan || 'Basic',
      // Set to 1 year from now for example purposes
      trialEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), 
    });

    // Hash a default password for the new owner (they can change it later)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Business Admin User
    const user = await User.create({
      name: ownerName,
      email: email,
      password: hashedPassword,
      role: 'BusinessAdmin',
      businessId: business._id,
    });

    res.status(201).json({
      message: 'Business created successfully',
      business: business,
      user: {
        name: user.name,
        email: user.email,
        temporaryPassword: 'password123'
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all admins
// @route   GET /api/superadmin/admins
// @access  Private (SuperAdmin)
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: { $in: ['SuperAdmin', 'PlatformAdmin', 'SupportAdmin'] } }).select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new admin
// @route   POST /api/superadmin/admins
// @access  Private (SuperAdmin)
const addAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'PlatformAdmin',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get SuperAdmin dashboard statistics
// @route   GET /api/superadmin/dashboard-stats
// @access  Private (SuperAdmin)
const getDashboardStats = async (req, res) => {
  try {
    const totalBusinesses = await Business.countDocuments();
    const activeBusinesses = await Business.countDocuments({ status: { $ne: 'Suspended' } });
    
    // For revenue we mock the data for now until billing history is fully built
    const totalRevenue = totalBusinesses * 999; 
    
    const activeUsers = await User.countDocuments({ role: 'BusinessAdmin' });
    
    const recentBusinessesRes = await Business.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name subscriptionPlan status');
      
    // Map to a cleaner format for frontend
    const recentBusinesses = recentBusinessesRes.map(biz => ({
      _id: biz._id,
      name: biz.name,
      plan: biz.subscriptionPlan,
      status: biz.status || 'Active'
    }));

    res.json({
      totalBusinesses,
      totalRevenue,
      activeSubs: activeBusinesses,
      activeUsers,
      recentBusinesses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a business
// @route   PUT /api/superadmin/businesses/:id
// @access  Private (SuperAdmin)
const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    business.name = req.body.name || business.name;
    business.subscriptionPlan = req.body.plan || business.subscriptionPlan;
    business.status = req.body.status || business.status;
    const updated = await business.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a business
// @route   DELETE /api/superadmin/businesses/:id
// @access  Private (SuperAdmin)
const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    // Also delete the associated users
    await User.deleteMany({ businessId: req.params.id });
    res.json({ message: 'Business removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an admin
// @route   PUT /api/superadmin/admins/:id
// @access  Private (SuperAdmin)
const updateAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;
    const updated = await user.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an admin
// @route   DELETE /api/superadmin/admins/:id
// @access  Private (SuperAdmin)
const deleteAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Admin removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Renew a business subscription
// @route   POST /api/superadmin/businesses/:id/renew
// @access  Private (SuperAdmin)
const renewSubscription = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Add 1 year to the trialEndsAt (or whatever the current logic is for subscription duration)
    // Here we assume trialEndsAt acts as the subscription expiry date for now
    let currentExpiry = new Date(business.trialEndsAt || Date.now());
    if (currentExpiry < new Date()) {
      currentExpiry = new Date(); // If already expired, start from today
    }
    
    // Add 365 days
    const nextExpiry = new Date(currentExpiry.getTime() + 365 * 24 * 60 * 60 * 1000);
    
    business.trialEndsAt = nextExpiry;
    business.status = 'Active'; // Ensure status is marked Active
    
    await business.save();
    
    res.json({ message: 'Subscription renewed successfully', trialEndsAt: nextExpiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  renewSubscription,
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboardStats
};
