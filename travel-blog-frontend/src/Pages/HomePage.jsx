// src/Pages/HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
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

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Coastal Aerial Drift',
    location: 'Mediterranean Sea',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-drone-shot-of-the-sea-coast-5321/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 2,
    title: 'Alpine Summit Glow',
    location: 'Swiss Alps',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-flying-over-mountains-5347/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 3,
    title: 'Tropical Rainforest Sanctuary',
    location: 'Ubud, Bali',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-waterfall-in-a-forest-4241/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80'
  }
];

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay handled:', e));
    }
  }, [activeSlide]);

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

  const currentSlideData = HERO_SLIDES[activeSlide];

  return (
    <div className="home-page">
      {/* Immersive Video Hero Section with Slider Controls */}
      <section className="hero-section">
        <div className="video-background">
          <video 
            key={activeSlide}
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            crossOrigin="anonymous"
            poster={currentSlideData.poster}
            onCanPlay={(e) => e.target.play()}
            onLoadedData={(e) => e.target.play()}
          >
            <source src={currentSlideData.videoUrl} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="animated-motion-waves"></div>
        </div>

        <div className="container hero-content animate-fade-in">
          <div className="hero-pill-badge">
            <i className="fa-solid fa-compass"></i> Smart Travel Discovery
          </div>
          <h1 className="hero-title">
            Discover Your Next <span className="gradient-text">Great Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Real stories from real travelers. Browse curated adventures, hidden gems, and local tips — intelligently organized so you find exactly what inspires you.
          </p>

          {/* Interactive Search Bar */}
          <div className="search-box-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              placeholder="Where do you want to go? Try Kyoto, Alpine, Beach..."
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

          {/* Immersive Hero Slider Switch Controls */}
          <div className="hero-slider-controls">
            {HERO_SLIDES.map((slide, index) => (
              <button 
                key={slide.id} 
                className={`slider-thumb-btn ${activeSlide === index ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                <span className="slide-num">0{index + 1}</span>
                <span className="slide-name">{slide.location}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Experience Showcase */}
      <section className="bento-experience-section container">
        <div className="section-header text-center">
          <div className="badge badge-purple">
            <i className="fa-solid fa-layer-group"></i> Bento Grid Experience
          </div>
          <h2>Curated Vignette Voyages Highlights</h2>
          <p className="section-subtitle">Immersive travel architectures crafted for modern explorers</p>
        </div>

        <div className="bento-grid">
          {/* Tile 1: Large Featured Spotlight */}
          <div className="bento-card bento-col-8 bento-feature-spotlight">
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" alt="Kyoto Spotlight" />
            <div className="bento-spotlight-content">
              <span className="badge badge-amber">Spotlight Destination</span>
              <h3>Kyoto's Gion & Historic Tea Houses</h3>
              <p>Stroll through 300-year-old machiya alleys, sample traditional Kaiseki dining, and experience serene riverside onsens.</p>
              <Link to="/destinations/Kyoto,%20Japan" className="btn btn-primary btn-small">
                Explore Kyoto Community <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Tile 2: Real-time Destination Pulse */}
          <div className="bento-card bento-col-4 bento-pulse-card">
            <div className="bento-card-inner">
              <div className="badge badge-emerald">
                <i className="fa-solid fa-chart-line"></i> Live Pulse
              </div>
              <h3>Trending Features</h3>
              <ul className="pulse-list">
                <li><i className="fa-solid fa-utensils"></i> <strong>300-Yr Gion Tea House</strong> (Kyoto)</li>
                <li><i className="fa-solid fa-water"></i> <strong>72 Waterfalls Valley</strong> (Swiss Alps)</li>
                <li><i className="fa-solid fa-fish"></i> <strong>Hanifaru Manta Rays</strong> (Maldives)</li>
                <li><i className="fa-solid fa-mountain"></i> <strong>Path of the Gods</strong> (Amalfi)</li>
              </ul>
            </div>
          </div>

          {/* Tile 3: Experience Specialty Filters */}
          <div className="bento-card bento-col-4 bento-experience-card">
            <div className="bento-card-inner">
              <h3>Specialty Filters</h3>
              <p>Find stories tailored to your travel style:</p>
              <div className="specialty-pills-stack">
                <Link to="/destinations/Kyoto,%20Japan" className="specialty-item cuisine">
                  <span>🍱 Cuisine & Dining</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <Link to="/destinations/Baa%20Atoll,%20Maldives" className="specialty-item stay">
                  <span>🏨 Stays & Resorts</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <Link to="/destinations/Interlaken,%20Switzerland" className="specialty-item nature">
                  <span>🏔️ Nature & Hiking</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Tile 4: Minimalist Split Screen Quote */}
          <div className="bento-card bento-col-8 bento-split-quote">
            <div className="split-quote-left">
              <i className="fa-solid fa-quote-left quote-mark"></i>
              <blockquote>"Travel is not about the destination, but the quiet moments and shared meals along the way."</blockquote>
              <div className="quote-author">— Elena Rostova, Alpine Explorer</div>
            </div>
            <div className="split-quote-right">
              <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80" alt="Swiss Alps View" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Cloud Section */}
      <section className="nlp-tag-cloud-section container">
        <div className="section-header">
          <div className="badge badge-purple">
            <i className="fa-solid fa-compass"></i> Explore by Interest
          </div>
          <h2>Popular Travel Categories</h2>
          <p className="section-subtitle">Tap a category to find stories that match your travel style:</p>
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

      {/* Featured / Filtered Blog Posts Grid */}
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
            filteredPosts.map((post, idx) => (
              <div key={post._id || post.id} className={`animate-fade-in stagger-${(idx % 4) + 1}`}>
                <BlogPostCard post={post} />
              </div>
            ))
          ) : (
            <div className="no-posts-card glass-card">
              <i className="fa-solid fa-compass-drafting no-posts-icon"></i>
              <h3>No stories match your filter</h3>
              <p>Try searching for a different keyword or select another category above.</p>
              <button className="btn btn-primary btn-small" onClick={() => handleTagFilter('All')}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}

export default HomePage;