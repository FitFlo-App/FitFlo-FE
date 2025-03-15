import React from "react";
import { Button } from "antd";

interface ExamplePromptsProps {
  prompts: string[];
  onPromptSelect: (prompt: string) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({
  prompts,
  onPromptSelect,
}) => {
  return (
    <>
      <div className="mb-3">
        <p className="text-gray-500">Try one of these conditions:</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            onClick={() => onPromptSelect(prompt)}
            className="rounded-full border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 mb-2 text-left px-4 py-2 h-auto"
            type="default"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ExamplePrompts;
