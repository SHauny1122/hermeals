import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import app from '../config/firebase';
import { MealPlan } from '../types/mealPlans';

const db = getFirestore(app);

export const uploadMealPlan = async (mealPlan: Omit<MealPlan, 'id'>) => {
  try {
    const mealPlansRef = collection(db, 'mealPlans');
    const newMealPlanRef = doc(mealPlansRef);
    await setDoc(newMealPlanRef, {
      ...mealPlan,
      id: newMealPlanRef.id
    });
    console.log(`Successfully uploaded meal plan with ID: ${newMealPlanRef.id}`);
    return newMealPlanRef.id;
  } catch (error) {
    console.error('Error uploading meal plan:', error);
    throw error;
  }
};

// Example of how to use:
/*
const exampleMealPlan: Omit<MealPlan, 'id'> = {
  name: "12-Week Weight Loss Plan",
  description: "A comprehensive meal plan designed for healthy weight loss",
  duration: 12,
  type: "regular",
  meals: [
    {
      breakfast: {
        name: "Overnight Oats",
        ingredients: [
          { name: "rolled oats", amount: "1/2", unit: "cup" },
          { name: "almond milk", amount: "1", unit: "cup" },
          { name: "chia seeds", amount: "1", unit: "tbsp" }
        ],
        instructions: [
          "Mix oats, almond milk, and chia seeds in a jar",
          "Refrigerate overnight",
          "Top with fresh fruits in the morning"
        ],
        prepTime: "5 minutes",
        cookTime: "0 minutes",
        servings: 1
      },
      lunch: {
        // ... lunch details
      },
      dinner: {
        // ... dinner details
      }
    }
    // ... more days
  ]
};

await uploadMealPlan(exampleMealPlan);
*/
