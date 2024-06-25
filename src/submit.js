// submit.js

import React from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  // const { nodes, edges } = useStore(selector, shallow);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    // const payload = {
    //   nodes,
    //   edges,
    // };
    const pipelineData = {
      nodes: nodes.map((node) => ({ id: node.id, type: node.type })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };
    console.log(nodes, edges, pipelineData);
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { num_nodes, num_edges, is_dag } = await response.json();
      alert(
        `Number of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit pipeline data. Check the console for details.");
    }
  };

  return (
    <button onClick={handleSubmit} style={buttonStyle}>
      Submit Pipeline
    </button>
  );
};

const buttonStyle = {
  margin: "20px",
  padding: "10px 20px",
  backgroundColor: "#1C2536",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default SubmitButton;
