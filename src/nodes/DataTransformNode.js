import React from "react";

const DataTransformNode = ({ id, nodeData, updateNodeField }) => (
  <div>
    <label>
      Transformation Function:
      <textarea
        value={nodeData.transformFunction || ""}
        onChange={(e) => updateNodeField("transformFunction", e.target.value)}
        placeholder="Enter JavaScript function"
      />
    </label>
  </div>
);

export default DataTransformNode;
