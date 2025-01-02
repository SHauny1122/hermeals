import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { regularMealPlan } from '../data/regularMealPlan';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';
import { ShoppingList } from '../components/ShoppingList';
import { MealPlan, MealDetail } from '../types/mealPlans';
import { findRecipe } from '../utils/recipeUtils';

const parseRecipe = (recipe: string) => {
  const sections = recipe.split('\n\n');
  const ingredients: string[] = [];
  const instructions: string[] = [];
  
  let currentSection = '';
  for (const section of sections) {
    if (section.toLowerCase().includes('ingredients')) {
      currentSection = 'ingredients';
      continue;
    }
    if (section.toLowerCase().includes('instructions')) {
      currentSection = 'instructions';
      continue;
    }
    
    if (currentSection === 'ingredients') {
      ingredients.push(...section.split('\n').filter(line => line.trim().startsWith('•')).map(line => line.trim().substring(2)));
    }
    if (currentSection === 'instructions') {
      instructions.push(...section.split('\n').filter(line => line.trim().match(/^\d+\./)).map(line => line.trim()));
    }
  }
  
  return { ingredients, instructions };
};

export const MealPlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping'>('meals');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const { planId } = useParams<{ planId: string }>();

  useEffect(() => {
    // Get the meal plan based on the ID
    if (planId === '12-week-plan') {
      setMealPlan(regularMealPlan);
    } else if (planId === '22-day-plan') {
      setMealPlan(twentyTwoDayPlan);
    }
  }, [planId]);

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading meal plan...</p>
      </div>
    );
  }

  const renderMealDetails = (meal: MealDetail) => {
    const recipe = findRecipe(meal);
    if (!recipe) {
      return (
        <div className="text-red-500">
          Recipe not found: {meal.name}
        </div>
      );
    }

    const { ingredients, instructions } = parseRecipe(recipe);

    return (
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{meal.name}</h3>
        {ingredients.length > 0 && (
          <>
            <h4 className="font-medium mt-2">Ingredients:</h4>
            <ul className="list-disc pl-5">
              {ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </>
        )}
        {instructions.length > 0 && (
          <>
            <h4 className="font-medium mt-2">Instructions:</h4>
            <ol className="list-decimal pl-5">
              {instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {mealPlan.name || '12 Week Meal Plan'}
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => setActiveTab('meals')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'meals'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Meals
              </button>
              <button
                onClick={() => setActiveTab('shopping')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'shopping'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Shopping List
              </button>
            </div>
          </div>

          {activeTab === 'meals' ? (
            <div className="space-y-8">
              {mealPlan.meals.map((day, dayIndex) => (
                <div key={dayIndex} className="border rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">Day {dayIndex + 1}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium">Breakfast</h4>
                      {renderMealDetails(day.breakfast)}
                    </div>
                    <div>
                      <h4 className="font-medium">Lunch</h4>
                      {renderMealDetails(day.lunch)}
                    </div>
                    <div>
                      <h4 className="font-medium">Dinner</h4>
                      {renderMealDetails(day.dinner)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ShoppingList mealPlan={mealPlan} />
          )}
        </div>
      </div>
    </div>
  );
};
