import { MediterraneanDayPlan } from './types';

export const mediterraneanDaySeven: MediterraneanDayPlan = {
  breakfast: {
    name: "Breakfast quinoa salad",
    description: "Kickstart your healthy new year routine with this healthy brekkie wonder.",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    ingredients: [
      { name: "Quinoa", amount: "135", unit: "g", notes: "2/3 cup, rinsed, drained" },
      { name: "Water", amount: "330", unit: "ml", notes: "1 1/3 cups" },
      { name: "Navel oranges", amount: "2", unit: "whole" },
      { name: "Ground cinnamon", amount: "1/2", unit: "teaspoon", notes: "plus extra to serve" },
      { name: "Pepitas", amount: "2", unit: "tablespoons" },
      { name: "Natural almonds", amount: "2", unit: "tablespoons", notes: "chopped" },
      { name: "Fresh blueberries", amount: "125", unit: "g" },
      { name: "Natural yoghurt", amount: "190", unit: "g", notes: "2/3 cup, to serve (optional)" }
    ],
    instructions: [
      "Place the quinoa and water in a saucepan over medium-high heat. Bring to the boil. Reduce heat to low and simmer, covered, for 12 minutes or until the water has evaporated and the quinoa is just tender. Transfer to a large bowl and set aside to cool.",
      "Peel and segment the oranges over a bowl, reserving the juice, and add the orange segments, juice, cinnamon, pepitas, almonds and half of the blueberries to the cooked quinoa. Stir to combine.",
      "Divide quinoa among bowls. Top with remaining blueberries. Dollop with yoghurt, if using. Sprinkle with the extra cinnamon."
    ]
  },
  morningSnack: {
    name: "Greek yoghurt with banana",
    description: "A simple, protein-rich breakfast with natural sweetness",
    ingredients: [
      { name: "Greek yoghurt", amount: "125", unit: "g" },
      { name: "Banana", amount: "1", unit: "small", notes: "sliced" }
    ]
  },
  lunch: {
    name: "Turkish zucchini and haloumi bake",
    description: "Big on flavour, low on fuss! You can have this Turkish-inspired bake in the oven in less than 20 minutes, then it's just a matter of waiting for the haloumi and zucchini filling to set and the top to turn golden and caramelised.",
    prepTime: "10 minutes",
    cookTime: "40 minutes",
    servings: 6,
    ingredients: [
      { name: "Red onion", amount: "1", unit: "large" },
      { name: "Fresh dill sprigs", amount: "1/3", unit: "cup", notes: "plus extra to serve" },
      { name: "Fresh mint leaves", amount: "1/3", unit: "cup", notes: "plus extra to serve" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tablespoons" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "crushed" },
      { name: "Lemon", amount: "1", unit: "whole", notes: "rind finely grated, cut into wedges" },
      { name: "Zucchini", amount: "500", unit: "g", notes: "coarsely grated, excess moisture removed" },
      { name: "Haloumi", amount: "225", unit: "g", notes: "coarsely grated" },
      { name: "Eggs", amount: "6", unit: "whole" },
      { name: "Spelt flour", amount: "125", unit: "g", notes: "3/4 cup" },
      { name: "Baking powder", amount: "1", unit: "teaspoon" },
      { name: "Pine nuts", amount: "1", unit: "tablespoon" },
      { name: "Sumac", amount: "1", unit: "teaspoon" },
      { name: "Sesame seeds", amount: "1", unit: "teaspoon" },
      { name: "Dried mint leaves", amount: "3/4", unit: "teaspoon" },
      { name: "Turkish bread", amount: "1", unit: "loaf", notes: "toasted, to serve (optional)" },
      { name: "Greek yoghurt", amount: "1/2", unit: "cup", notes: "to serve (optional)" }
    ],
    instructions: [
      "Preheat oven to 190C/170C fan forced. Grease and line the base and sides of an 18.5cm (base measurement) square cake pan.",
      "Thinly slice one-third of the onion into rings and reserve. Finely chop remaining onion. Reserve 1 tbs of the dill sprigs and 1 tbs mint leaves. Chop remaining dill and mint.",
      "Heat 1 tbs of the oil in a frying pan over medium-low heat. Add chopped onion, garlic and lemon rind. Cook, stirring, for 3 minutes or until soft. Transfer to a large bowl. Add zucchini, haloumi and chopped herbs.",
      "Whisk eggs and remaining oil in a bowl. Sift over flour and baking powder. Whisk until smooth and combined. Season. Add to zucchini mixture. Stir until combined. Spoon into prepared pan. Top with reserved onion rings, dill and mint.",
      "Combine pine nuts, sumac, sesame seeds and dried mint in a bowl and sprinkle over cake. Bake for 40-42 minutes or until set. Stand in pan for 10 minutes. Serve with lemon wedges, extra dill and mint, Turkish bread and yoghurt, if desired."
    ]
  },
  afternoonSnack: {
    name: "Marinated olives",
    description: "These highly savoury marinated olives are perfect as a starter or snack.",
    prepTime: "4 hours 10 minutes",
    servings: 8,
    servingNotes: "Serve with wholemeal pita bread",
    ingredients: [
      { name: "Black olives", amount: "160", unit: "g", notes: "1 cup" },
      { name: "Green olives", amount: "160", unit: "g", notes: "1 cup" },
      { name: "Lemon rind", amount: "2", unit: "strips", notes: "thinly sliced" },
      { name: "Orange rind", amount: "2", unit: "strips", notes: "thinly sliced" },
      { name: "Garlic cloves", amount: "2", unit: "whole", notes: "thinly sliced" },
      { name: "Green onion", amount: "1", unit: "whole", notes: "finely chopped" },
      { name: "Extra-virgin olive oil", amount: "1/4", unit: "cup" },
      { name: "Fresh thyme sprigs", amount: "2", unit: "whole" }
    ],
    instructions: [
      "Place olives, lemon rind, orange rind, garlic, onion, oil, and thyme in a bowl. Set aside for 4 hours, stirring occasionally, to allow flavours to develop. Serve."
    ]
  },
  dinner: {
    name: "Sumac-coated fish with green bean, lentil & parsley salad",
    description: "A Mediterranean-inspired fish dish with a fresh and zesty salad.",
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    servings: 4,
    ingredients: [
      { name: "White fish fillets", amount: "4", unit: "pieces", notes: "skinless, deboned (such as blue-eye or snapper)" },
      { name: "Extra virgin olive oil", amount: "60", unit: "ml", notes: "1/4 cup, plus extra to brush" },
      { name: "Sumac", amount: "2", unit: "tablespoons" },
      { name: "Lemon juice", amount: "60", unit: "ml", notes: "1/4 cup, plus lemon wedges to serve" },
      { name: "Red wine vinegar", amount: "60", unit: "ml", notes: "1/4 cup" },
      { name: "Green beans", amount: "250", unit: "g", notes: "thin, trimmed, cut into 3cm lengths" },
      { name: "Brown lentils", amount: "400", unit: "g", notes: "canned, rinsed, drained" },
      { name: "Celery stalks", amount: "3", unit: "whole", notes: "thinly sliced on an angle" },
      { name: "Flat-leaf parsley", amount: "1/2", unit: "cup", notes: "roughly chopped" }
    ],
    instructions: [
      "Brush the fish fillets with a little olive oil, then coat in the sumac. Set aside.",
      "Combine the lemon juice, red wine vinegar and 2 tablespoons olive oil in a large bowl. Season to taste with sea salt and freshly ground black pepper.",
      "Blanch the beans in boiling salted water for 2 minutes or until tender. Drain and refresh under cold running water, then pat dry with paper towel. Place in the bowl with the dressing, lentils, celery and parsley and toss.",
      "Heat the remaining 1 tablespoon oil in a large non-stick frypan over medium heat. Add the fish and cook for 2-3 minutes, then turn and cook for a further 2-3 minutes until cooked through.",
      "Divide the salad among serving plates, then top with the fish fillets. Serve with lemon wedges to squeeze over."
    ]
  }
};
