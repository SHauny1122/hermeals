import { Recipe, RecipeSearchParams } from '../types/types';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Helper function to determine recipe difficulty based on readyInMinutes and complexity
const determineRecipeDifficulty = (recipe: any): 'easy' | 'medium' | 'hard' => {
  const { readyInMinutes = 0, extendedIngredients = [], analyzedInstructions = [] } = recipe;
  const steps = analyzedInstructions[0]?.steps || [];
  
  // Calculate complexity score
  let complexityScore = 0;
  complexityScore += extendedIngredients.length * 0.5; // More ingredients = more complex
  complexityScore += steps.length * 0.5; // More steps = more complex
  complexityScore += (readyInMinutes / 15); // Longer time = more complex
  
  if (complexityScore < 10) return 'easy';
  if (complexityScore < 20) return 'medium';
  return 'hard';
};

export const searchRecipes = async ({
  ingredients,
  cuisine,
  mealType,
  maxReadyTime = 60,
  difficulty,
  number = 10,
  sort = 'max-used-ingredients',
  sortDirection = 'desc'
}: RecipeSearchParams): Promise<Recipe[]> => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query: ingredients.join(','),
      number: number.toString(),
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      addRecipeNutrition: 'true',
      instructionsRequired: 'true',
      sort: sort,
      sortDirection: sortDirection,
    });

    if (cuisine) params.append('cuisine', cuisine);
    if (mealType) params.append('type', mealType);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime.toString());

    const response = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    
    // Process and enhance the results
    const enhancedResults = data.results.map((recipe: any) => {
      const recipeDifficulty = determineRecipeDifficulty(recipe);
      
      // Skip recipes that don't match the requested difficulty
      if (difficulty && recipeDifficulty !== difficulty) {
        return null;
      }

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
        likes: recipe.likes,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary,
        difficulty: recipeDifficulty,
        cuisineType: recipe.cuisines?.[0],
        mealType: recipe.dishTypes,
        nutrition: {
          calories: recipe.nutrition?.nutrients?.find((n: any) => n.name === 'Calories')?.amount,
          protein: recipe.nutrition?.nutrients?.find((n: any) => n.name === 'Protein')?.amount,
          carbs: recipe.nutrition?.nutrients?.find((n: any) => n.name === 'Carbohydrates')?.amount,
          fat: recipe.nutrition?.nutrients?.find((n: any) => n.name === 'Fat')?.amount,
          fiber: recipe.nutrition?.nutrients?.find((n: any) => n.name === 'Fiber')?.amount,
        },
        ingredients: recipe.extendedIngredients?.map((ingredient: any) => ({
          id: ingredient.id,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
          original: ingredient.original,
        })),
      };
    }).filter(Boolean); // Remove null entries

    // Sort by relevance (how many of our ingredients are used)
    const sortedResults = enhancedResults.sort((a: Recipe, b: Recipe) => 
      (b.usedIngredientCount || 0) - (a.usedIngredientCount || 0)
    );

    return sortedResults;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Get detailed recipe information including instructions
export const getRecipeDetails = async (recipeId: number) => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY
    });

    const url = `${BASE_URL}/${recipeId}/information?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
