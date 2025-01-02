import { MealPlan, MealDetail, DayMeals } from '../types/mealPlans';

interface RecipeData {
  name: string;
  pageNumber: number;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
}

interface WeeklyPlan {
  week: number;
  days: {
    [key: string]: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
  };
}

export const parseRecipe = (recipeText: string): RecipeData => {
  const lines = recipeText.split('\n').map(line => line.trim());
  const recipe: RecipeData = {
    name: '',
    pageNumber: 0,
    ingredients: [],
    instructions: []
  };

  // Parse header info (servings, times)
  const headerMatch = lines[0].match(/Serves:\s*(\d+)\s*Prep Time:\s*(\d+)\s*min\.\s*Cook Time:\s*(\d+)\s*min\.\s*Total Time:\s*(\d+)/);
  if (headerMatch) {
    recipe.servings = headerMatch[1];
    recipe.prepTime = `${headerMatch[2]} minutes`;
    recipe.cookTime = `${headerMatch[3]} minutes`;
    recipe.totalTime = `${headerMatch[4]} minutes`;
  }

  let currentSection = '';
  for (const line of lines) {
    if (line.includes('Ingredients')) {
      currentSection = 'ingredients';
      continue;
    } else if (line.includes('Instructions')) {
      currentSection = 'instructions';
      continue;
    }

    if (line.startsWith('•')) {
      const ingredient = line.replace('•', '').trim();
      if (ingredient) {
        recipe.ingredients.push(ingredient);
      }
    } else if (currentSection === 'instructions' && line.trim()) {
      recipe.instructions.push(line);
    }
  }

  return recipe;
};

export const parseWeeklyPlan = (weekText: string): WeeklyPlan => {
  const lines = weekText.split('\n').map(line => line.trim());
  const weekPlan: WeeklyPlan = {
    week: 0,
    days: {}
  };

  // Find week number
  const weekMatch = lines[0].match(/Week (\d+)/);
  if (weekMatch) {
    weekPlan.week = parseInt(weekMatch[1]);
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let currentDay = '';

  for (const line of lines) {
    // Check if line contains a day
    for (const day of days) {
      if (line.startsWith(day)) {
        currentDay = day;
        if (!weekPlan.days[currentDay]) {
          weekPlan.days[currentDay] = {
            breakfast: '',
            lunch: '',
            dinner: ''
          };
        }
        break;
      }
    }

    // Extract meal and page number
    const mealMatch = line.match(/(.*?)\s*Pg\.\s*(\d+)/);
    if (mealMatch) {
      const [_, mealName, pageNum] = mealMatch;
      if (!weekPlan.days[currentDay].breakfast) {
        weekPlan.days[currentDay].breakfast = `${mealName.trim()} (${pageNum})`;
      } else if (!weekPlan.days[currentDay].lunch) {
        weekPlan.days[currentDay].lunch = `${mealName.trim()} (${pageNum})`;
      } else {
        weekPlan.days[currentDay].dinner = `${mealName.trim()} (${pageNum})`;
      }
    }
  }

  return weekPlan;
};

const createMealDetail = (recipe: RecipeData): MealDetail => {
  return {
    name: recipe.name,
    recipe: recipe.name
  };
};

export const parseMealPlan = (mealPlan: any): MealPlan => {
  const parsedMeals = mealPlan.meals.map((day: any) => {
    const dayMeals: DayMeals = {
      breakfast: createMealDetail(parseRecipe(day.breakfast)),
      lunch: createMealDetail(parseRecipe(day.lunch)),
      dinner: createMealDetail(parseRecipe(day.dinner))
    };
    return dayMeals;
  });

  return {
    id: mealPlan.id || '1',
    name: mealPlan.name || 'Untitled Meal Plan',
    description: mealPlan.description || '',
    duration: mealPlan.duration || 7,
    type: mealPlan.type || 'regular',
    meals: parsedMeals,
    shoppingLists: mealPlan.shoppingLists || []
  };
};

// Main function to create the full meal plan
export const createFullMealPlan = (
  weeklyPlans: string[],
  recipes: { [key: string]: string }
): MealPlan => {
  const mealPlan: MealPlan = {
    id: '',  // Will be set by Firebase
    name: '12-Week Weight Loss Plan',
    description: 'A comprehensive meal plan designed for healthy weight loss',
    duration: 12,
    type: 'regular',
    meals: [],
    shoppingLists: []
  };

  // Process each week
  weeklyPlans.forEach(weekText => {
    const weekPlan = parseWeeklyPlan(weekText);
    Object.values(weekPlan.days).forEach(day => {
      const dayMeals = {
        breakfast: createMealDetail(parseRecipe(recipes[day.breakfast])),
        lunch: createMealDetail(parseRecipe(recipes[day.lunch])),
        dinner: createMealDetail(parseRecipe(recipes[day.dinner]))
      };
      mealPlan.meals.push(dayMeals);
    });
  });

  return mealPlan;
};
