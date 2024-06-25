import React from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const BaseNode = ({
  id,
  data,
  label,
  styles,
  handles,
  renderCustomContent,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const { removeNode } = useStore((state) => ({
    removeNode: state.removeNode,
  }));
  const handleRemoveNode = () => {
    removeNode(id);
  };

  return (
    <div
      className={styles.container}
      style={{
        width: 200,
        height: "auto",
        padding: "10px",
        border: "1px solid black",
      }}
    >
      {/* Node Header */}
      <div className={styles.header}>
        <strong>{label}</strong>
        <button
          className={"closeButton"}
          onClick={handleRemoveNode}
          title="Delete Node"
        >
          &times;
        </button>
      </div>

      {/* Custom Node Content */}
      <div className={styles.content}>
        {renderCustomContent({
          id,
          nodeData: data,
          updateNodeField: (key, value) => updateNodeField(id, key, value),
        })}
      </div>

      {/* Input Handles */}
      {handles.inputHandles.map((handle, index) => (
        <Handle
          key={`input-${id}-${index}`}
          type="target"
          position={handle.position || Position.Left}
          id={`${id}-input-${index}`}
          style={{
            width: 15,
            height: 15,
            background: "#fff",
            border: "2px solid #3f51b5",
          }}
        />
      ))}

      {/* Output Handles */}
      {handles.outputHandles.map((handle, index) => (
        <Handle
          key={`output-${id}-${index}`}
          type="source"
          position={handle.position || Position.Right}
          id={`${id}-output-${index}`}
          style={{
            width: 15,
            height: 15,
            background: "#fff",
            border: "2px solid #3f51b5",
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
