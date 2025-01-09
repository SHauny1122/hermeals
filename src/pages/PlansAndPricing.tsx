import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { UserMealPlan } from '../types/mealPlans';

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

const features = [
  '12-Week Comprehensive Meal Plan',
  '22-Day Plant-Based Plan',
  '7-Day Mediterranean Plan',
  'Shopping Lists',
  'Nutritional Information',
  'Recipe Variations',
  'Mobile-Friendly Access',
  'Print-Ready Recipes',
];

export default function PlansAndPricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's current plan if logged in
    if (user) {
      const fetchUserPlan = async () => {
        try {
          const plan = await mealPlanService.getUserMealPlan(user.uid);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {userPlan?.hasAllPlans ? 'Your Meal Plans' : 'Simple, Affordable Pricing'}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {userPlan?.hasAllPlans 
                ? 'Access your purchased meal plans below'
                : 'Get access to our complete collection of healthy meal plans, including our new Mediterranean diet plan.'
              }
            </p>
          </div>

          {userPlan?.hasAllPlans ? (
            // Show purchased plans
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* 12-Week Plan Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">12-Week Plan</h3>
                <p className="text-gray-600 mb-6">A comprehensive 12-week program with balanced meals</p>
                <button
                  onClick={() => navigate('/dashboard?view=plan&type=12-week')}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Plan
                </button>
              </div>

              {/* 22-Day Plan Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">22-Day Plan</h3>
                <p className="text-gray-600 mb-6">Perfect for a fresh start or reset</p>
                <button
                  onClick={() => navigate('/dashboard?view=plan&type=22-day')}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Plan
                </button>
              </div>

              {/* Mediterranean Plan Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mediterranean Plan</h3>
                <p className="text-gray-600 mb-6">7-day Mediterranean-style meal plan</p>
                <button
                  onClick={() => navigate('/dashboard?view=plan&type=mediterranean')}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Plan
                </button>
              </div>
            </div>
          ) : (
            // Show payment option
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Complete Package</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Get instant access to all our meal plans, including:
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What's included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">One-time payment</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">$29.99</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                    {user ? (
                      <div className="mt-10">
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
                                
                                // Show success message and toast
                                setShowSuccessMessage(true);
                                setShowSuccessToast(true);
                                
                                // Hide toast after 5 seconds
                                setTimeout(() => {
                                  setShowSuccessToast(false);
                                }, 5000);
                                
                                console.log('Both plans assigned successfully');
                                navigate('/dashboard');
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
                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login to Purchase
                      </button>
                    )}
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Secure payment processing. Instant access after purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mediterranean Plan Highlight Section */}
          {!userPlan?.hasAllPlans && (
            <div className="mx-auto mt-16 max-w-2xl sm:text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">New: 7-Day Mediterranean Plan</h3>
              <p className="mt-4 text-lg text-gray-600">
                Experience the health benefits of the Mediterranean diet with our carefully curated 7-day meal plan.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow">
                  <h4 className="font-semibold text-gray-900">Healthy Breakfast Options</h4>
                  <p className="mt-2 text-gray-600">Start your day with nutritious Mediterranean-inspired breakfasts</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <h4 className="font-semibold text-gray-900">Fresh & Light Lunches</h4>
                  <p className="mt-2 text-gray-600">Enjoy balanced lunches packed with vegetables and lean proteins</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <h4 className="font-semibold text-gray-900">Flavorful Dinners</h4>
                  <p className="mt-2 text-gray-600">End your day with delicious Mediterranean dinner recipes</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                <div className="mb-4">
                  <CheckIcon className="w-16 h-16 text-emerald-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Purchase!</h3>
                <p className="text-gray-600 mb-6">You now have access to all meal plans. Start your journey to a healthier lifestyle today!</p>
                <button
                  onClick={() => {
                    setShowSuccessMessage(false);
                    navigate('/dashboard');
                  }}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="fixed bottom-4 right-4 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
              Payment successful! You now have access to all meal plans.
            </div>
          )}

          {/* FAQ Section */}
          <div className="mx-auto mt-16 max-w-2xl sm:text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h3>
            <dl className="mt-8 space-y-6 divide-y divide-gray-300/10">
              <div className="pt-6">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  What's included in the Mediterranean plan?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  The Mediterranean plan includes 7 days of complete meal plans with breakfast, lunch, dinner, and snacks. Each recipe comes with detailed instructions, ingredient lists, and nutritional information.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  How do I access the meal plans?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  After purchase, you'll get instant access to all meal plans through your dashboard. You can view them online or download them as PDFs.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Is the Mediterranean plan included in the price?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Yes! The 7-day Mediterranean plan is included in your $29.99 purchase, along with the 12-week plan and 22-day plant-based plan.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
