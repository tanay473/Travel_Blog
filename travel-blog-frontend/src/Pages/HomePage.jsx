// src/Pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from '../Components/BlogPostCard';
import NewsletterSignup from '../Components/NewsletterSignup';
import LoadingSpinner from '../Components/LoadingSpinner';
import blogApi from '../api/blogApi';
import '../styles/HomePage.css';

const POPULAR_NLP_TAGS = [
  'All',
  'Alpine Hiking',
  'Hidden Gems',
  'Beach & Coastal',
  'Culture & Heritage',
  'Budget Backpacking',
  'Luxury & Wellness',
  'Eco Tourism'
];

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getAllPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Unable to fetch latest travel stories.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleTagFilter = (tag) => {
    setActiveTag(tag);
    if (tag === 'All') {
      filterPosts(searchQuery, posts);
    } else {
      const filtered = posts.filter(post => {
        const allTags = [...(post.tags || []), ...(post.nlpTags || []), ...(post.seoKeywords || []), post.category || ''];
        return allTags.some(t => t.toLowerCase().includes(tag.toLowerCase()));
      });
      setFilteredPosts(filtered);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPosts(query, posts);
  };

  const filterPosts = (query, allPosts) => {
    let result = allPosts;
    if (activeTag !== 'All') {
      result = result.filter(post => {
        const allTags = [...(post.tags || []), ...(post.nlpTags || []), ...(post.seoKeywords || []), post.category || ''];
        return allTags.some(t => t.toLowerCase().includes(activeTag.toLowerCase()));
      });
    }
    if (query.trim() !== '') {
      result = result.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        (post.destination && post.destination.toLowerCase().includes(query.toLowerCase())) ||
        (post.nlpTags && post.nlpTags.some(t => t.toLowerCase().includes(query.toLowerCase())))
      );
    }
    setFilteredPosts(result);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="home-page">
      {/* Background Video Hero Section */}
      <section className="hero-section">
        <div className="video-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-scenic-coastline-41539-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="container hero-content animate-fade-in">
          <div className="hero-pill-badge">
            <i className="fa-solid fa-wand-magic-sparkles"></i> AI-Powered Travel Index
          </div>
          <h1 className="hero-title">
            Explore the World via <span className="gradient-text">Semantic NLP</span> Tags
          </h1>
          <p className="hero-subtitle">
            Curated travel stories auto-tagged with Gemini 2.5 Flash AI for maximum crawler visibility, search precision, and wanderlust inspiration.
          </p>

          {/* Interactive Live Search Bar */}
          <div className="search-box-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              placeholder="Search destinations, topics, or AI tags (e.g. Kyoto, Alpine, Beach)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => { setSearchQuery(''); filterPosts('', posts); }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="hero-cta-group">
            <Link to="/blog" className="btn btn-primary">
              <i className="fa-solid fa-compass"></i> Explore All Stories
            </Link>
            <Link to="/create-post" className="btn btn-glass">
              <i className="fa-solid fa-plus"></i> Publish Story
            </Link>
          </div>
        </div>
      </section>

      {/* NLP Tag Cloud Section */}
      <section className="nlp-tag-cloud-section container">
        <div className="section-header">
          <div className="badge badge-purple">
            <i className="fa-solid fa-brain"></i> Gemini 2.5 Flash NLP
          </div>
          <h2>Popular Semantic Categories</h2>
          <p className="section-subtitle">Click any AI-extracted tag to filter stories live:</p>
        </div>

        <div className="tag-cloud">
          {POPULAR_NLP_TAGS.map(tag => (
            <button
              key={tag}
              className={`tag-pill nlp-tag-pill ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagFilter(tag)}
            >
              <i className="fa-solid fa-hashtag"></i> {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Featured / Filtered Blog Posts */}
      <section className="featured-posts-section container">
        <div className="section-header flex-header">
          <div>
            <h2>
              {activeTag === 'All' ? 'Latest Adventures' : `Filtered by: "${activeTag}"`}
            </h2>
            <p className="section-subtitle">
              Showing {filteredPosts.length} story {filteredPosts.length === 1 ? '' : 'ies'}
            </p>
          </div>
          <Link to="/blog" className="view-all-link">
            View All <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="post-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard key={post._id || post.id} post={post} />
            ))
          ) : (
            <div className="no-posts-card glass-card">
              <i className="fa-solid fa-compass-drafting no-posts-icon"></i>
              <h3>No stories match your filter</h3>
              <p>Try searching for a different keyword or select another NLP tag above.</p>
              <button className="btn btn-primary btn-small" onClick={() => handleTagFilter('All')}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations Showcase */}
      <section className="destinations-showcase-section container">
        <div className="section-header">
          <div className="badge badge-emerald">
            <i className="fa-solid fa-earth-americas"></i> Trending Hotspots
          </div>
          <h2>Top Global Destinations</h2>
        </div>

        <div className="destinations-grid">
          <div className="destination-card-highlight glass-card">
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" alt="Kyoto Japan" />
            <div className="dest-overlay">
              <span className="badge badge-amber">Asia</span>
              <h3>Kyoto, Japan</h3>
              <p>Ancient temples, bamboo groves & culinary marvels.</p>
              <Link to="/destinations" className="dest-link">
                Explore Destination <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </div>
          </div>

          <div className="destination-card-highlight glass-card">
            <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80" alt="Cinque Terre Italy" />
            <div className="dest-overlay">
              <span className="badge badge-purple">Europe</span>
              <h3>Cinque Terre, Italy</h3>
              <p>Colorful coastal villages along cliffside Mediterranean seas.</p>
              <Link to="/destinations" className="dest-link">
                Explore Destination <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </div>
          </div>

          <div className="destination-card-highlight glass-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" alt="Maldives" />
            <div className="dest-overlay">
              <span className="badge badge-emerald">Tropical</span>
              <h3>Baa Atoll, Maldives</h3>
              <p>Crystal turquoise lagoons, overwater villas & coral reefs.</p>
              <Link to="/destinations" className="dest-link">
                Explore Destination <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}

export default HomePage;