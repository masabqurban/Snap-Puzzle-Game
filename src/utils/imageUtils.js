/**
 * Splits an image into pieces based on the difficulty level
 * @param {Object} image - The image object with url
 * @param {number} difficulty - The difficulty level (3 for 3x3, 4 for 4x4, 5 for 5x5)
 * @returns {Promise<Array>} - Array of image pieces
 */
export const splitImage = (image, difficulty) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.url;
    
    img.onload = () => {
      const pieces = [];
      
      // Create canvas to process the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to maintain aspect ratio but fit within reasonable bounds
      const maxSize = 600;
      let width = img.width;
      let height = img.height;
      
      if (width > height && width > maxSize) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else if (height > width && height > maxSize) {
        width = (width / height) * maxSize;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);
      
      // Calculate piece dimensions
      const pieceWidth = width / difficulty;
      const pieceHeight = height / difficulty;
      
      // Split the image into pieces
      for (let y = 0; y < difficulty; y++) {
        for (let x = 0; x < difficulty; x++) {
          const pieceIndex = y * difficulty + x;
          
          // Create a new canvas for each piece
          const pieceCanvas = document.createElement('canvas');
          pieceCanvas.width = pieceWidth;
          pieceCanvas.height = pieceHeight;
          const pieceCtx = pieceCanvas.getContext('2d');
          
          // Draw the portion of the image for this piece
          pieceCtx.drawImage(
            canvas, 
            x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight,
            0, 0, pieceWidth, pieceHeight
          );
          
          // Convert to data URL
          const pieceUrl = pieceCanvas.toDataURL('image/jpeg');
          
          pieces.push({
            id: pieceIndex,
            correctIndex: pieceIndex,
            url: pieceUrl,
            x, 
            y
          });
        }
      }
      
      resolve(pieces);
    };
    
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

/**
 * Shuffles the pieces array while ensuring the puzzle is solvable
 * @param {Array} pieces - Array of image pieces
 * @returns {Array} - Shuffled array of pieces
 */
export const shufflePieces = (pieces) => {
  // Create a copy of the pieces array
  const shuffled = [...pieces];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Check if any piece is already in its correct position
  // If all pieces are in wrong positions, swap two pieces
  const allWrong = shuffled.every((piece, index) => piece.correctIndex !== index);
  
  if (allWrong && shuffled.length > 1) {
    // Swap the first two pieces
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  
  return shuffled;
};