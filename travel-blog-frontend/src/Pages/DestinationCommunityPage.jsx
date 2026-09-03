import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogApi from '../api/blogApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import BlogPostCard from '../Components/BlogPostCard';
import '../styles/DestinationCommunityPage.css';

function DestinationCommunityPage() {
  const { destination } = useParams();
  const [communityData, setCommunityData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [error, setError] = useState(null);

  const decodedDestination = decodeURIComponent(destination);

  const filters = [
    { id: 'All', label: 'All', icon: '🌍' },
    { id: 'Cuisine', label: 'Cuisine', icon: '🍱', colorClass: 'filter-cuisine' },
    { id: 'Stay', label: 'Stay', icon: '🏨', colorClass: 'filter-stay' },
    { id: 'Nature', label: 'Nature', icon: '🏔️', colorClass: 'filter-nature' }
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch community metadata
        const data = await blogApi.getDestinationCommunity(decodedDestination);
        setCommunityData(data);
        
        // Fetch initial posts (All)
        const rankedPosts = await blogApi.getExperienceRanked('', decodedDestination);
        setPosts(rankedPosts || data.posts || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching destination community:', err);
        setError('Could not load community data. It might not exist yet.');
        // Fallback for visual testing if API is unavailable
        setCommunityData({
          destinationName: decodedDestination,
          postCount: 12,
          uniqueHighlights: ['Hidden Waterfalls', 'Ancient Temples', 'Street Food Markets']
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [decodedDestination]);

  const handleFilterClick = async (filterId) => {
    setActiveFilter(filterId);
    try {
      setFilterLoading(true);
      const experienceType = filterId === 'All' ? '' : filterId;
      const rankedPosts = await blogApi.getExperienceRanked(experienceType, decodedDestination);
      setPosts(rankedPosts || []);
    } catch (err) {
      console.error('Error fetching ranked posts:', err);
    } finally {
      setFilterLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="destination-community-page container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="destination-community-page container animate-fade-in">
      {/* Hero Section */}
      <section className="community-hero">
        <h1 className="hero-title">{communityData?.destinationName || decodedDestination}</h1>
        <p className="hero-subtitle">
          Join the community of travelers. <span className="badge badge-emerald">{communityData?.postCount || posts.length || 0} Stories</span>
        </p>
      </section>

      {/* Unique Highlights Carousel */}
      {communityData?.uniqueHighlights && communityData.uniqueHighlights.length > 0 && (
        <section className="highlights-section">
          <h2><i className="fa-solid fa-sparkles text-emerald"></i> Unique Highlights</h2>
          <div className="highlights-carousel">
            {communityData.uniqueHighlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <i className="fa-solid fa-wand-magic-sparkles highlight-icon"></i>
                <span className="highlight-text">{highlight}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Filter Bar */}
      <section className="experience-filters">
        <div className="filter-bar">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active ' + (filter.colorClass || '') : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span> {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Ranked Posts Grid */}
      <section className="ranked-posts-section">
        <div className="section-header">
          <h2>Top Ranked Experiences</h2>
          <p className="text-muted">Sorted by community popularity (likes & views)</p>
        </div>
        
        {filterLoading ? (
          <div className="filter-loading"><LoadingSpinner /></div>
        ) : error && posts.length === 0 ? (
          <div className="error-message">
            <p>{error}</p>
            <Link to="/blog" className="btn btn-primary mt-3">Browse all stories</Link>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts found for this experience type yet.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <BlogPostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DestinationCommunityPage;
