// submit.js

import React from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    const payload = {
      nodes,
      edges,
    };
    console.log(nodes, edges);
    try {
      const response = await fetch("/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
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
