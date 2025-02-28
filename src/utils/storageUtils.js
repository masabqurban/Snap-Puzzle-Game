const STORAGE_KEY = 'puzzle_game_save';

/**
 * Saves the current game state to localStorage
 * @param {Object} gameState - The current game state
 */
export const saveGame = (gameState) => {
  try {
    // Convert Set to Array for storage
    const serializedState = JSON.stringify({
      ...gameState,
      correctPieces: Array.from(gameState.correctPieces)
    });
    localStorage.setItem(STORAGE_KEY, serializedState);
    return true;
  } catch (error) {
    console.error('Error saving game:', error);
    return false;
  }
};

/**
 * Loads a saved game from localStorage
 * @returns {Object|null} - The saved game state or null if no save exists
 */
export const loadGame = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return null;
    
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading saved game:', error);
    return null;
  }
};

/**
 * Clears the saved game from localStorage
 */
export const clearSavedGame = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing saved game:', error);
    return false;
  }
};