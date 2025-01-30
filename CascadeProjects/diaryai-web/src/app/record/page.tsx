'use client';

import AudioRecorder from '@/components/AudioRecorder';
import PayPalButton from '@/components/PayPalButton';
import { useUsageLimit } from '@/lib/useUsageLimit';
import { useEffect, useState } from 'react';

export default function RecordPage() {
  const { usageLeft, isLoading, incrementUsage, maxUses } = useUsageLimit();
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  const handleStartRecording = () => {
    if (usageLeft > 0) {
      incrementUsage();
      return true;
    } else {
      setShowPaymentPrompt(true);
      return false;
    }
  };

  const handleSubscriptionSuccess = () => {
    console.log('Subscription successful!');
    setShowPaymentPrompt(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Record Your Thoughts</h1>
          {!isLoading && (
            <p className="text-gray-600">
              {usageLeft > 0 
                ? `${usageLeft} free recordings remaining today`
                : 'You\'ve used all your free recordings for today'}
            </p>
          )}
        </div>

        <div className="w-full max-w-2xl">
          <AudioRecorder onStartRecording={handleStartRecording} />
        </div>

        {showPaymentPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">Upgrade to Pro</h3>
              <div className="space-y-4 mb-6">
                <p className="text-gray-600">
                  Get unlimited recordings and more with our Pro plan:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited recordings
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    10-minute max recording length
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    90-day history
                  </li>
                </ul>
                <p className="text-xl font-bold mt-4">$9.99/month</p>
              </div>
              
              <div className="space-y-4">
                <PayPalButton onSuccess={handleSubscriptionSuccess} />
                <button
                  onClick={() => setShowPaymentPrompt(false)}
                  className="w-full py-2 text-gray-600 hover:text-gray-900"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
