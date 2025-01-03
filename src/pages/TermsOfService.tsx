const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="text-gray-600">
            By accessing and using HerMeal's services, you agree to be bound by these Terms of Service 
            and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
          <p className="text-gray-600">
            HerMeal provides personalized meal planning services, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600">
            <li>Customized meal plans</li>
            <li>Recipe access</li>
            <li>Nutritional guidance</li>
            <li>Meal planning tools and resources</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Payments are processed securely through PayPal</li>
            <li>Subscription fees are non-refundable unless required by law</li>
            <li>You may cancel your subscription at any time</li>
            <li>Pricing is subject to change with notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Maintain accurate account information</li>
            <li>Keep login credentials secure</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not share or redistribute meal plans without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-gray-600">
            Our meal plans are for informational purposes only. Consult with healthcare professionals 
            regarding specific dietary needs or health conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-600">
            For questions about these Terms, please contact us at{' '}
            <a href="mailto:support@hermeal.com" className="text-emerald-600 hover:text-emerald-700">
              support@hermeal.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
