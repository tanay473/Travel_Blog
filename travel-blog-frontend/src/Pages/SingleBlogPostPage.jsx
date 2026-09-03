// src/Pages/SingleBlogPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import blogApi from '../api/blogApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import '../styles/SingleBlogPostPage.css';

function SingleBlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retagging, setRetagging] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getPostById(id);
        setPost(data);
        setLikeCount(data.likes || 0);
        setError(null);

        // --- SEO Optimization & Crawler Injection ---
        if (data) {
          document.title = `${data.title} | Wanderlust Travel`;
          
          // Update or inject Meta Keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
          }
          const keywordsList = [...(data.seoKeywords || []), ...(data.nlpTags || []), data.destination || ''].filter(Boolean);
          metaKeywords.content = keywordsList.join(', ');

          // Update Meta Description
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = data.metaDescription || data.excerpt || data.title;

          // Inject Schema.org JSON-LD Microdata for Search Crawlers
          let schemaScript = document.getElementById('json-ld-schema');
          if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'json-ld-schema';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
          }
          schemaScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': data.title,
            'image': [data.imageUrl],
            'datePublished': data.date,
            'author': {
              '@type': 'Person',
              'name': data.author || 'Explorer'
            },
            'description': data.metaDescription || data.excerpt,
            'keywords': keywordsList.join(', ')
          });
        }

      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Blog post not found or server is offline.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleRegenerateTags = async () => {
    try {
      setRetagging(true);
      const res = await blogApi.generateTagsForPost(id);
      setPost(res.post);
      showToast('✨ Gemini AI tags refreshed successfully!');
    } catch (err) {
      console.error('Failed to regenerate tags:', err);
      showToast('Error regenerating Gemini AI tags.');
    } finally {
      setRetagging(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Post link copied to clipboard!');
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      showToast('❤️ Thanks for loving this adventure!');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (loading) {
    return <div className="single-blog-page container"><LoadingSpinner /></div>;
  }

  if (error || !post) {
    return (
      <div className="single-blog-page container">
        <div className="error-card glass-card">
          <i className="fa-solid fa-triangle-exclamation error-icon"></i>
          <h2>Story Not Found</h2>
          <p>{error || 'The requested travel story is unavailable.'}</p>
          <button onClick={() => navigate('/blog')} className="btn btn-primary">
            <i className="fa-solid fa-arrow-left"></i> Back to All Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="single-blog-page container animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      {/* Back Button */}
      <button onClick={() => navigate('/blog')} className="btn btn-glass btn-small back-nav-btn">
        <i className="fa-solid fa-arrow-left"></i> Back to Blog
      </button>

      {/* Hero Header */}
      <header className="article-header">
        <div className="header-meta">
          <span className="badge badge-emerald">{post.category || 'Adventure'}</span>
          {post.destination && (
            <span className="badge badge-purple">
              <i className="fa-solid fa-location-dot"></i> {post.destination}
            </span>
          )}
          <span className="reading-time">
            <i className="fa-regular fa-clock"></i> {post.readingTime || 4} min read
          </span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        <div className="author-bar">
          <div className="author-info">
            <div className="avatar"><i className="fa-solid fa-user-astronaut"></i></div>
            <div>
              <div className="author-name">{post.author || 'Explorer'}</div>
              <div className="post-date">
                Published {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="article-actions">
            <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
              <i className="fa-solid fa-heart"></i> {likeCount}
            </button>
            <button className="action-btn" onClick={handleShare}>
              <i className="fa-solid fa-share-nodes"></i> Share
            </button>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="featured-image-container">
        <img 
          src={post.imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'} 
          alt={post.title} 
          className="featured-image"
        />
      </div>

      {/* Article Content Layout */}
      <div className="article-layout">
        {/* Main Text Content */}
        <main className="article-content">
          <p className="article-excerpt-lead">{post.excerpt}</p>
          
          <div 
            className="prose-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </main>

        {/* Sidebar with Gemini NLP AI Metadata & SEO Information */}
        <aside className="article-sidebar">
          {/* Gemini AI NLP Metadata Box */}
          <div className="sidebar-card glass-card nlp-sidebar-card">
            <div className="card-header-flex">
              <h3><i className="fa-solid fa-wand-magic-sparkles gradient-icon"></i> Gemini AI Metadata</h3>
              <span className="badge badge-emerald">Live NLP</span>
            </div>

            <p className="sidebar-desc">
              AI-analyzed concepts & SEO terms embedded in this post for maximum search engine index relevance:
            </p>

            {/* NLP Semantic Tags */}
            <div className="meta-group">
              <label><i className="fa-solid fa-tags"></i> Semantic NLP Tags:</label>
              <div className="tags-flex">
                {(post.nlpTags || post.tags || ['Travel']).map((tag, i) => (
                  <Link key={i} to={`/blog?tag=${encodeURIComponent(tag)}`} className="tag-pill nlp-tag-pill">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* SEO Keywords for Crawlers */}
            {post.seoKeywords && post.seoKeywords.length > 0 && (
              <div className="meta-group">
                <label><i className="fa-solid fa-magnifying-glass"></i> Search Crawler Keywords:</label>
                <ul className="seo-keywords-list">
                  {post.seoKeywords.map((kw, i) => (
                    <li key={i}><i className="fa-solid fa-check"></i> {kw}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meta Description Preview */}
            {post.metaDescription && (
              <div className="meta-group">
                <label><i className="fa-solid fa-code"></i> Meta Snippet (Schema.org):</label>
                <blockquote className="meta-snippet-box">
                  "{post.metaDescription}"
                </blockquote>
              </div>
            )}

            <button 
              className="btn btn-glass btn-small w-full"
              onClick={handleRegenerateTags}
              disabled={retagging}
            >
              <i className={`fa-solid fa-arrows-rotate ${retagging ? 'fa-spin' : ''}`}></i>
              {retagging ? 'Analyzing with Gemini...' : 'Re-tag with Gemini AI'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SingleBlogPostPage;