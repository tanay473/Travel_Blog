// travel-blog-backend/src/models/Post.js

const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80' },
  destination: { type: String, default: 'Global' },
  date: { type: Date, default: Date.now },
  tags: [String], // General user/custom tags
  nlpTags: [String], // Gemini API AI-extracted semantic NLP tags
  seoKeywords: [String], // Optimized search crawler keywords
  category: { type: String, default: 'Adventure' }, // Travel niche category
  metaDescription: { type: String, default: '' }, // Concise search snippet for SEO crawlers
  readingTime: { type: Number, default: 4 }, // Estimated read time in minutes
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  nlpProcessed: { type: Boolean, default: false },
  
  // Destination Communities & Experience Ranking
  experienceType: { type: String, enum: ['Cuisine', 'Stay', 'Nature', 'General'], default: 'General' },
  uniqueFeatures: [String],
  
  // User Ethics & Moderation
  authorContact: { 
    email: String, 
    social: String 
  },
  reports: [{
    reportedBy: String,
    reason: String,
    date: { type: Date, default: Date.now }
  }],
  isFlagged: { type: Boolean, default: false },

  // Live Expense Comparisons & Community Budget Insights
  authorSpent: {
    amount: { type: Number, default: 40000 },
    currency: { type: String, default: 'INR' }
  },
  communityExpenses: [{
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    categoryBreakdown: {
      stay: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      transport: { type: Number, default: 0 }
    },
    date: { type: Date, default: Date.now }
  }],

  // EXIF-Validated Proof of Travel
  exifData: {
    verified: { type: Boolean, default: true },
    gpsLocation: { type: String, default: '' },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    dateTaken: { type: String, default: '' },
    cameraModel: { type: String, default: 'iPhone 15 Pro' }
  }
});

module.exports = mongoose.model('Post', blogPostSchema);