import { 
  doc, 
  getDoc, 
  setDoc
} from 'firebase/firestore';
import { MealPlan, DayMeals, UserMealPlan } from '../types/mealPlans';
import { db } from '../config/firebase';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';
import { weeklyPlans } from '../data/weeklyPlans';
import { mediterraneanPlan } from '../data/mediterraneanPlan';
import { recipes } from '../data/recipes';

export type PlanType = '12-week' | '22-day' | 'mediterranean';

export interface MealPlanService {
  getCurrentPlan: () => PlanType;
  getMealPlan: (planType: PlanType) => MealPlan;
  getUserMealPlan: (userId: string) => Promise<UserMealPlan | null>;
  assignMealPlan: (userId: string, planId: string) => Promise<void>;
  updateProgress: (userId: string, currentDay: number) => Promise<void>;
}

class MealPlanServiceImpl implements MealPlanService {
  private currentPlan: PlanType = '22-day';

  getCurrentPlan(): PlanType {
    return this.currentPlan;
  }

  getMealPlan(planType: PlanType): MealPlan {
    if (planType === 'mediterranean') {
      return {
        id: 'mediterranean-plan',
        name: 'Mediterranean Diet Plan',
        description: '7-day Mediterranean-style meal plan',
        duration: 7,
        type: 'mediterranean',
        meals: mediterraneanPlan.meals,
        shoppingLists: []
      };
    }
    
    if (planType === '22-day' || planType === '22-day-plan') {
      return {
        id: '22-day-plan',
        name: '22-Day Challenge Plan',
        description: 'A focused 22-day program for a fresh start',
        duration: 22,
        type: 'challenge',
        meals: twentyTwoDayPlan.meals,
        shoppingLists: []
      };
    }

    // Convert weeklyPlans to MealPlan format for 12-week plan
    const weeklyPlanMeals: DayMeals[] = [];
    for (let week = 1; week <= 12; week++) {
      const weekKey = `week${week}` as keyof typeof weeklyPlans;
      const weekData = weeklyPlans[weekKey];
      if (weekData) {
        Object.values(weekData).forEach(day => {
          const createMealDetail = (mealName: string) => {
            // Parse recipe from recipes.ts
            const parseRecipe = (recipeText: string) => {
              const lines = recipeText.split('\n');
              const ingredients: { name: string }[] = [];
              const instructions: string[] = [];
              let description = '';
              let prepTime = '';
              let cookTime = '';
              let servings = 0;

              let currentSection = '';
              
              lines.forEach(line => {
                line = line.trim();
                if (line.startsWith('Ingredients')) {
                  currentSection = 'ingredients';
                } else if (line.startsWith('Instructions')) {
                  currentSection = 'instructions';
                } else if (line.startsWith('Prep Time:')) {
                  prepTime = line.replace('Prep Time:', '').trim();
                } else if (line.startsWith('Cook Time:')) {
                  cookTime = line.replace('Cook Time:', '').trim();
                } else if (line.startsWith('Yield:')) {
                  const yield_str = line.replace('Yield:', '').trim();
                  servings = parseInt(yield_str) || 1;
                } else if (line.startsWith('•')) {
                  if (currentSection === 'ingredients') {
                    ingredients.push({ name: line.substring(1).trim() });
                  }
                } else if (line.match(/^\d+\./)) {
                  if (currentSection === 'instructions') {
                    instructions.push(line.substring(line.indexOf('.') + 1).trim());
                  }
                } else if (line && !line.startsWith('Hormone Type')) {
                  if (!currentSection && !description) {
                    description = line;
                  }
                }
              });

              return {
                description,
                ingredients,
                instructions,
                prepTime: prepTime || '5 min',
                cookTime: cookTime || '0 min',
                servings: servings || 1
              };
            };

            // Get recipe from recipes object
            let recipeText = '';
            if (recipes.shakes[mealName]) {
              recipeText = recipes.shakes[mealName];
            } else if (recipes.lunch[mealName]) {
              recipeText = recipes.lunch[mealName];
            } else if (recipes.dinner?.[mealName]) {
              recipeText = recipes.dinner[mealName];
            }

            if (recipeText) {
              const parsedRecipe = parseRecipe(recipeText);
              return {
                name: mealName,
                ...parsedRecipe
              };
            }

            // If recipe not found, return a placeholder
            return {
              name: mealName,
              description: `Recipe for ${mealName}`,
              ingredients: [{ name: 'Recipe details coming soon' }],
              instructions: ['Recipe details coming soon'],
              prepTime: '5 min',
              cookTime: '0 min',
              servings: 1
            };
          };

          weeklyPlanMeals.push({
            breakfast: createMealDetail(day.breakfast),
            lunch: createMealDetail(day.lunch),
            dinner: createMealDetail(day.dinner)
          });
        });
      }
    }

    return {
      id: '12-week-plan',
      name: '12-Week Regular Plan',
      description: 'A comprehensive 12-week program with balanced meals',
      duration: 84,
      type: 'regular',
      meals: weeklyPlanMeals,
      shoppingLists: []
    };
  }

  async getUserMealPlan(userId: string): Promise<UserMealPlan | null> {
    const userMealPlanRef = doc(db, 'userMealPlans', userId);
    const docSnap = await getDoc(userMealPlanRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data() as UserMealPlan;
    const planIds = data.planIds || [];
    
    // If user has any plan, they have access to all plans
    if (planIds.length > 0) {
      // Use the selected plan from data, or default to the first plan they have
      const selectedPlan = data.selectedPlan || planIds[0].replace('-plan', '') as PlanType;
      const mealPlan = this.getMealPlan(selectedPlan);
      
      return {
        ...data,
        planIds,
        selectedPlan,
        mealPlan,
        hasAllPlans: true,
        availablePlans: ['22-day', '12-week', 'mediterranean']
      };
    }
    
    return null;
  }

  async assignMealPlan(userId: string, planId: string): Promise<void> {
    const planType: PlanType = planId.includes('22') ? '22-day' : planId.includes('mediterranean') ? 'mediterranean' : '12-week';
    const mealPlan = this.getMealPlan(planType);
    
    const userMealPlan: UserMealPlan = {
      userId,
      planId,
      currentDay: 0,
      hasAllPlans: true,
      planIds: ['22-day-plan', '12-week-plan', 'mediterranean-plan'],
      selectedPlan: planType,
      availablePlans: ['22-day', '12-week', 'mediterranean'],
      mealPlan
    };

    await setDoc(doc(db, 'userMealPlans', userId), userMealPlan);
  }

  async updateProgress(userId: string, currentDay: number): Promise<void> {
    const userMealPlanRef = doc(db, 'userMealPlans', userId);
    const docSnap = await getDoc(userMealPlanRef);
    
    if (!docSnap.exists()) throw new Error('No meal plan found for user');
    
    const data = docSnap.data() as UserMealPlan;
    const maxDays = data.selectedPlan === '22-day' ? 22 : data.selectedPlan === 'mediterranean' ? 7 : 84;
    
    await setDoc(userMealPlanRef, {
      ...data,
      currentDay,
      completed: currentDay >= maxDays
    });
  }
}

export const mealPlanService = new MealPlanServiceImpl();
