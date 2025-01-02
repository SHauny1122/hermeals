export interface Meal {
  name: string;
  recipe: string;
}

export interface MealDetail {
  name: string;
  recipe: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
}

export interface DayMeals {
  breakfast: MealDetail;
  lunch: MealDetail;
  dinner: MealDetail;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: 'regular' | 'smoothie';
  meals: DayMeals[];
  shoppingLists: string[];
}

export interface RecipeCategory {
  [key: string]: string;
}

export interface Recipes {
  shakes: RecipeCategory;
  lunch: RecipeCategory;
  dinner: RecipeCategory;
  vegetables: RecipeCategory;
}
