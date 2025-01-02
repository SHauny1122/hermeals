import { MealPlan } from '../types/mealPlans';

export const smoothiePlan: MealPlan = {
  id: 'smoothie-plan',
  name: 'Smoothie Plan',
  description: 'A refreshing and nutritious smoothie-based meal plan.',
  duration: 4, // 4 weeks
  type: 'smoothie',
  meals: [
    // Day 1
    {
      breakfast: {
        name: '', // Add your smoothie name here
        recipe: '',
        ingredients: [],
        instructions: [],
        prepTime: '',
        cookTime: '',
        servings: 0
      },
      lunch: {
        name: '',
        recipe: '',
        ingredients: [],
        instructions: [],
        prepTime: '',
        cookTime: '',
        servings: 0
      },
      dinner: {
        name: '',
        recipe: '',
        ingredients: [],
        instructions: [],
        prepTime: '',
        cookTime: '',
        servings: 0
      },
      snacks: []
    },
    // Add more days following the same structure...
  ],
  shoppingLists: [
    {
      week: 1,
      items: [
        {
          category: "Fruits",
          items: []
        },
        {
          category: "Vegetables",
          items: []
        }
      ]
    }
  ]
};
