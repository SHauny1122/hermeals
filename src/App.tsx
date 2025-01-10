import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import MealPlans from './pages/MealPlans'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import PlansAndPricing from './pages/PlansAndPricing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Smoothies from './pages/Smoothies'
import ProtectedSmoothies from './components/ProtectedSmoothies';
import { AuthProvider } from './context/AuthContext'
import Footer from './components/Footer'
import Fitness from './pages/Fitness'
import ProtectedFitness from './components/ProtectedFitness'
import RecipeFinder from './features/recipeFinder/RecipeFinder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/plans" element={<PlansAndPricing />} />
              <Route path="/fitness" element={
                <ProtectedFitness>
                  <Fitness />
                </ProtectedFitness>
              } />
              <Route path="/smoothies" element={
                <ProtectedSmoothies>
                  <Smoothies />
                </ProtectedSmoothies>
              } />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route 
                path="/meal-plans" 
                element={
                  <ProtectedRoute>
                    <MealPlans />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/recipe-finder" element={<RecipeFinder />} />
              {/* Redirect /pricing to /meal-plans */}
              <Route path="/pricing" element={<Navigate to="/meal-plans" replace />} />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Analytics />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
