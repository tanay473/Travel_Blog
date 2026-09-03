// src/Components/BlogPostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/BlogPostCard.css';

function BlogPostCard({ post }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
  const displayTags = (post.nlpTags && post.nlpTags.length > 0 ? post.nlpTags : post.tags) || ['Travel'];

  return (
    <div className="blog-post-card glass-card">
      <div className="card-image-wrapper">
        <img src={post.imageUrl || fallbackImage} alt={post.title} loading="lazy" />
        <div className="card-badges">
          <span className="badge badge-emerald">{post.category || 'Adventure'}</span>
          {post.readingTime && (
            <span className="reading-time-badge">
              <i className="fa-regular fa-clock"></i> {post.readingTime} min read
            </span>
          )}
        </div>

      </div>

      <div className="card-content">
        {post.destination && (
          <div className="post-destination">
            <i className="fa-solid fa-location-dot"></i> {post.destination}
          </div>
        )}

        <h3 className="card-title">
          <Link to={`/blog/${post._id || post.id}`}>{post.title}</Link>
        </h3>

        <div className="post-meta">
          <span><i className="fa-solid fa-user"></i> {post.author || 'Explorer'}</span>
          <span>•</span>
          <span><i className="fa-regular fa-calendar"></i> {new Date(post.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <p className="card-excerpt">{post.excerpt}</p>

        {/* AI NLP Tags Cloud */}
        <div className="card-tags-list">
          {displayTags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-pill nlp-tag-pill">
              #{tag}
            </span>
          ))}
          {displayTags.length > 3 && (
            <span className="tag-pill">+{displayTags.length - 3}</span>
          )}
        </div>

        <div className="card-footer">
          <Link to={`/blog/${post._id || post.id}`} className="btn btn-primary btn-small">
            Read Story <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <div className="views-count">
            <i className="fa-regular fa-eye"></i> {post.views || 12}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostCard;