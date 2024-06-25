// store.js

import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import nodeConfig from "./nodes/nodeConfig";
export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    // Retrieve the default data from nodeConfig for the given type
    const defaultData = nodeConfig[node.type]?.defaultData || {};
    console.log(defaultData);
    // Merge the default data with the provided node data
    const nodeData = {
      ...defaultData,
      ...node.data,
    };
    set({
      nodes: [...get().nodes, { ...node, data: nodeData }],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    console.log("Connection attempt:", connection);
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            // type: MarkerType.Arrow,
            height: "10px",
            width: "10px",
            color: "#3f51b5",
          },
        },
        get().edges
      ),
    });
  },
  // Function to remove node
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    })),

  // Function to update specific data of a node
  updateNodeField: (nodeId, key, value) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              [key]: value,
            },
          };
        }
        return node;
      }),
    })),
}));
