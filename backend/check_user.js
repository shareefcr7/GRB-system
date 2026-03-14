const mongoose = require("mongoose");
const User = require("./src/models/User");
require("dotenv").config();

async function checkUser() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "shareefnncr@gmail.com" });
  console.log("User found:", user);
  process.exit();
}

checkUser();
