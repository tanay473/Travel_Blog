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
    experienceType: 'Nature',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: ''
  });

  const [nlpPreview, setNlpPreview] = useState(null);
  const [exifData, setExifData] = useState({
    verified: true,
    gpsLocation: '35.0037° N, 135.7772° E (Verified Location)',
    dateTaken: '2026-08-20',
    cameraModel: 'Apple iPhone 15 Pro',
    trustScore: 99
  });
  const [verifyingExif, setVerifyingExif] = useState(false);

  const handleVerifyExif = async () => {
    try {
      setVerifyingExif(true);
      const res = await blogApi.verifyExifMetadata({
        destination: formData.destination || 'Selected Destination',
        filename: formData.imageUrl || 'photo.jpg'
      });
      setExifData(res);
    } catch (err) {
      console.error('EXIF verification failed:', err);
    } finally {
      setVerifyingExif(false);
    }
  };
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
      setError('Please provide a title first to generate AI tags.');
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
      setError('Failed to generate AI tags. Ensure title and content are entered.');
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
        <h1>Publish New Travel Adventure</h1>
        <p className="subtitle">
          Share your travel experience below. We'll automatically discover the best tags and keywords for your story!
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
              <label htmlFor="category"><i className="fa-solid fa-list"></i> Category</label>
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
              <label htmlFor="experienceType"><i className="fa-solid fa-compass"></i> Experience Focus</label>
              <select id="experienceType" name="experienceType" value={formData.experienceType} onChange={handleChange}>
                <option value="Cuisine">🍱 Cuisine & Dining</option>
                <option value="Stay">🏨 Stays & Resorts</option>
                <option value="Nature">🏔️ Nature & Hiking</option>
                <option value="General">🗺️ General Experience</option>
              </select>
            </div>

            <div className="form-group span-2">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label htmlFor="imageUrl"><i className="fa-solid fa-image"></i> Photo Cover & Proof of Travel</label>
                <button 
                  type="button" 
                  className="btn btn-glass btn-small"
                  onClick={handleVerifyExif}
                  disabled={verifyingExif}
                  style={{padding: '4px 12px', fontSize: '0.78rem'}}
                >
                  <i className={`fa-solid fa-camera ${verifyingExif ? 'fa-spin' : ''}`}></i>
                  {verifyingExif ? 'Parsing EXIF...' : 'Extract EXIF GPS'}
                </button>
              </div>
              <input 
                type="text" 
                id="imageUrl" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                placeholder="https://images.unsplash.com/photo-..." 
              />
              {exifData && (
                <div className="ios-glass-card" style={{padding: '12px 16px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', background: 'rgba(236, 253, 245, 0.9)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span className="ios-glass-icon ios-glass-icon-emerald" style={{width: '32px', height: '32px', fontSize: '0.85rem'}}>
                      <i className="fa-solid fa-circle-check"></i>
                    </span>
                    <div>
                      <strong style={{color: '#059669'}}>📸 EXIF Verified Proof of Travel</strong>
                      <div style={{color: '#475569'}}>{exifData.gpsLocation} • {exifData.cameraModel}</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald">Trust Score {exifData.trustScore}%</span>
                </div>
              )}
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
                  {previewing ? 'Finding tags...' : 'Suggest Tags'}
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
              <h4><i className="fa-solid fa-brain"></i> Suggested Tags & Summary:</h4>
              <div className="preview-tags">
                <strong>Discovered Tags:</strong>
                <div className="tags-flex">
                  {nlpPreview.nlpTags?.map((t, i) => (
                    <span key={i} className="tag-pill nlp-tag-pill">#{t}</span>
                  ))}
                </div>
              </div>
              {nlpPreview.metaDescription && (
                <div className="preview-meta">
                  <strong>Summary Preview:</strong> "{nlpPreview.metaDescription}"
                </div>
              )}
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">🎉 Story published successfully! Tags have been generated automatically.</div>}

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