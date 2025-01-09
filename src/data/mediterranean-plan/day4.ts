import { MediterraneanDayPlan } from './types';

export const mediterraneanDayFour: MediterraneanDayPlan = {
  breakfast: {
    name: "Baked egg, kale and herb pots",
    description: "Start your day with protein-rich baked eggs and nutritious kale",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 2,
    ingredients: [
      { name: "Olive oil", amount: "1", unit: "teaspoon" },
      { name: "Sweet potato", amount: "125", unit: "g", notes: "peeled, coarsely grated" },
      { name: "Kale", amount: "40", unit: "g", notes: "trimmed, chopped" },
      { name: "Garlic clove", amount: "1", unit: "whole", notes: "crushed" },
      { name: "Eggs", amount: "4", unit: "whole" },
      { name: "Feta", amount: "30", unit: "g", notes: "crumbled" },
      { name: "Fresh herbs", amount: "1/3", unit: "cup", notes: "chopped (such as parsley and basil)" },
      { name: "Roasted red capsicum", amount: "50", unit: "g", notes: "not in oil, thinly sliced" },
      { name: "Lemon juice", amount: "1", unit: "teaspoon" }
    ],
    instructions: [
      "Preheat the oven to 180°C/160°C fan forced. Lightly spray two 350ml ovenproof ramekins with oil.",
      "Heat oil in a large frying pan over medium-high heat. Cook sweet potato, stirring, for 3-4 minutes or until softened. Add kale and garlic. Cook, stirring, for 2 minutes or until wilted. Set aside to cool slightly.",
      "Whisk the eggs in a bowl. Stir in the feta, 2 tbs herbs and sweet potato mixture. Ladle into the prepared ramekins and bake for 25 minutes or until puffed, golden and set.",
      "Combine the roasted capsicum, lemon juice and remaining herbs in a small bowl. Serve pots topped with capsicum mixture."
    ]
  },
  morningSnack: {
    name: "Fresh dates with walnuts",
    description: "A simple, nutritious snack combining sweet dates with protein-rich walnuts",
    ingredients: [
      { name: "Fresh dates", amount: "2", unit: "whole" },
      { name: "Walnut halves", amount: "3-4", unit: "pieces" }
    ]
  },
  lunch: {
    name: "Rainbow power salad",
    description: "A colorful, nutrient-packed salad full of Mediterranean ingredients",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 4,
    ingredients: [
      { name: "Chickpeas", amount: "400", unit: "g", notes: "canned, rinsed, drained" },
      { name: "Tri-colour quinoa", amount: "70", unit: "g", notes: "1/3 cup, rinsed, drained" },
      { name: "Cracked freekeh", amount: "60", unit: "g", notes: "1/3 cup" },
      { name: "Broccoli", amount: "350", unit: "g", notes: "trimmed, cut into florets" },
      { name: "Frozen shelled edamame", amount: "145", unit: "g", notes: "1 cup" },
      { name: "Tomato medley mix", amount: "200", unit: "g", notes: "halved" },
      { name: "Radishes", amount: "4", unit: "whole", notes: "thinly sliced" },
      { name: "Fresh mint leaves", amount: "1/2", unit: "cup", notes: "plus extra to serve" },
      { name: "Pepitas", amount: "2", unit: "tablespoons" },
      { name: "Apple cider vinegar", amount: "1", unit: "tablespoon" },
      { name: "Extra virgin olive oil", amount: "1", unit: "tablespoon" },
      { name: "Pure maple syrup", amount: "1", unit: "tablespoon" },
      { name: "Blueberries", amount: "70", unit: "g", notes: "1/2 cup" }
    ],
    instructions: [
      "Preheat oven to 200C/180C fan forced. Grease a baking tray and line with baking paper. Spread chickpeas over prepared tray. Spray lightly with oil. Bake for 15 minutes or until golden and crisp.",
      "Meanwhile, cook the quinoa and freekeh in a large saucepan of boiling water for 12 minutes or until just tender. Drain. Refresh under cold running water. Drain well.",
      "Place broccoli and edamame in a steamer over a saucepan of simmering water. Cover and steam for 2-3 minutes or until just tender. Drain. Refresh under cold running water. Drain well.",
      "Combine the cooked grains, broccoli, edamame, tomato, radish, mint and pepitas in a large bowl. Season. Whisk together the vinegar, oil and maple syrup in a small bowl. Add the dressing to the salad and gently toss to combine. Top with roasted chickpeas, blueberries and extra mint leaves just before serving."
    ]
  },
  afternoonSnack: {
    name: "Creamy lemon and white bean dip",
    description: "A protein-rich, creamy dip perfect with vegetables or whole grain crackers",
    prepTime: "5 minutes",
    servings: 8,
    ingredients: [
      { name: "Butter beans", amount: "420", unit: "g", notes: "canned" },
      { name: "Lemon rind", amount: "1/2", unit: "teaspoon", notes: "finely grated" },
      { name: "Lemon juice", amount: "1", unit: "tablespoon" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons", notes: "plus extra to serve" },
      { name: "Garlic clove", amount: "1", unit: "small", notes: "crushed" },
      { name: "Fresh herbs", amount: "1 1/2", unit: "tablespoons", notes: "finely chopped parsley, thyme or dill, plus extra to serve" }
    ],
    instructions: [
      "Drain and rinse beans. Reserve 1 tablespoon. Place remaining beans, lemon rind, juice, oil, garlic and herbs in a food processor. Process until smooth and combined. Season with salt and pepper.",
      "Transfer mixture to a serving bowl. Top with reserved beans. Sprinkle with extra herbs and drizzle with extra oil. Serve."
    ]
  },
  dinner: {
    name: "Better-for-you chicken cacciatore",
    description: "A healthier version of the classic Italian chicken dish",
    prepTime: "25 minutes",
    cookTime: "1 hour 5 minutes",
    servings: 6,
    ingredients: [
      { name: "Chicken thigh cutlets", amount: "6", unit: "pieces", notes: "about 1.1kg, skin removed" },
      { name: "Olive oil", amount: "2", unit: "tablespoons" },
      { name: "Swiss brown mushrooms", amount: "200", unit: "g", notes: "sliced" },
      { name: "Red onion", amount: "1", unit: "whole", notes: "thinly sliced" },
      { name: "Ripe tomatoes", amount: "4", unit: "whole", notes: "chopped" },
      { name: "Garlic cloves", amount: "4", unit: "whole", notes: "chopped" },
      { name: "Red capsicum", amount: "1", unit: "whole", notes: "deseeded, chopped" },
      { name: "Yellow capsicum", amount: "1", unit: "whole", notes: "deseeded, chopped" },
      { name: "Carrot", amount: "1", unit: "whole", notes: "peeled, chopped" },
      { name: "White wine", amount: "125", unit: "ml", notes: "1/2 cup" },
      { name: "Chicken stock", amount: "250", unit: "ml", notes: "1 cup" },
      { name: "Grape or cherry tomatoes", amount: "200", unit: "g" },
      { name: "Kalamata olives", amount: "60", unit: "g", notes: "1/4 cup, pitted" },
      { name: "Fresh oregano leaves", amount: "2", unit: "tablespoons", notes: "chopped, plus extra sprigs to serve" },
      { name: "Crusty sourdough bread", amount: "1", unit: "loaf", notes: "to serve (optional)" }
    ],
    instructions: [
      "Season the chicken cutlets well. Heat 1 tbs olive oil in a large non-stick frying pan over medium-high heat. Cook the chicken for 2-3 minutes each side or until browned all over. Transfer to a plate.",
      "Add the mushroom to the pan and cook, stirring, over medium heat for 3-4 minutes or until softened. Transfer to a bowl. Add the remaining 1 tbs oil to pan. Add the onion and cook, stirring, for 2-3 minutes or until just beginning to soften.",
      "Add the chopped tomato and garlic. Cook, stirring, for 3-4 minutes, until softened. Add the capsicum and carrot and cook for 2 minutes. Add wine and simmer for 5 minutes or until liquid has reduced by half.",
      "Return the chicken and mushroom to the pan. Add the stock, grape or cherry tomatoes, and the olives. Bring to the boil. Reduce the heat, cover and simmer for 20 minutes. Uncover and simmer for a further 20 minutes or until the liquid has reduced and sauce has thickened. Stir in the chopped oregano. Season.",
      "Divide the chicken cacciatore among serving bowls and scatter with extra oregano sprigs. Serve with sourdough, if you like."
    ]
  }
};
