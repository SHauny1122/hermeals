import { MealPlan, MealDetail, DayMeals } from '../types/mealPlans';
import { weeklyPlans } from './weeklyPlans';
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
const parseDayMeals = (day: { breakfast: string; lunch: string; dinner: string }): DayMeals => {
  return {
    breakfast: parseMeal(day.breakfast),
    lunch: parseMeal(day.lunch),
    dinner: parseMeal(day.dinner)
  };
};

// Generate 22 days of meals from the first 3 weeks + 1 day
const generateTwentyTwoDayMeals = (): DayMeals[] => {
  const allMeals: DayMeals[] = [];
  
  // Get first 3 weeks
  for (let week = 1; week <= 3; week++) {
    const weekKey = `week${week}` as keyof typeof weeklyPlans;
    const weekData = weeklyPlans[weekKey];
    
    // Convert each day's meals
    Object.values(weekData).forEach(dayMeals => {
      allMeals.push(parseDayMeals(dayMeals));
    });
  }
  
  // Get the first day of week 4 to complete 22 days
  const week4Key = 'week4' as keyof typeof weeklyPlans;
  const week4Data = weeklyPlans[week4Key];
  const mondayMeals = week4Data.Monday;
  allMeals.push(parseDayMeals(mondayMeals));
  
  // Return only the first 22 days
  return allMeals.slice(0, 22);
};

export const twentyTwoDayPlan: MealPlan = {
  id: '22-day-plan',
  name: '22-Day Challenge Plan',
  description: 'An intensive 22-day program designed to kickstart your healthy eating habits',
  duration: 22,
  type: 'challenge',
  meals: generateTwentyTwoDayMeals()
};
