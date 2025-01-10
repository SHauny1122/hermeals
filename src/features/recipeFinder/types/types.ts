export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
  likes: number;
  readyInMinutes?: number;
}

export interface Ingredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
}

export interface DetectedIngredient {
  name: string;
  confidence: number;
  specificLabels?: string[];
  category?: string;
  nutrients?: string[];
  commonMeals?: string[];
}

export interface Recipe {
  id: number | string;
  title: string;
  image: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  likes?: number;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisineType?: string;
  mealType?: string[];
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  ingredients?: RecipeIngredient[];
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
  original: string;
}

export interface RecipeSearchParams {
  ingredients: string[];
  cuisine?: string;
  mealType?: string;
  maxReadyTime?: number;
  difficulty?: string;
  number?: number;
  sort?: string;
  sortDirection?: string;
}
