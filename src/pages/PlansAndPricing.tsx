import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PlansAndPricing() {
  const navigate = useNavigate();

  const handlePurchaseSuccess = async (planId: string) => {
    // We'll implement this next to save the purchase and grant access
    console.log('Purchase successful for:', planId);
    navigate('/meal-plans');
  };

  return (
    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
      currency: "USD"
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
            </ul>

            <div className="mt-8">
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
                  if (actions.order) {
                    await actions.order.capture();
                    handlePurchaseSuccess('12-week-plan');
                  }
                }}
              />
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
            </ul>

            <div className="mt-8">
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
                  if (actions.order) {
                    await actions.order.capture();
                    handlePurchaseSuccess('22-day-plan');
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
