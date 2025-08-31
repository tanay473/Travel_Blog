// travel-blog-backend/src/routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import your Post model

// GET All Blog Posts
// Fetches all blog posts from the database.
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error("Error fetching all posts:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET A Single Blog Post by ID
// Fetches a specific blog post by its unique ID.
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(`Error fetching post with ID ${req.params.id}:`, err);
    res.status(500).json({ message: err.message });
  }
});

// POST (Create) a New Blog Post
// Receives data from the frontend and saves a new post to the database.
router.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    excerpt: req.body.excerpt,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    date: req.body.date || new Date(), // Use provided date or current date
    tags: req.body.tags || [] // Ensure tags are an array
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost); // Send back the newly created post with 201 status
  } catch (err) {
    console.error("Error creating new post:", err);
    // More specific error for validation issues
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH (Update) an Existing Blog Post (For future 'Edit Post' functionality)
router.patch('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    Object.assign(post, req.body); // Updates fields that are present in req.body

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error(`Error updating post with ID ${req.params.id}:`, err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a Blog Post (For future 'Delete Post' functionality)
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(`Error deleting post with ID ${req.params.id}:`, err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;