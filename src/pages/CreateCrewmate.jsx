// src/pages/CreateCrewmate.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AttributeSelector from '../components/AttributeSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import { createCrewmate } from '../services/crewmateService';
import '../styles/CrewmateForm.css';

function CreateCrewmate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    special_ability: ''
  });
  
  // Predefined options for each attribute
  const attributeOptions = {
    speed: ['Slow', 'Medium', 'Fast', 'Lightning'],
    color: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White'],
    special_ability: ['Teleportation', 'Invisibility', 'Super Strength', 'Flight', 'Mind Reading', 'Healing']
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    // Clear error for this field when it changes
    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
  };
  
  // Prevent form submission on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  
  const handleAttributeChange = (attributeName, value) => {
    setFormData({...formData, [attributeName]: value});
    
    // Clear error for this attribute when it changes
    if (errors[attributeName]) {
      setErrors({...errors, [attributeName]: null});
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.speed) {
      newErrors.speed = 'Speed is required';
    }
    
    if (!formData.color) {
      newErrors.color = 'Color is required';
    }
    
    if (!formData.special_ability) {
      newErrors.special_ability = 'Special ability is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('Submitting form data:', formData);
      
      const newCrewmate = await createCrewmate(formData);
      console.log('Successfully created crewmate:', newCrewmate);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        speed: '',
        color: '',
        special_ability: ''
      });
      
      // No automatic redirection - let user decide when to navigate
      
    } catch (error) {
      console.error('Error creating crewmate:', error);
      setErrors({ submit: error.message || 'Failed to create crewmate' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="create-container">
      <h1>Create a New Crewmate</h1>
      <p>Fill out the form below to create your crewmate.</p>
      
      {success ? (
        <div className="success-message">
          <p>Crewmate created successfully!</p>
          <div className="action-buttons">
            <Link to="/gallery" className="action-button primary">View Gallery</Link>
            <button 
              className="action-button secondary"
              onClick={() => setSuccess(false)}
            >
              Create Another
            </button>
          </div>
        </div>
      ) : (
        <form className="crewmate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter crewmate name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          
          <AttributeSelector
            attributeName="Speed"
            options={attributeOptions.speed}
            selectedValue={formData.speed}
            onChange={handleAttributeChange}
          />
          {errors.speed && <p className="error-message">{errors.speed}</p>}
          
          <AttributeSelector
            attributeName="Color"
            options={attributeOptions.color}
            selectedValue={formData.color}
            onChange={handleAttributeChange}
          />
          {errors.color && <p className="error-message">{errors.color}</p>}
          
          <AttributeSelector
            attributeName="Special_ability"
            options={attributeOptions.special_ability}
            selectedValue={formData.special_ability}
            onChange={handleAttributeChange}
          />
          {errors.special_ability && <p className="error-message">{errors.special_ability}</p>}
          
          {errors.submit && <p className="error-message">{errors.submit}</p>}
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              Create Crewmate
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default CreateCrewmate;