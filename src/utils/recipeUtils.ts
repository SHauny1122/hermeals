import { recipes } from '../data/recipes';
import { MealDetail } from '../types/mealPlans';

type RecipeCategory = typeof recipes.shakes | typeof recipes.lunch | typeof recipes.dinner;

function isRecipeInCategory(category: RecipeCategory, name: string): name is keyof RecipeCategory {
  return Object.prototype.hasOwnProperty.call(category, name);
}

export function findRecipe(mealDetail: MealDetail): string | undefined {
  const mealName = mealDetail.name;
  
  // First check shakes
  if (isRecipeInCategory(recipes.shakes, mealName)) {
    return recipes.shakes[mealName];
  }
  // Then check lunch
  if (isRecipeInCategory(recipes.lunch, mealName)) {
    return recipes.lunch[mealName];
  }
  // Finally check dinner
  if (isRecipeInCategory(recipes.dinner, mealName)) {
    return recipes.dinner[mealName];
  }
  return undefined;
}
