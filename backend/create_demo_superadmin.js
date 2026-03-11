const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
require("dotenv").config();

async function createSuperadmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "super@grb.com";
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      console.log("Superadmin already exists. Updating password to password123");
      const hashedPassword = await bcrypt.hash("password123", 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      console.log("Creating new superadmin...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = new User({
        name: "Super Admin",
        email: email,
        password: hashedPassword,
        role: "SuperAdmin"
      });
      await user.save();
    }
    
    console.log("✅ Superadmin account ready!");
    console.log("Email:", email);
    console.log("Password: password123");
    
  } catch (error) {
    console.error("Error creating superadmin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createSuperadmin();
