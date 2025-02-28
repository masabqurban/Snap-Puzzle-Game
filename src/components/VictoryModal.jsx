import React from 'react';
import { TrophyIcon, ShareIcon, ClockIcon, MoveIcon, XIcon } from 'lucide-react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const VictoryModal = ({ time, moves, difficulty, onClose, onPlayAgain }) => {
  const difficultyText = {
    3: 'Easy (3×3)',
    4: 'Medium (4×4)',
    5: 'Hard (5×5)'
  }[difficulty];
  
  const handleShare = () => {
    const text = `I solved a ${difficultyText} puzzle in ${formatTime(time)} with ${moves} moves! Can you beat my score?`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Puzzle Picture Game',
        text: text,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Score copied to clipboard!');
      }).catch(err => {
        console.error('Error copying to clipboard:', err);
      });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white relative">
          <button 
            className="absolute top-4 right-4 text-white hover:text-indigo-100"
            onClick={onClose}
          >
            <XIcon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <TrophyIcon className="h-12 w-12 text-yellow-300" />
          </div>
          
          <h2 className="text-2xl font-bold text-center">Congratulations!</h2>
          <p className="text-center text-indigo-100 mt-1">You solved the puzzle!</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-3 rounded-md text-center">
              <p className="text-xs text-indigo-600 mb-1">Difficulty</p>
              <p className="font-medium">{difficultyText}</p>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <ClockIcon className="h-3 w-3 mr-1 text-indigo-600" />
                <span className="text-xs text-indigo-600">Time</span>
              </div>
              <p className="font-mono font-medium">{formatTime(time)}</p>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-md text-center">
              <div className="flex items-center justify-center mb-1">
                <MoveIcon className="h-3 w-3 mr-1 text-indigo-600" />
                <span className="text-xs text-indigo-600">Moves</span>
              </div>
              <p className="font-mono font-medium">{moves}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={onPlayAgain}
            >
              Play Again
            </button>
            
            <button
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              onClick={handleShare}
            >
              <ShareIcon className="h-4 w-4 mr-2" />
              Share Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;