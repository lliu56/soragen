import React, { useState } from "react";
import ProblemItem from "./problem-item";

interface ProblemProps {
  id: number;
  title: string;
  description: string;
  solutions: string; // This is a JSON string from the database
  source: string;
  created_at: string;
  category: string;
}

interface ProblemListProps {
  problems: ProblemProps[];
}

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (!Array.isArray(problems)) return <p>No problems to display.</p>;
  if (problems.length === 0) return <p>No problems found.</p>;

  // toggle fxn taht expnd or collapse the item
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col space-y-4">
      {" "}
      {/* Added Tailwind classes for spacing */}
      {problems.map((problem, index) => (
        <ProblemItem
          number={index + 1}
          key={problem.id}
          id={problem.id}
          title={problem.title}
          description={problem.description}
          solutions={problem.solutions}
          source={problem.source}
          created_at={problem.created_at}
          category={problem.category}
          expanded={expandedId === problem.id} // Pass whether this item is expanded
          onClick={() => toggleExpand(problem.id)} // Pass the function to handle click
        />
      ))}
    </div>
  );
};

export default ProblemList;
