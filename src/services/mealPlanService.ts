import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc
} from 'firebase/firestore';
import { MealPlan, UserMealPlan } from '../types/mealPlans';
import { db } from '../config/firebase';
import { regularMealPlan } from '../data/regularMealPlan';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';

export const mealPlanService = {
  // Get all available meal plans
  getAllMealPlans: async (): Promise<MealPlan[]> => {
    return [regularMealPlan, twentyTwoDayPlan];
  },

  // Get a specific meal plan by ID
  getMealPlan: async (planId: string): Promise<MealPlan | null> => {
    // Use local meal plans instead of Firestore
    if (planId === '12-week-plan') return regularMealPlan;
    if (planId === '22-day-plan') return twentyTwoDayPlan;
    return null;
  },

  // Get user's current meal plan
  getUserMealPlan: async (userId: string): Promise<UserMealPlan | null> => {
    const userMealPlanRef = doc(db, 'userMealPlans', userId);
    const docSnap = await getDoc(userMealPlanRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data() as UserMealPlan;
    const mealPlan = await mealPlanService.getMealPlan(data.planId);
    
    return mealPlan ? {
      ...data,
      mealPlan
    } : null;
  },

  // Assign a meal plan to a user
  assignMealPlan: async (userId: string, planId: string): Promise<void> => {
    const userMealPlanRef = doc(db, 'userMealPlans', userId);
    await setDoc(userMealPlanRef, {
      userId,
      planId,
      startDate: new Date(),
      currentDay: 0, // Changed to 0-based indexing to match the dashboard
      completed: false
    });
  },

  // Update user's progress in the meal plan
  updateProgress: async (userId: string, currentDay: number): Promise<void> => {
    const userMealPlanRef = doc(db, 'userMealPlans', userId);
    const docSnap = await getDoc(userMealPlanRef);
    
    if (!docSnap.exists()) throw new Error('No meal plan found for user');
    
    await setDoc(userMealPlanRef, {
      ...docSnap.data(),
      currentDay,
      completed: currentDay >= 7
    });
  }
};
