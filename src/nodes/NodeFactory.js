import React from "react";
import BaseNode from "./BaseNode";
import nodeConfig from "./nodeConfig";

const createNode = (type, props) => {
  const { label, styles, handles, renderCustomContent } = nodeConfig[type];
  return (
    <BaseNode
      {...props}
      label={label}
      styles={styles}
      handles={handles}
      renderCustomContent={renderCustomContent}
    />
  );
};

export const InputNode = (props) => createNode("input", props);
export const OutputNode = (props) => createNode("output", props);
export const LLMNode = (props) => createNode("llm", props);
export const TextNode = (props) => createNode("text", props);
export const VisualizationNode = (props) => createNode("visualization", props);
export const MathOperation = (props) => createNode("mathOperation", props);
export const Image = (props) => createNode("image", props);
export const Conditional = (props) => createNode("conditional", props);
export const DataTransform = (props) => createNode("dataTransform", props);
