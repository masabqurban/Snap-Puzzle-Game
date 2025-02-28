import React from 'react';
import { SlidersIcon } from 'lucide-react';

const DifficultySelector = ({ difficulty, setDifficulty, disabled }) => {
  const difficulties = [
    { value: 3, label: 'Easy (3×3)', pieces: 9 },
    { value: 4, label: 'Medium (4×4)', pieces: 16 },
    { value: 5, label: 'Hard (5×5)', pieces: 25 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <SlidersIcon className="h-5 w-5 mr-2" />
        Difficulty
      </h2>
      
      <div className="space-y-2">
        {difficulties.map((option) => (
          <button
            key={option.value}
            className={`w-full py-2 px-4 rounded-md transition-colors flex justify-between items-center ${
              difficulty === option.value
                ? 'bg-indigo-100 text-indigo-700 font-medium'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !disabled && setDifficulty(option.value)}
            disabled={disabled}
          >
            <span>{option.label}</span>
            <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {option.pieces} pieces
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;