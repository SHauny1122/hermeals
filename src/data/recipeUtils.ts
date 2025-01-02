import { recipes } from './recipes';

// Helper function to normalize recipe names
export const normalizeRecipeName = (name: string): string => {
  // Remove extra whitespace, tabs, and newlines
  let normalized = name.replace(/[\s\t\n]+/g, ' ').trim();
  
  // Handle special cases
  if (normalized.startsWith('Shake ')) {
    normalized = normalized.replace('Shake ', '');
  }
  if (normalized.includes('"')) {
    normalized = normalized.replace(/"/g, '');
  }

  // Remove "Shake" prefix/suffix for matching
  normalized = normalized.replace(/^Shake\s+/, '').replace(/\s+Shake$/, '');
  
  // Handle common meal name variations
  const variations: Record<string, string[]> = {
    'Roll Your Own': ['Roll Your Own', 'Roll Your Own Shake'],
    'Salted Dark Chocolate': ['Salted Dark', 'Salted Dark Chocolate', 'Dark Chocolate'],
    'Peachy Nutmeg': ['Peachy Nutmeg', 'Peach Nutmeg'],
    'Greens and Leeks': ['Greens and Leaks', 'Greens & Leeks', 'Greens and Leaks'],
    'Chicken Mesclun': ['Chicken Mesclun Salad', 'Mesclun Chicken'],
    'Mediterranean Chicken': ['Mediterranean Chicken Salad', 'Chicken Mediterranean', 'Chicken Salad Mediterranean'],
    'Southwest Chicken': ['Southwest Chicken Salad', 'Chicken Southwest', 'Veggie Scramble Southwest'],
    'Chicken Marsala': ['Chicken Marsala Flavorful', 'Flavorful Chicken Marsala'],
    'Mini Meatball Minestrone': ['Mini Meatball Minestrone Soup', 'Meatball Minestrone', 'Sauce Mini Meatball', 'Minestrone Soup Quick Indian'],
    'Turkey Chili': ['Turkey Chili Grilled', 'Grilled Turkey Chili'],
    'Herbed Lamb': ['Herbed Lamb Chops', 'Lamb Chops'],
    'Slow Cooker Pork': ['Slow Cooker Pork Loin', 'Pork Loin', 'Loin with Mustard and Rosemary'],
    '10-Minute Wraps': ['Wraps 10-Minute', '10-Minute Wraps'],
    'Paleo Chicken Fajitas': ['Paleo Fajitas Chicken', 'Chicken Fajitas'],
    'Easy Roasted Chicken': ['Cacciatore Easy Roasted', 'Easy Roasted Chicken'],
    'Slow Cooker Herb Chicken': ['Herb Chicken Slow Cooker', 'Slow Cooker Herb Chicken'],
    'Tahini Chicken': ['Salad Tahini', 'Tahini Chicken Salad'],
    'Mediterranean Wrap': ['Lunch Wrap', 'Mediterranean Wrap'],
    'Chicken Breasts in Tomato': ['Breasts in Tomato', 'Tomato Chicken Breasts'],
    'Slow-Cooker Salad': ['Salad Slow-Cooker', 'Slow-Cooker Salad'],
    'Blueberry Eye-Opener': ['Crunch Shake Blueberry Eye-', 'Blueberry Eye-Opener'],
    'Poached Eggs': ['Poached Eggs and Turkey', 'Turkey and Poached Eggs'],
    'Pesto Chicken Wraps': ['Roast Beef Wraps Pesto Chicken', 'Pesto Chicken Wraps'],
    'Italian Sweet Salad': ['Salad Italian Sweet-', 'Italian Sweet Salad'],
    'Sole Filet': ['Flank Steak Sole Filet', 'Sole Filet'],
    'Almond Butter Greens': ['Over Greens Almond Butter', 'Almond Butter Greens'],
    'Mouthwatering Chicken': ['Chicken Mouthwatering', 'Mouthwatering Chicken'],
    'Dijon Salmon': ['Meatloaf Dijon Salmon', 'Dijon Salmon'],
  };

  // Try to match known variations
  for (const [standard, variants] of Object.entries(variations)) {
    if (variants.some(v => normalized.toLowerCase().includes(v.toLowerCase()))) {
      normalized = standard;
      break;
    }
  }

  // Handle generic "Shake" case
  if (normalized === 'Shake' || normalized === '') {
    normalized = 'Roll Your Own';
  }

  return normalized;
};

// Helper function to find recipe in all categories
export const findRecipe = (name: string): string => {
  const normalized = normalizeRecipeName(name);
  
  // Try each category
  for (const category of ['shakes', 'lunch', 'dinner', 'vegetables'] as const) {
    // Try exact match first
    const found = Object.entries(recipes[category]).find(([recipeName]) => 
      recipeName.toLowerCase() === normalized.toLowerCase()
    );
    
    if (found) {
      return found[1];
    }

    // If no exact match, try partial match
    const partialMatch = Object.entries(recipes[category]).find(([recipeName]) => {
      const normalizedRecipeName = normalizeRecipeName(recipeName);
      return normalizedRecipeName.toLowerCase().includes(normalized.toLowerCase()) ||
             normalized.toLowerCase().includes(normalizedRecipeName.toLowerCase());
    });

    if (partialMatch) {
      return partialMatch[1];
    }
  }
  
  // If not found, log warning and return empty string
  console.warn(`Recipe not found for: ${name} (normalized: ${normalized})`);
  return '';
};
