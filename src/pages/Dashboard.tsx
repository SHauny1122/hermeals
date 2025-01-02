import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { MealPlan, UserMealPlan, DayMeals, MealDetail } from '../types/mealPlans';

const Dashboard = () => {
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<keyof DayMeals | null>(null);
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
      <div className="meal-detail">
        <h3>{meal.name}</h3>
        <div className="meal-info">
          {meal.prepTime && <p>Prep Time: {meal.prepTime}</p>}
          {meal.cookTime && <p>Cook Time: {meal.cookTime}</p>}
          {meal.servings && <p>Servings: {meal.servings}</p>}
        </div>
        <div className="ingredients">
          <h4>Ingredients</h4>
          <ul>
            {meal.ingredients?.map((ingredient, i: number) => (
              <li key={i}>
                {ingredient.amount} {ingredient.unit || ''} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h4>Instructions</h4>
          <ol>
            {meal.instructions?.map((instruction: string, i: number) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  if (!mealPlan || !userPlan) {
    return (
      <div className="dashboard">
        <h1>Your Dashboard</h1>
        <p>No meal plan selected. Visit the meal plans page to choose a plan.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>
      <div className="dashboard-content">
        <div className="current-plan">
          <h2>{mealPlan.name}</h2>
          <p>Day {selectedDay + 1} of {mealPlan.meals.length}</p>
          
          <div className="day-navigation">
            <button 
              disabled={selectedDay === 0}
              onClick={() => handleDayChange(selectedDay - 1)}
            >
              Previous Day
            </button>
            <button
              disabled={selectedDay === mealPlan.meals.length - 1}
              onClick={() => handleDayChange(selectedDay + 1)}
            >
              Next Day
            </button>
          </div>

          <div className="meals-list">
            {Object.entries(mealPlan.meals[selectedDay] || {}).map(([mealType, mealData]) => (
              <div 
                key={mealType}
                className={`meal-item ${selectedMeal === mealType ? 'selected' : ''}`}
                onClick={() => setSelectedMeal(mealType as keyof DayMeals)}
              >
                <h3>{mealType}</h3>
                <p>{(mealData as MealDetail).name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="meal-details">
          {renderMealDetail()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
