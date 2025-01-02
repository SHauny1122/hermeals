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

// Generate all 12 weeks of meals
const generateTwelveWeekMeals = (): DayMeals[] => {
  const allMeals: DayMeals[] = [];
  for (let week = 1; week <= 12; week++) {
    const weekKey = `week${week}` as keyof typeof weeklyPlans;
    const weekData = weeklyPlans[weekKey];
    
    // Convert each day's meals
    Object.values(weekData).forEach(dayMeals => {
      allMeals.push(parseDayMeals(dayMeals));
    });
  }
  return allMeals;
};

export const regularMealPlan: MealPlan = {
  id: '12-week-plan',
  name: '12-Week Regular Plan',
  description: 'A comprehensive 12-week program with balanced meals including shakes, healthy lunches, and nutritious dinners',
  duration: 84,
  type: 'regular',
  meals: generateTwelveWeekMeals()
};
