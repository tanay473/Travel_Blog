const Post = require('../models/Post');
const { generateNlpMetadata } = require('../services/geminiService');

// In-Memory Fallback Store if MongoDB is unavailable locally
let inMemoryPosts = [
  {
    _id: '101',
    title: 'Exploring the Hidden Alpine Valleys of Switzerland',
    author: 'Elena Rostova',
    destination: 'Interlaken, Switzerland',
    category: 'Adventure',
    excerpt: 'Embark on a breathtaking journey through glacial lakes, dramatic peaks, and idyllic Swiss chalets.',
    content: '<p>Switzerland is home to some of the most dramatic mountain scenery on Earth. Starting from Interlaken, we hiked through the Lauterbrunnen Valley, known as the valley of 72 waterfalls. The fresh alpine air, combined with traditional Swiss hospitality, makes this a must-visit destination for outdoor enthusiasts.</p><p>Be sure to take the cogwheel train up to Jungfraujoch, the Top of Europe, for unforgettable panoramic views of the Aletsch Glacier.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-15'),
    tags: ['Switzerland', 'Hiking', 'Alps', 'Nature'],
    nlpTags: ['Alpine Hiking', 'Glacial Lakes', 'Eco Tourism', 'Mountain Peaks'],
    seoKeywords: ['switzerland travel guide 2026', 'best hiking in interlaken', 'lauterbrunnen waterfalls'],
    metaDescription: 'Discover hidden alpine valleys, glacial waterfalls, and mountain peaks in Switzerland.',
    readingTime: 4,
    views: 142,
    likes: 38,
    nlpProcessed: true
  },
  {
    _id: '102',
    title: 'A Culinary Safari Through Kyoto\'s Gion District',
    author: 'Kenji Sato',
    destination: 'Kyoto, Japan',
    category: 'Food & Culinary',
    excerpt: 'Discover secret tea houses, fresh matcha delicacies, and traditional Kaiseki dining in ancient Japan.',
    content: '<p>Kyoto is the cultural heart of Japan, and nowhere is that more evident than in the historic Gion district. Strolling along wooden machiya townhouses at dusk, you might catch a glimpse of a geiko or maiko heading to an evening appointment.</p><p>We experienced a multi-course Kaiseki dinner featuring seasonal local ingredients, followed by a serene tea ceremony in a 300-year-old garden.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-20'),
    tags: ['Japan', 'Kyoto', 'Foodie', 'Culture'],
    nlpTags: ['Culinary Tour', 'Traditional Culture', 'Kaiseki Dining', 'Historic Gion'],
    seoKeywords: ['kyoto food guide', 'gion district dining', 'japan culinary travel'],
    metaDescription: 'Immerse yourself in Kyoto\'s Gion district with traditional Kaiseki dining and tea ceremonies.',
    readingTime: 5,
    views: 98,
    likes: 24,
    nlpProcessed: true
  },
  {
    _id: '103',
    title: 'Island Hopping in Amalfi & Cinque Terre',
    author: 'Marco Rossi',
    destination: 'Amalfi Coast, Italy',
    category: 'Coastal & Islands',
    excerpt: 'Sun-drenched cliffside villages, azure waters, and authentic lemon granita along the Italian Riviera.',
    content: '<p>The Amalfi Coast and Cinque Terre offer unmatched Mediterranean vistas. Pastel-colored houses cling precariously to steep cliffs overlooking crystal-clear blue sea waters.</p><p>Hiking the Sentiero degli Dei (Path of the Gods) rewards travelers with sweeping sea views, limoneto orchards, and charming coastal stopovers.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-28'),
    tags: ['Italy', 'Amalfi', 'Coastal', 'Summer'],
    nlpTags: ['Coastal Villages', 'Mediterranean Sea', 'Cliffside Hiking', 'Italian Riviera'],
    seoKeywords: ['amalfi coast travel guide', 'cinque terre hiking', 'italy summer vacation'],
    metaDescription: 'Experience sun-drenched cliffside villages and crystal sea waters along the Italian Riviera.',
    readingTime: 4,
    views: 185,
    likes: 56,
    nlpProcessed: true
  }
];

