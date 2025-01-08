import { MealPlan, DayMeals } from '../types/mealPlans';
import { breakfastRecipes } from './twentyTwoDayRecipes/breakfastRecipes';
import { lunchRecipes } from './twentyTwoDayRecipes/lunchRecipes';
import { dinnerRecipes } from './twentyTwoDayRecipes/dinnerRecipes';

// Convert Recipe to MealDetail
const convertToMealDetail = (recipe: any) => {
  if (!recipe) {
    throw new Error('Recipe not found');
  }
  return {
    name: recipe.name,
    description: recipe.description || '',
    recipe: recipe.instructions ? recipe.instructions.join('\n') : '',
    ingredients: recipe.ingredients ? recipe.ingredients.map((ingredient: string) => ({
      name: ingredient,
      amount: '',
    })) : [],
    instructions: recipe.instructions || [],
    prepTime: recipe.prepTime || '',
    cookTime: recipe.cookTime || '',
    servings: recipe.servings || 1
  };
};

const twentyTwoDayMeals: DayMeals[] = [
  // Week 1
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Grilled Chicken Caesar Salad"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Turkey and Avocado Wrap"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Grilled Chicken Caesar Salad"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  // Week 2
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Turkey and Avocado Wrap"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Grilled Chicken Caesar Salad"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Turkey and Avocado Wrap"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  // Week 3
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Grilled Chicken Caesar Salad"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Turkey and Avocado Wrap"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Grilled Chicken Caesar Salad"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Turkey and Avocado Wrap"]),
    dinner: convertToMealDetail(dinnerRecipes["Baked Salmon with Asparagus"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Apple Strudel Shake"]),
    lunch: convertToMealDetail(lunchRecipes["Buffalo Chicken Fingers"]),
    dinner: convertToMealDetail(dinnerRecipes["Herb-Roasted Chicken"])
  },
  {
    breakfast: convertToMealDetail(breakfastRecipes["Breakfast Stack"]),
    lunch: convertToMealDetail(lunchRecipes["Chicken Salad Pepper Stuffers"]),
    dinner: convertToMealDetail(dinnerRecipes["Chicken Marsala"])
  }
];

const twentyTwoDayShoppingLists = [
  // Week 1
  {
    week: 1,
    items: [
      {
        category: "Proteins",
        items: [
          "2 lbs chicken breast",
          "1 lb salmon fillet",
          "1 lb turkey breast"
        ]
      },
      {
        category: "Produce",
        items: [
          "2 bunches kale",
          "3 avocados",
          "1 lb mixed berries"
        ]
      },
      {
        category: "Pantry Items",
        items: [
          "olive oil",
          "coconut oil",
          "apple cider vinegar"
        ]
      }
    ]
  },
  // Week 2
  {
    week: 2,
    items: [
      {
        category: "Proteins",
        items: [
          "2 lbs chicken breast",
          "1 lb cod fillet",
          "1 lb shrimp"
        ]
      },
      {
        category: "Produce",
        items: [
          "2 bunches spinach",
          "4 bell peppers",
          "2 lb broccoli"
        ]
      },
      {
        category: "Pantry Items",
        items: [
          "quinoa",
          "brown rice",
          "tamari sauce"
        ]
      }
    ]
  },
  // Week 3
  {
    week: 3,
    items: [
      {
        category: "Proteins",
        items: [
          "2 lbs chicken breast",
          "1 lb cod fillet",
          "1 lb shrimp"
        ]
      },
      {
        category: "Produce",
        items: [
          "2 bunches spinach",
          "4 bell peppers",
          "2 lb broccoli"
        ]
      },
      {
        category: "Pantry Items",
        items: [
          "quinoa",
          "brown rice",
          "tamari sauce"
        ]
      }
    ]
  }
];

export const twentyTwoDayPlan: { meals: DayMeals[] } = {
  meals: twentyTwoDayMeals
};
