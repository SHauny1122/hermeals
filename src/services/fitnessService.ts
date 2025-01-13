import { db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FitnessLevel, UserFitnessPlan } from '../types/fitness';

class FitnessService {
  private collection = 'userFitnessPlans';

  async getUserFitnessPlan(userId: string): Promise<UserFitnessPlan | null> {
    try {
      const docRef = doc(db, this.collection, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserFitnessPlan;
      }
      return null;
    } catch (error) {
      console.error('Error getting user fitness plan:', error);
      return null;
    }
  }

  async setUserFitnessLevel(userId: string, level: FitnessLevel): Promise<void> {
    try {
      const docRef = doc(db, this.collection, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, { fitnessLevel: level });
      } else {
        const newPlan: UserFitnessPlan = {
          userId,
          fitnessLevel: level,
          startDate: new Date(),
          currentDay: 1,
          completed: false
        };
        await setDoc(docRef, newPlan);
      }
    } catch (error) {
      console.error('Error setting user fitness level:', error);
      throw error;
    }
  }

  async updateCurrentDay(userId: string, day: number): Promise<void> {
    try {
      const docRef = doc(db, this.collection, userId);
      await updateDoc(docRef, { 
        currentDay: day,
        completed: day >= 30
      });
    } catch (error) {
      console.error('Error updating current day:', error);
      throw error;
    }
  }
}

export const fitnessService = new FitnessService();
