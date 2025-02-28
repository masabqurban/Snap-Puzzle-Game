import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import ImageSelector from './components/ImageSelector';
import DifficultySelector from './components/DifficultySelector';
import GameControls from './components/GameControls';
import VictoryModal from './components/VictoryModal';
import { splitImage, shufflePieces } from './utils/imageUtils';
import { saveGame, loadGame, clearSavedGame } from './utils/storageUtils';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [difficulty, setDifficulty] = useState(3); // Default: 3x3
  const [pieces, setPieces] = useState([]);
  const [correctPieces, setCorrectPieces] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  // Check for saved game on mount
  useEffect(() => {
    const savedGame = loadGame();
    if (savedGame) {
      setHasSavedGame(true);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Victory check
  useEffect(() => {
    if (pieces.length > 0 && correctPieces.size === pieces.length && isPlaying) {
      setIsPlaying(false);
      setShowVictory(true);
      clearSavedGame();
      setHasSavedGame(false);
    }
  }, [correctPieces, pieces, isPlaying]);

  const startGame = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    setIsPlaying(false);
    setTime(0);
    setMoves(0);
    setCorrectPieces(new Set());
    
    try {
      // Split the image into pieces based on difficulty
      const splitPieces = await splitImage(selectedImage, difficulty);
      
      // Shuffle the pieces
      const shuffledPieces = shufflePieces(splitPieces);
      
      setPieces(shuffledPieces);
      setIsPlaying(true);
      setLoading(false);
    } catch (error) {
      console.error("Error starting game:", error);
      setLoading(false);
    }
  };

  const resetGame = () => {
    if (pieces.length > 0) {
      setTime(0);
      setMoves(0);
      setCorrectPieces(new Set());
      
      // Reshuffle the pieces
      const shuffledPieces = shufflePieces([...pieces]);
      setPieces(shuffledPieces);
      setIsPlaying(true);
    }
  };

  const saveCurrentGame = () => {
    if (isPlaying && pieces.length > 0) {
      saveGame({
        selectedImage,
        difficulty,
        pieces,
        correctPieces: Array.from(correctPieces),
        time,
        moves
      });
      setHasSavedGame(true);
    }
  };

  const loadSavedGame = () => {
    const savedGame = loadGame();
    if (savedGame) {
      setSelectedImage(savedGame.selectedImage);
      setDifficulty(savedGame.difficulty);
      setPieces(savedGame.pieces);
      setCorrectPieces(new Set(savedGame.correctPieces));
      setTime(savedGame.time);
      setMoves(savedGame.moves);
      setIsPlaying(true);
      setHasSavedGame(false);
    }
  };

  const handleMove = (fromIndex, toIndex) => {
    if (!isPlaying) return;
    
    // Update moves counter
    setMoves(prevMoves => prevMoves + 1);
    
    // Swap pieces
    const newPieces = [...pieces];
    const temp = newPieces[fromIndex];
    newPieces[fromIndex] = newPieces[toIndex];
    newPieces[toIndex] = temp;
    
    setPieces(newPieces);
    
    // Check if pieces are in correct positions
    const newCorrectPieces = new Set();
    newPieces.forEach((piece, index) => {
      if (piece.correctIndex === index) {
        newCorrectPieces.add(index);
      }
    });
    
    setCorrectPieces(newCorrectPieces);
  };

  const progressPercentage = pieces.length > 0 
    ? Math.round((correctPieces.size / pieces.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-6">
          <ImageSelector 
            selectedImage={selectedImage} 
            setSelectedImage={setSelectedImage} 
            disabled={isPlaying}
          />
          
          <DifficultySelector 
            difficulty={difficulty} 
            setDifficulty={setDifficulty} 
            disabled={isPlaying}
          />
          
          <GameControls 
            isPlaying={isPlaying}
            startGame={startGame}
            resetGame={resetGame}
            saveGame={saveCurrentGame}
            loadGame={loadSavedGame}
            hasSavedGame={hasSavedGame}
            selectedImage={selectedImage}
            time={time}
            moves={moves}
            progressPercentage={progressPercentage}
          />
        </div>
        
        <div className="lg:w-2/3 flex justify-center">
          <GameBoard 
            pieces={pieces} 
            difficulty={difficulty} 
            onMove={handleMove}
            correctPieces={correctPieces}
            loading={loading}
          />
        </div>
      </main>
      
      {showVictory && (
        <VictoryModal 
          time={time} 
          moves={moves} 
          difficulty={difficulty}
          onClose={() => setShowVictory(false)}
          onPlayAgain={() => {
            setShowVictory(false);
            resetGame();
          }}
        />
      )}
    </div>
  );
}

export default App;