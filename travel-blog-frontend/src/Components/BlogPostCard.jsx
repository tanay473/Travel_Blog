import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/BlogPostCard.css'; // Path from src/components/ to src/styles/

function BlogPostCard({ post }) {
  const defaultImageUrl = 'https://via.placeholder.com/300x200?text=Travel+Post';

  return (
    <div className="blog-post-card">
      <img src={post.imageUrl || defaultImageUrl} alt={post.title} />
      <div className="card-content">
        <h3>{post.title}</h3>
        <p className="post-meta">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post._id}`} className="read-more-btn">Read More</Link>
      </div>
    </div>
  );
}

export default BlogPostCard;