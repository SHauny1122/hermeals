import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate('/meal-plans');
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
          case 'auth/invalid-login-credentials':
            setError('Invalid email or password');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Please try again later');
            break;
          default:
            setError(`Failed to log in: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Feature Showcase */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="max-w-lg">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                New Feature
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Turn Photos into Recipes
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Our AI-powered Recipe Finder helps you discover delicious recipes from ingredients you already have. Just snap a photo!
              </p>
              
              {/* Feature Cards */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Snap Ingredients</h3>
                    <p className="text-gray-600">Take a photo of your available ingredients</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Matches</h3>
                    <p className="text-gray-600">Get recipe suggestions in seconds</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="text-sm text-emerald-800">
                  <span className="font-semibold">Included in all plans:</span> Get the Recipe Finder plus meal plans, smoothie recipes, and fitness guides for just $29.99
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
                create a new account
              </Link>
            </p>

            <div className="mt-8">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                  {error}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
