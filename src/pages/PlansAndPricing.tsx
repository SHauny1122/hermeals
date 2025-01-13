import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { UserMealPlan } from '../types/mealPlans';
import { Promotion } from '../types/promotion';

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
  '30-day personalized fitness calendar with no-equipment workouts',
  'Beginner, intermediate, and advanced workout options',
];

export default function PlansAndPricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const plan = await mealPlanService.getUserMealPlan(user.uid);
          setUserPlan(plan);
        }
        const activePromo = await mealPlanService.getActivePromotion();
        setPromotion(activePromo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-5xl">
              {userPlan?.hasAllPlans ? 'Your Meal Plans' : 'Transform Your Life With Our Meal Plans'}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 font-light">
              {userPlan?.hasAllPlans 
                ? 'Access your purchased meal plans below'
                : 'Start your journey to better health with our expertly crafted meal plans and fitness guides.'
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
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">What's included:</h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start transform hover:scale-105 transition-transform duration-200">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 font-medium">
                        Personalized meal plans tailored to your preferences
                      </p>
                    </li>
                    <li className="flex items-start transform hover:scale-105 transition-transform duration-200">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 font-medium">
                        Access to our exclusive smoothie recipes collection
                      </p>
                    </li>
                    <li className="flex items-start transform hover:scale-105 transition-transform duration-200">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 font-medium">
                        30-day personalized fitness calendar with no-equipment workouts
                      </p>
                    </li>
                    <li className="flex items-start transform hover:scale-105 transition-transform duration-200">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 font-medium">
                        Beginner, intermediate, and advanced workout options
                      </p>
                    </li>
                    <li className="flex items-start transform hover:scale-105 transition-transform duration-200">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700 font-medium">
                        Weekly shopping lists and meal prep guides
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gradient-to-b from-white to-indigo-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-indigo-600">One-time payment</p>
                    <div className="mb-6 text-center relative">
                      {promotion && promotion.active ? (
                        <>
                          {/* New Year Special Badge */}
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                            New Year Special! 🎉
                          </div>
                          
                          <p className="text-xl font-semibold text-gray-400 line-through mt-6">
                            ${promotion.originalPrice} USD
                          </p>
                          
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-4xl font-bold text-indigo-600 animate-bounce">
                                ${promotion.promoPrice}
                              </span>
                              <span className="text-xl text-gray-500">USD</span>
                            </div>
                            
                            {/* Savings Highlight */}
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-block font-medium">
                              Save ${(promotion.originalPrice - promotion.promoPrice).toFixed(2)}!
                            </div>
                            
                            {/* Urgency Message */}
                            <p className="text-sm font-medium text-indigo-600 mt-2">
                              🔥 Limited Time New Year Offer! Start Your Health Journey Today
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-3xl font-bold text-gray-900">
                          $29.99 <span className="text-xl text-gray-500">USD</span>
                        </p>
                      )}
                    </div>
                    {user ? (
                      <div className="mt-10">
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [{
                                amount: {
                                  value: promotion && promotion.active 
                                    ? promotion.promoPrice.toString()
                                    : "29.99",
                                  currency_code: "USD"
                                }
                              }]
                            });
                          }}
                          onApprove={async (data, actions) => {
                            if (actions.order) {
                              const order = await actions.order.capture();
                              if (order.status === 'COMPLETED') {
                                try {
                                  // Assign all plans to the user
                                  await mealPlanService.assignMealPlan(user.uid, '12-week');
                                  await mealPlanService.assignMealPlan(user.uid, '22-day');
                                  await mealPlanService.assignMealPlan(user.uid, 'mediterranean');
                                  
                                  setShowSuccessMessage(true);
                                  setTimeout(() => {
                                    setShowSuccessMessage(false);
                                    navigate('/dashboard');
                                  }, 2000);
                                } catch (error) {
                                  console.error('Error activating plans:', error);
                                  alert('There was an error activating your plans. Please contact support.');
                                }
                              }
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

          {/* FAQ Section with enhanced styling */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl mb-12 text-center">
                Frequently Asked Questions
              </h2>
              <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
                <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8 group hover:bg-indigo-50/50 p-4 rounded-lg transition-all duration-300">
                  <dt className="text-lg font-semibold leading-7 text-gray-900 lg:col-span-5">
                    New: 7-Day Mediterranean Plan
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Experience the vibrant flavors and health benefits of the Mediterranean diet with our newest meal plan. Perfect for those seeking a balanced, heart-healthy approach to eating.
                    </p>
                  </dd>
                </div>
                <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8 group hover:bg-indigo-50/50 p-4 rounded-lg transition-all duration-300">
                  <dt className="text-lg font-semibold leading-7 text-gray-900 lg:col-span-5">
                    When do I get access?
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Instant access! As soon as your payment is processed, you'll have immediate access to all meal plans and features through your dashboard.
                    </p>
                  </dd>
                </div>
                <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8 group hover:bg-indigo-50/50 p-4 rounded-lg transition-all duration-300">
                  <dt className="text-lg font-semibold leading-7 text-gray-900 lg:col-span-5">
                    Is the Mediterranean plan included?
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Yes! The 7-day Mediterranean plan is included in your $29.99 purchase, along with the 12-week plan and 22-day plan.
                    </p>
                  </dd>
                </div>
                <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8 group hover:bg-indigo-50/50 p-4 rounded-lg transition-all duration-300">
                  <dt className="text-lg font-semibold leading-7 text-gray-900 lg:col-span-5">
                    Can I switch between plans?
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base leading-7 text-gray-600">
                      Absolutely! You have unlimited access to all plans and can switch between them anytime. Mix and match to find what works best for you.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

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
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
