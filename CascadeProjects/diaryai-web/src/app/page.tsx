'use client';

import Link from "next/link";
import PayPalButton from "@/components/PayPalButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">DiaryAI</h1>
        <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
          Transform your thoughts into text instantly. Speak naturally, and watch your words come to life.
        </p>
        <Link 
          href="/record"
          className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Start Recording
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg p-3 mx-auto mb-4">
              <svg className="w-full h-full text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Recording</h3>
            <p className="text-gray-600">Record your thoughts with crystal clear audio quality.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg p-3 mx-auto mb-4">
              <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Transcription</h3>
            <p className="text-gray-600">AI-powered transcription with high accuracy.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg p-3 mx-auto mb-4">
              <svg className="w-full h-full text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Export</h3>
            <p className="text-gray-600">Download your transcriptions in multiple formats.</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
          <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Pro Plan</h3>
                <p className="text-gray-500">For serious journalers</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">$9.99</p>
                <p className="text-gray-500">per month</p>
              </div>
            </div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited recordings
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                90-day history access
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority transcription
              </li>
            </ul>
            <PayPalButton onSuccess={() => console.log('Subscription successful!')} />
          </div>
        </div>
      </div>
    </div>
  );
}
