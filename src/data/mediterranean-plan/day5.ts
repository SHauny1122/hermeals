import { MediterraneanDayPlan } from './types';

export const mediterraneanDayFive: MediterraneanDayPlan = {
  breakfast: {
    name: "Our favourite bircher muesli recipe",
    description: "The whole family will love this sweet and tasty breakfast idea.",
    prepTime: "1 hour 10 minutes",
    servings: 2,
    ingredients: [
      { name: "Gala apple", amount: "1", unit: "whole", notes: "unpeeled, quartered, core removed" },
      { name: "Rolled oats", amount: "90", unit: "g", notes: "1 cup" },
      { name: "Apple juice", amount: "125", unit: "ml", notes: "1/2 cup" },
      { name: "Fat-free natural yoghurt", amount: "130", unit: "g", notes: "1/2 cup" },
      { name: "Ground cinnamon", amount: "1", unit: "pinch", notes: "large" },
      { name: "Flaked almonds", amount: "25", unit: "g", notes: "1/4 cup" },
      { name: "Walnuts", amount: "30", unit: "g", notes: "1/4 cup" },
      { name: "Pepitas", amount: "2", unit: "tablespoons", notes: "pumpkin seeds" },
      { name: "Blueberries", amount: "1/2", unit: "cup", notes: "to serve" }
    ],
    instructions: [
      "Coarsely grate the apple. Mix the grated apple, rolled oats, apple juice, yoghurt and cinnamon in a bowl until well combined. Cover and place in the fridge for 1 hour or overnight.",
      "Combine the flaked almonds, walnuts and pepitas in a small bowl.",
      "Stir half the nut mixture through the muesli with an extra 1/2 cup yoghurt if the muesli has been soaking overnight. (If the muesli has been soaking for 1 hour, add a little extra yoghurt only as desired.) Top with the remaining nut mixture and blueberries to serve."
    ]
  },
  morningSnack: {
    name: "Spicy mixed nuts",
    description: "Keep the in-between meal munchies away with a handful of spicy mixed nuts.",
    prepTime: "5 minutes",
    cookTime: "20 minutes",
    servings: 8,
    ingredients: [
      { name: "Raw whole unsalted cashew nuts", amount: "200", unit: "g", notes: "1 1/3 cups" },
      { name: "Blanched almonds", amount: "130", unit: "g", notes: "3/4 cup" },
      { name: "Olive oil", amount: "1 1/2", unit: "teaspoons" },
      { name: "Ground cumin", amount: "1", unit: "teaspoon" },
      { name: "Ground coriander", amount: "1", unit: "teaspoon" },
      { name: "Garlic powder", amount: "1/2", unit: "teaspoon" },
      { name: "Chilli powder", amount: "1/4", unit: "teaspoon" }
    ],
    instructions: [
      "Preheat oven to 160°C. Line a tray with non-stick baking paper. Place cashews, almonds and oil in a bowl and combine.",
      "Combine ground cumin, coriander, garlic and chilli powder in a small bowl. Add the spice mix to the nuts and toss until coated. Spread nuts, in a single layer, on the tray.",
      "Cook in preheated oven, stirring occasionally, for 15-20 minutes or until toasted and aromatic.",
      "Remove from oven and allow to cool."
    ]
  },
  lunch: {
    name: "Green bean and mackerel salad",
    description: "Holy mackerel, this fish dish is super tasty and has some amazing nutritional benefits too.",
    prepTime: "10 minutes",
    cookTime: "5 minutes",
    servings: 2,
    ingredients: [
      { name: "Green beans", amount: "170", unit: "g", notes: "trimmed, thinly sliced" },
      { name: "Extra virgin olive oil", amount: "1", unit: "tablespoon" },
      { name: "Lemon juice", amount: "2", unit: "teaspoons" },
      { name: "Dijon mustard", amount: "1", unit: "teaspoon" },
      { name: "Mackerel fillets in spicy tomato sauce", amount: "230", unit: "g", notes: "2 x 115g cans" },
      { name: "Fresh parsley leaves", amount: "1/3", unit: "cup" },
      { name: "Dill sprigs", amount: "2-3", unit: "sprigs", notes: "to serve" },
      { name: "Lemon cheeks", amount: "2", unit: "pieces", notes: "to serve" }
    ],
    instructions: [
      "Cook beans in a medium saucepan of boiling water for 3 minutes or until tender-crisp. Drain.",
      "Meanwhile, combine the olive oil, lemon juice and mustard in a small bowl.",
      "Toss the olive oil mixture through the beans and add mackerel fillets. Toss through parsley. Season. Serve with dill and lemon cheeks."
    ]
  },
  afternoonSnack: {
    name: "Apple with ricotta and honey",
    description: "A simple, healthy sweet snack",
    ingredients: [
      { name: "Apple", amount: "1", unit: "whole", notes: "sliced" },
      { name: "Ricotta cheese", amount: "2", unit: "tablespoons" },
      { name: "Honey", amount: "1", unit: "teaspoon", notes: "to drizzle" }
    ]
  },
  dinner: {
    name: "Vegan bolognaise",
    description: "A plant-based version of the classic Italian pasta sauce",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 6,
    ingredients: [
      { name: "Olive oil", amount: "2", unit: "tablespoons" },
      { name: "Brown onion", amount: "1", unit: "whole", notes: "finely chopped" },
      { name: "Carrot", amount: "1", unit: "whole", notes: "peeled, finely chopped" },
      { name: "Celery stick", amount: "1", unit: "whole", notes: "finely chopped" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "crushed" },
      { name: "Swiss brown mushrooms", amount: "200", unit: "g", notes: "chopped" },
      { name: "Eggplant", amount: "1", unit: "medium", notes: "cut into 1cm pieces" },
      { name: "Tomato paste", amount: "2", unit: "tablespoons" },
      { name: "Diced tomatoes", amount: "400", unit: "g", notes: "canned" },
      { name: "Vegetable stock", amount: "250", unit: "ml", notes: "1 cup" },
      { name: "Dried Italian herbs", amount: "2", unit: "teaspoons" },
      { name: "Balsamic vinegar", amount: "3", unit: "teaspoons" },
      { name: "Maple syrup", amount: "2", unit: "teaspoons" },
      { name: "Brown lentils", amount: "400", unit: "g", notes: "canned, drained, rinsed" },
      { name: "Spaghetti", amount: "500", unit: "g", notes: "to serve" },
      { name: "Vegan cheese", amount: "1/2", unit: "cup", notes: "finely shredded, optional" }
    ],
    gremolata: [
      { name: "Fresh continental parsley", amount: "1/4", unit: "cup", notes: "finely chopped" },
      { name: "Lemon rind", amount: "1", unit: "whole", notes: "finely grated" },
      { name: "Dried chilli flakes", amount: "1", unit: "pinch", notes: "to taste" }
    ],
    instructions: [
      "Heat the oil in a large deep frying pan over medium-low heat. Add the onion, carrot and celery and cook, stirring often, for 10 minutes or until soft and lightly coloured. Add the garlic and stir for 1 minute or until aromatic. Add the mushroom and eggplant and cook, stirring occasionally, for 5 minutes or until softened.",
      "Add the tomato paste and stir to coat. Stir in the tomatoes, stock and herbs. Cover and bring to a simmer. Cook for 10 minutes or until thickened slightly. Stir in the balsamic vinegar and maple syrup. Add the lentils and stir until heated through. Season.",
      "To make the gremolata, combine the parsley, lemon rind and chilli flakes in a small bowl.",
      "Serve the sauce with spaghetti, sprinkled with the gremolata and vegan cheese, if you like."
    ]
  }
};
