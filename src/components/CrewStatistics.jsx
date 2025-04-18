// src/components/CrewStatistics.jsx
import { useState } from 'react';
import { calculateCrewStatistics } from '../utils/statisticsUtil';
import '../styles/CrewStatistics.css';

function CrewStatistics({ crewmates }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate statistics
  const stats = calculateCrewStatistics(crewmates);
  
  if (stats.totalCrewmates === 0) {
    return null; // Don't render statistics if no crewmates
  }
  
  return (
    <div className="crew-statistics">
      <div className="statistics-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>Crew Statistics</h2>
        <button className={`expand-button ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="statistics-content">
          <div className="stats-overview">
            <div className="stat-item">
              <span className="stat-label">Total Crewmates:</span>
              <span className="stat-value">{stats.totalCrewmates}</span>
            </div>
            
            {stats.mostCommonCategory && (
              <div className="stat-item">
                <span className="stat-label">Most Common Category:</span>
                <span className="stat-value">{stats.categoryNames[stats.mostCommonCategory]} ({stats.categoryPercentages[stats.mostCommonCategory]}%)</span>
              </div>
            )}
            
            {stats.mostCommonSpeed && (
              <div className="stat-item">
                <span className="stat-label">Most Common Speed:</span>
                <span className="stat-value">{stats.mostCommonSpeed} ({stats.speedDistribution.percentages[stats.mostCommonSpeed]}%)</span>
              </div>
            )}
            
            {stats.mostCommonColor && (
              <div className="stat-item">
                <span className="stat-label">Most Common Color:</span>
                <span className="stat-value">
                  <span 
                    className="color-dot" 
                    style={{ backgroundColor: stats.mostCommonColor.toLowerCase() }}
                  ></span>
                  {stats.mostCommonColor} ({stats.colorDistribution.percentages[stats.mostCommonColor]}%)
                </span>
              </div>
            )}
            
            {stats.mostCommonAbility && (
              <div className="stat-item">
                <span className="stat-label">Most Common Ability:</span>
                <span className="stat-value">{stats.mostCommonAbility} ({stats.abilityDistribution.percentages[stats.mostCommonAbility]}%)</span>
              </div>
            )}
          </div>
          
          <div className="distribution-charts">
            <h3>Category Distribution</h3>
            <div className="chart-container">
              {Object.keys(stats.categoryPercentages).map(category => (
                <div className="chart-item" key={category}>
                  <div className="chart-label">
                    <span>{stats.categoryNames[category]}</span>
                    <span>{stats.categoryPercentages[category]}%</span>
                  </div>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar"
                      style={{ width: `${stats.categoryPercentages[category]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3>Ability Distribution</h3>
            <div className="chart-container">
              {Object.keys(stats.abilityDistribution.percentages).map(ability => (
                <div className="chart-item" key={ability}>
                  <div className="chart-label">
                    <span>{ability}</span>
                    <span>{stats.abilityDistribution.percentages[ability]}%</span>
                  </div>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar ability-bar"
                      style={{ width: `${stats.abilityDistribution.percentages[ability]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrewStatistics;