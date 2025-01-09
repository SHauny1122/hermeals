import { MediterraneanDayPlan } from './types';

export const mediterraneanDayTwo: MediterraneanDayPlan = {
  breakfast: {
    name: "Breakfast bruschetta",
    description: "Prefer a light breakfast? Start your day with this fresh and cheerful bruschetta.",
    prepTime: "5 minutes",
    cookTime: "2 minutes",
    servings: 4,
    ingredients: [
      { name: "Avocado", amount: "1", unit: "large", notes: "firm ripe, stone removed, peeled, diced" },
      { name: "Cherry tomatoes", amount: "250", unit: "g", notes: "halved" },
      { name: "Fresh basil leaves", amount: "1/4", unit: "cup", notes: "torn" },
      { name: "Olive oil", amount: "2", unit: "teaspoons" },
      { name: "Lemon juice", amount: "1", unit: "teaspoon" },
      { name: "Sourdough bread", amount: "4", unit: "slices", notes: "large" },
      { name: "Lemon wedges", amount: "4", unit: "pieces", notes: "to serve" }
    ],
    instructions: [
      "Place avocado, tomatoes, basil, olive oil and lemon juice in a medium size bowl. Season with sea salt and freshly ground black pepper. Gently stir to combine.",
      "Toast or grill bread until golden. To serve, spoon ¼ of the avocado mixture over each slice of bread. Serve with a wedge of lemon."
    ]
  },
  morningSnack: {
    name: "Healthier zucchini and feta muffins",
    description: "These easy zucchini muffins are made with ricotta and reduced-fat feta so they're still super-cheesy but are way better for you. Pop them in the lunchbox for a great snack or light lunch.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    servings: 12,
    ingredients: [
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons" },
      { name: "Green shallots", amount: "3", unit: "whole", notes: "trimmed, thinly sliced" },
      { name: "Garlic clove", amount: "1", unit: "whole", notes: "crushed" },
      { name: "Lemon rind", amount: "1", unit: "teaspoon", notes: "finely grated" },
      { name: "Zucchini", amount: "2", unit: "whole", notes: "trimmed" },
      { name: "Wholemeal self-raising flour", amount: "320", unit: "g", notes: "2 cups" },
      { name: "Cayenne pepper", amount: "1", unit: "pinch" },
      { name: "Buttermilk", amount: "375", unit: "ml", notes: "1 1/2 cups" },
      { name: "Low-fat fresh ricotta", amount: "125", unit: "g", notes: "1/2 cup" },
      { name: "Eggs", amount: "2", unit: "whole" },
      { name: "Reduced-fat feta", amount: "125", unit: "g", notes: "crumbled" }
    ],
    instructions: [
      "Preheat the oven to 190C/170C fan forced. Lightly grease twelve 80ml (1/3 cup) muffin pans.",
      "Combine the oil, shallot and garlic in a small frying pan. Heat gently over low heat until the oil just starts to bubble and the shallot has softened slightly. Transfer to a bowl (with all the oil). Stir in the lemon rind and set aside to cool.",
      "Use a julienne peeler to cut the zucchini into long thin strips (or coarsely grate).",
      "Place the flour in a large bowl, add the cayenne pepper and season with salt. Make a well in the centre. Whisk the buttermilk, ricotta and eggs together in a jug until smooth. Pour the milk mixture and shallot mixture into the well and stir until just combined. Fold in nearly all the zucchini and feta, reserving a little of both to decorate the tops of the muffins.",
      "Divide the mixture among the prepared pans (they will be very full) and top with the reserved zucchini and feta. Bake for 30-35 minutes or until the muffins spring back when gently touched. Set aside for 5 minutes to cool slightly. Use a flat-bladed knife to gently loosen each muffin and remove from the pan. Eat warm or at room temperature."
    ]
  },
  lunch: {
    name: "Chicken rainbow wraps",
    description: "Looking for new work lunch ideas? Wrap up this colourful chicken salad in wholemeal mountain bread for a tasty, filling meal.",
    prepTime: "10 minutes",
    servings: 1,
    ingredients: [
      { name: "Wholemeal mountain bread wrap", amount: "1", unit: "piece" },
      { name: "Hommus", amount: "2", unit: "tablespoons" },
      { name: "Fresh uncooked beetroot", amount: "1/4", unit: "cup", notes: "coarsely grated" },
      { name: "Carrot", amount: "1/4", unit: "cup", notes: "coarsely grated" },
      { name: "Tasty cheese", amount: "2", unit: "tablespoons", notes: "grated" },
      { name: "Barbecued chicken", amount: "1/3", unit: "cup", notes: "shredded" },
      { name: "Baby spinach leaves", amount: "1/2", unit: "cup" }
    ],
    instructions: [
      "Spread wrap with the hommus. Place beetroot, carrot, cheese, chicken and spinach along one edge of the wrap. Roll up to enclose filling."
    ]
  },
  afternoonSnack: {
    name: "Greek yoghurt with berries",
    description: "A simple, healthy afternoon snack",
    ingredients: [
      { name: "Greek yoghurt", amount: "150", unit: "g" },
      { name: "Fresh berries", amount: "1/2", unit: "cup" }
    ]
  },
  dinner: {
    name: "Couscous, herb & seed stuffed vegetables",
    description: "Create an exciting side dish or main as you eat a rainbow of colour and flavour.",
    prepTime: "20 minutes",
    cookTime: "50 minutes",
    servings: 4,
    ingredients: [
      { name: "Extra virgin olive oil", amount: "2", unit: "teaspoons" },
      { name: "Onion", amount: "1", unit: "whole", notes: "finely chopped" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "crushed" },
      { name: "No-added-salt tomato paste", amount: "2", unit: "tablespoons" },
      { name: "Finely Chopped Tomatoes", amount: "800", unit: "g", notes: "2 x 400g cans" },
      { name: "Water", amount: "60", unit: "ml", notes: "1/4 cup" },
      { name: "Couscous", amount: "190", unit: "g", notes: "1 cup" },
      { name: "Boiling water", amount: "250", unit: "ml", notes: "1 cup" },
      { name: "Truss tomatoes", amount: "2", unit: "whole", notes: "chopped" },
      { name: "Fresh herbs", amount: "1/4", unit: "cup", notes: "chives and parsley, chopped" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Seed Mix", amount: "45", unit: "g", notes: "1/4 cup" },
      { name: "Currants", amount: "2", unit: "tablespoons" },
      { name: "Feta", amount: "50", unit: "g", notes: "crumbled" },
      { name: "Zucchini", amount: "4", unit: "whole", notes: "about 850g, halved lengthways" },
      { name: "Red capsicums", amount: "2", unit: "large", notes: "halved, deseeded" },
      { name: "Baby herbs", amount: "1", unit: "handful", notes: "to serve" }
    ],
    instructions: [
      "Preheat oven to 180C/160C fan forced. Heat oil in saucepan over medium heat. Cook onion, stirring, for 5 minutes or until soft. Add garlic. Cook for 30 seconds or until aromatic. Add tomato paste. Cook, stirring, for 1 minute. Stir in tomato and water. Bring to boil. Reduce heat to low. Simmer for 10 minutes or until thickened. Season. Spread over a baking dish.",
      "Place couscous in a heatproof bowl. Add boiling water. Stir. Cover with plastic wrap. Set aside for 4 minutes to absorb. Fluff with a fork. Add tomato, herbs, garam masala, seed mix, currants and feta. Stir to combine.",
      "Scoop out zucchini flesh, leaving 1cm shell. Fill zucchini and capsicum with couscous mixture. Place in dish. Cover with foil. Bake for 30 minutes or until vegies are almost tender. Remove foil. Bake for 5-10 minutes or until light golden. Sprinkle with herbs."
    ]
  }
};
