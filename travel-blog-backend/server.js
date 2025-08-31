// backend/server.js (or app.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/travelblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

// --- CORRECTED LINE FOR YOUR DIRECTORY STRUCTURE ---
const postRoutes = require('./src/routes/posts'); // Path: from server.js to src/routes/posts.js
app.use('/api', postRoutes); // Using 'postRoutes' for clarity, mapped to '/api'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));