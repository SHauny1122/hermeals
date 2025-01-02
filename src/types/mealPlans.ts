export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface MealDetail {
  name: string;
  recipe: string;
  description?: string;
  ingredients?: Ingredient[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}

export interface DayMeals {
  breakfast: MealDetail;
  lunch: MealDetail;
  dinner: MealDetail;
}

export interface WeekMeals {
  [key: string]: DayMeals;
}

export interface MealPlan {
  id?: string;
  name?: string;
  description?: string;
  duration?: number;
  type?: 'regular' | 'smoothie' | 'challenge';
  meals: DayMeals[];
  shoppingLists?: {
    week: number;
    items: {
      category: string;
      items: string[];
    }[];
  }[];
}

export interface UserMealPlan {
  userId: string;
  planId: string;
  startDate: Date;
  currentDay: number;
  completed: boolean;
  mealPlan?: MealPlan;
}

export interface RecipeCategory {
  [key: string]: string;
}

export interface Recipes {
  shakes: RecipeCategory;
  lunch: RecipeCategory;
  dinner: RecipeCategory;
  vegetables?: RecipeCategory;
}
