// travel-blog-frontend/src/api/blogApi.jsx

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const blogApi = {
  getAllPosts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  getPostsByTag: async (tag) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/tag/${encodeURIComponent(tag)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for tag ${tag}:`, error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  previewNlpTags: async (postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/nlp-preview`, postData);
      return response.data;
    } catch (error) {
      console.error('Error previewing NLP tags:', error);
      throw error;
    }
  },

  generateTagsForPost: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${id}/generate-tags`);
      return response.data;
    } catch (error) {
      console.error(`Error generating tags for post ${id}:`, error);
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default blogApi;