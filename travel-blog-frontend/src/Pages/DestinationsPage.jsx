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
    description: 'Ancient capital known for classical Buddhist temples, traditional tea houses, and Gion machiya streets.',
    excerpt: 'Explore Fushimi Inari-taisha, 300-year-old tea houses, and authentic Kaiseki dining.'
  },
  {
    id: 'interlaken',
    name: 'Interlaken, Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'The outdoor adventure capital of Switzerland surrounded by glacial lakes and 4,000m alpine peaks.',
    excerpt: 'Hike Lauterbrunnen valley of 72 waterfalls and cogwheel up to Jungfraujoch.'
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'Pastel-colored cliffside villages overlooking turquoise Mediterranean waters and limoneto groves.',
    excerpt: 'Hike Path of the Gods and sip fresh lemon granita in Positano.'
  },
  {
    id: 'marrakech',
    name: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80',
    region: 'Africa',
    description: 'Spiced medina markets, mosaic-tiled riads, and rooftop views of the snowcapped Atlas Mountains.',
    excerpt: 'Feast on tagine at Jemaa el-Fnaa night market and escape into quiet courtyard plunge pools.'
  },
  {
    id: 'maldives',
    name: 'Baa Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    region: 'Tropical',
    description: 'Crystal turquoise lagoons, overwater glass-floor villas, and UNESCO marine biosphere reefs.',
    excerpt: 'Unwind in luxury overwater bungalows and swim with gentle manta rays.'
  },
  {
    id: 'bali',
    name: 'Ubud, Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    region: 'Asia',
    description: 'Emerald terraced rice paddies, ancient sacred water temples, and traditional Balinese culinary arts.',
    excerpt: 'Walk Tegallalang rice terraces at sunrise and join authentic local cooking workshops.'
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'Iconic whitewashed cliffside towns, volcanic hot springs, and Aegean sea sunsets.',
    excerpt: 'Sail the caldera on a golden hour catamaran and taste mineral volcanic wines.'
  },
  {
    id: 'iceland',
    name: 'Reykjavik, Iceland',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'Land of geysers, tectonic rifts, glacial lagoons, and dancing aurora borealis skies.',
    excerpt: 'Drive the Golden Circle road trip and soak in geothermally heated natural pools.'
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    region: 'Asia',
    description: 'High-tech metropolis with historic Shinto shrines, subterranean ramen alleys, and Tsukiji sushi.',
    excerpt: 'Eat fatty tuna nigiri at Tsukiji at sunrise and slurp rich tonkotsu broth under train tracks.'
  },
  {
    id: 'paris',
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    region: 'Europe',
    description: 'City of light famous for artisan boulangeries, cobblestone art districts, and Seine riverfront stays.',
    excerpt: 'Sample fresh butter croissants in Le Marais and watch the Eiffel Tower sparkle from your balcony.'
  },
  {
    id: 'banff',
    name: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    region: 'North America',
    description: 'Glacial alpine wonderland featuring Moraine Lake canoes and the majestic Canadian Rockies.',
    excerpt: 'Paddle red canoes across electric turquoise waters surrounded by snowcapped peaks.'
  },
  {
    id: 'patagonia',
    name: 'Torres del Paine, Chile',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    region: 'South America',
    description: 'Rugged Patagonia wilderness with towering granite peaks, calving glaciers, and guanaco herds.',
    excerpt: 'Trek the legendary 8-day circuit and watch granite towers catch golden sunrise glow.'
  }
];

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  // eslint-disable-next-line no-unused-vars
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

      <div className="bento-grid destinations-bento-grid">
        {destinations.map((dest, index) => {
          const colSpanClass = (index % 3 === 0) ? 'bento-col-8' : 'bento-col-4';
          return (
            <Link 
              to={`/destinations/${encodeURIComponent(dest.name)}`} 
              key={dest.id} 
              className={`bento-card ${colSpanClass} destination-bento-item animate-fade-in stagger-${(index % 4) + 1}`}
            >
              <div className="dest-bento-image-wrapper">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="dest-bento-overlay">
                  <span className="badge badge-amber">{dest.region}</span>
                  <h3>{dest.name}</h3>
                  <p>{dest.excerpt}</p>
                  <span className="bento-explore-btn">
                    Explore Community <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DestinationsPage;