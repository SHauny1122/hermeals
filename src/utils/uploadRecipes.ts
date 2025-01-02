import { createFullMealPlan } from './mealPlanParser';
import { uploadMealPlan } from './uploadMealPlans';

// Create an object to store your recipes
const recipes: { [key: string]: string } = {};

// Example of how to add a recipe:
recipes['Chocolate Raspberry Shake (20)'] = `
Serves: 1 Prep Time: 5 min. Cook Time: 0 min. Total Time: 5 min.

Craving chocolate? Adding some raw cocoa or cocoa powder to your shake will help!
Ingredients
• 1 scoop Metabolic Super Protein - Chocolate
• 1 cup unsweetened almond milk
• ½ cup frozen raspberries
• 1 large handful raw baby spinach
• 1 tablespoon cocoa powder
• 1 tablespoon chia seed

Instructions
Add all Ingredients to blender and blend until very smooth.
`;

// Function to upload all meal plans
export const uploadAllMealPlans = async (weeklyPlans: string[], recipes: { [key: string]: string }) => {
  try {
    const mealPlan = createFullMealPlan(weeklyPlans, recipes);
    await uploadMealPlan(mealPlan);
    console.log('Successfully uploaded meal plan!');
  } catch (error) {
    console.error('Error uploading meal plans:', error);
  }
};

// Example usage:
/*
const week1 = `Week 1
Mon Tue Wed Thu Fri Sat Sun
...`;

const weeklyPlans = [week1, week2, ...];
await uploadAllMealPlans(weeklyPlans, recipes);
*/
