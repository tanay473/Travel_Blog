import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi'; // Assuming you have a blogApi for fetching posts
import LoadingSpinner from '../Components/LoadingSpinner';
import './../styles/SingleBlogPostPage.css'; // Make sure this CSS file exists and is styled for a blog post

function SingleBlogPostPage() {
  const { id } = useParams(); // Get the 'id' (blog post ID) from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getPostById(id); // Fetch the blog post using its ID
        setPost(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Blog post not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Re-run effect if the ID in the URL changes

  if (loading) {
    return <div className="single-blog-post-page container"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      <div className="single-blog-post-page container">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate('/blog')} className="back-btn">Back to All Posts</button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="single-blog-post-page container">
        <p className="no-content-message">Blog post data not available.</p>
        <button onClick={() => navigate('/blog')} className="back-btn">Back to All Posts</button>
      </div>
    );
  }

  return (
    <div className="single-blog-post-page container">
      <img src={post.imageUrl || 'https://via.placeholder.com/1200x600?text=Blog+Image'} alt={post.title} className="post-header-image" />
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      {/* Dangerously set inner HTML for rich text content from backend */}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <button onClick={() => navigate('/blog')} className="back-btn">Back to All Posts</button>
    </div>
  );
}

export default SingleBlogPostPage;