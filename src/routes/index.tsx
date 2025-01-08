import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlanSelection } from '../components/PlanSelection';
import { Dashboard } from '../components/Dashboard';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanSelection />} />
        <Route 
          path="/22-day-plan/*" 
          element={
            <PrivateRoute>
              <Dashboard planType="22-day" />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/12-week-plan/*" 
          element={
            <PrivateRoute>
              <Dashboard planType="12-week" />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
