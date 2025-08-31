import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Keep your global styles
import App from './App'; // This points to your App.js file

// Ensure your public/index.html has <div id="root"></div>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);