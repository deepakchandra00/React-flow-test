import React, { useState, useCallback } from "react";

const OutputNode = ({ id, nodeData, updateNodeField }) => {
  console.log(id, nodeData, updateNodeField);
  // Initialize state with nodeData or default values
  const [currName, setCurrName] = useState(
    nodeData?.outputName || "Default Output"
  );
  const [outputType, setOutputType] = useState(nodeData?.outputType || "Text");

  // Memoize the event handler for name change
  const handleNameChange = useCallback(
    (e) => {
      const newName = e.target.value;
      setCurrName(newName);
      updateNodeField("outputName", newName);
    },
    [updateNodeField]
  );

  // Memoize the event handler for type change
  const handleTypeChange = useCallback(
    (e) => {
      const newType = e.target.value;
      setOutputType(newType);
      updateNodeField("outputType", newType);
    },
    [updateNodeField]
  );

  return (
    <div>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );
};

export default OutputNode;
