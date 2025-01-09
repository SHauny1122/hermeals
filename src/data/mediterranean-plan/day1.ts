import { MediterraneanDayPlan } from './types';

export const mediterraneanDayOne: MediterraneanDayPlan = {
  breakfast: {
    name: "Citrus and berry salad with yoghurt and seed sprinkle",
    description: "Start the day with this healthy breakfast salad, full of fresh ingredients including raspberries, strawberries and orange. It's also gluten-free and low in fat and calories.",
    prepTime: "5 minutes",
    servings: 1,
    ingredients: [
      { name: "Pepitas", amount: "2", unit: "teaspoons" },
      { name: "Sunflower seeds", amount: "2", unit: "teaspoons" },
      { name: "Natural almonds", amount: "2", unit: "teaspoons", notes: "chopped" },
      { name: "Orange", amount: "1", unit: "small", notes: "peeled, white pith removed, sliced" },
      { name: "Fresh raspberries", amount: "60", unit: "g" },
      { name: "Strawberries", amount: "60", unit: "g", notes: "hulled, halved" },
      { name: "Natural yoghurt", amount: "125", unit: "g", notes: "1/2 cup" }
    ],
    instructions: [
      "Combine pepitas, sunflower seeds and almonds.",
      "Arrange orange, raspberries and strawberries in a bowl. Top with yoghurt and sprinkle with the seed mixture."
    ]
  },
  morningSnack: {
    name: "Cranberry and orange no-cook slice",
    description: "For a high fibre lunch box snack, try these easy cranberry and orange slices – no baking required.",
    prepTime: "4 hours 20 minutes",
    servings: 20,
    ingredients: [
      { name: "Medjool dates", amount: "454", unit: "g", notes: "pitted" },
      { name: "Orange juice", amount: "1/2", unit: "cup" },
      { name: "Orange rind", amount: "2", unit: "teaspoons", notes: "finely grated" },
      { name: "Honey", amount: "2", unit: "tablespoons" },
      { name: "Ground cinnamon", amount: "1/2", unit: "teaspoon" },
      { name: "Cacao powder", amount: "1", unit: "tablespoon" },
      { name: "Pepita and sunflower seed mix", amount: "1 1/4", unit: "cups" },
      { name: "Traditional rolled oats", amount: "4", unit: "cups" },
      { name: "Coconut flakes", amount: "1", unit: "cup" },
      { name: "Dried cranberries", amount: "1/2", unit: "cup" }
    ],
    instructions: [
      "Grease a 20cm x 30cm lamington pan. Line base and sides with baking paper, extending paper 2cm above edges of pan.",
      "Place dates, orange juice and rind, honey, cinnamon and cacao in a food processor. Add 1 cup seed mix, 2 cups oats and 3/4 cup coconut. Process until mixture is finely chopped and comes together.",
      "Transfer to a bowl. Reserve 1 tablespoon cranberries. Add remaining cranberries and oats to date mixture. Stir until well combined.",
      "Press mixture evenly into prepared pan. Sprinkle with remaining seed mix, coconut and reserved cranberries, pressing firmly to secure.",
      "Refrigerate for 4 hours or overnight until firm.",
      "Remove slice from pan and transfer to a board. Cut into 20 slices. Serve."
    ]
  },
  lunch: {
    name: "Healthy zucchini superfood slice",
    description: "This healthy version of the family-favourite zucchini slice is loaded with quinoa, zucchini and kale, and makes a perfect vegetarian dinner or lunchbox filler.",
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 6,
    ingredients: [
      { name: "Olive oil", amount: "2", unit: "teaspoons" },
      { name: "Brown onion", amount: "1", unit: "whole", notes: "finely chopped" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "crushed" },
      { name: "Carrots", amount: "2", unit: "whole", notes: "trimmed, coarsely grated" },
      { name: "Chopped Kale", amount: "150", unit: "g" },
      { name: "Eggs", amount: "8", unit: "whole" },
      { name: "Reduced-fat ricotta cheese", amount: "85", unit: "g", notes: "1/3 cup" },
      { name: "Zucchini", amount: "3", unit: "whole", notes: "finely grated, squeezed of excess moisture" },
      { name: "Fresh continental parsley", amount: "2", unit: "tablespoons", notes: "chopped" },
      { name: "Cooked quinoa", amount: "150", unit: "g", notes: "1 cup" },
      { name: "Grape tomatoes", amount: "200", unit: "g", notes: "halved" }
    ],
    instructions: [
      "Preheat oven to 180/160C fan-forced. Lightly spray a 20 x 30cm baking pan with oil and line the base with baking paper, allowing the 2 long sides to overhang.",
      "Heat the oil in a large non-stick frying pan over medium heat. Add the onion and cook, stirring often, for 3-4 minutes or until softened.",
      "Add the garlic and carrot and cook, stirring, for 1 minute or until garlic is aromatic.",
      "Add the kale and cook, stirring, for 3 minutes or until wilted. Season and set aside for 5 minutes to cool slightly.",
      "Whisk the eggs and ricotta together in a large bowl. Add the cooled vegetables, zucchini, parsley and quinoa. Season.",
      "Spoon the mixture into the prepared pan. Top with tomatoes, cut side up.",
      "Bake for 25-30 minutes or until golden and puffed and firm to the touch.",
      "Set aside for 10 minutes, to cool, before cutting into 6 slices."
    ],
    servingNote: "Serve with a slice of wholegrain sourdough bread, drizzled with 1 teaspoon extra virgin olive oil"
  },
  afternoonSnack: {
    name: "Wholegrain crackers with toppings",
    description: "2 wholegrain crackers topped with tzatziki or hummus, tomato (sliced) & fresh basil",
    ingredients: [
      { name: "Wholegrain crackers", amount: "2", unit: "pieces" },
      { name: "Tzatziki or hummus", amount: "2", unit: "tablespoons" },
      { name: "Tomato", amount: "1", unit: "medium", notes: "sliced" },
      { name: "Fresh basil", amount: "2-3", unit: "leaves" }
    ]
  },
  dinner: {
    name: "Radish, rocket and mint salad with salmon",
    description: "Fresh dill sprigs are the perfect topping for this gorgeous salmon, radish and rocket salad.",
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    servings: 4,
    ingredients: [
      { name: "Frozen broad beans", amount: "300", unit: "g", notes: "2 cups" },
      { name: "Salmon fillets", amount: "4", unit: "pieces", notes: "skin on" },
      { name: "Italian White Wine Vinegar", amount: "2", unit: "tablespoons" },
      { name: "Olive oil", amount: "60", unit: "ml", notes: "1/4 cup" },
      { name: "Dijon mustard", amount: "1", unit: "teaspoon" },
      { name: "Honey", amount: "2", unit: "teaspoons" },
      { name: "Dill", amount: "2", unit: "tablespoons", notes: "coarsely chopped" },
      { name: "Baby Rocket", amount: "120", unit: "g" },
      { name: "Radishes", amount: "6", unit: "whole", notes: "trimmed, thinly sliced" },
      { name: "Mint leaves", amount: "1/2", unit: "cup" },
      { name: "Red onion", amount: "1", unit: "whole", notes: "thinly sliced" },
      { name: "Fetta", amount: "100", unit: "g", notes: "crumbled" }
    ],
    instructions: [
      "Cook the broad beans in a large saucepan of boiling water for 2 mins or until heated through. Refresh under cold water. Drain well. Peel broad beans and place in a large bowl.",
      "Season the salmon. Heat a large frying pan over medium-high heat. Add the salmon and cook for 3 mins each side for medium or until cooked to your liking. Transfer to a plate and cover with foil. Set aside for 5 mins to rest.",
      "Place the vinegar, oil, mustard, honey and dill in a screw-top jar and shake until well combined. Season.",
      "Add the rocket, radish, mint and onion to the broad beans in the bowl. Drizzle with the dressing and toss to combine.",
      "Divide the salad among serving plates and sprinkle with fetta. Serve with the salmon."
    ]
  }
};
