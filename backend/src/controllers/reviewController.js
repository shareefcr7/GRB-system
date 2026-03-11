const Review = require('../models/Review');
const Business = require('../models/Business');

const OpenAI = require('openai');
const twilio = require('twilio');

// Init options (ensure these gracefully fail if not provided in env)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
  : null;

// @desc    Submit a review
// @route   POST /api/reviews/:businessId
// @access  Public
const submitReview = async (req, res) => {
  const { businessId } = req.params;
  const { customerName, customerPhone, rating, feedback } = req.body;

  try {
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (rating >= 4) {
      // 4 & 5 stars -> Redirect to Google
      const newReview = await Review.create({
        businessId,
        customerName,
        customerPhone,
        rating,
        status: 'Redirected',
      });

      return res.status(200).json({
        message: 'Redirect to Google',
        redirectUrl: business.googleReviewLink,
        review: newReview
      });
    } else {
      // 1-3 stars -> Capture internally
      let sentiment = 'Neutral';
      let aiReplySuggestion = 'Thank you for your feedback. We are looking into this.';
      
      // Phase 4 - AI Sentiment Analysis (If OpenAI is configured)
      if (openai && feedback) {
        try {
          const aiPrompt = `Analyze the sentiment of this customer review: "${feedback}". Provide a one-word sentiment (e.g., Angry, Disappointed, Neutral). Then, on a new line, provide a polite, professional reply suggestion for the business owner to send to the customer.`;
          const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: aiPrompt }],
            max_tokens: 150,
          });
          
          const result = aiResponse.choices[0].message.content.split('\n');
          sentiment = result[0].trim();
          if(result.length > 1) {
            aiReplySuggestion = result.slice(1).join(' ').trim();
          }
        } catch (openaiErr) {
          console.error("OpenAI Error:", openaiErr.message);
        }
      }

      const newReview = await Review.create({
        businessId,
        customerName,
        customerPhone,
        rating,
        feedback,
        sentiment,
        aiReplySuggestion,
        status: 'Internal',
      });

      // Phase 4 - WhatsApp Notification (If Twilio is configured and business has a phone)
      if (twilioClient && business.phone && process.env.TWILIO_PHONE_NUMBER) {
        try {
          await twilioClient.messages.create({
            body: `⚠️ Alert: A ${rating}-star review was left at ${business.name}.\n\nFeedback: "${feedback}"\nSentiment: ${sentiment}\n\nPlease check your Dashboard to reply.`,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${business.phone}`
          });
        } catch (twilioErr) {
          console.error("Twilio Error:", twilioErr.message);
        }
      }

      return res.status(201).json({
        message: 'Thank you for your feedback.',
        review: newReview
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all internal reviews for a business
// @route   GET /api/reviews
// @access  Private (Business Admin)
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      businessId: req.user.businessId,
      rating: { $lt: 4 } // Only fetch 1, 2, 3 star reviews for the dashboard
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitReview,
  getReviews,
};
