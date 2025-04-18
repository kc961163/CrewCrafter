// src/components/CrewSuccessMetric.jsx
import { calculateCrewSuccessScore } from '../utils/statisticsUtil';
import '../styles/CrewSuccessMetric.css';

function CrewSuccessMetric({ crewmates }) {
  // Calculate success metrics
  const { score, rating, message, styleClass } = calculateCrewSuccessScore(crewmates);
  
  if (crewmates.length === 0) {
    return null; // Don't render for empty crew
  }
  
  // Calculate the width of the progress bar (0-100%)
  const progressWidth = `${Math.round(score * 100)}%`;
  
  return (
    <div className={`success-metric ${styleClass}`}>
      <div className="success-header">
        <h2>Crew Success Rating</h2>
        <div className="success-rating">{rating}</div>
      </div>
      
      <div className="success-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: progressWidth }}
          ></div>
        </div>
        <div className="progress-value">{Math.round(score * 100)}%</div>
      </div>
      
      <p className="success-message">{message}</p>
    </div>
  );
}

export default CrewSuccessMetric;