import React from 'react';
import { PuzzleIcon } from 'lucide-react';

const Header = ({ onRestart }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <PuzzleIcon className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">Snap Puzzle Game</h1>
        </div>
        <button
          onClick={onRestart}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors font-medium"
        >
          Main Menu
        </button>
      </div>
    </header>
  );
};

export default Header;