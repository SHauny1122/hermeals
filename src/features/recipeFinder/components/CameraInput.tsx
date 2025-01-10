import React, { useRef, useState } from 'react';
import { DetectedIngredient } from '../types/types';
import { analyzeImage } from '../services/visionApi';

interface CameraInputProps {
  onIngredientsDetected: (ingredients: DetectedIngredient[]) => void;
}

const CameraInput: React.FC<CameraInputProps> = ({ onIngredientsDetected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    try {
      setIsProcessing(true);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Convert to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Process with Vision API
      const detectedIngredients = await analyzeImage(base64);
      onIngredientsDetected(detectedIngredients);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetInput = () => {
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="camera-input relative max-w-lg mx-auto">
      {error && (
        <div className="error-message text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {preview ? (
        <div className="preview-container relative bg-black rounded-lg overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full object-contain"
            style={{ maxHeight: '400px' }}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
            {isProcessing ? (
              <div className="w-full text-center py-3 bg-emerald-500 text-white rounded-lg">
                Processing Image...
              </div>
            ) : (
              <button
                onClick={resetInput}
                className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Take Another Photo
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors text-lg font-medium"
            disabled={isProcessing}
          >
            Take Photo
          </button>
          <p className="text-center text-sm text-gray-600">
            This will open your camera to take a photo of ingredients
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraInput;
