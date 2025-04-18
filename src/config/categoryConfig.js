// src/config/categoryConfig.js

/**
 * Configuration for crewmate categories and their allowed attribute options
 * Each category restricts which attribute values can be selected
 */
const categoryConfig = {
    // Space explorer role - balanced adventurer
    explorer: {
      name: "Explorer",
      description: "Scouts new territories and charts unknown regions of space",
      speed: ["Medium", "Fast"],
      color: ["Blue", "Green", "Orange", "Yellow"],
      special_ability: ["Teleportation", "Flight"]
    },
    
    // Combat specialist role
    warrior: {
      name: "Warrior",
      description: "Trained for combat and defense against hostile entities",
      speed: ["Medium", "Fast", "Lightning"],
      color: ["Red", "Black", "Orange"],
      special_ability: ["Super Strength", "Invisibility"]
    },
    
    // Scientific role
    scientist: {
      name: "Scientist",
      description: "Studies alien lifeforms and phenomena aboard the ship",
      speed: ["Slow", "Medium"],
      color: ["Blue", "Purple", "White"],
      special_ability: ["Mind Reading", "Teleportation"]
    },
    
    // Support/healing role
    medic: {
      name: "Medic",
      description: "Provides medical care and support for the crew",
      speed: ["Medium", "Fast"],
      color: ["White", "Green", "Blue"],
      special_ability: ["Healing"]
    },
    
    // Navigation specialist
    navigator: {
      name: "Navigator",
      description: "Expert in plotting courses through deep space",
      speed: ["Fast", "Lightning"],
      color: ["Yellow", "Purple"],
      special_ability: ["Teleportation", "Flight"]
    }
  };
  
  // Get all available categories as an array for dropdown selection
  export const getCategoryOptions = () => {
    return Object.keys(categoryConfig).map(key => ({
      value: key,
      label: categoryConfig[key].name,
      description: categoryConfig[key].description
    }));
  };
  
  // Get the filtered attribute options for a specific category
  export const getAttributeOptionsForCategory = (categoryKey) => {
    if (!categoryKey || !categoryConfig[categoryKey]) {
      // If no category selected or invalid category, return null
      return null;
    }
    
    return {
      speed: categoryConfig[categoryKey].speed,
      color: categoryConfig[categoryKey].color,
      special_ability: categoryConfig[categoryKey].special_ability
    };
  };
  
  export default categoryConfig;