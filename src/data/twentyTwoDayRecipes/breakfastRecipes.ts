import { Recipe } from '../../types/recipes';

export const breakfastRecipes: { [key: string]: Recipe } = {
  "Apple Strudel Shake": {
    name: "Apple Strudel Shake",
    description: "Cinnamon, apples and walnuts make a fragrant breakfast treat smell like a freshly baked strudel. For spice lovers, add an additional pinch of ground clove or pumpkin pie spice.",
    servings: 1,
    ingredients: [
      "1 serving protein powder",
      "⅓ cup apple, chopped, peel on",
      "½ cup unsweetened, plain almond milk",
      "½ cup canned full-fat coconut milk",
      "4 ice cubes",
      "2 teaspoons stevia (optional)",
      "½ teaspoon cinnamon",
      "1 tablespoon chia seed",
      "2 tablespoons chopped walnut",
      "½ teaspoon vanilla extract",
      "Pinch of ground clove or pumpkin pie spice (optional)"
    ],
    instructions: [
      "Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.",
      "Process until smooth.",
      "Serve immediately."
    ],
    prepTime: "5 minutes",
    type: "shake"
  },

  "Cherry Amaretto Shake": {
    name: "Cherry Amaretto Shake",
    description: "Almonds and cherries in this recipe taste like a cherry pie. Spinach might seem like a strange addition, but you won't taste it and you'll reap its nutritional benefits of fiber, folate, vitamin C and much more.",
    servings: 1,
    ingredients: [
      "1 serving protein powder",
      "½ cup unsweetened, plain almond milk",
      "½ cup canned full fat coconut milk",
      "4 ice cubes",
      "¼ cup cherries, fresh or frozen",
      "1 tablespoon ground flax seed",
      "¼ cup baby spinach leaves (optional)",
      "2 teaspoons stevia (optional)",
      "¼ teaspoon almond extract (optional)",
      "2 tablespoons almonds, chopped"
    ],
    instructions: [
      "Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.",
      "Process until smooth.",
      "Serve immediately."
    ],
    prepTime: "5 minutes",
    type: "shake"
  },

  "Chocolate Cashew Crunch Shake": {
    name: "Chocolate Cashew Crunch Shake",
    description: "Sweet blueberries and dark chocolate make this shake sweet and antioxidant rich. Fresh or frozen berries work equally well but frozen berries are more economical.",
    servings: 1,
    ingredients: [
      "1 serving protein powder",
      "½ cup canned full-fat coconut milk",
      "1 tablespoon unsweetened cocoa powder",
      "4 ice cubes",
      "⅓ cup blueberries",
      "1 tablespoon ground flax or chia seeds",
      "1 tablespoon cashews",
      "2 teaspoons stevia (optional)"
    ],
    instructions: [
      "Place all ingredients in the blender and add additional water to create desired consistency.",
      "Process until smooth.",
      "Serve immediately."
    ],
    prepTime: "5 minutes",
    type: "shake"
  },

  "Mojito Shake": {
    name: "Mojito Shake",
    description: "Love the burst of fresh flavor from mojitos at the local watering hole? This shake has the same flavors with plenty of protein, fiber and fat to boot. Don't toss the leftover kiwi, peel it and transfer to a sandwich baggy to freeze for later use.",
    servings: 1,
    ingredients: [
      "1 serving protein powder",
      "½ cup unsweetened, plain almond milk",
      "¼ cup fresh mint leaves",
      "¼ cup almonds",
      "½ cup canned full-fat coconut milk",
      "4 ice cubes",
      "½ kiwi, peeled",
      "2 tablespoons chia seeds",
      "2 teaspoons stevia (optional)"
    ],
    instructions: [
      "Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.",
      "Process until smooth.",
      "Serve immediately."
    ],
    prepTime: "5 minutes",
    type: "shake"
  },

  "Any Style Eggs with Bacon": {
    name: "Any Style Eggs with Bacon",
    description: "On the mornings when you're not in the mood for a shake, eggs with bacon serve as an excellent alternative. Be sure to include the yolks which contain choline, an essential nutrient for your body.",
    servings: 1,
    ingredients: [
      "2-3 eggs",
      "Coconut oil for cooking",
      "2-3 slices of bacon",
      "Assorted vegetables (i.e. spinach, onion, summer squash)"
    ],
    instructions: [
      "Prepare your eggs any style that you choose. Some ideas include scrambled, poached and over-easy.",
      "While eggs are cooking sauté cut-up vegetables in coconut oil and cook bacon.",
      "Serve eggs with the side of vegetables and bacon."
    ],
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    type: "eggs"
  },

  "Breakfast Stack": {
    name: "Breakfast Stack",
    description: "Get your omega 3's first thing in the morning with a serving of wild salmon for breakfast. This stack is packed with nutrition that will fuel you until lunchtime.",
    servings: 1,
    ingredients: [
      "2 teaspoons butter",
      "2-3 eggs",
      "Salt and fresh ground pepper to taste",
      "3 ounces smoked wild salmon",
      "2 prepared roasted red pepper halves",
      "½ avocado, thinly sliced",
      "4 thin red onion rings"
    ],
    instructions: [
      "Heat the butter in a large skillet over medium and crack the eggs carefully into the pan.",
      "Season the eggs lightly with salt and pepper and cook to desired doneness, flipping once.",
      "Transfer the cooked eggs onto a plate and layer with smoked wild salmon, red pepper, avocado slices and onion rings."
    ],
    prepTime: "5 minutes",
    cookTime: "10 minutes",
    type: "eggs"
  },

  "Jonny's Eggs and Greens": {
    name: "Jonny's Eggs and Greens",
    description: "Dress up your standard eggs with some colorful greens. Use spinach, arugula or kale and you'll be guaranteed a plethora of vitamins and minerals to help keep you going throughout the day.",
    servings: 2,
    ingredients: [
      "4 cups assorted baby greens (spring mix, Romaine, spinach, arugula, etc.)",
      "3 tablespoons butter",
      "2 teaspoons Dijon mustard",
      "2 shallots, finely chopped",
      "4 eggs",
      "2 tablespoons red wine vinegar"
    ],
    instructions: [
      "Make 2 beds of 2 cups greens each and set aside.",
      "Heat the butter in a large nonstick skillet over medium and add the shallots.",
      "Cook for 2–3 minutes or until softened.",
      "Add the vinegar and Dijon and stir constantly for about 10 seconds.",
      "Pour the mixture over the greens.",
      "Return the pan to the burner and crack four eggs carefully into the pan.",
      "Cook to desired doneness, flipping once.",
      "Place 2 fried eggs carefully over the top of each plate of greens."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    type: "eggs"
  },

  "Jonny's Poached Eggs and Turkey Sausage": {
    name: "Jonny's Poached Eggs and Turkey Sausage",
    description: "For an extra protein punch, pair your eggs with some gluten-free turkey sausage. If you purchase the pre-cooked variety, you can gently heat and have this substantial breakfast served in a matter of minutes.",
    servings: 2,
    ingredients: [
      "2 teaspoons coconut oil",
      "1 pint cherry or grape tomatoes, halved",
      "½ pound Italian gluten-free turkey sausage, thinly sliced",
      "2 eggs"
    ],
    instructions: [
      "Place a small covered saucepan half full of water over medium high to boil.",
      "Heat the coconut oil in a large skillet over medium heat and add the sausage.",
      "Cook for about 5 minutes and add the tomatoes, cooking for an additional 3–4 minutes or until sausage is cooked through and tomatoes are hot and soft.",
      "When the water comes to a simmer, remove the lid and carefully crack the eggs into a small bowl without breaking the yolks.",
      "Slowly and carefully slide them out of the bowl and into the simmering water, up against the side of the pan, if possible.",
      "Simmer the eggs for 3–5 minutes to desired doneness and carefully remove them with a slotted spoon.",
      "Serve the eggs over the sausage and tomatoes."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    type: "eggs"
  },

  "Tri-Color Pepper Scramble with Bacon": {
    name: "Tri-Color Pepper Scramble with Bacon",
    description: "Start your day with a rainbow of colors in your eggs. The bacon will help keep you full by providing a good source of quality fat and protein.",
    servings: 1,
    ingredients: [
      "2 teaspoons butter",
      "⅓ cup tri-color bell peppers, diced",
      "1 shallot, finely chopped (optional)",
      "2 eggs",
      "½ teaspoon basil or a few fresh leaves minced",
      "½ teaspoon each salt and fresh ground pepper",
      "2-3 slices of bacon, cooked"
    ],
    instructions: [
      "Heat the butter in a skillet over medium heat.",
      "Add the peppers and cook, stirring occasionally, until they reach desired softness.",
      "Add the shallot and stir. Cook for a couple of minutes until vegetables are tender.",
      "While the vegetables are cooking, combine the eggs, basil, salt and pepper in a small bowl and whisk until lightly beaten and set aside.",
      "Pour the egg mixture over the vegetables.",
      "Using a spatula to turn the eggs and veggies occasionally, cook for a few minutes to desired doneness.",
      "Serve with cooked bacon."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    type: "eggs"
  }
};
