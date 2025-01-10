import React from 'react';
import { Recipe } from '../types/types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Recipe Image */}
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          {/* Recipe Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Cooking Time</h3>
              <p>{recipe.readyInMinutes} minutes</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Difficulty</h3>
              <p className="capitalize">{recipe.difficulty || 'Not specified'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Servings</h3>
              <p>{recipe.servings} servings</p>
            </div>
          </div>

          {/* Nutrition Information */}
          {recipe.nutrition && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {recipe.nutrition.calories && (
                  <div className="bg-emerald-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-emerald-700">{Math.round(recipe.nutrition.calories)}</div>
                    <div className="text-sm text-emerald-600">Calories</div>
                  </div>
                )}
                {recipe.nutrition.protein && (
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-700">{Math.round(recipe.nutrition.protein)}g</div>
                    <div className="text-sm text-blue-600">Protein</div>
                  </div>
                )}
                {recipe.nutrition.carbs && (
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-orange-700">{Math.round(recipe.nutrition.carbs)}g</div>
                    <div className="text-sm text-orange-600">Carbs</div>
                  </div>
                )}
                {recipe.nutrition.fat && (
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-yellow-700">{Math.round(recipe.nutrition.fat)}g</div>
                    <div className="text-sm text-yellow-600">Fat</div>
                  </div>
                )}
                {recipe.nutrition.fiber && (
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-purple-700">{Math.round(recipe.nutrition.fiber)}g</div>
                    <div className="text-sm text-purple-600">Fiber</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center space-x-3">
                    {ingredient.image && (
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium capitalize">{ingredient.name}</div>
                      <div className="text-sm text-gray-600">
                        {ingredient.amount} {ingredient.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipe Summary */}
          {recipe.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">About this Recipe</h3>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
