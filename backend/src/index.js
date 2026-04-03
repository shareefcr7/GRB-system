require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Security Middleware
app.use(helmet());
app.use(compression()); // Compress all responses to speed up loading

// Rate limiting for auth routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 login/register requests per windowMs
  message: { message: 'Too many requests, please try again later.' }
});

// General rate limit for all API routes
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
});

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
app.use('/api/', apiLimiter); // Apply general rate limiting
app.use('/api/auth', authLimiter, require('./routes/authRoutes')); // Stricter for auth
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
  
  // Keep Render Free Tier awake
  const pingRender = () => {
    // If you're on Render, process.env.RENDER_EXTERNAL_URL is automatically set,
    // otherwise you should provide the backend URL in .env
    const url = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
    if (url) {
      const https = require('https');
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log(`Self-ping successful: keeps ${url} awake`);
        }
      }).on('error', (err) => {
        console.error('Self-ping failed:', err.message);
      });
    } else {
      console.log('Self-ping skipped: RENDER_EXTERNAL_URL or BACKEND_URL is not defined in environment variables.');
    }
  };

  // Ping every 14 minutes (render sleeps after 15 mins of inactivity)
  setInterval(pingRender, 14 * 60 * 1000);
});
