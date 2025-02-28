import React from 'react';
import { ImageIcon } from 'lucide-react';

const DEFAULT_IMAGES = [
  {
    id: 'nature1',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Beautiful mountain landscape with a lake',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop'
  },
  {
    id: 'animal1',
    url: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd',
    alt: 'Fox in a forest',
    thumbnail: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=200&h=200&fit=crop'
  },
  {
    id: 'city1',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    alt: 'City skyline at night',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop'
  },
  {
    id: 'food1',
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
    alt: 'Colorful food spread',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop'
  }
];

const ImageSelector = ({ selectedImage, setSelectedImage, disabled }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage({
          id: 'custom',
          url: event.target.result,
          alt: 'Custom uploaded image',
          thumbnail: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ImageIcon className="h-5 w-5 mr-2" />
        Select an Image
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {DEFAULT_IMAGES.map((image) => (
          <button
            key={image.id}
            className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
              selectedImage?.id === image.id 
                ? 'border-indigo-500 ring-2 ring-indigo-300' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => setSelectedImage(image)}
            disabled={disabled}
          >
            <img 
              src={image.thumbnail} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto">
          <label 
            className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
              ${disabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
              }`}
          >
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageUpload}
              disabled={disabled}
            />
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Image
          </label>
        </div>
        
        {selectedImage && (
          <div className="mt-3 sm:mt-0">
            <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-200 shadow-sm">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;