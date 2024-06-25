import React from "react";

const ImageNode = ({ id, nodeData, updateNodeField }) => (
  <div>
    <label>
      Image URL:
      <input
        type="text"
        value={nodeData.imageUrl || ""}
        onChange={(e) => updateNodeField("imageUrl", e.target.value)}
      />
    </label>
    {nodeData.imageUrl && (
      <img
        src={nodeData.imageUrl}
        alt="Node"
        style={{ width: "100%", height: "auto" }}
      />
    )}
  </div>
);

export default ImageNode;
