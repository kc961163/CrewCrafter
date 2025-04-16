// src/components/AttributeSelector.jsx
import { useState } from 'react';
import '../styles/AttributeSelector.css';

function AttributeSelector({ attributeName, options, selectedValue, onChange }) {
  // Special rendering for color attribute
  const isColorAttribute = attributeName.toLowerCase() === 'color';
  
  return (
    <div className="attribute-selector">
      <h3>{attributeName.replace('_', ' ')}</h3>
      <div className="attribute-options">
        {options.map((option) => (
          <button
          type='button'
            key={option}
            className={`attribute-option ${selectedValue === option ? 'selected' : ''} ${
              isColorAttribute ? 'color-option' : ''
            }`}
            onClick={() => onChange(attributeName.toLowerCase(), option)}
            style={isColorAttribute ? { backgroundColor: option.toLowerCase() } : {}}
          >
            {isColorAttribute ? '' : option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AttributeSelector;