import React, { useState } from 'react';
import CameraInput from './components/CameraInput';
import RecipeModal from './components/RecipeModal';
import { DetectedIngredient, Recipe } from './types/types';
import { searchRecipes } from './services/spoonacularApi';

const RecipeFinder: React.FC = () => {
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filters, setFilters] = useState({
    difficulty: '',
    maxTime: 60,
    cuisine: '',
  });

  const handleIngredientsDetected = (ingredients: DetectedIngredient[]) => {
    setDetectedIngredients(ingredients);
    // Auto-select ingredients with high confidence
    const highConfidenceIngredients = new Set(
      ingredients
        .filter(ing => ing.confidence > 0.7)
        .map(ing => ing.name)
    );
    setSelectedIngredients(highConfidenceIngredients);
  };

  const toggleIngredient = (ingredient: string) => {
    const newSelected = new Set(selectedIngredients);
    if (newSelected.has(ingredient)) {
      newSelected.delete(ingredient);
    } else {
      newSelected.add(ingredient);
    }
    setSelectedIngredients(newSelected);
  };

  const findRecipes = async () => {
    if (selectedIngredients.size === 0) {
      console.log('No ingredients selected');
      return;
    }
    
    setIsSearching(true);
    try {
      console.log('Searching for recipes with ingredients:', Array.from(selectedIngredients));
      const results = await searchRecipes({
        ingredients: Array.from(selectedIngredients),
        number: 12,
        sort: 'max-used-ingredients',
        maxReadyTime: filters.maxTime,
        difficulty: filters.difficulty || undefined,
        cuisine: filters.cuisine || undefined
      });
      
      console.log('Recipe results:', results);
      if (results && results.length > 0) {
        setRecipes(results);
      } else {
        console.log('No recipes found');
        setRecipes([{
          id: 'no-results',
          title: 'No recipes found',
          description: 'Try selecting different ingredients or combinations',
          image: '',
          usedIngredientCount: 0,
          missedIngredientCount: 0
        }]);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([{
        id: 'error',
        title: 'Error finding recipes',
        description: 'Please try again later',
        image: '',
        usedIngredientCount: 0,
        missedIngredientCount: 0
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Recipe Finder</h1>
        <p className="text-gray-600 mb-4">
          Take a photo of your ingredients and we'll suggest recipes you can make!
        </p>
        <CameraInput onIngredientsDetected={handleIngredientsDetected} />
      </div>

      {detectedIngredients.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detected Ingredients</h2>
          <div className="space-y-4">
            {detectedIngredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.has(ingredient.name)}
                        onChange={() => toggleIngredient(ingredient.name)}
                        className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="font-medium capitalize">{ingredient.name}</span>
                    </label>
                    {ingredient.specificLabels && ingredient.specificLabels.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ingredient.specificLabels.map((label, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round(ingredient.confidence * 100)}% confident
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recipe Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Cooking Time (minutes)
              </label>
              <select
                value={filters.maxTime}
                onChange={(e) => setFilters({ ...filters, maxTime: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Type
              </label>
              <select
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">Any Cuisine</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="asian">Asian</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="american">American</option>
                <option value="indian">Indian</option>
              </select>
            </div>
          </div>

          <button
            onClick={findRecipes}
            disabled={selectedIngredients.size === 0 || isSearching}
            className="mt-6 w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-emerald-300 text-lg font-medium"
          >
            {isSearching ? 'Searching...' : 'Find Recipes'}
          </button>
        </div>
      )}

      {recipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recipe Suggestions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                  {recipe.description ? (
                    <p className="text-sm text-gray-600">{recipe.description}</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Uses {recipe.usedIngredientCount} of your ingredients
                        {recipe.missedIngredientCount !== undefined && recipe.missedIngredientCount > 0 && 
                          ` (needs ${recipe.missedIngredientCount} more)`}
                      </p>
                      {recipe.readyInMinutes && (
                        <p className="text-sm text-gray-600">
                          Ready in {recipe.readyInMinutes} minutes
                        </p>
                      )}
                      {recipe.servings && (
                        <p className="text-sm text-gray-600">
                          Serves {recipe.servings}
                        </p>
                      )}
                      {recipe.difficulty && (
                        <p className="text-sm text-gray-600 capitalize">
                          Difficulty: {recipe.difficulty}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default RecipeFinder;
