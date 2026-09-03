// src/Pages/CreatePostPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import '../styles/CreatePostPage.css';

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    destination: '',
    category: 'Adventure',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: ''
  });

  const [nlpPreview, setNlpPreview] = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreviewNlpTags = async () => {
    if (!formData.title) {
      setError('Please provide a title first to generate Gemini AI tags.');
      return;
    }
    setError(null);
    setPreviewing(true);
    try {
      const data = await blogApi.previewNlpTags({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content
      });
      setNlpPreview(data);
      if (data.nlpTags) {
        setFormData(prev => ({
          ...prev,
          tags: Array.from(new Set([...(prev.tags ? prev.tags.split(',') : []), ...data.nlpTags])).join(', '),
          category: data.category || prev.category
        }));
      }
    } catch (err) {
      console.error('Failed to preview AI tags:', err);
      setError('Failed to generate Gemini AI tags. Ensure title and content are entered.');
    } finally {
      setPreviewing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      const postToCreate = {
        title: formData.title,
        author: formData.author || 'Explorer',
        destination: formData.destination || 'Global',
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        imageUrl: formData.imageUrl,
        tags: tagsArray,
        date: new Date()
      };

      const newPost = await blogApi.createPost(postToCreate);
      setSuccess(true);
      setTimeout(() => navigate(`/blog/${newPost._id || newPost.id}`), 1800);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page container animate-fade-in">
      <div className="page-header text-center">
        <div className="badge badge-purple">
          <i className="fa-solid fa-sparkles"></i> Gemini 2.5 Flash Enabled
        </div>
        <h1>Publish New Travel Adventure</h1>
        <p className="subtitle">
          Write your story below. Posts are automatically analyzed & tagged with Gemini AI for search engine crawler visibility!
        </p>
      </div>

      <div className="form-layout">
        <form onSubmit={handleSubmit} className="post-form glass-card">
          <div className="form-grid">
            <div className="form-group span-2">
              <label htmlFor="title"><i className="fa-solid fa-heading"></i> Post Title *</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Trekking the Hidden Valleys of Iceland" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="author"><i className="fa-solid fa-user"></i> Author Name</label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                placeholder="e.g. Elena Rostova" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination"><i className="fa-solid fa-location-dot"></i> Destination Location</label>
              <input 
                type="text" 
                id="destination" 
                name="destination" 
                value={formData.destination} 
                onChange={handleChange} 
                placeholder="e.g. Reykjavik, Iceland" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="category"><i className="fa-solid fa-list"></i> Category Niche</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="Adventure">Adventure & Hiking</option>
                <option value="Coastal & Islands">Coastal & Islands</option>
                <option value="Culture & Heritage">Culture & Heritage</option>
                <option value="Budget Backpacking">Budget Backpacking</option>
                <option value="Luxury & Wellness">Luxury & Wellness</option>
                <option value="Food & Culinary">Food & Culinary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl"><i className="fa-solid fa-image"></i> Image Cover URL</label>
              <input 
                type="text" 
                id="imageUrl" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                placeholder="https://images.unsplash.com/photo-..." 
              />
            </div>

            <div className="form-group span-2">
              <label htmlFor="excerpt"><i className="fa-solid fa-quote-left"></i> Short Excerpt / Summary *</label>
              <textarea 
                id="excerpt" 
                name="excerpt" 
                rows="2" 
                value={formData.excerpt} 
                onChange={handleChange} 
                required 
                placeholder="Brief captivating teaser of your journey..."
              ></textarea>
            </div>

            <div className="form-group span-2">
              <label htmlFor="content"><i className="fa-solid fa-align-left"></i> Story Content (HTML Supported) *</label>
              <textarea 
                id="content" 
                name="content" 
                rows="8" 
                value={formData.content} 
                onChange={handleChange} 
                required 
                placeholder="Share your travel experiences, recommendations, tips..."
              ></textarea>
            </div>

            <div className="form-group span-2">
              <div className="tags-label-row">
                <label htmlFor="tags"><i className="fa-solid fa-hashtag"></i> Tags (Comma-Separated)</label>
                <button 
                  type="button" 
                  className="btn btn-glass btn-small ai-tag-btn"
                  onClick={handlePreviewNlpTags}
                  disabled={previewing}
                >
                  <i className={`fa-solid fa-wand-magic-sparkles ${previewing ? 'fa-spin' : ''}`}></i>
                  {previewing ? 'Analyzing...' : 'Auto-Tag with Gemini AI'}
                </button>
              </div>
              <input 
                type="text" 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="e.g. Iceland, Aurora, Hiking, Photography" 
              />
            </div>
          </div>

          {/* Gemini AI Preview Box */}
          {nlpPreview && (
            <div className="nlp-preview-box">
              <h4><i className="fa-solid fa-brain"></i> Gemini AI Extraction Result:</h4>
              <div className="preview-tags">
                <strong>Extracted NLP Tags:</strong>
                <div className="tags-flex">
                  {nlpPreview.nlpTags?.map((t, i) => (
                    <span key={i} className="tag-pill nlp-tag-pill">#{t}</span>
                  ))}
                </div>
              </div>
              {nlpPreview.metaDescription && (
                <div className="preview-meta">
                  <strong>Meta Description Snippet:</strong> "{nlpPreview.metaDescription}"
                </div>
              )}
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">🎉 Story published successfully! Auto-tagged with Gemini AI.</div>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Publishing...</> : <><i className="fa-solid fa-paper-plane"></i> Publish Story</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;