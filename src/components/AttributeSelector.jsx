// src/components/AttributeSelector.jsx
import '../styles/AttributeSelector.css';

function AttributeSelector({ attributeName, options, selectedValue, onChange, filteredOptions = null }) {
  // Use filtered options if provided, otherwise use all options
  const displayOptions = filteredOptions || options;
  
  // Special rendering for color attribute
  const isColorAttribute = attributeName.toLowerCase() === 'color';
  
  return (
    <div className="attribute-selector">
      <h3>{attributeName.replace('_', ' ')}</h3>
      <div className="attribute-options">
        {displayOptions.map((option) => (
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