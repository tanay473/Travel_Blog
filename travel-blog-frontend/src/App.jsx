// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import BlogPostsPage from './Pages/BlogPostsPage';
import SingleBlogPostPage from './Pages/SingleBlogPostPage';
import DestinationsPage from './Pages/DestinationsPage';
import DestinationCommunityPage from './Pages/DestinationCommunityPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import CreatePostPage from './Pages/CreatePostPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPostsPage />} />
            <Route path="/blog/:id" element={<SingleBlogPostPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:destination" element={<DestinationCommunityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;