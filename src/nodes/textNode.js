import React, { useState, useRef, useCallback, useMemo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

// Regex to find variables within double curly braces
const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

const TextNode = ({ id, nodeData, updateNodeField }) => {
  // Initialize state
  const initialText = nodeData?.textContent || "";
  const [text, setText] = useState(initialText);
  const [nodeWidth, setNodeWidth] = useState(160);
  const [nodeHeight, setNodeHeight] = useState(150);
  const [variables, setVariables] = useState([]);

  // Store the last text to prevent unnecessary updates
  const lastTextRef = useRef(initialText);

  // Hook to update node internals
  const updateNodeInternals = useUpdateNodeInternals();

  // Calculate new width and height based on text
  const calculateNodeSize = useCallback((newText) => {
    const textLength = newText.length;
    const lines = newText.split("\n");
    const newWidth = Math.max(160, Math.min(160, textLength * 8));
    const newHeight = Math.max(150, Math.min(150, lines.length * 20));
    return { newWidth, newHeight };
  }, []);

  // Extract variables from the text
  const extractVariables = useCallback((newText) => {
    const newVariables = [];
    let match;
    while ((match = variableRegex.exec(newText)) !== null) {
      newVariables.push(match[1]);
    }
    return newVariables;
  }, []);

  // Handle text changes and update state accordingly
  const handleTextChange = useCallback(
    (e) => {
      const newText = e.target.value;
      setText(newText);

      // Only update if the text has changed
      if (newText !== lastTextRef.current) {
        lastTextRef.current = newText;

        const { newWidth, newHeight } = calculateNodeSize(newText);
        setNodeWidth(newWidth);
        setNodeHeight(newHeight);

        const newVariables = extractVariables(newText);
        setVariables(newVariables);

        updateNodeField(id, "textContent", newText);

        // Update node internals to reflect changes
        updateNodeInternals(id);
      }
    },
    [
      calculateNodeSize,
      extractVariables,
      id,
      updateNodeField,
      updateNodeInternals,
    ]
  );

  // Memoize handles to avoid re-rendering
  const handles = useMemo(
    () => (
      <>
        {variables.map((variable, index) => (
          <Handle
            key={`${id}-variable-${variable}`}
            type="source"
            position={Position.Left}
            id={`${id}-variable-${variable}`}
            style={{
              width: 15,
              height: 15,
              background: "#fff",
              border: "2px solid #3f51b5",
              top: 20 + index * 20,
            }}
          />
        ))}
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-value`}
          style={{
            width: 15,
            height: 15,
            background: "#fff",
            border: "2px solid #3f51b5",
          }}
        />
      </>
    ),
    [variables, id]
  );

  return (
    <div
      style={{
        width: nodeWidth,
        height: nodeHeight,
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
        resize: "both",
      }}
    >
      <div>
        <textarea
          style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          value={text}
          onChange={handleTextChange}
        />
      </div>
      {handles}
    </div>
  );
};

export default TextNode;
