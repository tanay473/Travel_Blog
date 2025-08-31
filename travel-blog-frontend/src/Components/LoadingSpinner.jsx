import React from 'react';
import './../styles/LoadingSpinner.css'; // Create this CSS file

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading content...</p>
    </div>
  );
}

export default LoadingSpinner;