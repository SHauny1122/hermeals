export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserFitnessPlan {
  userId: string;
  fitnessLevel: FitnessLevel;
  startDate?: Date;
  currentDay: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  intensity: 'Light' | 'Moderate' | 'High';
  tips: string[];
  modifications?: {
    easier: string;
    harder: string;
  };
}

export interface DailyWorkout {
  dayNumber: number;
  focusArea: string;
  totalDuration: string;
  exercises: Exercise[];
  isRestDay?: boolean;
  fitnessLevel: FitnessLevel;
}
