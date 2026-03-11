const mongoose = require('mongoose');
require('dotenv').config();

async function checkConnection() {
  console.log('Testing MongoDB Connection with provided URI...');
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`✅ Success! Connected to MongoDB: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error(error.message);
    process.exit(1);
  }
}

checkConnection();
