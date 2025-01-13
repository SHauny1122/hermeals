export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export type PlanType = '22-day' | '12-week';

export interface Recipe {
  name: string;
  description: string;
  ingredients: { name: string; amount?: string }[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  recipe?: string;
}

export interface MealDetail extends Recipe {
  // Additional fields specific to meal details
}

export interface DayMeals {
  day: number;
  breakfast: {
    name: string;
    recipe: string;
    ingredients?: { name: string; amount: string; unit?: string; notes?: string }[];
    instructions?: string[];
    prepTime?: string;
    servings?: number;
    gremolata?: string;
    servingNotes?: string;
  };
  lunch: {
    name: string;
    recipe: string;
    ingredients?: { name: string; amount: string; unit?: string; notes?: string }[];
    instructions?: string[];
    prepTime?: string;
    servings?: number;
    gremolata?: string;
    servingNotes?: string;
  };
  dinner: {
    name: string;
    recipe: string;
    ingredients?: { name: string; amount: string; unit?: string; notes?: string }[];
    instructions?: string[];
    prepTime?: string;
    servings?: number;
    gremolata?: string;
    servingNotes?: string;
  };
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: 'challenge' | 'regular';
  meals: DayMeals[];
  shoppingLists: Array<{
    week: number;
    items: Array<{
      category: string;
      items: string[];
    }>;
  }>;
}

export interface UserMealPlan {
  userId: string;
  planIds: string[];
  selectedPlan: string;
  hasAllPlans: boolean;
  availablePlans: string[];
  startDate: Date;
  currentDay: number;
  completed: boolean;
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
