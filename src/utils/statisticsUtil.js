// src/utils/statisticsUtil.js
import categoryConfig from '../config/categoryConfig';

/**
 * Calculates statistics about the crew composition
 * @param {Array} crewmates - Array of crewmate objects
 * @returns {Object} Object containing various statistics about the crew
 */
export const calculateCrewStatistics = (crewmates) => {
  if (!crewmates || crewmates.length === 0) {
    return {
      totalCrewmates: 0,
      categoryCounts: {},
      categoryPercentages: {},
      speedDistribution: {},
      colorDistribution: {},
      abilityDistribution: {},
      mostCommonCategory: null,
      mostCommonSpeed: null,
      mostCommonColor: null,
      mostCommonAbility: null,
    };
  }
  
  const totalCrewmates = crewmates.length;
  
  // Initialize counters
  const categoryCounts = {};
  const speedCounts = {};
  const colorCounts = {};
  const abilityCounts = {};
  
  // Count occurrences of each attribute
  crewmates.forEach(crewmate => {
    // Count categories
    const category = crewmate.category || 'unknown';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    
    // Count speeds
    const speed = crewmate.speed;
    speedCounts[speed] = (speedCounts[speed] || 0) + 1;
    
    // Count colors
    const color = crewmate.color;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
    
    // Count abilities
    const ability = crewmate.special_ability;
    abilityCounts[ability] = (abilityCounts[ability] || 0) + 1;
  });
  
  // Calculate percentages
  const categoryPercentages = {};
  Object.keys(categoryCounts).forEach(category => {
    categoryPercentages[category] = Math.round((categoryCounts[category] / totalCrewmates) * 100);
  });
  
  const speedPercentages = {};
  Object.keys(speedCounts).forEach(speed => {
    speedPercentages[speed] = Math.round((speedCounts[speed] / totalCrewmates) * 100);
  });
  
  const colorPercentages = {};
  Object.keys(colorCounts).forEach(color => {
    colorPercentages[color] = Math.round((colorCounts[color] / totalCrewmates) * 100);
  });
  
  const abilityPercentages = {};
  Object.keys(abilityCounts).forEach(ability => {
    abilityPercentages[ability] = Math.round((abilityCounts[ability] / totalCrewmates) * 100);
  });
  
  // Find most common attributes
  const mostCommonCategory = findMostCommon(categoryCounts);
  const mostCommonSpeed = findMostCommon(speedCounts);
  const mostCommonColor = findMostCommon(colorCounts);
  const mostCommonAbility = findMostCommon(abilityCounts);
  
  // Get human-readable category names
  const categoryNames = {};
  Object.keys(categoryCounts).forEach(categoryKey => {
    if (categoryKey === 'unknown') {
      categoryNames[categoryKey] = 'Unknown';
    } else if (categoryConfig[categoryKey]) {
      categoryNames[categoryKey] = categoryConfig[categoryKey].name;
    } else {
      categoryNames[categoryKey] = categoryKey;
    }
  });
  
  return {
    totalCrewmates,
    categoryCounts,
    categoryPercentages,
    categoryNames,
    speedDistribution: {
      counts: speedCounts,
      percentages: speedPercentages
    },
    colorDistribution: {
      counts: colorCounts,
      percentages: colorPercentages
    },
    abilityDistribution: {
      counts: abilityCounts,
      percentages: abilityPercentages
    },
    mostCommonCategory,
    mostCommonSpeed,
    mostCommonColor,
    mostCommonAbility
  };
};

/**
 * Finds the most common value in a count object
 * @param {Object} countObj - Object with values as counts
 * @returns {string|null} The key with the highest count, or null if empty
 */
const findMostCommon = (countObj) => {
  const entries = Object.entries(countObj);
  if (entries.length === 0) return null;
  
  return entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  }, ['', 0])[0];
};

/**
 * Calculates a success score for the crew based on composition
 * @param {Array} crewmates - Array of crewmate objects
 * @returns {Object} Object containing success score and related information
 */
export const calculateCrewSuccessScore = (crewmates) => {
  if (!crewmates || crewmates.length === 0) {
    return {
      score: 0,
      rating: 'Incomplete',
      message: 'Add crewmates to see success rating',
      styleClass: 'incomplete-crew'
    };
  }
  
  const stats = calculateCrewStatistics(crewmates);
  
  // Calculate metrics that contribute to success
  
  // 1. Size factor - More crewmates = better score, up to a point
  const sizeFactor = Math.min(crewmates.length / 5, 1); // Max credit for 5+ crewmates
  
  // 2. Diversity factor - Score higher for having diverse categories
  const categoryCount = Object.keys(stats.categoryCounts).length;
  const maxCategories = 5; // Maximum number of categories we track
  const diversityFactor = Math.min(categoryCount / maxCategories, 1);
  
  // 3. Balance factor - Score higher for balanced composition (no single category dominates)
  let balanceFactor = 1;
  Object.values(stats.categoryPercentages).forEach(percentage => {
    // If any category is over 50%, reduce balance factor
    if (percentage > 50) {
      balanceFactor = 0.7;
    }
  });
  
  // 4. Special ability factor - Certain combinations work well together
  let specialAbilityFactor = 0.5; // Base value
  
  // Check for special ability combinations
  const hasHealing = crewmates.some(c => c.special_ability === 'Healing');
  const hasSuperStrength = crewmates.some(c => c.special_ability === 'Super Strength');
  const hasTeleportation = crewmates.some(c => c.special_ability === 'Teleportation');
  const hasInvisibility = crewmates.some(c => c.special_ability === 'Invisibility');
  const hasFlight = crewmates.some(c => c.special_ability === 'Flight');
  const hasMindReading = crewmates.some(c => c.special_ability === 'Mind Reading');
  
  // Valuable ability combinations
  if (hasHealing && hasSuperStrength) specialAbilityFactor += 0.15;
  if (hasTeleportation && hasMindReading) specialAbilityFactor += 0.15;
  if (hasInvisibility && hasFlight) specialAbilityFactor += 0.15;
  
  // Very balanced if we have 4+ different abilities
  const abilityCount = [hasHealing, hasSuperStrength, hasTeleportation, 
                        hasInvisibility, hasFlight, hasMindReading]
                        .filter(Boolean).length;
  if (abilityCount >= 4) specialAbilityFactor += 0.2;
  
  // Calculate total score (weighted)
  const totalScore = (
    sizeFactor * 0.25 +
    diversityFactor * 0.3 +
    balanceFactor * 0.2 +
    specialAbilityFactor * 0.25
  );
  
  // Round to 2 decimal places
  const score = Math.round(totalScore * 100) / 100;
  
  // Determine rating band and style class
  let rating, message, styleClass;
  
  if (score >= 0.8) {
    rating = 'Elite';
    message = 'A perfectly balanced team with complementary skills!';
    styleClass = 'elite-crew';
  } else if (score >= 0.6) {
    rating = 'Formidable';
    message = 'Your crew works effectively together and has great potential.';
    styleClass = 'formidable-crew';
  } else if (score >= 0.4) {
    rating = 'Promising';
    message = 'Your crew has solid foundations but could use more diversity.';
    styleClass = 'promising-crew';
  } else {
    rating = 'Developing';
    message = 'Add more crewmates with complementary abilities to improve your crew.';
    styleClass = 'developing-crew';
  }
  
  return {
    score,
    rating,
    message,
    styleClass
  };
};