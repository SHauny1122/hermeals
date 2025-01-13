import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fitnessService } from '../../../services/fitnessService';
import { DailyWorkout, FitnessLevel, Exercise } from '../../../types/fitness';
import { createWorkoutPlan } from '../data/workouts';

const FitnessCalendar: React.FC = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<DailyWorkout | null>(null);
  const [currentMonth] = useState(new Date());
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>('beginner');
  const [workoutPlan, setWorkoutPlan] = useState<DailyWorkout[]>(createWorkoutPlan('beginner'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFitnessPlan = async () => {
      if (user) {
        try {
          const plan = await fitnessService.getUserFitnessPlan(user.uid);
          if (plan) {
            setFitnessLevel(plan.fitnessLevel);
            setWorkoutPlan(createWorkoutPlan(plan.fitnessLevel));
          }
        } catch (error) {
          console.error('Error fetching fitness plan:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserFitnessPlan();
  }, [user]);

  const handleLevelChange = async (level: FitnessLevel) => {
    if (!user) return;

    setFitnessLevel(level);
    setWorkoutPlan(createWorkoutPlan(level));
    setSelectedDay(null);

    try {
      await fitnessService.setUserFitnessLevel(user.uid, level);
    } catch (error) {
      console.error('Error saving fitness level:', error);
      // Could add error notification here
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const workout = workoutPlan.find(w => w.dayNumber === day);
      days.push(
        <div
          key={day}
          className={`h-24 p-2 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer overflow-hidden
            ${workout?.isRestDay ? 'bg-gray-50' : workout ? 'bg-emerald-50' : 'bg-white'}
            ${selectedDay?.dayNumber === day ? 'ring-2 ring-emerald-500' : ''}`}
          onClick={() => workout && setSelectedDay(workout)}
        >
          <div className="font-semibold text-gray-700">{day}</div>
          {workout && (
            <div className="mt-1">
              <div className="text-[11px] font-medium text-emerald-600 truncate">
                {workout.focusArea}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {workout.totalDuration}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Fitness Calendar</h2>
        <p className="mt-2 text-lg text-gray-600">
          Your personalized 30-day no-equipment workout plan
        </p>

        {/* Fitness Level Selector */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => handleLevelChange('beginner')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${fitnessLevel === 'beginner' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Beginner (3 days/week)
          </button>
          <button
            onClick={() => handleLevelChange('intermediate')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${fitnessLevel === 'intermediate' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Intermediate (4 days/week)
          </button>
          <button
            onClick={() => handleLevelChange('advanced')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${fitnessLevel === 'advanced' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Advanced (5 days/week)
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-7 gap-4 mb-4 text-sm font-semibold text-gray-600">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {generateCalendarDays()}
            </div>
          </div>
        </div>

        {/* Workout Details Section */}
        <div className="lg:col-span-2 mt-8 lg:mt-0">
          {selectedDay ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Day {selectedDay.dayNumber}</h3>
                  <p className="text-lg text-emerald-600">{selectedDay.focusArea}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Duration</div>
                  <div className="text-lg font-semibold text-gray-900">{selectedDay.totalDuration}</div>
                </div>
              </div>

              {selectedDay.isRestDay ? (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="mt-2 text-lg font-medium text-gray-900">Rest & Recovery Day</h4>
                  <p className="mt-1 text-gray-500">
                    Take this time to rest, stretch gently, and let your body recover. 
                    Stay hydrated and get good sleep!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedDay.exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Exercise Icon */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100">
                          {exercise.id === 'warmupStretch' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14l9-5-9 16-9-16 9 5z" />
                            </svg>
                          )}
                          {exercise.id === 'bodyweightSquats' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {exercise.id === 'modifiedPushups' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6v2m3-2v2m3-2v2M9 18v-2m3 2v-2m3 2v-2M9 10h.01M12 10h.01M15 10h.01M9 14h.01M12 14h.01M15 14h.01" />
                            </svg>
                          )}
                          {exercise.id === 'walkingCardio' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                          )}
                          {exercise.id === 'yogaFlow' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          )}
                          {exercise.id === 'pilatesCore' && (
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{exercise.name}</h4>
                          <p className="text-gray-600 mb-3">{exercise.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Duration</div>
                          <div className="text-gray-600">{exercise.duration}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Intensity</div>
                          <div className="text-gray-600">{exercise.intensity}</div>
                        </div>
                      </div>
                      {exercise.modifications && (
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-700">Make it Easier</div>
                            <div className="text-gray-600">{exercise.modifications.easier}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">Make it Harder</div>
                            <div className="text-gray-600">{exercise.modifications.harder}</div>
                          </div>
                        </div>
                      )}
                      <div className="mt-4">
                        <div className="font-medium text-gray-700 mb-2">Tips</div>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {exercise.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Day Selected</h3>
                <p className="mt-1 text-sm text-gray-500">Click on a day in the calendar to view the workout details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessCalendar;
