import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc
} from 'firebase/firestore';
import { MealPlan, UserMealPlan } from '../types/mealPlans';
import { db } from '../config/firebase';

export const mealPlanService = {
  // Get all available meal plans
  getAllMealPlans: async (): Promise<MealPlan[]> => {
    const plansRef = collection(db, 'mealPlans');
    const snapshot = await getDocs(plansRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MealPlan));
  },

  // Get a specific meal plan by ID
  getMealPlan: async (planId: string): Promise<MealPlan | null> => {
    const docRef = doc(db, 'mealPlans', planId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as MealPlan : null;
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
      currentDay: 1,
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
