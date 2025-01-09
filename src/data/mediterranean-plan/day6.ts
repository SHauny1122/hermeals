import { MediterraneanDayPlan } from './types';

export const mediterraneanDaySix: MediterraneanDayPlan = {
  breakfast: {
    name: "Saganaki eggs",
    description: "For a hearty breakfast or brunch, try our saganaki eggs, complete with fetta, garlic and tomatoes.",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    servings: 4,
    ingredients: [
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons" },
      { name: "Red onion", amount: "1", unit: "medium", notes: "finely chopped" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "crushed" },
      { name: "Dried chilli flakes", amount: "1/4", unit: "teaspoon" },
      { name: "Cherry tomatoes", amount: "800", unit: "g", notes: "2 x 400g cans in juice" },
      { name: "Dried oregano leaves", amount: "1", unit: "teaspoon" },
      { name: "Eggs", amount: "8", unit: "whole" },
      { name: "Fetta", amount: "60", unit: "g", notes: "crumbled" },
      { name: "Fresh flat-leaf parsley leaves", amount: "1/4", unit: "cup" },
      { name: "Crusty bread", amount: "8", unit: "slices", notes: "toasted" }
    ],
    instructions: [
      "Heat the oil in a large deep frying pan over medium-high heat. Cook onion, garlic and chilli, stirring, for 5 minutes or until softened. Add the tomatoes, 1/2 cup water and oregano. Bring to the boil. Reduce heat to low. Simmer, uncovered, for 15 minutes or until sauce thickens.",
      "Using a large spoon, make 8 holes in tomato mixture. Crack 1 egg into each hole. Cover pan. Cook for 3 to 4 minutes or until eggs are cooked to your liking.",
      "Sprinkle with fetta and parsley. Serve with bread."
    ]
  },
  morningSnack: {
    name: "Wholegrain crackers with nut butter",
    description: "A simple, protein-rich snack",
    ingredients: [
      { name: "Wholegrain crackers", amount: "2", unit: "pieces" },
      { name: "Nut butter", amount: "2", unit: "teaspoons", notes: "of your choice" }
    ]
  },
  lunch: {
    name: "Warm chicken and lentil salad",
    description: "Take a takeaway chook and whip up this simple, yet satisfying low-fat salad.",
    prepTime: "20 minutes",
    cookTime: "10 minutes",
    servings: 4,
    ingredients: [
      { name: "Barbecue chicken", amount: "1", unit: "large" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "finely chopped" },
      { name: "Baby roma tomatoes", amount: "250", unit: "g", notes: "halved" },
      { name: "Lentils", amount: "800", unit: "g", notes: "2 x 400g cans, drained, rinsed" },
      { name: "White balsamic dressing", amount: "2", unit: "tablespoons" },
      { name: "Baby spinach", amount: "100", unit: "g" }
    ],
    instructions: [
      "Remove and discard skin and bones from chicken. Thickly shred chicken, then chop.",
      "Heat oil in a large frying pan over medium-high heat. Add garlic. Cook for 2 minutes or until fragrant. Add chicken and tomatoes. Cook, stirring, for 3 minutes or until warmed through.",
      "Add lentils and dressing. Toss gently for 1 to 2 minutes or until heated through and well combined. Serve chicken mixture on spinach. Season with pepper. Serve."
    ]
  },
  afternoonSnack: {
    name: "Traditional fruit salad",
    description: "Make the most of seasonal fruits in this traditional fruit salad.",
    prepTime: "15 minutes",
    servings: 4,
    ingredients: [
      { name: "Pineapple", amount: "600", unit: "g", notes: "peeled, chopped" },
      { name: "Rockmelon", amount: "800", unit: "g", notes: "chopped" },
      { name: "Seedless watermelon", amount: "800", unit: "g", notes: "chopped" },
      { name: "Strawberries", amount: "250", unit: "g", notes: "hulled, quartered" },
      { name: "Seedless green grapes", amount: "200", unit: "g" },
      { name: "Seedless red grapes", amount: "200", unit: "g" },
      { name: "Passionfruit", amount: "4", unit: "whole", notes: "halved" },
      { name: "Lime juice", amount: "1", unit: "tablespoon" }
    ],
    instructions: [
      "Place pineapple, rockmelon, watermelon, strawberries, grapes, passionfruit pulp and lime juice in a large glass or ceramic bowl. Toss to combine. Serve."
    ]
  },
  dinner: {
    name: "Buckwheat tabouli with dukkah lamb",
    description: "A Mediterranean-inspired dish combining nutty buckwheat with aromatic dukkah-crusted lamb.",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    ingredients: [
      { name: "Raw buckwheat", amount: "150", unit: "g", notes: "3/4 cup" },
      { name: "Lemon", amount: "1", unit: "whole", notes: "rind finely grated, juiced" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons" },
      { name: "White balsamic vinegar", amount: "1", unit: "tablespoon" },
      { name: "Garlic clove", amount: "1", unit: "whole", notes: "crushed" },
      { name: "Lamb backstraps", amount: "480", unit: "g", notes: "2 pieces" },
      { name: "Dukkah", amount: "2", unit: "tablespoons" },
      { name: "Fresh mixed herbs", amount: "3", unit: "cups", notes: "firmly packed (mint, coriander, parsley)" },
      { name: "Cherry tomatoes", amount: "200", unit: "g", notes: "quartered" },
      { name: "Red onion", amount: "1/2", unit: "small", notes: "finely chopped" }
    ],
    instructions: [
      "Bring a saucepan of water to the boil over high heat. Add buckwheat. Reduce heat to medium-low and simmer for 5-6 minutes or until al dente. Drain and refresh under cold running water. Spread over a tray lined with paper towel to dry.",
      "Meanwhile, place the lemon rind, juice, oil, vinegar and garlic in a screw-top jar. Season and shake to combine.",
      "Heat a non-stick frying pan over medium heat. Spray lamb with olive oil, then season. Cook, turning, for 6-8 minutes for medium or until cooked to your liking. Transfer to a plate. Set aside to rest for 4 minutes. Spread dukkah on a plate. Press lamb into dukkah to coat. Slice lamb.",
      "Finely chop three-quarters of the herbs. Combine buckwheat, herbs, tomato, onion and half the dressing in a bowl. Serve with lamb. Drizzle with remaining dressing."
    ]
  }
};
