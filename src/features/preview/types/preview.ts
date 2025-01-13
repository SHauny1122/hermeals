export interface PreviewRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: {
    protein: string;
    carbs: string;
    fats: string;
    fiber: string;
  };
  tags: string[];
}
