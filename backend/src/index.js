require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://grb-system-fbaw.vercel.app',
  process.env.FRONTEND_URL?.replace(/\/$/, ''),
  process.env.MARKETING_URL?.replace(/\/$/, '')
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Just temporarily allow everything if not in the array so we don't break production, but log it
      console.log(`Unrecognized origin allowed: ${origin}`);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/business', require('./routes/businessRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/superadmin', require('./routes/superAdminRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('GRB API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
