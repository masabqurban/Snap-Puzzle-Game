import React from 'react';
import { PuzzleIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <PuzzleIcon className="h-8 w-8 mr-3" />
        <h1 className="text-2xl font-bold">Puzzle Picture Game</h1>
      </div>
    </header>
  );
};

export default Header;