// travel-blog-frontend/src/pages/CreatePostPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import './../styles/CreatePostPage.css';

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: '' // Comma-separated string for tags input
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Process tags: convert comma-separated string to an array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim()) // Remove leading/trailing whitespace
        .filter(tag => tag !== ''); // Remove empty tags

      // Prepare the data payload for the API call
      const postToCreate = {
        title: formData.title,
        author: formData.author,
        excerpt: formData.excerpt,
        content: formData.content,
        imageUrl: formData.imageUrl,
        tags: tagsArray,
        date: new Date() // Set current date/time for the post
      };

      // Call the backend API to create the post
      const newPost = await blogApi.createPost(postToCreate);

      setSuccess(true); // Indicate success
      // Optionally, clear the form after successful submission
      setFormData({
        title: '', author: '', excerpt: '', content: '', imageUrl: '', tags: ''
      });
      // Redirect to the newly created post's page after a short delay
      setTimeout(() => navigate(`/blog/${newPost._id}`), 2000);

    } catch (err) {
      console.error('Error submitting new post:', err);
      // Display error message from the backend if available
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message || 'Unknown error occurred. Please check console.';
      setError(`Failed to create post: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page container">
      <h1>Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        {/* Form fields for title, author, imageUrl, excerpt, content, tags */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="e.g., https://example.com/image.jpg" />
        </div>
        <div className="form-group">
          <label htmlFor="excerpt">Excerpt (short summary):</label>
          <textarea id="excerpt" name="excerpt" rows="3" value={formData.excerpt} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="content">Content (HTML allowed):</label>
          <textarea id="content" name="content" rows="10" value={formData.content} onChange={handleChange} required placeholder="You can use basic HTML tags like <p>, <strong>, <em>, <ul>, <li>, etc."></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., travel, adventure, tips, Asia" />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Post created successfully!</p>}
      </form>
    </div>
  );
}

export default CreatePostPage;