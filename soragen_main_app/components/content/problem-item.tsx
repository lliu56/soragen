import React from "react";
import CopyButton from "../utils/copy-button";
import useParsedSolutions from "@/hooks/useParsedSolutions";

interface ProblemItemProps {
  id: number;
  title: string;
  created_at: string;
  description: string;
  solutions: string;
  source: string;
  category: string;
  expanded: boolean;
  onClick: () => void;
  number: number;
}

const ProblemItem: React.FC<ProblemItemProps> = ({
  expanded,
  title,
  description,
  solutions,
  source,
  category,
  id,
  created_at,
  onClick,
  number,
}) => {
  // Parse the JSON string to an array
  const solutionItems = useParsedSolutions(solutions);

  // Adjusted class names for the container
  const itemClasses = `bg-gradient-to-l from-gray-50 to-gray-100 p-8 rounded-lg shadow mb-4 flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 mx-auto w-3/4 hover:cursor-pointer ${
    expanded ? "scale-105 border border-gray-200" : "scale-100"
  }`;
  const textToCopy = expanded
    ? `Title: ${title}\nDescription: ${description}\nSolutions: ${solutionItems.join(
        "\n"
      )}\nSource: ${source}\nCategory: ${category}`
    : `Title: ${title}\nDescription: ${description}\nSource: ${source}\nCategory: ${category}`;

  return (
    <>
      <div className="flex justify-center items-center">
        <div className={itemClasses} onDoubleClick={onClick}>
          <div className="flex-row justify-between mr-4">
            <CopyButton textToCopy={textToCopy} />

            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              {number}. {title}
            </h3>
          </div>

          <p className="mb-4 text-gray-600">{description}</p>
          {!expanded && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 ">
                <span className="text-sm font-medium text-gray-500">
                  {source}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {category}
                </span>
              </div>

              {/* // Render "Show more" when not expanded */}
              <span
                className="text-gray-600 hover:text-blue-600 cursor-pointer underline"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent onClick from being triggered on the parent div
                  onClick();
                }}
              >
                Show more
              </span>
            </div>
          )}

          {/* handle expanded */}
          {expanded && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Suggested solutions
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {solutionItems.map((solution: string, index: number) => (
                    <li>{solution}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-500">
                    {source}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {category}
                  </span>
                </div>
                <span
                  className="text-gray-600 hover:text-blue-600 cursor-pointer underline"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent onClick from being triggered on the parent div
                    onClick();
                  }}
                >
                  Show less
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProblemItem;
