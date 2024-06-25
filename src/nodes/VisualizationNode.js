import React from "react";

const VisualizationNode = ({ id, nodeData, updateNodeField }) => (
  <div>
    <label>
      Chart Type:
      <select
        value={nodeData.chartType || ""}
        onChange={(e) => updateNodeField("chartType", e.target.value)}
      >
        <option value="Bar">Bar</option>
        <option value="Line">Line</option>
        <option value="Pie">Pie</option>
      </select>
    </label>
    <p>Data Source: {nodeData.dataSource || "Not specified"}</p>
  </div>
);

export default VisualizationNode;
