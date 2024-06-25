import React, { useState, useCallback } from "react";

const InputNode = ({ id, nodeData, updateNodeField }) => {
  // Initialize state with nodeData or default values
  const [currName, setCurrName] = useState(
    nodeData?.inputName || "Default Input"
  );
  const [inputType, setInputType] = useState(nodeData?.inputType || "Text");

  // Callback for name change to update state and store
  const handleNameChange = useCallback(
    (e) => {
      const newName = e.target.value;
      setCurrName(newName);
      updateNodeField(id, "inputName", newName);
    },
    [id, updateNodeField]
  );

  // Callback for type change to update state and store
  const handleTypeChange = useCallback(
    (e) => {
      const newType = e.target.value;
      setInputType(newType);
      updateNodeField(id, "inputType", newType);
    },
    [id, updateNodeField]
  );

  return (
    <div>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );
};

export default InputNode;
