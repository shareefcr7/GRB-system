const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Business = require('./src/models/Business');
const Branch = require('./src/models/Branch');

async function searchDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`Connected to DB`);

    const users = await User.find({ $or: [{ name: /malabar/i }, { email: /malabar/i }] });
    console.log('Users found:', users);

    const businesses = await Business.find({ name: /malabar/i });
    console.log('Businesses found:', businesses);

    const branches = await Branch.find({ $or: [{ name: /malabar/i }, { reviewLink: /malabar/i }] });
    console.log('Branches found:', branches);

    // Also just list all businesses and branches in case it's named differently
    const allBusinesses = await Business.find({});
    console.log('All Businesses:', allBusinesses.map(b => ({id: b._id, name: b.name})));

    const allBranches = await Branch.find({});
    console.log('All Branches:', allBranches.map(b => ({id: b._id, name: b.name, link: b.reviewLink})));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

searchDB();
