import React from 'react';
import { Link } from 'react-router-dom';
// No specific CSS for this small component, will rely on parent's grid
// Consider creating styles/DestinationCard.css if it becomes more complex

function DestinationCard({ destination }) {
  const defaultImageUrl = 'https://via.placeholder.com/600x400?text=Destination';

  return (
    <div className="destination-card">
      <img src={destination.imageUrl || defaultImageUrl} alt={destination.name} />
      <div className="card-content">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        {/* Link to a relevant blog post or a dedicated destination page */}
        <Link to={destination.link} className="btn-small">View Posts</Link>
      </div>
    </div>
  );
}

export default DestinationCard;