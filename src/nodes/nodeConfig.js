import { Position } from "reactflow";
import InputNode from "./inputNode";
import OutputNode from "./outputNode";
import LLMNode from "./llmNode";
import TextNode from "./textNode";
import VisualizationNode from "./VisualizationNode";
import MathOperationNode from "./MathOperationNode";
import ImageNode from "./ImageNode";
import ConditionalNode from "./ConditionalNode";
import DataTransformNode from "./DataTransformNode";

const defaultStyles = {
  container: "node-container",
  header: "node-header",
  content: "node-content",
};

export const nodeConfig = {
  input: {
    label: "Input Node",
    styles: { ...defaultStyles, container: "node-input" },
    handles: {
      inputHandles: [],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { inputName: "Default Input", inputType: "Text" },
    renderCustomContent: InputNode,
  },
  output: {
    label: "Output Node",
    styles: { ...defaultStyles, container: "node-output" },
    handles: { inputHandles: [{ position: Position.Left }], outputHandles: [] },
    defaultData: { outputName: "Default Output", outputType: "Text" },
    renderCustomContent: OutputNode,
  },
  llm: {
    label: "LLM Node",
    styles: { ...defaultStyles, container: "node-llm" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { model: "Default Model", prompt: "Enter prompt here..." },
    renderCustomContent: LLMNode,
  },
  text: {
    label: "Text Node",
    styles: { ...defaultStyles, container: "node-text" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { textContent: "Default Text Content" },
    renderCustomContent: TextNode,
  },
  visualization: {
    label: "Visualization Node",
    styles: { ...defaultStyles, container: "node-visualization" },
    handles: {
      inputHandles: [{ position: Position.Top }],
      outputHandles: [{ position: Position.Bottom }],
    },
    defaultData: { chartType: "Bar", dataSource: "Sample Data" },
    renderCustomContent: VisualizationNode,
  },
  mathOperation: {
    label: "Math Operation Node",
    styles: { ...defaultStyles, container: "node-math-operation" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { operation: "add", operand1: 0, operand2: 0 },
    renderCustomContent: MathOperationNode,
  },
  image: {
    label: "Image Node",
    styles: { ...defaultStyles, container: "node-image" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { imageUrl: "" },
    renderCustomContent: ImageNode,
  },
  conditional: {
    label: "Conditional Node",
    styles: { ...defaultStyles, container: "node-conditional" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [
        { position: Position.Right, id: "true" },
        { position: Position.Right, id: "false" },
      ],
    },
    defaultData: { condition: "" },
    renderCustomContent: ConditionalNode,
  },
  dataTransform: {
    label: "Data Transform Node",
    styles: { ...defaultStyles, container: "node-data-transform" },
    handles: {
      inputHandles: [{ position: Position.Left }],
      outputHandles: [{ position: Position.Right }],
    },
    defaultData: { transformFunction: "" },
    renderCustomContent: DataTransformNode,
  },
};

export default nodeConfig;
