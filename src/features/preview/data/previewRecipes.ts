import { PreviewRecipe } from '../types/preview';

// This will store our preview recipes
export const previewRecipes: PreviewRecipe[] = [
  {
    id: 'apple-strudel-shake',
    name: 'Apple Strudel Shake',
    description: 'A fragrant breakfast treat that smells like a freshly baked strudel. Perfect blend of cinnamon, apples, and walnuts.',
    imageUrl: '/images/preview/apple-strudel-shake.jpg', // You'll need to add this image
    prepTime: '5 mins',
    cookTime: '2 mins',
    servings: 1,
    calories: 320,
    ingredients: [
      '1 serving protein powder',
      '⅓ cup apple, chopped, peel on',
      '½ cup unsweetened, plain almond milk',
      '½ cup canned full-fat coconut milk',
      '4 ice cubes',
      '2 teaspoons stevia (optional)',
      '½ teaspoon cinnamon',
      '1 tablespoon chia seed',
      '2 tablespoons chopped walnut',
      '½ teaspoon vanilla extract',
      'Pinch of ground clove or pumpkin pie spice (optional)'
    ],
    instructions: [
      'Place all ingredients in the blender',
      'Add approximately ½ a cup of water to create desired consistency',
      'Process until smooth',
      'Serve immediately'
    ],
    nutritionFacts: {
      protein: '25g',
      carbs: '15g',
      fats: '18g',
      fiber: '8g'
    },
    tags: ['breakfast', 'shake', 'vegetarian', 'quick']
  },
  {
    id: 'grilled-lamb-chops',
    name: 'Grilled Lamb Chops',
    description: 'Elegant herb-marinated lamb chops perfect for a family dinner. Made with Australian grass-fed lamb for the best quality.',
    imageUrl: '/images/preview/grilled-lamb-chops.jpg', // You'll need to add this image
    prepTime: '35 mins',
    cookTime: '12 mins',
    servings: 4,
    calories: 450,
    ingredients: [
      '⅓ cup gluten-free tamari',
      '3 tablespoons coconut oil, melted',
      'Juice of 1 lemon',
      '3 cloves garlic, minced',
      '⅓ cup mint leaves, chopped',
      '¼ cup fresh rosemary leaves, chopped',
      '3 tablespoons fresh thyme leaves, chopped',
      '3/4 teaspoon fresh ground pepper',
      '½ teaspoon salt',
      '4 lamb chops'
    ],
    instructions: [
      'Whisk together tamari, oil, and lemon juice in a shallow glass container',
      'Add garlic, mint, rosemary, thyme, pepper, and salt. Mix thoroughly',
      'Lay lamb chops in a single layer and coat with marinade',
      'Cover and marinate for 30 minutes, flipping occasionally',
      'Grill over medium heat for 6–7 minutes',
      'Flip and grill 4–5 minutes more for medium rare'
    ],
    nutritionFacts: {
      protein: '32g',
      carbs: '3g',
      fats: '28g',
      fiber: '1g'
    },
    tags: ['dinner', 'high-protein', 'gluten-free', 'keto']
  },
  {
    id: 'nut-crusted-salmon',
    name: 'Nut Crusted Salmon',
    description: 'An easy yet elegant salmon dish with gourmet appeal, perfect for dinner parties while staying healthy.',
    imageUrl: '/images/preview/nut-crusted-salmon.jpg', // You'll need to add this image
    prepTime: '5 mins',
    cookTime: '12 mins',
    servings: 4,
    calories: 380,
    ingredients: [
      '4 4-ounce salmon filets, skin on',
      '4 tablespoons mustard',
      '4 tablespoons chopped nuts (walnuts, almonds, or macadamia)',
      '¼ cup scallions, thinly sliced or fresh cilantro, chopped'
    ],
    instructions: [
      'Preheat oven to 400°F',
      'Place salmon skin side down in a 7X11 baking dish',
      'Top each filet with 1 tablespoon mustard and nuts',
      'Bake 10-12 minutes until pink in center but not translucent',
      'Cook 2 minutes more for well done',
      'Top with scallions and serve immediately'
    ],
    nutritionFacts: {
      protein: '34g',
      carbs: '2g',
      fats: '24g',
      fiber: '1g'
    },
    tags: ['dinner', 'seafood', 'high-protein', 'gluten-free']
  }
];

// Helper function to get all preview recipes
export const getAllPreviewRecipes = (): PreviewRecipe[] => {
  return previewRecipes;
};

// Helper function to get a specific recipe by ID
export const getPreviewRecipeById = (id: string): PreviewRecipe | undefined => {
  return previewRecipes.find(recipe => recipe.id === id);
};
