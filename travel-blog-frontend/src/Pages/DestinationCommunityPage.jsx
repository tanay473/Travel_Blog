import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogApi from '../api/blogApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import BlogPostCard from '../Components/BlogPostCard';
import '../styles/DestinationCommunityPage.css';

const destinationImageMap = {
  'banff, canada': 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
  'kyoto, japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
  'interlaken, switzerland': 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
  'amalfi coast, italy': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
  'marrakech, morocco': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1600&q=80',
  'baa atoll, maldives': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'ubud, bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
  'santorini, greece': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
  'reykjavik, iceland': 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80',
  'tokyo, japan': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
  'paris, france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
  'torres del paine, chile': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
};

const getDestinationCover = (destName, postsList) => {
  if (!destName) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';
  const key = destName.toLowerCase().trim();
  if (destinationImageMap[key]) return destinationImageMap[key];
  if (postsList && postsList.length > 0 && postsList[0].imageUrl) return postsList[0].imageUrl;
  return 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80';
};

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
      {/* Immersive Destination Hero Banner */}
      <section 
        className="community-hero ios-glass-card" 
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.78) 100%), url(${getDestinationCover(decodedDestination, posts)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '80px 24px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <div style={{position: 'relative', zIndex: 2}}>
          <span className="badge badge-amber" style={{marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(217, 119, 6, 0.9)', color: '#ffffff'}}>
            <i className="fa-solid fa-earth-americas"></i> Destination Community Hub
          </span>
          <h1 className="hero-title" style={{color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontSize: '3.6rem', marginBottom: '12px'}}>
            {communityData?.destinationName || decodedDestination}
          </h1>
          <p className="hero-subtitle" style={{color: '#f8fafc', textShadow: '0 2px 10px rgba(0,0,0,0.7)', fontSize: '1.25rem'}}>
            Join the community of travelers. 
            <span className="badge badge-emerald" style={{marginLeft: '10px', background: 'rgba(5, 150, 105, 0.9)', color: '#ffffff', padding: '6px 12px'}}>
              {communityData?.postCount || posts.length || 0} Stories
            </span>
          </p>
        </div>
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
