// src/pages/EditCrewmate.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AttributeSelector from '../components/AttributeSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCrewmateById, updateCrewmate, deleteCrewmate } from '../services/crewmateService';
import '../styles/CrewmateForm.css';
import '../styles/EditCrewmate.css';

function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
  
  // Fetch the crewmate data when component mounts
  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setIsLoading(true);
        const data = await getCrewmateById(id);
        console.log('Fetched crewmate for editing:', data);
        
        setFormData({
          name: data.name,
          speed: data.speed,
          color: data.color,
          special_ability: data.special_ability
        });
      } catch (err) {
        console.error('Error fetching crewmate:', err);
        setErrors({ fetch: err.message || 'Failed to load crewmate data' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    // Clear error for this field when it changes
    if (errors[name]) {
      setErrors({...errors, [name]: null});
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
      setIsSaving(true);
      console.log('Updating crewmate with data:', formData);
      
      await updateCrewmate(id, formData);
      console.log('Successfully updated crewmate');
      
      setSuccess(true);
    } catch (error) {
      console.error('Error updating crewmate:', error);
      setErrors({ submit: error.message || 'Failed to update crewmate' });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCrewmate(id);
      console.log('Successfully deleted crewmate');
      navigate('/gallery', { state: { message: 'Crewmate deleted successfully!' } });
    } catch (error) {
      console.error('Error deleting crewmate:', error);
      setErrors({ delete: error.message || 'Failed to delete crewmate' });
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="edit-container">
        <h1>Edit Crewmate</h1>
        <LoadingSpinner />
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="success-message">
        <p>Crewmate updated successfully!</p>
        <div className="action-buttons">
          <Link to={`/gallery/${id}`} className="action-button primary">View Crewmate</Link>
          <Link to="/gallery" className="action-button secondary">Back to Gallery</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="edit-container">
      <h1>Edit Crewmate</h1>
      <p>Update your crewmate's details below.</p>
      
      {errors.fetch && (
        <div className="error-message fetch-error">
          <p>{errors.fetch}</p>
          <Link to="/gallery" className="action-button secondary">Back to Gallery</Link>
        </div>
      )}
      
      {!errors.fetch && (
        <form className="crewmate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
          {errors.delete && <p className="error-message">{errors.delete}</p>}
          
          <div className="form-actions">
            {isSaving ? (
              <LoadingSpinner />
            ) : (
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSaving || isDeleting}
              >
                Update Crewmate
              </button>
            )}
            
            {!showDeleteConfirm ? (
              <button 
                type="button" 
                className="delete-button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isSaving || isDeleting}
              >
                Delete Crewmate
              </button>
            ) : (
              <div className="delete-confirmation">
                <p>Are you sure you want to delete this crewmate?</p>
                <div className="confirm-actions">
                  {isDeleting ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <button 
                        type="button" 
                        className="confirm-delete"
                        onClick={handleDelete}
                      >
                        Yes, Delete
                      </button>
                      <button 
                        type="button" 
                        className="cancel-delete"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="back-link">
            <Link to={`/gallery/${id}`}>Cancel and return to details</Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditCrewmate;