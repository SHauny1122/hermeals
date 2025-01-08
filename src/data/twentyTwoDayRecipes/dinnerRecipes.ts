import { Recipe } from '../../types/recipes';

export const dinnerRecipes: { [key: string]: Recipe } = {
  "Chicken Marsala": {
    name: "Chicken Marsala",
    description: "Chicken Marsala gets its flavor from piling on the mushrooms and sweet Marsala wine. This recipe has loads of detoxifying mushroom but replaces the wine with balsamic vinegar for extra zip.",
    servings: 4,
    ingredients: [
      "4 skinless, boneless raw chicken cutlets",
      "1 teaspoon dried oregano",
      "¼ teaspoon salt",
      "¼ teaspoon freshly ground black pepper",
      "2 tablespoons coconut oil",
      "2 cloves garlic, minced",
      "2 tablespoons unsalted butter, preferably grass-fed",
      "½ red or yellow onion, sliced thinly (about ½ cup)",
      "1 small zucchini thinly sliced",
      "8 ounces white button mushrooms, sliced",
      "1 tablespoon balsamic vinegar mixed with ⅓ cup water",
      "¼ cup fresh basil, thinly sliced",
      "Ground Flax or coconut flour, sprinkling"
    ],
    instructions: [
      "Sprinkle the chicken with oregano, salt, and pepper.",
      "Heat a large skillet over medium-high heat. Add the coconut oil and garlic.",
      "Cook 30 seconds until the garlic becomes fragrant.",
      "Add the chicken and cook 3-4 minutes on each side until it browns.",
      "Transfer to a plate and set aside.",
      "Add the butter to the pan along with the onion, zucchini, and mushrooms.",
      "Cook 2-3 minutes until the vegetables start to soften.",
      "Add the balsamic vinegar mixture and cook 1 minute more.",
      "Return the chicken to the pan and cook 2-3 minutes more until heated through.",
      "Sprinkle with basil and serve immediately."
    ],
    type: "chicken",
    prepTime: "15 minutes",
    cookTime: "20 minutes"
  },

  "Baked Salmon with Asparagus": {
    name: "Baked Salmon with Asparagus",
    description: "A simple yet elegant dinner that pairs perfectly cooked salmon with fresh asparagus.",
    servings: 4,
    ingredients: [
      "4 6-ounce salmon fillets",
      "1 pound asparagus, trimmed",
      "2 tablespoons olive oil",
      "2 lemons",
      "4 cloves garlic, minced",
      "1 teaspoon sea salt",
      "½ teaspoon black pepper",
      "Fresh dill for garnish"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Place salmon and asparagus on a baking sheet.",
      "Drizzle with olive oil and season with salt, pepper, and garlic.",
      "Slice one lemon and place on top of salmon.",
      "Squeeze the second lemon over asparagus.",
      "Bake for 12-15 minutes until salmon is cooked through.",
      "Garnish with fresh dill and serve."
    ],
    type: "fish",
    prepTime: "10 minutes",
    cookTime: "15 minutes"
  },

  "Herb-Roasted Chicken": {
    name: "Herb-Roasted Chicken",
    description: "A flavorful and juicy chicken dish with fresh herbs and garlic.",
    servings: 4,
    ingredients: [
      "4 chicken breasts",
      "2 tablespoons olive oil",
      "4 cloves garlic, minced",
      "1 tablespoon fresh rosemary, chopped",
      "1 tablespoon fresh thyme, chopped",
      "1 teaspoon sea salt",
      "½ teaspoon black pepper",
      "1 lemon"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Mix olive oil, garlic, rosemary, thyme, salt, and pepper.",
      "Rub herb mixture over chicken breasts.",
      "Place in baking dish and squeeze lemon over top.",
      "Bake for 25-30 minutes until chicken is cooked through.",
      "Let rest for 5 minutes before serving."
    ],
    type: "chicken",
    prepTime: "10 minutes",
    cookTime: "30 minutes"
  }
};
