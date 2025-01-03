const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-600">
            At HerMeal, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information when you use our meal planning service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Account information (name, email, password)</li>
            <li>Payment information (processed securely through PayPal)</li>
            <li>Dietary preferences and restrictions</li>
            <li>Usage data and interactions with our service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Provide and improve our meal planning services</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important service updates and notifications</li>
            <li>Personalize your meal planning experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your personal information. 
            Payment processing is handled securely through PayPal's protected systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about our Privacy Policy, please contact us at{' '}
            <a href="mailto:support@hermeal.com" className="text-emerald-600 hover:text-emerald-700">
              support@hermeal.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
