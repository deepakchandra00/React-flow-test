import React from "react";

const MathOperationNode = ({ id, nodeData, updateNodeField }) => (
  <div>
    <label>
      Operation:
      <select
        value={nodeData.operation || "add"}
        onChange={(e) => updateNodeField("operation", e.target.value)}
      >
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
    </label>
    <label>
      Operand 1:
      <input
        type="number"
        value={nodeData.operand1 || ""}
        onChange={(e) =>
          updateNodeField("operand1", parseFloat(e.target.value))
        }
      />
    </label>
    <label>
      Operand 2:
      <input
        type="number"
        value={nodeData.operand2 || ""}
        onChange={(e) =>
          updateNodeField("operand2", parseFloat(e.target.value))
        }
      />
    </label>
  </div>
);

export default MathOperationNode;
