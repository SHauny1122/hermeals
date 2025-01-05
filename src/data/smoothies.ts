export interface Smoothie {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  prepTime: string;
  yield: string;
}

export const smoothies: Record<string, Smoothie> = {
  'almond-coconut': {
    id: 'almond-coconut',
    name: 'Almond Coconut Shake',
    description: 'Low calorie almond extract is a must to give this shake a cake-like flavor that\'s irresistible. Almonds and coconut pack in plenty of fiber that helps control blood sugar to burn fat more effectively.',
    ingredients: [
      '1 serving DietFuel',
      '₁∕₃ cup unsweetened shredded coconut',
      '3 tablespoons butter, room temperature',
      '1 tablespoon chopped almonds',
      '½ teaspoon almond extract',
      '1 teaspoon chopped or shaved 85% chocolate'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/almond-coconut-shake.jpg.jpeg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'apple-strudel': {
    id: 'apple-strudel',
    name: 'Apple Strudel Shake',
    description: 'Cinnamon, apples and walnuts make this fragrant breakfast treat smell like a freshly baked strudel. For spice lovers, add an additional pinch of ground clove or pumpkin pie spice.',
    ingredients: [
      '1 serving Diet Fuel',
      '₁∕₃ cup chopped apple, chopped, peel on',
      '½ cup unsweetened, plain almond milk',
      '½ cup canned full-fat coconut milk',
      '4 ice cubes',
      '2 teaspoons stevia',
      '½ teaspoon cinnamon',
      '1 tablespoon chia seed',
      '2 tablespoons chopped walnut',
      '½ teaspoon vanilla extract',
      'Pinch of ground clove or pumpkin pie spice (optional)'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.',
      'Process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/apple-strudel-shake.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'berry-breakfast': {
    id: 'berry-breakfast',
    name: 'Berry Breakfast Shake',
    description: 'This may soon become one of your favorite shake recipes. The cocoa powder is rich in antioxidants and will help you with any chocolate cravings. The grass-fed butter will help keep you full until your next meal!',
    ingredients: [
      '1 serving Diet Fuel',
      '6-8 ice cubes',
      '8 ounces unsweetened almond milk or water',
      '2 tablespoons cocoa powder (or cacao powder)',
      '½ cup blueberries and raspberries',
      '¼ cup almonds',
      '½ tablespoon vanilla',
      '¼ stick grass-fed butter',
      '5-6 shakes cinnamon'
    ],
    instructions: [
      'Place all ingredients in a blender.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/berry-breakfast-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'beta-beautiful': {
    id: 'beta-beautiful',
    name: 'Beta Beautiful Shake',
    description: 'Packing in your veggies for breakfast might seem counter intuitive, but mild tasting spinach is easy to blend into this rich tasting smoothie made with pistachio nuts. Mint adds a wonderful aroma and stores well in your crisper drawer for up to one week.',
    ingredients: [
      '1 serving Diet Fuel',
      '1 ½ cups spinach',
      '¼ cup mint',
      '3 tablespoons butter or coconut oil',
      '2 tablespoons pistachio nuts'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/beta-beautiful-shake.jpg.png',
    prepTime: '5 minutes',
    yield: '1 Serving (2 cups)'
  },
  'blueberry-pie': {
    id: 'blueberry-pie',
    name: 'Blueberry Pie Shake',
    description: 'This shake smells like blueberry pie cooling on a window sill but it delivers far more nutrition than any pie could. Start your day on the right "food" with fine rich almonds, good quality fats and plenty of filling protein.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup unsweetened almond milk',
      '½ cup coconut milk',
      '₁∕₃ cup blueberries',
      '4 ice cubes',
      '2 teaspoons stevia',
      '3 tablespoons almond butter',
      '1 tablespoon chia seed',
      '½ teaspoon vanilla extract or almond extract'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.'
    ],
    image: '/src/assets/smoothies/blueberry-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'carrot-spice': {
    id: 'carrot-spice',
    name: 'Carrot Spice Shake',
    description: 'Carrots and spice are oh so nice! This shake will remind you of a dense carrot cake with the perfect mix of zesty ginger, walnuts and cinnamon. For time saving prep, peel and chop your carrots ahead of time or use pre-peeled baby carrots instead.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup full-fat canned coconut milk',
      '¼ cup chopped carrot',
      '1 tablespoon walnuts',
      '2 teaspoons coconut flour',
      '1 teaspoon chopped ginger root',
      '1 teaspoon cinnamon'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/carrot-spice-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'cherry-amaretto': {
    id: 'cherry-amaretto',
    name: 'Cherry Amaretto Shake',
    description: 'Almonds and cherries in this recipe taste like a cherry pie. Spinach might seem like a strange addition, but you won\'t taste it and you\'ll reap its nutritional benefits of fiber, folate, vitamin C and much more.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup unsweetened, plain almond milk',
      '½ cup canned full-fat coconut milk',
      '4 ice cubes',
      '¼ cup cherries, fresh or frozen',
      '¼ cup baby spinach leaves (optional)',
      '2 teaspoons stevia',
      '¼ teaspoon almond extract (optional)',
      '2 tablespoon almonds, chopped',
      '1 tablespoon ground flax seed'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.',
      'Process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/cherry-amaretto-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'chocolate-almond-butter': {
    id: 'chocolate-almond-butter',
    name: 'Chocolate Almond Butter Shake',
    description: 'Chocolate, almonds and butter blend together for a chocolate breakfast shake that you can make in under 5 minutes and take on the run. Shop for cocoa powder that has "unsweetened" on the box with only one ingredient listed: cocoa.',
    ingredients: [
      '1 serving Diet Fuel',
      '4 teaspoons unsweetened cocoa powder',
      '3 tablespoons butter',
      '1 tablespoon coconut flour',
      '1 tablespoon chopped almond',
      '½ teaspoon vanilla extract',
      '¼ teaspoon ground cinnamon'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/chocolate-almond-butter-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'chocolate-cashew-crunch': {
    id: 'chocolate-cashew-crunch',
    name: 'Chocolate Cashew Crunch Shake',
    description: 'Sweet blueberries and dark chocolate make this shake sweet and antioxidant rich. Fresh or frozen berries work equally well but frozen berries are more economical.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup canned full-fat coconut milk',
      '1 tablespoon unsweetened cocoa powder',
      '4 ice cubes',
      '₁∕₃ cup blueberries',
      '1 tablespoon ground flax or chia seeds',
      '1 tablespoon cashews',
      '2 teaspoons stevia'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup or more of water to create desired consistency.',
      'Process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/chocolate-cashew-crunch-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'chocolate-hazelnut': {
    id: 'chocolate-hazelnut',
    name: 'Chocolate Hazelnut Shake',
    description: 'Rich butter cuts the bitter bite of unsweetened cocoa powder in this Chocolate Hazelnut Shake. Chocolate lovers will savor the incredibly rich "melted" chocolate taste. If you don\'t have hazelnuts, use almonds instead.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup full-fat coconut milk',
      '2 tablespoons hazelnuts',
      '1 tablespoon unsalted butter',
      '4 teaspoons unsweetened cocoa powder',
      '2 teaspoons coconut flour',
      '½ teaspoon almond extract'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/chocolate-hazelnut-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'chocolate-red-tea': {
    id: 'chocolate-red-tea',
    name: 'Chocolate Red Tea Drink',
    description: 'Missing your coffee shop mocha latte? Try this chocolaty treat that just happens to be coffee and dairy-free. It gets its rich taste from unsweetened cocoa powder, butter, and red tea. Red tea is an antioxidant rich tea leaf that turns red as it dries.',
    ingredients: [
      '1 serving Diet Fuel',
      '1 ½ cups brewed red tea',
      '2 tablespoons unsweetened cocoa powder',
      '¼ cup unsalted butter or coconut oil',
      '2 teaspoons stevia'
    ],
    instructions: [
      'Place the protein powder, tea, cocoa powder, butter or oil, and stevia in a small saucepan.',
      'Warm over medium heat 1 to 2 minutes, whisking well until the butter or oil melts and the mixture is smooth and frothy.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/chocolate-red-tea-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'cinnamon-chai': {
    id: 'cinnamon-chai',
    name: 'Cinnamon Chai Shake',
    description: 'Chai gets its wonderful aroma from spices like cinnamon, nutmeg, and cardamom that are all rich in antioxidants. Coconut flour may seem like a strange addition to a shake but it adds sweetness and helps the butter blend up smoothly.',
    ingredients: [
      '1 serving Diet Fuel',
      '2 tablespoons chia seeds',
      '3 tablespoons butter, room temperature',
      '2 teaspoons coconut flour',
      '1 teaspoon ground cinnamon',
      '¼ ground clove',
      'Pinch nutmeg',
      '1 teaspoon stevia (optional)'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/cinnamon-chai-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'lemon-kick-starter': {
    id: 'lemon-kick-starter',
    name: 'Lemon Kick-Starter Shake',
    description: 'If you\'re a fan of lemony desserts, you\'ll love this frothy lemon shake! It will kick-start your day with plenty of filling protein and fat.',
    ingredients: [
      '1 serving Diet Fuel',
      '3 tablespoons butter',
      '2 tablespoons almonds or macadamia',
      '1 teaspoon lemon zest',
      '2 tablespoons lemon juice',
      '2 teaspoons coconut flour'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/lemon-kick-starter-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'mojito': {
    id: 'mojito',
    name: 'Mojito Shake',
    description: 'Love the burst of fresh flavor from mojitos at the local watering hole? This shake has the same flavors with plenty of protein, fiber and fat to boot. Don\'t toss the leftover kiwi, peel it and transfer to a sandwich baggy to freeze for later use.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup unsweetened, plain almond milk',
      '¼ to ½ cup fresh mint leaves',
      '¼ cup almonds',
      '½ cup canned full-fat coconut milk',
      '4 ice cubes',
      '½ kiwi, peeled',
      '2 tablespoons chia seeds',
      '2 teaspoons stevia'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.',
      'Process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/mojito-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'orange-creamsicle': {
    id: 'orange-creamsicle',
    name: 'Orange Creamsicle Shake',
    description: 'The flavor of tangy, sweet orange with creamy coconut milk will take you back to your childhood, minus the popsicle stick. Go ahead and buy those oranges on sale because you can freeze the peeled fruit in plastic zipped bags to save time on prep.',
    ingredients: [
      '1 serving Diet Fuel',
      '₁∕₃ cup chopped orange',
      '½ cup coconut milk',
      '¼ cup macadamia nuts',
      '4 ice cubes',
      '2 teaspoons stevia',
      '1 tablespoon chia seed',
      '1 teaspoon vanilla extract'
    ],
    instructions: [
      'Place all ingredients in the blender and process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/orange-creamsicle-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'peachy-nutmeg': {
    id: 'peachy-nutmeg',
    name: 'Peachy Nutmeg Smoothie',
    description: 'Have a peachy breakfast that offers the warming spice of nutmeg.',
    ingredients: [
      '8 ounces chilled unsweetened almond milk',
      '½ cup frozen peaches',
      '1 serving Diet Fuel',
      '½ teaspoon nutmeg, freshly grated is best',
      '1 tablespoon chia seeds',
      '3 drops NuNatural vanilla stevia or stevia of choice to taste'
    ],
    instructions: [
      'Add all ingredients to blender and blend until very smooth.'
    ],
    image: '/src/assets/smoothies/peachy-nutmeg-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'chocolate-fudge': {
    id: 'chocolate-fudge',
    name: 'Chocolate Fudge Shake',
    description: 'This thick, rich pudding like shake can be eaten with a spoon or blended with an additional ¼ cup water for a lighter consistency. Choose a ripe avocado that is soft to the touch, or buy harder avocados that you can ripen on your countertop for 2-3 days.',
    ingredients: [
      '1 serving Diet Fuel',
      '1 ripe avocado',
      '½ cup unsweetened almond milk',
      '½ cup water',
      '4 ice cubes',
      '2 tablespoons cocoa powder',
      '3 teaspoons stevia',
      '½ teaspoon vanilla extract',
      '1 tablespoon ground flaxseed'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.'
    ],
    image: '/src/assets/smoothies/chocolate-fudge-shake.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'raspberry-daiquiri': {
    id: 'raspberry-daiquiri',
    name: 'Raspberry Daiquiri Shake',
    description: 'You\'ll feel like you\'re sitting at a sunny resort when you sip this festive berry shake. This daiquiri will start your day off with plenty of protein and fat to help you fuel up. Use vanilla extract for a mellower berry flavor, or almond extract if you\'d like it to taste more like your favorite frozen party drink.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup unsweetened almond milk',
      '½ cup coconut milk',
      '₁∕₃ cup raspberries',
      '4 ice cubes',
      '2 teaspoons stevia',
      '2 tablespoons macadamia nuts (chopped)',
      '½ teaspoon vanilla extract or almond extract',
      '1 tablespoon Barlean\'s Omega Swirl, Key Lime flavor (optional)'
    ],
    instructions: [
      'Place all ingredients in the blender and add approximately ½ a cup of water to create desired consistency.',
      'Process until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/raspberry-daiquiri-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'raspberry': {
    id: 'raspberry',
    name: 'Raspberry Shake',
    description: 'This pretty pink shake is a high fiber explosion, 18 grams in just one cup! Fiber not only boosts your ability to properly digest, but also helps to keep your blood sugar steady for higher calorie burn throughout the day.',
    ingredients: [
      '1 serving Diet Fuel',
      '1/3 cup frozen raspberries',
      '3 tablespoons unsalted butter',
      '2 tablespoons chia seeds'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ cup water and 4 ice cubes.',
      'Blend until smooth.',
      'Serve immediately.'
    ],
    image: '/src/assets/smoothies/raspberry-shake.jpg.webp',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'shamrock': {
    id: 'shamrock',
    name: 'Shamrock Shake',
    description: 'This bright green shake, bursting with nutrients, has a mellow flavor thanks to shredded coconut and coconut flour. Even veggie haters won\'t be overwhelmed by the taste of the spinach which is also mellowed out by the coconut oil.',
    ingredients: [
      '1 serving Diet Fuel',
      '½ cup spinach',
      '¼ cup unsweetened shredded coconut',
      '3 tablespoons coconut oil',
      '2 teaspoons coconut flour'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/shamrock-shake.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  },
  'spinach-ginger': {
    id: 'spinach-ginger',
    name: 'Spinach Ginger Shake',
    description: 'Ginger perks up the flavor while adding antibacterial compounds to your shake. Shop for whole ginger root, usually located next to the onions and garlic in the produce isle.',
    ingredients: [
      '1 serving Diet Fuel',
      '1 cup baby spinach',
      '½ cup full-fat canned coconut milk',
      '2 teaspoons coconut flour',
      '2 tablespoons butter',
      '1 teaspoon chopped ginger root'
    ],
    instructions: [
      'Place all ingredients in a blender along with ½ - 1 cup water and 4 ice cubes.',
      'Blend until smooth.'
    ],
    image: '/src/assets/smoothies/spinach-ginger-shake.jpg.jpg',
    prepTime: '5 minutes',
    yield: '1 Serving'
  }
};
