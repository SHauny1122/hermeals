import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { useEffect, useState } from 'react';

// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

export default function PlansAndPricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/plans' } });
    } else {
      // Fetch user's current plan
      const fetchUserPlan = async () => {
        try {
          const plan = await mealPlanService.getUserMealPlan(user.uid);
          if (plan) {
            setUserPlan(plan.planId);
          }
        } catch (error) {
          console.error('Error fetching user plan:', error);
        }
      };
      fetchUserPlan();
    }
  }, [user, navigate]);

  const handlePurchaseSuccess = async (planId: string) => {
    console.log('Starting handlePurchaseSuccess with planId:', planId);
    console.log('Current user:', user);
    
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('Assigning plan to user...');
      await mealPlanService.assignMealPlan(user.uid, planId);
      console.log('Plan assigned successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error in handlePurchaseSuccess:', error);
    }
  };

  // Use sandbox client ID in development, live client ID in production
  const clientId = isDevelopment 
    ? import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX 
    : import.meta.env.VITE_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{
      clientId: clientId || "",
      currency: "USD",
      intent: "capture",
      components: "buttons"
    }}>
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
              {userPlan === '12-week-plan' ? (
                <div className="space-y-4">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-center font-medium">
                    Currently Active
                  </div>
                  <button
                    onClick={() => navigate('/dashboard?view=plan')}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    View Your Plan
                  </button>
                </div>
              ) : (
                <PayPalButtons
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [{
                        amount: {
                          currency_code: "USD",
                          value: "29.99"
                        },
                        description: "12-Week Regular Meal Plan"
                      }]
                    });
                  }}
                  onApprove={async (_, actions) => {
                    console.log('Payment approved, starting capture...');
                    try {
                      if (actions.order) {
                        const captureResult = await actions.order.capture();
                        console.log('Payment captured successfully:', captureResult);
                        await handlePurchaseSuccess('12-week-plan');
                        console.log('HandlePurchaseSuccess completed');
                      }
                    } catch (error) {
                      console.error('Payment capture error:', error);
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* 22-Day Plan Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">22-Day Plan</h2>
              <p className="mt-4 text-gray-600">Perfect for a fresh start or reset</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-emerald-600">$19.99</span>
                <span className="text-gray-600">/once-off</span>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                22 days of planned meals
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
              {userPlan === '22-day-plan' ? (
                <div className="space-y-4">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-center font-medium">
                    Currently Active
                  </div>
                  <button
                    onClick={() => navigate('/dashboard?view=plan')}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    View Your Plan
                  </button>
                </div>
              ) : (
                <PayPalButtons
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [{
                        amount: {
                          currency_code: "USD",
                          value: "19.99"
                        },
                        description: "22-Day Meal Plan"
                      }]
                    });
                  }}
                  onApprove={async (_, actions) => {
                    console.log('Payment approved, starting capture...');
                    try {
                      if (actions.order) {
                        const captureResult = await actions.order.capture();
                        console.log('Payment captured successfully:', captureResult);
                        await handlePurchaseSuccess('22-day-plan');
                        console.log('HandlePurchaseSuccess completed');
                      }
                    } catch (error) {
                      console.error('Payment capture error:', error);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
