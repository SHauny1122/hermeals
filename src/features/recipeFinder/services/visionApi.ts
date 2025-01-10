import { DetectedIngredient } from '../types/types';

const API_KEY = import.meta.env.VITE_GOOGLE_VISION_API_KEY;
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

// Common ingredients with variations and metadata
const INGREDIENTS_DB: { [key: string]: {
  name: string;
  variations: string[];
  category: string;
  commonMeals: string[];
  nutrients: string[];
}} = {
  'avocado': {
    name: 'avocado',
    variations: ['avocados', 'hass avocado', 'avocado fruit'],
    category: 'fruits',
    commonMeals: ['breakfast', 'lunch', 'snack'],
    nutrients: ['healthy fats', 'fiber', 'potassium']
  },
  'tomato': {
    name: 'tomato',
    variations: ['tomatoes', 'cherry tomatoes', 'roma tomato'],
    category: 'vegetables',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['vitamin C', 'lycopene', 'potassium']
  },
  'onion': {
    name: 'onion',
    variations: ['onions', 'red onion', 'white onion', 'yellow onion'],
    category: 'vegetables',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['antioxidants', 'fiber']
  },
  'potato': {
    name: 'potato',
    variations: ['potatoes', 'white potato', 'russet potato'],
    category: 'vegetables',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['carbohydrates', 'fiber', 'vitamin C']
  },
  'carrot': {
    name: 'carrot',
    variations: ['carrots', 'baby carrots'],
    category: 'vegetables',
    commonMeals: ['lunch', 'dinner', 'snack'],
    nutrients: ['vitamin A', 'fiber', 'beta carotene']
  },
  'chicken': {
    name: 'chicken',
    variations: ['chicken breast', 'chicken thigh', 'chicken meat'],
    category: 'proteins',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['protein', 'vitamin B6']
  },
  'beef': {
    name: 'beef',
    variations: ['steak', 'ground beef', 'beef meat'],
    category: 'proteins',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['protein', 'iron', 'vitamin B12']
  },
  'salmon': {
    name: 'salmon',
    variations: ['salmon fillet', 'fish'],
    category: 'proteins',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['omega-3', 'protein', 'vitamin D']
  },
  'rice': {
    name: 'rice',
    variations: ['white rice', 'brown rice', 'jasmine rice'],
    category: 'grains',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['carbohydrates', 'fiber']
  },
  'bread': {
    name: 'bread',
    variations: ['white bread', 'whole wheat bread', 'bread loaf'],
    category: 'grains',
    commonMeals: ['breakfast', 'lunch', 'snack'],
    nutrients: ['carbohydrates', 'fiber']
  },
  'egg': {
    name: 'egg',
    variations: ['eggs', 'chicken egg'],
    category: 'proteins',
    commonMeals: ['breakfast', 'lunch'],
    nutrients: ['protein', 'vitamin D', 'vitamin B12']
  },
  'apple': {
    name: 'apple',
    variations: ['apples', 'red apple', 'green apple'],
    category: 'fruits',
    commonMeals: ['breakfast', 'snack'],
    nutrients: ['fiber', 'vitamin C']
  },
  'banana': {
    name: 'banana',
    variations: ['bananas', 'ripe banana'],
    category: 'fruits',
    commonMeals: ['breakfast', 'snack'],
    nutrients: ['potassium', 'vitamin B6']
  },
  'garlic': {
    name: 'garlic',
    variations: ['garlic clove', 'garlic bulb'],
    category: 'vegetables',
    commonMeals: ['lunch', 'dinner'],
    nutrients: ['antioxidants', 'vitamin C']
  }
};

// Function to find ingredient matches
const findIngredientMatches = (labels: string[]): Map<string, number> => {
  const matches = new Map<string, number>();
  
  labels.forEach(label => {
    const normalizedLabel = label.toLowerCase().trim();
    
    // Check each ingredient and its variations
    for (const [key, data] of Object.entries(INGREDIENTS_DB)) {
      // Direct match with main ingredient name
      if (normalizedLabel === key) {
        matches.set(key, (matches.get(key) || 0) + 1);
        continue;
      }
      
      // Check variations
      if (data.variations.some(variation => 
        normalizedLabel.includes(variation) || variation.includes(normalizedLabel)
      )) {
        matches.set(key, (matches.get(key) || 0) + 1);
      }
    }
  });
  
  return matches;
};

// Function to get ingredient details
const getIngredientDetails = (ingredientKey: string, confidence: number): DetectedIngredient => {
  const data = INGREDIENTS_DB[ingredientKey];
  return {
    name: data.name,
    confidence,
    category: data.category,
    specificLabels: data.variations,
    nutrients: data.nutrients,
    commonMeals: data.commonMeals
  };
};

export const analyzeImage = async (imageBase64: string) => {
  try {
    const response = await fetch(`${VISION_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: imageBase64.split(',')[1]
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 20
            },
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 20
            },
            {
              type: 'WEB_DETECTION',
              maxResults: 20
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    const allLabels = new Set<string>();
    
    // Collect all labels from different detection methods
    data.responses[0].labelAnnotations?.forEach((label: any) => {
      allLabels.add(label.description.toLowerCase());
    });
    
    data.responses[0].localizedObjectAnnotations?.forEach((obj: any) => {
      allLabels.add(obj.name.toLowerCase());
    });
    
    data.responses[0].webDetection?.webEntities?.forEach((entity: any) => {
      allLabels.add(entity.description.toLowerCase());
    });

    // Find ingredient matches
    const ingredientMatches = findIngredientMatches(Array.from(allLabels));
    
    // Convert matches to detected ingredients with confidence scores
    const detectedIngredients = Array.from(ingredientMatches.entries())
      .map(([ingredient, count]) => {
        // Calculate confidence based on how many times it was detected
        const confidence = Math.min(0.95, 0.75 + (count * 0.05));
        return getIngredientDetails(ingredient, confidence);
      })
      .sort((a, b) => b.confidence - a.confidence);

    console.log('Detected ingredients:', detectedIngredients);
    return detectedIngredients;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
