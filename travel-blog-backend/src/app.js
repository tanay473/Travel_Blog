const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests from your React app
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/posts', postsRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Travel Blog API!');
});

module.exports = app;