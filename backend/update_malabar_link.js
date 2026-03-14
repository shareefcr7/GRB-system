const mongoose = require("mongoose");
const Business = require("./src/models/Business");
const Branch = require("./src/models/Branch");
require("dotenv").config();

async function updateLink() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Constructing the direct review link using the provided Place ID
    const placeId = "ChIJwxVOiCVbpjsRNuFjORahaqo";
    const newLink = `https://search.google.com/local/writereview?placeid=${placeId}`;
    
    console.log("New Direct Review Link:", newLink);

    const business = await Business.findOne({ name: "Malabar Menu" });
    if (business) {
        business.googleReviewLink = newLink;
        await business.save();
        console.log("✅ Business review link updated successfully.");
    } else {
        console.log("❌ Business not found.");
    }

    const branch = await Branch.findOne({ businessId: business?._id });
    if (branch) {
        branch.googleReviewLink = newLink;
        await branch.save();
        console.log("✅ Branch review link updated successfully.");
    }

  } catch (error) {
    console.error("Error updating link:", error);
  } finally {
    mongoose.disconnect();
  }
}

updateLink();
