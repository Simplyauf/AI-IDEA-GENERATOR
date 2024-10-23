import React from "react";

interface IdeaListProps {
  ideas: string[];
  setIdeas: React.Dispatch<React.SetStateAction<string[]>>;
}

function IdeaList({ ideas, setIdeas }: IdeaListProps) {
  const removeIdea = (index: number) => {
    setIdeas((prevIdeas) => prevIdeas.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white overflow-y-auto h-[600px] rounded-lg shadow-md overflow-hidden">
      <h2 className="p-4 text-xl font-semibold border-b bg-gray-50">
        Saved Ideas
      </h2>
      <div className="p-4">
        {ideas.length === 0 ? (
          <p className="italic text-gray-500">No ideas saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {ideas.map((idea, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 rounded bg-gray-50"
              >
                <span className="flex-grow pr-4">{idea}</span>
                <button
                  onClick={() => removeIdea(index)}
                  className="text-red-500 transition-colors hover:text-red-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default IdeaList;
