import React, { useState, useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';

const GameBoard = ({ pieces, difficulty, onMove, correctPieces, loading }) => {
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [boardSize, setBoardSize] = useState(300);
  
  // Responsive board size
  useEffect(() => {
    const updateBoardSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBoardSize(Math.min(width - 40, 300));
      } else if (width < 1024) {
        setBoardSize(400);
      } else {
        setBoardSize(500);
      }
    };
    
    updateBoardSize();
    window.addEventListener('resize', updateBoardSize);
    return () => window.removeEventListener('resize', updateBoardSize);
  }, []);
  
  const pieceSize = boardSize / difficulty;
  
  const handleDragStart = (e, index) => {
    setDraggedPiece(index);
    // Make the drag image transparent
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedPiece !== null && draggedPiece !== index) {
      onMove(draggedPiece, index);
    }
    setDraggedPiece(null);
  };
  
  if (loading) {
    return (
      <div 
        className="bg-white rounded-lg shadow-md flex items-center justify-center"
        style={{ width: boardSize, height: boardSize }}
      >
        <div className="text-center">
          <Loader2Icon className="h-10 w-10 mx-auto text-indigo-500 animate-spin" />
          <p className="mt-4 text-gray-600">Preparing puzzle...</p>
        </div>
      </div>
    );
  }
  
  if (pieces.length === 0) {
    return (
      <div 
        className="bg-white rounded-lg shadow-md flex items-center justify-center"
        style={{ width: boardSize, height: boardSize }}
      >
        <div className="text-center p-6">
          <p className="text-lg text-gray-600 mb-2">No puzzle loaded</p>
          <p className="text-sm text-gray-500">Select an image and difficulty, then press Start Game</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-2 relative"
      style={{ width: boardSize + 8, height: boardSize + 8 }}
    >
      <div 
        className="grid gap-0.5 bg-gray-200"
        style={{ 
          gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
          width: boardSize,
          height: boardSize
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`relative transition-all duration-150 ${
              draggedPiece === index ? 'opacity-50' : 'opacity-100'
            } ${
              correctPieces.has(index) ? 'ring-2 ring-green-500' : ''
            }`}
            style={{
              width: pieceSize,
              height: pieceSize,
              cursor: 'grab'
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img 
              src={piece.url} 
              alt={`Puzzle piece ${index}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;