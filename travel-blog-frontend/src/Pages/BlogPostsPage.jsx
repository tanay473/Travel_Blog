// src/Pages/BlogPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlogPostCard from '../Components/BlogPostCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import blogApi from '../api/blogApi';
import '../styles/BlogPostsPage.css';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagParam = searchParams.get('tag') || '';
    setFilterTag(tagParam);

    const fetchPosts = async () => {
      try {
        setLoading(true);
        let data;
        if (tagParam) {
          data = await blogApi.getPostsByTag(tagParam);
        } else {
          data = await blogApi.getAllPosts();
        }
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Unable to load travel stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <div className="blog-posts-page container animate-fade-in">
      <div className="page-header text-center">
        <div className="badge badge-emerald">
          <i className="fa-solid fa-compass"></i> Wanderlust Library
        </div>
        <h1>
          {filterTag ? `Stories Tagged with "#${filterTag}"` : 'All Travel Stories'}
        </h1>
        <p className="subtitle">
          Explore authentic journey logs, insider destination guides, and AI-categorized travel wisdom.
        </p>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="no-posts-card glass-card">
          <i className="fa-solid fa-folder-open no-posts-icon"></i>
          <h3>No travel stories found</h3>
          <p>There are no published stories matching this filter yet.</p>
        </div>
      )}

      <div className="blog-posts-grid">
        {posts.map(post => (
          <BlogPostCard key={post._id || post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogPostsPage;