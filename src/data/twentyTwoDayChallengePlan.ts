import { MealPlan, MealDetail, DayMeals } from '../types/mealPlans';
import { twentyTwoDayChallengeMeals } from './twentyTwoDayChallengeMeals';
import { findRecipe } from '../utils/recipeUtils';

// Helper function to parse meal from text
const parseMeal = (mealText: string): MealDetail => {
  const name = mealText.replace(/\n/g, ' ').trim();
  const recipeContent = findRecipe({ name, recipe: '', description: name });
  return {
    name,
    recipe: recipeContent || '',
    description: name
  };
};

// Helper function to parse a day's meals
const parseDayMeals = (day: { 
  breakfast: string; 
  lunch: string; 
  dinner: string | { meal: string; dessert: string; type: string; }
}): DayMeals => {
  return {
    breakfast: parseMeal(day.breakfast),
    lunch: parseMeal(day.lunch),
    dinner: typeof day.dinner === 'string' 
      ? parseMeal(day.dinner)
      : {
          name: `${day.dinner.type}: ${day.dinner.meal}`,
          recipe: findRecipe({ 
            name: day.dinner.meal, 
            recipe: '', 
            description: `${day.dinner.meal} with dessert: ${day.dinner.dessert}` 
          }) || '',
          description: `${day.dinner.meal} with dessert: ${day.dinner.dessert}`
        }
  };
};

// Generate all 22 days of meals
const generateTwentyTwoDayMeals = (): DayMeals[] => {
  const allMeals: DayMeals[] = [];
  
  // Process each week
  ['week1', 'week2', 'week3'].forEach(weekKey => {
    const weekData = twentyTwoDayChallengeMeals[weekKey as keyof typeof twentyTwoDayChallengeMeals];
    
    // Process each day in the week
    Object.values(weekData).forEach(dayMeals => {
      allMeals.push(parseDayMeals(dayMeals));
    });
  });
  
  return allMeals;
};

export const twentyTwoDayChallengePlan: MealPlan = {
  id: '22-day-challenge',
  name: '22-Day Challenge Plan',
  description: 'An intensive 22-day program designed to kickstart your healthy eating habits with dedicated carb feast days',
  duration: 22,
  type: 'challenge',
  meals: generateTwentyTwoDayMeals()
};
