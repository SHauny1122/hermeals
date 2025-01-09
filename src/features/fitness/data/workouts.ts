export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

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

// Sample exercises library
const exerciseLibrary: Record<string, Exercise> = {
  warmupStretch: {
    id: 'warmupStretch',
    name: 'Dynamic Warm-up & Stretching',
    description: 'Gentle movements to warm up your muscles and improve flexibility',
    duration: '10 minutes',
    intensity: 'Light',
    tips: ['Move slowly and controlled', 'Don\'t force any stretches', 'Focus on breathing'],
    modifications: {
      easier: 'Hold stretches for shorter duration',
      harder: 'Add more dynamic movements'
    }
  },
  bodyweightSquats: {
    id: 'bodyweightSquats',
    name: 'Bodyweight Squats',
    description: 'Basic lower body exercise targeting legs and core',
    duration: '5-10 minutes',
    intensity: 'Moderate',
    tips: ['Keep your back straight', 'Knees aligned with toes', 'Go at your own pace'],
    modifications: {
      easier: 'Don\'t squat as deep, use a chair for support',
      harder: 'Add pulse squats or jump squats'
    }
  },
  modifiedPushups: {
    id: 'modifiedPushups',
    name: 'Modified Push-ups',
    description: 'Upper body exercise for chest, shoulders, and arms',
    duration: '5-8 minutes',
    intensity: 'Moderate',
    tips: ['Start on knees if needed', 'Keep core engaged', 'Maintain proper form'],
    modifications: {
      easier: 'Wall push-ups or knee push-ups',
      harder: 'Regular push-ups or decline push-ups'
    }
  },
  walkingCardio: {
    id: 'walkingCardio',
    name: 'Walking or Light Cardio',
    description: 'Cardiovascular exercise to improve endurance',
    duration: '20-30 minutes',
    intensity: 'Light',
    tips: ['Start slow and build up', 'Stay hydrated', 'Listen to your body'],
    modifications: {
      easier: 'Take breaks as needed',
      harder: 'Add intervals of brisk walking'
    }
  },
  yogaFlow: {
    id: 'yogaFlow',
    name: 'Basic Yoga Flow',
    description: 'Gentle yoga sequence for flexibility and relaxation',
    duration: '15-20 minutes',
    intensity: 'Light',
    tips: ['Focus on breathing', 'Move at your own pace', 'Modify poses as needed'],
    modifications: {
      easier: 'Use props for support',
      harder: 'Hold poses longer'
    }
  },
  pilatesCore: {
    id: 'pilatesCore',
    name: 'Pilates Core Work',
    description: 'Core strengthening exercises',
    duration: '10-15 minutes',
    intensity: 'Moderate',
    tips: ['Focus on controlled movements', 'Keep breathing steady', 'Engage your core'],
    modifications: {
      easier: 'Reduce repetitions',
      harder: 'Add more challenging variations'
    }
  }
};

// Create workout plans for different levels
export const createWorkoutPlan = (level: FitnessLevel): DailyWorkout[] => {
  const plan: DailyWorkout[] = [];
  
  // Workout frequency based on level
  const workoutDays = {
    beginner: 3, // 3 days per week
    intermediate: 4, // 4 days per week
    advanced: 5 // 5 days per week
  };

  for (let day = 1; day <= 30; day++) {
    // Determine if it's a rest day based on level and day of week
    const isWorkoutDay = (level === 'beginner' && [2, 4, 6].includes(day % 7)) ||
                        (level === 'intermediate' && [2, 4, 6, 7].includes(day % 7)) ||
                        (level === 'advanced' && ![1].includes(day % 7)); // Rest only on Sundays

    if (!isWorkoutDay) {
      plan.push({
        dayNumber: day,
        focusArea: 'Rest & Recovery',
        totalDuration: 'Rest Day',
        exercises: [],
        isRestDay: true,
        fitnessLevel: level
      });
      continue;
    }

    // Create workout based on the day
    const workout: DailyWorkout = {
      dayNumber: day,
      focusArea: '',
      totalDuration: '',
      exercises: [],
      fitnessLevel: level
    };

    // Assign different workouts based on the day
    switch (day % 3) {
      case 0: // Strength Day
        workout.focusArea = 'Strength & Core';
        workout.exercises = [
          exerciseLibrary.warmupStretch,
          exerciseLibrary.bodyweightSquats,
          exerciseLibrary.modifiedPushups,
          exerciseLibrary.pilatesCore
        ];
        workout.totalDuration = level === 'beginner' ? '30 minutes' : 
                              level === 'intermediate' ? '40 minutes' : '50 minutes';
        break;
      case 1: // Cardio Day
        workout.focusArea = 'Cardio & Endurance';
        workout.exercises = [
          exerciseLibrary.warmupStretch,
          exerciseLibrary.walkingCardio
        ];
        workout.totalDuration = level === 'beginner' ? '25 minutes' : 
                              level === 'intermediate' ? '35 minutes' : '45 minutes';
        break;
      case 2: // Flexibility Day
        workout.focusArea = 'Flexibility & Balance';
        workout.exercises = [
          exerciseLibrary.warmupStretch,
          exerciseLibrary.yogaFlow,
          exerciseLibrary.pilatesCore
        ];
        workout.totalDuration = level === 'beginner' ? '30 minutes' : 
                              level === 'intermediate' ? '40 minutes' : '45 minutes';
        break;
    }

    plan.push(workout);
  }

  return plan;
};

// Default to beginner plan
export const workoutPlan = createWorkoutPlan('beginner');
