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
  nlpProcessed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', blogPostSchema);