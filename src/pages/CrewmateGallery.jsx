// src/pages/CrewmateGallery.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCrewmates } from '../services/crewmateService';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/CrewmateGallery.css';

function CrewmateGallery() {
  const location = useLocation();
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(location.state?.message || null);

  useEffect(() => {
    // Clear message after 5 seconds
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        const data = await getCrewmates();
        console.log('Fetched crewmates:', data);
        setCrewmates(data);
      } catch (err) {
        console.error('Error fetching crewmates:', err);
        setError('Failed to load crewmates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmates();
  }, []);

  if (loading) {
    return (
      <div className="gallery-container">
        <h1>Crewmate Gallery</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h1>Crewmate Gallery</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h1>Crewmate Gallery</h1>
      
      {message && (
        <div className="success-notification">
          <p>{message}</p>
        </div>
      )}
      
      {crewmates.length === 0 ? (
        <div className="empty-gallery-message">
          <p>No crewmates found. Create your first crewmate to get started!</p>
          <Link to="/create" className="action-button primary">Create Crewmate</Link>
        </div>
      ) : (
        <div className="crewmates-grid">
          {crewmates.map(crewmate => (
            <div key={crewmate.id} className="crewmate-card">
              <h3>{crewmate.name}</h3>
              <div className="crewmate-attributes">
                <div className="attribute">Speed: {crewmate.speed}</div>
                <div className="attribute">
                  Color: <span className="color-dot" style={{ backgroundColor: crewmate.color.toLowerCase() }}></span>
                  {crewmate.color}
                </div>
                <div className="attribute">Special Ability: {crewmate.special_ability}</div>
              </div>
              <div className="card-actions">
                <Link to={`/gallery/${crewmate.id}`} className="action-button secondary">View Details</Link>
                <Link to={`/edit/${crewmate.id}`} className="action-button primary">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CrewmateGallery;