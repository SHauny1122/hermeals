import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { MealPlan, UserMealPlan, DayMeals, MealDetail } from '../types/mealPlans';
import { DashboardShoppingList } from '../components/DashboardShoppingList';

const Dashboard = () => {
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<keyof DayMeals | null>(null);
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping'>('meals');
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      try {
        const userMealPlan = await mealPlanService.getUserMealPlan(user.uid);
        if (userMealPlan) {
          setUserPlan(userMealPlan);
          const plan = await mealPlanService.getMealPlan(userMealPlan.planId);
          if (plan) {
            setMealPlan(plan);
            setSelectedDay(userMealPlan.currentDay);
          }
        }
      } catch (error) {
        console.error('Error fetching user meal plan:', error);
      }
    };
    fetchUserPlan();
  }, [user]);

  const handleDayChange = async (day: number) => {
    if (!user) return;
    setSelectedDay(day);
    setSelectedMeal(null);
    await mealPlanService.updateProgress(user.uid, day);
  };

  const renderMealDetail = () => {
    if (!mealPlan || selectedMeal === null) return null;
    const dayMeals = mealPlan.meals[selectedDay];
    if (!dayMeals) return null;
    const meal = dayMeals[selectedMeal] as MealDetail;
    if (!meal) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{meal.name}</h3>
        <div className="bg-white rounded-lg p-6 whitespace-pre-wrap">
          {meal.recipe}
        </div>
      </div>
    );
  };

  if (!mealPlan || !userPlan) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        <p className="text-gray-600">No meal plan selected. Visit the meal plans page to choose a plan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
      
      <div className="mb-6 flex justify-end">
        <div className="inline-flex rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-4 py-2 ${
              activeTab === 'meals'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Meal Plan
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-4 py-2 ${
              activeTab === 'shopping'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Shopping List
          </button>
        </div>
      </div>

      {activeTab === 'meals' ? (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{mealPlan.name}</h2>
            <p className="mt-2 text-gray-600">Day {selectedDay + 1} of {mealPlan.meals.length}</p>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button 
                disabled={selectedDay === 0}
                onClick={() => handleDayChange(selectedDay - 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Previous Day
              </button>
              <button
                disabled={selectedDay === mealPlan.meals.length - 1}
                onClick={() => handleDayChange(selectedDay + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === mealPlan.meals.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next Day
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
              <div className="grid gap-4">
                {Object.entries(mealPlan.meals[selectedDay] || {}).map(([mealType, mealData]) => (
                  <div 
                    key={mealType}
                    onClick={() => setSelectedMeal(mealType as keyof DayMeals)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedMeal === mealType 
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <h4 className="font-medium text-emerald-800 capitalize mb-1">{mealType}</h4>
                    <p className="text-gray-700">{(mealData as MealDetail).name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              {renderMealDetail() ? (
                renderMealDetail()
              ) : (
                <p className="text-gray-500 text-center">Select a meal to view details</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <DashboardShoppingList mealPlan={mealPlan} />
      )}
    </div>
  );
};

export default Dashboard;