import { Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// We'll use a more generic approach to handle the React Flow node props
const CustomNodeInput = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Bottom}
        id="bottom"
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Left}
        id="left"
      />
    </>
  );
};

const CustomNodeDefault = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="target"
        position={Position.Top}
        id="top"
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Bottom}
        id="bottom"
      />
    </>
  );
};

const CustomNodeLeft = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="target"
        position={Position.Top}
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Left}
        id="left"
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Bottom}
        id="bottom"
      />
    </>
  );
};

const CustomNodeRight = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="target"
        position={Position.Top}
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Right}
        id="right"
      />
      <Handle
        className="w-1 h-1 bg-blue-400"
        type="source"
        position={Position.Bottom}
        id="bottom"
      />
    </>
  );
};

const CustomNodeLeftChild = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="target"
        position={Position.Right}
      />
    </>
  );
};

const CustomNodeRightChild = ({ data, selected }: any) => {
  return (
    <>
      <div
        className={`w-48 text-center px-4 py-2 bg-sky-300 border-2 ${selected ? "border-green-500" : "border-blue-700"} rounded-lg text-white text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-200`}
      >
        {data.label}
      </div>

      <Handle
        className="w-1 h-1 bg-blue-400"
        type="target"
        position={Position.Left}
      />
    </>
  );
};

export {
  CustomNodeDefault,
  CustomNodeInput,
  CustomNodeLeft,
  CustomNodeLeftChild,
  CustomNodeRight,
  CustomNodeRightChild,
};
