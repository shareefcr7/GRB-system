const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      index: true,
    },
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String, // Internal feedback for 1-3 stars
    },
    sentiment: {
      type: String, // e.g., 'Angry', 'Disappointed', 'Neutral'
    },
    aiReplySuggestion: {
      type: String, // The generated reply from AI
    },
    status: {
      type: String,
      enum: ['Internal', 'Redirected'],
      default: 'Internal',
    },
    resolutionStatus: {
      type: String,
      enum: ['Pending', 'Resolved'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