// Helper to check if Mongoose DB is connected
const isDbConnected = () => Post.db && Post.db.readyState === 1;

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const { category, tag, search } = req.query;

    if (isDbConnected()) {
      let query = {};
      if (category) query.category = { $regex: new RegExp(category, 'i') };
      if (tag) {
        query.$or = [
          { tags: { $regex: new RegExp(tag, 'i') } },
          { nlpTags: { $regex: new RegExp(tag, 'i') } },
          { seoKeywords: { $regex: new RegExp(tag, 'i') } }
        ];
      }
      if (search) {
        query.$or = [
          { title: { $regex: new RegExp(search, 'i') } },
          { excerpt: { $regex: new RegExp(search, 'i') } },
          { content: { $regex: new RegExp(search, 'i') } },
          { nlpTags: { $regex: new RegExp(search, 'i') } }
        ];
      }
      const posts = await Post.find(query).sort({ date: -1 });
      return res.json(posts);
    }

    // In-memory fallback filter
    let results = [...inMemoryPosts];
    if (category) {
      results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (tag) {
      results = results.filter(p => {
        const all = [...(p.tags || []), ...(p.nlpTags || []), ...(p.seoKeywords || [])];
        return all.some(t => t.toLowerCase().includes(tag.toLowerCase()));
      });
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q)
      );
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    if (isDbConnected()) {
      const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
      if (!post) return res.status(404).json({ message: 'Post not found' });
      return res.json(post);
    }

    const post = inMemoryPosts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.views = (post.views || 0) + 1;
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post with Automatic Gemini API NLP Tagging
exports.createPost = async (req, res) => {
  try {
    const { title, author, imageUrl, excerpt, content, tags, destination, category } = req.body;

    const nlpData = await generateNlpMetadata(title, excerpt, content);
    const mergedTags = Array.from(new Set([...(tags || []), ...(nlpData.nlpTags || [])]));

    const postData = {
      _id: Date.now().toString(),
      title,
      author: author || 'Explorer',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      excerpt,
      content,
      destination: destination || 'Global',
      tags: mergedTags,
      nlpTags: nlpData.nlpTags,
      seoKeywords: nlpData.seoKeywords,
      category: category || nlpData.category,
      metaDescription: nlpData.metaDescription,
      readingTime: nlpData.readingTime,
      views: 1,
      likes: 0,
      nlpProcessed: true,
      date: new Date()
    };

    if (isDbConnected()) {
      const newPost = new Post(postData);
      const saved = await newPost.save();
      return res.status(201).json(saved);
    }

    inMemoryPosts.unshift(postData);
    res.status(201).json(postData);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    if (isDbConnected()) {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      Object.assign(post, req.body);

      if (req.body.title || req.body.excerpt || req.body.content) {
        const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
        post.nlpTags = nlpData.nlpTags;
        post.seoKeywords = nlpData.seoKeywords;
        post.metaDescription = nlpData.metaDescription;
        post.readingTime = nlpData.readingTime;
        post.nlpProcessed = true;
      }
      const updated = await post.save();
      return res.json(updated);
    }

    const postIndex = inMemoryPosts.findIndex(p => p._id === req.params.id);
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
    
    Object.assign(inMemoryPosts[postIndex], req.body);
    const post = inMemoryPosts[postIndex];

    if (req.body.title || req.body.excerpt || req.body.content) {
      const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
      post.nlpTags = nlpData.nlpTags;
      post.seoKeywords = nlpData.seoKeywords;
      post.metaDescription = nlpData.metaDescription;
      post.readingTime = nlpData.readingTime;
      post.nlpProcessed = true;
    }

    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// On-demand Gemini NLP Tag Generation
exports.generatePostTags = async (req, res) => {
  try {
    let post;
    if (isDbConnected()) {
      post = await Post.findById(req.params.id);
    } else {
      post = inMemoryPosts.find(p => p._id === req.params.id);
    }

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
    post.nlpTags = nlpData.nlpTags;
    post.seoKeywords = nlpData.seoKeywords;
    post.category = nlpData.category;
    post.metaDescription = nlpData.metaDescription;
    post.readingTime = nlpData.readingTime;
    post.nlpProcessed = true;

    if (isDbConnected()) {
      await post.save();
    }

    res.json({ message: 'Gemini NLP metadata generated successfully', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get posts by tag
exports.getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    if (isDbConnected()) {
      const posts = await Post.find({
        $or: [
          { tags: { $regex: new RegExp(tag, 'i') } },
          { nlpTags: { $regex: new RegExp(tag, 'i') } },
          { seoKeywords: { $regex: new RegExp(tag, 'i') } }
        ]
      }).sort({ date: -1 });
      return res.json(posts);
    }

    const filtered = inMemoryPosts.filter(p => {
      const all = [...(p.tags || []), ...(p.nlpTags || []), ...(p.seoKeywords || [])];
      return all.some(t => t.toLowerCase().includes(tag.toLowerCase()));
    });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Preview Gemini NLP tags
exports.previewNlpTags = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const nlpData = await generateNlpMetadata(title, excerpt || '', content || '');
    res.json(nlpData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    if (isDbConnected()) {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
      return res.json({ message: 'Post deleted successfully' });
    }

    const index = inMemoryPosts.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    inMemoryPosts.splice(index, 1);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};