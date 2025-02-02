import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid';

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

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, Affordable Pricing</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get access to our complete collection of healthy meal plans, including our new Mediterranean diet plan.
          </p>
        </div>
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
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$19.99</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <button
                  onClick={() => navigate('/checkout')}
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Access Now
                </button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Secure payment processing. Instant access after purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mediterranean Plan Highlight Section */}
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
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
