import React, { useState } from 'react';
import './ResistanceCalculator.css';

function ResistanceCalculator() {
  const [resistances, setResistances] = useState([]);
  const [totalResistance, setTotalResistance] = useState(null);
  const [connectionType, setConnectionType] = useState('series');


  const handleResistanceChange = (event, index) => {
    const newResistances = [...resistances];
    newResistances[index] = Number(event.target.value);
    setResistances(newResistances);
  };

  const addResistance = () => {
    setResistances([...resistances, 0]);
  };

  const removeResistance = (index) => {
    const newResistances = resistances.filter((_, i) => i !== index);
    setResistances(newResistances);
  };

  const clearCalculator = () => {
    setResistances([]);
    setTotalResistance(null);
  };

  const calculateTotalResistance = () => {
    if (connectionType === 'series') {
      const sum = resistances.reduce((acc, resistance) => acc + resistance, 0);
      setTotalResistance(sum);
    } else if (connectionType === 'parallel') {
      const reciprocalSum = resistances.reduce((acc, resistance) => acc + 1 / resistance, 0);
      const totalResistance = 1 / reciprocalSum;
      setTotalResistance(totalResistance);
    }
  };

  const handleConnectionTypeChange = (event) => {
    setConnectionType(event.target.value);
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Resistance Calculator</h2>
      <div className="connection-type">
        <label className="connection-type-label">
          Connection Type:
          <select value={connectionType} onChange={handleConnectionTypeChange}>
            <option value="series">Series</option>
            <option value="parallel">Parallel</option>
          </select>
        </label>
      </div>
      <div className="resistance-list">
        {resistances.map((resistance, index) => (
          <div key={index} className="resistance-item">
            <label className="resistance-label">
              Resistance {index + 1}:
              <input
                type="number"
                value={resistance}
                onChange={(event) => handleResistanceChange(event, index)}
                className="resistance-input"
              />
            </label>
            <button onClick={() => removeResistance(index)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={addResistance} className="add-button">
        Add Resistance
      </button>
      <button onClick={calculateTotalResistance} className="calculate-button">
        Calculate Total Resistance
      </button>
      <button onClick={clearCalculator} className="clear-button">
        Clear
      </button>
      {totalResistance !== null && (
        <div>
          <h3 className="result-title">Total Resistance:</h3>
          <p className="result-value">{totalResistance}</p>
        </div>
      )}
    </div>
  );
}

export default ResistanceCalculator;
