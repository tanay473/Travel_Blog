// travel-blog-frontend/src/api/blogApi.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your backend port

const blogApi = {
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all posts:', error);
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
  // Function to create a new post
  createPost: async (postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, postData);
      return response.data; // Backend should return the created post
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  // Functions for update and delete (for future use with UI)
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