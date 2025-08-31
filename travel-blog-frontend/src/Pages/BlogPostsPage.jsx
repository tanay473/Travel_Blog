// travel-blog-frontend/src/pages/BlogPostsPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import blogApi from '../api/blogApi';
import './../styles/BlogPostsPage.css';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getAllPosts();
        const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-posts-page container">
      <h1>All Blog Posts</h1>
      {loading && <p className="loading-message">Loading posts...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="no-posts-message">No blog posts found. Be the first to create one!</p>
      )}
      <div className="blog-posts-grid">
        {posts.map(post => (
          <div key={post._id} className="blog-post-card">
            <img src={post.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'} alt={post.title} className="post-card-image" />
            <div className="post-card-content">
              {/* --- VERIFY THIS LINK: Link for the title --- */}
              <h3><Link to={`/blog/${post._id}`}>{post.title}</Link></h3>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <div className="post-card-meta">
                <span>By {post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              {/* --- VERIFY THIS LINK: Link for the "Read More" button --- */}
              <Link to={`/blog/${post._id}`} className="read-more-btn">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPostsPage;