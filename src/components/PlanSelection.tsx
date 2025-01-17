import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  price,
  features,
  buttonText,
  isActive,
  onClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-emerald-500">{price}</span>
        <span className="text-gray-500">/once-off</span>
      </div>
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-emerald-500 mr-2 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {isActive ? (
        <div className="w-full">
          <div className="bg-emerald-100 text-emerald-700 text-center py-3 rounded-md mb-3">
            Currently Active
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={onClick}
          >
            View Your Plan
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <button className="w-full bg-[#ffc439] text-black py-3 rounded-md flex items-center justify-center">
            <img src="/paypal.svg" alt="PayPal" className="h-5 mr-2" />
            PayPal
          </button>
          <button className="w-full bg-gray-800 text-white py-3 rounded-md flex items-center justify-center">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            </svg>
            Debit or Credit Card
          </button>
          <div className="text-center text-sm text-gray-500">
            Powered by <img src="/paypal-gray.svg" alt="PayPal" className="h-4 inline" />
          </div>
        </div>
      )}
    </div>
  );
};

export const PlanSelection: React.FC = () => {
  const navigate = useNavigate();

  const viewTwentyTwoDayPlan = () => {
    navigate('/22-day-plan');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Meal Plan</h1>
        <p className="text-xl text-gray-600">Select the perfect meal plan for your journey</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PlanCard
          title="12-Week Regular Plan"
          description="A comprehensive 12-week program with balanced meals"
          price="$19.99"
          features={[
            "84 days of planned meals",
            "Complete shopping lists",
            "Detailed recipes & instructions",
            "Lifetime access",
            "FREE Smoothie Recipes Included ($19.99 value)"
          ]}
          buttonText="Get Started"
        />
        
        <PlanCard
          title="22-Day Plan"
          description="Perfect for a fresh start or reset"
          price="$19.99"
          features={[
            "22 days of planned meals",
            "Complete shopping lists",
            "Detailed recipes & instructions",
            "Lifetime access",
            "FREE Smoothie Recipes Included ($19.99 value)"
          ]}
          buttonText="View Your Plan"
          isActive={true}
          onClick={viewTwentyTwoDayPlan}
        />
      </div>
    </div>
  );
};
