// src/pages/CrewmateDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/CrewmateDetail.css';
import { getCrewmateById } from '../services/crewmateService';
import categoryConfig from '../config/categoryConfig';

function CrewmateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setLoading(true);
        const data = await getCrewmateById(id);
        console.log('Fetched crewmate details:', data);
        setCrewmate(data);
      } catch (err) {
        console.error('Error fetching crewmate details:', err);
        setError('Failed to load crewmate details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container">
        <h1>Crewmate Details</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !crewmate) {
    return (
      <div className="detail-container">
        <h1>Crewmate Details</h1>
        <p className="error-message">{error || 'Crewmate not found'}</p>
        <Link to="/gallery" className="action-button secondary">Back to Gallery</Link>
      </div>
    );
  }

  // Get the category name and description
  const categoryName = crewmate.category && categoryConfig[crewmate.category] 
    ? categoryConfig[crewmate.category].name 
    : 'Unknown';
  
  const categoryDescription = crewmate.category && categoryConfig[crewmate.category]
    ? categoryConfig[crewmate.category].description
    : '';

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1>{crewmate.name}</h1>
        <span className="created-date">
          Created on {new Date(crewmate.created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="crewmate-detail-card">
        {crewmate.category && (
          <div className="detail-row">
            <div className="detail-label">Category:</div>
            <div className="detail-value">
              <span className="category-value">{categoryName}</span>
              {categoryDescription && (
                <span className="category-description"> - {categoryDescription}</span>
              )}
            </div>
          </div>
        )}

        <div className="detail-row">
          <div className="detail-label">Color:</div>
          <div className="detail-value">
            <span 
              className="color-preview" 
              style={{ backgroundColor: crewmate.color.toLowerCase() }}
            ></span>
            {crewmate.color}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Speed:</div>
          <div className="detail-value">{crewmate.speed}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Special Ability:</div>
          <div className="detail-value">{crewmate.special_ability}</div>
        </div>

        <div className="detail-additional">
          <h3>Additional Information</h3>
          <p>This crewmate has completed {Math.floor(Math.random() * 10)} missions.</p>
          <p>Personality: {getRandomPersonality()}</p>
          <p>Favorite activity: {getRandomActivity()}</p>
        </div>
      </div>

      <div className="detail-actions">
        <Link to={`/edit/${crewmate.id}`} className="action-button primary">Edit Crewmate</Link>
        <Link to="/gallery" className="action-button secondary">Back to Gallery</Link>
      </div>
    </div>
  );
}

// Helper functions for random content
function getRandomPersonality() {
  const personalities = [
    'Adventurous', 'Analytical', 'Brave', 'Calm', 'Curious', 
    'Determined', 'Friendly', 'Helpful', 'Logical', 'Playful'
  ];
  return personalities[Math.floor(Math.random() * personalities.length)];
}

function getRandomActivity() {
  const activities = [
    'Exploring new planets', 'Cataloging alien species', 'Space gardening', 
    'Spacecraft maintenance', 'Stargazing', 'Playing zero-gravity games', 
    'Cooking space food', 'Making space art', 'Collecting space rocks'
  ];
  return activities[Math.floor(Math.random() * activities.length)];
}

export default CrewmateDetail;