const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const Business = require("./src/models/Business");
const Branch = require("./src/models/Branch");
require("dotenv").config();

async function createMalabarMenu() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const email = "admin@malabarmenu.com";
    const password = "password123";
    const googleLink = "https://share.google/F1ktsEPabFLxTITWo";

    // 1. Check if business exists
    let business = await Business.findOne({ name: "Malabar Menu" });
    if (!business) {
      business = new Business({
        name: "Malabar Menu",
        googleReviewLink: googleLink,
        subscriptionPlan: "Trial",
        subscriptionStatus: "Active",
      });
      await business.save();
      console.log("✅ Business 'Malabar Menu' created.");
    } else {
      console.log("ℹ️ Business 'Malabar Menu' already exists.");
    }

    // 2. Check if branch exists
    let branch = await Branch.findOne({ businessId: business._id });
    if (!branch) {
      branch = new Branch({
        businessId: business._id,
        name: "Main Branch",
        location: "Kozhikode",
        googleReviewLink: googleLink,
      });
      await branch.save();
      console.log("✅ Main Branch created.");
    } else {
      console.log("ℹ️ Main Branch already exists.");
    }

    // 3. Create User
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name: "Malabar Admin",
        email: email,
        password: hashedPassword,
        role: "BusinessAdmin",
        businessId: business._id,
      });
      await user.save();
      console.log("✅ Admin User for Malabar Menu created.");
    } else {
      console.log("ℹ️ Admin User already exists.");
    }

    console.log("\n--- ACCOUNT DETAILS ---");
    console.log("Login URL: Use Dashboard Login");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("------------------------\n");

  } catch (error) {
    console.error("Error creating Malabar Menu:", error);
  } finally {
    mongoose.disconnect();
  }
}

createMalabarMenu();
