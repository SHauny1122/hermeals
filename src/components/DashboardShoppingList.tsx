import React, { useState, useEffect } from 'react';
import { MealPlan, DayMeals } from '../types/mealPlans';
import { findRecipe } from '../utils/recipeUtils';

interface DashboardShoppingListProps {
  mealPlan: MealPlan;
}

interface ParsedIngredient {
  item: string;
  category: string;
  quantity?: number;
  unit?: string;
}

const parseIngredients = (recipe: string): ParsedIngredient[] => {
  const ingredients: ParsedIngredient[] = [];
  const lines = recipe.split('\n');
  let currentCategory = 'Other';

  lines.forEach(line => {
    line = line.trim();
    
    // Skip empty lines
    if (!line) return;

    // Check if this is a category header
    if (line.toLowerCase().includes('ingredients')) {
      currentCategory = 'Ingredients';
      return;
    }

    // If line starts with a bullet point or dash, it's probably an ingredient
    if (line.startsWith('•') || line.startsWith('-')) {
      const ingredient = line.substring(1).trim();
      
      // Parse quantity and unit
      let quantity: number | undefined;
      let unit: string | undefined;
      let itemName = ingredient;

      // Common units to look for
      const units = ['scoop', 'scoops', 'cup', 'cups', 'tbsp', 'tsp', 'oz', 'g', 'gram', 'grams', 'ml', 'piece', 'pieces'];
      const unitPattern = new RegExp(`^(\\d+(?:\\.\\d+)?|½|¼|¾)\\s*(${units.join('|')})\\s+of\\s+(.+)$|^(\\d+(?:\\.\\d+)?|½|¼|¾)\\s*(${units.join('|')})\\s+(.+)$`);
      
      const match = ingredient.match(unitPattern);
      if (match) {
        // Convert fractions to decimals
        const fractionMap: { [key: string]: number } = { '½': 0.5, '¼': 0.25, '¾': 0.75 };
        const rawQuantity = match[1] || match[4];
        quantity = fractionMap[rawQuantity] || parseFloat(rawQuantity);
        unit = match[2] || match[5];
        itemName = (match[3] || match[6]).trim();
      }
      
      // Categorize ingredients
      let category = currentCategory;
      const lowerItemName = itemName.toLowerCase();
      if (lowerItemName.includes('vegetable') || 
          lowerItemName.includes('lettuce') || 
          lowerItemName.includes('spinach')) {
        category = 'Vegetables';
      } else if (lowerItemName.includes('chicken') || 
                 lowerItemName.includes('beef') || 
                 lowerItemName.includes('fish')) {
        category = 'Meat & Fish';
      } else if (lowerItemName.includes('milk') || 
                 lowerItemName.includes('yogurt') || 
                 lowerItemName.includes('cheese')) {
        category = 'Dairy';
      } else if (lowerItemName.includes('protein') ||
                 lowerItemName.includes('powder')) {
        category = 'Supplements';
      }

      ingredients.push({
        item: itemName,
        category,
        quantity,
        unit
      });
    }
  });

  return ingredients;
};

export const DashboardShoppingList: React.FC<DashboardShoppingListProps> = ({ mealPlan }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [weeklyIngredients, setWeeklyIngredients] = useState<{
    [category: string]: {
      item: string;
      quantity?: number;
      unit?: string;
    }[];
  }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const generateWeeklyList = () => {
      const startIndex = (selectedWeek - 1) * 7;
      const endIndex = Math.min(startIndex + 7, mealPlan.meals.length);
      const weekMeals = mealPlan.meals.slice(startIndex, endIndex);
      
      const ingredientsMap = new Map<string, ParsedIngredient>();
      
      weekMeals.forEach((day: DayMeals) => {
        // Process each meal type
        ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
          const recipe = findRecipe(day[mealType as keyof DayMeals]);
          if (recipe) {
            parseIngredients(recipe).forEach((ingredient) => {
              const key = `${ingredient.item}-${ingredient.unit || ''}`;
              if (ingredientsMap.has(key)) {
                const existing = ingredientsMap.get(key)!;
                if (existing.quantity && ingredient.quantity) {
                  existing.quantity += ingredient.quantity;
                }
              } else {
                ingredientsMap.set(key, { ...ingredient });
              }
            });
          }
        });
      });

      // Group by category
      const grouped: { [category: string]: Array<{
        item: string;
        quantity?: number;
        unit?: string;
      }> } = {};

      ingredientsMap.forEach((ingredient) => {
        if (!grouped[ingredient.category]) {
          grouped[ingredient.category] = [];
        }
        grouped[ingredient.category].push({
          item: ingredient.item,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        });
      });

      setWeeklyIngredients(grouped);
    };

    generateWeeklyList();
  }, [selectedWeek, mealPlan]);

  const handleCheckItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const totalWeeks = Math.ceil(mealPlan.meals.length / 7);

  const formatQuantity = (quantity?: number, unit?: string) => {
    if (!quantity) return '';
    const roundedQuantity = Math.round(quantity * 100) / 100; // Round to 2 decimal places
    return ` - ${roundedQuantity}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping List</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedWeek === week
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Week {week}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(weeklyIngredients).map(([category, items]) => (
          <div key={category} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">{category}</h3>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[item.item] || false}
                    onChange={() => handleCheckItem(item.item)}
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className={`${checkedItems[item.item] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {item.item}{formatQuantity(item.quantity, item.unit)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
