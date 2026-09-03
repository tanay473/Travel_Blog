// backend/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection with soft failure fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travelblog';
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 3000
})
.then(() => console.log('MongoDB connected successfully...'))
.catch(err => console.log('MongoDB local service offline - operating with smart in-memory store fallback.'));

// Routes
const postRoutes = require('./src/routes/posts');
app.use('/api', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Travel Blog API with Gemini 2.5 Flash NLP Tagging Service is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));