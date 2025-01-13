import React from 'react';
import { PreviewRecipe } from '../types/preview';

interface RecipePreviewCardProps {
  recipe: PreviewRecipe;
}

export const RecipePreviewCard: React.FC<RecipePreviewCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>🕒 Prep: {recipe.prepTime}</span>
          <span>👩‍🍳 Cook: {recipe.cookTime}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>🍽️ {recipe.servings} servings</span>
          <span>🔥 {recipe.calories} cal</span>
        </div>
      </div>
    </div>
  );
};
