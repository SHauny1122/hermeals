import Image from "next/image";
import Link from "next/link";
import PayPalButton from "@/components/PayPalButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-12 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              DiaryAI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your thoughts into text instantly. Speak naturally, and watch your words come to life.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/record"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Recording
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Fast and Accurate</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to capture your thoughts
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    Quick Recording
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Start recording with a single tap. Your thoughts are instantly captured.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    Instant Transcription
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Advanced AI converts your speech to text in seconds.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    3 Free Daily Recordings
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Try it now with 3 free recordings every day. No account needed.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Start with our free tier and upgrade when you need more. No hidden fees.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Free Tier</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Perfect for trying out DiaryAI. Get 3 free recordings every day.
                </p>
                <div className="mt-8">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">What's included</h4>
                  <ul className="mt-3 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600">
                    <li className="flex gap-x-3"> 3 recordings per day</li>
                    <li className="flex gap-x-3"> 2 minutes per recording</li>
                    <li className="flex gap-x-3"> High-quality transcription</li>
                  </ul>
                </div>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Pro Plan</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">$9.99</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/month</span>
                    </p>
                    <div className="mt-10">
                      <PayPalButton onSuccess={() => console.log('Subscription successful!')} />
                    </div>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Unlimited recordings, 10-minute max length, 90-day history
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
