// travel-blog-backend/src/routes/posts.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET all posts (supports ?category= & ?tag= & ?search=)
router.get('/posts', postController.getAllPosts);

// GET posts filtered by tag (NLP / Crawler index endpoint)
router.get('/posts/tag/:tag', postController.getPostsByTag);

// POST preview Gemini NLP tags before submitting a post
router.post('/posts/nlp-preview', postController.previewNlpTags);

// Experience Ranking
router.get('/posts/experience-ranked', postController.getExperienceRanked);

// GET single post by ID
router.get('/posts/:id', postController.getPostById);

// POST create post (triggers automatic Gemini API NLP auto-tagging)
router.post('/posts', postController.createPost);

// PATCH update post (triggers automatic Gemini API NLP re-tagging if content changed)
router.patch('/posts/:id', postController.updatePost);

// POST on-demand Gemini NLP re-tagging for a post
router.post('/posts/:id/generate-tags', postController.generatePostTags);

// DELETE post
router.delete('/posts/:id', postController.deletePost);

// Destination Communities
router.get('/destinations/:destination/community', postController.getDestinationCommunity);

// User Ethics & Moderation
router.post('/posts/:id/report', postController.reportPost);
router.post('/users/:userId/ban', postController.banUser);

// Live Expense Comparisons & Budget Insights
router.post('/posts/:id/expenses', postController.addExpenseSubmission);

// EXIF-Validated Proof of Travel
router.post('/posts/verify-exif', postController.verifyExifMetadata);

module.exports = router;