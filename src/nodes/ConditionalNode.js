import React from "react";

const ConditionalNode = ({ id, nodeData, updateNodeField }) => (
  <div>
    <label>
      Condition:
      <input
        type="text"
        value={nodeData.condition || ""}
        onChange={(e) => updateNodeField("condition", e.target.value)}
      />
    </label>
    <p>
      If condition is met, connect to the 'true' output, otherwise to the
      'false' output.
    </p>
  </div>
);

export default ConditionalNode;
