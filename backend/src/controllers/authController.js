const User = require('../models/User');
const Business = require('../models/Business');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt: email='${email}', password='${password}'`);
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
        token: generateToken(user._id, user.role),
      });
    } else {
      console.log(`Login failed for ${email}`);
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new business and its admin
// @route   POST /api/auth/register-business
// @access  Public
const registerBusiness = async (req, res) => {
  const { businessName, googleReviewLink, phone, address, adminName, adminEmail, adminPassword } = req.body;

  try {
    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create Business
    const business = await Business.create({
      name: businessName,
      googleReviewLink,
      phone,
      address,
      subscriptionPlan: 'Trial',
      // Trial ends in 14 days
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create Business Admin User
    const user = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'BusinessAdmin',
      businessId: business._id,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register super admin (Initial Setup)
// @route   POST /api/auth/register-superadmin
// @access  Public (Should be protected or removed in production)
const registerSuperAdmin = async (req, res) => {
  const { name, email, password } = req.body;

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
      role: 'SuperAdmin',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerBusiness,
  registerSuperAdmin
};
