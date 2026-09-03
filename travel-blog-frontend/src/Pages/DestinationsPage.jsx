// src/Pages/DestinationsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DestinationsPage.css';

const mockDestinations = [
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    region: 'Asia',
    description: 'Ancient capital known for its classical Buddhist temples, gardens, imperial palaces, and bamboo groves.',
    excerpt: 'Explore Kinkaku-ji, Fushimi Inari-taisha, and traditional tea houses.'
  },
  {
    id: 'cinque-terre',
    name: 'Cinque Terre, Italy',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'A string of five ancient cliffside fishing villages along the Italian Riviera.',
    excerpt: 'Hike coastal trails, taste fresh pesto, and admire Mediterranean views.'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    region: 'South America',
    description: 'A 15th-century Inca citadel set high in the Andes Mountains, a UNESCO World Heritage site.',
    excerpt: 'Hike the Inca Trail and explore breathtaking mountain ruins.'
  },
  {
    id: 'maldives',
    name: 'Baa Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    region: 'Tropical',
    description: 'Crystal lagoons, overwater bungalows, and vibrant marine coral ecosystems.',
    excerpt: 'Unwind in luxury resorts and snorkel with gentle manta rays.'
  }
];

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDestinations(mockDestinations);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="destinations-page container animate-fade-in">
      <div className="page-header text-center">
        <div className="badge badge-emerald">
          <i className="fa-solid fa-earth-americas"></i> Global Expeditions
        </div>
        <h1>Explore Destinations</h1>
        <p className="subtitle">Discover handpicked global travel hotspots and immerse yourself in world cultures.</p>
      </div>

      <div className="destinations-grid">
        {destinations.map(dest => (
          <div key={dest.id} className="destination-card glass-card">
            <div className="dest-image-box">
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <span className="badge badge-purple dest-badge">{dest.region}</span>
            </div>

            <div className="dest-card-content">
              <h3>{dest.name}</h3>
              <p className="dest-desc">{dest.excerpt}</p>
              <Link to="/blog" className="btn btn-primary btn-small">
                View Destination Stories <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationsPage;