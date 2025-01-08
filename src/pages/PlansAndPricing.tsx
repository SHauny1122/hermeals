import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { useEffect, useState } from 'react';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';
import { MealPlan, UserMealPlan } from '../types/mealPlans';

// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

const paypalOptions = {
  clientId: isDevelopment 
    ? import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX 
    : import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  components: "buttons",
  debug: isDevelopment,
  vault: false
};

export default function PlansAndPricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [previewPlans, setPreviewPlans] = useState<{[key: string]: MealPlan}>({});
  const [selectedMeal, setSelectedMeal] = useState<{
    name: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    ingredients: Array<{name: string}>;
    instructions: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Load preview plans
    const twentyTwoDayPreview = mealPlanService.getMealPlan('22-day');
    setPreviewPlans({
      '22-day': twentyTwoDayPreview
    });

    // Fetch user's current plan if logged in
    if (user) {
      const fetchUserPlan = async () => {
        try {
          const plan = await mealPlanService.getUserMealPlan(user.uid);
          console.log('Fetched user plan:', plan);
          setUserPlan(plan);
        } catch (error) {
          console.error('Error fetching user plan:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserPlan();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handlePurchaseSuccess = async (planId: string) => {
    console.log('Starting handlePurchaseSuccess with planId:', planId);
    console.log('Current user:', user);
    
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('Assigning plans to user...');
      // Assign both plans to the user
      await mealPlanService.assignMealPlan(user.uid, '22-day');
      await mealPlanService.assignMealPlan(user.uid, '12-week');
      console.log('Plans assigned successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error in handlePurchaseSuccess:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">Choose Your Meal Plan</h1>
        <p className="text-center text-gray-600 mb-12">Select the perfect meal plan for your journey</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 12-Week Plan Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">12-Week Regular Plan</h2>
              <p className="mt-4 text-gray-600">A comprehensive 12-week program with balanced meals</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-emerald-600">$29.99</span>
                <span className="text-gray-600">/once-off</span>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                84 days of planned meals
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Complete shopping lists
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Detailed recipes & instructions
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Lifetime access
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium text-emerald-700">FREE Smoothie Recipes Included ($19.99 value)</span>
              </li>
            </ul>

            <div className="mt-8">
              {userPlan?.hasAllPlans ? (
                <div className="space-y-4">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-center font-medium">
                    Plan Active
                  </div>
                  <button
                    onClick={() => navigate('/dashboard?view=plan&type=12-week')}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    View Plan
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* 22-Day Plan Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">22-Day Challenge Plan</h2>
              <p className="mt-4 text-gray-600">Perfect for a fresh start or reset</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-emerald-600">$29.99</span>
                <span className="text-gray-600">/once-off</span>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                22 days of delicious meals
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Complete shopping lists
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Detailed recipes & instructions
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Lifetime access
              </li>
            </ul>

            <div className="mt-8">
              {userPlan?.hasAllPlans ? (
                <div className="space-y-4">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-center font-medium">
                    Plan Active
                  </div>
                  <button
                    onClick={() => navigate('/dashboard?view=plan&type=22-day')}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    View Plan
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Purchase!</h3>
              <p className="text-gray-600 mb-6">You now have access to both meal plans. Start your journey to a healthier lifestyle today!</p>
              <button
                onClick={() => {
                  setShowSuccessMessage(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            Payment successful! You now have access to both meal plans.
          </div>
        )}

        {/* Single PayPal Button Section */}
        {!userPlan?.hasAllPlans && (
          <div className="bg-emerald-50 p-8 rounded-lg text-center mt-12">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4">Special Offer!</h2>
            <p className="text-emerald-700 mb-8">Get access to BOTH meal plans for the price of one!</p>
            {user ? (
              <div className="max-w-sm mx-auto">
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: "29.99"
                        }
                      }]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      if (!user) {
                        console.error('No user found');
                        return;
                      }

                      if (actions.order) {
                        const captureResult = await actions.order.capture();
                        console.log('Payment captured successfully:', captureResult);
                        
                        // Assign both plans to the user
                        await mealPlanService.assignMealPlan(user.uid, '12-week');
                        await mealPlanService.assignMealPlan(user.uid, '22-day');
                        
                        // Fetch updated plan status
                        const updatedPlan = await mealPlanService.getUserMealPlan(user.uid);
                        setUserPlan(updatedPlan);
                        
                        // Show success message and toast
                        setShowSuccessMessage(true);
                        setShowSuccessToast(true);
                        
                        // Hide toast after 5 seconds
                        setTimeout(() => {
                          setShowSuccessToast(false);
                        }, 5000);
                        
                        console.log('Both plans assigned successfully');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      alert('There was an error processing your payment. Please try again.');
                    }
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Login to Purchase
              </button>
            )}
          </div>
        )}

        {userPlan?.hasAllPlans && (
          <div className="bg-emerald-50 p-8 rounded-lg text-center mt-12">
            <div className="space-y-4">
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-center font-medium">
                You have access to both plans!
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard?view=plan&type=12-week')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  View 12-Week Plan
                </button>
                <button
                  onClick={() => navigate('/dashboard?view=plan&type=22-day')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  View 22-Day Plan
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Recipe Modal */}
        {selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Close button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-emerald-700">{selectedMeal.name}</h3>
                  <button 
                    onClick={() => setSelectedMeal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Time and Servings Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {selectedMeal.prepTime && (
                    <div>
                      <span className="font-medium">Prep Time:</span> {selectedMeal.prepTime}
                    </div>
                  )}
                  {selectedMeal.cookTime && (
                    <div>
                      <span className="font-medium">Cook Time:</span> {selectedMeal.cookTime}
                    </div>
                  )}
                  {selectedMeal.servings && (
                    <div>
                      <span className="font-medium">Servings:</span> {selectedMeal.servings}
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedMeal.description && (
                  <p className="text-gray-600">{selectedMeal.description}</p>
                )}

                {/* Ingredients */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-emerald-800">Ingredients</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedMeal.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-700">{ingredient.name}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-emerald-800">Instructions</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedMeal.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-gray-700">{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};
