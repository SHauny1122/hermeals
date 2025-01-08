import { Recipe } from '../../types/recipes';

export const lunchRecipes: { [key: string]: Recipe } = {
  "Buffalo Chicken Fingers": {
    name: "Buffalo Chicken Fingers",
    description: "This restaurant inspired spin on Buffalo Wings (minus the greasy skin or breading) will have any finger food fan clamoring for more.",
    servings: 4,
    ingredients: [
      "3 6-ounce boneless, skinless chicken breasts, cut into strips",
      "¼ teaspoon salt",
      "¼ teaspoon freshly ground black pepper",
      "1 tablespoon coconut oil",
      "¼ cup gluten-free hot sauce",
      "2 tablespoons tomato paste",
      "4 tablespoons water",
      "4 tablespoons unsalted butter, preferably grass-fed",
      "4 cups broccoli florets or bok choy, chopped"
    ],
    instructions: [
      "Sprinkle the chicken with the salt and pepper.",
      "Heat a large skillet over medium-high heat. Add the coconut oil.",
      "Add the chicken and cook 3-4 minutes on each side until browned.",
      "In a small bowl, whisk the hot sauce, tomato paste, and water.",
      "Add to the skillet along with the butter.",
      "Cook 2-3 minutes until the sauce thickens slightly.",
      "Serve with steamed broccoli or bok choy."
    ],
    type: "chicken",
    prepTime: "10 minutes",
    cookTime: "15 minutes"
  },

  "Chicken Salad Pepper Stuffers": {
    name: "Chicken Salad Pepper Stuffers",
    description: "This healthier version of chicken salad is a terrific lunch option. The peppers make this meal not only delicious but also beautiful on the plate!",
    servings: 4,
    ingredients: [
      "4 bell peppers, halved lengthwise, seeded",
      "2 cups cooked chicken breast, diced",
      "½ cup homemade mayonnaise",
      "¼ cup celery, finely diced",
      "¼ cup red onion, finely diced",
      "2 tablespoons fresh parsley, chopped",
      "1 teaspoon Dijon mustard",
      "½ teaspoon salt",
      "¼ teaspoon black pepper"
    ],
    instructions: [
      "In a large bowl, combine chicken, mayonnaise, celery, onion, parsley, mustard, salt, and pepper.",
      "Mix well until all ingredients are evenly combined.",
      "Fill each pepper half with the chicken salad mixture.",
      "Serve immediately or chill until ready to serve."
    ],
    type: "chicken",
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    subRecipes: {
      "Homemade Mayonnaise": {
        ingredients: [
          "1 large egg",
          "2 tablespoons lemon juice",
          "1 teaspoon Dijon mustard",
          "¼ teaspoon salt",
          "1 cup light olive oil"
        ],
        instructions: [
          "Place egg, lemon juice, mustard, and salt in a blender.",
          "Blend until combined.",
          "With blender running, very slowly drizzle in oil until mixture thickens.",
          "Store in an airtight container in the refrigerator for up to 1 week."
        ]
      }
    }
  },

  "Grilled Chicken Caesar Salad": {
    name: "Grilled Chicken Caesar Salad",
    description: "A classic Caesar salad with grilled chicken and a homemade dressing.",
    servings: 4,
    ingredients: [
      "4 chicken breasts",
      "2 heads romaine lettuce, chopped",
      "½ cup olive oil",
      "2 cloves garlic, minced",
      "2 tablespoons lemon juice",
      "1 tablespoon Dijon mustard",
      "2 anchovy fillets (optional)",
      "Salt and pepper to taste",
      "¼ cup grated Parmesan cheese"
    ],
    instructions: [
      "Season chicken with salt and pepper and grill until cooked through.",
      "Slice chicken and set aside.",
      "In a blender, combine olive oil, garlic, lemon juice, mustard, and anchovies if using.",
      "Toss lettuce with dressing and top with sliced chicken and Parmesan.",
      "Serve immediately."
    ],
    type: "salad",
    prepTime: "15 minutes",
    cookTime: "15 minutes"
  },

  "Turkey and Avocado Wrap": {
    name: "Turkey and Avocado Wrap",
    description: "A healthy wrap using lettuce instead of tortilla, perfect for a light lunch.",
    servings: 2,
    ingredients: [
      "8 large lettuce leaves",
      "½ pound sliced turkey breast",
      "1 avocado, sliced",
      "1 tomato, sliced",
      "¼ red onion, thinly sliced",
      "2 tablespoons Dijon mustard",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Lay out lettuce leaves.",
      "Spread each with Dijon mustard.",
      "Layer turkey, avocado, tomato, and onion.",
      "Season with salt and pepper.",
      "Roll up and secure with toothpicks if needed.",
      "Serve immediately."
    ],
    type: "turkey",
    prepTime: "10 minutes",
    cookTime: "0 minutes"
  }
};
