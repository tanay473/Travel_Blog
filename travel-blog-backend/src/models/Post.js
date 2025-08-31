// travel-blog-backend/src/models/Post.js

const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: 'https://via.placeholder.com/600x400?text=No+Image' },
  date: { type: Date, default: Date.now },
  tags: [String] // Array of strings for tags
});

// Export the model, named 'Post'
module.exports = mongoose.model('Post', blogPostSchema);