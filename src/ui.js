// src/PipelineUI.js

import React, { useRef, useState, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  InputNode,
  OutputNode,
  LLMNode,
  TextNode,
  VisualizationNode,
  MathOperation,
  Image,
  Conditional,
  DataTransform,
} from "./nodes/NodeFactory";
import "reactflow/dist/style.css";

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  visualization: VisualizationNode,
  mathOperation: MathOperation,
  image: Image,
  conditional: Conditional,
  dataTransform: DataTransform,
};
const gridSize = 20;
const proOptions = { hideAttribution: true };

const getInitNodeData = (nodeID, type) => {
  let nodeData = { id: nodeID, nodeType: `${type}` };
  return nodeData;
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      // const type = event.dataTransfer.getData("application/reactflow");
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;
        if (!type || typeof type === "undefined") {
          return; // Exit if there's no valid type
        }

        // Calculate the position where the node should be placed
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Generate a unique ID for the node
        const nodeID = getNodeID(type);

        // Create the new node with position
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  return (
    <div className="pipeline-ui">
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
          // connectionLineComponent={ConnectionLine}
        >
          <Controls />
          <Background variant="lines" />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

// export default PipelineUI;
