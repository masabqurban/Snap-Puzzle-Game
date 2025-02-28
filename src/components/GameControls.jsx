import React from 'react';
import { PlayIcon, RefreshCwIcon, SaveIcon, LoaderIcon as LoadIcon, ClockIcon, MoveIcon, PercentIcon, HomeIcon } from 'lucide-react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const GameControls = ({ 
  isPlaying, 
  startGame, 
  resetGame, 
  saveGame, 
  loadGame, 
  hasSavedGame, 
  selectedImage, 
  time, 
  moves,
  progressPercentage
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Game Controls</h2>
      
      {isPlaying ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <ClockIcon className="h-4 w-4 mr-1 text-indigo-600" />
                <span className="text-xs text-gray-500">Time</span>
              </div>
              <p className="font-mono font-medium">{formatTime(time)}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <MoveIcon className="h-4 w-4 mr-1 text-indigo-600" />
                <span className="text-xs text-gray-500">Moves</span>
              </div>
              <p className="font-mono font-medium">{moves}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <PercentIcon className="h-4 w-4 mr-1 text-indigo-600" />
                <span className="text-xs text-gray-500">Progress</span>
              </div>
              <p className="font-mono font-medium">{progressPercentage}%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              onClick={resetGame}
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Reset
            </button>
            
            <button
              className="flex items-center justify-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
              onClick={saveGame}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            className={`w-full flex items-center justify-center px-4 py-3 rounded-md transition-colors ${
              selectedImage
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={startGame}
            disabled={!selectedImage}
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Start Game
          </button>
          
          {hasSavedGame && (
            <button
              className="w-full flex items-center justify-center px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
              onClick={loadGame}
            >
              <LoadIcon className="h-5 w-5 mr-2" />
              Load Saved Game
            </button>
          )}
          
          <div className="text-sm text-gray-500 italic text-center mt-2">
            {!selectedImage && "Please select an image to start the game"}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;