import React, { useEffect, useState } from 'react';
import { MealPlan } from '../types/mealPlans';
import { findRecipe } from '../utils/recipeUtils';

interface ShoppingListProps {
  mealPlan: MealPlan;
}

const parseIngredients = (recipe: string): string[] => {
  const sections = recipe.split('\n\n');
  const ingredients: string[] = [];
  
  let inIngredientsSection = false;
  for (const section of sections) {
    if (section.toLowerCase().includes('ingredients')) {
      inIngredientsSection = true;
      continue;
    }
    if (section.toLowerCase().includes('instructions')) {
      inIngredientsSection = false;
      continue;
    }
    
    if (inIngredientsSection) {
      ingredients.push(...section.split('\n')
        .filter(line => line.trim().startsWith('•'))
        .map(line => line.trim().substring(2)));
    }
  }
  
  return ingredients;
};

export const ShoppingList: React.FC<ShoppingListProps> = ({ mealPlan }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Get the meals for the selected week (7 days)
    const startIndex = (selectedWeek - 1) * 7;
    const weekMeals = mealPlan.meals.slice(startIndex, startIndex + 7);
    
    const weekIngredients: string[] = [];
    
    // Collect ingredients from all meals in the week
    weekMeals.forEach(day => {
      // Get breakfast ingredients
      const breakfastRecipe = findRecipe(day.breakfast);
      if (breakfastRecipe) {
        weekIngredients.push(...parseIngredients(breakfastRecipe));
      }
      
      // Get lunch ingredients
      const lunchRecipe = findRecipe(day.lunch);
      if (lunchRecipe) {
        weekIngredients.push(...parseIngredients(lunchRecipe));
      }
      
      // Get dinner ingredients
      const dinnerRecipe = findRecipe(day.dinner);
      if (dinnerRecipe) {
        weekIngredients.push(...parseIngredients(dinnerRecipe));
      }
    });

    // Remove duplicates and sort
    const uniqueIngredients = Array.from(new Set(weekIngredients)).sort();
    setIngredients(uniqueIngredients);
  }, [mealPlan, selectedWeek]);

  const handleCheckItem = (ingredient: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  const totalWeeks = Math.ceil(mealPlan.meals.length / 7);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Shopping List</h2>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
            <option key={week} value={week}>
              Week {week}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checkedItems[ingredient] || false}
                onChange={() => handleCheckItem(ingredient)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`${checkedItems[ingredient] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {ingredient}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
