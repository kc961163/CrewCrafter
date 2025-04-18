// src/components/CategorySelector.jsx
import { getCategoryOptions } from '../config/categoryConfig';
import '../styles/CategorySelector.css';

function CategorySelector({ selectedCategory, onChange }) {
  const categoryOptions = getCategoryOptions();
  
  return (
    <div className="category-selector">
      <h3>Select Crewmate Category</h3>
      <p className="category-description">Choose a specialization for your crewmate. This will determine available attributes.</p>
      
      <div className="category-options">
        {categoryOptions.map((category) => (
          <div 
            key={category.value}
            className={`category-option ${selectedCategory === category.value ? 'selected' : ''}`}
            onClick={() => onChange('category', category.value)}
          >
            <div className="category-header">
              <h4>{category.label}</h4>
            </div>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;