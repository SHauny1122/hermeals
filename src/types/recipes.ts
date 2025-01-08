export interface Recipe {
  name: string;
  description: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  type: RecipeType;
  notes?: string;
  subRecipes?: {
    [key: string]: {
      ingredients: string[];
      instructions: string[];
    }
  };
}

export type RecipeType = 
  | 'shake'
  | 'eggs'
  | 'chicken'
  | 'fish'
  | 'seafood'
  | 'beef'
  | 'pork'
  | 'salad'
  | 'soup'
  | 'vegetable'
  | 'carbFeast'
  | 'dessert';

export interface RecipeCollection {
  [key: string]: Recipe;
}
